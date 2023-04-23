/* 23.04.04 수정: useEffect 추가 */
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { ReactSVG } from 'react-svg';

import cn from 'classnames';
import { NileCDNLoader } from '@utils/image/loader';
/* 23.04.04 수정: useAtom, conTypeAtom 추가 */
import { useAtom } from 'jotai';
import { conTypeAtom } from '@/state/daoAtom';
import getCollections from '@/components/neithstation/collectionsData';

interface CitiesType {
  name: string;
  covenant: CityCovenantProps;
}

interface CityCovenantProps {
  covenant: string;
  minValue: number;
  maxValue: number;
}

const ConCities = () => {
  const { t } = useTranslation('life');

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  /* 23.04.12 수정: collections 데이터 변수로 선언 */

  const collections = getCollections(t);
  const cities: CitiesType[] = [
    {
      name: 'neith',
      covenant: {
        /* 23.04.12 수정: 데이터 타입 단언 추가 */
        covenant: collections.neith.covenantDate as string,
        minValue: 100,
        maxValue: 100000,
      },
    },
    {
      name: 'ra',
      covenant: {
        /* 23.04.12 수정: 데이터 타입 단언 추가 */
        covenant: collections.cora.covenantDate as string,
        minValue: 100,
        maxValue: 100000,
      },
    },
    {
      name: 'shu',
      covenant: {
        covenant: '2024-03-16',
        minValue: 300,
        maxValue: 120000,
      },
    },
    {
      name: 'tefnut',
      covenant: {
        covenant: '2024-03-16',
        minValue: 300,
        maxValue: 120000,
      },
    },
    {
      name: 'geb',
      covenant: {
        covenant: '2024-03-16',
        minValue: 300,
        maxValue: 120000,
      },
    },
  ];

  /* 23.04.04 수정: limit 2로 수정 */
  const limit: number = 2; // 현재 오픈된 도시 개수 설정
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [cityName, setCityName] = useState<string>(t(`con.nft.cities.list.0`));
  const [cityProperty, setCityProperty] = useState<string>(t(`con.nft.cities.props.0`));
  const [covenant, setCovenant] = useState<string>(cities[0].covenant.covenant);
  const [min, setMin] = useState<number>(cities[0].covenant.minValue);
  const [max, setMax] = useState<number>(cities[0].covenant.maxValue);
  /* 23.04.04 수정: useAtom 추가 */
  const [_, setActiveDao] = useAtom(conTypeAtom);

  /* 23.04.04 수정 start: atom 업데이트 함수, navigation init 함수 추가 */
  const initSlideNextDisabled = (): void => {
    nextRef.current!.classList.add('disabled');
  };

  const updateConType = (n: number) => {
    if (n === 0) setActiveDao('cone');
    if (n === 1) setActiveDao('cora');
  };

  /* 23.04.04 수정 end: atom 업데이트 함수, navigation init 함수 추가 */

  const setDatas = (n: number) => {
    setCityName(t(`con.nft.cities.list.${n}`));
    setCityProperty(t(`con.nft.cities.props.${n}`));
    setMin(cities[n].covenant.minValue);
    setMax(cities[n].covenant.maxValue);
    setCovenant(cities[n].covenant.covenant);
    setActiveIndex(n);
    /* 23.04.04 수정: updateConType 추가 */
    updateConType(n);
    /* 23.04.04 수정: init후 navigation next disabled 클래스 삭제 */
    if (nextRef.current) nextRef.current!.classList.remove('disabled');
  };

  /* 23.04.04 수정: useEffect 추가 */
  useEffect(() => {
    initSlideNextDisabled();
  }, []);

  return (
    <div className={cn('life-con-cities-wrap')}>
      <Swiper
        /* 23.04.04 수정: initialSlide 추가 */
        initialSlide={activeIndex}
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={10}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        allowSlideNext={activeIndex < limit - 1}
        /* 23.04.04 수정: allowSlidePrev 삭제 */
        allowTouchMove={activeIndex < limit - 1}
        centeredSlides={true}
        height={284}
        onSlideChange={(swiper: SwiperCore) => {
          setDatas(swiper.activeIndex);
        }}
        /* 23.04.04 수정: onInit 삭제 */
        breakpoints={{
          320: {
            slidesPerView: 3.3,
            spaceBetween: 12,
          },
          360: {
            slidesPerView: 3.3,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
      >
        {/* 23.04.04 start: swiper 이미지 데이터 수정 */}
        {[...cities.map((c) => c.name).slice(0, limit), 'ank', 'ank'].map((v: string, i: number) => {
          return (
            <SwiperSlide key={`slide-item${i}`}>
              <span className={cn('symbol')}>
                <Image src={`/assets/images/img/img_symbol_life_con_${v}.png`} alt="" width="120px" height="120px" loader={NileCDNLoader} />
              </span>
            </SwiperSlide>
          );
          {
            /* 23.04.04 end: swiper 이미지 데이터 수정 */
          }
        })}
      </Swiper>
      <div className={cn('swiper-button-wrap')}>
        <button type="button" ref={prevRef} className={cn('btn-swiper', 'btn-prev')}>
          <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
        {/* 23.04.04 수정: swiper-button-disabled 클래스 삭제 */}
        <button type="button" ref={nextRef} className={cn('btn-swiper', 'btn-next', { 'swiper-button-disabled': activeIndex >= limit - 1 })}>
          <span className={cn('a11y')}>{t('next', { ns: 'common' })}</span>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
      </div>
      <div className={cn('city-information')}>
        <div className={cn('city')}>
          <strong className={cn('name')}>{cityName}</strong>
          {/* 23.04.05 수정: 다국어 버튼 클릭시 바로 반영 안되는 이슈로 인해 property 텍스트 불러오는 방식 수정 */}
          <span className={cn('property')}>{t(`con.nft.cities.props.${activeIndex}`)}</span>
        </div>
        <dl className={cn('city-covenant')}>
          <div className={cn('def-items')}>
            <dt>{t(`con.nft.cities.covenant`)}</dt>
            <dd>{covenant}</dd>
          </div>
          <div className={cn('def-items')}>
            <dt>{t(`con.nft.cities.neith`)}</dt>
            <dd>
              {min.toLocaleString()}
              <span className={cn('unit')}>~</span>
              {max.toLocaleString()}
              <span className={cn('unit')}>WEMIX</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export { ConCities };
