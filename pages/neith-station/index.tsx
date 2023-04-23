import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import NeithHowTo from '@/components/neithstation/NeithHowTo';
import NeithAbout from '@/components/neithstation/NeithAbout';
import NeithHeroBanner from '@/components/neithstation/NeithHeroBanner';
import NeithWhatToDo from '@/components/neithstation/NeithWhatToDo';
import NeithStationFaqAccordion from '@/components/neithstation/NeithStationFaqAccordion';
import NeithGreatChallenge from '@/components/neithstation/NeithGreatChallenge';
import NeithCollections from '@/components/neithstation/NeithCollections';
import NeithThreeValuesNft from '@/components/neithstation/NeithThreeValuesNft';

const NeithStation = () => {
  return (
    <>
      <Helmet>
        <title>NEITH Station &gt; NILE</title>
      </Helmet>
      <div className={cn('neith-station-wrap')}>
        <NeithHeroBanner />
        <NeithGreatChallenge />
        <NeithCollections />
        <NeithHowTo />
        <NeithAbout />
        {/* 23.04.03 수정: NFT Three Value 새 영역 NeithThreeValuesNft컴포넌트  추가 */}
        <NeithThreeValuesNft />
        <NeithWhatToDo />
        <NeithStationFaqAccordion />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'neithStation'])),
    },
  };
};

export default NeithStation;
