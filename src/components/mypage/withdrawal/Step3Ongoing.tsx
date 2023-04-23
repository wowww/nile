import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import InfiniteLoader from '@/components/loader/InfiniteLoader';

const Step3Ongoing: React.FC = ({}) => {
  const { t } = useTranslation(['mypage', 'common']);

  return (
    <>
      <div className={cn('step-wrap')}>
        <div className={cn('ongoing-announce-wrap')}>
          <InfiniteLoader size="lg" />
          <span>{t('withdrawal.ongoing')}</span>
        </div>
      </div>
    </>
  );
};

export default Step3Ongoing;
