import dynamic from 'next/dynamic';
import NileNft, {NileNftOrder} from '@/models/nile/marketplace/NileNft';
import { useTranslation } from 'next-i18next';
import { useNileNft } from '@/hook/useNileNft';
import React, { useCallback, useMemo, useState } from 'react';
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

const PaymentCommonModal = dynamic(() => import('@components/modal/Payment/PaymentCommonModal'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });
const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface PlaceBidModalProps {
  nft?: NileNft;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  bidBack?: boolean;
  order?: NileNftOrder;
}

const RetractingBidModal = ({ nft, isOpen, setIsOpen, bidBack, order }: PlaceBidModalProps) => {
  const { t } = useTranslation('common');
  const nileWallet = useAtomValue(nileWalletAtom);
  const [contracts] = useAtom(contractsAtom);

  const router = useRouter();

  const { openApp } = useWemixWalletProvider();

  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [walletModalType, setWalletModalType] = useState<WalletModalType>(WalletModalType.PAYMENT);

  const closeOrder = async () => {
    setIsPendingModal(true);
    const offerMethodAbi = contracts.CurateMarket?.methods.closeOrder(order?.orderId).encodeABI();
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
                query: {
                  collectionAddressOrSlug: nft?.token?.collectionAddress,
                  tokenId: nft?.token?.tokenId,
                  modalType: bidBack ? PaymentModalType.GET_BID_BACK : PaymentModalType.RETRACTING_BID,
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

  const content = useMemo(() => {
    if (bidBack) {
      return {
        title: t('marketplaceModal.getMyBidBack'),
        buttonText: t('refundPopup.btn'),
      };
    }

    return {
      title: t('marketplaceModal.withdrawMyBid'),
      buttonText: t('refundPopup.btn'),
    };
  }, [nft, bidBack]);

  const resetModal = useCallback(() => {
    setIsErrorModal(false);
    setIsPendingModal(false);
    setIsOpen(false);
    setWalletModalType(WalletModalType.PAYMENT);
  }, []);

  return (
    <>
      <PaymentCommonModal
        nft={nft}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isApproved
        title={content.title}
        buttonText={content.buttonText}
        onClick={() => closeOrder()}
        refund
        notice={[t('marketplaceModal.retractingInfo', { ns: 'common' }), t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })]}
      />
      <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={walletModalType} />
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

export default RetractingBidModal;
