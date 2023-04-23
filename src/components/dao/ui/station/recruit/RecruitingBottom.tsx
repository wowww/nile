import { useState, useRef, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import RecruitNavigation from './RecruitNavigation';
import DistributionMethod from './DistributionMethod';
import ParticipantProcedure from './ParticipantProcedure';
import HowDaoWorks from './HowDaoWorks';
import ParticipateInfo from '../complete/ParticipateInfo';
import BusinessManagement from './BusinessManagement';

type RecruitingBottomDataType = {
  [key in string]: number;
};

const RecruitingBottom = () => {
  const { t } = useTranslation('dao');

  const [offset, setOffset] = useState<RecruitingBottomDataType>({
    recruit: 0,
    procedure: 9999,
    purpose: 9999,
    operation: 9999,
    tokens: 9999,
    tokenomics: 9999,
    trust: 9999,
  });

  const [now, setNow] = useState<string>('recruit');

  const wrapperRef = useRef<HTMLDivElement>(null);

  const recruitRef = useRef<HTMLDivElement>(null);
  const procedureRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLUListElement>(null);
  const managementRef = useRef<HTMLDivElement>(null);

  const _handleScroll = () => {
    if (recruitRef.current && procedureRef.current && worksRef.current && managementRef.current) {
      setOffset({
        recruit: Math.abs(recruitRef.current.getBoundingClientRect().top),
        procedure: Math.abs(procedureRef.current.getBoundingClientRect().top),
        purpose: Math.abs(worksRef.current.children[0].getBoundingClientRect().top),
        operation: Math.abs(worksRef.current.children[1].getBoundingClientRect().top),
        tokens: Math.abs(worksRef.current.children[2].getBoundingClientRect().top),
        tokenomics: Math.abs(worksRef.current.children[3].getBoundingClientRect().top),
        trust: Math.abs(managementRef.current.getBoundingClientRect().top),
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', _handleScroll);

    return () => {
      window.removeEventListener('scroll', _handleScroll);
    };
  });

  useEffect(() => {
    const arr = Object.values(offset);
    const min = Math.min(...arr);
    const now = Object.keys(offset).find((key) => offset[key] === min);
    setNow(now!);
  }, [offset]);

  return (
    <div className={cn('recruiting-bottom-wrap')} ref={wrapperRef}>
      <RecruitNavigation now={now} />
      <div className={cn('recruiting-bottom-inner')}>
        <strong className={cn('recruit-section-title')}>{t('station.recruiting.section.1.title')}</strong>
        <ParticipateInfo />
        <DistributionMethod />
        <ParticipantProcedure />
        <strong className={cn('recruit-section-title')}>{t('station.recruiting.section.2.title')}</strong>
        <HowDaoWorks ref={worksRef} />
        <BusinessManagement ref={managementRef} />
      </div>
    </div>
  );
};

export default RecruitingBottom;
