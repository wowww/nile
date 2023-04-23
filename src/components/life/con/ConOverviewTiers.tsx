import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { useRef } from 'react';
import { NileCDNLoader } from '@/utils/image/loader';
import Image from 'next/image';

const ConOverviewTiers = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { t } = useTranslation('life');
  return (
    <div className={cn('overview-tiers')}>
      <span className={cn('cross-line')}></span>
      <span className={cn('twinkle-bg')}></span>
      <div className={cn('tiers-contents')}>
        <div className={cn('title-area')}>
          <h2>{t('con.overview.tiers.title')}</h2>
          <p>{t('con.overview.tiers.subtitle')}</p>
        </div>
        <div className={cn('tiers')}>
          <Swiper
            modules={[Navigation, Pagination]}
            scrollbar={{ el: '.swiper-scrollbar', draggable: false }}
            slidesPerView={5}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              360: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1280: {
                slidesPerView: 5,
              },
            }}
          >
            <SwiperSlide>
              <div className={cn('tier-img-slide')}>
                <div className={cn('tier-img-wrap')}>
                  {/* 23.03.27 수정: 이미지 리소스 성능(용량) 관련 png 파일로 교체 */}
                  <Image src="/assets/images/img/img_overview_tier1.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="contain" />
                </div>
                <p className={cn('desc')}>{t('con.overview.tiers.contents.tier1')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cn('tier-img-slide')}>
                <div className={cn('tier-img-wrap')}>
                  {/* 23.03.27 수정: 이미지 리소스 성능(용량) 관련 png 파일로 교체 */}
                  <Image src="/assets/images/img/img_overview_tier2.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="contain" />
                </div>
                <p className={cn('desc')}>{t('con.overview.tiers.contents.tier2')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cn('tier-img-slide')}>
                <div className={cn('tier-img-wrap')}>
                  {/* 23.03.27 수정: 이미지 리소스 성능(용량) 관련 png 파일로 교체 */}
                  <Image src="/assets/images/img/img_overview_tier3.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="contain" />
                </div>
                <p className={cn('desc')}>{t('con.overview.tiers.contents.tier3')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cn('tier-img-slide')}>
                <div className={cn('tier-img-wrap')}>
                  {/* 23.03.27 수정: 이미지 리소스 성능(용량) 관련 png 파일로 교체 */}
                  <Image src="/assets/images/img/img_overview_tier4.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="contain" />
                </div>
                <p className={cn('desc')}>{t('con.overview.tiers.contents.tier4')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cn('tier-img-slide')}>
                <div className={cn('tier-img-wrap')}>
                  {/* 23.03.27 수정: 이미지 리소스 성능(용량) 관련 png 파일로 교체 */}
                  <Image src="/assets/images/img/img_overview_tier5.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="contain" />
                </div>
                <p className={cn('desc')}>{t('con.overview.tiers.contents.tier5')}</p>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className={cn('swiper-button-wrap')}>
            <button type="button" ref={prevRef} className={cn('btn-swiper', 'btn-prev')}>
              <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
            </button>
            <button type="button" ref={nextRef} className={cn('btn-swiper', 'btn-next')}>
              <span className={cn('a11y')}>{t('next', { ns: 'common' })}</span>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConOverviewTiers;
