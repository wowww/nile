import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import SnkrzTitle from './SnkrzTitle';

const SnkrzOverviewSystem = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <div className={cn('overview-system-wrap')}>
      <SnkrzTitle title={t('snkrz.overview.easyFun.title')} />
      <div className={cn('system-card-wrap')}>
        <div className={cn('system-card')}>
          <div>
            <strong className={cn('title')}>{t('snkrz.overview.easyFun.card1.title')}</strong>
            <p className={cn('sub-title')}>{t('snkrz.overview.easyFun.card1.desc')}</p>
          </div>
          <div className={cn('img')}>
            <Image src={`/assets/images/img/img_life_snkrz_overview_system1.png`} layout="fill" objectFit="cover" loader={NileCDNLoader} alt="" />
          </div>
        </div>
        <div className={cn('system-card')}>
          <div>
            <strong className={cn('title')}>{t('snkrz.overview.easyFun.card2.title')}</strong>
            <p className={cn('sub-title')}>{t('snkrz.overview.easyFun.card2.desc')}</p>
          </div>
        </div>
        <div className={cn('system-card')}>
          <div>
            <strong className={cn('title')}>{t('snkrz.overview.easyFun.card3.title')}</strong>
            <p className={cn('sub-title')}>{t('snkrz.overview.easyFun.card3.desc')}</p>
            <p className={cn('detail')}>{t('snkrz.overview.easyFun.card3.detail')}</p>
          </div>
          <div className={cn('img')}>
            <Image src={`/assets/images/img/img_life_snkrz_overview_system2.png`} layout="fill" objectFit="cover" loader={NileCDNLoader} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnkrzOverviewSystem;
