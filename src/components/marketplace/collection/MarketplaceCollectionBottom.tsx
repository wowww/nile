import cn from 'classnames';

import { Tabs } from 'antd';

import MarketplaceCollectionNft from '@/components/marketplace/collection/MarketplaceCollectionNft';
import MarketplaceCollectionActivity from '@/components/marketplace/collection/MarketplaceCollectionActivity';
import { useMoveScroll } from '@/hook/useMoveScroll';
import {NileCollection} from "@/types/marketplace.types";

interface MarketplaceCollectionBottomProps {
  collection?: NileCollection;
}
const MarketplaceCollectionBottom = ({ collection }: MarketplaceCollectionBottomProps) => {
  const { element, onMoveToElement } = useMoveScroll();

  const marketplaceDetailTabs = [
    {
      label: 'NFT',
      key: 'nft',
      children: (
        <div className={cn('collection-inner filter-type temporary')}>
          <MarketplaceCollectionNft collection={collection} onMoveToElement={onMoveToElement} />
        </div>
      ),
    },
    {
      label: 'Activity',
      key: 'activity',
      children: (
        <div className={cn('collection-inner')}>
          <MarketplaceCollectionActivity />
        </div>
      ),
      disabled: true,
    },
  ];

  return (
    <div className={cn('collection-bottom-section')} ref={element}>
      <Tabs defaultActiveKey="about" className={cn('tab-type tab-lg tab-full')} items={marketplaceDetailTabs} />
    </div>
  );
};

export default MarketplaceCollectionBottom;
