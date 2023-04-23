import { useTranslation } from "next-i18next";

import cn from "classnames";

const TangledNeithNFTClaim = () => {
  const { t } = useTranslation("life");
  const claimList = t("neithStationTab.claim.list", { returnObjects: true });

  return (
    <div className={cn("covenant-claim-wrap")}>
      <h3 className={cn("neith-section-title")}>{t(`neithStationTab.claim.title`)}</h3>
      <ol className={cn("claim-list")}>
        {Object.keys(claimList).map((list, index) => (
          <li key={`claim-list-${index}`}>
            <span className={cn("step")}>STEP {index + 1}.</span>
            <strong>{t(`neithStationTab.claim.list.${index + 1}.title`)}</strong>
            <p>{t(`neithStationTab.claim.list.${index + 1}.desc`)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TangledNeithNFTClaim;
