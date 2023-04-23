import { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { message } from 'antd';

import BgButton from '@/components/button/BgButton';
import { IconLogo } from '@/components/logo/IconLogo';

const BagcTop = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <div className={cn('life-top-section bagc')}>
      <div className={cn('con-inner')}>
        <h2>
          <span className={cn('title')}>
            <span className={cn('symbol')}>
              <IconLogo type="bagc" size={44} />
            </span>
            <span className={cn('text')}>BAGC</span>
          </span>
          <strong>{t('bagc.main.title')}</strong>
        </h2>
        <div className={cn('btn-wrap')}>
          <BgButton color="black" size="lg" type="primary" buttonText={t('bagc.main.btn')} target="_blank" href=" https:/bagc.altava.com" />
        </div>
      </div>
    </div>
  );
};

export default BagcTop;
