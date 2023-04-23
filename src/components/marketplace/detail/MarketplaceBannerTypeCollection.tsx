import { useEffect, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import OutlineButton from '@/components/button/OutlineButton';
import MarketplaceCard from '@components/marketplace/nft/item/MarketplaceCard';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import { OrderStatType } from '@components/marketplace/MarketplaceSubBanner';
import { NileApiService } from '@/services/nile/api';
import { dataListItem } from '@components/marketplace/MarketplaceSubBannerInfo';
import { useTranslation } from 'next-i18next';
import { UrlObject } from 'url';
/* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

interface CollectionProps {
  collection?: NileCollection;
  isOpen?: boolean;
  customInfo?: dataListItem[];
  showStat?: {
    ongoing?: boolean;
    total?: boolean;
    closed?: boolean;
  };
  aboutCollectionLink?: UrlObject | string;
  newOpen?: boolean;
  classNames?: string;
}

const MarketplaceBannerTypeCollection = ({ collection, isOpen, customInfo, showStat, aboutCollectionLink, newOpen, classNames }: CollectionProps) => {
  const api = NileApiService();
  const [orderStat, setOrderStat] = useState<OrderStatType>();

  const { t } = useTranslation(['marketplace', 'common']);
  /* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');
  useEffect(() => {
    if (collection?.slug) {
      api.marketplace.collection
        .getOrderStat(collection.slug)
        .then(({ data }) => {
          setOrderStat(data.result);
        })
        .catch(() => {
          setOrderStat({
            total: 0,
            ongoing: 0,
            closed: 0,
          });
        });
    }
  }, [collection]);

  return (
    <div
      className={cn('marketplace-collection-banner-type', collection?.slug?.toLowerCase(), !isOpen && 'upcoming-collection', newOpen && 'new-open', classNames)}
    >
      <div className={cn('text-block')}>
        <div className={cn('title-wrap')}>
          <div className={cn('img-wrap')}>
            {collection?.logoImageUrl && (
              <Image src={collection?.logoImageUrl} alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" unoptimized />
            )}
          </div>
          <h3 className={cn('title')}>{collection?.name}</h3>
          <div className={cn('button-wrap')}>
            {isOpen ? (
              <OutlineButton
                buttonText={t('goToCollection', { ns: 'common' })}
                block={!isTablet || isMobile}
                size="md"
                color="white"
                href={{
                  pathname: '/marketplace/[collectionAddressOrSlug]',
                  query: { collectionAddressOrSlug: collection?.slug },
                }}
              />
            ) : (
              <OutlineButton
                buttonText={t('goToCollection', { ns: 'common' })}
                block={!isTablet || isMobile}
                size="md"
                color="white"
                href={aboutCollectionLink}
              />
            )}
          </div>
        </div>
        <div className={cn('info-wrap')}>
          <dl className={cn('info-list', collection?.slug.toLowerCase() === 'son' && 'son-info')}>
            {showStat && (
              <>
                {showStat?.ongoing && (
                  <div>
                    <dt className={cn('on-auction')}>On Auction</dt>
                    <dd>{orderStat?.ongoing}</dd>
                  </div>
                )}
                {showStat?.total && (
                  <div>
                    <dt>Items</dt>
                    <dd>{orderStat?.total}</dd>
                  </div>
                )}
                {showStat?.closed && (
                  <div>
                    <dt>Auction Closed</dt>
                    <dd>{orderStat?.closed}</dd>
                  </div>
                )}
              </>
            )}
            {customInfo?.map((item, index) => {
              return (
                <div key={index}>
                  <dt className={cn({ 'on-auction': item?.isLive })}>{item.name}</dt>
                  <dd>
                    <span className={cn('figure-text')}>{item.figure}</span>
                    {item.figureAddition && <span className={cn('figure-addition')}>{item.figureAddition}</span>}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
      <div className={cn('list-block')}>
        <MarketplaceCard tokens={collection?.tokens} disableMy />
      </div>
    </div>
  );
};

export default MarketplaceBannerTypeCollection;
