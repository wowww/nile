import { useTranslation } from 'next-i18next';

import cn from 'classnames';
import OutlineButton from '@/components/button/OutlineButton';

const TangledNeithCovenantDate = () => {
  const { t } = useTranslation('life');

  return (
    <div className={cn('covenant-date-wrap life-tangled-inner')}>
      <div className={cn('date-info')}>
        <h3 className={cn('title')}>{t('neithStationTab.date.title')}</h3>
        <strong className={cn('date')}>{t('tangled.neith.date.date')}</strong>
        <p>{t('neithStationTab.date.desc02')}</p>
        <OutlineButton buttonText={t('tangled.neith.use.btnStation')} color="white" size="lg" />
      </div>
      <div className={cn('date-image')}></div>
    </div>
  );
};

export default TangledNeithCovenantDate;
