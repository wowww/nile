import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LifeLayout, LifeHero, LifeContainer } from '@/components/life/LifeLayout';

import SnkrzTop from '@/components/life/snkrz/SnkrzTop';
import SnkrzNft from '@/components/life/snkrz/SnkrzNft';
import SnkrzOverview from '@/components/life/snkrz/SnkrzOverview';
import SnkrzTokenomics from '@/components/life/snkrz/SnkrzTokenomics';
import SnkrzInformation from '@/components/life/snkrz/SnkrzInformation';

const lifeName = 'snkrz';

const Snkrz = () => {
  return (
    <>
      <LifeLayout lifeName={lifeName}>
        <LifeHero lifeName={lifeName}>
          <SnkrzTop />
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
              children: <SnkrzOverview />,
            },
            {
              label: 'NFT',
              key: 'nft',
              children: <SnkrzNft />,
            },
            {
              label: 'TOKENOMICS',
              key: 'tokenomics',
              children: <SnkrzTokenomics />,
            },
          ]}
          lifeName={lifeName}
          activeTab="overview"
        >
          <SnkrzInformation />
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

export default Snkrz;
