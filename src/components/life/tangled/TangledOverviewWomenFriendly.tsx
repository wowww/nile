import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import { NileCDNLoader } from '@utils/image/loader';
import Swiper, { Navigation } from 'swiper';
import useMediaQuery from '@/hook/useMediaQuery';

Swiper.use([Navigation]);

const TangledOverviewWomenFriendly: React.FC = () => {
  const { t } = useTranslation(['life', 'common']);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isMobile) {
      const swiper = new Swiper(swiperRef.current!, {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        },
      });
    }
    return () => {};
  }, [isMobile]);

  const friendlyList = t(`tangled.overview.womenFriendly.list`, { returnObjects: true });

  return (
    <div className={cn('overview-women-friendly')}>
      <div className={cn('ttps-title-wrap')}>
        <h2 className={cn('color-title')}>
          Women Friendly
          <br />
          Web3 Live Chat
        </h2>
        <p className={cn('desc')}>{t('tangled.overview.womenFriendly.desc')}</p>
      </div>
      <div className={cn('ttps-video-wrap')}>
        <div className={cn('video-inner')}>
          <video autoPlay loop muted playsInline>
            <source src="/video/video_tangled.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className={cn('ttps-women-friendly-list')} key="friendly-list-pc">
        {!isMobile ? (
          <div className={cn('friendly-list-wrap')}>
            <ul className={cn('friendly-list')}>
              {Object.keys(friendlyList).map((list, index) => {
                return (
                  <li key={`friendly-list-${index}`}>
                    <div className={cn('img')}>
                      <Image
                        src={`/assets/images/img/img_tangled_list_0${index}.png`}
                        width="100%"
                        height="100%"
                        layout="fill"
                        objectFit="cover"
                        loader={NileCDNLoader}
                        alt=""
                      />
                    </div>
                    <div className={cn('list-content')}>
                      <strong>{t(`tangled.overview.womenFriendly.list.${index}.title`)}</strong>
                      <span>{t(`tangled.overview.womenFriendly.list.${index}.desc`)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <>
            <div className={cn('swiper friendly-list-wrap')} ref={swiperRef} key="friendly-list-mobile">
              <ul className={cn('swiper-wrapper friendly-list')}>
                {Object.keys(friendlyList).map((list, index) => {
                  return (
                    <li className={cn('swiper-slide')} key={`friendly-list-${index}`}>
                      <div className={cn('img')}>
                        <Image
                          src={`/assets/images/img/img_tangled_list_0${index}.png`}
                          width="100%"
                          height="100%"
                          layout="fill"
                          objectFit="cover"
                          loader={NileCDNLoader}
                          alt=""
                        />
                      </div>
                      <div className={cn('list-content')}>
                        <strong>{t(`tangled.overview.womenFriendly.list.${index}.title`)}</strong>
                        <span>{t(`tangled.overview.womenFriendly.list.${index}.desc`)}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(TangledOverviewWomenFriendly);
