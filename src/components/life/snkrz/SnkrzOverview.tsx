import cn from 'classnames';
import SnkrzOverviewSystem from './SnkrzOverviewSystem';
import SnkrzOverviewIntroduction from './SnkrzOverviewIntroduction';
import SnkrzOverviewMoreAbout from '@components/life/snkrz/SnkrzOverviewMoreAbout';
import SnkrzOverviewFAQ from '@components/life/snkrz/SnkrzOverviewFAQ';

const SnkrzOverview = () => {
  return (
    <div className={cn('life-snkrz-inner overview')}>
      {/* 소개 영역 */}
      <SnkrzOverviewIntroduction />
      <div className={cn('bg-section')}>
        <div className={cn('bg-section-inner')}>
          {/*  SNKR2 자세히 보기  */}
          <SnkrzOverviewMoreAbout />
          {/* 쉽고 재밌어진 snkr2 */}
          <SnkrzOverviewSystem />
        </div>
      </div>
      <SnkrzOverviewFAQ />
    </div>
  );
};

export default SnkrzOverview;
