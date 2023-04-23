import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths } from 'next';
import { NileApiService } from '@/services/nile/api';

import { useTranslation } from 'next-i18next';
import ContentTitle from '@components/marketplace/ContentTitle';
import MarketplaceProfileCard from '@components/marketplace/MarketplaceProfileCard';
import MarketplaceState from '@components/marketplace/MarketplaceState';
import OutlineButton from '@components/button/OutlineButton';
import ShareButton from '@components/button/ShareButton';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import { useRouter } from 'next/router';
import { marketAbis } from '@/web3/abis/market';
import { isAddress, toWei } from 'web3-utils';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import BgButton from '@components/button/BgButton';
import MarketplaceListingTransfer from '@components/marketplace/MarketplaceListingTransfer';
import { useWemixWalletProvider } from '@components/wemix';
import { WalletModalType } from '@/types/modal.types';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });

export enum TransferStatus {
  TRANSFER = 'transfer', // 이전 등록
  TRANSFER_SUCCESS = 'transferSuccess', // 이전 완료
}

const PlaceListingPage = () => {
  const { t } = useTranslation(['marketplace', 'common']);
  const router = useRouter();
  const api = NileApiService();
  const { openApp } = useWemixWalletProvider();

  const nileWallet = useAtomValue(nileWalletAtom);

  const [state, setState] = useState<TransferStatus>(TransferStatus.TRANSFER);
  const [nft, setNft] = useState<NileNftToken>();
  const [isErrorModal, setErrorModal] = useState(false);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [walletModalType, setWalletModalType] = useState<WalletModalType>(WalletModalType.APPROVE_TRANSFER);

  const [toAddress, setToAddress] = useState<string | null>();

  const { collectionAddressOrSlug, tokenId } = router.query;

  useEffect(() => {
    if (collectionAddressOrSlug && tokenId) {
      const { collectionSlug, collectionAddress } = {
        collectionSlug: isAddress(String(collectionAddressOrSlug)) ? undefined : String(collectionAddressOrSlug),
        collectionAddress: isAddress(String(collectionAddressOrSlug)) ? String(collectionAddressOrSlug) : undefined,
      };

      api.marketplace.nft
        .getItem({
          collectionSlug: String(collectionSlug),
          collectionAddress: String(collectionAddress),
          tokenId: Number(tokenId),
        })
        .then(({ data }) => setNft(data.result))
        .catch(() => null);
    }
  }, [collectionAddressOrSlug, tokenId]);

  const approve = async () => {
    setWalletModalType(WalletModalType.WAITING_APPROVE_TRANSFER);

    const contract = new provider.web3.eth.Contract(marketAbis.NileERC721, nft?.collectionAddress);
    const data = contract.methods.approve(nft?.collectionAddress, tokenId).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    const collectionAddress = nft?.collection?.address;
    if (!collectionAddress) {
      setState(TransferStatus.TRANSFER);
      return;
    }

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: collectionAddress,
        value: '0',
        data,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error: Error, hash: string) => {
        if (error) {
          setIsPendingModal(false);
          setErrorModal(true);
          setWalletModalType(WalletModalType.APPROVE_TRANSFER);
        }

        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            setIsPendingModal(false);
            setApproved(true);
          });
        }
      }
    );
    openApp();
  };

  const transferFrom = async () => {
    setIsPendingModal(true);

    const contract = new provider.web3.eth.Contract(marketAbis.NileERC721, nft?.collectionAddress);
    const data = await contract.methods.transferFrom(nft?.ownerAddress, toAddress, tokenId).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();
    const collectionAddress = nft?.collection?.address;
    if (!collectionAddress) {
      setState(TransferStatus.TRANSFER);
      return;
    }

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: collectionAddress,
        value: '0',
        data,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error: Error, hash: string) => {
        if (error) {
          setErrorModal(true);
        }

        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            setIsPendingModal(false);
            setState(TransferStatus.TRANSFER_SUCCESS);
          });
        }
      }
    );
    openApp();
  };

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body />
      </Helmet>
      <div className={cn('marketplace-listing-wrap')}>
        <ContentTitle title={'Transfer'} />
        <div className={cn('listing-section')}>
          <MarketplaceProfileCard token={nft} />
          {state === TransferStatus.TRANSFER ? (
            <>
              <MarketplaceListingTransfer
                title={t('listing.txt8')}
                address={toAddress ?? ''}
                setAddress={setToAddress}
                onClick={transferFrom}
                approved={approved}
                onClickApprove={() => setIsPendingModal(true)}
              />
            </>
          ) : (
            <>
              <MarketplaceState
                title={t('listProcess.transfer.title')}
                cont={t('listProcess.transfer.desc')}
                iconValue="success"
                state={state}
                buttons={
                  <>
                    <OutlineButton
                      buttonText={t('goToNFTs', { ns: 'common' })}
                      color="black"
                      size="md"
                      href={{
                        pathname: '/marketplace/[collectionAddressOrSlug]/[tokenId]',
                        query: { collectionAddressOrSlug, tokenId },
                      }}
                    />
                    <ShareButton buttonType="bgButton" customPath={`/marketplace/${collectionAddressOrSlug}/${tokenId}`} />
                  </>
                }
              />
            </>
          )}
        </div>
        <ModalLayout
          isOpen={isErrorModal}
          setIsOpen={setErrorModal}
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
                router
                  .push({
                    pathname: '/marketplace/[collectionAddressOrSlug]/[tokenId]',
                    query: { collectionAddressOrSlug, tokenId },
                  })
                  .then(() => {
                    setErrorModal(false);
                  });
              }}
            />,
          ]}
        >
          {t('failedPopup.txt3', { ns: 'common' })}
        </ModalLayout>
        <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={walletModalType} onClickApprove={approve} />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['marketplace', 'common'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default PlaceListingPage;
