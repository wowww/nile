import { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { Tabs } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import MarketplaceApply from '@/components/marketplace/MarketplaceApply';
import { marketScrollAtom } from '@/state/windowAtom';
import { MarketPlaceCollectionTab } from '@components/marketplace/MarketplaceCollectionTab';
import { UiMarketPlaceCollectionTab } from '@components/marketplace/UiMarketplaceCollectionTab';
import { MarketplaceNftTab } from '@components/marketplace/MarketplaceNftTab';
import { useMoveScroll } from '@/hook/useMoveScroll';
import { useAtom, useAtomValue } from 'jotai';
import { marketplaceTabAtom } from '@/state/tabAtom';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useSetAtom } from 'jotai';
import { FILTER_SORTING_DEFAULT, tokenFilterAtom } from '@/state/filterAtom';
import { nftTabPageAtom } from '@/state/marketplace';

const MarketplaceHero = dynamic(() => import('@components/marketplace/MarketplaceHero'), { ssr: false });

const MarketplacePage = () => {
  const [currentTab, setCurrentTab] = useAtom(marketplaceTabAtom);
  const setNftFilter = useSetAtom(tokenFilterAtom);
  const setNftTabPage = useSetAtom(nftTabPageAtom);

  const { t } = useTranslation(['marketplace', 'common']);
  const { element, onMoveToElement } = useMoveScroll();

  const saveScroll = useAtomValue(marketScrollAtom);

  useEffect(() => {
    if (currentTab === 'nft') {
      window.scrollTo(0, saveScroll);
    }
  }, [saveScroll]);

  const onTabClick = useCallback((activeKey: string, e: any) => {
    setCurrentTab(activeKey);
  }, []);

  useEffect(() => {
    return () => {
      setCurrentTab('nft');
      setNftFilter({ sorting: FILTER_SORTING_DEFAULT, status: [], type: [], collectionSlug: 'SNKRZ' });
      setNftTabPage(1);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
      </Helmet>
      <div className={cn('marketplace-wrap')}>
        <MarketplaceHero />
        <div className={cn('marketplace-container')} ref={element}>
          <Tabs
            className={cn('tab-type tab-lg tab-full')}
            items={[
              {
                label: t('nft'),
                key: 'nft',
                children: <MarketplaceNftTab onMoveToElement={onMoveToElement} />,
              },
              {
                label: t('collection'),
                key: 'collection',
                /* 23.04.03 수정: cora 추가로 ui 화면으로 연결해둠 */
                // children: <MarketPlaceCollectionTab />,
                children: <MarketPlaceCollectionTab />,
              },
            ]}
            onTabClick={onTabClick}
            defaultActiveKey={currentTab}
          />
        </div>
        <MarketplaceApply />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['marketplace', 'common', 'mypage']);
  return {
    props: { ...translations },
  };
};

export default MarketplacePage;
