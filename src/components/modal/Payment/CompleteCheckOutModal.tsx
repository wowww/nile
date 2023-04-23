import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useNileNft } from '@/hook/useNileNft';
import React, { useCallback, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { toWei } from 'web3-utils';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { contractsAtom } from '@/state/web3Atom';
import { PaymentModalType, WalletModalType } from '@/types/modal.types';
import BgButton from '@components/button/BgButton';
import { useWemixWalletProvider } from '@components/wemix';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { useRouter } from 'next/router';
import { marketNftAtom } from '@/state/marketplace';

const PaymentCommonModal = dynamic(() => import('@components/modal/Payment/PaymentCommonModal'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });
const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface CompleteCheckOutModalProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const CompleteCheckOutModal = ({ isOpen, setIsOpen }: CompleteCheckOutModalProps) => {
  const { t } = useTranslation('common');

  const nft = useAtomValue(marketNftAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const [contracts] = useAtom(contractsAtom);

  const router = useRouter();

  const { lastOrder, currentPrice } = useNileNft(nft);
  const { openApp } = useWemixWalletProvider();

  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);

  const claimOrder = async () => {
    setIsPendingModal(true);
    const offerMethodAbi = contracts.CurateMarket?.methods.claimAuction(lastOrder?.orderId).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

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
          setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            router
              .push({
                pathname: '/marketplace/bid/[collectionAddressOrSlug]/[tokenId]',
                query: { collectionAddressOrSlug: nft?.token?.collectionAddress, tokenId: nft?.token?.tokenId, modalType: PaymentModalType.COMPLETE_CHECKOUT }
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

  const resetModal = useCallback(() => {
    setIsErrorModal(false);
    setIsPendingModal(false);
    setIsOpen(false);
  }, []);

  return (
    <>
      <PaymentCommonModal
        nft={nft}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        price={currentPrice}
        isApproved
        title={t('marketplaceModal.completeCheckout')}
        buttonText={t('marketplaceModal.confirmCheckout')}
        onClick={() => claimOrder()}
        complete
        showGasFee
        onlyGasFee
        notice={[t('marketplaceModal.completeInfo', { ns: 'common' }), t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })]}
      />
      <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={WalletModalType.PAYMENT} />
      <ModalLayout
        isOpen={isErrorModal}
        setIsOpen={setIsErrorModal}
        size="sm"
        title={t('failedPopup.txt', { ns: 'common' })}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <BgButton buttonText={t('failedPopup.btn', { ns: 'common' })} color="black" size="md" key="Save" onClick={() => resetModal()} />,
        ]}
      >
        {t('failedPopup.txt3', { ns: 'common' })}
      </ModalLayout>
    </>
  );
};

export default CompleteCheckOutModal;
