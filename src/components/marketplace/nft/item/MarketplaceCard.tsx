import cn from "classnames";
/* 23.03.09 수정: 퍼블리싱 작업용 컴포넌트 수정 */
import { MarketplaceListItem } from "@components/marketplace/nft/item/MarketplaceListItem";
import { MarketplaceCardItem } from "@components/marketplace/nft/item/MarketplaceCardItem";
import { MarketplaceListHoverItem } from "@components/marketplace/nft/item/MarketplaceListHoverItem";
import { NileNftToken } from "@/models/nile/marketplace/NileNft";
import {useCallback, useEffect, useState} from "react";
import { marketScrollAtom } from "@/state/windowAtom";
import useWindowScroll from "@/hook/useWindowScroll";
import axios from "axios";

interface cardDataType {
  tokens?: NileNftToken[];
  viewType?: string; // 'list' | 'card' | 'list-hover'
  disableMy?: boolean;
}

const MarketplaceCard = ({ tokens, viewType = "card", disableMy }: cardDataType) => {
  // const setSaveScroll = useSetAtom(marketScrollAtom);
  // const scroll = useWindowScroll();

  const onClickCard = useCallback(() => {
    // setSaveScroll(scroll);
  }, []);

  return (
    <ul className={cn("marketplace-card-list", `view-${viewType}`)}>
      {tokens?.map((item, index) => (
        <li
          key={item.id}
          className={cn(viewType === "card" ? "marketplace-card-view" : "marketplace-list-view", viewType === "list-hover" && "list-hover")}
        >
          {
            {
              list: <MarketplaceListItem token={item} onClickCard={onClickCard} />,
              card: <MarketplaceCardItem token={item} disableMy={disableMy} onClickCard={onClickCard} />,
              "list-hover": <MarketplaceListHoverItem token={item} />,
            }[viewType]
          }
        </li>
      ))}
    </ul>
  );
};

export default MarketplaceCard;
