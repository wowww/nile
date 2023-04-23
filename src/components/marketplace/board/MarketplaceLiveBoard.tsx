import cn from 'classnames';
import React, { HTMLAttributeAnchorTarget, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import lottie from 'lottie-web';
import lottieLusAuction from '@/assets/lottie/lottie_lus_auction.json';
import axios from 'axios';
import { Autoplay } from 'swiper';
import { NileApiService } from '@/services/nile/api';
/* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';
import dayjs from 'dayjs';
import { isTablet } from 'react-device-detect';

interface buttonProps {
  href?: string | undefined;
  children?: ReactNode;
  target?: HTMLAttributeAnchorTarget | undefined;
}

const Button = ({ href, children, target }: buttonProps) => {
  return (
    <div className={cn('button-wrap')}>
      {href !== undefined ? (
        <Link href={href} passHref>
          <a target={target}>
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

interface Props {
  active?: boolean;
}

const MarketplaceLiveBoard = ({ active }: Props) => {
  const { t } = useTranslation('common');
  /* 23.03.23 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  const lottieContainer = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const swiperEvt = useRef<any>();

  const kariOpenDate = dayjs.utc(process.env.NEXT_PUBLIC_ENV_NFT_KARI_START_DATE).tz('Asia/Seoul').format();
  const tangledOpenDate = dayjs.utc(process.env.NEXT_PUBLIC_ENV_NFT_TANGLED_START_DATE).tz('Asia/Seoul').format();
  const now = dayjs().tz('Asia/Seoul').format();

  const [marketcapData, setMarketcapData] = useState<any>();
  const [wemixUSDCPrice, setWemixUSDCPrice] = useState('');
  const [activities, setActivities] = useState<any[]>();

  const { marketplace } = NileApiService();

  // @ts-ignore
  const formatOption = {
    roundingMode: 'floor',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  };

  const wemixDollarWemixPrice = useMemo(() => {
    if (marketcapData) {
      const {
        quote: { USD },
      } = marketcapData;

      const price = 1 / USD.price;

      return new Intl.NumberFormat(undefined, formatOption).format(price);
    }

    return '';
  }, [marketcapData]);

  const fetchMarketcap = useCallback(() => {
    axios.get('/api/marketcap').then(({ data }) => {
      if (data.WEMIX) {
        setMarketcapData(data.WEMIX[0]);
      }
    });
  }, []);

  const fetchWemixDollarPrice = useCallback(() => {
    // axios.get('/api/wemixDollar').then(({ data }) => {
    //   setWemixUSDCPrice(new Intl.NumberFormat(undefined, formatOption).format(Number(data.price)));
    // });
  }, []);

  const fetchActivity = useCallback(() => {
    marketplace.activity.getLiveList().then(({ data }) => {
      setActivities(data.results);
    });
  }, []);

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
    return selectedIndex > (activities?.length ?? 0) + 1;
  }, [selectedIndex]);

  useEffect(() => {
    fetchWemixDollarPrice();
    fetchMarketcap();
    fetchActivity();
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      fetchWemixDollarPrice();
      fetchMarketcap();
    }, 1000 * 60);
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

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
              <div className={cn('status', 'index wonder')}>
                {!isMobile && <span className={cn('status-tag')}>DAO</span>}
                <span className={cn('status-desc')}>
                  {dayjs().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm') <=
                    dayjs.utc(process.env.NEXT_PUBLIC_ENV_DAO_WONDER_START_DATE).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm') ? (
                  t(`bottomBanner.wonderDaoPreview${isMobile || isTablet ? 'Mo' : ''}`))
                    : (
                      t(`bottomBanner.wonderDaoStart`)
                    )}
                </span>
              </div>
              <Button href="/dao/wonder/station" target="_blank">
                {t('goToBtn2', { ns: 'common', name: 'Station' })}
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cn('status')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_question.svg" />
                {!isMobile && <span className={cn('guide-title', 'status-tag')}>GUIDE</span>}
              </div>
              <>
                <span className={cn('guide description')}>{t(`bottomBanner.guide${isMobile ? 'Mo' : ''}`)}</span>
                <Button href="https://docs.wemix.com/v/nile-en/guides/marketplace" target="_blank">
                  {t(`goToGuide`)}
                </Button>
              </>
            </SwiperSlide>
            {wemixDollarWemixPrice && (
              <SwiperSlide>
                <div className={cn('status', 'default')}>
                  <span className={cn('status-tag')}>WEMIX Mainnet</span>
                  <span className={cn('status-desc')}>1 WEMIX$ = {wemixDollarWemixPrice} WEMIX</span>
                </div>
              </SwiperSlide>
            )}
            <SwiperSlide>
              <div className={cn('status', 'index')}>
                {!isMobile && <span className={cn('status-tag')}>Story3.0</span>}
                <span className={cn('status-desc')}>{t(`bottomBanner.story${isMobile ? 'Mo' : ''}`, { n: '#6' })}</span>
              </div>
              <Button href="/nile/storydetail6" target="_self">
                {t('discoverStory')}
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <div className={cn('status', 'index')}>
                {!isMobile && <span className={cn('status-tag')}>DAO Showcase</span>}
                {/* 23.03.12 수정: 모바일 케이스 추가 */}
                <span className={cn('status-desc')}>{t(`bottomBanner.showcase${isMobile ? 'Mo' : ''}`)}</span>
              </div>
              {/* TODO: 링크 변경 */}
              <Button href="/dao/wonder/station" target="_self">
                {t('goToBtn', { name: 'Station' })}
              </Button>
            </SwiperSlide>

            {/* 23.03.11 수정: city of nile 오픈 라이브 인폼바 추가 */}
            {/* TODO: city of nile 오픈시 적용 필요 case */}
            {/*<SwiperSlide>*/}
            {/*  <div className={cn('status', 'index')}>*/}
            {/*    {!isMobile && <span className={cn('status-tag')}>City of NILE</span>}*/}
            {/*    <span className={cn('status-desc')}>{t(`bottomBanner.cityOfNileOpen${isMobile < 768 ? 'Mo' : ''}`, { collection: 'City of NEITH' })}</span>*/}
            {/*  </div>*/}
            {/*  <Button href="/life/cone" target="_self">*/}
            {/*    {t('goToBtn', { name: 'City of NILE' })}*/}
            {/*  </Button>*/}
            {/*</SwiperSlide>*/}

            {/*/!* 23.03.12 수정: TODO: NEITH NFT 프리뷰 오픈시 적용 *!/*/}
            {/*<SwiperSlide>*/}
            {/*  <div className={cn('status', 'live')}>*/}
            {/*    {!isMobile && <span className={cn('status-tag')}>On Sale</span>}*/}
            {/*    <span className={cn('status-desc')}>*/}
            {/*      {t(`bottomBanner.neithPreview${isMobile ? 'Mo' : ''}`, { collection: 'City of NEITH', tier: 'Civic' })}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  /!* TODO: 콜렉션 링크 적용 필요 *!/*/}
            {/*  <Button href="/" target="_self">*/}
            {/* 23.03.14 수정 start: NEITH NFT에서는 goToCollectible 사용 */}
            {/*    {t('goToCollectible')}*/}
            {/*  </Button>*/}
            {/*</SwiperSlide>*/}

            {/*<SwiperSlide>*/}
            {/*  <div className={cn('status', 'live')}>*/}
            {/*    {!isMobile && <span className={cn('status-tag')}>On Auction</span>}*/}
            {/*    <span className={cn('status-desc')}>*/}
            {/*      {t(`bottomBanner.neithPreview${isMobile ? 'Mo' : ''}`, { collection: 'City of NEITH', tier: 'Rare' })}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  /!* TODO: 콜렉션 링크 적용 필요 *!/*/}
            {/* 23.03.14 수정 start: NEITH NFT에서는 goToCollectible 사용 */}
            {/*  <Button href="/" target="_self">*/}
            {/*    {t('goToCollectible')}*/}
            {/*  </Button>*/}
            {/*</SwiperSlide>*/}

            {/*/!* 23.03.12 수정: TODO: 마켓플레이스 오픈시 적용 *!/*/}
            {/*<SwiperSlide>*/}
            {/*  <div className={cn('status', 'live')}>*/}
            {/*    {!isMobile && <span className={cn('status-tag')}>On Sale</span>}*/}
            {/*    <span className={cn('status-desc')}>*/}
            {/*      {t(`bottomBanner.neithMarketSale${isMobile ? 'Mo' : ''}`, { collection: 'City of NEITH', tier: 'Civic' })}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  /!* TODO: 콜렉션 링크 적용 필요 *!/*/}
            {/*  <Button href="/" target="_self">*/}
            {/*    {t('viewNft')}*/}
            {/*  </Button>*/}
            {/*</SwiperSlide>*/}

            {/*<SwiperSlide>*/}
            {/*  <div className={cn('status', 'live')}>*/}
            {/*    {!isMobile && <span className={cn('status-tag')}>On Auction</span>}*/}
            {/*    <span className={cn('status-desc')}>*/}
            {/*      {t(`bottomBanner.neithMarketSale${isMobile ? 'Mo' : ''}`, { collection: 'City of NEITH', tier: 'Rare' })}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  /!* TODO: 콜렉션 링크 적용 필요 *!/*/}
            {/*  <Button href="/" target="_self">*/}
            {/*    {t('viewNft')}*/}
            {/*  </Button>*/}
            {/*</SwiperSlide>*/}
            {/* TODO: city of nile 오픈시 적용 필요 case */}
            {/*<SwiperSlide>*/}
            {/*  <div className={cn('status', 'index')}>*/}
            {/*    {!isMobile && <span className={cn('status-tag')}>City of NILE</span>}*/}
            {/*    <span className={cn('status-desc')}>{t(`bottomBanner.cityOfNileOpen${isMobile < 768 ? 'Mo' : ''}`, { collection: 'City of Nile' })}</span>*/}
            {/*  </div>*/}
            {/*  <Button href="/life/cone" target="_self">*/}
            {/*    {t('goToBtn', { name: 'City of NILE' })}*/}
            {/*  </Button>*/}
            {/*</SwiperSlide>*/}

            {/* 23.03.24 수정: kari 오픈 라이브 인폼바 추가 TODO: kari 오픈시 적용 필요 case */}
            <SwiperSlide>
              <div className={cn('status', 'index')}>
                {!isMobile && <span className={cn('status-tag')}>Kari</span>}
                <span className={cn('status-desc')}>{t(`bottomBanner.cityOfNileOpen2${isMobile ? 'Mo' : ''}`, { collection: 'Kari' })}</span>
              </div>
              <Button href="/life/kari" target="_self">
                {t('goToBtn', { name: 'Kari' })}
              </Button>
            </SwiperSlide>
            {/* 23.03.24 수정: kari TODO: 컬렉션 프리뷰 오픈시 적용 */}

            {now >= kariOpenDate ? (
              <SwiperSlide>
                <div className={cn('status', 'live')}>
                  {!isMobile && <span className={cn('status-tag')}>On Sale</span>}
                  <span className={cn('status-desc')}>{t(`bottomBanner.saleCollection${isMobile ? 'Mo' : ''}`, { collection: 'Kari' })}</span>
                </div>
                {/* TODO: 콜렉션 링크 적용 필요 */}
                <Button href="/marketplace/KARI" target="_self">
                  {t('viewNft')}
                </Button>
              </SwiperSlide>
            ) : (
              <SwiperSlide>
                <div className={cn('status', 'live')}>
                  {!isMobile && <span className={cn('status-tag')}>On Sale</span>}
                  <span className={cn('status-desc')}>{t(`bottomBanner.collectionPreview${isMobile ? 'Mo' : ''}`, { collection: 'Kari' })}</span>
                </div>
                {/* TODO: 콜렉션 링크 적용 필요 */}
                <Button href="/marketplace/KARI" target="_self">
                  {t('goToCollection')}
                </Button>
              </SwiperSlide>
            )}
            {now >= tangledOpenDate ? (
              <SwiperSlide>
                <div className={cn('status', 'live')}>
                  {!isMobile && <span className={cn('status-tag')}>On Sale</span>}
                  <span className={cn('status-desc')}>
                    {t(`bottomBanner.saleCollection${isMobile ? 'Mo' : ''}`, { collection: 'Tangled Timepieces' })}
                  </span>
                </div>
                {/* TODO: 콜렉션 링크 적용 필요 */}
                <Button href="/" target="_self">
                  {t('viewNft')}
                </Button>
              </SwiperSlide>
            ) : (
              <SwiperSlide>
                <div className={cn('status', 'index')}>
                  {!isMobile && <span className={cn('status-tag')}>Tangled Timepieces</span>}
                  <span className={cn('status-desc')}>
                    {t(`bottomBanner.cityOfNileOpen${isMobile ? 'Mo' : ''}`, { collection: 'Tangled Timepieces' })}
                  </span>
                </div>
                <Button href="/life/tangled" target="_self">
                  {t('goToBtn', { name: 'Tangled Timepieces' })}
                </Button>
              </SwiperSlide>
            )}
            {/* 23.03.21 수정: tangled TODO: 컬렉션 프리뷰 오픈시 적용 */}
            <SwiperSlide>
              <div className={cn('status', 'live')}>
                {!isMobile && <span className={cn('status-tag')}>On Sale</span>}
                <span className={cn('status-desc')}>
                  {t(`bottomBanner.collectionPreview${isMobile ? 'Mo' : ''}`, { collection: 'Tangled Timepieces' })}
                </span>
              </div>
              {/* TODO: 콜렉션 링크 적용 필요 */}
              <Button href="/" target="_self">
                {t('goToCollection')}
              </Button>
            </SwiperSlide>
            {/* 23.03.21 수정: tangled TODO: 거래 발생 시 적용 (lottie 적용 필요 !!) */}
            <SwiperSlide>
              <div className={cn('status', 'live')}>
                {!isMobile && <span className={cn('status-tag')}>On Sale</span>}
                <span className={cn('status-desc')}>
                  {t(`bottomBanner.fixedBid${isMobile ? 'Mo' : ''}`, {
                    nft: 'Tangled Timepiece Luxury #1',
                    price: 400,
                    unit: 'WEMIX$',
                  })}
                </span>
              </div>
              {/* TODO: 콜렉션 링크 적용 필요 */}
              <Button href="/" target="_self">
                {t('viewNft')}
              </Button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

MarketplaceLiveBoard.defaultProps = {
  active: false,
};

export default MarketplaceLiveBoard;
