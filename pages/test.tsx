import { useRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Helmet } from 'react-helmet-async';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

import AgendaHistoryList from '@/components/dao/ui/governance/AgendaHistoryList';

const test = () => {
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <>
      <Helmet>
        <title>DAO &gt; NILE</title>
        <body className={cn('dao-main')} />
      </Helmet>
      <div className={cn('dao-home-wrap', `${activeDao.value}-wrap`)} style={{ padding: 100, backgroundColor: '#d9d9d9' }}>
        {/*<AgendaCreateForm />*/}
        <br />
        <AgendaHistoryList />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['dao', 'common'])),
    },
  };
};

export default test;
