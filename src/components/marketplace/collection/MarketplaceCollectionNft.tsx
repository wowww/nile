import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import PaginationCustom from '@/components/button/PaginationCustom';
import Empty from '@/components/empty/Empty';
import { NileApiService } from '@/services/nile/api';
import { PageInfoData } from '@components/marketplace/MarketplaceNftTab';
import { NileCollection, TraitType } from '@/types/marketplace.types';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import dynamic from 'next/dynamic';
import { useAtom } from 'jotai';
import { collectionDetailPageAtom } from '@/state/marketplace';

const MarketplaceCard = dynamic(() => import('@components/marketplace/nft/item/MarketplaceCard'), { ssr: false });

interface MarketplaceCollectionNftProps {
  collection?: NileCollection;
  onMoveToElement: () => void;
}

const MarketplaceCollectionNft = ({ collection, onMoveToElement }: MarketplaceCollectionNftProps) => {
  const { t } = useTranslation(['common']);
  const [pageInfo, setPageInfo] = useState<PageInfoData>();
  const [tokens, setTokens] = useState<NileNftToken[]>([]);

  const [currentPage, setCurrentPage] = useAtom(collectionDetailPageAtom);

  const [traits, setTraits] = useState<TraitType[]>();

  const api = NileApiService();
  const onChange = (page: number) => {
    setCurrentPage(page);
    onMoveToElement();
  };

  useEffect(() => {
    if (collection) {
      api.marketplace.collection
        .getTokens({ slug: collection?.slug }, currentPage, 12)
        .then(({ data }) => {
          setTokens(data.results);
          setPageInfo(data.pageInfo);
        })
        .catch((err) => {
          console.log('error white get nfts', err);
          return null;
        });

      api.marketplace.collection
        .getTraits(collection.address!!)
        .then(({ data }) => {
          setTraits(data.results);
        })
        .catch(() => {
          setTraits([]);
        });
    }
  }, [collection, currentPage]);

  useEffect(() => {
    setTokens((prev) => prev.sort((a, b) => new Date(a?.createdAt ?? '').valueOf() - new Date(b?.createdAt ?? '').valueOf()));
  }, [tokens]);

  return (
    <>
      {/*<CollectionFilter traits={traits ?? [] as TraitType[]} />*/}
      <div className={cn('nft-wrap')}>
        {tokens.length > 0 ? (
          <>
            <MarketplaceCard tokens={tokens} />
            <PaginationCustom
              defaultCurrent={currentPage}
              defaultPageSize={12}
              current={currentPage}
              total={pageInfo?.total}
              onChange={onChange}
              activate={currentPage}
            />
          </>
        ) : (
          <Empty subText={t('filterEmptyCase')} />
        )}
      </div>
    </>
  );
};

export default MarketplaceCollectionNft;
