import cn from 'classnames';
import Image from 'next/image';
import BgButton from '@components/button/BgButton';
import RefreshCountdownButton from '@components/button/RefreshCountdownButton';
import Tag from '@components/tag/Tag';
import { useTranslation } from 'next-i18next';
import NileNft, { NileOrderType } from '@/models/nile/marketplace/NileNft';
import React, { useEffect, useMemo, useState } from 'react';
import { NileCDNLoader } from '@utils/image/loader';
import { useNumberFormatter } from '@utils/formatter/number';
import { toBN, toWei } from 'web3-utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { tokenListAtom, updateBalanceAtom } from '@/state/web3Atom';
import { getAmountFormat, weiToEther } from '@utils/web3Utils';
import { useNileNft } from '@/hook/useNileNft';
import dynamic from 'next/dynamic';
import { MarketNftItemStatusType } from '@/services/nile/api';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface ModalProps {
  nft?: NileNft;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  title: string;
  buttonText: string;
  isApproved?: boolean;
  price?: number;
  setIsPendingModal?: (v: boolean) => void;
  onClick?: () => void;
  complete?: boolean;
  refund?: boolean;
  showGasFee?: boolean;
  notice?: string[];
  offer?: boolean;
  onlyGasFee?: boolean;
}

const PaymentCommonModal = ({
  nft,
  isOpen,
  setIsOpen,
  isApproved,
  price,
  title,
  buttonText,
  setIsPendingModal,
  onClick,
  complete,
  refund,
  showGasFee,
  notice,
  offer,
  onlyGasFee,
}: ModalProps) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const { shorthanded } = useNumberFormatter();

  const nileWallet = useAtomValue(nileWalletAtom);
  const tokens = useAtomValue(tokenListAtom);

  const updateBalance = useSetAtom(updateBalanceAtom);

  const [coinBalance, setCoinBalance] = useState('0');
  const [balance, setBalance] = useState('0');

  const [notEnoughCoin, setNotEnoughCoin] = useState(false);
  const [notEnoughToken, setNotEnoughToken] = useState(false);

  const [estimatedGasFee, setEstimatedGasFee] = useState('0');
  const [etherGas, setEtherGas] = useState('0');

  const { status, lastOrder, lastBidPrice, isAuctionWinner } = useNileNft(nft);

  const getBalance = () => {
    if (!nileWallet) {
      return;
    }

    updateBalance().then(() => {
      setCoinBalance(tokens?.find((token) => token.symbol === 'wemix')?.balance ?? '0');
      setBalance(tokens?.find((token) => token.symbol === 'wemix$')?.balance ?? '0');
    });
  };

  const checkFee = async () => {
    const gasPrice = await provider.web3.eth.getGasPrice();
    setEstimatedGasFee(gasPrice);
    setEtherGas(weiToEther(gasPrice));
  };

  const paymentPrice = useMemo(() => {
    if (refund || complete || offer) {
      return shorthanded(etherGas, { digits: 7 });
    }
    if (lastBidPrice > 0) {
      return getAmountFormat(String((price ?? 0) - lastBidPrice), 0);
    }
    return getAmountFormat(String(price), 0);
  }, [price, lastBidPrice, nileWallet, refund, complete, offer, etherGas]);

  useEffect(() => {
    if (status === MarketNftItemStatusType.AUCTION_LIVE_ONGOING && lastBidPrice) {
      setNotEnoughToken(toBN(balance).cmp(toBN(`${toWei(String((price ?? 0) - lastBidPrice ?? 0), 'ether')}`)) === -1);
    } else {
      setNotEnoughToken(toBN(balance).cmp(toBN(`${toWei(String(price ?? 0), 'ether')}`)) === -1);
    }
    setNotEnoughCoin(toBN(coinBalance).cmp(toBN(estimatedGasFee ?? 0)) === -1);
  }, [price, balance, coinBalance, estimatedGasFee]);

  const evtRefresh = async () => {
    getBalance();
    checkFee();
  };

  useEffect(() => {
    evtRefresh();
  }, [nileWallet]);

  const isPaymentDisabled = useMemo(() => {
    return complete && isAuctionWinner ? notEnoughCoin : (notEnoughToken || notEnoughCoin);
  }, [complete, isAuctionWinner, notEnoughToken, notEnoughCoin]);

  return (
    <ModalLayout
      wrapClassName={cn('payment-modal-wrap', !isApproved ? 'has-notice' : '', notEnoughCoin || notEnoughToken ? 'has-notice-error' : '')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="lg"
      title={title}
      footer
      footerContent={[
        !isApproved ? (
          <div className={cn('footer-content')} key={`approved-${isApproved}-footer`}>
            <div>
              {(notEnoughCoin || notEnoughToken) &&
                <p className={cn('notice', 'error')}>{t('failedPopup.txt2', { ns: 'common' })}</p>}
              <p className={cn('notice')}>{isApproved ? '' : t('placeBidPopup.txt4', { ns: 'common' })}</p>
            </div>
            <BgButton
              key="payment"
              disabled={notEnoughCoin}
              buttonText={t('approveButton', { ns: 'common' })}
              color="black"
              size="lg"
              onClick={() => setIsPendingModal?.(true)}
            />
          </div>
        ) : (
          <div className={cn('footer-content', 'disabled')} key={`approved-${isApproved}-footer`}>
            <p
              className={cn('notice', isPaymentDisabled && 'error')}>{!isPaymentDisabled ? '' : t('failedPopup.txt2', { ns: 'common' })}</p>
            <BgButton key="payment" disabled={isPaymentDisabled} buttonText={buttonText} color="black" size="lg"
                      onClick={onClick} />
          </div>
        ),
      ]}
      destroyOnClose={true}
    >
      <div className={cn('payment-modal-inner')}>
        <div className={cn('inner-top-wrap')}>
          <div className={cn('inner-top')}>
            <div className={cn('img-block')}>
              {nft?.token?.image ? (
                <Image src={nft?.token?.image ?? ''} alt="" layout="fill" loader={NileCDNLoader} unoptimized />
              ) : (
                <video autoPlay loop muted playsInline disablePictureInPicture>
                  <source src={nft?.token?.videoUrl ?? ''} type="video/mp4" />
                </video>
              )}
            </div>
            <div className={cn('text-block')}>
              <h1 className={cn('title')}>
                <span className={cn('collection-name')}>{nft?.token?.collection?.name}</span>
                <strong className={cn('product-name')}>{nft?.token?.name}</strong>
              </h1>
              <div className={cn('amount-info')}>
                {!offer && (
                  <dl>
                    <dt>{t('placeBidPopup.txt', { ns: 'common' })}</dt>
                    <dd>
                      {complete && (
                        <Tag size="s" color="light-gray">
                          {t('marketplaceModal.paymentComplete', { ns: 'common' })}
                        </Tag>
                      )}
                      <strong
                        className={cn('amount', { complete })}>{refund ? shorthanded(lastBidPrice) : shorthanded(price)}</strong>
                      <span className={cn('unit')}>WEMIX$</span>
                    </dd>
                  </dl>
                )}
                <dl>
                  <dt>
                    {t('marketplaceModal.gasFee', { ns: 'common' })}
                    <RefreshCountdownButton refresh={evtRefresh} />
                  </dt>
                  <dd>
                    <strong className={cn('amount')}>{shorthanded(etherGas, { digits: 7 })}</strong>
                    <span className={cn('unit')}>WEMIX</span>
                  </dd>
                </dl>
                {notice && (
                  <p className={cn('notice')}>
                    {notice?.at(0)}
                    <br className={cn('blank')} />
                    {notice?.at(1)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={cn('payment-block')}>
          {refund && (
            <dl>
              <dt>{t('refundPopup.txt3', { ns: 'common' })}</dt>
              <dd>
                <div>
                  <span className={cn('amount')}>{shorthanded(lastBidPrice)}</span>
                  <span className={cn('unit')}>WEMIX$</span>
                </div>
              </dd>
            </dl>
          )}
          <dl>
            <dt>
              {complete ? t('refundPopup.txt2', { ns: 'common' }) : t('refundPopup.txt4', { ns: 'common' })}
              {lastOrder?.type === NileOrderType.AUCTION && !refund && (
                <span className={cn('pay-info')}> {t('placeBidPopup.txt5', { ns: 'common' })}</span>
              )}
            </dt>
            <dd>
              <>
                {!onlyGasFee && (
                  <div>
                    <span className={cn('amount')}>{paymentPrice}</span>
                    <span className={cn('unit')}>WEMIX$</span>
                  </div>
                )}
                {showGasFee && (
                  <div style={{ marginTop: '12px' }}>
                    <span className={cn('amount', 'gas-fee')}>{shorthanded(etherGas, { digits: 7 })}</span>
                    <span className={cn('unit', 'gas-fee')}>WEMIX</span>
                  </div>
                )}
              </>
            </dd>
          </dl>
        </div>
      </div>
    </ModalLayout>
  );
};

export default PaymentCommonModal;
