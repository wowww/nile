import { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { ReactSVG } from 'react-svg';
import RecentlySoldCard from './RecentlySoldCard';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import { NileApiService } from '@/services/nile/api';
import { useLayoutResize } from '@utils/layout';
import { useTranslation } from 'next-i18next';

const RecentlySlide = () => {
  const { t } = useTranslation('common');
  const api = NileApiService();

  const swiperSold = useRef<any>();
  const recentlySlideNavigationPrevRef = useRef(null);
  const recentlySlideNavigationNextRef = useRef(null);

  const [recentlySoldList, setRecentlySoldList] = useState<NileNftToken[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isDesktop } = useLayoutResize();

  useEffect(() => {
    api.marketplace.nft
      .getRecentlySoldList()
      .then(({ data }) => setRecentlySoldList(data.results))
      .catch(() => {
        return null;
      });
  }, []);

  const swiperView = useMemo(() => {
    return isDesktop ? 3 : 5;
  }, [isDesktop]);

  const totalPage = useMemo(() => {
    return Math.ceil(recentlySoldList.length / swiperView);
  }, [recentlySoldList, swiperView]);

  const customList = useMemo(() => {
    const newList = Array.from({ length: Math.ceil(recentlySoldList.length / swiperView) }, () => []) as NileNftToken[][];
    recentlySoldList.forEach((item, index) => {
      newList[Math.floor(index / swiperView)]?.push(item);
    });

    return newList;
  }, [recentlySoldList, swiperView]);

  return (
    <>
      <div className={cn('content-title', 'serif')}>
        <h2 className={cn('title-text', 'sm')}>Recently Sold</h2>
        <div className={cn('btn-wrap')}>
          <button type="button" className={cn('btn-swiper', 'btn-prev')} ref={recentlySlideNavigationPrevRef}>
            <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
          </button>
          <div className={cn('page-text')}>
            <span className={cn('now')}>{currentPage}</span>
            <span className={cn('divider')}>/</span>
            <span>{totalPage}</span>
          </div>
          <button type="button" className={cn('btn-swiper', 'btn-next')} ref={recentlySlideNavigationNextRef}>
            <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" color="black" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: recentlySlideNavigationPrevRef.current,
          nextEl: recentlySlideNavigationNextRef.current,
        }}
        slidesPerView={1}
        speed={1000}
        threshold={20}
        onInit={(swiper) => {
          swiperSold.current = swiper;
        }}
        onSlideChange={() => {
          setCurrentPage(swiperSold.current?.activeIndex + 1);
        }}
      >
        {customList.map((item, index) => (
          <SwiperSlide key={`slide${index}`}>
            <ul className={cn('recently-slide-wrap')}>
              {item.map((item, index) => (
                <RecentlySoldCard token={item} key={`recently-sold-card-${index}`} />
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default RecentlySlide;
