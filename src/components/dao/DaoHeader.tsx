import React from 'react';
import cn from 'classnames';

import { IconLogo } from '@/components/logo/IconLogo';
import { useAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import DaoBadge from '@components/dao/DaoBadge';

interface DaoHeaderType {
  classnames: string;
}

export const DaoHeader: React.FC<DaoHeaderType> = ({ classnames }) => {
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);

  const daoTitle = (daoType: string) => {
    switch (daoType) {
      case 'wonder':
        return 'WONDER DAO';
      default:
        return false;
    }
  };

  return (
    <div className={cn('dao-header', classnames)}>
      <div className={cn('dao-header-inner')}>
        <h2 className={cn('dao-header-title')}>
          <DaoBadge type={activeDao.value} />
          <span>{daoTitle(activeDao.value)}</span>
        </h2>
      </div>
    </div>
  );
};

export default DaoHeader;
