import { useState } from "react";
import { useTranslation } from "next-i18next";

import cn from "classnames";
import ConUse from "./ConUse";

import ConOverviewTiers from "@components/life/con/ConOverviewTiers";
import ConOverviewTenCities from "@/components/life/con/ConOverviewTenCities";

const ConOverview = () => {
  const { t } = useTranslation("life");

  return (
    <div className={cn("life-con-inner overview")}>
      <ConOverviewTenCities />
      <ConOverviewTiers />
      <ConUse />
    </div>
  );
};

export default ConOverview;
