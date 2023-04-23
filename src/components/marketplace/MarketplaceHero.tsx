import Image from 'next/image';
import cn from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { NileCDNLoader } from '@utils/image/loader';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TimeList from '../list/TimeList';
import dayjs from 'dayjs';
import { NileApiService } from '@/services/nile/api';
import BgButton from '@components/button/BgButton';
import dynamic from 'next/dynamic';

interface InfoType {
  id: string;
  key?: string;
  value?: string;
}

interface ButtonType {
  id: string;
  text?: string;
  link?: string;
  status?: BannerStatus;
}

export enum BannerStatus {
  OPEN = 'OPEN',
  TO_BE_OPENED = 'TO_BE_OPENED',
  COMPLETE = 'COMPLETE',
}

export interface BannerInfo {
  id: string;
  subTitle?: string;
  title?: string;
  status?: BannerStatus;
  isAuction?: boolean;
  backgroundImageUrl?: string;
  bannerImageUrl?: string;
  bannerVideoUrl?: string;
  logoImageUrl?: string;
  guideText?: string;
  startAt?: string;
  buttons?: ButtonType[];
  infos?: InfoType[];
}

const MarketplaceHero = () => {
  const [tokenWemix, setTokenWemix] = useState<any>();
  const [bannerList, setBannerList] = useState<BannerInfo[]>();
  const api = NileApiService();
  const key = useRef(0);
  const [swiper, setSwiper] = useState<any>();

  useEffect(() => {
    axios.get(`/api/tokenInfoList`).then(({ data }) => {
      data.forEach((token: any) => {
        if (token.token_symbol === 'WEMIX') {
          setTokenWemix(token);
        }
      });
    });

    api.marketplace.banner
      .getList()
      .then(({ data }) => setBannerList(data.results))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   if (bannerList && swiper) {
  //     swiper.key = ++(key.current); // re-render Swiper
  //   }
  // }, [bannerList]);

  const getCurrentValue = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value * tokenWemix?.price);
    },
    [tokenWemix],
  );

  const status = useCallback(
    (banner: BannerInfo) => {
      if (banner.status === BannerStatus.COMPLETE) return BannerStatus.COMPLETE;
      if (dayjs().isAfter(dayjs.utc(banner.startAt))) return BannerStatus.OPEN;
      return BannerStatus.TO_BE_OPENED;
    },
    [bannerList],
  );

  const currentButton = useCallback(
    (banner: BannerInfo) => {
      return banner?.buttons?.find((item) => item.status === status(banner));
    },
    [status, bannerList],
  );

  const covenantValue = useCallback(
    (value?: string) => {
      if (value) {
        return getCurrentValue(Number(value.replace(/[^0-9]/g, '')));
      }
      return 0;
    },
    [getCurrentValue],
  );

  return (
    <div className={cn('marketplace-hero-section')}>
      <Swiper
        className={cn('marketplace-swiper')}
        style={{ '--swiper-time': '7s' } as React.CSSProperties}
        slidesPerView={1}
        speed={1000}
        modules={[
          //Pagination, // banner is only one
          Autoplay]}
        pagination={{
          clickable: true,
        }}
        touchStartPreventDefault={false}
        autoplay={{ delay: 7 * 1000, disableOnInteraction: false, waitForTransition: false }}
        // key={key.current}
        // onSwiper={setSwiper}
      >
        {bannerList?.map((item, index) => (
          <SwiperSlide className={cn('marketplace-swiper-slide')} key={item.id} virtualIndex={index}>
            <div className={cn('marketplace-banner', (item?.bannerImageUrl || item?.bannerVideoUrl) && 'work')} key={index}>
              <div className={cn('img-wrap')} style={{ backgroundImage: `url(https://nile.blob.core.windows.net/images${item.backgroundImageUrl})` }}>
                {(status(item) !== BannerStatus.COMPLETE || item?.bannerImageUrl || item?.bannerVideoUrl) && (
                  <span className={cn('ongoing-dim')}></span>
                )}
              </div>
              <div className={cn('content-wrap')}>
                <div className={cn('text-wrap')}>
                  <div className={cn('top-wrap')}>
                    <div className={cn('title-wrap')}>
                      <span className={cn('icon-logo-wrap')} style={{ width: '44px', height: '44px' }}>
                        <Image src={`/assets/images${item?.logoImageUrl}`} alt="" layout="fill" quality={100} loader={NileCDNLoader} />
                      </span>
                      {item?.subTitle && <span className={cn('name')}>{item.subTitle}</span>}
                      <strong className={cn('title')}>{item?.title}</strong>
                    </div>
                    {currentButton(item) && (
                      <div className={cn('button-wrap')}>
                        <BgButton buttonText={currentButton(item)?.text} href={currentButton(item)?.link} color="white" size="md" />)
                      </div>
                    )}
                  </div>
                  <div className={cn('bottom-wrap')}>
                    {status(item) !== BannerStatus.TO_BE_OPENED ? (
                      <ul className={cn('auction-list-wrap')}>
                        {item?.infos?.map((info) => (
                          <li key={info.id}>
                            <span className={cn('field')}>{info?.key}</span>
                            <span className={cn('value')}>
                              {info?.value}
                              {info?.key?.includes('Collection Covenant') && (
                                <span className={cn('wemix-value')}>(${covenantValue(info?.value)})</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <p className={cn('article-progress', item.isAuction && 'red-dot')}>{item?.guideText}</p>
                        <TimeList target={dayjs.utc(item?.startAt).toString()} />
                      </>
                    )}
                  </div>
                </div>
                <div className={cn('thumb-wrap')}>
                  {item?.bannerVideoUrl && (
                    <video autoPlay loop muted playsInline disablePictureInPicture>
                      <source src={item?.bannerVideoUrl} type="video/mp4" />
                    </video>
                  )}
                  {!item?.bannerVideoUrl && item?.bannerImageUrl && (
                    <Image src={item?.bannerImageUrl} alt="" layout="responsive" width="100%" height="100%" loader={NileCDNLoader} />
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MarketplaceHero;
