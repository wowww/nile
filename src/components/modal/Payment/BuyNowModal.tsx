import dynamic from 'next/dynamic';
import NileNft, { NileNftOrderRound } from '@/models/nile/marketplace/NileNft';
import { useTranslation } from 'next-i18next';
import { useNileNft } from '@/hook/useNileNft';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

const PaymentCommonModal = dynamic(() => import('@components/modal/Payment/PaymentCommonModal'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });
const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface PlaceBidModalProps {
  nft?: NileNft;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const BuyNowModal = ({ nft, isOpen, setIsOpen }: PlaceBidModalProps) => {
  const { t } = useTranslation('common');
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
  }, [nileWallet, currentPrice]);

  const checkApproved = useCallback(async () => {
    if (nileWallet) {
      contracts?.ERC20?.methods
        .allowance(nileWallet, lastOrder?.round === NileNftOrderRound.FIRST ? addressList['CFixedPriceOrder'] : addressList['OFixedPriceOrder'])
        .call()
        .then((maxAmount: string) => {
          setIsApproved(maxAmount === TOKEN_MAX_APPROVE_AMOUNT);
          if (maxAmount === TOKEN_MAX_APPROVE_AMOUNT) {
            setWalletModalType(WalletModalType.PAYMENT);
          }
        });
    }
  }, [nileWallet, contracts, lastOrder]);

  const sendApproved = async () => {
    const address = lastOrder?.round === NileNftOrderRound.FIRST ? addressList['CFixedPriceOrder'] : addressList['OFixedPriceOrder'];

    setWalletModalType(WalletModalType.WAITING_APPROVE_WEMIX$);
    const data = await contracts.ERC20?.methods.approve(address, TOKEN_MAX_APPROVE_AMOUNT).encodeABI();
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
      (error: Error, hash: string) => {
        if (error) {
          setIsErrorModal(true);
          setWalletModalType(WalletModalType.APPROVE_WEMIX$);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              setIsApproved(true);
              setIsPendingModal(false);
              setWalletModalType(WalletModalType.PAYMENT);
            }
          });
        }
      },
    );

    openApp();
  };

  const modalEvent = useCallback(async () => {
    if (lastOrder?.round === NileNftOrderRound.FIRST) {
      await offerOpenFixedSellOrder();
    } else {
      await offerFixedSellOrder();
    }
  }, [lastOrder]);

  const offerFixedSellOrder = async () => {
    setIsPendingModal(true);
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    const collectionAddress = nft?.token?.collectionAddress;
    if (!collectionAddress) {
      return;
    }

    const offerMethodAbi = contracts.OpenMarket?.methods.offerSellOrder(lastOrder?.orderId, lastOrder?.orderAmount).encodeABI();
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
          return;
        }

        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            router
              .push({
                pathname: '/marketplace/bid/[collectionAddressOrSlug]/[tokenId]',
                query: { collectionAddressOrSlug: nft?.token?.collectionAddress, tokenId: nft?.token?.tokenId },
              })
              .then(() => {
                setIsApproved(true);
                setWalletModalType(WalletModalType.PAYMENT);
              });
          });
        }
      },
    );

    openApp();
  };

  const offerOpenFixedSellOrder = async () => {
    setIsPendingModal(true);
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    const collectionAddress = nft?.token?.collectionAddress;
    if (!collectionAddress) {
      return;
    }

    const offerMethodAbi = contracts.CurateMarket?.methods.offerSellOrder(lastOrder?.orderId, lastOrder?.orderAmount).encodeABI();
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
                  modalType: PaymentModalType.BUY_NOW,
                },
              })
              .then(() => {
                setIsApproved(true);
                setWalletModalType(WalletModalType.PAYMENT);
              });
          });
        }
      },
    );

    openApp();
  };

  const resetModal = useCallback(() => {
    setIsErrorModal(false);
    setIsPendingModal(false);
    setIsOpen(false);
    if (isApproved) setWalletModalType(WalletModalType.PAYMENT);
    else setWalletModalType(WalletModalType.APPROVE_WEMIX$);
  }, []);

  return (
    <>
      <PaymentCommonModal
        nft={nft}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        price={currentPrice}
        isApproved={isApproved}
        setIsPendingModal={setIsPendingModal}
        title={t('marketplaceModal.buyNow')}
        buttonText={t('marketplaceModal.buyNow')}
        showGasFee
        onClick={() => modalEvent()}
        notice={[t('marketplaceModal.buyNowInfo', { ns: 'common' }), t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })]}
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
          <BgButton buttonText={t('failedPopup.btn', { ns: 'common' })} color="black" size="md" key="Save" onClick={() => resetModal()} />,
        ]}
      >
        {t('failedPopup.txt3', { ns: 'common' })}
      </ModalLayout>
    </>
  );
};

export default BuyNowModal;
