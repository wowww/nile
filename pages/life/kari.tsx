import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import cn from 'classnames';
import { LifeLayout, LifeHero, LifeContainer } from '@/components/life/LifeLayout';
import { ConTop } from '@/components/life/con/ConTop';
import { LifeKariUniverse } from '@/components/life/kari/LifeKariUniverse';
import { LifeKariHero } from '@/components/life/kari/LifeKariHero';
import { LifeKariAboutProject } from '@/components/life/kari/LifeKariAboutProject';
import { LifeKariNFTFeatures } from '@/components/life/kari/LifeKariNFTFeatures';
import { LifeKariCommunity } from '@/components/life/kari/LifeKariCommunity';
import { LifeKariCreator } from '@/components/life/kari/LifeKariCreator';

const lifeName = 'kari';
const Kari = () => {
  return (
    <>
      <Helmet>
        <title>Kari &gt; Life &gt; NILE</title>
      </Helmet>
      <LifeLayout lifeName={lifeName}>
        <LifeHero lifeName={lifeName}>
          <LifeKariHero />
          <LifeKariAboutProject />
        </LifeHero>
        {/* NOTE: padding 값은 디자인 확인 후 적용 필요 */}
        <LifeContainer type="normal" lifeName={lifeName}>
          <LifeKariUniverse />
          <LifeKariNFTFeatures />
          <LifeKariCommunity />
          <LifeKariCreator />
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

export default Kari;
