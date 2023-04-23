import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import { NileCDNLoader } from '@utils/image/loader';
import Swiper, { Navigation } from 'swiper';
/* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

import TangledTitle from '@/components/life/tangled/TangledTitle';

Swiper.use([Navigation]);

const TangledOverviewUnderstanding: React.FC = () => {
  const { t } = useTranslation('life');
  /* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const understandingList: string[] = ['dapp', 'nft', 'inapp', 'crypto'];

  useEffect(() => {
    if (isMobile) {
      const swiper = new Swiper(swiperRef.current!, {
        slidesPerView: 1,
        spaceBetween: 16,
        navigation: {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        },
      });
    }
    return () => {};
  }, [isMobile]);

  return (
    <div className={cn('overview-understanding')}>
      <TangledTitle title={t('tangled.overview.understanding.title')} />
      {!isMobile ? (
        <div className={cn('features-wrap')}>
          {understandingList.map((v: string) => {
            return (
              <div className={cn('items')} key={`items-${v}`}>
                <span className={cn('thumbnail')}>
                  <Image
                    src={`/assets/images/img/img_life_tangled_us_${v}.png`}
                    width="100%"
                    height="100%"
                    layout="fill"
                    objectFit="cover"
                    loader={NileCDNLoader}
                    alt=""
                  />
                </span>
                <span className={cn('def')}>{t(`tangled.overview.understanding.items.${v}.def`)}</span>
                <strong className={cn('name')}>
                  <span>{t(`tangled.overview.understanding.items.${v}.name`)}</span>
                </strong>
                <p className={cn('text')}>{t(`tangled.overview.understanding.items.${v}.text`)}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className={cn('swiper')} ref={swiperRef}>
            <div className={cn('swiper-wrapper')}>
              {understandingList.map((v: string, i: number) => {
                return (
                  <div className={cn('swiper-slide')} key={`item${i}`}>
                    <div className={cn('items')}>
                      <span className={cn('thumbnail')}>
                        <Image
                          src={`/assets/images/img/img_life_tangled_us_${v}.png`}
                          width="100%"
                          height="100%"
                          layout="fill"
                          objectFit="cover"
                          loader={NileCDNLoader}
                          alt=""
                        />
                      </span>
                      <span className={cn('def')}>{t(`tangled.overview.understanding.items.${v}.def`)}</span>
                      <strong className={cn('name')}>
                        <span>{t(`tangled.overview.understanding.items.${v}.name`)}</span>
                      </strong>
                      <p className={cn('text')}>{t(`tangled.overview.understanding.items.${v}.text`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
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
  );
};

export default React.memo(TangledOverviewUnderstanding);
