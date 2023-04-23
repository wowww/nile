import { conTypeAtom } from '@/state/daoAtom';
import cn from 'classnames';
import { useAtom } from 'jotai';

import ConCivicCard, { cardDataType } from '@/components/life/con/ConCivicCard';
const ConCivicGroup = () => {
  /* 23.04.04 수정 start: usTranslation 삭제 */
  const [activeConType, _] = useAtom(conTypeAtom);

  const civicListData = () => {
    const result: cardDataType[] = [];
    for (let i = 0; i < 80; i++) {
      let count = 100 + i + 1;
      result.push({
        name: `${activeConType} #${count} CIVIC`,
        src: `/assets/images/img/con/${activeConType}/img_${activeConType}_${count}.jpg`,
      });
    }
    return result;
  };

  return (
    <div className={cn('life-nft-section', 'civic-group')}>
      <h3>CIVIC 80</h3>
      <div className={cn('civic-group-inner')}>
        {civicListData().map((cd, i) => (
          <ConCivicCard name={cd.name} key={cd.name} src={cd.src} />
        ))}
      </div>
    </div>
  );
};

export default ConCivicGroup;
