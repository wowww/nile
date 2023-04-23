import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import cn from 'classnames';
import { Checkbox, Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import ModalSlideLayout from './ModalSlideLayout';
import HomeEventModalContents from '@components/modal/HomeEventModalContents';
import HomeLaunchEventModalContents from '@components/modal/HomeLaunchEventModalContents';
import { eventModalAtom } from '@/state/modalAtom';
import { useSetAtom } from 'jotai';
import NileHeroModal from '@components/modal/NileHeroModal';
import router from 'next/router';
/* 23.04.03 수정: useMediaQuery 추가 */
import useMediaQuery from '@/hook/useMediaQuery';
import { useLayoutResize } from '@utils/layout';
import dayjs from 'dayjs';

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  recentModalUpdate: string;
}

const HomeEventModal = ({ isModal, setIsModal, recentModalUpdate }: Props) => {
  const { t } = useTranslation('common');
  /* 23.04.03 수정: isMobile 추가  */
  const { isMobile, isTablet } = useLayoutResize();
  const [termsCheck, setTermsCheck] = useState<boolean>(false);
  const [isModalDaoStation, setModalDaoStation] = useState(false);

  const swiperEvt = useRef<any>();
  const setVisibleEvent = useSetAtom(eventModalAtom);
  const onModalClose = () => {
    Modal.destroyAll();
    setIsModal(false);
    if (termsCheck) {
      setVisibleEvent(recentModalUpdate); // eventModalAtom에 Modal의 최신 업데이트 날짜를 저장
    }
  };

  const onContentClick = useCallback((href = '/') => {
    onModalClose();
    /* 23.03.13 수정 start: 이벤트 수정 */
    event?.preventDefault();
    document.body.removeAttribute('style');
    router.push(href);
    /* 23.03.13 수정 end: 이벤트 수정 */
  }, []);

  return (
    <>
      <ModalSlideLayout
        maskClosable={false}
        wrapClassName={cn('home-event-modal modal-wrap')}
        isOpen={isModal}
        setIsOpen={setIsModal}
        destroyOnClose={true}
        onCancel={onModalClose}
      >
        <div className='mask-custom-wrap' onClick={() => setIsModal(false)}></div>
        <Swiper
          modules={[Pagination, Navigation]}
          className={cn('modal-slide')}
          slidesPerView={1}
          speed={1000}
          threshold={20}
          pagination={{
            el: '.modal-slide-pagination',
            clickable: true,
          }}
          navigation={{
            prevEl: '.btn-prev',
            nextEl: '.btn-next',
          }}
          onInit={(swiper) => {
            swiperEvt.current = swiper;
          }}
          onSwiper={() => {
            setTimeout(() => {
              swiperEvt.current.navigation.destroy();
              swiperEvt.current.navigation.init();
              swiperEvt.current.navigation.update();
              swiperEvt.current.pagination.destroy();
              swiperEvt.current.pagination.init();
              swiperEvt.current.pagination.update();
            });
          }}
        >
          {/*
          <SwiperSlide className={cn('modal-slide-content')}>
            <HomeLaunchEventModalContents
              logo={{
                url: 'https://nile.blob.core.windows.net/images/assets/images/img/neithCollections/img_covenant_badge.svg',
                name: 'NEITH Station',
              }}
              title={t('eventPopup.tangled2.title')}
              desc={t('eventPopup.tangled2.desc')}
              backgroundImageUrl={'https://nile.blob.core.windows.net/images/assets/images/img/img_tangled_modal.png'}
              imgDimmed
              type="dark"
              schedule={
                <>
                  <p className={cn('start-day')}>
                    <span className={cn('date')}>{t('eventPopup.tangled2.schedule.launch')}</span>
                    <span className={cn('udc')}>{t('eventPopup.tangled2.schedule.udc')}</span>
                  </p>
                </>
              }
              buttonList={[
                {
                  text: t('goToBtn', { ns: 'common', name: t('eventPopup.collection') }),
                  href: { pathname: '/marketplace/TTPS' },
                  theme: 'white',
                  size: 'md',
                  // onClick: () => onContentClick,
                },
              ]}
            />
          </SwiperSlide> */}
          <SwiperSlide className={cn('modal-slide-content')}>
            <HomeLaunchEventModalContents
              classNames='wonder-dao-lunch'
              logo={{ name: 'EVENT' }}
              title='WONDER DAO'
              desc={t('eventPopup.wonderDaoLunch.desc2')}
              schedule={
                <dl className={cn('item-wrap')}>
                  <div className={cn('items period')}>
                    <dd>
                      <strong className={cn('date')}>2023-04-14 ~ 2023-04-24</strong>
                      <span className={cn('total')}>{t('eventPopup.wonderDaoLunch.options.period.total')}</span>
                      <span className={cn('udc')}>{t('eventPopup.wonderDaoLunch.options.period.udc')}</span>
                    </dd>
                  </div>
                </dl>
              }
              backgroundImageUrl='https://nile.blob.core.windows.net/images/images/bg_event_wonder_dao_lunch.png'
              imgDimmed
              type='dark'
              buttonList={[
                {
                  text: t('eventPopup.wonderDaoLunch.btn1'),
                  href: { pathname: '/dao/wonder/station' },
                  target: '_blank',
                  theme: 'white',
                  onClick: () => onContentClick,
                  size: 'md',
                },
              ]}
            />
          </SwiperSlide>
          <SwiperSlide className={cn('modal-slide-content')}>
            <HomeLaunchEventModalContents
              classNames='nile'
              title={'SNKR2'}
              desc={t('eventPopup.snkr2.desc')}
              backgroundImageUrl='https://nile.blob.core.windows.net/images/images/bg_event_snkrz.png'
              type='dark'
              imgDimmed
              schedule={
                <>
                  <p className={cn('start-day')}>
                    <span className={cn('date')}>{t('eventPopup.snkr2.date')}</span>
                    <span className={cn('udc')}>{t('eventPopup.snkr2.dateInfo')}</span>
                  </p>
                </>
              }
              buttonList={[
                {
                  text: t('eventPopup.snkr2.button'),
                  href: { pathname: '/marketplace/SNKRZ' } /* 23.04.18 수정: 컬렉션 상세 링크로 이동 */,
                  theme: 'white',
                  size: 'md',
                  // onClick: () => onContentClick,
                },
              ]}
            />
          </SwiperSlide>
          <SwiperSlide className={cn('modal-slide-content')}>
            <HomeLaunchEventModalContents
              classNames='bagc'
              logo={{
                url: 'https://nile.blob.core.windows.net/images/assets/images/img/neithCollections/img_covenant_badge.svg',
                name: 'NEITH Station',
              }}
              title={t('eventPopup.bagc.title')}
              desc={t('eventPopup.bagc.desc')}
              backgroundImageUrl={'https://nile.blob.core.windows.net/images/images/bg_event_bagc.png'}
              imgDimmed
              type='dark'
              schedule={
                <>
                  <p className={cn('start-day')}>
                    <span className={cn('date')}>{t('eventPopup.bagc.schedule.launch')}</span>
                  </p>
                </>
              }
              buttonList={[
                {
                  text: t('goToBtn3', { ns: 'common', name: t('eventPopup.project') }),
                  href: { pathname: '/life/bagc' },
                  theme: 'white',
                  onClick: () => onContentClick,
                  size: 'md',
                },
              ]}
            />
          </SwiperSlide>
          {/*<SwiperSlide className={cn('modal-slide-content')}>*/}
          {/*  <HomeLaunchEventModalContents*/}
          {/*    classNames="nft-nyc"*/}
          {/*    title={t('eventPopup.nftNyc.title')}*/}
          {/*    desc={t('eventPopup.nftNyc.desc')}*/}
          {/*    options={*/}
          {/*      <dl className={cn('item-wrap')}>*/}
          {/*        <div className={cn('items')}>*/}
          {/*          <dt>{t('eventPopup.nftNyc.details.pariod.title')}</dt>*/}
          {/*          <dd>{t('eventPopup.nftNyc.details.pariod.desc')}</dd>*/}
          {/*        </div>*/}
          {/*        <div className={cn('items')}>*/}
          {/*          <dt>{t('eventPopup.nftNyc.details.location.title')}</dt>*/}
          {/*          <dd>{t('eventPopup.nftNyc.details.location.desc')}</dd>*/}
          {/*        </div>*/}
          {/*      </dl>*/}
          {/*    }*/}
          {/*    backgroundImageUrl="https://nile.blob.core.windows.net/images/images/bg_home_modal_nft_nyc.png"*/}
          {/*    imgDimmed*/}
          {/*    type="dark"*/}
          {/*    buttonList={[*/}
          {/*      {*/}
          {/*        text: t('eventPopup.nftNyc.btn1'),*/}
          {/*        href: {*/}
          {/*          pathname: 'https://medium.com/nile-official/unfolding-of-nile-the-worlds-first-protocol-based-nftfi-at-nftnyc-2023-de0c5f346c00',*/}
          {/*        },*/}
          {/*        target: '_blank',*/}
          {/*        theme: 'white',*/}
          {/*        size: 'md',*/}
          {/*        onClick: () => onContentClick,*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</SwiperSlide>*/}

          <SwiperSlide className={cn('modal-slide-content')}>
            <HomeLaunchEventModalContents
              classNames='wemix-championship'
              logo={{
                url: 'https://nile.blob.core.windows.net/images/assets/images/img/neithCollections/img_covenant_badge.svg',
                name: 'NEITH Station',
              }}
              title='WEMIX CHAMPIONSHIP'
              desc={t('eventPopup.wemixChampionship.desc')}
              backgroundImageUrl={
                isMobile
                  ? 'https://nile.blob.core.windows.net/images/images/img_main_hero_champion_mobile.png'
                  : 'https://nile.blob.core.windows.net/images/images/img_main_hero_champion.png'
              }
              imgDimmed
              type='dark'
              options={
                <dl className={cn('item-wrap')}>
                  <div className={cn('items')}>
                    <dd>{t('eventPopup.wemixChampionship.info1')}</dd>
                    <dd>{t('eventPopup.wemixChampionship.info2')}</dd>
                  </div>
                </dl>
              }
              buttonList={[
                // {
                //   text: t('goToMarketplace', { ns: 'common' }),
                //   href: { pathname: '/marketplace/CORA' },
                //   theme: 'white',
                //   onClick: () => onContentClick,
                //   size: 'md'
                // },
                {
                  text: t('eventPopup.wemixChampionship.buttonText', { ns: 'common' }),
                  /* 23.04.12 수정: 링크 수정 */
                  href: { pathname: 'https://wemix.golf.sbs.co.kr' },
                  target: '_blank',
                  theme: 'white',
                  size: 'md',
                  // onClick: () => onContentClick,
                },
              ]}
            />
          </SwiperSlide>
          {/*<SwiperSlide className={cn('modal-slide-content')}>*/}
          {/*  <HomeLaunchEventModalContents*/}
          {/*    classNames="cora"*/}
          {/*    logo={{*/}
          {/*      url: 'https://nile.blob.core.windows.net/images/assets/images/img/neithCollections/img_covenant_badge.svg',*/}
          {/*      name: 'NEITH Station',*/}
          {/*    }}*/}
          {/*    title={t('eventPopup.cora.title')}*/}
          {/*    desc={t('eventPopup.cora.desc')}*/}
          {/*    backgroundImageUrl={*/}
          {/*      isMobile*/}
          {/*        ? 'https://nile.blob.core.windows.net/images/images/bg_event_cora_m.jpg'*/}
          {/*        : 'https://nile.blob.core.windows.net/images/images/bg_event_cora.jpg'*/}
          {/*    }*/}
          {/*    imgDimmed*/}
          {/*    type="dark"*/}
          {/*    schedule={*/}
          {/*      <>*/}
          {/*        <p className={cn('start-day')}>*/}
          {/*          <span className={cn('date')}>{t('eventPopup.cora.schedule.launch')}</span>*/}
          {/*          <span className={cn('udc')}>{t('eventPopup.cora.schedule.udc')}</span>*/}
          {/*        </p>*/}
          {/*      </>*/}
          {/*    }*/}
          {/*    buttonList={[*/}
          {/*      {*/}
          {/*        text: t('goToBtn', { ns: 'common', name: t('eventPopup.collection') }),*/}
          {/*        href: { pathname: '/marketplace/CORA' },*/}
          {/*        theme: 'white',*/}
          {/*        size: 'md',*/}
          {/*        // onClick: () => onContentClick,*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*    scheduleTable={*/}
          {/*      <table>*/}
          {/*        <caption className={cn('a11y')}>cora 판매 일정</caption>*/}
          {/*        <tbody>*/}
          {/*          <tr>*/}
          {/*            <th>{t('eventPopup.cora.scheduleTable.schedule1.date')}</th>*/}
          {/*            <td>*/}
          {/*              <span className={cn('time')}>{t('eventPopup.cora.scheduleTable.schedule1.time1')}</span>*/}
          {/*              <em className={cn('detail')}>{t('eventPopup.cora.scheduleTable.schedule1.detail1')}</em>*/}
          {/*            </td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <th rowSpan={4}>{t('eventPopup.cora.scheduleTable.schedule2.date')}</th>*/}
          {/*            <td>*/}
          {/*              <span className={cn('time')}>{t('eventPopup.cora.scheduleTable.schedule2.time1')}</span>*/}
          {/*              <em className={cn('detail')}>{t('eventPopup.cora.scheduleTable.schedule2.detail1')}</em>*/}
          {/*            </td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>*/}
          {/*              <span className={cn('time')}>{t('eventPopup.cora.scheduleTable.schedule2.time2')}</span>*/}
          {/*              <em className={cn('detail')}>{t('eventPopup.cora.scheduleTable.schedule2.detail2')}</em>*/}
          {/*            </td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>*/}
          {/*              <span className={cn('time')}>{t('eventPopup.cora.scheduleTable.schedule2.time3')}</span>*/}
          {/*              <em className={cn('detail')}>{t('eventPopup.cora.scheduleTable.schedule2.detail3')}</em>*/}
          {/*            </td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>*/}
          {/*              <span className={cn('time')}>{t('eventPopup.cora.scheduleTable.schedule2.time4')}</span>*/}
          {/*              <em className={cn('detail')}>{t('eventPopup.cora.scheduleTable.schedule2.detail4')}</em>*/}
          {/*            </td>*/}
          {/*          </tr>*/}
          {/*        </tbody>*/}
          {/*      </table>*/}
          {/*    }*/}
          {/*  />*/}
          {/*</SwiperSlide>*/}
          {/*  <HomeLaunchEventModalContents*/}
          {/*    classNames="kari-airdrop-event"*/}
          {/*    logo={{ name: 'EVENT' }}*/}
          {/*    title={t('eventPopup.kariAirdropEvent.title')}*/}
          {/*    desc={t('eventPopup.kariAirdropEvent.desc')}*/}
          {/*    options={*/}
          {/*      <dl className={cn('item-wrap')}>*/}
          {/*        <div className={cn('items')}>*/}
          {/*          <dt>{t('eventPopup.kariAirdropEvent.details.holder.title')}</dt>*/}
          {/*          <dd>{t('eventPopup.kariAirdropEvent.details.holder.desc')}</dd>*/}
          {/*        </div>*/}
          {/*        <div className={cn('items')}>*/}
          {/*          <dt>{t('eventPopup.kariAirdropEvent.details.date.title')}</dt>*/}
          {/*          <dd>{t('eventPopup.kariAirdropEvent.details.date.desc')}</dd>*/}
          {/*        </div>*/}
          {/*        <div className={cn('items')}>*/}
          {/*          <dt>{t('eventPopup.kariAirdropEvent.details.total.title')}</dt>*/}
          {/*          <dd>{t('eventPopup.kariAirdropEvent.details.total.desc')}</dd>*/}
          {/*        </div>*/}
          {/*      </dl>*/}
          {/*    }*/}
          {/*    backgroundImageUrl="https://nile.blob.core.windows.net/images/images/bg_event_kari_airdrop.png"*/}
          {/*    imgDimmed*/}
          {/*    type="dark"*/}
          {/*    buttonList={[*/}
          {/*      {*/}
          {/*        text: t('eventPopup.kariAirdropEvent.btn1'),*/}
          {/*        href: { pathname: 'https://medium.com/nile-official/wemix-airdrop-event-for-kari-nft-holders-3db885348da8' },*/}
          {/*        target: '_blank',*/}
          {/*        theme: 'white',*/}
          {/*        size: 'sm',*/}
          {/*        onClick: () => onContentClick,*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</SwiperSlide>*/}
          {/*<SwiperSlide className={cn('modal-slide-content')}>*/}
          {/*  /!* 23.03.23 수정:  kari modal 추가 *!/*/}
          {/*  <HomeLaunchEventModalContents*/}
          {/*    classNames="kari"*/}
          {/*    title={t('eventPopup.kari.title')}*/}
          {/*    desc={t('eventPopup.kari.desc')}*/}
          {/*    backgroundImageUrl="https://nile.blob.core.windows.net/images/images/bg_event_kari.jpg"*/}
          {/*    imgDimmed*/}
          {/*    type="dark"*/}
          {/*    buttonList={[*/}
          {/*      // {*/}
          {/*      //   text: t('eventPopup.kari.btn1'),*/}
          {/*      //   href: { pathname: '/life/kari' },*/}
          {/*      //   theme: 'white',*/}
          {/*      //   onClick: () => onContentClick,*/}
          {/*      // },*/}
          {/*      {*/}
          {/*        text: t('eventPopup.kari.btn2'),*/}
          {/*        size: 'md',*/}
          {/*        href: { pathname: '/marketplace/KARI' },*/}
          {/*        target: '_blank',*/}
          {/*        theme: 'white',*/}
          {/*        onClick: () => onContentClick,*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</SwiperSlide>*/}
          {/*<SwiperSlide className={cn('modal-slide-content')}>*/}
          {/*  <HomeLaunchEventModalContents*/}
          {/*    classNames="neith-launch"*/}
          {/*    logo={{ name: 'EVENT' }}*/}
          {/*    title={t('eventPopup.neithLaunch.title')}*/}
          {/*    desc={t('eventPopup.neithLaunch.desc')}*/}
          {/*    options={*/}
          {/*      <dl className={cn('item-wrap')}>*/}
          {/*        <div className={cn('items period')}>*/}
          {/*          <dt>{t('eventPopup.neithLaunch.options.period.title')}</dt>*/}
          {/*          <dd>*/}
          {/*            <strong className={cn('date')}>2023-03-20 12:00 ~ 2023-04-02 23:59</strong>*/}
          {/*            <span className={cn('total')}>{t('eventPopup.neithLaunch.options.period.total')}</span>*/}
          {/*            <span className={cn('udc')}>{t('eventPopup.neithLaunch.options.period.udc')}</span>*/}
          {/*          </dd>*/}
          {/*        </div>*/}
          {/*        <div className={cn('items reward')}>*/}
          {/*          <dt>{t('eventPopup.neithLaunch.options.reward.title')}</dt>*/}
          {/*          <dd>*/}
          {/*            <span className={cn('amount')}>20,000</span>*/}
          {/*            <span className={cn('unit')}>WEMIX</span>*/}
          {/*          </dd>*/}
          {/*        </div>*/}
          {/*      </dl>*/}
          {/*    }*/}
          {/*    backgroundImageUrl="https://nile.blob.core.windows.net/images/images/bg_event_neith_launch.jpg"*/}
          {/*    imgDimmed*/}
          {/*    type="dark"*/}
          {/*    buttonList={[*/}
          {/*      {*/}
          {/*        text: t('eventPopup.neithLaunch.btn1'),*/}
          {/*        size: 'md',*/}
          {/*        href: { pathname: 'https://gleam.io/8XQOQ/nile-city-of-neith-collection-event' },*/}
          {/*        target: '_blank',*/}
          {/*        theme: 'white',*/}
          {/*        onClick: () => onContentClick,*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</SwiperSlide>*/}
          {/*<SwiperSlide className={cn('modal-slide-content')}>*/}
          {/*  <HomeLaunchEventModalContents*/}
          {/*    classNames="tangled"*/}
          {/*    logo={{*/}
          {/*      url: 'https://nile.blob.core.windows.net/images/assets/images/img/neithCollections/img_covenant_badge.svg',*/}
          {/*      name: 'NEITH Station',*/}
          {/*    }}*/}
          {/*    title="Tangled"*/}
          {/*    desc={t('eventPopup.tangled.desc')}*/}
          {/*    backgroundImageUrl="https://nile.blob.core.windows.net/images/assets/images/img/img_tangled_visual.png"*/}
          {/*    type="dark"*/}
          {/*    buttonList={[*/}
          {/*      {*/}
          {/*        text: t('eventPopup.tangled.btn1'),*/}
          {/*        theme: 'white',*/}
          {/*        onClick: () => onContentClick('/life/ttps'),*/}
          {/*        size: 'md'*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*    // schedule={*/}
          {/*    //   <>*/}
          {/*    //     <p className={cn('start-day')}>*/}
          {/*    //       <span className={cn('date')}>{t('eventPopup.tangled.schedule.launch')}</span>*/}
          {/*    //       <span className={cn('udc')}>{t('eventPopup.tangled.schedule.udc')}</span>*/}
          {/*    //     </p>*/}
          {/*    //   </>*/}
          {/*    // }*/}
          {/*  />*/}
          {/*</SwiperSlide>*/}
          {/*<SwiperSlide className={cn('modal-slide-content')}>*/}
          {/*  <HomeEventModalContents*/}
          {/*    classNames="neith"*/}
          {/*    status=""*/}
          {/*    title="NEITH Station"*/}
          {/*    logo={{*/}
          {/*      url: 'https://nile.blob.core.windows.net/images/assets/images/img/neithCollections/img_covenant_badge.svg',*/}
          {/*      name: 'NEITH Station',*/}
          {/*    }}*/}
          {/*    slogan={t('eventPopup.neithStation.title')}*/}
          {/*    desc={t('eventPopup.neithStation.desc')}*/}
          {/*    backgroundImageUrl="https://nile.blob.core.windows.net/images/images/bg_event_neith_station.png"*/}
          {/*    type="dark"*/}
          {/*    buttonList={[*/}
          {/*      {*/}
          {/*        text: t('goToBtn', { ns: 'common', name: 'NEITH Station' }),*/}
          {/*        theme: 'white',*/}
          {/*        onClick: () => onContentClick('/neith-station'),*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</SwiperSlide>*/}
          {/*<SwiperSlide className={cn('modal-slide-content')}>*/}
          {/*  <HomeEventModalContents*/}
          {/*    classNames="nile"*/}
          {/*    status="UPCOMING"*/}
          {/*    title={t('eventPopup.son6.title')}*/}
          {/*    desc={t('eventPopup.son6.desc')}*/}
          {/*    backgroundImageUrl="https://nile.blob.core.windows.net/images/images/bg_event_son6.png"*/}
          {/*    type="dark"*/}
          {/*    imgDimmed*/}
          {/*    date="2023-03-21 12:00 PM"*/}
          {/*    isNileOrigin*/}
          {/*    buttonList={[*/}
          {/*      // {*/}
          {/*      //   text: t('goAuction'),*/}
          {/*      //   href: { pathname: '/marketplace/SON6/1' },*/}
          {/*      //   theme: 'white',*/}
          {/*      //   onClick: () => onContentClick,*/}
          {/*      // },*/}
          {/*      {*/}
          {/*        text: t('viewCollectionInfo'),*/}
          {/*        theme: 'white',*/}
          {/*        onClick: () => onContentClick('/life/son'),*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</SwiperSlide>*/}
          {/*
          <SwiperSlide className={cn('modal-slide-content')}>
            <HomeEventModalContents
              classNames="tipo"
              status="NILE Tokens Open"
              title="TIPO Token (TIPO)"
              desc={t('eventPopup.tipo.after')}
              backgroundImageUrl="/images/bg_event_tipo_after.png"
              type="dark"
              buttonList={[
                {
                  text: t('eventPopup.tipo.btn3'),
                  href: { pathname: '/tokens/detail', query: { token: 'TIPO' } },
                  theme: 'white',
                  onClick: () => onContentClick,
                },
                {
                  text: t('eventPopup.tipo.btn2'),
                  theme: 'white',
                  onClick: () => onContentClick,
                },
              ]}
            />
          </SwiperSlide>
          <SwiperSlide className={cn('modal-slide-content')}>
            <HomeEventModalContents
              classNames="lus"
              status="On Auction"
              title="London Underground Station(LUS) 264 Genesis"
              desc={t('bottomBanner.ongoing', { collection: 'LUS 264', n: '264' })}
              backgroundImageUrl="/images/bg_event_lus.png"
              buttonList={[
                {
                  text: t('partiAuction'),
                  href: { pathname: '/marketplace/[collectionAddressOrSlug]', query: { collectionAddressOrSlug: 'LUS' } },
                  theme: 'black',
                  onClick: () => onContentClick,
                },
              ]}
              type="white"
            />
          </SwiperSlide>
           */}
        </Swiper>
        <div className={cn('modal-slide-bottom')}>
          <div className={cn('btn-wrap')}>
            <button type='button' className={cn('btn-swiper', 'btn-prev')}>
              <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg' />
            </button>
            <div className={cn('modal-slide-pagination')} />
            <button type='button' className={cn('btn-swiper', 'btn-next')}>
              <span className={cn('a11y')}>{t('next', { ns: 'common' })}</span>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg' />
            </button>
          </div>
          <div className={cn('check-wrap')}>
            <Checkbox checked={termsCheck} onChange={() => setTermsCheck((prev) => !prev)}>
              {t('notShowAgain')}
            </Checkbox>
          </div>
        </div>
      </ModalSlideLayout>

      <NileHeroModal isOpen={isModalDaoStation} setIsOpen={setModalDaoStation} youtubeId='cwn_lcbk7ds' />
    </>
  );
};

export default HomeEventModal;
