import cn from 'classnames';
import { useNumberFormatter } from '@utils/formatter/number';
import { BidHistoryButton } from '@components/button/marketdetail/BidHistoryButton';
import { NileOrderStatusType, NileOrderType } from '@/models/nile/marketplace/NileNft';
import { useNileNft } from '@/hook/useNileNft';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { useUnitFormatter } from '@utils/formatter/unit';
import { Avatar } from 'antd';
import React, { useMemo, useState } from 'react';
import { MarketCountdownText } from '@components/marketplace/countdown/text';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { MarketNftItemStatusType } from '@/services/nile/api';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';
import ProfileModal from '@components/modal/ProfileModal';
import { fromWei } from 'web3-utils';
import CustomAvatar from "@components/avatar/CustomAvatar";

interface MarketplaceDetailPriceInfoProps {
  type: 'countdown' | 'avatar' | 'price';
  user?: NileUserAccount;
}

const MarketplaceDetailPriceInfo = ({ type, user }: MarketplaceDetailPriceInfoProps) => {
  const { t } = useTranslation('common');
  const nft = useAtomValue(marketNftAtom);
  const { status, joinedBid, lastOrder, remainSeconds, isAfterOffer } = useNileNft(nft);
  const { shorthanded } = useNumberFormatter();
  const { shorten } = useWalletFormatter();

  const { getPaymentUnit } = useUnitFormatter();

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const currentPrice = useMemo(() => {
    const currentOrder = nft?.token?.orderList?.find((order) => order.type !== NileOrderType.OPEN_PRICE && order.status == NileOrderStatusType.OPEN) ?? undefined;

    if (currentOrder) {
      const biddingPrice = currentOrder.biddingList?.at(0);

      if(biddingPrice) {
        if (status === MarketNftItemStatusType.COMPLETE || status === MarketNftItemStatusType.CLOSED) {
          return Number(fromWei(biddingPrice.price));
        }
      } else {
        return Number(fromWei(currentOrder?.price ?? ""));
      }
    }
    return Number(fromWei(nft?.token?.price ?? '0', 'ether'));
  }, [nft, lastOrder]);

  const title = useMemo(() => {
    if (type === 'price') {
      switch (status) {
        case MarketNftItemStatusType.NONE:
          if (lastOrder?.type === NileOrderType.FIXED_PRICE) {
            return t('fixedPrice');
          } else {
            return t('startingBid');
          }
        case MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID:
          return t('startingBid');
        case MarketNftItemStatusType.AUCTION_LIVE_ONGOING:
          return t('currentBid');
        case MarketNftItemStatusType.COMPLETE:
          return t('lastSale');
        case MarketNftItemStatusType.OPEN:
          return t('fixedPrice');
        case MarketNftItemStatusType.CLOSED:
          return t('lastSale');
      }
    }
    if (type === 'countdown') {
      return t('startIn');
    }

    if (type === 'avatar') {
      if (status === MarketNftItemStatusType.OPEN || status === MarketNftItemStatusType.CLOSED) {
        // if (isAfterOffer) {
        //   return t('highestOffer');
        // }
        return t('owner');
      }
    }
  }, [status, type, isAfterOffer, lastOrder]);

  const showBidHistory = useMemo(() => {
    if (lastOrder?.biddingList?.length) {
      return lastOrder?.biddingList?.length > 0 && status === MarketNftItemStatusType.AUCTION_LIVE_ONGOING;
    }
    return false;
  }, [lastOrder, status]);

  return (
    <>
      <dl className={cn(type === 'avatar' && 'avatar-type')}>
        <dt className={cn('info-title')}>
          <span>{title}</span>
          {showBidHistory && (
            <div className={cn('bidding-block')}>
              <BidHistoryButton />
            </div>
          )}
        </dt>
        {
          {
            countdown: (
              <dd>
                <strong className={cn('info-text')}>
                  <MarketCountdownText expireTime={remainSeconds} />
                </strong>
              </dd>
            ),
            avatar: (
              <div className="profile-modal-btn" onClick={() => setIsProfileOpen(true)}>
                <dd className="user-info">
                  <strong className="info-text">
                    <CustomAvatar themeIndex={user?.themeIndex} src={user?.img} size={28} />
                  </strong>
                  <span className="unit">{user?.nickname ?? shorten(user?.address?.toLowerCase())}</span>
                </dd>
              </div>
            ),
            price: (
              <dd>
                <strong className={cn('info-text')}>{shorthanded(currentPrice)}</strong>
                <span className={cn('unit')}>{getPaymentUnit(lastOrder?.payment)}</span>
              </dd>
            ),
          }[type]
        }
      </dl>
      <ProfileModal isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} nileUser={user} />
    </>
  );
};

export default MarketplaceDetailPriceInfo;
