import cn from 'classnames';
import { InputNumber, Select } from 'antd';

import BgButton from '@/components/button/BgButton';
import RefreshCountdownButton from '@/components/button/RefreshCountdownButton';
import { useTranslation } from 'next-i18next';

import { uuid } from 'uuidv4';
import { ReactSVG } from 'react-svg';
import { Order, OrderStatus, Round } from '@/models/nile/contract';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { toWei } from 'web3-utils';
import React, { useEffect, useMemo, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import NileNft from '@/models/nile/marketplace/NileNft';
import { addressListAtom, contractsAtom, tokenListAtom, updateBalanceAtom } from '@/state/web3Atom';
import WalletModal from '@components/modal/WalletModal';
import { useRouter } from 'next/router';
import { TOKEN_MAX_APPROVE_AMOUNT, waitForReceipt, weiToEther } from '@utils/web3Utils';
import { useNumberFormatter } from '@utils/formatter/number';
import { useWemixWalletProvider } from '@components/wemix';
import BigNumber from 'bignumber.js';
import { CompleteType } from '@pages/marketplace/complete/[collectionAddressOrSlug]/[tokenId]';
import { WalletModalType } from '@/types/modal.types';
import { TransactionReceipt } from 'web3-core';
import dynamic from 'next/dynamic';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  nft?: NileNft;
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
}

const { Option } = Select;

const MakeOfferModal = ({ nft, isOpen, setIsOpen }: Props) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const { MaximumPrice, MinimumPrice, shorthanded } = useNumberFormatter();

  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [price, setPrice] = useState<number | null>();
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);

  const { openApp } = useWemixWalletProvider();

  const Id = uuid();
  const router = useRouter();

  const nileWallet = useAtomValue(nileWalletAtom);
  const contracts = useAtomValue(contractsAtom);
  const addressList = useAtomValue(addressListAtom);
  const tokens = useAtomValue(tokenListAtom);

  const updateBalance = useSetAtom(updateBalanceAtom);

  const [estimatedGasFee, setEstimatedGasFee] = useState('0');
  const [etherGas, setEtherGas] = useState('0');

  const [coinBalance, setCoinBalance] = useState('0');
  const [balance, setBalance] = useState('0');
  const [walletModalType, setWalletModalType] = useState<WalletModalType>(WalletModalType.APPROVE_WEMIX$);

  const [notEnoughCoin, setNotEnoughCoin] = useState(false);
  const [notEnoughToken, setNotEnoughToken] = useState(false);

  const [approved, setApproved] = useState(false);

  const checkApproved = async () => {
    if (!nileWallet) {
      return;
    }
    const maxAmount = await contracts.ERC20?.methods.allowance(nileWallet, addressList['OpenPriceOrder']).call();
    setApproved(maxAmount === TOKEN_MAX_APPROVE_AMOUNT);
    if (maxAmount === TOKEN_MAX_APPROVE_AMOUNT) {
      setWalletModalType(WalletModalType.PAYMENT);
    }
  };

  const checkFee = async () => {
    const gasPrice = await provider.web3.eth.getGasPrice();
    setEstimatedGasFee(gasPrice);
    setEtherGas(weiToEther(gasPrice));
  };

  const getBalance = () => {
    if (!nileWallet) {
      return;
    }

    updateBalance().then(() => {
      setCoinBalance(tokens?.find((token) => token.symbol === 'wemix')?.balance ?? '0');
      setBalance(tokens?.find((token) => token.symbol === 'wemix$')?.balance ?? '0');
    });
  };

  const evtRefresh = () => {
    getBalance();
    checkFee();
  };

  useEffect(() => {
    checkApproved();
    evtRefresh();
  }, [nileWallet]);

  useEffect(() => {
    if (!isOpen) setPrice(null);
  }, [isOpen]);

  useEffect(() => {
    setNotEnoughToken(new BigNumber(balance).comparedTo(toWei(String(price ?? 0), 'ether')) === -1);
    setNotEnoughCoin(new BigNumber(coinBalance).comparedTo(estimatedGasFee ?? 0) === -1);
  }, [price, balance, coinBalance, estimatedGasFee]);

  const approve = async () => {
    setWalletModalType(WalletModalType.WAITING_APPROVE_WEMIX$);

    const data = await contracts.ERC20?.methods.approve(addressList['OpenPriceOrder'], TOKEN_MAX_APPROVE_AMOUNT).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: addressList['ERC20'],
        value: '0',
        data,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (err: Error, hash: string) => {
        if (err) {
          setIsErrorModal(true);
          setWalletModalType(WalletModalType.APPROVE_WEMIX$);
        }

        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            setIsPendingModal(false);
            setWalletModalType(WalletModalType.PAYMENT);
            setApproved(true);
          });
        }
      }
    );
    openApp();
  };

  const registerBuyOrder = async () => {
    setIsPendingModal(true);
    const collectionAddress = nft?.token?.collectionAddress;
    if (!collectionAddress) {
      return;
    }

    const lastOrder = nft?.token?.orderList?.[0];

    const order: Order = {
      round: Round.SECOND,
      orderStatus: OrderStatus.NONE,
      seller: (lastOrder?.status === 'OPEN' || lastOrder?.status === 'TO_BE_OPENED' ? lastOrder.creator : nft?.token?.ownerAddress) ?? '',
      collection: collectionAddress,
      payment: process.env.NEXT_PUBLIC_ENV_WEMIX_DOLLAR_CONTRACT_ADDRESS ?? '',
      buyer: [nileWallet],
      orderID: 0,
      orderAmount: 1,
      startTime: 0,
      tid: Number(nft?.token?.tokenId),
      price: toWei(String(price ?? 0)),
      limit: 1,
      totalSoldAmount: 0,
      soldAmount: [],
    };

    const registerMethodAbi = contracts.OpenMarket?.methods.registerBuyOrder(2, { ...order }).encodeABI();

    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: marketJsonAbiAddresses().current.OpenMarket,
        value: '0',
        data: registerMethodAbi,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (err: Error, hash: string) => {
        if (err) {
          setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            router
              .push({
                pathname: '/marketplace/complete/[collectionAddressOrSlug]/[tokenId]',
                query: {
                  collectionAddressOrSlug: nft?.token?.collection?.slug,
                  tokenId: nft?.token?.tokenId,
                  type: CompleteType.MAKE_OFFER,
                },
              })
              .then(() => {
                setIsPendingModal(false);
                setIsOpen(false);
              });
          });
        }
      }
    );

    openApp();
  };

  const isApproveDisabled = useMemo(() => {
    if (price === 0 || !price) {
      return true;
    }
    if (notEnoughCoin) {
      return true;
    }
    return notEnoughToken;
  }, [approved, price]);

  return (
    <>
      <ModalLayout
        wrapClassName={cn('makeoffer-modal')}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="md"
        title={t('makeOffer', { ns: 'common' })}
        footer
        destroyOnClose={true}
        footerContent={[
          <div className={cn('footer-content')}>
            <div>
              {(notEnoughCoin || notEnoughToken) && <p className={cn('notice', 'error')}>{t('failedPopup.txt2', { ns: 'common' })}</p>}
              <p className={cn('notice')}>{approved ? '' : t('placeBidPopup.txt4', { ns: 'common' })}</p>
            </div>
            <BgButton
              key="make offer"
              buttonText={approved ? t('makeOffer', { ns: 'common' }) : t('approveButton', { ns: 'common' })}
              color="black"
              size="md"
              disabled={isApproveDisabled}
              onClick={() => (approved ? registerBuyOrder() : setIsPendingModal(true))}
            />
          </div>,
        ]}
      >
        <>
          <p>{t('makeOfferPopup.content', { ns: 'common' })}</p>
          <div className={cn('makeoffer-form')}>
            <dl>
              <dt>{t('makeOfferPopup.unit', { ns: 'common' })}</dt>
              <dd className={cn('input')}>
                <Select
                  suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  popupClassName="select-size-md-dropdown"
                  defaultValue="WEMIX$"
                  disabled
                  key={Id}
                >
                  <Option value="WEMIX$">WEMIX$</Option>
                  <Option value="WEMIX">WEMIX</Option>
                </Select>
                <InputNumber
                  /* 23.02.03 수정: size 속성 삭제 */
                  controls={false}
                  value={price}
                  max={MaximumPrice}
                  min={MinimumPrice}
                  onChange={setPrice}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                  placeholder={t('listing.price.placeholder', { ns: 'marketplace' })}
                />
                {/* 23.02.03 수정: 문구 위치 수정 */}
              </dd>
              {/* 23.02.03 수정: 문구 위치 수정 */}
              <dd className={cn('desc')}>{t('makeOfferPopup.notice', { ns: 'common' })}</dd>
            </dl>

            <dl>
              <dt>{t('makeOfferPopup.txt2', { ns: 'common' })}</dt>
              <dd className={cn('detail')}>
                7 <span>days</span>
              </dd>
              <dd className={cn('desc')}>{t('makeOfferPopup.txt3', { ns: 'common' })}</dd>
            </dl>
            <dl>
              <dt>
                {t('marketplaceModal.gasFee', { ns: 'common' })}
                <RefreshCountdownButton refresh={evtRefresh} />
              </dt>
              <dd className={cn('detail')}>
                {shorthanded(etherGas, { digits: 7 })} <span>WEMIX</span>
              </dd>
              <dd className={cn('desc')}>
                {t('marketplaceModal.gasFeeInfo', { ns: 'common' })}
                <br />
                {t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}
              </dd>
            </dl>
          </div>
          <div className={cn('payment-block')}>
            <dl>
              <dt>{t('marketplaceModal.paymentAmount', { ns: 'common' })}</dt>
              <dd>
                <div>
                  <span className={cn('amount')}>{shorthanded(price ?? 0, { digits: 4 })}</span>
                  <span className={cn('unit')}>WEMIX$</span>
                  {/*<span className={cn('transfer-amount')}>($3,000)</span>*/}
                </div>

                <div>
                  <span className={cn('amount')}>{shorthanded(etherGas, { digits: 7 })}</span>
                  <span className={cn('unit')}>WEMIX</span>
                  {/*<span className={cn('transfer-amount')}>($10)</span>*/}
                </div>
              </dd>
            </dl>
          </div>
        </>
      </ModalLayout>
      <ModalLayout
        isOpen={isErrorModal}
        setIsOpen={setIsErrorModal}
        size="sm"
        title={t('failedPopup.txt', { ns: 'common' })}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <BgButton
            buttonText={t('failedPopup.btn', { ns: 'common' })}
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              setIsErrorModal(false);
              setIsPendingModal(false);
              setIsOpen(false);
              if (approved) setWalletModalType(WalletModalType.PAYMENT);
              else setWalletModalType(WalletModalType.APPROVE_WEMIX$);
            }}
          />,
        ]}
      >
        {t('failedPopup.txt3', { ns: 'common' })}
      </ModalLayout>
      <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={walletModalType} onClickApprove={approve} />
    </>
  );
};

export default MakeOfferModal;
