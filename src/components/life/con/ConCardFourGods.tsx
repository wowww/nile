import { conTypeAtom } from '@/state/daoAtom';
import cn from 'classnames';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';

import ConCharacterCard from './ConCharacterCard';
import { getConStore } from './conStore';

/* 23.04.04 수정: 데이터 삭제 */

const ConCardFourGods = () => {
  const { t } = useTranslation('life');
  const [activeConType, _] = useAtom(conTypeAtom);
  /* 23.04.04 수정: 데이터 추가 */
  const data = getConStore().get(activeConType);

  return (
    <div className={cn('life-nft-section', 'god-wrap')}>
      <strong className={cn('god-title')}>GOD 4</strong>
      <div className={cn('card-god-wrap')}>
        <div className={cn('card-scroll-wrap')}>
          {/* 23.04.04 수정: data map 형태 수정 */}
          {data && data.gods.map((cd, i) => <ConCharacterCard cardType="god" cardData={cd} key={`card-${i}`} />)}
        </div>
      </div>
    </div>
  );
};

export default ConCardFourGods;
