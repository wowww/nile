import React, { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';
import { useNileNft } from '@/hook/useNileNft';
import { MarketNftItemStatusType } from '@/services/nile/api';
import cn from 'classnames';
import NumberInput from '@components/input/NumberInput';
import { useAuctionBiddingCalculator } from '@utils/auction/bidding/calculator';
import { PlaceBidButton } from '@components/button/marketdetail/PlaceBidButton';
import { CloseOfferButton } from '@components/button/marketdetail/CloseOfferButton';
import { GetBidBackButton } from '@components/button/marketdetail/GetBidBackButton';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { BidHistoryButton } from '@components/button/marketdetail/BidHistoryButton';
import { CompleteCheckOutButton } from '@components/button/marketdetail/CompleteCheckOutButton';
import { OpenMakeOfferButton } from '@components/button/marketdetail/OpenMakeOfferButton';
import { BuyNowButton } from '@components/button/marketdetail/BuyNowButton';
import { Round } from '@/models/nile/contract';
import { CancelSaleButton } from '@components/button/marketdetail/CancelSaleButton';
import { SellAtOfferPriceButton } from '@components/button/marketdetail/SellAtOfferPriceButton';
import { CreateListingButton } from '@components/button/marketdetail/CreateListingButton';
import {NileOrderType} from "@/models/nile/marketplace/NileNft";

interface MarketplaceDetailButton {
  isFloatingBar?: boolean;
  price?: number;
  setPrice?: (value: number) => void;
}

export const MarketplaceDetailButton = ({ isFloatingBar, price, setPrice }: MarketplaceDetailButton) => {
  const nft = useAtomValue(marketNftAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const { status, currentPrice, joinedBid, isOfferExpired, hasRefundBid, lastOrder, isAfterOffer, offerList, isAuctionWinner } = useNileNft(nft);
  const { getNextPrice, getPrevPrice } = useAuctionBiddingCalculator();

  const currentButton = useMemo(() => {
    if (hasRefundBid && status !== MarketNftItemStatusType.AUCTION_LIVE_ONGOING && status !== MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID) {
      const lastAuction = nft?.token?.orderList?.find((item) => item.type === NileOrderType.AUCTION);
      return (
        <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
          <GetBidBackButton size="xl" dark={isFloatingBar} order={lastAuction}/>
        </div>
      );
    }

    if (isOfferExpired) {
      return (
        <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
          <CloseOfferButton dark={isFloatingBar} />
        </div>
      );
    }

    switch (status) {
      case MarketNftItemStatusType.NONE:
        return;
      case MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID:
      case MarketNftItemStatusType.AUCTION_LIVE_ONGOING:
        return (
          <>
            {isFloatingBar ? (
              <div className={cn('interactive-area')}>
                <div className={cn('amount-block')}>
                  <NumberInput
                    unit="WEMIX$"
                    plusDisabled={status === MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID}
                    minusDisabled={price === currentPrice}
                    value={price}
                    onClickMinus={(prev) => setPrice?.(getPrevPrice(prev))}
                    onClickPlus={(prev) => setPrice?.(getNextPrice(prev))}
                    parentName={'top-bid'}
                    bgBlack={isFloatingBar}
                  />
                  <PlaceBidButton price={price} dark={isFloatingBar} />
                </div>
              </div>
            ) : (
              <div className={cn('amount-block')}>
                <NumberInput
                  unit="WEMIX$"
                  plusDisabled={status === MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID}
                  minusDisabled={price === currentPrice}
                  value={price}
                  onClickMinus={(prev) => setPrice?.(getPrevPrice(prev))}
                  onClickPlus={(prev) => setPrice?.(getNextPrice(prev))}
                  parentName={'top-bid'}
                  bgBlack={isFloatingBar}
                />
                <PlaceBidButton price={price} dark={isFloatingBar} />
              </div>
            )}
          </>
        );
      case MarketNftItemStatusType.COMPLETE:
        if (joinedBid && !joinedBid.received) {
          return (
            <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
              <BidHistoryButton size="xl" dark={isFloatingBar} />
              {isAuctionWinner ? <CompleteCheckOutButton size="xl" dark={isFloatingBar} /> : <GetBidBackButton size="xl" dark={isFloatingBar} order={lastOrder} />}
            </div>
          );
        }
        return (
          <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
            <BidHistoryButton size="xl" dark={isFloatingBar} />
          </div>
        );
      case MarketNftItemStatusType.OPEN:
        if (lastOrder?.creator?.toLowerCase() === nileWallet.toLowerCase()) {
          if (offerList.length > 0) {
            return (
              <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
                <CancelSaleButton dark={isFloatingBar} />
                <SellAtOfferPriceButton dark={isFloatingBar} />
              </div>
            );
          }
          return (
            <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
              <CancelSaleButton background dark={isFloatingBar} />
            </div>
          );
        }
        if (isAfterOffer) {
          return (
            <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
              <CloseOfferButton cancel dark={isFloatingBar} />
            </div>
          );
        }
        if (lastOrder?.round === Round.SECOND) {
          return (
            <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
              <OpenMakeOfferButton dark={isFloatingBar} />
              <BuyNowButton background dark={isFloatingBar} />
            </div>
          );
        }
        return (
          <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
            <BuyNowButton background dark={isFloatingBar} />
          </div>
        );
      case MarketNftItemStatusType.CLOSED:
        if (nft?.token?.ownerAddress?.toLowerCase() === nileWallet?.toLowerCase()) {
          if (offerList.length > 0) {
            return (
              <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
                <CreateListingButton dark={isFloatingBar} />
                <SellAtOfferPriceButton dark={isFloatingBar} />
              </div>
            );
          }
          return (
            <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
              <CreateListingButton background dark={isFloatingBar} />
            </div>
          );
        }
        if (isAfterOffer) {
          return (
            <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
              <CloseOfferButton cancel dark={isFloatingBar} />
            </div>
          );
        }
        return (
          <div className={cn(isFloatingBar ? 'interactive-area' : 'button-block')}>
            <OpenMakeOfferButton background dark={isFloatingBar} />
          </div>
        );
    }
  }, [status, nft, isFloatingBar, price, nileWallet]);

  return <>{currentButton}</>;
};
