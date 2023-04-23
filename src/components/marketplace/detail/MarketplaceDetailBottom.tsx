import React, { forwardRef, useMemo, useState } from 'react';
import cn from 'classnames';

import { Tabs } from 'antd';
import MarketplaceDetailAbout from '@/components/marketplace/detail/MarketplaceDetailAbout';
import MarketplaceDetailHistory from '@/components/marketplace/detail/MarketplaceDetailHistory';
import { NileNftMetadata } from '@/models/nile/marketplace/NileNft';
import MarketplaceDetailRecommend from '@components/marketplace/detail/MarketplaceDetailRecommend';

export type MarketplaceDetailBottomProps = {
  metadata?: NileNftMetadata;
};

const MarketplaceDetailBottom = forwardRef<HTMLDivElement, MarketplaceDetailBottomProps>(({ metadata}, ref) => {
  const [currentTab, setCurrentTab] = useState<string>('about');

  const marketplaceDetailTabs = [
    {
      label: 'About',
      key: 'about',
      children: (
        <div className={cn('marketplace-detail-inner')}>
          <MarketplaceDetailAbout metadata={metadata} />
        </div>
      ),
    },
    {
      label: 'History',
      key: 'history',
      children: (
        <div className={cn('marketplace-detail-inner')}>
          <MarketplaceDetailHistory />
        </div>
      ),
      disabled: true,
    },
  ];

  return (
    <div className={cn('marketplace-bottom-section')} ref={ref}>
      <Tabs
        activeKey={currentTab}
        className={cn('tab-type tab-lg tab-full')}
        items={marketplaceDetailTabs}
        onTabClick={(key: string) => {
          setCurrentTab(key);
        }}
      />
    </div>
  );
});

export default MarketplaceDetailBottom;
