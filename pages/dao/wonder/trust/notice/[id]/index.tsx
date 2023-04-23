import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import DaoLayout from '@components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DaoTrustNoticeDetail, { NoticeContentType } from '@components/dao/trust/DaoTrustNoticeDetail';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import {GetStaticPaths} from "next";

const DaoNotice = () => {
  const router = useRouter();

  if (process.env.NODE_ENV === 'production') {
    useEffect(() => {
      router.replace('/');
    }, [router]);

    return null;
  }

  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <>
      <Helmet>
        <title>Trust &gt; DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <DaoLayout activate="menu-trust">
        <DaoTrustNoticeDetail />
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default DaoNotice;
