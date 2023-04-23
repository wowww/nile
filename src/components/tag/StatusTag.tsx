import Tag from '@components/tag/Tag';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { MarketNftItemStatusType } from '@/services/nile/api';
import { MarketCountdownText } from '@components/marketplace/countdown/text';

export type StateTagProps = {
  status?: MarketNftItemStatusType;
  remain?: number;
};

export const StatusTag = ({ status, remain }: StateTagProps) => {
  const { t } = useTranslation('common');

  const checkStatus = useMemo(() => {
    switch (status) {
      case MarketNftItemStatusType.NONE:
        return (
          <Tag size="md-m" color="black">
            {t('upcoming')}
          </Tag>
        );
      case MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID:
        return (
          <Tag type="market" size="md-m" color="negative">
            {t('onAuction')}
          </Tag>
        );
      case MarketNftItemStatusType.AUCTION_LIVE_ONGOING:
        return (
          <Tag type="market border-none" size="md-m" bg>
            {remain && <MarketCountdownText expireTime={remain} />}
          </Tag>
        );
      case MarketNftItemStatusType.COMPLETE:
        return (
          <Tag size="md-m" color="gray" bg>
            {t('auctionClosed')}
          </Tag>
        );
      case MarketNftItemStatusType.OPEN:
        return (
          <Tag size="md-m" color="black">
            {t('onSale')}
          </Tag>
        );
      case MarketNftItemStatusType.CLOSED:
        return;
    }
  }, [status, remain]);

  return <>{checkStatus}</>;
};
