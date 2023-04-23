import { ReactNode } from "react";
import { useTranslation } from "next-i18next";

import cn from "classnames";
import Tag from "@/components/tag/Tag";
import TimeList from "@/components/list/TimeList";
import BgButton from "@/components/button/BgButton";
import { StatusTag, MarketNftItemStatusType } from "@/components/tag/UiStatusTag";

type Props = {
  className?: string;
  bannerType?: "type1" | "type2";
  title: string;
  description: string;
  statusType: MarketNftItemStatusType;
  href: string;
  buttonText: string;
  bgImage: string;
  children: ReactNode;
};

const LayoutMarketPlaceHeroBanner = ({
  className,
  bannerType = "type1",
  title,
  description,
  statusType,
  href,
  buttonText,
  bgImage,
  children,
}: Props) => {
  return (
    <div className={cn(`marketplace-banner marketplace-banner-${bannerType} ${className}`)}>
      <div className={cn("banner-inner")}>
        <div className={cn("text-wrap")}>
          <div className={cn("title-wrap")}>
            <StatusTag status={statusType} />
            <p>{description}</p>
            <h2>{title}</h2>
          </div>
          <div className={cn("content-wrap")}>
            <div className={cn("auction-wrap")}>
              {statusType === MarketNftItemStatusType.NONE ? (
                <>
                  {children}
                  <div className={cn("button-wrap")}>
                    <BgButton href={href} buttonText={buttonText} color="white" size="xl" />
                  </div>
                </>
              ) : (
                children
              )}
            </div>
            {statusType === MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID && (
              <div className={cn("button-wrap")}>
                <BgButton href={href} buttonText={buttonText} color="white" size="xl" />
              </div>
            )}
            {statusType === MarketNftItemStatusType.COMPLETE && (
              <div className={cn("button-wrap")}>
                <BgButton href={href} buttonText={buttonText} color="white" size="xl" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={cn("banner-bg")}
        style={{
          backgroundImage: `url('https://nile.blob.core.windows.net/images${bgImage}')`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={cn("bg-wrap")}></div>
      </div>
    </div>
  );
};

// NONE component
const StatusNoneContents = ({
  targetTime,
  openTime,
  auctionTitle = "Auction Starts in",
}: {
  targetTime: string;
  openTime: string;
  auctionTitle?: string;
}) => {
  const { t } = useTranslation(["marketplace", "common"]);
  return (
    <>
      <strong className={cn("auction-title")}>{auctionTitle}</strong>
      <TimeList target={targetTime} />
      <div className={cn("auction-open")}>
        <Tag size="s" color="transparent">
          OPEN
        </Tag>
        <span className={cn("open-time")}>{openTime}</span>
      </div>
    </>
  );
};
// AUCTION_SALE_LIVE_BEFORE_BID component
const StatusAuctionSaleContents = ({
  data,
}: {
  data: {
    title: string;
    dataValue: string;
    desc?: string;
  }[];
}) => {
  return (
    <>
      <dl className={cn("marketplace-auction-sale-hero-wrap")}>
        {data.map((list) => (
          <>
            <div key={list.title}>
              <dt>{list.title}</dt>
              <dd>
                <strong>{list.dataValue}</strong>
                {list.desc !== undefined && <span>{list.desc}</span>}
              </dd>
            </div>
          </>
        ))}
      </dl>
    </>
  );
};

// AUCTION_LIVE_BEFORE_BID , COMPLETE component
const StatusCompleteContents = ({ statusType, price, unit }: { statusType: MarketNftItemStatusType; price: number; unit: string }) => {
  const { t } = useTranslation(["marketplace", "common"]);
  return (
    <>
      <div className={cn("auction-price")}>
        <span className={cn("state")}>
          {statusType === MarketNftItemStatusType.COMPLETE ? t("lastSale", { ns: "common" }) : t("startingBid", { ns: "common" })}
        </span>
        <strong className={cn("price")}>
          {price.toLocaleString("en")} <span>{unit}</span>
        </strong>
      </div>
    </>
  );
};

export { LayoutMarketPlaceHeroBanner, StatusNoneContents, StatusCompleteContents, StatusAuctionSaleContents };
