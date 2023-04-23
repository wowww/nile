import cn from 'classnames';
import DaoTrustActivity from '@components/dao/DaoTrustActivity';
import { DaoBox } from '@components/dao/DaoBoxLayout';

const TrustActivityTab = () => {
  return (
    <DaoBox className="full">
      <div className={cn('trust-activity-wrap')}>
        <DaoTrustActivity />
      </div>
    </DaoBox>
  );
};

export default TrustActivityTab;
