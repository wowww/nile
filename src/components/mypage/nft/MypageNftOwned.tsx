import React, { useCallback, useEffect, useState } from 'react';

import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Select } from 'antd';
import TextButton from '@/components/button/TextButton';
import Empty from '@/components/empty/Empty';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import PaginationCustom from '@/components/button/PaginationCustom';
import { NileApiService } from '@/services/nile/api';
import { PageInfoData } from '@components/marketplace/MarketplaceNftTab';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { MyPageTabPros } from '@/types/myPage.types';
import NileNft from '@/models/nile/marketplace/NileNft';
import { selectedWalletAtom } from '@/state/accountAtom';

const { Option } = Select;

const MyPageNftOwned = ({ tabKey, currentTabKey }: MyPageTabPros) => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);
  const [activatePagination, setPaginationActivate] = useState(1);
  const [isModalNftAlbum, setModalNftAlbum] = useState(false);

  const [tokenList, setTokenList] = useState<NileNft[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoData>();
  const [nftList, setNftList] = useState<any>();
  const api = NileApiService();

  const selectedWallet = useAtomValue(selectedWalletAtom);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [collection, setCollection] = useState<any>();

  const fetchTokens = useCallback(
    (page: number) => {
      api.mypage.nft
        .getList(selectedWallet ?? '', page, 12)
        .then(({ data }) => {
          // setNftList(data);
          setTokenList(data.results);
          setPageInfo(data.pageInfo);
        })
        .catch((err) => {
          setTokenList([]);
          return null;
        });
    },
    [selectedWallet],
  );

  const onPageChange = (page: number) => {
    fetchTokens(page);
  };

  useEffect(() => {
    selectedWallet && fetchTokens(1);
  }, []);

  useEffect(() => {
    if (tabKey === currentTabKey) {
      selectedWallet && fetchTokens(0);
    }
  }, [tabKey, currentTabKey]);

  useEffect(() => {
    if (selectedWallet) {
      fetchTokens(0);
    }
  }, [selectedWallet]);

  // useEffect(() => {
  //   setPageInfo({
  //     ...nftList?.pageInfo,
  //   });
  // }, [nftList]);

  return (
    <>
      <div className={cn('mypage-utils owned')}>
        {/*<div className={cn('filters-wrap')}>*/}
        {/*  <MypageFilter />*/}
        {/*</div>*/}
        {/*<div className={cn('utils-wrap')}>*/}
        {/*  <OutlineButton*/}
        {/*    buttonText={t('NFTAlbum')}*/}
        {/*    color="black"*/}
        {/*    size="md"*/}
        {/*    iconType*/}
        {/*    iconValue="album"*/}
        {/*    onClick={() => {*/}
        {/*      setModalNftAlbum(true);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <NftAlbumModal isModal={isModalNftAlbum} setIsModal={setModalNftAlbum} />*/}
        {/*  <Select*/}
        {/*    size="middle"*/}
        {/*    defaultValue={t('recently')}*/}
        {/*    key={Id}*/}
        {/*    suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}*/}
        {/*    popupClassName="select-size-md-dropdown"*/}
        {/*    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}*/}
        {/*  >*/}
        {/*    <Option value="recently">{t('sorting.1')}</Option>*/}
        {/*    <Option value="closing">{t('sorting.2')}</Option>*/}
        {/*    <Option value="recent">{t('sorting.3')}</Option>*/}
        {/*    <Option value="old">{t('sorting.4')}</Option>*/}
        {/*    <Option value="highest">{t('sorting.5')}</Option>*/}
        {/*    <Option value="lowest">{t('sorting.6')}</Option>*/}
        {/*  </Select>*/}
        {/*</div>*/}
      </div>
      <div className={cn('mypage-cards temporary')}>
        {tokenList?.length > 0 && <span className={cn('total-num')}>{pageInfo?.total ?? '0'} NFT</span>}
        {tokenList?.length > 0 ? (
          <>
            <MarketplaceCard tokens={tokenList} disableMy />
            {pageInfo && pageInfo.total / pageInfo.size > 1 && (
              <PaginationCustom
                defaultCurrent={pageInfo.number + 1}
                defaultPageSize={pageInfo?.size}
                current={pageInfo.number + 1}
                total={pageInfo?.total}
                onChange={onPageChange}
                activate={pageInfo.number + 1}
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
    </>
  );
};

export default MyPageNftOwned;
