import Image from 'next/image';
import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { NileCDNLoader } from '@utils/image/loader';

import Tag from '@/components/tag/Tag';
import OutlineButton from '@/components/button/OutlineButton';
import TimeList from '@/components/list/TimeList';
import Link from 'next/link';

const MarketplaceHeroBanner = () => {
  const { t } = useTranslation(['marketplace', 'common']);

  const swiperTime = 7;

  const bannerData = [
    /**
     * ongoing: 오픈 여부 (true: 오픈후, 옥션 시작후 / false : upcoming)
     * bidding: 비딩 여부
     * fixedSale: 고정가 판매 여부
     * figma: https://www.figma.com/file/iqtsbjQOosw9SisdkpkpJI/%5B%ED%8D%BC%EB%B8%94%EB%A6%AC%EC%8B%B1%5D-NFT_%ED%8D%BC%EB%B8%94%EB%A6%AC%EC%8B%B1?node-id=3865%3A112648&t=9AtY4c8vESIeoKKQ-4
     **/
    // upcoming - A. 시간 간격을 두고 오픈하는 컬렉션
    {
      title: 'Sights of NILE (SON) Sights of NILE (SON) Sights of NILE (SON)Sights of NILE (SON) Sights of NILE (SON) Sights of NILE (SON)',
      thumbImg: '/images/bg_market_banner_nile.png',
      auctionField: {
        articleName: 'SON #2 Invitation',
        progress: t('auctionStartIn', { ns: 'common' }),
      },
      button: t('goToNFTs', { ns: 'common' }),
      article: {
        thumbImg: '/images/img_sights_of_nile_son2_448.png',
        desc: (
          <Trans
            i18nKey="hero.upcoming"
            ns="marketplace"
            values={{
              order: t('hero.textSecond'),
              name: t('hero.nile.article'),
            }}
          >
            <span></span>
            <strong className={cn('important')}></strong>
          </Trans>
        ),
      },
    },
    // upcoming - B. NFT가 동시에 오픈하는 컬렉션의 경우
    {
      title: 'Tangled',
      thumbImg: '/images/bg_market_banner_tangled_upcoming.png',
      auctionField: {
        progress: t('salesStartsIn', { ns: 'common' }),
      },
      button: t('goToNFTs', { ns: 'common' }),
      ongoing: false,
    },
    // 오픈 후_옥션 시작_비딩 발생 전
    {
      title: 'Sights of NILE (SON)',
      thumbImg: '/images/bg_market_banner_nile.png',
      auctionField: {
        status: 'On Auction',
      },
      button: t('goAuction', { ns: 'common' }),
      ongoing: true,
      article: {
        thumbImg: '/images/img_sights_of_nile_son2_448.png',
        desc: (
          <Trans
            i18nKey="hero.ongoingBeforeBidding"
            ns="marketplace"
            values={{
              name: t('hero.nile.article'),
              person: 28,
            }}
          >
            <strong className={cn('important')}></strong>
            <span></span>
          </Trans>
        ),
      },
    },
    {
      title:
        'London Underground Station(LUS) 264 Genesis London Underground Station(LUS) 264 GenesisLondon Underground Station(LUS) 264 Genesis London Underground Station(LUS) 264 Genesis',
      thumbImg: '/images/bg_market_banner_lus.png',
      auctionField: {
        status: 'On Auction',
      },
      button: t('goAuction', { ns: 'common' }),
      ongoing: true,
      article: {
        thumbImg: '/images/img_lus_canons_park40.png',
        desc: (
          <Trans
            i18nKey="hero.ongoingBeforeBidding"
            ns="marketplace"
            values={{
              name: 'LUS #40 Canons Park',
              person: 28,
            }}
          >
            <strong className={cn('important')}></strong>
            <span></span>
          </Trans>
        ),
      },
    },
    // 옥션 시작 후 - 비딩 발생 후
    {
      title: 'London Underground Station(LUS) 264 Genesis',
      thumbImg: '/images/bg_market_banner_lus.png',
      auctionField: {
        status: 'On Auction',
      },
      button: t('goAuction', { ns: 'common' }),
      ongoing: true,
      bidding: true,
      article: {
        thumbImg: '/images/img_lus_canons_park40.png',
        desc: (
          <Trans
            i18nKey="hero.ongoingAfterBidding"
            ns="marketplace"
            values={{
              name: 'LUS #40 Canons Park',
              person: t('hero.textFirst'),
            }}
          >
            <strong className={cn('important')}></strong>
            <span></span>
          </Trans>
        ),
      },
    },
    // 오픈 후_고정가 판매
    {
      title: 'Tangled',
      thumbImg: '/images/bg_market_banner_tangled.png',
      auctionField: {
        status: 'Items',
      },
      button: t('goToNFTs', { ns: 'common' }),
      ongoing: true,
      bidding: true,
      fixedSale: true,
      article: {
        thumbImg: '/images/img_tangled_luxury79.png',
        desc: (
          <Trans
            i18nKey="hero.ongoingFixed"
            ns="marketplace"
            values={{
              name: 'Tangled Timepiece Luxury 79',
              person: 28,
            }}
          >
            <strong className={cn('important')}></strong>
            <span></span>
          </Trans>
        ),
      },
    },
  ];

  return (
    <div className={cn('marketplace-hero-section')}>
      <Swiper
        className={cn('marketplace-swiper')}
        style={{ '--swiper-time': `${swiperTime}s` } as React.CSSProperties}
        slidesPerView={1}
        speed={1000}
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        touchStartPreventDefault={false}
        loop={true}
        // autoplay={{ delay: swiperTime * 1000, disableOnInteraction: false, waitForTransition: false }}
        autoplay={false}
      >
        {bannerData.map((el, index) => {
          return (
            <SwiperSlide key={`banner${index}`} className={cn('marketplace-swiper-slide')}>
              <div
                className={cn('marketplace-banner-list', {
                  upcoming: !el.ongoing,
                  ongoing: el.ongoing,
                  bidding: el.bidding,
                  'fixed-sale': el.fixedSale,
                })}
              >
                <div
                  className={cn('banner-thumb-wrap')}
                  style={{ backgroundImage: `url(https://nile.blob.core.windows.net/images${el.thumbImg})` }}
                ></div>
                <div className={cn('inner-wrap')}>
                  <div className={cn('text-wrap')}>
                    <div className={cn('top-wrap')}>
                      <div className={cn('title-wrap')}>
                        <div className={cn('title-inner')}>
                          <h2 className={cn('title')}>{el.title}</h2>
                        </div>
                      </div>
                      <OutlineButton buttonText={el.button} color="white" size="md" />
                    </div>
                    <div className={cn('bottom-wrap')}>
                      {el.ongoing ? (
                        <ul className={cn('auction-list-wrap')}>
                          <li>
                            {el.auctionField.status && <span className={cn('field')}>{el.auctionField.status}</span>}
                            <span className={cn('value')}>200</span>
                          </li>
                          <li>
                            <span className={cn('field')}>Owner</span>
                            <span className={cn('value')}>52</span>
                          </li>
                          <li>
                            <span className={cn('field')}>Owner</span>
                            <span className={cn('value')}>340</span>
                          </li>
                        </ul>
                      ) : (
                        <>
                          <p className={cn('article-progress')}>
                            {el.auctionField.articleName && <span className={cn('name')}>{el.auctionField.articleName}</span>}
                            <span className={cn('progress')}>{el.auctionField.progress}</span>
                          </p>
                          <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_LUS_START_DATE} />
                        </>
                      )}
                    </div>
                  </div>
                  {el.article != undefined ? (
                    <Link href={'/'}>
                      <div className={cn('article-wrap')}>
                        <a className={cn('article-link')}>
                          <div className={cn('thumb-wrap')}>
                            <Image src={el.article?.thumbImg} alt="" layout="responsive" width="100%" height="100%" loader={NileCDNLoader} />
                          </div>
                          <div className={cn('desc-wrap')}>
                            <div className={cn('tag-wrap')}>
                              {el.ongoing ? (
                                el.fixedSale ? (
                                  <Tag size="md-m" color="dark-gray">
                                    Buy Now
                                  </Tag>
                                ) : el.bidding ? (
                                  <Tag type="market" size="lg-m" bg>
                                    01h : 23m : 33s
                                  </Tag>
                                ) : (
                                  <Tag type="market" size="md-m" color="negative">
                                    On Auction
                                  </Tag>
                                )
                              ) : (
                                <Tag size="md-m" color="dark-gray">
                                  Upcoming
                                </Tag>
                              )}
                            </div>
                            <p className={cn('desc')}>{el.article.desc}</p>
                          </div>
                        </a>
                      </div>
                    </Link>
                  ) : (
                    <div className={cn('upcoming-tangled-wrap')}></div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MarketplaceHeroBanner;
