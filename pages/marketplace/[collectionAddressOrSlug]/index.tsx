import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MarketplaceCollectionBanner from '@components/marketplace/collection/MarketplaceCollectionBanner';
import MarketplaceCollectionTop from '@components/marketplace/collection/MarketplaceCollectionTop';
import MarketplaceCollectionBottom from '@components/marketplace/collection/MarketplaceCollectionBottom';
import { GetStaticPaths } from 'next';
import { NileApiService } from '@/services/nile/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import { isAddress } from 'web3-utils';

export type selectedFilterData = {
  property: string | string[];
  value: string | string[];
};

const MarketplaceCollection = () => {
  const { query } = useRouter();
  const { property, value, collectionAddressOrSlug } = query;

  const [filter, setFilter] = useState<selectedFilterData>();
  const [collection, setCollection] = useState<NileCollection | undefined>();

  const api = NileApiService();

  const { slug, address } = {
    slug: isAddress(String(collectionAddressOrSlug)) ? undefined : String(collectionAddressOrSlug),
    address: isAddress(String(collectionAddressOrSlug)) ? String(collectionAddressOrSlug) : undefined,
  };

  useEffect(() => {
    api.marketplace.collection
      .getItem({ slug, address })
      .then(({ data }) => setCollection(data?.result?.collection))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (property && value) {
      setFilter((prev) => ({ ...prev, property, value }));
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Detail &gt; Collection &gt; Marketplace &gt; NILE</title>
      </Helmet>
      <div className={cn('marketplace-collection-wrap')}>
        <MarketplaceCollectionBanner imageUrl={collection?.bannerImageUrl ?? ''} />
        <MarketplaceCollectionTop collection={collection} />
        <MarketplaceCollectionBottom collection={collection} />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['marketplace', 'common', 'life', 'mypage'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default MarketplaceCollection;
