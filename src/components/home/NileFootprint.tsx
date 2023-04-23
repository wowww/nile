import cn from 'classnames';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ContentTitle from '../marketplace/ContentTitle';
import { useTranslation } from 'next-i18next';
import { NileApiService } from '@/services/nile/api';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
/* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';
import { Activity } from '@/types/activity.types';

const NileFootprintItem = dynamic(() => import('@components/home/NileFootPrintItem'), { ssr: false });

const NileFootprint = () => {
  const { t } = useTranslation(['nile', 'common']);
  /* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isTablet = useMediaQuery('(max-width: 1279px)');

  const { ref: inViewRef, inView } = useInView({ threshold: 1 });
  const swiperRef = useRef<any>();

  const { home } = NileApiService();

  const [footprints, setFootprints] = useState<Activity[]>();

  useEffect(() => {
    home.footprints().then(({ data }) => {
      setFootprints(data.results.splice(0, 9));
    });
  }, []);

  useEffect(() => {
    if (inView) {
      swiperRef.current?.autoplay.start();
    } else {
      swiperRef.current?.autoplay.stop();
    }
  }, [inView]);

  return (
    <div className={cn('nile-footprint-wrap')}>
      <ContentTitle serif title="Footprint" />
      <div className={cn('slide-wrap')} ref={inViewRef}>
        {footprints && (
          <Swiper
            slidesPerView={'auto'}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
            }}
            // loopedSlidesLimit={false}
            loopedSlides={footprints.length}
            spaceBetween={12}
            threshold={10}
            allowTouchMove={false}
            centeredSlides={false}
            onInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {footprints?.map((el, index) => {
              return (
                <SwiperSlide key={`slide-${el.id}`}>
                  {({ isActive, isVisible }) => {
                    return <NileFootprintItem activity={el} visible={isVisible} />;
                  }}
                  {/* <NileFootprintCard {...el} /> */}
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default NileFootprint;
