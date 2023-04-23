import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ConTop } from '@/components/life/con/ConTop';
import { LifeLayout, LifeHero, LifeContainer } from '@/components/life/LifeLayout';

import ConNfts from '@/components/life/con/ConNfts';
import ConOverview from '@/components/life/con/ConOverview';
/* 23.04.05 수정 start: useRouter, useEffect, useState 추가 */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
/* 23.04.05 수정 start: useRouter, useEffect, useState 추가 */

const lifeName = 'con';

const Cone = () => {
  const router = useRouter();
  const [tabActive, setTabActive] = useState('overview');

  /* 23.04.05 수정 start: currentTab useEffect 추가 */
  useEffect(() => {
    const query = (router.query && router.query.tab && router.query?.tab) || 'overview';
    setTabActive(query as string);
  }, [router]);
  /* 23.04.05 수정 start: currentTab useEffect 추가 */

  return (
    <>
      <LifeLayout lifeName={lifeName}>
        <LifeHero lifeName={lifeName}>
          <ConTop />
        </LifeHero>
        <LifeContainer
          paddingTop={{
            pc: 0,
            tablet: 0,
            mobile: 0,
          }}
          type="tab"
          tabItems={[
            {
              label: 'Overview',
              key: 'overview',
              children: <ConOverview />,
            },
            {
              label: 'NFT',
              key: 'nfts',
              children: <ConNfts />,
            },
            /* 23.04.04 수정: NEITH Station 삭제 */
          ]}
          lifeName={lifeName}
          activeTab={tabActive}
        />
      </LifeLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['life', 'common'])),
    },
  };
};

export default Cone;
