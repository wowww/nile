import React from 'react';
import cn from 'classnames';
import SnkrzTitle from '@components/life/snkrz/SnkrzTitle';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { useTranslation } from 'next-i18next';

const SnkrzOverviewMoreAbout = () => {
  const { t } = useTranslation(['life', 'common']);
  return (
    <div className={cn('overview-moreabout-wrap')}>
      <SnkrzTitle title={t('snkrz.overview.moreAbout.title')} />
      <div className={cn('system-card-wrap')}>
        <div className={cn('system-card')}>
          <div className={cn('system-card-image')}>
            <Image src="/assets/images/img/img_nft.png" layout="fill" loader={NileCDNLoader} />
          </div>
          <div className={cn('system-card-label')}>
            <p className={cn('system-card-label-txt')}>{t('snkrz.overview.moreAbout.card1.label')}</p>
          </div>
          <div className={cn('system-card-top')}>
            <p className={cn('title')}>{t('snkrz.overview.moreAbout.card1.top.title')}</p>
            <p className={cn('desc')}>{t('snkrz.overview.moreAbout.card1.top.desc')}</p>
          </div>
          <div className={cn('system-card-bottom')}>
            <p className={cn('title')}>{t('snkrz.overview.moreAbout.card1.bottom.title')}</p>
            <p className={cn('desc')}>{t('snkrz.overview.moreAbout.card1.bottom.desc')}</p>
          </div>
        </div>
        <div className={cn('system-card')}>
          <div className={cn('system-card-image')}>
            <Image src="/assets/images/img/img_token.png" layout="fill" loader={NileCDNLoader} />
          </div>
          <div className={cn('system-card-label')}>
            <p className={cn('system-card-label-txt')}>{t('snkrz.overview.moreAbout.card2.label')}</p>
          </div>
          <div className={cn('system-card-top')}>
            <p className={cn('title')}>{t('snkrz.overview.moreAbout.card2.top.title')}</p>
            <p className={cn('desc')}>{t('snkrz.overview.moreAbout.card2.top.desc')}</p>
          </div>
          <div className={cn('system-card-bottom')}>
            <p className={cn('title')}>{t('snkrz.overview.moreAbout.card2.bottom.title')}</p>
            <p className={cn('desc')}>{t('snkrz.overview.moreAbout.card2.bottom.desc')}</p>
          </div>
        </div>
        <div className={cn('system-card')}>
          <div className={cn('system-card-image')}>
            <Image src="/assets/images/img/img_point.png" layout="fill" loader={NileCDNLoader} />
          </div>
          <div className={cn('system-card-label')}>
            <p className={cn('system-card-label-txt')}>{t('snkrz.overview.moreAbout.card3.label')}</p>
          </div>
          <div className={cn('system-card-top')}>
            <p className={cn('title')}>{t('snkrz.overview.moreAbout.card3.top.title')}</p>
            <p className={cn('desc')}>{t('snkrz.overview.moreAbout.card3.top.desc')}</p>
          </div>
          <div className={cn('system-card-bottom')}>
            <p className={cn('title')}>{t('snkrz.overview.moreAbout.card3.bottom.title')}</p>
            <p className={cn('desc')}>{t('snkrz.overview.moreAbout.card3.bottom.desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnkrzOverviewMoreAbout;
