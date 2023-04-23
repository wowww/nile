import cn from 'classnames';
import { useTranslation } from 'next-i18next';

const SystemTreasury = () => {
  const { t } = useTranslation('dao');

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.treasury.title1')}</dt>
        <dd>{t('station.operationSystem.treasury.desc1')} </dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.treasury.title2')}</dt>
        <dd>
          {t('station.operationSystem.treasury.item.0.text')}
          <ul>
            <li>{t('station.operationSystem.treasury.item.0.list.0.text')}</li>
            <li> {t('station.operationSystem.treasury.item.0.list.1.text')}</li>
          </ul>
        </dd>
      </dl>
    </div>
  );
};

export default SystemTreasury;
