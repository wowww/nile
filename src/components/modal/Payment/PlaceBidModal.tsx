import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useNileNft } from '@/hook/useNileNft';
import React, { useCallback, useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { toWei } from 'web3-utils';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { addressListAtom, contractsAtom } from '@/state/web3Atom';
import { PaymentModalType, WalletModalType } from '@/types/modal.types';
import BgButton from '@components/button/BgButton';
import { useWemixWalletProvider } from '@components/wemix';
import { TOKEN_MAX_APPROVE_AMOUNT, waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { useRouter } from 'next/router';
import { marketNftAtom } from '@/state/marketplace';

const PaymentCommonModal = dynamic(() => import('@components/modal/Payment/PaymentCommonModal'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });
const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface PlaceBidModalProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  price?: number;
}

const PlaceBidModal = ({ isOpen, setIsOpen, price }: PlaceBidModalProps) => {
  const { t } = useTranslation('common');
  const nft = useAtomValue(marketNftAtom);

  const nileWallet = useAtomValue(nileWalletAtom);
  const [contracts] = useAtom(contractsAtom);
  const [addressList] = useAtom(addressListAtom);

  const router = useRouter();

  const { lastOrder, currentPrice } = useNileNft(nft);
  const { openApp } = useWemixWalletProvider();

  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [walletModalType, setWalletModalType] = useState<WalletModalType>(WalletModalType.APPROVE_WEMIX$);

  useEffect(() => {
    checkApproved();
  }, [currentPrice]);

  const checkApproved = useCallback(async () => {
    if (nileWallet) {
      contracts?.ERC20?.methods
        .allowance(nileWallet, addressList['EnglishAuctionOrder'])
        .call()
        .then((maxAmount: string) => {
          setIsApproved(maxAmount === TOKEN_MAX_APPROVE_AMOUNT);
          if (maxAmount === TOKEN_MAX_APPROVE_AMOUNT) {
            setWalletModalType(WalletModalType.PAYMENT);
          }
        });
    }
  }, [nileWallet, contracts]);

  const sendApproved = async () => {
    setWalletModalType(WalletModalType.WAITING_APPROVE_WEMIX$);
    const data = await contracts.ERC20?.methods.approve(addressList['EnglishAuctionOrder'], TOKEN_MAX_APPROVE_AMOUNT).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    setIsPendingModal(true);
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
      (error: Error, hash: string) => {
        if (error) {
          setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            // router.push(`/marketplace/complete/${nft?.token?.collection?.address}/${nft?.token?.tokenId}`).then(() => {
            // setIsApproved(true);
            // setWalletModalType(WalletModalType.PAYMENT);
            // });

            setIsApproved(true);
            setIsPendingModal(false);
            setWalletModalType(WalletModalType.PAYMENT);
          });
        }
      }
    );

    openApp();
  };

  const offerSellOrder = async () => {
    const collectionAddress = nft?.token?.collection?.address;
    if (!collectionAddress) {
      return;
    }
    const priceWei = toWei(String(price), 'ether');

    if (!contracts.ERC20) {
      return;
    }

    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    const offerMethodAbi = contracts.CurateMarket?.methods.offerSellOrder(lastOrder?.orderId, priceWei).encodeABI();
    setIsPendingModal(true);
    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: marketJsonAbiAddresses().current.CurateMarket,
        value: '0',
        data: offerMethodAbi,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error: Error, hash: string) => {
        if (error) {
          setIsPendingModal(false);
          setIsErrorModal(true);
          setIsPendingModal(false);
          return;
        }

        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            router
              .push({
                pathname: '/marketplace/bid/[collectionAddressOrSlug]/[tokenId]',
                query: {
                  collectionAddressOrSlug: nft?.token?.collectionAddress,
                  tokenId: nft?.token?.tokenId,
                  modalType: PaymentModalType.PLACE_BID,
                },
              })
              .then(() => {
                setIsOpen(false);
                setIsPendingModal(false);
              });
          });
        }
      }
    );

    openApp();
  };

  return (
    <>
      <PaymentCommonModal
        nft={nft}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        price={price}
        isApproved={isApproved}
        title={t('placeBid')}
        buttonText={t('placeBid', { ns: 'common' })}
        showGasFee
        onClick={() => offerSellOrder()}
        setIsPendingModal={setIsPendingModal}
        notice={[t('marketplaceModal.gasFeeInfo', { ns: 'common' }), t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })]}
      />
      <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={walletModalType} onClickApprove={sendApproved} />
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
              if (isApproved) setWalletModalType(WalletModalType.PAYMENT);
              else setWalletModalType(WalletModalType.APPROVE_WEMIX$);
            }}
          />,
        ]}
      >
        {t('failedPopup.txt3', { ns: 'common' })}
      </ModalLayout>
    </>
  );
};

export default PlaceBidModal;
