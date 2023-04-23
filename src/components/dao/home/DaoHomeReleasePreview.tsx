import { forwardRef, ReactEventHandler, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { SwiperOptions } from 'swiper';
import cn from 'classnames';
import Link from 'next/link';

import { useAtomValue } from 'jotai';

import { daoThemeAtom } from '@/state/daoAtom';
import { useSetAtom } from 'jotai';
import { ReactSVG } from 'react-svg';
import OutlineButton from '@/components/button/OutlineButton';

type Props = {
  daoClassName: string;
};

const DaoHomeReleasePreview = forwardRef<HTMLDivElement, Props>(({ daoClassName }, ref: any) => {
  const daoListSwiperRef = useRef<any>();

  const activeDao = useAtomValue(daoThemeAtom);
  const setUpdateDaoTheme = useSetAtom(daoThemeAtom);
  const [initialSwiperIndex, setInitialSwiperIndex] = useState(0);

  console.log('daoClassName', daoClassName);
  const daoList = [
    {
      name: 'oracle',
      color: '#ACCF32',
      count: 1,
      logoUrl: '',
      imageUrl: '',
    },
    {
      name: 'wonder',
      color: '#5E5FF5',
      count: 0,
      logoUrl: '',
      imageUrl: '',
    },
    {
      name: 'arteum',
      color: '#EA5C5B',
      count: 321142,
      logoUrl: '',
      imageUrl: '',
    },
    {
      name: 'delta',
      color: '#00B0FF',
      count: 3,
      logoUrl: '',
      imageUrl: '',
    },
    // {
    //   name: 'topstpot',
    //   color: '#005391',
    //   count: 4,
    //   logoUrl: '',
    //   imageUrl: '',
    // },
  ];

  const swiperSetOptions: SwiperOptions = {
    initialSlide: initialSwiperIndex,
    slidesPerView: 'auto',
    spaceBetween: 24,
    slideToClickedSlide: true,
    loop: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    speed: 200,
    allowTouchMove: false,
    // passiveListeners: false, // TODO: 확인 필요
  };

  const swiperSetEvents: any = {
    onInit: (swiper: SwiperCore) => {
      daoListSwiperRef.current = swiper;

      const daoActiveIndex = daoList.findIndex((v) => {
        return v.name === activeDao.value;
      });
      daoListSwiperRef.current.slideToLoop(daoActiveIndex);
    },
  };

  const slidesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = event.currentTarget.closest('.swiper-slide') as HTMLButtonElement;
    const activeIndex = eventTarget?.dataset.swiperSlideIndex || daoListSwiperRef.current.realIndex;
    daoListSwiperRef.current.slideToLoop(activeIndex);
    setUpdateDaoTheme({ value: daoList[activeIndex].name });
  };

  // dao theme change
  useEffect(() => {
    const daoActiveIndex = daoList.findIndex((v) => {
      return v.name === activeDao.value;
    });
    setInitialSwiperIndex(daoActiveIndex);
  }, [activeDao.value]);

  return (
    <div className={cn('dao-slide-wrap', daoClassName)}>
      <div className={cn('title-wrap')}>
        <h2 className={cn('dao-release-title')}>
          5 DAOs Line Up! <br />
          the beginning of a new civilization.
        </h2>
        <p className={cn('dao-release-desc')}>
          <strong>1,234,669명</strong>이 5개의 DAO를 둘러보고 있어요.
        </p>
        <OutlineButton buttonText="다오 소개 영상 보기" color="black" size="sm" />
      </div>

      <Swiper {...swiperSetOptions} {...swiperSetEvents} ref={ref}>
        {daoList.map((el, index) => {
          return (
            <SwiperSlide key={`dao-item${index}`}>
              {/* <button type="button" className={cn('dao-item-list', el.name)} onClick={slidesClick}> */}
              <button type="button" className={cn('dao-item-list', el.name)} onClick={slidesClick}>
                <div className="inner-wrap">
                  <span className={cn('logo-wrap')}>
                    <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/img/img_logo_dao_${el.name}.svg`} />
                  </span>
                  <span className={cn('img-wrap')}>
                    <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/img/img_thumb_dao_${el.name}.svg`} />
                  </span>
                </div>
                <div className={cn('count-wrap')}>
                  <p className={cn('desc')}>
                    <strong className={cn('num')}>{el.count}</strong>명이 살펴봤어요.
                  </p>
                </div>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
});

export default DaoHomeReleasePreview;
