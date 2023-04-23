import Link from 'next/link';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useNumberFormatter } from '@utils/formatter/number';
import React, { useEffect, useMemo, useState } from 'react';
import { MarketNftItemStatusType, NileApiService } from '@/services/nile/api';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { NileNftToken, NileOrderType } from '@/models/nile/marketplace/NileNft';
import dayjs from 'dayjs';
import { useUnitFormatter } from '@utils/formatter/unit';
import { StatusTag } from '@components/tag/StatusTag';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { Avatar } from 'antd';
import { useNileNft } from '@/hook/useNileNft';
import { fromWei } from 'web3-utils';

export const MarketplaceListHoverItem = ({ token }: { token: NileNftToken }) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const api = NileApiService();
  const { shorten } = useWalletFormatter();
  const { status } = useNileNft({ token: token });

  const [owner, setOwner] = useState<NileUserAccount>();
  const [creator, setCreator] = useState<NileUserAccount>();
  const [winner, setWinner] = useState<NileUserAccount>();

  const { shorthanded, isValidNumber } = useNumberFormatter();

  const order = useMemo(() => {
    return token.orderList?.at(0);
  }, [token]);

  const { getPaymentUnit } = useUnitFormatter();

  const itemPrice = useMemo(
    () => token.price && isValidNumber(token.price) && shorthanded(Number(fromWei(String(token.price), 'ether'))),
    [token]
  );

  useEffect(() => {
    if (token.collection?.ownerAddress) {
      api.user.account
        .getUserInfo(token.collection.ownerAddress)
        .then(({ data }) => setCreator(data))
        .catch(() => {
          return null;
        });
    }

    if (token?.ownerAddress) {
      api.user.account
        .getUserInfo(token.ownerAddress)
        .then(({ data }) => setOwner(data))
        .catch(() => {
          return null;
        });
    }

    const address = token?.orderList?.at(0)?.biddingList?.at(0)?.address;

    if (address) {
      api.user.account
        .getUserInfo(address)
        .then(({ data }) => setWinner(data))
        .catch(() => {
          return null;
        });
    }
  }, [token]);

  const targetDate = useMemo(() => {
    if ([MarketNftItemStatusType.NONE].includes(status)) {
      return dayjs.utc(token.orderStartAt);
    }
    if ([MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status)) {
      return dayjs.utc(order?.endAt);
    }
    return dayjs();
  }, [order, status]);

  const remainSeconds = useMemo(() => Math.abs(targetDate.diff(dayjs(), 'seconds')), [targetDate]);

  const priceState = (state: string, type: string | undefined) => {
    switch (state) {
      case 'NONE':
        if (type === NileOrderType.FIXED_PRICE) {
          return t('fixedPrice', { ns: 'common' });
        } else {
          return t('startingBid', { ns: 'common' });
        }
      case 'AUCTION_LIVE_BEFORE_BID':
        return t('startingBid', { ns: 'common' });
      case 'AUCTION_LIVE_ONGOING':
        return t('currentBid', { ns: 'common' });
      case 'COMPLETE':
        return t('lastPrice', { ns: 'common' });
      case 'OPEN':
        return t('fixedPrice', { ns: 'common' });
      case 'CLOSED':
        return t('lastPrice', { ns: 'common' });
      default:
        return false;
    }
  };

  const getOwnerOrWinner = useMemo(() => {
    if (order?.round === 1) return token?.collection?.ownerName ?? shorten(creator?.address);
    if (order?.round === 0) {
      if (status === MarketNftItemStatusType.COMPLETE) return shorten(winner?.address);
      if (status === MarketNftItemStatusType.CLOSED && creator?.address.toLowerCase() !== owner?.address.toLowerCase())
        return shorten(owner?.address);
    }
    return false;
  }, [order, status]);

  const getThemeIndex = useMemo(() => {
    if (order?.round === 1) return creator?.themeIndex;
    if (order?.round === 0) {
      if (status === MarketNftItemStatusType.COMPLETE) return winner?.themeIndex;
      if (status === MarketNftItemStatusType.CLOSED && creator?.address.toLowerCase() !== owner?.address.toLowerCase()) return owner?.themeIndex;
    }
    return false;
  }, [order, status]);

  return (
    <>
      <Link
        href={{
          pathname: '/marketplace/[collectionAddressOrSlug]/[tokenId]',
          query: { collectionAddressOrSlug: token?.collection?.slug, tokenId: 1 },
        }}
        scroll={false}
      >
        <a className={cn('card-link', { 'offer-card': status === MarketNftItemStatusType.CLOSED })}>
          <div className={cn('img-block')}>
            <div className={cn('video-wrap')}>
              <video autoPlay loop muted playsInline disablePictureInPicture>
                <source src={token.videoUrl ?? 'https://nile.blob.core.windows.net/media/SON/1.mp4'} type="video/mp4" />
              </video>
            </div>
            <div className={cn('product-info')}>
              <div className={cn('product-info-top')}>
                <div className={cn('product-name')}>{token.collection?.name}</div>
              </div>
              <div className={cn('product-info-bottom')}>
                token
                {(token.collection?.ownerName || token.collection?.ownerAddress) && (
                  <dl>
                    <dt>{t('creator', { ns: 'common' })}</dt>
                    <dd>
                      <Avatar size={24} className={cn('user-image', `type${creator?.themeIndex ?? ''}`)} />
                      <span>{token?.collection?.ownerName ?? shorten(creator?.address)}</span>
                    </dd>
                  </dl>
                )}
                {getOwnerOrWinner && creator?.address?.toLowerCase() !== owner?.address?.toLowerCase() && (
                  <dl>
                    {order?.round === 0 && status === MarketNftItemStatusType.COMPLETE ? (
                      <dt>{t('winner', { ns: 'common' })}</dt>
                    ) : (
                      <dt>{t('owner', { ns: 'common' })}</dt>
                    )}
                    <dd>
                      <Avatar size={24} className={cn('user-image', `type${getThemeIndex ?? ''}`)} />
                      <span>{getOwnerOrWinner}</span>
                    </dd>
                  </dl>
                )}
              </div>
            </div>
          </div>
          <div className={cn('info-block')}>
            <StatusTag status={status} remain={remainSeconds} />
            {/*<StatusTag status={status} remain={remainSeconds} />*/}
            <div className={cn('info-top')}>
              <span className={cn('collection-name')}>{token.collection?.name}</span>
              <strong className={cn('product-name')}>{token.name}</strong>
            </div>
            <div className={cn('info-bottom')}>
              <dl>
                <dt>{priceState(status, token.orderType)}</dt>
                <dd>
                  {itemPrice}
                  <span className={cn('unit')}>{token.unitFormat ?? getPaymentUnit(token?.orderList?.at(0)?.payment)}</span>
                </dd>
              </dl>
              {token.status === 'auction-start' && token.orderStartAt && (
                <dl>
                  <dt>{t('opensOn', { ns: 'common' })}</dt>
                  <dd>{token.orderStartAt}</dd>
                </dl>
              )}
            </div>
          </div>
        </a>
      </Link>
      {/*<LikeButton count={item.likeCount} />*/}
    </>
  );
};
