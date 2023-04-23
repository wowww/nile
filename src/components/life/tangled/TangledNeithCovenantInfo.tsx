import Image from 'next/image';
import cn from 'classnames';

import { NileCDNLoader } from '@/utils/image/loader';
import { useTranslation } from 'next-i18next';

import TangledTitle from '@/components/life/tangled/TangledTitle';

const ConNeithCovenantInfo = () => {
  const { t } = useTranslation('life');

  return (
    <div className={cn('covenant-info-wrap')}>
      <div className={cn('covenant-info')}>
        <div className={cn('title-wrap')}>
          <TangledTitle title={t('tangled.neith.covenant.title')} desc={t('tangled.neith.covenant.desc')} />
        </div>
        <div className={cn('img-wrap')}>
          <Image
            src="/assets/images/img/img_tangled_neith_covenant.png"
            alt={t('tangled.neith.covenant.imgAlt')}
            layout="fill"
            quality="100"
            loader={NileCDNLoader}
          />
        </div>
      </div>
      <div className={cn('class-covenant-info')}>
        <div className={cn('title-wrap')}>
          <TangledTitle title={t('tangled.neith.classCovenant.title')} desc={t('tangled.neith.classCovenant.desc')} />
        </div>
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

export default ConNeithCovenantInfo;
