import cn from 'classnames';
import TangledNftsTimepiecesClass from '@/components/life/tangled/TangledNftsTimepiecesClass';

import TangledNftsTimepieces from '@/components/life/tangled/TangledNftsTimepieces';
import TangledRounds from './TangledRounds';
import TangledNeithCovenantDate from '@/components/life/tangled/TangledNeithCovenantDate';
import TangledNeithCovenantClass from '@/components/life/tangled/TangledNeithCovenantClass';

const TangledNfts = () => {
  return (
    <div className={cn('nfts')}>
      <TangledNftsTimepieces />
      <TangledRounds />
      <TangledNftsTimepiecesClass />
      {/* 23.03.29 수정: TangledNeithCovenentClass,TangledNeithCovenentDate 추가 */}
      <TangledNeithCovenantClass />
      <TangledNeithCovenantDate />
    </div>
  );
};

export default TangledNfts;
