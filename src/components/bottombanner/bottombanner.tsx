import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import lottie from 'lottie-web';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import lottieLusAuction from '@/assets/lottie/lottie_lus_auction.json';
import { ReactSVG } from 'react-svg';
import useMediaQuery from '@/hook/useMediaQuery';

type GrowthDataType = {
  text?: string;
  value?: number;
  format?: string;
};

type SaleDataType = {
  status?: string;
  text?: string;
  buttonText?: string;
  url?: string;
};

type BottomBannerProps = {
  // TODO: type 수정 필요
  growthDataList?: GrowthDataType[];
  saleDataList?: SaleDataType[];
};

export const BottomBanner = ({ growthDataList, saleDataList }: BottomBannerProps) => {
  const { t } = useTranslation('common');
  const lottieContainer = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const swiperEvt = useRef<any>();

  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: lottieContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieLusAuction,
    });

    return () => lottieLoad.destroy();
  }, [lottieContainer]);

  const showLottie = useMemo(() => {
    return selectedIndex > (growthDataList?.length ?? 0) + 1;
  }, [selectedIndex]);

  return (
    <div className={cn('bottom-banner-wrap')}>
      <div className={cn('bottom-banner-inner')}>
        <div ref={lottieContainer} className={cn('lottie')} style={{ display: showLottie ? 'block' : 'none' }} />
        <div className={cn('content', 'only-one')}>
          <Swiper
            direction={'vertical'}
            modules={[Autoplay]}
            loop={true}
            className="my-swiper"
            autoplay={{
              delay: 5000,
            }}
            onInit={(swiper) => {
              swiperEvt.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setSelectedIndex(swiper.realIndex);
            }}
            allowTouchMove={false}
          >
            <SwiperSlide>
              <div className={cn('status', 'default')}>
                <span>WEMIX Mainnet</span>
                <span>1 WEMIX$ = 0.99 WEMIX</span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cn('status')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_question.svg" />
                {!isMobile && <span className={cn('guide-title')}>GUIDE</span>}
              </div>
              <>
                <span className={cn('guide description')}>{t(`bottomBanner.guide${isMobile ? 'Mo' : ''}`)}</span>
                <Button href="https://docs.wemix.com/v/nile-en/guides/marketplace">{t(`goToGuide`)}</Button>
              </>
            </SwiperSlide>
            {growthDataList &&
              growthDataList?.map((item) => (
                <SwiperSlide key={item.text}>
                  <div className={cn('status', 'default')}>
                    <span>{item?.text}</span>
                    <span className={cn('description')}>
                      {item?.format}
                      {item?.value?.toLocaleString()}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            {saleDataList &&
              saleDataList?.map((item, index) => {
                return (
                  <SwiperSlide key={item.text + '-' + index} style={{ overflow: 'hidden' }}>
                    <div className={cn('status', 'live')}>{!isMobile && <span>{item?.status}</span>}</div>
                    <span className={cn('description')}>{item?.text}</span>
                    <Button href={item?.url}>{item?.buttonText}</Button>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

interface buttonProps {
  href?: string | undefined;
  children?: ReactNode;
}

const Button = ({ href, children }: buttonProps) => {
  return (
    <div className={cn('button-wrap')}>
      {href !== undefined ? (
        <Link href={href}>
          <a>
            <span>{children}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
          </a>
        </Link>
      ) : (
        <button>
          <span>{children}</span>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
      )}
    </div>
  );
};
