import NileCollection from '@/models/nile/marketplace/NileCollection';
import MarketplaceSubBanner from '@components/marketplace/MarketplaceSubBanner';
import { dataListItem } from '@components/marketplace/MarketplaceSubBannerInfo';
import cn from 'classnames';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import { UrlObject } from 'url';

interface MarketplaceCollectionInfoProps {
  collection?: NileCollection;
  collectionLink?: string | UrlObject;
  collectionLinkText?: string;
  lifeLink?: string | UrlObject;
  lifeLinkText?: string;
  customInfo?: dataListItem[];
  infoColor?: 'white' | 'black';
  showStat?: boolean;
}

export const MarketplaceCollectionInfo = ({
  collection,
  collectionLink,
  collectionLinkText,
  lifeLink,
  lifeLinkText,
  customInfo,
  infoColor,
  showStat,
}: MarketplaceCollectionInfoProps) => {
  return (
    <>
      <MarketplaceSubBanner
        collection={collection}
        collectionLink={collectionLink}
        collectionLinkText={collectionLinkText}
        lifeLink={lifeLink}
        lifeLinkText={lifeLinkText}
        customInfo={customInfo}
        infoColor={infoColor}
        showStat={showStat}
      />
      <div className={cn('marketplace-collections-section')}>
        <MarketplaceCard tokens={collection?.tokens} />
      </div>
    </>
  );
};
