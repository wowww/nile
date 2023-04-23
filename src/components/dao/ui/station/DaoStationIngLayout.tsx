import React, { ReactNode } from 'react';
import cn from 'classnames';
import DaoStationIngHeader from '@/components/dao/ui/station/DaoStationIngHeader';

interface DaoRecruitingLayoutPropsType {
  children: ReactNode;
}

const DaoStationIngLayout: React.FC<DaoRecruitingLayoutPropsType> = ({ children }) => {
  return (
    <div className={cn('dao-recruiting-wrap')}>
      <DaoStationIngHeader />
      <div className={cn('dao-recruiting-container')}>{children}</div>
    </div>
  );
};

export default DaoStationIngLayout;
