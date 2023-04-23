import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

const HowDao1 = () => {
  const { t } = useTranslation('dao');

  return (
    <li id="purpose">
      <div className={cn('text-area')}>
        <strong className={cn('title')}>{t('station.recruiting.section.2.1.title')}</strong>
        <p className={cn('desc')}>{t('station.recruiting.section.2.1.desc')}</p>
        <a href="#" className={cn('link')}>
          {t('station.recruiting.section.2.1.link')}
          <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_arrow_24.svg" />
        </a>
      </div>
      <div className={cn('img-area')}>
        <Image src="/images/img_recruit_dao_work_1.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="contain" />
      </div>
    </li>
  );
};

export default HowDao1;
