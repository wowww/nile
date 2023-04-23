import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import lottie from 'lottie-web';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import lottieLusAuction from '@/assets/lottie/lottie_lus_auction.json';
import { ReactSVG } from 'react-svg';
import useMediaQuery from '@/hook/useMediaQuery';

interface Props {
  status?: 'default' | 'guide' | 'onAuction' | 'onSale';
  text?: string;
  hasLottie?: boolean;
  auctionList?: {
    text: string;
    buttonText?: string;
    buttonUrl?: string;
  }[];
  buttonText?: string;
  buttonUrl?: string;
  target?: string;
  active?: boolean;
  statusText?: string;
  statusValue?: string;
}

const DeBottombanner: React.FC<Props> = ({
                                           status = 'default',
                                           text,
                                           hasLottie = false,
                                           auctionList,
                                           buttonText,
                                           buttonUrl = '/',
                                           active = false,
                                           statusText = '',
                                           statusValue = '',
                                         }) => {
  const { t } = useTranslation('common');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const lottieContainer = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const swiperEvt = useRef<any>();

  const lottieData = useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: lottieContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieLusAuction,
    });
  }, []);

  const Status = (statusText: string) => {
    switch (status) {
      case 'default':
        return (
          <div className={cn('status', 'default')}>
            <span>{statusText}</span>
          </div>
        );
      case 'guide':
        return (
          <div className={cn('status')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_question.svg" />
            <span>GUIDE</span>
          </div>
        );
      case 'onAuction':
        return (
          <div className={cn('status', 'live')}>
            <span>On Auction</span>
          </div>
        );
      case 'onSale':
        return (
          <div className={cn('status', 'live')}>
            <span>On Sale</span>
          </div>
        );
    }
  };
  const Contents = (statusValue: string) => {
    switch (status) {
      case 'default':
        return <span>{statusValue}</span>;
      case 'guide':
        return (
          <>
            <span>{t('bottomBanner.guide')}</span>
            <span>{t(`bottomBanner.guide${isMobile ? 'Mo' : ''}`)}</span>
            <Button buttonUrl={buttonUrl} buttonText={buttonText} />
          </>
        );
      case 'onAuction':
      case 'onSale':
        if (auctionList) {
          if (auctionList.length > 1) {
            return (
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
                {auctionList.map((item, index) => {
                  return (
                    <SwiperSlide key={item.text + '-' + index}>
                      <span>{item.text}</span>
                      <Button buttonUrl={buttonUrl} buttonText={item.buttonText} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            );
          } else if (auctionList.length === 1) {
            return (
              <>
                <span>{auctionList[0].text}</span>;
                <Button buttonUrl={buttonUrl} buttonText={buttonText} />
              </>
            );
          }
        }
        return (
          <>
            <span>{text}</span>
            <Button buttonUrl={buttonUrl} buttonText={buttonText} />
          </>
        );
    }
  };
  return (
    <div className={cn('bottom-banner-wrap', active && 'active')}>
      <div className={cn('bottom-banner-inner')}>
        {hasLottie && <div ref={lottieContainer} className={cn('lottie')}></div>}
        {Status(statusText)}
        <div className={cn('content', !auctionList && (status === 'onAuction' || status === 'guide' || status === 'onSale') ? 'only-one' : '')}>
          {Contents(statusValue)}
        </div>
      </div>
    </div>
  );
};

// 향후 이동 목적지 인자값으로
interface buttonProps {
  buttonUrl?: string | undefined;
  buttonText?: string;
}

const Button = ({ buttonUrl, buttonText }: buttonProps) => {
  return (
    <div className={cn('button-wrap')}>
      {buttonUrl !== undefined ? (
        <Link href={buttonUrl}>
          <a>
            <span>{buttonText}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
          </a>
        </Link>
      ) : (
        <button>
          <span>{buttonText}</span>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
      )}
    </div>
  );
};

export default DeBottombanner;
