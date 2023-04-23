import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { ReactSVG } from 'react-svg';
import { useRef } from 'react';
import { GovernanceCaseType } from '@/components/dao/governance/QuorumInfo';
import GovernanceCard from '@/components/dao/governance/contents/GovernanceCard';

const TrustCheckSlide = () => {
  const { t } = useTranslation(['dao', 'common']);

  const swiperEvt = useRef<any>();
  const data = [
    {
      type: 'consensus',
      title: t('governance.agenda.item.4'),
      description:
        'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      author: { thumbnail: null, address: '0x207E...c3a5' },
      date: {
        start: '2023-07-07',
        end: '2023-07-10',
      },
      views: 0,
      commentCount: 0,
      currentQuorum: 1000,
      targetQuorum: 100000,
      agreeRate: 60,
      againstRate: 40,
      agreeGwdr: 0,
      againstGwdr: 0,
      agreeUser: 600,
      againstUser: 400,
    },
    {
      type: 'consensus',
      title: t('governance.agenda.item.4'),
      description:
        'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      author: { thumbnail: null, address: '0x207E...c3a5' },
      date: {
        start: '2023-07-07',
        end: '2023-07-10',
      },
      views: 1,
      commentCount: 0,
      currentQuorum: 1000,
      targetQuorum: 100000,
      agreeRate: 60,
      againstRate: 40,
      agreeGwdr: 0,
      againstGwdr: 0,
      agreeUser: 600,
      againstUser: 400,
    },
    {
      type: 'consensus',
      title: t('governance.agenda.item.4'),
      description:
        'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      author: { thumbnail: null, address: '0x207E...c3a5' },
      date: {
        start: '2023-07-07',
        end: '2023-07-10',
      },
      views: 20,
      commentCount: 0,
      currentQuorum: 1000,
      targetQuorum: 100000,
      agreeRate: 60,
      againstRate: 40,
      agreeGwdr: 0,
      againstGwdr: 0,
      agreeUser: 600,
      againstUser: 400,
    },
  ];

  return (
    <div className={cn('trust-check-wrap')}>
      <div className={cn('slide-top-wrap')}>
        <strong>Trust Check ({data.length})</strong>
      </div>
      <Swiper
        modules={[Pagination, Navigation]}
        className={cn('trust-slide-wrap')}
        slidesPerView={1}
        spaceBetween={20}
        speed={1000}
        threshold={20}
        pagination={{
          el: '.slide-pagination',
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
        {data.map((el, index) => {
          return (
            <SwiperSlide className={cn('slide-content')} key={`slide-${index}`}>
              {/*<GovernanceCard*/}
              {/*  index={index}*/}
              {/*  type={el.type as GovernanceCaseType}*/}
              {/*  title={el.title}*/}
              {/*  description={el.description}*/}
              {/*  author={el.author}*/}
              {/*  date={el.date}*/}
              {/*  views={el.views}*/}
              {/*  commentCount={el.commentCount}*/}
              {/*  currentQuorum={el.currentQuorum}*/}
              {/*  targetQuorum={el.targetQuorum}*/}
              {/*  agreeRate={el.agreeRate}*/}
              {/*  againstRate={el.againstRate}*/}
              {/*  agreeGwdr={el.agreeGwdr}*/}
              {/*  againstGwdr={el.againstGwdr}*/}
              {/*  agreeUser={el.agreeUser}*/}
              {/*  againstUser={el.againstUser}*/}
              {/*  trustCheck={true}*/}
              {/*/>*/}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className={cn('slide-bottom')}>
        <div className={cn('btn-wrap')}>
          <button type="button" className={cn('btn-swiper', 'btn-prev')}>
            <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
          </button>
          <div className={cn('slide-pagination')} />
          <button type="button" className={cn('btn-swiper', 'btn-next')}>
            <span className={cn('a11y')}>{t('next', { ns: 'common' })}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustCheckSlide;
