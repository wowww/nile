import cn from 'classnames';
/* 22.11.09 수정 start: 슬라이드로 히어로 배너 수정 */
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'next-i18next';
import OutlineButton from '../button/OutlineButton';

const LifeHeroBanner = () => {
  const { t } = useTranslation(['life', 'common']);
  return (
    <div className={cn('life-hero-banner-wrap')}>
      <Swiper
        // initialSlide={1}
        slidesPerView={1}
        speed={1000}
        threshold={20}
      >
        <SwiperSlide className={cn('life-hero-banner')}>
          <div className={cn('title-wrap')}>
            <h2 className={cn('title')}>TIPO Token (TIPO)</h2>
            <p className={cn('desc')}>{t('home.banner.desc')}</p>
          </div>
          <div className={cn('button-wrap')}>
            <OutlineButton buttonText={t('discoverProjectBtn', { ns: 'common' })} size="lg" color="white" href="/life/ttps" />
            <OutlineButton buttonText={t('eventPopup.tipo.btn3', { ns: 'common' })} size="lg" color="white" href="/tokens/detail?token=TIPO" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
/* 22.11.09 수정 end: 슬라이드로 히어로 배너 수정 */
export default LifeHeroBanner;
