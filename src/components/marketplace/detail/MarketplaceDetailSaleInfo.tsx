import cn from 'classnames';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';
import { useNileNft } from '@/hook/useNileNft';
import { MarketNftItemStatusType } from '@/services/nile/api';
import { useTranslation } from 'next-i18next';
import { NileBiddingStatusType, NileOrderType } from '@/models/nile/marketplace/NileNft';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import dynamic from 'next/dynamic';
import { Round } from '@/models/nile/contract';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';

const RetractingBidModal = dynamic(() => import('@components/modal/Payment/RetractingBidModal'), { ssr: false });

export const MarketplaceDetailSaleInfo = () => {
  const { t } = useTranslation('common');
  const nft = useAtomValue(marketNftAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const router = useRouter();

  const { status, lastOrder, joinedBid, lastBidding, isAfterOffer, isOfferExpired } = useNileNft(nft);
  const [isOpenRetractingBid, setIsOpenRetractingBid] = useState<boolean>(false);

  const isAuctionHasJoined = useMemo(() => {
    return (
      (nileWallet.length ?? 0) > 0 && lastOrder?.biddingList?.map(({ address }) => address?.toLowerCase()).includes(nileWallet.toLowerCase()) === true
    );
  }, [nileWallet, lastOrder]);

  const isSeller = useMemo(() => {
    return nileWallet.toLowerCase() === lastOrder?.creator?.toLowerCase();
  }, [nileWallet, lastOrder]);

  const canWithdraw = useMemo(() => {
    if (isSeller) {
      return false;
    }
    if (!isAuctionHasJoined) {
      return false;
    }
    const joinedBidding = lastOrder?.biddingList?.find(({ address }) => address?.toLowerCase() === nileWallet.toLowerCase());

    if (!joinedBidding) {
      return false;
    }
    return joinedBidding.status === NileBiddingStatusType.FAILURE && !joinedBidding.received;
  }, [isSeller, isAuctionHasJoined, lastOrder, nileWallet]);

  const info = useMemo(() => {
    if (isOfferExpired) {
      return (
        <>
          <li>{t('marketPlaceDetailTop.infoTxt8')}</li>
          <li>{t('marketPlaceDetailTop.infoTxt16')}</li>
        </>
      );
    }

    switch (status) {
      case MarketNftItemStatusType.NONE:
        if (!lastOrder) {
          return (
            <>
              <li>{t('marketPlaceDetailTop.infoTxt21')}</li>
              <li>{t('marketPlaceDetailTop.infoTxt22')}</li>
            </>
          );
        }
        if (lastOrder?.type === NileOrderType.FIXED_PRICE) {
          if (lastOrder?.round === Round.FIRST) {
            return (
              <>
                <li>{t('marketPlaceDetailTop.infoTxt11')}</li>
                <li>
                  {t('marketPlaceDetailTop.infoTxt3-1', {
                    time: dayjs.utc(lastOrder?.startAt).local().format('YYYY-MM-DD HH:mm'),
                  })}
                </li>
              </>
            );
          }
          if (lastOrder?.creator?.toLowerCase() === nileWallet.toLowerCase()) {
            return (
              <>
                <li>{t('marketPlaceDetailTop.infoTxt19')}</li>
                <li>{t('marketPlaceDetailTop.infoTxt20')}</li>
              </>
            );
          }
        } else {
          return (
            <>
              <li>{t('marketPlaceDetailTop.infoTxt1')}</li>
              <li>{t('marketPlaceDetailTop.infoTxt2')}</li>
              <li>
                {t('marketPlaceDetailTop.infoTxt3', {
                  time: dayjs.utc(lastOrder?.startAt).local().format('YYYY-MM-DD HH:mm'),
                })}
              </li>
            </>
          );
        }
      case MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID:
        return (
          <>
            <li>{t('marketPlaceDetailTop.infoTxt1')}</li>
            <li>{t('marketPlaceDetailTop.infoTxt2')}</li>
          </>
        );
      case MarketNftItemStatusType.AUCTION_LIVE_ONGOING:
        return (
          <>
            <li>{t('marketPlaceDetailTop.infoTxt1')}</li>
            <li>
              {t('marketPlaceDetailTop.infoTxt4', {
                time: dayjs.utc(lastOrder?.endAt).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm'),
              })}
            </li>
            <li className={cn('has-popup')}>
              {t('marketPlaceDetailTop.infoTxt5')}
              {canWithdraw && (
                <button type="button" className={cn('btn-setting')} onClick={() => setIsOpenRetractingBid(true)}>
                  {t('marketplaceModal.withdrawMyBid')}
                </button>
              )}
            </li>
          </>
        );
      case MarketNftItemStatusType.COMPLETE:
        if (joinedBid) {
          if (lastBidding?.address?.toLowerCase() === nileWallet.toLowerCase()) {
            return <li>{t('marketPlaceDetailTop.infoTxt6')}</li>;
          }
          return (
            <li>
              {t('marketPlaceDetailTop.infoTxt7')}
              {canWithdraw && (
                <button type="button" className={cn('btn-setting')} onClick={() => setIsOpenRetractingBid(true)}>
                  {t('marketplaceModal.withdrawMyBid')}
                </button>
              )}
            </li>
          );
        }
        return;
      case MarketNftItemStatusType.OPEN:
        if (lastOrder?.round === Round.FIRST) {
          return <li>{t('marketPlaceDetailTop.infoTxt11')}</li>;
        }
        if (lastOrder?.creator?.toLowerCase() === nileWallet.toLowerCase()) {
          return (
            <>
              <li>{t('marketPlaceDetailTop.infoTxt19')}</li>
              <li>{t('marketPlaceDetailTop.infoTxt20')}</li>
            </>
          );
        }

        return (
          <>
            {!isAfterOffer && <li>{t('marketPlaceDetailTop.infoTxt12')}</li>}
            <li>{t('marketPlaceDetailTop.infoTxt13')}</li>
            <li>{t('marketPlaceDetailTop.infoTxt15')}</li>
          </>
        );
      case MarketNftItemStatusType.CLOSED:
        if (nft?.token?.ownerAddress?.toLowerCase() === nileWallet?.toLowerCase()) {
          return (
            <li className={cn('has-popup')}>
              <button
                type="button"
                className={cn('btn-setting')}
                onClick={() => {
                  router.push({
                    pathname: '/marketplace/transfer/[collectionAddressOrSlug]/[tokenId]',
                    query: { collectionAddressOrSlug: nft?.token?.collection?.slug, tokenId: nft?.token?.tokenId },
                  });
                }}
              >
                {t('transferBtn', { ns: 'common' })}
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
              </button>
              : {t('marketPlaceDetailTop.infoTxt14', { ns: 'common' })}
            </li>
          );
        }

        return (
          <>
            {!isAfterOffer && <li>{t('marketPlaceDetailTop.infoTxt12')}</li>}
            <li>{t('marketPlaceDetailTop.infoTxt13')}</li>
            <li>{t('marketPlaceDetailTop.infoTxt15')}</li>
          </>
        );
    }
  }, [status, nft, nileWallet, canWithdraw, t]);

  return (
    <>
      <ul className={cn('notice-block list-type-dot')}>{info}</ul>
      <RetractingBidModal nft={nft} isOpen={isOpenRetractingBid} setIsOpen={setIsOpenRetractingBid} order={lastOrder}/>
    </>
  );
};
