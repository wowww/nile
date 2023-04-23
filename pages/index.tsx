import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { i18n, useTranslation } from 'next-i18next';
import NileNews from '@/components/nile/NileNews';
import ContentTitle from '@/components/marketplace/ContentTitle';
import NilePick from '@/components/nile/NilePick';
import CookiesModal from '@/components/modal/CookiesModal';
import { NileApiService } from '@/services/nile/api';
import { NileCollectionResult } from '@/models/nile/marketplace/NileCollection';
import dynamic from 'next/dynamic';
import { useAtomValue } from 'jotai';
import { cookieAgreementAtom, eventModalAtom } from '@/state/modalAtom';

import RecentlySlide from '@/components/home/RecentlySlide';
import NileDocsBanner from '@components/home/NileDocsBanner';
import { NileHero } from '@/components/home/NileHero';
// import NileFootprint from '@/components/home/NileFootprint';
// import NileDaoList from '@/components/home/NileDaoList';
/* 23.03.31 수정: 컴포넌트 교체 */
import RecruitmentCard from '@/components/home/RecruitmentCard';

import useMediaQuery from '@/hook/useMediaQuery';
import useWindowResize from '@/hook/useWindowResize';
/* 23.03.31 수정: useDaoCharacterConvert, daoThemeAtom 추가 */
import { daoThemeAtom } from '@/state/daoAtom';

const NileFootprint = dynamic(() => import('@/components/home/NileFootprint'), { ssr: false });

const NileDaoList = dynamic(() => import('@/components/home/NileDaoList'), { ssr: false });

export type NewsFeedData = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  thumbnail?: string;
  link?: string;
  details?: NewsFeedDetail[];
};

export interface NewsFeedDetail {
  mediumId?: string;
  language?: string;
  title?: string;
  description?: string;
}

export type ChoiceData = {
  tag?: string;
  image?: string;
  pickTitle?: string;
  pickDescription?: string;
  marketOpen: boolean /* 23.03.22 수정: 데이터 타입 추가 */;
  buttonType?: {
    buttonText?: string;
    link?: string;
  }[];
  additionLink?: {
    image?: string;
    productTitle?: string;
    priceTitle?: string;
    priceValue?: string;
    priceUnit?: string;
    statusTag?: string;
  }[];
};

type NileHomeProps = {
  newsList?: NewsFeedData[];
  choiceList?: ChoiceData[];
  lusAdditionList?: NileCollectionResult;
};

const HomeEventModal = dynamic(() => import('@components/modal/HomeEventModal'), { ssr: false });

const NileHome = ({ data }: { data: NileHomeProps }) => {
  const api = NileApiService();
  const { t, i18n } = useTranslation(['nile', 'common']);
  const resizeEvtInit = useWindowResize();

  const cookieAgreement = useAtomValue(cookieAgreementAtom);
  const eventModal = useAtomValue(eventModalAtom); // '' / 'NEVER'

  // TODO: api로부터 Modal 정보 받아올 때 함께 받아오도록 수정, 현재는 Modal 정보 수정시 날짜 함께 수동으로 수정하도록
  const recentModalUpdate: string = '2023-04-13 11:00:00';

  const [open, setOpen] = useState<boolean>(false);
  const [eventOpen, setEventOpen] = useState<boolean>(recentModalUpdate !== eventModal); // temp
  const [newsList, setNewsList] = useState<NewsFeedData[]>();
  const [choiceList, setChoiceList] = useState<ChoiceData[]>();

  const isTablet = useMediaQuery('(max-width: 1279px)');

  /* 23.03.31 수정: activeDao value 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  useEffect(() => {
    api.home.newsfeed
      .getList(3)
      .then(({ data }) => setNewsList(data.result))
      .catch((error) => console.log(error));

    api.home.choice
      .getList()
      .then((data) => setChoiceList(data))
      .catch((error) => console.log(error));
  }, []);

  // TODO: api로 recentModalUpdate 받아오는 예시
  // const [recentModalUpdate, setRecentModalUpdate] = useState<string | undefined>('');
  // useEffect(() => {
  //   api.home.modal
  //     .getRecentUpdate
  //     .then((data) => setRecentModalUpdate((date)))
  // }, []);

  const onClosed = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!cookieAgreement) {
      setOpen(true);
    }
  }, [cookieAgreement, setOpen]);

  return (
    <>
      <Helmet>
        <title>NILE</title>
        <body className="" />
      </Helmet>
      <div className={cn('nile-main-wrap')}>
        <NileHero />
        {/* <NileVisual /> */}
        {/* <GrowthBanner /> */}
        <div className={cn('nile-content-wrap')}>
          <div className="nile-content">
            <NileFootprint />
          </div>
          <div className="nile-content">
            <NileDaoList
              recruitment={<RecruitmentCard theme={'wonder'} />}
              themeData={[
                { theme: 'wonder' },
                {
                  theme: 'arteum',
                  tagName: i18n.language === 'ko' ? '2023 상반기 모집예정' : 'Recruitment will start in the first half of 2023',
                  // telegramLink: 'https://discord.com/channels/1083269128053346316/1084727003137179708',
                  telegramLink: 'https://discord.gg/78wzkvrsbj',
                },
                {
                  theme: 'delta',
                  tagName: i18n.language === 'ko' ? '2023 상반기 모집예정' : 'Recruitment will start in the first half of 2023',
                  // telegramLink: 'https://discord.com/channels/1083269128053346316/1084727268284313630',
                  telegramLink: 'https://discord.gg/78wzkvrsbj',
                  // complete: true, completeValue: '13,459,656', participants: 128,
                },
                {
                  theme: 'oracle',
                  tagName: i18n.language === 'ko' ? '2023 하반기 모집예정' : 'Recruitment will start in the second half of 2023',
                  // telegramLink: 'https://discord.com/channels/1083269128053346316/1084727536933675120',
                  telegramLink: 'https://discord.gg/78wzkvrsbj',
                },
              ]}
            />
          </div>
          {/* 23.03.11 수정: 위치 변경 */}
          <div className={cn('nile-content')}>
            <ContentTitle title={t('home.choice.title')} serif />
            <NilePick pickData={choiceList ?? []} />
          </div>
          {/* 22.12.22 수정 end: NileFootprint 추가 */}
          <div className={cn('nile-content')}>
            <RecentlySlide />
          </div>
          <div className={cn('nile-content')}>
            <ContentTitle title={t('home.lastestNews.title')} serif href="https://medium.com/nile-official" newWindow />
            <NileNews newsData={newsList ?? []} />
          </div>
          <NileDocsBanner />
        </div>
      </div>
      <CookiesModal open={open} onClosed={onClosed} keyboard={false} />
      <HomeEventModal isModal={eventOpen} setIsModal={setEventOpen} recentModalUpdate={recentModalUpdate} />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'nile', 'terms', 'mypage'])),
    },
  };
};

export default NileHome;
