import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

import { DaoBox, DaoBoxLayout, DaoBoxTitle } from '@/components/dao/ui/DaoBoxLayout';
import DaoIndividualHomeDiscuss from '@/components/dao/ui/individualHome/DaoIndividualHomeDiscuss';
import DaoIndividualHomeAgora from './DaoIndividualHomeAgora';
import Empty from '@/components/empty/Empty';

const DaoIndividualHomeCommunity = () => {
  const { t } = useTranslation(['dao', 'common']);

  const offset = useAtomValue(windowResizeAtom);
  const [isTablet, setIsTablet] = useState(false);

  const discussData = [
    {
      link: '/',
      title: t('individualHome.community.discuss.item.0.title'),
      desc: t('individualHome.community.discuss.item.0.desc'),
      group: [
        { user: '1', userImage: 'https://picsum.photos/32/32/?image=1' },
        { user: '2', userImage: 'https://picsum.photos/32/32/?image=1' },
        { user: '3', userImage: 'https://picsum.photos/32/32/?image=1' },
        { user: '4', userImage: 'https://picsum.photos/32/32/?image=1' },
      ],
      info: {
        like: 200,
        comment: 20,
        count: 442,
        recentlyActivity: 'Apr 20',
      },
    },
    {
      link: '/',
      title: t('individualHome.community.discuss.item.1.title'),
      desc: t('individualHome.community.discuss.item.1.desc'),
      group: [
        { user: '1', userImage: 'https://picsum.photos/32/32/?image=1' },
        { user: '2', userImage: 'https://picsum.photos/32/32/?image=1' },
        { user: '3', userImage: 'https://picsum.photos/32/32/?image=1' },
        { user: '4', userImage: 'https://picsum.photos/32/32/?image=1' },
      ],
      info: {
        like: 200,
        comment: 20,
        count: 442,
        recentlyActivity: 'Apr 20',
      },
    },
  ];

  const agoraData = [
    {
      link: '/',
      chart: {
        rate: 10,
        goalNum: 20,
      },
      step: 'Governance Proposal',
      title: t('individualHome.community.agora.item.0.title'),
      date: 'Voting period : 2022-07-01 ~ 2022-07-07',
      suggest: '0x2d07E...c3a5',
      suggestImg: 'https://picsum.photos/32/32/?image=1',
    },
    {
      link: '/',
      chart: {
        rate: 100,
        goalNum: 20,
      },
      step: 'Governance Proposal',
      title: t('individualHome.community.agora.item.1.title'),
      date: 'Voting period : 2022-07-01 ~ 2022-07-07',
      suggest: '0x2d07E...c3a5',
      suggestImg: 'https://picsum.photos/32/32/?image=1',
    },
  ];

  useEffect(() => {
    if (offset.width > 768 && offset.width < 1024) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }
  }, [offset.width]);

  return (
    <DaoBoxLayout>
      <DaoBox className="dao-home-type">
        <div className={cn('community-box-wrap')}>
          <DaoBoxTitle title={'Proposals'} titleHref="/dao/ui/governance?tab=proposal" />
          {agoraData.length > 0 ? (
            <div className={cn('community-list-wrap')}>
              <Swiper
                modules={[Pagination]}
                slidesPerView={2}
                spaceBetween={24}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  360: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1280: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                    scrollbar: {
                      enabled: false,
                    },
                  },
                }}
                pagination={{
                  clickable: true,
                }}
              >
                {agoraData.map((data, index) => {
                  return (
                    <SwiperSlide key={`agora${index}}`}>
                      <DaoIndividualHomeAgora data={data} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ) : (
            <Empty iconType="none" className="lg" text={t('empty.noArticle', { ns: 'common' })} />
          )}
        </div>
        <div className={cn('community-box-wrap')}>
          <DaoBoxTitle title={'Discussions'} titleHref="/dao/ui/governance?tab=discussions" />
          {discussData.length > 0 ? (
            <div className={cn('community-list-wrap')}>
              <Swiper
                modules={[Pagination, Scrollbar]}
                scrollbar={{ el: '.swiper-discuss-scrollbar', draggable: true }}
                slidesPerView={2}
                spaceBetween={16}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  360: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                    scrollbar: {
                      enabled: false,
                    },
                  },
                }}
                pagination={{
                  clickable: true,
                }}
              >
                {discussData.map((data, index) => {
                  if (isTablet && index > 1) {
                    return false;
                  }
                  return (
                    <SwiperSlide key={`discuss${index}}`}>
                      <DaoIndividualHomeDiscuss data={data} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className={cn('swiper-scrollbar', 'swiper-discuss-scrollbar')}></div>
            </div>
          ) : (
            <Empty iconType="none" className="lg" text={t('empty.noArticle', { ns: 'common' })} />
          )}
        </div>
      </DaoBox>
    </DaoBoxLayout>
  );
};

export default DaoIndividualHomeCommunity;
