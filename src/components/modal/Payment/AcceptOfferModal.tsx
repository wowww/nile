import cn from 'classnames';
import ModalLayout from '@components/modal/ModalLayout';
import BgButton from '@components/button/BgButton';
import { useTranslation } from 'next-i18next';
import { NileNftOrder, NileOrderStatusType, NileOrderType } from '@/models/nile/marketplace/NileNft';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toWei } from 'web3-utils';
import { useAtomValue } from 'jotai';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { addressListAtom, contractsAtom } from '@/state/web3Atom';
import { waitForReceipt } from '@utils/web3Utils';
import { marketJsonAbiAddresses, marketAbis } from '@/web3/abis/market';
import dynamic from 'next/dynamic';
import { useNileNft } from '@/hook/useNileNft';
import { WalletModalType } from '@/types/modal.types';
import { useWemixWalletProvider } from '@components/wemix';
import { CompleteType } from '@pages/marketplace/complete/[collectionAddressOrSlug]/[tokenId]';
import { useRouter } from 'next/router';
import { TransactionReceipt } from 'web3-core';
import { marketNftAtom } from '@/state/marketplace';

const PaymentCommonModal = dynamic(() => import('@components/modal/Payment/PaymentCommonModal'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });

interface ModalProps {
  selectedOffer?: NileNftOrder;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  resetModal?: () => void;
}

const AcceptOfferModal = ({ selectedOffer, isOpen, setIsOpen, resetModal }: ModalProps) => {
  const { t } = useTranslation(['marketplace', 'common']);

  const nft = useAtomValue(marketNftAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const contracts = useAtomValue(contractsAtom);
  const addressList = useAtomValue(addressListAtom);

  const { lastOrder, currentPrice } = useNileNft(nft);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [walletModalType, setWalletModalType] = useState<WalletModalType>(WalletModalType.APPROVE_TRANSFER);

  const { openApp } = useWemixWalletProvider();
  const router = useRouter();

  const isFixedPriceOffer = useMemo(() => {
    return (
      lastOrder?.type === NileOrderType.FIXED_PRICE &&
      (lastOrder?.status === NileOrderStatusType.OPEN || lastOrder?.status === NileOrderStatusType.TO_BE_OPENED)
    );
  }, [nft, lastOrder]);

  useEffect(() => {
    if (isFixedPriceOffer) {
      setIsApproved(true);
      setWalletModalType(WalletModalType.PAYMENT);
    }
  }, [isFixedPriceOffer]);

  const approve = async () => {
    setWalletModalType(WalletModalType.WAITING_APPROVE_TRANSFER);
    const contract = new provider.web3.eth.Contract(marketAbis.NileERC721, nft?.token?.collectionAddress);
    const data = contract.methods.approve(addressList['OpenMarket'], nft?.token?.tokenId).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: nft?.token?.collectionAddress,
        value: '0',
        data,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error: Error, hash: string) => {
        if (error) {
          setIsPendingModal(false);
          setIsErrorModal(true);
          setWalletModalType(WalletModalType.APPROVE_TRANSFER);
        }

        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            setIsPendingModal(false);
            setIsApproved(true);
            setWalletModalType(WalletModalType.PAYMENT);
          });
        }
      }
    );
    openApp();
  };

  const cancelSellOfferBuyOrder = async () => {
    if (!selectedOffer) {
      return;
    }
    setIsPendingModal(true);
    const collectionAddress = nft?.token?.collectionAddress;
    if (!collectionAddress) {
      return;
    }

    const estimatedGasFee = await provider.web3.eth.getGasPrice();
    const closeMethodAbi = contracts.OpenMarket?.methods
      .cancelSellOfferBuyOrder(lastOrder?.orderId, selectedOffer?.orderId, selectedOffer?.orderAmount)
      .encodeABI();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: marketJsonAbiAddresses().current.OpenMarket,
        value: '0',
        data: closeMethodAbi,
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
            router
              .push({
                pathname: '/marketplace/complete/[collectionAddressOrSlug]/[tokenId]',
                query: {
                  collectionAddressOrSlug: nft?.token?.collection?.slug,
                  tokenId: nft?.token?.tokenId,
                  type: CompleteType.ACCEPT_OFFER,
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

  const offerBuyOrder = async () => {
    setIsPendingModal(true);

    if (!selectedOffer) {
      return;
    }

    const estimatedGasFee = await provider.web3.eth.getGasPrice();
    const offerMethodAbi = contracts.OpenMarket?.methods.offerBuyOrder(selectedOffer?.orderId, selectedOffer?.orderAmount).encodeABI();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: marketJsonAbiAddresses().current.OpenMarket,
        value: '0',
        data: offerMethodAbi,
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
            router
              .push({
                pathname: '/marketplace/complete/[collectionAddressOrSlug]/[tokenId]',
                query: {
                  collectionAddressOrSlug: nft?.token?.collection?.slug,
                  tokenId: nft?.token?.tokenId,
                  type: CompleteType.ACCEPT_OFFER,
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

  const modalEvent = useCallback(async () => {
    if (isFixedPriceOffer) {
      await cancelSellOfferBuyOrder();
    } else {
      await offerBuyOrder();
    }
  }, [isFixedPriceOffer, selectedOffer]);

  return (
    <>
      <PaymentCommonModal
        nft={nft}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        price={currentPrice}
        isApproved={isApproved}
        title={t('acceptOffer', { ns: 'common' })}
        buttonText={t('acceptOffer', { ns: 'common' })}
        onClick={() => modalEvent()}
        setIsPendingModal={setIsPendingModal}
        notice={[t('marketplaceModal.completeInfo', { ns: 'common' }), t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })]}
        offer
      />
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
              resetModal?.();
              setIsErrorModal(false);
              setIsPendingModal(false);
              if (isFixedPriceOffer) {
                setWalletModalType(WalletModalType.PAYMENT);
              } else {
                setWalletModalType(WalletModalType.APPROVE_TRANSFER);
              }
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

export default AcceptOfferModal;
