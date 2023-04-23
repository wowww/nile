import React, { useEffect } from 'react';
import cn from 'classnames';
import DaoLayout from '@/components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DaoIncineratorContent from '@/components/dao/incinerator/DaoIncineratorContent';
import { useAtomValue } from 'jotai';
import { daoThemeAtom, daoSelectedMenu } from '@/state/daoAtom';
import { useSetAtom } from 'jotai';

const Incinerator = () => {
  // 개별 다오 컬러 커스텀을 위한 전역 변수 : default 'wonder' 원더다오
  const activeDao = useAtomValue(daoThemeAtom);
  // mobile general header selected menu 활성화를 위한 전역 변수 set
  const setDaoSelectedMenu = useSetAtom(daoSelectedMenu);

  useEffect(() => {
    setDaoSelectedMenu('Incinerator');
  }, []);
  return (
    <>
      <Helmet>
        <title>DAO &gt; Nile</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <DaoLayout activate="menu-incinerator">
        <DaoIncineratorContent />
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

export default Incinerator;
