import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import cn from 'classnames';
import { NileCDNLoader } from '@utils/image/loader';
/* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

const MysteryGuid = () => {
  const [size, setSize] = useState('lg');

  const { t } = useTranslation('life');
  /* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  interface stepDataPropsType {
    img: string;
    step: string;
    desc: string;
    notice?: string;
  }

  // step 리스트
  const stepData: stepDataPropsType[] = [
    {
      img: t('snkrz.mystery.usage.1.img'),
      step: t('snkrz.mystery.usage.1.step'),
      desc: t('snkrz.mystery.usage.1.desc'),
    },
    {
      img: t('snkrz.mystery.usage.2.img'),
      step: t('snkrz.mystery.usage.2.step'),
      desc: t('snkrz.mystery.usage.2.desc'),
      notice: t('snkrz.mystery.usage.2.notice'),
    },
    {
      img: t('snkrz.mystery.usage.3.img'),
      step: t('snkrz.mystery.usage.3.step'),
      desc: t('snkrz.mystery.usage.3.desc'),
    },
    {
      img: t('snkrz.mystery.usage.4.img'),
      step: t('snkrz.mystery.usage.4.step'),
      desc: t('snkrz.mystery.usage.4.desc'),
    },
  ];

  useEffect(() => {
    if (!isMobile && isTablet) {
      setSize('md');
    } else if (isMobile) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  }, [isMobile, isTablet]);

  return (
    <div className={cn('mystery-guid-step')}>
      <strong className={cn('mystery-guid-title')}>{t('snkrz.mystery.usage.title')}</strong>
      {size === 'sm' ? (
        <Swiper
          className={cn('mystery-guid-slider')}
          centeredSlides
          slidesPerView={1.4}
          spaceBetween={36}
          speed={300}
          threshold={10}
          pagination={{
            clickable: true,
          }}
          draggable
        >
          {stepData.map((item, idx) => (
            <SwiperSlide key={item.step}>
              <div className={cn('mystery-card-slide')}>
                <div key={idx} className={cn('card-item')}>
                  <div className={cn('card-image')}>
                    <Image src={item.img} alt="" width={224} height={438} layout="responsive" quality="100" loading="eager" loader={NileCDNLoader} />
                  </div>
                </div>
              </div>
              <strong className={cn('card-info-title')}>{item.step}</strong>
              <div className={cn('card-info-desc')}>{item.desc}</div>
              <div className={cn('card-info-notice')}>{item.notice}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={cn('step-card-wrap')}>
          {stepData.map(({ img, step, desc, notice }) => {
            return (
              <div className={cn('mystery-step-card')} key={step}>
                <Image src={img} alt="" width={224} height={438} layout="responsive" loader={NileCDNLoader} />
                <div className={cn('step-card-info')}>
                  <strong className={cn('card-info-title')}>{step}</strong>
                  <p className={cn('card-info-desc')}>{desc}</p>
                  {notice && <span className={cn('card-info-notice')}>{notice}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MysteryGuid;
