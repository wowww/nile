import BgButton from '@/components/button/BgButton';
import { IconLogo } from '@/components/logo/IconLogo';
import { NileCDNLoader } from '@/utils/image/loader';
import cn from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import useMediaQuery from '@/hook/useMediaQuery';
import { message } from 'antd';

const LifeKariHero = () => {
  const { t } = useTranslation(['life', 'common']);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  return (
    <div className={cn('hero-banner-wrap')}>
      <div className={cn('img-wrap')}>
        <Image src="/assets/images/img/bg_kari_hero.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
      </div>
      <div className={cn('content-wrap')}>
        <div className={cn('logo')}>
          <IconLogo type="kari" size={44} />
          Kari
        </div>
        {/* 23.04.10 수정: 버튼 레이블명 수정 */}
        <BgButton
          buttonText={t('goToCollection', {ns: 'common'})}
          color="white" 
          size="lg"
          type="primary"
          href={'/marketplace/KARI'}
          // onClick={() => message.info({ content: t('comingsoon', { ns: 'common' }), key: 'toast' })}
        />
      </div>
    </div>
  );
};

export { LifeKariHero };
