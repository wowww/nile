import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';

import BgButton from '@/components/button/BgButton';

const Step3Finish: React.FC = ({}) => {
  const { t } = useTranslation(['mypage', 'common']);

  return (
    <>
      <div className={cn('step-wrap')}>
        <div className={cn('finish-announce-wrap')}>
          <div className={cn('text-area')}>
            <Image src="/assets/images/icon/ico_success.gif" alt="" width={60} height={60} loader={NileCDNLoader} />
            <span className={cn('title')}>{t('withdrawal.success.title')}</span>
            <span className={cn('desc')}>{t('withdrawal.success.desc')}</span>
          </div>
          <BgButton type="link" href="/" buttonText={t('withdrawal.success.btn')} color="black" size="md" />
        </div>
      </div>
    </>
  );
};

export default Step3Finish;
