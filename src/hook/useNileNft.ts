import NileNft, { NileBiddingStatusType, NileOrderStatusType, NileOrderType } from '@/models/nile/marketplace/NileNft';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MarketNftItemStatusType } from '@/services/nile/api';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import dayjs from 'dayjs';
import { useCountdown } from '@utils/countdown';
import { useAuctionBiddingCalculator } from '@utils/auction/bidding/calculator';
import { useNumberFormatter } from '@utils/formatter/number';
import { fromWei } from 'web3-utils';

export const useNileNft = (nft: NileNft | undefined) => {
  const [status, setStatus] = useState<MarketNftItemStatusType>(MarketNftItemStatusType.NONE);

  const nileWallet = useAtomValue(nileWalletAtom);

  const { getNextPrice } = useAuctionBiddingCalculator();
  const { isValidNumber } = useNumberFormatter();

  const token = useMemo(() => {
    return nft?.token;
  }, [nft]);

  const isOwnToken = useMemo(() => {
    if (token?.ownerAddress && nileWallet) {
      return token.ownerAddress.toLowerCase() === nileWallet.toLowerCase();
    }
    return false;
  }, [token, nileWallet]);

  const lastOrder = useMemo(() => {
    return token?.orderList?.at(0);
  }, [token]);

  const orderType = useMemo(() => {
    return lastOrder?.type;
  }, [lastOrder]);

  const targetDate = useMemo(() => {
    if (status === MarketNftItemStatusType.NONE) {
      return dayjs.utc(lastOrder?.startAt);
    }
    if (status === MarketNftItemStatusType.AUCTION_LIVE_ONGOING) {
      return dayjs.utc(lastOrder?.endAt);
    }
    return dayjs();
  }, [lastOrder, status]);

  const remainSeconds = useMemo(() => Math.abs(targetDate.diff(dayjs(), 'seconds')), [targetDate]);

  const { remainTime } = useCountdown({ seconds: remainSeconds, activeUnderZero: true });

  const getNileNftStatus = useCallback(() => {
    const now = dayjs();
    const orderStartTime = dayjs.utc(lastOrder?.startAt);
    const orderEndTime = dayjs.utc(lastOrder?.endAt);

    if (token === undefined) {
      return MarketNftItemStatusType.NONE;
    }

    if (lastOrder === undefined) {
      if (token?.collection?.ownerAddress?.toLowerCase() !== token?.ownerAddress?.toLowerCase()) {
        return MarketNftItemStatusType.CLOSED;
      }
      return MarketNftItemStatusType.NONE;
    }

    if (lastOrder.status === 'CANCELED') {
      if (token.orderList && token.orderList.length > 1) {
        return MarketNftItemStatusType.CLOSED;
      }
      return MarketNftItemStatusType.NONE;
    }

    if (lastOrder.status === MarketNftItemStatusType.CLOSED) {
      return MarketNftItemStatusType.CLOSED;
    }

    if (lastOrder.status === MarketNftItemStatusType.COMPLETE) {
      if ((lastOrder?.biddingList ?? []).length > 0 && !lastOrder?.biddingList?.at(0)?.received) {
        return MarketNftItemStatusType.COMPLETE;
      }
      return MarketNftItemStatusType.CLOSED;
    }

    if (lastOrder.type === NileOrderType.FIXED_PRICE) {
      if (lastOrder?.status === NileOrderStatusType.OPEN || lastOrder?.status === NileOrderStatusType.TO_BE_OPENED) {
        if (now.isBefore(orderStartTime)) {
          return MarketNftItemStatusType.NONE;
        }
        return MarketNftItemStatusType.OPEN;
      }
    }

    if (lastOrder.type === NileOrderType.AUCTION) {
      if (now.isAfter(orderStartTime)) {
        if (now.isAfter(orderEndTime)) {
          return MarketNftItemStatusType.CLOSED;
        }
        if ((lastOrder?.biddingList ?? []).length === 0) {
          return MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID;
        }
        return MarketNftItemStatusType.AUCTION_LIVE_ONGOING;
      }
      return MarketNftItemStatusType.NONE;
    }

    if (lastOrder?.type === NileOrderType.OPEN_PRICE && lastOrder?.status === NileOrderStatusType.OPEN) {
      return MarketNftItemStatusType.CLOSED;
    }

    return MarketNftItemStatusType.CLOSED;
  }, [nft, token, lastOrder]);

  const lastBidding = useMemo(() => {
    return lastOrder?.biddingList?.at(0);
  }, [lastOrder]);

  const currentPrice = useMemo(() => {
    const currentOrder =
      token?.orderList?.find((order) => order.type !== NileOrderType.OPEN_PRICE && order.status == NileOrderStatusType.OPEN) ?? undefined;

    if (currentOrder) {
      const biddingPrice = currentOrder.biddingList?.at(0);

      if (biddingPrice) {
        if (status === MarketNftItemStatusType.COMPLETE || status === MarketNftItemStatusType.CLOSED) {
          return Number(fromWei(biddingPrice.price));
        } else {
          return getNextPrice(Number(fromWei(biddingPrice.price)));
        }
      } else {
        return Number(fromWei(currentOrder.price));
      }
    }
    return Number(fromWei(token?.price ?? '0', 'ether'));
  }, [nft, lastOrder, orderType, lastBidding, status, nileWallet]);

  const lastBidPrice = useMemo(() => {
    if (!nileWallet) {
      return 0;
    }
    const auction = nft?.token?.orderList?.find((item) => item.type === NileOrderType.AUCTION);
    const joinedBidding = auction?.biddingList?.find(({ address }) => address?.toLowerCase() === nileWallet.toLowerCase());

    if (!joinedBidding) {
      return 0;
    }
    if (joinedBidding.status === NileBiddingStatusType.FAILURE && !joinedBidding.received) {
      if (isValidNumber(joinedBidding.price)) {
        return Number(fromWei(joinedBidding.price, 'ether'));
      }
    }
    return 0;
  }, [nileWallet, lastOrder]);

  const offerList = useMemo(() => {
    return (
      nft?.token?.offerList?.filter((item) => item.status === NileOrderStatusType.OPEN || item.status === NileOrderStatusType.TO_BE_OPENED) ?? []
    );
  }, [nft]);

  const myOffer = useMemo(() => {
    return offerList?.find((item: any) => item?.creator?.toLowerCase() === nileWallet?.toLowerCase());
  }, [offerList]);

  const isOfferExpired = useMemo(() => {
    if (myOffer) {
      return dayjs().isAfter(dayjs.utc(myOffer?.endAt));
    }
    return false;
  }, [myOffer]);

  const isAfterOffer = useMemo(() => {
    if (nileWallet) {
      if (offerList?.length === 0) return false;
      const myOrderStatus = offerList?.find((item: any) => item?.creator?.toLowerCase() === nileWallet.toLowerCase())?.status;

      if (!myOrderStatus) return false;
      return myOrderStatus !== NileOrderStatusType.CLOSE && myOrderStatus !== NileOrderStatusType.CANCELED;
    }
    return false;
  }, [nileWallet, offerList]);

  const isAuctionWinner: boolean = useMemo(() => {
    if (nileWallet) {
      return lastOrder?.biddingList?.at(0)?.address?.toLowerCase() === nileWallet.toLowerCase();
    }
    return false;
  }, [lastOrder, nileWallet]);

  const hasRefundBid = useMemo(() => {
    if (isAuctionWinner) {
      return false;
    }
    if (nileWallet) {
      const auction = nft?.token?.orderList?.find((item) => item.type === NileOrderType.AUCTION);

      if (!auction) {
        return false;
      }

      return (
        auction?.biddingList?.find((item) => item.status !== 'SUCCESS' && item?.address?.toLowerCase() === nileWallet.toLowerCase())?.received ===
        false
      );
    }
  }, [nft, nileWallet, isAuctionWinner]);

  const joinedBid = useMemo(() => {
    return lastOrder?.biddingList?.find((bid: any) => bid.address?.toLowerCase() === nileWallet.toLowerCase() ?? '');
  }, [lastOrder]);

  useEffect(() => {
    const newStatus = getNileNftStatus();
    setStatus(newStatus);
  }, [remainTime, nft]);

  return {
    token,
    offerList,
    isOfferExpired,
    isAfterOffer,
    myOffer,
    isOwnToken,
    status,
    lastOrder,
    lastBidding,
    currentPrice,
    remainSeconds,
    lastBidPrice,
    hasRefundBid,
    joinedBid,
    isAuctionWinner,
  };
};
