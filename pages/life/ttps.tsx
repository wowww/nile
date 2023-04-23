import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LifeLayout, LifeHero, LifeContainer } from '@/components/life/LifeLayout';

import TangledTop from '@/components/life/tangled/TangledTop';
import TangledNfts from '@/components/life/tangled/TangledNfts';
import TangledOverview from '@/components/life/tangled/TangledOverview';
import TangledInformation from '@/components/life/tangled/TangledInformation';
import TangledNeithStation from '@/components/life/tangled/TangledNeithStation';

const lifeName = 'tangled';

const Tangled = () => {
  return (
    <>
      <LifeLayout lifeName={lifeName}>
        <LifeHero lifeName={lifeName}>
          <TangledTop />
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
              children: <TangledOverview />,
            },
            {
              label: 'NFT',
              key: 'nft',
              children: <TangledNfts />,
            },
            /* 23.03.29 수정: 탭 삭제로 주석 처리 */
            // {
            //   label: 'NEITH Station',
            //   key: 'neith Station',
            //   children: <TangledNeithStation />,
            // },
          ]}
          lifeName={lifeName}
          activeTab="overview"
        >
          <TangledInformation />
        </LifeContainer>
      </LifeLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['life', 'common'])),
    },
  };
};

export default Tangled;
