import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import TangledTitle from './TangledTitle';
const TangledNeithCovenantClass = () => {
  const { t } = useTranslation('life');
  return (
    <div className={cn('life-tangled-inner')}>
      <div className={cn('life-tangled-inner')}>
        <div className={cn('class-covenant-info-title-wrap')}>
          <TangledTitle title={t('tangled.neith.classCovenant.title')} />
        </div>
      </div>
      <div className={cn('class-covenant-info')}>
        <p className={cn('class-covenant-desc')}>{t('tangled.neith.classCovenant.desc')}</p>
        <ul className={cn('class-list-wrap')}>
          <li className={cn('class-list', 'luxury')}>
            <span className={cn('type')}>{t('tangled.neith.classCovenant.luxury.type')}</span>
            <div className={cn('info-wrap')}>
              <strong className={cn('name')}>{t('tangled.neith.classCovenant.luxury.name')}</strong>
              <p className={cn('price')}>
                <strong>200</strong> WEMIX
              </p>
            </div>
          </li>
          <li className={cn('class-list', 'highend')}>
            <span className={cn('type')}>{t('tangled.neith.classCovenant.highend.type')}</span>
            <div className={cn('info-wrap')}>
              <strong className={cn('name')}>{t('tangled.neith.classCovenant.highend.name')}</strong>
              <p className={cn('price')}>
                <strong>400</strong> WEMIX
              </p>
            </div>
          </li>
          <li className={cn('class-list', 'zenith')}>
            <span className={cn('type')}>{t('tangled.neith.classCovenant.zenith.type')}</span>
            <div className={cn('info-wrap')}>
              <strong className={cn('name')}>{t('tangled.neith.classCovenant.zenith.name')}</strong>
              <p className={cn('price')}>
                <strong>800</strong> WEMIX
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TangledNeithCovenantClass;
