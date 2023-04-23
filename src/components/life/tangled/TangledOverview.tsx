import cn from 'classnames';

/* 23.03.29 수정: TangledOverviewUnderstanding -> TangledOverviewWomenFriendly 컴포넌트 교체 */
import TangledOverviewWomenFriendly from '@/components/life/tangled/TangledOverviewWomenFriendly';
import TangledOverviewAbility from '@/components/life/tangled/TangledOverviewAbility';
import TangledServiceStructure from '@/components/life/tangled/TangledServiceStructure';
import TangledVideo from '@/components/life/tangled/TangledVideo';
import LifeMarketCap from '../LifeMarketCap';

const TangledOverview = () => {
  return (
    <div className={cn('life-tangled-inner overview')}>
      {/* 23.03.29 수정: TangledOverviewUnderstanding -> TangledOverviewWomenFriendly 컴포넌트 교체 */}
      {/* Women Friendly Web3 Live Chat */}
      <TangledOverviewWomenFriendly />
      {/* 서비스 구조 */}
      <TangledServiceStructure />
      {/* 기능 살펴보기 */}
      <TangledOverviewAbility />
      {/* introducing TIPO */}
      <TangledVideo />
    </div>
  );
};

export default TangledOverview;
