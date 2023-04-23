import cn from 'classnames';

import TangledNeithCovenantInfo from '@/components/life/tangled/TangledNeithCovenantInfo';
import TangledNeithCovenantDate from '@/components/life/tangled/TangledNeithCovenantDate';
import TangledNeithNFTClaim from '@/components/life/tangled/TangledNeithNFTClaim';
import TangledNeithHowTo from '@/components/life/tangled/TangledNeithHowTo';

const TangledNeithStation = () => {
  return (
    <div className={cn('life-tangled-inner neith-station')}>
      <TangledNeithCovenantInfo />
      <TangledNeithNFTClaim />
      <TangledNeithHowTo />
      <TangledNeithCovenantDate />
    </div>
  );
};

export default TangledNeithStation;
