import { useState, useRef, useEffect, forwardRef } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { FreeMode, SwiperOptions } from 'swiper';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { headerHideFull } from '@/state/layoutAtom';
import * as Scroll from 'react-scroll';

interface RecruitNavigationDataType {
  name: string;
  id: string;
  key: string;
}

interface Props {
  now: string;
}

const RecruitNavigation = ({ now }: Props) => {
  const { t } = useTranslation('dao');

  const setHeaderHide = useSetAtom(headerHideFull);

  const ref = useRef<any>();

  const swiperEvt = useRef<any>();
  const RecruitNavigationData: RecruitNavigationDataType[] = [
    {
      name: t('station.recruiting.navBar.1'),
      id: '#recruitment-information',
      key: 'recruit',
    },
    {
      name: t('station.recruiting.navBar.2'),
      id: '#participation-procedure',
      key: 'procedure',
    },
    {
      name: t('station.recruiting.navBar.3'),
      id: '#purpose',
      key: 'purpose',
    },
    {
      name: t('station.recruiting.navBar.4'),
      id: '#operation',
      key: 'operation',
    },
    {
      name: t('station.recruiting.navBar.5'),
      id: '#tokens',
      key: 'tokens',
    },
    {
      name: t('station.recruiting.navBar.6'),
      id: '#tokenomics',
      key: 'tokenomics',
    },
    {
      name: t('station.recruiting.navBar.7'),
      id: '#trust',
      key: 'trust',
    },
  ];

  const swiperSetEvents: any = {
    onInit: (swiper: SwiperCore) => {
      swiperEvt.current = swiper;
    },
  };

  useEffect(() => {
    RecruitNavigationData.map((el, index) => {
      if (el.key === now) {
        swiperEvt.current.slideTo(index);
      }
    });
  }, [now]);

  const swiperSetOptions: SwiperOptions = {
    slidesPerView: 'auto',
    resistanceRatio: 0,
    modules: [FreeMode],
    observer: true,
  };

  const _handleClick = (event: any) => {
    const { target } = event;
    if (ref.current) {
      ref.current.classList.add('main-header-inhibitor');

      setHeaderHide(true);
    }

    event.preventDefault();
  };

  return (
    <div className={cn('recruit-navigation-wrap')} ref={ref}>
      <div className={cn('recruit-navigation-list')}>
        <Swiper {...swiperSetOptions} {...swiperSetEvents}>
          {RecruitNavigationData.map((el, index) => (
            <SwiperSlide key={el.key} className={cn(el.key === now && 'selected')}>
              <Scroll.Link to={el.key} offset={index < 2 ? -60 : -57} onClick={() => _handleClick(event)}>
                {el.name}
              </Scroll.Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecruitNavigation;
