import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import useMediaQuery from '@/hook/useMediaQuery';

interface proposalDataType {
  threshold: {
    before: number;
    after: number;
  };
  period: {
    ConsensusBefore: number;
    ConsensusAfter: number;
    GovernanceBefore: number;
    GovernanceAfter: number;
  };
  quorum: {
    ConsensusBefore: number;
    ConsensusAfter: number;
    GovernanceBefore: number;
    GovernanceAfter: number;
  };
  approval: {
    ConsensusBefore: number;
    ConsensusAfter: number;
    GovernanceBefore: number;
    GovernanceAfter: number;
  };
}

interface Props {
  type: 'Temperature' | 'Consensus' | 'Governance' | 'Trust'; // 현재 세팅 타입
  change?: {
    // 이전 대비 변경내역이 있는 경우 change props를 받습니다.
    type: boolean; // true: 변경 있음, false: 변경 없음
    compare: 'Consensus' | 'Governance'; // 비교 대상
  };
  more?: boolean; // 더보기 유무입니다.
}

const GovernanceSettingCheck = ({ type, change, more }: Props) => {
  const { t } = useTranslation('dao');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const proposalData: proposalDataType = {
    threshold: {
      before: 0.01,
      after: 0.01,
    },
    period: {
      ConsensusBefore: 1,
      ConsensusAfter: 3,
      GovernanceBefore: 1,
      GovernanceAfter: 1,
    },
    quorum: {
      ConsensusBefore: 5,
      ConsensusAfter: 10,
      GovernanceBefore: 5,
      GovernanceAfter: 5,
    },
    approval: {
      ConsensusBefore: 30,
      ConsensusAfter: 50,
      GovernanceBefore: 50,
      GovernanceAfter: 50,
    },
  };

  const checkTitleTag = () => {
    switch (type) {
      case 'Temperature':
        return '01';
      case 'Consensus':
        return '02';
      case 'Governance':
        return '03';
      default:
        return false;
    }
  };

  // 변경 전, 후 데이터 비교
  const dataCompare = (before: number, after: number, unit: string) => {
    return (
      <>
        <td>
          {before}
          {unit}
        </td>
        <td className={cn(before !== after && 'change')}>
          {after}
          {unit}&nbsp;
          {before === after && t('governanceSet.detail.content.same' /* (동일) */)}
        </td>
      </>
    );
  };

  const changeNotice = () => {
    if (change !== undefined) {
      return (
        <span className={cn('change-notice', change === undefined && 'hide')}>
          Check
          {/* 23.03.29 수정: 다국어 적용을 위한 마크업 변경 */}
          {change.type
            ? t('governanceSet.changeNotice.diff', { type: change.compare })
            : t('governanceSet.changeNotice.same', { type: change.compare })}
        </span>
      );
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (contentRef.current) {
        contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 1 + 'px';
      }
    } else {
      if (contentRef.current) {
        contentRef.current.style.maxHeight = '';
      }
    }
  }, [isOpen]);

  return (
    <div className={cn('governance-setting-type-wrap', more && 'more', isOpen && 'open')}>
      <div className={cn('check-title-wrap')} onClick={more ? () => setIsOpen(!isOpen) : undefined}>
        <div>
          <span className={cn('tag', type === 'Trust' && 'hide')}>
            <span>{checkTitleTag()}</span>
          </span>
          <strong className={cn('title')}>{type} Check</strong>
        </div>
        <div>
          {!isMobile && changeNotice()}
          <span className={cn('date')}>2023-07-10</span>
          <div className={cn('more-icon')}>
            {more && <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
          </div>
        </div>
        {isMobile && changeNotice()}
      </div>

      <div className={cn('check-content-wrap')} ref={contentRef}>
        <table className={cn('proposal-table')}>
          {/* 23.03.28 수정: colgroup 추가 */}
          <colgroup>
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>{t('governanceSet.proposal.title')}</th>
              <td>{t('governanceSet.proposal.content')}</td>
            </tr>
          </tbody>
        </table>
        <table className={cn('detail-table')}>
          {/* 23.03.28 수정: colgroup 추가 */}
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={2}></td>
              <td>{t('governanceSet.detail.before')}</td>
              <td>{t('governanceSet.detail.after')}</td>
            </tr>
          </thead>
          <tbody>
            <tr className={cn('dark-line')}>
              <th colSpan={2}>{t('governanceSet.detail.title.threshold') /* 안건 등록 조건 */}</th>
              {dataCompare(proposalData.threshold.before, proposalData.threshold.after, '%')}
            </tr>
            <tr className={cn('dark-line')}>
              <th rowSpan={2}>{t('governanceSet.detail.title.period') /* 투표 기간 */}</th>
              <th className={cn('sub')}>Consensus Check</th>
              {dataCompare(proposalData.period.ConsensusBefore, proposalData.period.ConsensusAfter, t('governanceSet.detail.content.day'))}
            </tr>
            <tr>
              <th className={cn('sub')}>Governance Check</th>
              {dataCompare(proposalData.period.GovernanceBefore, proposalData.period.GovernanceAfter, t('governanceSet.detail.content.day'))}
            </tr>
            <tr className={cn('dark-line')}>
              <th rowSpan={2}>
                {t('governanceSet.detail.title.quorum.strong') /* 정족수 */}
                <span>{t('governanceSet.detail.title.quorum.normal') /* (이상) */}</span>
              </th>
              <th className={cn('sub')}>Consensus Check</th>
              {dataCompare(proposalData.quorum.ConsensusBefore, proposalData.quorum.ConsensusAfter, '%')}
            </tr>
            <tr>
              <th className={cn('sub')}>Governance Check</th>
              {dataCompare(proposalData.quorum.GovernanceBefore, proposalData.quorum.GovernanceAfter, '%')}
            </tr>
            <tr className={cn('dark-line')}>
              <th rowSpan={2}>
                {t('governanceSet.detail.title.approval.strong') /* 가결조건 */}
                <span>{t('governanceSet.detail.title.approval.normal') /* (초과) */}</span>
              </th>
              <th className={cn('sub')}>Consensus Check</th>
              {dataCompare(proposalData.approval.ConsensusBefore, proposalData.approval.ConsensusAfter, '%')}
            </tr>
            <tr>
              <th className={cn('sub')}>Governance Check</th>
              {dataCompare(proposalData.approval.GovernanceBefore, proposalData.approval.GovernanceAfter, '%')}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GovernanceSettingCheck;
