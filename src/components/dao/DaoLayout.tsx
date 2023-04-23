import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
// import DaoLnb from '@/components/dao/DaoLnb';
import DoaHeader from '@/components/dao/DaoHeader';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai';
import { daoHeaderAtom } from '@/state/daoAtom';
import { headerHideFull } from '@/state/layoutAtom';
import { useWonder } from '@/hook/useWonder';
import { useRouter } from 'next/router';
import { DaoStatus } from '@/types/dao/dao.types';
import dynamic from 'next/dynamic';

interface DaoLayoutPropsType {
  children: ReactNode;
  activate: string;
  lnb?: boolean;
}

const DaoLayout: React.FC<DaoLayoutPropsType> = ({ children, activate, lnb = true }) => {
  const daoContainerRef = useRef(null);
  const headerHide = useAtomValue(headerHideFull);
  const router = useRouter();
  const DaoLnb = dynamic(() => import('@/components/dao/DaoLnb'), { ssr: false });
  const { wonderDao, refreshWonderDao } = useWonder();

  useEffect(() => {
    if (!wonderDao) {
      refreshWonderDao();
    }
  }, [wonderDao]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    if (!wonderDao || wonderDao?.status !== DaoStatus.CONFIRM) {
      if (!router.asPath.includes('station')) {
        router.push('/dao/wonder/station');
      }
    }
  }, [wonderDao]);

  return (
    <div className={cn('dao-page-wrap')}>
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
