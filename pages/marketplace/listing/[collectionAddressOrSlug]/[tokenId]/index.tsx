import React, { useEffect, useMemo, useState } from 'react';
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
import MarketPlaceListing from '@components/marketplace/MarketPlaceListing';
import { marketJsonAbiAddresses, marketAbis } from '@/web3/abis/market';
import { isAddress, toWei } from 'web3-utils';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { useAtom, useAtomValue } from 'jotai';
import { addressListAtom, contractsAtom } from '@/state/web3Atom';
import dynamic from 'next/dynamic';
import BgButton from '@components/button/BgButton';
import { Order, OrderStatus, Round } from '@/models/nile/contract';
import { useWemixWalletProvider } from '@components/wemix';
import { WalletModalType } from '@/types/modal.types';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });

export enum ListingStatus {
  LISTING = 'listing', // 판매 등록
  WAITING_CONFIRMATION = 'waitingForConfirmation', // 승인 대기
  WAITING_LISTING = 'waitingForListing', // 리스팅 중
  LISTING_SUCCESS = 'listingSuccess', // 완료 확인
}

const PlaceListingPage = () => {
  const { t } = useTranslation(['marketplace', 'common']);
  const router = useRouter();
  const api = NileApiService();

  const { openApp } = useWemixWalletProvider();

  const [contracts] = useAtom(contractsAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const addressList = useAtomValue(addressListAtom);
  const [walletModalType, setWalletModalType] = useState<WalletModalType>(WalletModalType.APPROVE_TRANSFER);

  const [state, setState] = useState(ListingStatus.LISTING);
  const [nft, setNft] = useState<NileNftToken>();
  const [isErrorModal, setErrorModal] = useState<boolean>(false);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);

  const [price, setPrice] = useState<number | null>();

  const { collectionAddressOrSlug, tokenId } = router.query;

  const [isApproved, setApproved] = useState(false);

  useEffect(() => {
    if (collectionAddressOrSlug && tokenId) {
      const { collectionSlug, collectionAddress } = {
        collectionSlug: isAddress(String(collectionAddressOrSlug)) ? undefined : String(collectionAddressOrSlug),
        collectionAddress: isAddress(String(collectionAddressOrSlug)) ? String(collectionAddressOrSlug) : undefined,
      };

      api.marketplace.nft
        .getItem({
          collectionSlug,
          collectionAddress,
          tokenId: Number(tokenId),
        })
        .then(({ data }) => setNft(data.result))
        .catch(() => null);
    }
  }, [collectionAddressOrSlug, tokenId]);

  const registeredButton = useMemo(() => {
    if (state === ListingStatus.LISTING_SUCCESS) {
      return (
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
          <ShareButton buttonType="bgButton" />
        </>
      );
    }
  }, [state]);

  const title = useMemo(() => {
    if (state === ListingStatus.LISTING) return t('listing.title');
    if (state === ListingStatus.WAITING_CONFIRMATION) return t('listProcess.waitingForConfirmation.contTitle');
    if (state === ListingStatus.WAITING_LISTING) return t('listProcess.waitingForListing.contTitle');
    if (state === ListingStatus.LISTING_SUCCESS) return t('listProcess.successfully.contTitle');
  }, [state, t]);

  const stateContent = useMemo(() => {
    switch (state) {
      case ListingStatus.WAITING_CONFIRMATION:
        return {
          icon: 'loading',
          title: t('listProcess.waitingForConfirmation.title'),
          cont: t('listProcess.waitingForConfirmation.desc'),
        };
      case ListingStatus.WAITING_LISTING:
        return {
          icon: 'loading',
          title: t('listProcess.waitingForListing.title'),
          cont: t('listProcess.waitingForListing.desc'),
        };
      case ListingStatus.LISTING_SUCCESS:
        return {
          icon: 'success',
          title: t('listProcess.successfully.title'),
          cont: t('listProcess.successfully.desc'),
        };
    }
    return false;
  }, [state, t]);

  const approve = async () => {
    setWalletModalType(WalletModalType.WAITING_APPROVE_TRANSFER);
    const collectionAddress = nft?.collectionAddress ?? '';
    const contract = new provider.web3.eth.Contract(marketAbis.NileERC721, nft?.collectionAddress);

    const data = contract.methods.setApprovalForAll(addressList['OpenMarket'], true).encodeABI();
    const gasPrice = await provider.web3.eth.getGasPrice();

    if (!collectionAddress) {
      return;
    }

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: collectionAddress,
        value: '0',
        data,
        gasPrice: gasPrice,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (err: Error, hash: string) => {
        if (err) {
          setIsPendingModal(false);
          setWalletModalType(WalletModalType.APPROVE_TRANSFER);
          setState(ListingStatus.LISTING);
        }

        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            setIsPendingModal(false);
            setApproved(true);
          });
        }
      },
    );

    openApp();
  };

  const registerSellOrder = async () => {
    setState(ListingStatus.WAITING_LISTING);

    const collectionAddress = nft?.collection?.address;
    if (!collectionAddress) {
      setState(ListingStatus.LISTING);
      return;
    }

    const order: Order = {
      round: Round.SECOND,
      orderStatus: OrderStatus.NONE,
      seller: nileWallet,
      collection: collectionAddress,
      payment: process.env.NEXT_PUBLIC_ENV_WEMIX_DOLLAR_CONTRACT_ADDRESS ?? '',
      buyer: [],
      orderID: 0,
      orderAmount: 1,
      startTime: 0,
      tid: Number(nft?.tokenId),
      price: toWei(String(price ?? 0)),
      limit: 1,
      totalSoldAmount: 0,
      soldAmount: [],
    };

    const estimatedGasFee = await provider.web3.eth.getGasPrice();
    const registerMethodAbi = contracts.OpenMarket?.methods.registerSellOrder(0, { ...order }).encodeABI();

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
      (error: Error, hash: string) => {
        if (error) {
          setState(ListingStatus.LISTING);
          setErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            setState(ListingStatus.LISTING_SUCCESS);
          });
        }
      },
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
        <ContentTitle title={title} />
        <div className={cn('listing-section')}>
          <MarketplaceProfileCard token={nft} />
          {state === ListingStatus.LISTING ? (
            <MarketPlaceListing
              oneTitle={t('listing.txt')}
              twoTitle={t('listing.txt2')}
              price={price}
              setPrice={setPrice}
              isApproved={isApproved}
              onClickButton={isApproved ? registerSellOrder : () => setIsPendingModal(true)}
            />
          ) : (
            <>
              {stateContent && (
                <MarketplaceState
                  iconValue={stateContent.icon}
                  title={stateContent.title}
                  cont={stateContent.cont}
                  buttons={registeredButton}
                  state={state}
                />
              )}
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
        <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={walletModalType}
                     onClickApprove={approve} />
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
