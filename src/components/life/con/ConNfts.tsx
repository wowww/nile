import { useTranslation } from 'next-i18next';

import cn from 'classnames';
import { ConCities } from '@/components/life/con/ConNftsCities';
import ConCityContents from '@/components/life/con/ConCityContents';
import ConCardFourGods from '@/components/life/con/ConCardFourGods';
import ConCivicGroup from '@/components/life/con/ConCivicGroup';
import ConNftReleaseDate from '@/components/life/con/ConNftReleaseDate';
import ConCardFourPharaoh from '@/components/life/con/ConCardFourPharaohs';

const ConNfts = () => {
  const { t } = useTranslation('life');

  return (
    <div className={cn('life-con-inner nfts')}>
      <ConCities />
      {/* 도영 책임님 컴포넌틑 확인 필요 */}
      {/* <ConCityContents />  */}
      <ConNftReleaseDate />
      <ConCardFourGods />
      <ConCardFourPharaoh />
      <ConCivicGroup />
    </div>
  );
};

export default ConNfts;
