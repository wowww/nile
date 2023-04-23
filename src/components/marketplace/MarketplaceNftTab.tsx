import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import IconButton from '@components/button/IconButton';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import PaginationCustom from '@components/button/PaginationCustom';
import Empty from '@components/empty/Empty';
import { useTranslation } from 'next-i18next';
import { NileCollectionCategory } from '@/models/nile/marketplace/NileCollection';
import { NileApiService } from '@/services/nile/api';
import { useAtom, useAtomValue } from 'jotai';
import { tokenFilterAtom } from '@/state/filterAtom';
import { marketplaceViewTypeAtom } from '@/state/tabAtom';
import NftFilter from '@components/marketplace/filter/NftFilter';
import { nftTabPageAtom } from '@/state/marketplace';
/* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

export type PageInfoData = {
  hasNextPage: boolean;
  number: number;
  size: number;
  total: number;
};

export const MarketplaceNftTab = ({ onMoveToElement }: { onMoveToElement: () => void }) => {
  const { t } = useTranslation(['marketplace', 'common']);
  /* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');
  const api = NileApiService();

  const [currentPage, setCurrentPage] = useAtom(nftTabPageAtom);
  const [pageInfo, setPageInfo] = useState<PageInfoData>();
  const [nftList, setNftList] = useState<any>();

  const filter = useAtomValue(tokenFilterAtom);
  const [categories, setCategories] = useState<NileCollectionCategory[]>();

  useEffect(() => {
    api.marketplace.nft
      .getOrderList(currentPage, 12, filter?.sorting, filter?.status, filter?.type, filter?.collectionSlug)
      .then(({ data }) => {
        setNftList(data.results);
        setPageInfo(data.pageInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, filter]);

  useEffect(() => {
    api.marketplace.collection.getCategories().then(({ data }) => setCategories(data));
  }, []);

  const [toggleView, setToggleView] = useAtom(marketplaceViewTypeAtom);
  const [viewType, setViewType] = useState<string>('card');

  const onChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    onMoveToElement();
  };

  useEffect(() => {
    setViewType(toggleView ? 'list' : 'card');
  }, [toggleView]);

  return (
    <div className={cn('marketplace-inner filter-type temporary')}>
      <NftFilter />
      <div className={cn('nft-wrap')}>
        <div className={cn('nft-view-change-wrap')}>
          <div className={cn('total-num')}>{pageInfo?.total} NFT</div>
          <div className={cn('view-switch-button-wrap')}>
            {isMobile ? (
              <>
                <IconButton
                  buttonText={t('viewListType', { ns: 'common' })}
                  size="24"
                  iconValue="list"
                  onClick={() => setToggleView(false)}
                  activate={!toggleView}
                  classnames={cn('view-switch')}
                />
                <IconButton
                  buttonText={t('viewCardType', { ns: 'common' })}
                  size="24"
                  iconValue="cardMo"
                  onClick={() => setToggleView(true)}
                  activate={toggleView}
                  classnames={cn('view-switch')}
                />
              </>
            ) : (
              <>
                <IconButton
                  buttonText={t('viewCardType', { ns: 'common' })}
                  size="24"
                  iconValue="card"
                  onClick={() => setToggleView(false)}
                  activate={!toggleView}
                  classnames={cn('view-switch')}
                />
                <IconButton
                  buttonText={t('viewListType', { ns: 'common' })}
                  size="24"
                  iconValue="list"
                  onClick={() => setToggleView(true)}
                  activate={toggleView}
                  classnames={cn('view-switch')}
                />
              </>
            )}
          </div>
        </div>
        {nftList?.length > 0 ? (
          <div className={cn('marketplace-nft-section')}>
            <MarketplaceCard tokens={nftList} viewType={viewType} />
            <PaginationCustom
              defaultCurrent={currentPage}
              activate={currentPage}
              defaultPageSize={12}
              current={currentPage}
              total={pageInfo?.total}
              onChange={onChange}
            />
          </div>
        ) : (
          <Empty subText={t('filterEmptyCase', { ns: 'common' })} />
        )}
      </div>
    </div>
  );
};
