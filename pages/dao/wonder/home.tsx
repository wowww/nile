import React, { useEffect } from 'react';
import cn from 'classnames';
import DaoLayout from '@/components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DaoIndividualHomeTimeline from '@/components/dao/individualHome/DaoIndividualHomeTimeline';
import { useAtomValue, useSetAtom } from 'jotai';
import { daoSelectedMenu, daoThemeAtom } from '@/state/daoAtom';
import DaoIndividualHomeToken from '@/components/dao/individualHome/DaoIndividualHomeToken';

import GovernanceArea from '@/components/dao/individualHome/GovernanceArea';
import { useWonder } from '@/hook/useWonder';

const DaoHome = () => {
  // 개별 다오 컬러 커스텀을 위한 전역 변수 : default 'wonder' 원더다오
  const activeDao = useAtomValue(daoThemeAtom);
  // mobile general header selected menu 활성화를 위한 전역 변수 set
  const setDaoSelectedMenu = useSetAtom(daoSelectedMenu);

  const { wonderDao, wonderStations } = useWonder();

  useEffect(() => {
    setDaoSelectedMenu('Home');
  }, []);
  return (
    <>
      <Helmet>
        <title>DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <DaoLayout activate="menu-home">
        <DaoIndividualHomeToken />
        <DaoIndividualHomeTimeline />
        <GovernanceArea />
      </DaoLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'dao'])),
    },
  };
};

export default DaoHome;
