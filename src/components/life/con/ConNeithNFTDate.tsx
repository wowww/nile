import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';

import cn from 'classnames';

const ConNeithNFTDate = () => {
  const { t } = useTranslation('life');

  return (
    <div className={cn('life-neith-section date')}>
      <div className={cn('life-neith-section-inner')}>
        <div className={cn('date-info')}>
          <h3 className={cn('title')}>{t('neithStationTab.date.title')}</h3>
          <span className={cn('city-of-neith')}>{t('con.neith.date.subTitle')}</span>
          <strong className={cn('date')}>{t('con.neith.date.date')}</strong>
          <p>{t('neithStationTab.date.desc01')}</p>
        </div>
        <div className={cn('date-image')}>
          <Image src="/assets/images/img/bg_con_neith_date.png" alt="" layout="fill" objectFit="contain" loader={NileCDNLoader} />
        </div>
      </div>
    </div>
  );
};

export default ConNeithNFTDate;
