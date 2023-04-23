import { useCallback, useState } from "react";
import cn from "classnames";
import { Checkbox, Collapse, Form, Radio, RadioChangeEvent } from "antd";
import Tag from "@components/tag/Tag";
import { ReactSVG } from "react-svg";

import { useTranslation } from "next-i18next";
import { NileCollectionCategory } from "@/models/nile/marketplace/NileCollection";
import { useAtom } from "jotai";
import { FilterType, tokenFilterAtom } from "@/state/filterAtom";
import Image from "next/image";
import { NileCDNLoader } from "@utils/image/loader";
import CommonFilter from "@components/marketplace/filter/CommonFilter";

const { Panel } = Collapse;

type FilterProps = {
  categories?: NileCollectionCategory[];
  isCollectionFilter?: boolean;
};

const nftCategories = [
  { name: "All collection", slug: "", logoUrl: "/temp/@temp_alarm_NILE.png" },
  {
    name: "LUS264",
    slug: "LUS",
    logoUrl: "/temp/@temp_alarm_LUS.png",
  },
  {
    name: "Sights of NILE",
    slug: "SON4",
    logoUrl: "/temp/@temp_alarm_Sights_of_NILE.png",
  },
  /* 23.03.09 수정 start: CON 케이스 추가 */
  {
    name: "City of NEITH",
    slug: "CON",
    logoUrl: "/assets/images/img/img_symbol_life_con_neith.png",
  },
  /* 23.03.09 수정 end: CON 케이스 추가 */
];

const NftFilter = ({ categories }: FilterProps) => {
  const { t } = useTranslation("common");

  const [selectedFilter, setSelectedFilter] = useState<FilterType>({ sorting: "updatedAt,desc", status: [], type: [], collectionSlug: "" });
  const [sharedFilter, setSharedFilter] = useAtom(tokenFilterAtom);
  const [collectionActiveKey, setActiveKey] = useState("panel-");

  const statusFilter = [{ label: t("upcoming"), value: "TO_BE_OPENED" }];

  const typeFilter = [
    { label: t("onAuction"), value: "AUCTION" },
    { label: t("onSale"), value: "FIXED_PRICE" },
  ];

  const changeCollectionActiveKey = (e: RadioChangeEvent) => {
    setActiveKey(`panel-${e.target.value}`);
  };

  return (
    <CommonFilter
      sharedFilter={sharedFilter}
      setSharedFilter={setSharedFilter}
      selectedFilterForMobile={selectedFilter}
      setSelectedFilterForMobile={setSelectedFilter}
    >
      <dl className={cn("filter-1depth-list")}>
        <div className={cn("filter-detail-list-wrap")}>
          <dt>Collection</dt>
          <dd>
            <Form.Item name={["collectionSlug"]}>
              <Radio.Group onChange={changeCollectionActiveKey}>
                <Collapse
                  accordion
                  expandIconPosition="end"
                  className={cn("filter-2depth")}
                  expandIcon={() => <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_check.svg" />}
                  activeKey={collectionActiveKey}
                >
                  {nftCategories?.map((category) => {
                    return (
                      <Panel
                        key={`panel-${category.slug}`}
                        header={
                          <Radio value={category.slug}>
                            <span className={cn("img-wrap")}>
                              <Image src={category.logoUrl} alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
                            </span>
                            <span className={cn("text-wrap")}>{category.name}</span>
                          </Radio>
                        }
                      />
                    );
                  })}
                </Collapse>
              </Radio.Group>
            </Form.Item>
          </dd>
        </div>
        <div className={cn("filter-detail-list-wrap")}>
          <dt>{t("filter.status")}</dt>
          <dd>
            <Form.Item name={["status"]}>
              <Checkbox.Group options={statusFilter} />
            </Form.Item>
            <Form.Item name={["type"]}>
              <Checkbox.Group options={typeFilter} />
            </Form.Item>
          </dd>
        </div>
      </dl>
    </CommonFilter>
  );
};

export default NftFilter;
