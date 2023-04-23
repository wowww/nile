import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

import cn from 'classnames';
import Tag from '@/components/tag/Tag';
import TimeList from '@/components/list/TimeList';
import BgButton from '@/components/button/BgButton';
import { StatusTag } from '@components/tag/StatusTag';
import { MarketNftItemStatusType } from '@/services/nile/api';

const NileBanner = () => {
  const { t } = useTranslation(['marketplace', 'common']);
  const [status, setStatus] = useState<MarketNftItemStatusType>(MarketNftItemStatusType.COMPLETE);

  return (
    <div className={cn('marketplace-banner marketplace-banner-type1 nile')}>
      <div className={cn('banner-inner')}>
        <div className={cn('text-wrap')}>
          <div className={cn('title-wrap')}>
            <StatusTag status={status} />
            <p>Sights of NILE(SON)</p>
            <h2>{t('nileBannerTitle')}</h2>
          </div>
          <div className={cn('content-wrap')}>
            <div className={cn('auction-wrap')}>
              {status === MarketNftItemStatusType.NONE && (
                <>
                  <strong className={cn('auction-title')}>{t('auctionStartsIn', { ns: 'common' })}</strong>
                  <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_SALE_START_DATE} />
                  <div className={cn('auction-open')}>
                    <Tag size="s" color="transparent">
                      OPEN
                    </Tag>
                    <span className={cn('open-time')}>KST 2023-02-27 12:00 PM</span>
                  </div>
                  <div className={cn('button-wrap')}>
                    <BgButton href="/marketplace/SON5/1" buttonText="Preview" color="white" size="xl" />
                  </div>
                </>
              )}
              {(status === MarketNftItemStatusType.COMPLETE || status === MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID) && (
                <div className={cn('auction-price')}>
                  <span className={cn('state')}>
                    {status === MarketNftItemStatusType.COMPLETE ? t('lastSale', { ns: 'common' }) : t('startingBid', { ns: 'common' })}
                  </span>
                  <strong className={cn('price')}>
                    2,100 <span>WEMIX$</span>
                  </strong>
                </div>
              )}
            </div>
            {status === MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID && (
              <div className={cn('button-wrap')}>
                <BgButton href="/marketplace/SON5/1" buttonText="Live Auction" color="white" size="xl" />
              </div>
            )}
            {status === MarketNftItemStatusType.COMPLETE && (
              <div className={cn('button-wrap')}>
                <BgButton href="/marketplace/SON5/1" buttonText="View Results" color="white" size="xl" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={cn('banner-bg')}>
        <div className={cn('bg-wrap')}></div>
      </div>
    </div>
  );
};

export default NileBanner;
