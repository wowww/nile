import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import cn from 'classnames';

import MyPageTop from '@components/mypage/MypageTop';
import MyPageBottom from '@components/mypage/MypageBottom';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { selectedWalletAtom } from '@/state/accountAtom';

const MyPage = () => {
  const router = useRouter();
  const { walletAddress } = router.query;
  const setSelectedUser = useSetAtom(selectedWalletAtom);

  useEffect(() => {
    if (walletAddress) {
      setSelectedUser(String(walletAddress));
    }
  }, [walletAddress]);

  useEffect(()=>{
    return()=>{
      setSelectedUser("")
    }
  },[])
  return (
    <>
      <Helmet>
        <title>Mypage &gt; NILE</title>
      </Helmet>
      <div className={cn('mypage-wrap')}>
        <MyPageTop />
        <MyPageBottom />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['mypage', 'common', 'marketplace'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default MyPage;
