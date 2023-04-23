import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

const HowDao2 = () => {
  const { t } = useTranslation('dao');

  return (
    <li id="operation">
      <div className={cn('text-area')}>
        <strong className={cn('title')}>{t('station.recruiting.section.2.2.title')}</strong>
        <p className={cn('desc')}>{t('station.recruiting.section.2.2.desc')}</p>
        <ol>
          <li>{t('station.recruiting.section.2.2.list.1')}</li>
          <li>{t('station.recruiting.section.2.2.list.2')}</li>
          <li>{t('station.recruiting.section.2.2.list.3')}</li>
        </ol>
      </div>
      <div className={cn('img-area')}>
        <Image src="/images/img_recruit_dao_work_governance.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="contain" />
      </div>
    </li>
  );
};

export default HowDao2;
