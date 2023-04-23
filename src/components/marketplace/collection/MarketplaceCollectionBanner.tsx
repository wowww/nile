import cn from 'classnames';

export type MarketplaceCollectionBannerProps = {
  imageUrl?: string;
};

const MarketplaceCollectionBanner = ({ imageUrl }: MarketplaceCollectionBannerProps) => {
  return (
    <div className={cn('collection-banner-section')}>
      <div className={cn('collection-banner img-type')}>
        <div className={cn('img-wrap')} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      </div>
    </div>
  );
};

export default MarketplaceCollectionBanner;
