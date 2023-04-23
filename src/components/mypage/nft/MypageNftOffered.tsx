import { NileApiService } from '@/services/nile/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import NileNft from '@/models/nile/marketplace/NileNft';
import cn from 'classnames';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import PaginationCustom from '@components/button/PaginationCustom';
import Empty from '@components/empty/Empty';
import TextButton from '@components/button/TextButton';
import { useTranslation } from 'next-i18next';
import { PageInfoData } from '@components/marketplace/MarketplaceNftTab';
import { MyPageTabPros } from '@/types/myPage.types';
import { selectedWalletAtom } from '@/state/accountAtom';

export const MyPageNftOffered = ({ tabKey, currentTabKey }: MyPageTabPros) => {
  const { t } = useTranslation(['mypage', 'common']);
  const api = NileApiService();
  const selectedWallet = useAtomValue(selectedWalletAtom);

  const [tokenList, setTokenList] = useState<NileNft[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoData>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchTokens = useCallback((page: number) => {
    api.mypage.nft
      .getOfferList(selectedWallet ?? '', page - 1, 12)
      .then(({ data }) => {
        // setNftList(data);
        setTokenList(data.results);
        setPageInfo(data.pageInfo);
      })
      .catch((err) => {
        setTokenList([]);
        return null;
      });
  }, [selectedWallet]);

  useEffect(() => {
    selectedWallet && fetchTokens(0);
  }, [selectedWallet]);

  useEffect(() => {
    if (tabKey === currentTabKey) {
      fetchTokens(0);
    }
  }, [tabKey, currentTabKey]);

  return (
    <div className={cn('mypage-cards temporary')}>
      {tokenList?.length > 0 && <span className={cn('total-num')}>{pageInfo?.total ?? '0'} NFT</span>}
      {tokenList?.length > 0 ? (
        <>
          <MarketplaceCard tokens={tokenList} disableMy />
          {pageInfo && pageInfo.total / pageInfo.size > 1 && (
            <PaginationCustom
              defaultCurrent={currentPage}
              defaultPageSize={pageInfo?.size}
              current={currentPage}
              total={pageInfo?.total}
              onChange={onPageChange}
              activate={currentPage}
            />
          )}
        </>
      ) : (
        <Empty
          subText={t('empty.ownedNft')}
          button={<TextButton buttonText={t('goToMarketplace', { ns: 'common' })} iconValue="arrow" size="sm" href="/marketplace" type="link" />}
        />
      )}
    </div>
  );
};
