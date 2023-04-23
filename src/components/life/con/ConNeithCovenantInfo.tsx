import Image from "next/image";
import cn from "classnames";

import { NileCDNLoader } from "@/utils/image/loader";
import { useTranslation } from "next-i18next";

const ConNeithCovenantInfo = () => {
  const { t } = useTranslation("life");

  return (
    <div className={cn("life-neith-section covenant-info")}>
      <div className={cn("life-neith-section-inner")}>
        <div className={cn("content-inner-wrap")}>
          <div className={cn("title-wrap")}>
            <h2 className={cn("title")}>{t("con.neith.covenant.title")}</h2>
            <p className={cn("desc")}>{t("con.neith.covenant.desc")}</p>
          </div>

          <div className={cn("img-wrap")}>
            <Image
              src="/assets/images/img/img_con_neith_covenant.jpg"
              alt="좌측부터 ATUM, NEITH, KHNUM"
              layout="fill"
              quality="100"
              loader={NileCDNLoader}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConNeithCovenantInfo;
