import { useTranslation } from 'next-i18next';

import cn from 'classnames';

import ConCollections from '@/components/life/con/ConCollections';
import ConNeithCovenantInfo from '@/components/life/con/ConNeithCovenantInfo';
import ConNeithNFTClaim from '@/components/life/con/ConNeithNFTClaim';
import ConNeithNFTDate from '@/components/life/con/ConNeithNFTDate';
import ConNeithAbout from '@/components/life/con/ConNeithAbout';
import ConTier from './ConTier';

const ConNeithStation = () => {
  const { t } = useTranslation('life');

  return (
    <div className={cn('life-con-inner neith-station')}>
      <ConNeithCovenantInfo />
      <ConCollections />
      <ConTier />
      <ConNeithNFTDate />
      <ConNeithNFTClaim />
      <ConNeithAbout />
    </div>
  );
};

export { ConNeithStation };
