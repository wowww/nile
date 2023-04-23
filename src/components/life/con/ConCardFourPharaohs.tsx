import { conTypeAtom } from '@/state/daoAtom';
import cn from 'classnames';
import { useAtom } from 'jotai';

import ConCharacterCard from './ConCharacterCard';
import { getConStore } from './conStore';

/* 23.04.04 수정: 데이터 삭제 */

const ConCardFourPharaoh = () => {
  const [activeConType, _] = useAtom(conTypeAtom);
  /* 23.04.04 수정: 데이터 추가 */
  const data = getConStore().get(activeConType);

  return (
    <div className={cn('life-nft-section', 'pharaoh-wrap')}>
      <strong className={cn('pharaoh-title')}>PHARAOH 4</strong>
      <div className={cn('card-pharaoh-wrap')}>
        {/* 23.04.04 수정: data map 형태 수정 */}
        {data && data.pharaohs.map((cd, i) => <ConCharacterCard cardType="pharaoh" cardData={cd} key={`card-${i}`} />)}
      </div>
    </div>
  );
};

export default ConCardFourPharaoh;
