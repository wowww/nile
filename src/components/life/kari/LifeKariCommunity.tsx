import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import Image from 'next/image';
import { LifeKariTitle } from '@/components/life/kari/LifeKariTitle';

const LifeKariCommunity = () => {
  const { t } = useTranslation('life');
  return (
    <div className={cn('kari-section', 'kari-community-wrap')}>
      <div className={cn('inner')}>
        <div className={cn('text-content')}>
          <LifeKariTitle smallTitle="Community" largeTitle={t('kari.community.title')} align="left" />
          <p className={cn('desc')}>{t('kari.community.desc')}</p>
        </div>
        <div className={cn('image-wrap')}>
          <Image src={`/assets/images/img/img_kari_community.png`} alt="" layout="fill" loader={NileCDNLoader} />
        </div>
      </div>
    </div>
  );
};

export { LifeKariCommunity };
