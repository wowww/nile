import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LifeLayout, LifeHero, LifeContainer } from '@/components/life/LifeLayout';
import BagcTop from '@/components/life/bagc/BagcTop';
import BagcOverview from '@/components/life/bagc/BagcOverview';
import BagcFaqAccordion from '@/components/life/bagc/BagcFaqAccordion';
import BagcNeithNft from '@/components/life/bagc/BagcNeithNft';
import BagcNftUtility from '@/components/life/bagc/BagcNftUtility';
import BagcMoreAbout from '@/components/life/bagc/BagcMoreAbout';
import BagcInformation from '@/components/life/bagc/BagcInformation';

const lifeName = 'bagc';
const Bagc = () => {
  return (
    <>
      <Helmet>
        <title>Bagc &gt; Life &gt; NILE</title>
      </Helmet>
      <LifeLayout lifeName={lifeName}>
        <LifeHero lifeName={lifeName}>
          <BagcTop />
        </LifeHero>
        <LifeContainer type="normal" lifeName={lifeName}>
          <BagcOverview />
          <BagcNftUtility />
          <BagcNeithNft />
          <BagcMoreAbout />
          <BagcFaqAccordion />
          <BagcInformation />
        </LifeContainer>
      </LifeLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'life'])),
    },
  };
};

export default Bagc;
