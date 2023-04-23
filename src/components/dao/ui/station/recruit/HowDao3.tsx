import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

const HowDao3 = () => {
  const { t } = useTranslation('dao');

  return (
    <li id="tokens">
      <div className={cn('text-area')}>
        <strong className={cn('title')}>{t('station.recruiting.section.2.3.title')}</strong>
        <div className={cn('desc-area')}>
          <strong className={cn('desc-title')}>{t('station.recruiting.section.2.3.desc.1.title')}</strong>
          <p className={cn('desc')}>{t('station.recruiting.section.2.3.desc.1.desc')}</p>
          <ul className={cn('list-type-dot')}>
            <li>{t('station.recruiting.section.2.3.desc.1.ul.1')}</li>
            <li>{t('station.recruiting.section.2.3.desc.1.ul.2')}</li>
            <li>{t('station.recruiting.section.2.3.desc.1.ul.3')}</li>
          </ul>
        </div>
        <div className={cn('desc-area')}>
          <strong className={cn('desc-title')}>{t('station.recruiting.section.2.3.desc.2.title')}</strong>
          <p className={cn('desc')}>{t('station.recruiting.section.2.3.desc.2.desc')}</p>
          <ul className={cn('list-type-dot')}>
            <li>{t('station.recruiting.section.2.3.desc.2.ul.1')}</li>
            <li>{t('station.recruiting.section.2.3.desc.2.ul.2')}</li>
            <li>{t('station.recruiting.section.2.3.desc.2.ul.3')}</li>
          </ul>
        </div>
      </div>
      <div className={cn('img-area')}>
        <Image src="/images/img_recruit_dao_work_2.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="contain" />
      </div>
    </li>
  );
};

export default HowDao3;
