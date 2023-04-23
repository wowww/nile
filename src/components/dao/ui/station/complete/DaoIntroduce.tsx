import cn from 'classnames';
import TextButton from '@/components/button/TextButton';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';
import { useTranslation } from 'next-i18next';

const DaoIntroduce = () => {
  const { t } = useTranslation(['dao', 'daoHome']);

  return (
    <div className={cn('station-dao-introduce-wrap')}>
      <div className={cn('text-area')}>
        <strong className={cn('title')}>{t('station.complete.introduce.title')}</strong>
        <p className={cn('desc')}>{t('station.complete.introduce.desc')}</p>
        <TextButton buttonText={t('check.about.btn1', { ns: 'daoHome' })} iconValue="line-arrow" gapSpacing="lg" size="md" type="link" href="/" />
      </div>
      <div className={cn('img-wrap')}>
        <Image src="/assets/images/img/img_dao_station_introduce.png" alt="" layout="fill" loader={NileCDNLoader} />
      </div>
    </div>
  );
};

export default DaoIntroduce;
