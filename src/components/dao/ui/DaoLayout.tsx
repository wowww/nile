import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import DaoLnb from '@/components/dao/ui/DaoLnb';
import DoaHeader from '@/components/dao/ui/DaoHeader';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai';
import { daoHeaderAtom } from '@/state/daoAtom';
import { headerHideFull } from '@/state/layoutAtom';

interface DaoLayoutPropsType {
  children: ReactNode;
  activate: string;
  lnb?: boolean;
}

const DaoLayout: React.FC<DaoLayoutPropsType> = ({ children, activate, lnb = true }) => {
  const daoContainerRef = useRef(null);
  const headerHide = useAtomValue(headerHideFull);

  return (
    <div className={cn('dao-page-wrap')}>
      {/* 23.02.09 수정: lnb 스크롤 이벤트 수정 */}
      <DoaHeader classnames="" />
      <div className={cn('dao-page')} ref={daoContainerRef}>
        <div className={cn('dao-container')}>
          {lnb && <DaoLnb activate={activate} classnames={headerHide ? 'hide' : 'active'} />}
          {/* 23.03.02 수정: activate 클래스 바인딩 */}
          <div className={cn('dao-content-wrap', { lnb }, activate)}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DaoLayout);
