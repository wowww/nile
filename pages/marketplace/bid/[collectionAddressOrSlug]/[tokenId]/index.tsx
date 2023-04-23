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
import { PaymentModalType } from '@/types/modal.types';
import { isAddress } from 'web3-utils';

const PlaceBidPage = () => {
  const { t } = useTranslation(['marketplace', 'common']);
  const { query } = useRouter();
  const api = NileApiService();

  const [type, setType] = useState<string>('placeBid');
  const [nft, setNft] = useState<NileNftToken>();

  const { modalType, collectionAddressOrSlug, tokenId } = query;

  const { collectionSlug, collectionAddress } = {
    collectionSlug: isAddress(String(collectionAddressOrSlug)) ? undefined : String(collectionAddressOrSlug),
    collectionAddress: isAddress(String(collectionAddressOrSlug)) ? String(collectionAddressOrSlug) : undefined,
  };

  useEffect(() => {
    api.marketplace.nft
      .getItem({
        collectionSlug,
        collectionAddress,
        tokenId: Number(tokenId),
      })
      .then(({ data }) => setNft(data.result))
      .catch(() => null);
  }, []);

  useEffect(() => {
    if (modalType) {
      setType(String(modalType));
    }
  }, [modalType]);

  const content: { title: string; subTitle: string; cont: string } | undefined = useMemo(() => {
    switch (type) {
      case PaymentModalType.PLACE_BID:
        return {
          title: t('placeBid', { ns: 'common' }),
          subTitle: t('bidResultPage.successTitle', { ns: 'marketplace' }),
          cont: t('bidResultPage.successDesc', { ns: 'marketplace' }),
        };
      case PaymentModalType.RETRACTING_BID:
        return {
          title: t('cancelBid', { ns: 'common' }),
          subTitle: t('bidResultPage.cancelTitle', { ns: 'marketplace' }),
          cont: t('bidResultPage.cancelDesc', { ns: 'marketplace' }),
        };
      case PaymentModalType.GET_BID_BACK:
        return {
          title: t('getRefund', { ns: 'common' }),
          subTitle: t('bidResultPage.refundTitle', { ns: 'marketplace' }),
          cont: t('bidResultPage.refundDesc', { ns: 'marketplace' }),
        };
      case PaymentModalType.BUY_NOW:
        return {
          title: t('buyNow', { ns: 'common' }),
          subTitle: t('bidResultPage.purchaseTitle', { ns: 'marketplace' }),
          cont: t('bidResultPage.purchaseDesc', { ns: 'marketplace' }),
        };
      case PaymentModalType.COMPLETE_CHECKOUT:
        return {
          title: t('marketplaceModal.completeCheckout', { ns: 'common' }),
          subTitle: t('marketplaceModal.completeCheckout', { ns: 'common' }),
          cont: t('bidResultPage.checkoutCompleteDesc', { ns: 'marketplace' }),
        };
    }
  }, [type]);

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body />
      </Helmet>
      <div className={cn('marketplace-bid-wrap')}>
        <ContentTitle title={content?.title ?? ''} />
        <div className={cn('bid-top-section')}>
          <div className={cn('bid-cont-wrap')}>
            <MarketplaceProfileCard token={nft} />
            <MarketplaceState
              title={content?.subTitle ?? ''}
              iconValue="success"
              cont={content?.cont ?? ''}
              buttons={
                <>
                  <OutlineButton
                    buttonText={t('viewNft', { ns: 'common' })}
                    color="black"
                    size="md"
                    href={{
                      pathname: '/marketplace/[collectionAddressOrSlug]/[tokenId]',
                      query: { collectionAddressOrSlug: nft?.collection?.slug, tokenId: nft?.tokenId },
                    }}
                  />
                  {type === PaymentModalType.RETRACTING_BID ? (
                    <ShareButton buttonType="bgButton" customPath={`/marketplace/${nft?.collection?.slug}/${nft?.tokenId}`} />
                  ) : (
                    <OutlineButton buttonText={t('goToMarketplace', { ns: 'common' })} color="black" size="md" href="/marketplace" />
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

export default PlaceBidPage;
