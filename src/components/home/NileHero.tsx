import { HTMLAttributeAnchorTarget, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { TFunction, useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { NileCDNLoader } from '@utils/image/loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { daoThemeAtom } from '@/state/daoAtom';
import NileHeroModal from '@components/modal/NileHeroModal';
import NileHeroVideoItem from '@components/home/NileHeroVideoItem';
import NileHeroItem from '@components/home/NileHeroItem';
import NileHomeShowcaseItem from './NileHomeShowcaseItem';
import { useSetAtom } from 'jotai';
import { useInView } from 'react-intersection-observer';
import { useLayoutResize } from '@utils/layout';
/* 23.04.12 수정: useMediaQuery 추가 */
import { ReactSVG } from 'react-svg';
import BgButton from '../button/BgButton';

export const NileHero = () => {
  const { t } = useTranslation(['nile', 'common']);
  const setActiveDao = useSetAtom(daoThemeAtom);

  const { ref: inViewRef, inView } = useInView({ threshold: 1 });
  // /* 23.04.18 수정: swiperActiveIndex state 추가 */
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);
  const swiperRef = useRef<any>();
  /* 23.04.13 수정: 인디케이터 인터랙션 추가 */
  const swiperTime = 2.5;
  const { isMobile } = useLayoutResize();

  const [isModalDaoStation, setModalDaoStation] = useState(false);

  useEffect(() => {
    if (isMobile) {
      swiperRef.current.autoplay.start();
    } else {
      if (inView) {
        swiperRef.current.autoplay.start();
      } else {
        swiperRef.current.autoplay.stop();
      }
    }
  }, [inView]);

  const bagc = useMemo(
    () => ({
      linkUrl: '/life/bagc',
      imgUrl: '/assets/images/img/img_main_hero_bagc.png',
      name: 'BAGC',
      desc: t('home.hero.bagc.desc'),
    }),
    [t],
  );

  const snkrz = useMemo(
    () => ({
      /* 23.04.19 수정: linkUrl 수정 */
      linkUrl: '/marketplace/SNKRZ',
      imgUrl: '/assets/images/img/img_main_hero_snkz2.png',
      name: 'SNKR2',
      desc: t('home.hero.snkrz.0.desc'),
    }),
    [t],
  );

  const cora = useMemo(
    () => ({
      linkUrl: '/marketplace/CORA',
      imgUrl: '/assets/images/img/img_main_hero_cora.png',
      name: 'City of RA',
      desc: t('home.hero.cora.0.desc'),
    }),
    [t],
  );

  const kari = useMemo(
    () => ({
      linkUrl: '/life/kari',
      imgUrl: '/assets/images/img/img_main_hero_kari.png',
      name: 'Kari ',
      desc: t('home.hero.kari.0.desc'),
    }),
    [t],
  );

  const tangled = useMemo(
    () => ({
      linkUrl: '/life/ttps',
      imgUrl: '/assets/images/img/img_main_hero_ttps2.png',
      name: 'Tangled',
      desc: t('home.hero.tangledTimepieces.0.desc'),
    }),
    [t],
  );

  const cone = useMemo(
    () => ({
      linkUrl: '/life/cone',
      imgUrl: '/assets/images/img/img_main_hero_con.jpg',
      name: 'City of NILE',
      desc: t('home.hero.con.0.desc'),
    }),
    [t],
  );

  const neith = useMemo(
    () => ({
      linkUrl: '/neith-station',
      imgUrl: '/assets/images/img/img_main_hero_neith.jpg',
      name: 'NEITH Station',
      desc: t('home.hero.neith.0.desc'),
    }),
    [t],
  );
  const wemixGolf = useMemo(
    () => ({
      linkUrl: 'https://wemix.golf.sbs.co.kr',
      imgUrl: '/assets/images/img/img_main_hero_wemix_champion.png',
      name: 'WEMIX CHAMPIONSHIP',
      desc: t('home.banner.wemixChampionship.desc'),
    }),
    [t],
  );

  const buttonText: {
    text: TFunction | string;
    link: string;
    target: HTMLAttributeAnchorTarget | undefined;
  }[] = [
    // {
    //   text: t('goToBtn', { ns: 'common', name: 'Tangled' }),
    //   link: '/life/ttps',
    //   target: '_self',
    // },
    {
      text: t('goToBtn', { ns: 'common', name: 'Station' }),
      link: '/dao/wonder/station',
      target: '_blank',
    },
    {
      text: t('goToBtn', { ns: 'common', name: 'SNKR2' }),
      link: '/marketplace/SNKRZ',
      target: '_self',
    },
    {
      text: t('goToBtn', { ns: 'common', name: 'BAGC' }),
      link: '/life/bagc',
      target: '_self',
    },
    {
      text: 'WEMIX CHAMPIONSHIP',
      link: 'https://wemix.golf.sbs.co.kr',
      target: '_blank',
    },
    {
      text: t('home.hero.btnDao'),
      link: '/dao',
      target: '_self',
    },
    // {
    //   name: t('goToBtn', { ns: 'common', name: 'CIty of RA' }),
    //   link: '/marketplace/CORA',
    // },
    // {
    //   name: t('goToBtn', { ns: 'common', name: 'Station' }),
    //   link: '/dao/wonder/preview',
    // },
  ];

  return (
    /* 23.04.13 수정: 인디케이터 추가 */
    <div className={cn('nile-hero')} style={{ '--swiper-time': `${swiperTime}s` } as React.CSSProperties}>
      <div className={cn('swiper-wrap')} ref={inViewRef}>
        <div className={cn('nile-hero-content')}>
          <div className={cn('text-wrap')}>
            <div className={cn('title-wrap')}>
              <h2 className={cn('title')}>
                NFT is <br className={cn('br')} />
                Life Evolution
              </h2>
              <p className={cn('desc')}>{t('home.hero.desc')}</p>
            </div>
            <BgButton
              buttonText={buttonText[swiperActiveIndex] && (buttonText[swiperActiveIndex].text as string)}
              color="black"
              size="lg"
              href={buttonText[swiperActiveIndex] && (buttonText[swiperActiveIndex].link as string)}
              target={buttonText[swiperActiveIndex] && buttonText[swiperActiveIndex].target}
            />
          </div>
          <Swiper
            className="nile-hero-swiper"
            modules={[Pagination, Navigation, Autoplay]}
            loop={true}
            autoplay={{
              delay: swiperTime * 1000,
              disableOnInteraction: false,
            }}
            allowTouchMove={true}
            slidesPerView={1}
            pagination={{
              el: '.hero-slide-pagination',
              clickable: true,
            }}
            navigation={{
              prevEl: '.hero-btn-prev',
              nextEl: '.hero-btn-next',
            }}
            onInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setSwiperActiveIndex(swiper.realIndex);
            }}
          >
            {/* 23.04.04 수정: Cora 추가 */}
            {/*<SwiperSlide>*/}
            {/*  <NileHeroItem className="tangled" link={tangled.linkUrl} imgUrl={tangled.imgUrl} name={tangled.name} desc={tangled.desc} neithBadge />*/}
            {/*</SwiperSlide>*/}

            {NileHomeShowcaseItem.map((el) => {
              return (
                <SwiperSlide key={el.name}>
                  {/* 23.04.07 수정: wonder dao 오픈 추가 */}

                  <div className={cn('nile-hero-item', 'dao')} onClick={() => setActiveDao({ value: el.type })}>
                    <Link href={el.linkUrl}>
                      <a
                        target="_blank"
                        className={cn('item-wrap')}
                        onClick={() => {
                          setActiveDao({ value: el.type });
                        }}
                      >
                        <div className={cn('contents-wrap')}>
                          <div className={cn('img-wrap')}>
                            <Image src={el.imgUrl} alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} priority />
                          </div>
                          <div className={cn('info-wrap', el.desc && 'desc')}>
                            <p className={cn('info-title')}>{el.name}</p>
                            <div className={cn('info-bottom')}>
                              {el.date ? (
                                <dl className={cn('period-info')}>
                                  <dt>{t('home.hero.recruitingPeriod')}</dt>
                                  <dd>{el.date}</dd>
                                </dl>
                              ) : (
                                <span className={cn('info-desc')}>{t(`${el.desc}`)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
            <SwiperSlide>
              <NileHeroItem className="snkrz" link={snkrz.linkUrl} imgUrl={snkrz.imgUrl} name={snkrz.name} desc={snkrz.desc} />
            </SwiperSlide>
            <SwiperSlide>
              <NileHeroItem className="bagc" link={bagc.linkUrl} imgUrl={bagc.imgUrl} name={bagc.name} desc={bagc.desc} neithBadge />
            </SwiperSlide>
            <SwiperSlide>
              <NileHeroItem
                className="wemix-champion"
                link={wemixGolf.linkUrl}
                imgUrl={wemixGolf.imgUrl}
                name={wemixGolf.name}
                desc={wemixGolf.desc}
                targetBlank
                neithBadge
              />
            </SwiperSlide>
            <SwiperSlide>
              <div className={cn('nile-hero-item', 'dao')}>
                <NileHeroVideoItem
                  mainTitle="DAO Showcase"
                  menuName="Introducing DAO"
                  desc={t('eventPopup.showcase.desc', { ns: 'common' })}
                  onClick={() => setModalDaoStation(true)}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={cn('slide-bottom')}>
          <div className={cn('btn-wrap')}>
            <button type="button" className={cn('btn-swiper', 'hero-btn-prev')}>
              <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
            </button>
            <div className={cn('hero-slide-pagination')} />
            <button type="button" className={cn('btn-swiper', 'hero-btn-next')}>
              <span className={cn('a11y')}>{t('next', { ns: 'common' })}</span>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
            </button>
          </div>
        </div>
      </div>
      <NileHeroModal isOpen={isModalDaoStation} setIsOpen={setModalDaoStation} youtubeId="cwn_lcbk7ds" />
    </div>
  );
};
