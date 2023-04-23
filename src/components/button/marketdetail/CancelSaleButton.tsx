import OutlineButton from '@components/button/OutlineButton';
import React, { useState } from 'react';
import BgButton from '@components/button/BgButton';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { toWei } from 'web3-utils';
import { CompleteType } from '@pages/marketplace/complete/[collectionAddressOrSlug]/[tokenId]';
import { useAtomValue } from 'jotai';
import { contractsAtom } from '@/state/web3Atom';
import { useNileNft } from '@/hook/useNileNft';
import { marketNftAtom } from '@/state/marketplace';
import { useRouter } from 'next/router';
import { useWemixWalletProvider } from '@components/wemix';
import { WalletModalType } from '@/types/modal.types';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';

const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });
const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface CancelSaleButtonProps {
  background?: boolean;
  dark?: boolean;
}

export const CancelSaleButton = ({ background, dark }: CancelSaleButtonProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { openApp } = useWemixWalletProvider();

  const nileWallet = useAtomValue(nileWalletAtom);
  const contracts = useAtomValue(contractsAtom);
  const nft = useAtomValue(marketNftAtom);

  const { lastOrder } = useNileNft(nft);

  const [isCancelListing, setIsCancelListing] = useState<boolean>(false);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);

  const closeOrder = async () => {
    setIsPendingModal(true);
    const offerMethodAbi = contracts.OpenMarket?.methods.closeOrder(lastOrder?.orderId).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

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
          setIsCancelListing(false);
          setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            router
              .push(`/marketplace/complete/${nft?.token?.collection?.address}/${nft?.token?.tokenId}?type=${CompleteType.CANCEL_SALE}`)
              .then(() => {
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
      {background ? (
        <BgButton buttonText={t('cancelSale')} color={dark ? 'white' : 'black'} size="lg-f" onClick={() => setIsCancelListing(true)} />
      ) : (
        <OutlineButton buttonText={t('cancelSale')} color={dark ? 'white' : 'black'} size="lg-f" onClick={() => setIsCancelListing(true)} />
      )}
      <ModalLayout
        isOpen={isCancelListing}
        setIsOpen={setIsCancelListing}
        size="sm"
        title={t('nftConfirmMoal.cancelTitle', { ns: 'common' })}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <OutlineButton
            buttonText={t('close', { ns: 'common' })}
            color="black"
            size="md"
            key="Back"
            onClick={() => {
              setIsCancelListing(false);
            }}
          />,
          <BgButton
            buttonText={t('header.notification.confirmCancelButton', { ns: 'common' })}
            color="black"
            size="md"
            key="Yes"
            onClick={() => {
              setIsCancelListing(false);
              closeOrder();
            }}
          />,
        ]}
      >
        <p>{t('nftConfirmMoal.cancelDesc', { ns: 'common' })}</p>
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
            }}
          />,
        ]}
      >
        {t('failedPopup.txt3', { ns: 'common' })}
      </ModalLayout>
      <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={WalletModalType.PAYMENT} />
    </>
  );
};
