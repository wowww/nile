import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

const HowDao4 = () => {
  const { t } = useTranslation('dao');

  return (
    <li id="tokenomics">
      <div className={cn('text-area')}>
        <strong className={cn('title')}>{t('station.recruiting.section.2.tokenomics.title')}</strong>
        <p className={cn('desc')}>{t('station.recruiting.section.2.tokenomics.desc')}</p>
        <p className={cn('desc')}>{t('station.recruiting.section.2.tokenomics.desc-2')}</p>
        <ul className={cn('list-type-dot')}>
          <li>{t('station.recruiting.section.2.tokenomics.ul.1')}</li>
          <li>
            {t('station.recruiting.section.2.tokenomics.ul.2')}
            <ol>
              <li>{t('station.recruiting.section.2.tokenomics.ul.2-1')}</li>
              <li>{t('station.recruiting.section.2.tokenomics.ul.2-2')}</li>
            </ol>
          </li>
        </ul>
      </div>
      <div className={cn('img-area')}>
        <Image src="/images/img_recruit_dao_work_3.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="contain" />
      </div>
    </li>
  );
};

export default HowDao4;
