/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useRef } from 'react';
import cn from 'classnames';
import lottie from 'lottie-web';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'next-i18next';
import lottieHeroWonderDao from '@/assets/lottie/lottie_dao_home_wonderdao.json';
/* 22.11.07 수정: 11일 오픈 컨텐츠 수정 */
import Tag from '@/components/tag/Tag';
/* 22.12.19 수정: TextButton, IconLogo 컴포넌트 삭제 */
/* 22.12.19 수정: ReactSVG 컴포넌트 추가 */
import { ReactSVG } from 'react-svg';

const DaoHomeHero = () => {
  const { t } = useTranslation('daoHome');
  const { i18n } = useTranslation('ko');
  // lottie div Element
  const daoLottieHeroWonder = useRef<HTMLDivElement>(null);

  const swiperHero = useRef<HTMLDivElement>(null);

  const swiperEvt = useRef<any>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: daoLottieHeroWonder.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieHeroWonderDao,
    });
    /* 22.12.22 수정: lottie 렌더링 bug fix */
    return () => lottieLoad.destroy();
  }, []);

  return (
    <div className={cn('hero-banner-section')} ref={swiperHero}>
      <Swiper
        // initialSlide={1}
        slidesPerView={1}
        speed={1000}
        threshold={20}
        onInit={(swiper) => {
          swiperEvt.current = swiper;
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          console.log(swiper.activeIndex, 'active index');
        }}
      >
        <SwiperSlide className={cn('wonder-dao')}>
          <div className={cn('hero-banner-wrap')}>
            {/* 22.11.02 수정 start: 11월 11일 오픈 임시 컨텐츠 */}
            <div className={cn('hero-banner-inner')}>
              <div className={cn('hero-text-container')}>
                <div className={cn('hero-logo')}>
                  {/* 22.12.19 수정 start: daoToken 아이콘 변경, IconLogo 컴포넌트 삭제 */}
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotokens/ico_wonder_badge.svg" />
                  {/* 22.12.19 수정 end: daoToken 아이콘 변경, IconLogo 컴포넌트 삭제  */}
                </div>
                <h2>
                  {/* 22.12.23 수정: 문구 수정 */}
                  <Tag size="md-m" color="tag-black">
                    UNFOLDING SOON
                  </Tag>
                  <strong>WONDER DAO</strong>
                </h2>
                <div className={cn('hero-desc')}>
                  {/* 22.12.19 수정 start: 다국어 적용 */}
                  {/* 22.11.10 수정 start: 문구 수정 */}
                  {t('hero.item.1.title')}
                  {/* 22.11.10 수정 end: 문구 수정 */}
                  {/* 22.12.19 수정 end: 다국어 적용 */}
                </div>

                {/* 22.12.19 수정: wonder 버튼 삭제 */}

                <div className={cn('hero-dashboard')}>
                  {/* 22.12.19 수정 start: 다국어 적용 */}
                  <div className={cn('hero-dash-column')}>
                    <span>{t('hero.item.1.dashboard.name')}</span>
                    <strong>{t('hero.item.1.dashboard.date')}</strong>
                  </div>
                  {/* 22.12.19 수정 end: 다국어 적용 */}
                </div>
              </div>
              <div className={cn('hero-lottie')} ref={daoLottieHeroWonder} />
            </div>
            {/* 22.11.02 수정 end: 11월 11일 오픈 임시 컨텐츠 */}

            {/* dao 오픈 컨텐츠 */}
            {/* <div className={cn('hero-banner-inner')}>
              <div className={cn('hero-text-container')}>
                <div className={cn('hero-logo')}>
                  <IconLogo type="wonder" size={60} fullType />
                </div>
                <h2>
                  <span>{t('hero.item.0.title1')}</span>
                  <strong>{t('hero.item.0.title2')}</strong>
                </h2>
                <div className={cn('hero-desc')}>{t('hero.item.0.desc')}</div>
                <div className={cn('hero-dashboard')}>
                  <div className={cn('hero-dash-column')}>
                    <span>{t('hero.item.0.station1')}</span>
                    <strong>{t('hero.item.0.station2')}</strong>
                  </div>
                  <div className={cn('hero-dash-column')}>
                    <span>{t('hero.item.0.member1')}</span>
                    <strong>{t('hero.item.0.member2')}</strong>
                  </div>
                </div>
                <div className={cn('hero-button-wrap')}>
                  <OutlineButton buttonText={t('hero.item.0.btn1')} color="white" size="lg" />
                </div>
              </div>
              <div className={cn('hero-lottie')} ref={daoLottieHeroWonder} />
            </div> */}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DaoHomeHero;
