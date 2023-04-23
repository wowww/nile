import Tag from "@components/tag/Tag";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { MarketCountdownText } from "@components/marketplace/countdown/text";
// import { MarketNftItemStatusType } from "@/services/nile/api"; // 개발 코드 수정 없이 하기 위해 해당 type 주석 처리 후 아래 type 추가

/* 23.03.09 수정: 옥션과 고정가 동시 판매되는 케이스 추가 */
export enum MarketNftItemStatusType {
  NONE = "NONE",
  AUCTION_LIVE_BEFORE_BID = "AUCTION_LIVE_BEFORE_BID",
  AUCTION_LIVE_ONGOING = "AUCTION_LIVE_ONGOING",
  AUCTION_SALE_LIVE_BEFORE_BID = "AUCTION_SALE_LIVE_BEFORE_BID",
  COMPLETE = "COMPLETE",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export type StateTagProps = {
  status?: MarketNftItemStatusType;
  remain?: number;
};

export const StatusTag = ({ status, remain }: StateTagProps) => {
  const { t } = useTranslation("common");

  const checkStatus = useMemo(() => {
    switch (status) {
      case MarketNftItemStatusType.NONE:
        return (
          <Tag size="md-m" color="black">
            {t("upcoming")}
          </Tag>
        );
      case MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID:
        return (
          <Tag type="market" size="md-m" color="negative">
            {t("onAuction")}
          </Tag>
        );
      case MarketNftItemStatusType.AUCTION_SALE_LIVE_BEFORE_BID:
        return (
          <Tag type="market" size="md-m" color="negative">
            On Auction & Sale
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
            {t("auctionClosed")}
          </Tag>
        );
      case MarketNftItemStatusType.OPEN:
        return (
          <Tag size="md-m" color="black">
            {t("onSale")}
          </Tag>
        );
      case MarketNftItemStatusType.CLOSED:
        return;
    }
  }, [status, remain]);

  return <>{checkStatus}</>;
};
