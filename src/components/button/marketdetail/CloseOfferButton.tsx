import { useAtomValue } from 'jotai';
import { marketNftAtom, updateMarketNftAtom } from '@/state/marketplace';
import { useTranslation } from 'next-i18next';
import BgButton from '@components/button/BgButton';
import React, { useMemo, useState } from 'react';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { toWei } from 'web3-utils';
import { useWemixWalletProvider } from '@components/wemix';
import { WalletModalType } from '@/types/modal.types';
import dynamic from 'next/dynamic';
import { contractsAtom } from '@/state/web3Atom';
import { useNileNft } from '@/hook/useNileNft';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { useSetAtom } from 'jotai';

const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });
const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface CloseOfferButtonProps {
  cancel?: boolean;
  dark?: boolean;
}

export const CloseOfferButton = ({ cancel, dark }: CloseOfferButtonProps) => {
  const { t } = useTranslation('common');

  const nft = useAtomValue(marketNftAtom);
  const contracts = useAtomValue(contractsAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const refreshNft = useSetAtom(updateMarketNftAtom);

  const { openApp } = useWemixWalletProvider();
  const { myOffer } = useNileNft(nft);

  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);

  const closeOrder = async () => {
    setIsPendingModal(true);
    const collectionAddress = nft?.token?.collectionAddress;
    if (!collectionAddress) {
      return;
    }
    const closeMethodAbi = contracts.OpenMarket?.methods.closeOrder(myOffer?.orderId).encodeABI();

    const estimatedGasFee = await provider.web3.eth.getGasPrice();

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
            setIsPendingModal(false);
            setTimeout(() => refreshNft(), 2000);
          });
        }
      },
    );

    openApp();
  };

  const buttonText = useMemo(() => {
    if (cancel) {
      return t('cancelMyOffer');
    }
    return t('marketplaceModal.getMyOfferBack');
  }, []);

  return (
    <>
      <BgButton buttonText={buttonText} color={dark ? 'white' : 'black'} size="lg-f" onClick={() => closeOrder()} />
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
