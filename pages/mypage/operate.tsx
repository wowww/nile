import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import cn from 'classnames';

import MypageTop from '@/components/mypage/MypageTop';
import MypageBottomOperate from '@/components/mypage/MypageBottomOperate';

const MyPage = () => {
  return (
    <>
      <Helmet>
        <title>Mypage &gt; NILE</title>
      </Helmet>
      <div className={cn('mypage-wrap')}>
        <MypageTop />
        <MypageBottomOperate />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['mypage', 'common'])),
    },
  };
};

export default MyPage;
