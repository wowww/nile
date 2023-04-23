import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';

interface Props {
  step: number;
  memberCount?: {
    total: number;
    signed: number;
  };
  signingDeadlineDate?: string;
}

const SignatureHeader = ({ step }: Props): ReactElement => {
  return (
    <div className={cn('signature-header-wrap')}>
      <h3 className={cn('form-title')}>
        {step === 1 && '서명 대상 멤버 리스트'}
        {step === 2 && '모집 컨트랙트 서명 현황'}
        {step === 3 && '모집 컨트랙트 서명 결과'}
        {step === 5 && 'DAO 실행 컨트랙트 서명 현황'}
        {step === 6 && 'DAO 활성화 컨트랙트 서명 현황'}
        {step === 7 && 'DAO 활성화 컨트랙트 서명 결과'}
      </h3>
      {step > 1 && (
        <div className={cn('desc-wrap')}>
          <span className={cn('desc')}>현재 N명이 서명 완료하였습니다. N명 이상 서명 완료 시 모집 컨트랙트가 실행됩니다.</span>
          <span className={cn('date')}>서명 마감 : 2023-02-27 09:00</span>
        </div>
      )}
    </div>
  );
};

export { SignatureHeader };
