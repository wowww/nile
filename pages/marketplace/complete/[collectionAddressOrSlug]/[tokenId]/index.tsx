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
import React, { useEffect, useMemo, useState } from 'react';
import { isAddress } from 'web3-utils';

export enum CompleteType {
  PLACE_BID = 'placeBid',
  ACCEPT_OFFER = 'acceptOffer',
  CANCEL_SALE = 'cancelSale',
  MAKE_OFFER = 'makeOffer',
  CHANGE_STATUS = 'changeStatus',
}

const CompletePage = () => {
  const { t } = useTranslation(['marketplace', 'common']);
  const api = NileApiService();

  const [nft, setNft] = useState<NileNftToken>();

  const {
    query: { type, collectionAddressOrSlug, tokenId },
  } = useRouter();

  const { collectionSlug, collectionAddress } = {
    collectionSlug: isAddress(String(collectionAddressOrSlug)) ? undefined : String(collectionAddressOrSlug),
    collectionAddress: isAddress(String(collectionAddressOrSlug)) ? String(collectionAddressOrSlug) : undefined,
  };

  useEffect(() => {
    api.marketplace.nft
      .getItem({
        collectionAddress: String(collectionAddress),
        collectionSlug: String(collectionSlug),
        tokenId: Number(tokenId),
      })
      .then(({ data }) => setNft(data.result))
      .catch(() => null);
  }, []);

  const item = useMemo(() => {
    if (type === CompleteType.PLACE_BID) {
      return {
        title: t('marketplaceModal.completeCheckout'),
        subTitle: t('listProcess.resultAccept.title'),
        cont: t('listProcess.resultAccept.desc'),
      };
    }

    if (type === CompleteType.ACCEPT_OFFER) {
      return {
        title: 'Accept Offer',
        subTitle: t('listProcess.resultAccept.title'),
        cont: t('listProcess.resultAccept.desc'),
      };
    }

    if (type === CompleteType.CANCEL_SALE) {
      return {
        title: t('listProcess.resultCancel.contTitle'),
        subTitle: t('listProcess.resultCancel.title'),
        cont: t('listProcess.resultCancel.desc'),
      };
    }

    if (type === CompleteType.MAKE_OFFER) {
      return {
        title: 'Make Offer',
        subTitle: t('offerProcess.title'),
        cont: t('offerProcess.desc'),
      };
    }

    if (type === CompleteType.CHANGE_STATUS) {
      return {
        title: 'Change Status',
        subTitle: t('listProcess.resultChangeNotForSale.title'),
        cont: t('listProcess.resultChangeNotForSale.desc'),
      };
    }

    return {
      title: '',
      subTitle: '',
      cont: '',
    };
  }, [nft]);

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body />
      </Helmet>
      <div className={cn('marketplace-bid-wrap')}>
        <ContentTitle title={item.title} />
        <div className={cn('bid-top-section')}>
          <div className={cn('bid-cont-wrap')}>
            <MarketplaceProfileCard token={nft} />
            <MarketplaceState
              title={item.subTitle}
              cont={item.cont}
              iconValue="success"
              buttons={
                <>
                  <OutlineButton
                    buttonText={t('goToNFTs', { ns: 'common' })}
                    color="black"
                    size="md"
                    href={{
                      pathname: '/marketplace/[collectionAddressOrSlug]/[tokenId]',
                      query: { collectionAddressOrSlug: nft?.collection?.slug, tokenId: nft?.tokenId },
                    }}
                  />
                  {type === CompleteType.ACCEPT_OFFER || type === CompleteType.CANCEL_SALE ? (
                    <OutlineButton
                      buttonText={t('goToMarketplace', { ns: 'common' })}
                      color="black"
                      size="md"
                      href={{
                        pathname: '/marketplace/[collectionAddressOrSlug]',
                        query: { collectionAddressOrSlug: nft?.collection?.slug },
                      }}
                    />
                  ) : (
                    <ShareButton buttonType="bgButton" customPath={`/marketplace/${nft?.collection?.slug}/${nft?.tokenId}`} />
                  )}
                </>
              }
            />
          </div>
        </div>
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

export default CompletePage;
