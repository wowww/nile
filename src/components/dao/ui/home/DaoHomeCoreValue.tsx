import { useEffect, useState } from 'react';
import cn from 'classnames';
import 'swiper/css/effect-fade';
import { useTranslation } from 'next-i18next';

import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { ReactSVG } from 'react-svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
import useMediaQuery from '@/hook/useMediaQuery';

const DaoHomeLottie = () => {
  const { t } = useTranslation('daoHome');
  const activeDao = useAtomValue(daoThemeAtom);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [swiperClassName, setSwiperClassName] = useState('first-slide');

  // swiper 옵션 셋팅 값
  const swiperSetOptions: SwiperOptions = {
    slidesPerView: 1.06,
    spaceBetween: 12,
    modules: [Pagination],
    pagination: {
      clickable: true,
    },
  };

  const swiperSetEvents: any = {
    onSlideChange: (swiper: SwiperCore) => {
      if (swiper.isBeginning) {
        setSwiperClassName('first-slide');
      } else if (swiper.isEnd) {
        setSwiperClassName('last-slide');
      } else {
        setSwiperClassName('');
      }
    },
  };

  const descList = [
    {
      title: t('coreValue.subtitle1'),
      desc: t('coreValue.subdesc1-1'),
      subDesc: t('coreValue.subdesc1-2'),
    },
    {
      title: t('coreValue.subtitle2'),
      desc: t('coreValue.subdesc2-1'),
      subDesc: t('coreValue.subdesc2-2'),
    },
    {
      title: t('coreValue.subtitle3'),
      desc: t('coreValue.subdesc3-1'),
      subDesc: t('coreValue.subdesc3-2'),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    // iOS 대응 코드
    const saveInitVh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--initVh', `${saveInitVh}px`);
  }, []);

  return (
    <>
      <div className={cn('dao-section', 'dao-core-value-wrap', `${activeDao.value}-wrap`)}>
        <div className={cn('dao-lottie-inner')}>
          <div className={cn('dao-lottie')}>
            <div className={cn('lottie-desc-wrap')}>
              <div className={cn('lottie-desc-inner')}>
                <div className={cn('lottie-title-wrap')}>
                  <h2>
                    <span>{t('coreValue.title1')}</span>
                    <span>{t('coreValue.title2')}</span>
                  </h2>
                </div>
                <div className={cn('lottie-component-wrap')}>
                  <div className={cn('lottie-component-inner')}>
                    <div className={cn('image-component')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_core_value1.svg" />
                    </div>
                  </div>
                </div>

                {isMobile ? (
                  <div className={cn('desc-list-wrap', swiperClassName)}>
                    <Swiper {...swiperSetOptions} {...swiperSetEvents}>
                      {descList.map((item, index) => {
                        return (
                          <SwiperSlide key={`desc-list${index}`}>
                            <div className={cn('item')}>
                              <h3>{item.title}</h3>
                              <div className={cn('lottie-desc-box')}>
                                <strong>{item.desc}</strong>
                                <div>{item.subDesc}</div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                ) : (
                  <ol className={cn('desc-list-wrap')}>
                    {descList.map((item, index) => {
                      return (
                        <li key={`desc-list${index}`}>
                          <h3>{item.title}</h3>
                          <div className={cn('lottie-desc-box')}>
                            <strong>{item.desc}</strong>
                            <div>{item.subDesc}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaoHomeLottie;
