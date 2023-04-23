import cn from 'classnames';
import { dataListItem } from '@components/marketplace/MarketplaceSubBannerInfo';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NileApiService } from '@/services/nile/api';
import MarketplaceBannerTypeCollection from '@components/marketplace/detail/MarketplaceBannerTypeCollection';
import axios from 'axios';
import marketplaceNftList from '@/mocks/marketplace/nft/list.json';

export const MarketPlaceCollectionTab = () => {
  const api = NileApiService();
  const [tokenWemix, setTokenWemix] = useState<any>();

  const [lus, setLus] = useState<NileCollection>();
  const [son, setSon] = useState<NileCollection>();
  const [cone, setCone] = useState<NileCollection>();
  const [cora, setCora] = useState<NileCollection>();
  const [tangled, setTangled] = useState<NileCollection>();
  const [kari, setKari] = useState<NileCollection>();
  const [snkrz, setSnkrz] = useState<NileCollection>();

  // const [tangledList]: NileCollection[] = marketplaceNftList;

  useEffect(() => {
    axios.get(`/api/tokenInfoList`).then(({ data }) => {
      data.forEach((token: any) => {
        if (token.token_symbol === 'WEMIX') {
          setTokenWemix(token);
        }
      });
    });
  }, []);

  const getCurrentValue = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value * tokenWemix?.price);
    },
    [tokenWemix],
  );

  const subBannerInfoList: {
    [key: string]: dataListItem[];
  } = {
    nile: [
      // {
      //   name: 'Next Auction',
      //   figure: '2023-03-21',
      // },
      // {
      //   name: 'On Auction',
      //   figure: '1',
      //   isLive: true,
      // },
      {
        name: 'Items',
        figure: '6',
      },
    ],
  };

  const sonCollection = useMemo(() => {
    if (son?.tokens) {
      const tokens = son.tokens.sort((a, b) => new Date(a?.createdAt ?? '').valueOf() - new Date(b?.createdAt ?? '').valueOf());
      return {
        ...son,
        tokens: tokens.slice(-3),
      };
    }
  }, [son]);

  const refresh = useCallback(() => {
    api.marketplace.collection
      .getItem(
        {
          slug: 'SON',
        },
        false,
      )
      .then(({ data }) => setSon(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem(
        {
          slug: 'LUS',
        },
        true,
        3,
      )
      .then(({ data }) => setLus(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem(
        {
          slug: 'CONE',
        },
        true,
        3,
      )
      .then(({ data }) => setCone(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem({
          slug: 'TTPS',
        },
        true,
        8,
      )
      .then(({ data }) => setTangled(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem({
          slug: 'SNKRZ',
        },
        true,
        3,
      )
      .then(({ data }) => setSnkrz(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem({
          slug: 'KARI',
        },
        true,
        3,
      )
      .then(({ data }) => setKari(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });
    api.marketplace.collection
      .getItem(
        {
          slug: 'CORA',
        },
        true,
        3,
      )
      .then(({ data }) => setCora(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });
  }, [api]);


  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={cn('marketplace-inner')}>
      <MarketplaceBannerTypeCollection
        classNames='snkrz'
        collection={snkrz}
        isOpen
        showStat={{ total: true }}
        aboutCollectionLink={{
          pathname: '/marketplace/[collectionAddressOrSlug]',
          query: { collectionAddressOrSlug: snkrz?.slug },
        }}
      />
      <MarketplaceBannerTypeCollection
        collection={tangled}
        newOpen
        customInfo={[
          { name: 'Collection Covenant', figure: '20,000 WEMIX', figureAddition: `($${getCurrentValue(20000)})` },
          { name: 'Covenant Date', figure: '2024-03-22' },
          { name: 'Items', figure: '100' },
        ]}
        aboutCollectionLink={{
          pathname: '/marketplace/[collectionAddressOrSlug]',
          query: { collectionAddressOrSlug: tangled?.slug },
        }}
      />
      <MarketplaceBannerTypeCollection
        classNames='cora'
        collection={cora}
        isOpen
        aboutCollectionLink={{
          pathname: '/marketplace/[collectionAddressOrSlug]',
          query: { collectionAddressOrSlug: cora?.slug },
        }}
        // showStat={{ total: true }}
        customInfo={[
          { name: 'Collection Covenant', figure: '198,000 WEMIX', figureAddition: `($${getCurrentValue(198000)})` },
          { name: 'Covenant Date', figure: '2024-04-12' },
          { name: 'Items', figure: '88' },
        ]}
      />
      <MarketplaceBannerTypeCollection
        collection={kari}
        isOpen
        showStat={{ total: true }}
        aboutCollectionLink={{
          pathname: '/marketplace/[collectionAddressOrSlug]',
          query: { collectionAddressOrSlug: kari?.slug },
        }}
      />
      <MarketplaceBannerTypeCollection
        collection={cone}
        isOpen
        customInfo={[
          { name: 'Collection Covenant', figure: '198,000 WEMIX', figureAddition: `($${getCurrentValue(198000)})` },
          { name: 'Covenant Date', figure: '2024-03-16' },
          { name: 'Items', figure: '88' },
        ]}
        aboutCollectionLink={{
          pathname: '/marketplace/[collectionAddressOrSlug]',
          query: { collectionAddressOrSlug: cone?.slug },
        }}
      />
      <MarketplaceBannerTypeCollection
        isOpen
        collection={sonCollection}
        customInfo={subBannerInfoList.nile}
        aboutCollectionLink={{
          pathname: '/marketplace/[collectionAddressOrSlug]',
          query: { collectionAddressOrSlug: sonCollection?.slug },
        }}
      />
      <MarketplaceBannerTypeCollection collection={lus} showStat={{ total: true, ongoing: false }} isOpen />
    </div>
  );
};
