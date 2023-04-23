/* 22.10.24 수정 start: GrowthBanner 전체 수정 */
import React, { useRef, useState } from 'react';
import cn from 'classnames';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import dynamic from 'next/dynamic';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { stackChartDarkDefaultData, totalFuncDark } from '@/components/chart/chartDummyData';
import { ReactSVG } from 'react-svg';

const StackLineChart = dynamic(() => import('@/components/chart/StackLineChartDark'), { ssr: false });
interface BannerDataItem {
  name: string;
  figure: number;
  unit: string;
}
interface BannerButtonProps extends BannerDataItem {
  active: boolean;
  selected: boolean;
  index: number;
  onClick: (e: any, index: number) => void | number;
}

const GrowthBanner = () => {
  const total = totalFuncDark; // 더미 데이터에서 total 값 계산을 위한 실행
  const [isActive, setIsChart] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const growthSwiper = useRef<any>();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['nile', 'common']);

  // 22.11.02 수정 start: 다국어 적용
  const BannerData: BannerDataItem[] = [
    {
      name: t('home.banner.item.0.title'),
      figure: 8865700,
      unit: '$',
    },
    {
      name: t('home.banner.item.1.title'),
      figure: 8865700,
      unit: '$',
    },
    {
      name: t('home.banner.item.2.title'),
      figure: 7965309,
      unit: '',
    },
    {
      name: t('home.banner.item.3.title'),
      figure: 8865700,
      unit: '',
    },
  ];
  // 22.11.02 수정 end: 다국어 적용

  const onToggle = (e: any) => {
    setIsOpen(!isOpen);
  };

  const onClickBtn = (e: any, selected: number) => {
    growthSwiper.current.slideTo(selected, 0, false);
    setSelectedIndex(selected);
  };

  // swiper 옵션 셋팅 값
  const swiperSetOptions: SwiperOptions = {
    slidesPerView: 1,
    speed: 1000,
    threshold: 10,
    modules: [Navigation],
    navigation: {
      prevEl: prevRef.current, // 이전 버튼
      nextEl: nextRef.current, // 다음 버튼
    },
    spaceBetween: 0,
    // observeParents: true,
  };

  const swiperSetEvents: any = {
    onInit: (swiper: SwiperCore) => {
      growthSwiper.current = swiper;
    },
    onSlideChangeTransitionStart: (swiper: any) => {
      // console.log(swiper.activeIndex);
      setSelectedIndex(swiper.activeIndex);
    },
    onBeforeInit: (swiper: any) => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    },
  };

  return (
    <div className={cn('growth-banner-wrap')}>
      <div className={cn('growth-banner-inner')}>
        <ul className={cn('growth-list')}>
          {BannerData.map((item, idx) => {
            return (
              <BannerButton
                name={item.name}
                figure={item.figure}
                unit={item.unit}
                active={isOpen}
                selected={isOpen && selectedIndex === idx}
                index={idx}
                key={`${item.name}-${idx}`}
                onClick={onClickBtn}
              />
            );
          })}
        </ul>
      </div>
      {isActive && (
        <>
          <button
            type="button"
            className={cn('btn-open', { active: isOpen })}
            aria-expanded={isOpen}
            aria-controls="growth-chart"
            aria-label={t('viewChartDetails', { ns: 'common' })}
            onClick={onToggle}
          >
            {isOpen ? <span>{t('close', { ns: 'common' })}</span> : <span className="a11y">{t('open', { ns: 'common' })}</span>}
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg' />
          </button>
          <div className={cn('growth-chart-wrap', { open: isOpen })} id="growth-chart">
            <div className={cn('growth-chart-inner')}>
              <button type="button" ref={prevRef} className={cn('btn-swiper', 'btn-prev')}>
                <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg' />
              </button>
              <button type="button" ref={nextRef} className={cn('btn-swiper', 'btn-next')}>
                <span className={cn('a11y')}>{t('next', { ns: 'common' })}</span>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg' />
              </button>
              <Swiper {...swiperSetOptions} {...swiperSetEvents}>
                <SwiperSlide>
                  <div className={cn('growth-chart')}>
                    <StackLineChart data={stackChartDarkDefaultData} category={['Total', 'WONDER', 'PATRON', 'Top3', 'etc']} />
                    <span>{t('home.banner.item.0.caption')}</span>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={cn('growth-chart')}>
                    <StackLineChart data={stackChartDarkDefaultData} category={['Total Volume', 'LUS264', 'Tangled', 'Top3', 'etc']} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={cn('growth-chart')}>
                    <StackLineChart data={stackChartDarkDefaultData} category={['Total Transaction', 'DAO', 'Marketplace', 'Life(Dapp)']} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={cn('growth-chart')}>
                    <StackLineChart data={stackChartDarkDefaultData} category={['Total Number of Profile Creations']} />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const BannerButton: React.FC<BannerButtonProps> = ({ name, figure, unit, active, index, selected, onClick }) => {
  // const [customTag, setCustomTag] = useState<string>('span');
  // let CustomTag: keyof JSX.IntrinsicElements;
  // useEffect(() => {
  //   if (active) {
  //     setCustomTag('button');
  //   } else {
  //     setCustomTag('span');
  //   }
  // }, [active, customTag]);

  // CustomTag = customTag as keyof JSX.IntrinsicElements;

  return (
    <li>
      <button className={cn('growth-box', { selected })} disabled={!active} onClick={(e) => active && onClick(e, index)}>
        <span className={cn('figure')}>
          <span className={cn('unit')}>{unit}</span>
          <CountUp start={0} end={figure} separator="," decimals={0} duration={2}>
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start}>
                <span className={cn('num')} ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
        </span>
        <span className={cn('info-name')}>{name}</span>
      </button>
    </li>
  );
};

export default GrowthBanner;
/* 22.10.24 수정 end: GrowthBanner 전체 수정 */
