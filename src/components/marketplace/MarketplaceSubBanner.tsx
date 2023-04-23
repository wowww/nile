import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import MarketplaceSubBannerInfo, { dataListItem } from './MarketplaceSubBannerInfo';

import OutlineButton from '@/components/button/OutlineButton';
import { NileApiService } from '@/services/nile/api';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import { UrlObject } from 'url';

interface bannerPropsType {
  collection?: NileCollection;
  collectionLink?: string | UrlObject;
  collectionLinkText?: string;
  lifeLink?: string | UrlObject;
  lifeLinkText?: string;
  customInfo?: dataListItem[];
  infoColor?: 'white' | 'black';
  showStat?: boolean;
  classNames?: string | undefined;
}

export type OrderStatType = {
  total?: number;
  ongoing?: number;
  closed?: number;
};

export type PriceStatType = {
  floorPrice?: number;
  totalPrice?: number;
};

const MarketplaceSubBanner: React.FC<bannerPropsType> = ({
  collection,
  collectionLink,
  lifeLink,
  collectionLinkText,
  lifeLinkText,
  customInfo,
  infoColor,
  showStat,
  classNames
}) => {
  const api = NileApiService();
  const { t } = useTranslation(['marketplace', 'common']);
  const [orderStat, setOrderStat] = useState<OrderStatType>();

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
    // 23.03.17 개발 필요 사항 : lus일 경우 'lus' 클래스 추가 필요 (lus만 배경 색상css가 필요)
    <div
      className={cn('marketplace-sub-banner', customInfo || orderStat ? 'hasInfo' : '', classNames)}
      style={{ backgroundImage: `url(${collection?.featuredImageUrl})` }}
    >
      <div className={cn('title-wrap')}>
        {/*<strong className={cn('sales-status')}>*/}
        {/*  {orderStat?.ongoing && orderStat?.ongoing > 0 ? salesStatus.toUpperCase() : t('auctionClosed', { ns: 'common' })}*/}
        {/*</strong>*/}
        <h3 className={cn('title')}>{collection?.name}</h3>
      </div>
      {orderStat && showStat && (
        <MarketplaceSubBannerInfo
          color={infoColor}
          customInfo={customInfo}
          orderStat={orderStat}
          orderStatOptions={{
            hideTotal: collection?.slug === 'SON',
            hideClose: collection?.slug === 'SON',
            hideOngoing: true,
          }}
        />
      )}
      <div className={cn('button-wrap')}>
        {collectionLink && (
          <OutlineButton
            buttonText={collectionLinkText ?? t('goAuction', { ns: 'common' })}
            color="white"
            size="md"
            type="link"
            href={collectionLink}
          />
        )}
        {lifeLink && (
          <OutlineButton
            buttonText={lifeLinkText ?? t('aboutThisCollection', { ns: 'common' })}
            color="white"
            size="md"
            type="link"
            href={lifeLink}
          />
        )}
      </div>
    </div>
  );
};

export default MarketplaceSubBanner;
