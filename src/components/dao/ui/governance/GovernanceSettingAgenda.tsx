import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import BgButton from '@/components/button/BgButton';
import Empty from '@/components/empty/Empty';

interface Props {
  title?: string;
  isHeadlineUse?: boolean;
  children: React.ReactNode;
  isDate: boolean;
}

// Treasury 자금 사용
const TreasuryMoneyUse = React.memo(() => {
  const { t } = useTranslation('dao');
  return (
    <table className={cn('proposal-table')}>
      {/* 23.03.28 : 테이블 컬럼 정의 마크업 추가  */}
      <colgroup>
        <col className={cn('column2')} />
        <col className={cn('column2')} />
      </colgroup>
      <tbody>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab1.th1')}</th>
          <td>Trust 지갑</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab1.th2')}</th>
          <td>WEMIX</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab1.th3')}</th>
          <td>999,999,999.123456789123456789 WEMIX</td>
        </tr>
      </tbody>
    </table>
  );
});

// DAO 수익 분배 비율 변경
const DaoRatioEdit = React.memo(() => {
  const { t } = useTranslation('dao');
  return (
    <table className={cn('proposal-table')}>
      {/* 23.03.28 : 테이블 컬럼 정의 마크업 추가  */}
      <colgroup>
        <col className={cn('column3')} />
        <col className={cn('column3')} />
        <col className={cn('column3')} />
      </colgroup>
      <tbody>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab2.th1')}</th>
          <td>{t('governance.agenda.tab2.td1')}</td>
          <td>{t('governance.agenda.tab2.td2')}</td>
        </tr>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab1.th2')}</th>
          <td>30%</td>
          <td className={cn('is-changed')}>50%</td>
        </tr>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab1.th3')}</th>
          <td>70%</td>
          <td className={cn('is-changed')}>50%</td>
        </tr>
      </tbody>
    </table>
  );
});

// Buyback WONDER 분배 비율 변경
const WonderRatioEdit = React.memo(() => {
  const { t } = useTranslation('dao');
  return (
    <table className={cn('proposal-table')}>
      {/* 23.03.28 : 테이블 컬럼 정의 마크업 추가  */}
      <colgroup>
        <col className={cn('column3')} />
        <col className={cn('column3')} />
        <col className={cn('column3')} />
      </colgroup>
      <tbody>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab3.th1')}</th>
          <td>{t('governance.agenda.tab3.td1')}</td>
          <td>{t('governance.agenda.tab3.td2')}</td>
        </tr>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab3.th2')}</th>
          <td>30%</td>
          <td className={cn('is-changed')}>50%</td>
        </tr>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab3.th3')}</th>
          <td>70%</td>
          <td className={cn('is-changed')}>50%</td>
        </tr>
      </tbody>
    </table>
  );
});

// Governance 설정 변경
const GovernanceSettingEdit = React.memo(() => {
  const { t } = useTranslation('dao');
  return (
    <>
      <table className={cn('proposal-table')}>
        {/* 23.03.28 : 테이블 컬럼 정의 마크업 추가  */}
        <colgroup>
          <col className={cn('column4')} />
          <col className={cn('column2')} />
        </colgroup>
        <tbody>
          <tr>
            <th>{t('governance.agenda.tab4.th1')}</th>
            <td>{t('governanceSet.proposal.content')}</td>
          </tr>
        </tbody>
      </table>
      <table className={cn('detail-table')}>
        {/* 23.03.28 : 테이블 컬럼 정의 마크업 추가  */}
        <colgroup>
          <col className={cn('column4')} />
          <col className={cn('column4')} />
          <col className={cn('column4')} />
          <col className={cn('column4')} />
        </colgroup>
        <thead>
          <tr>
            <td colSpan={2}></td>
            <td>{t('governance.agenda.tab4.td1')}</td>
            <td>{t('governance.agenda.tab4.td2')}</td>
          </tr>
        </thead>
        <tbody>
          <tr className={cn('dark-line')}>
            <th colSpan={2}>{t('governance.agenda.tab4.th2') /* 안건 등록 조건 */}</th>
            <td>{t('governance.agenda.tab4.label2', { percent: 0.01 })}</td>
            <td>
              {t('governance.agenda.tab4.label2', { percent: 0.01 })} {t('governance.agenda.tab4.label6')}
            </td>
          </tr>
          <tr className={cn('dark-line')}>
            <th rowSpan={2}>{t('governance.agenda.tab4.th3') /* 투표기간 */}</th>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th4')}</th>
            <td>{t('governance.agenda.tab4.label3', { day: 1 })}</td>
            <td className={cn('is-changed')}>{t('governance.agenda.tab4.label3', { day: 3 })}</td>
          </tr>
          <tr>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th5')}</th>
            <td>{t('governance.agenda.tab4.label3', { day: 1 })}</td>
            <td>
              {t('governance.agenda.tab4.label3', { day: 1 })} {t('governance.agenda.tab4.label6')}
            </td>
          </tr>
          <tr className={cn('dark-line')}>
            {/* 23.03.28 : 불필요 공백 제거 */}
            <th rowSpan={2}>
              {t('governance.agenda.tab4.th6') /* 정족수 */}
              <span>{t('governance.agenda.tab4.th7') /* (이상) */}</span>
            </th>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th4')}</th>
            <td>{t('governance.agenda.tab4.label2', { percent: 5 })}</td>
            <td className={cn('is-changed')}>{t('governance.agenda.tab4.label2', { percent: 5 })}</td>
          </tr>
          <tr>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th5')}</th>
            <td>{t('governance.agenda.tab4.label2', { percent: 5 })}</td>
            <td>
              {t('governance.agenda.tab4.label2', { percent: 5 })} {t('governance.agenda.tab4.label6')}
            </td>
          </tr>
          <tr className={cn('dark-line')}>
            {/* 23.03.28 : 불필요 공백 제거 */}
            <th rowSpan={2}>
              {t('governance.agenda.tab4.th8') /* 가결조건 */}
              <span>{t('governance.agenda.tab4.th9') /* (초과) */}</span>
            </th>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th4')}</th>
            <td>{t('governance.agenda.tab4.label2', { percent: 30 })}</td>
            <td className={cn('is-changed')}>{t('governance.agenda.tab4.label2', { percent: 50.1234 })}</td>
          </tr>
          <tr>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th5')}</th>
            <td>{t('governance.agenda.tab4.label2', { percent: 50.1234 })}</td>
            <td>
              {t('governance.agenda.tab4.label2', { percent: 50.1234 })} {t('governance.agenda.tab4.label6')}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});

// Treasury 보관 Token 종류 변경
const TreasuryTokenEdit = React.memo(() => {
  const { t } = useTranslation('dao');
  return (
    <table className={cn('proposal-table')}>
      {/* 23.03.28 : 테이블 컬럼 정의 마크업 추가  */}
      <colgroup>
        <col className={cn('column2')} />
        <col className={cn('column2')} />
      </colgroup>
      <tbody>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab5.th1')}</th>
          <td>WEMIX</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab5.th2')}</th>
          <td>999,999,999.123456789123456789 WEMIX</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab5.th3')}</th>
          <td>
            <span>stWEMIX</span>
            <span className={cn('exchange')}>
              {t('governance.agenda.tab5.exchange1', { amount: '12, 083,000.123456789123456789', coin: 'stWEMIX' })}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
});

// Station 재오픈
const StationReOpen = React.memo(() => {
  const { t } = useTranslation('dao');
  return (
    <table className={cn('proposal-table')}>
      {/* 23.03.28 : 테이블 컬럼 정의 마크업 추가  */}
      <colgroup>
        <col className={cn('column2')} />
        <col className={cn('column2')} />
      </colgroup>
      <tbody>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab6.th1')}</th>
          <td>2023-01-02 11:00 AM ~ 2023-01-02 11:00 AM</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab6.th2')}</th>
          <td>999,999,999.123456789123456789 WEMIX</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab6.th3')}</th>
          <td>
            <span>1,200,000 WDR</span>
            <span className={cn('exchange')}>($1,5230.89)</span>
          </td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab6.th4')}</th>
          <td>10 WEMIX</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab6.th5')}</th>
          <td>1 WEMIX</td>
        </tr>
      </tbody>
    </table>
  );
});

// Trust Check 설정 변경
const TrustCheckSetting = React.memo(() => {
  const { t } = useTranslation('dao');
  return (
    <table className={cn('proposal-table')}>
      {/* 23.03.28 : 테이블 컬럼 정의 마크업 추가  */}
      <colgroup>
        <col className={cn('column3')} />
        <col className={cn('column3')} />
        <col className={cn('column3')} />
      </colgroup>
      <tbody>
        <tr className={cn('column-line')}>
          <td></td>
          <td>{t('governance.agenda.tab7.td1')}</td>
          <td>{t('governance.agenda.tab7.td2')}</td>
        </tr>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab7.th1')}</th>
          <td>{t('governance.agenda.tab7.label3', { day: 1 })}</td>
          <td className={cn('is-changed')}>{t('governance.agenda.tab7.label3', { day: 3 })}</td>
        </tr>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab7.th2')}</th>
          <td>{t('governance.agenda.tab7.label2', { percent: 30 })}</td>
          <td className={cn('is-changed')}>{t('governance.agenda.tab7.label2', { percent: 50 })}</td>
        </tr>
      </tbody>
    </table>
  );
});

// 기타 안건
const EtcAgenda = React.memo(() => {
  const { t } = useTranslation('dao');
  return (
    <table className={cn('proposal-table')}>
      <tbody>
        <tr>
          <th>{t('governance.agenda.tab8.th1')}</th>
        </tr>
        <tr>
          <td className={cn('etc-text')}>
            This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream
            and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here:
            https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          </td>
        </tr>
      </tbody>
    </table>
  );
});

// 안건 미 입력
const EmptyAgenda = React.memo(() => {
  const { t } = useTranslation('dao');
  return <Empty subText={t('governance.agenda.emptyAgenda')} iconType="none" />;
});

const GovernanceSettingAgenda = ({ title, children, isHeadlineUse = true, isDate = true }: Props) => {
  const { t } = useTranslation('dao');

  const contentRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (isOpen) {
  //     if (contentRef.current) {
  //       contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 1 + 'px';
  //     }
  //   } else {
  //     if (contentRef.current) {
  //       contentRef.current.style.maxHeight = '';
  //     }
  //   }
  // }, [isOpen]);

  return (
    <div className={cn('governance-setting-wrap')}>
      {isHeadlineUse && (
        <div className={cn('proposal-wrap')}>
          <span className={cn('tag')}>{t('governanceSet.title.tag')}</span>
          <div className={cn('tooltip-wrap')}>
            <strong>{title}</strong>
          </div>
        </div>
      )}
      <div className={cn('governance-setting-type-wrap')}>
        <div className={cn('check-title-wrap')}>
          <div>
            <span className={cn('tag')}>
              <span>01</span>
            </span>
            <strong className={cn('title')}>Temperature Check</strong>
          </div>
          <div>{isDate && <span className={cn('date')}>2023-07-10</span>}</div>
        </div>
        <div className={cn('agenda-cont-wrap')}>
          <div className={cn('check-content-wrap')} ref={contentRef}>
            {children}
          </div>
        </div>
        <div className={cn('bottom-btn-wrap')}>
          <BgButton buttonText={t('governance.agenda.modifying')} size="sm" color="soft" type="link" href={'/'} />
        </div>
      </div>
    </div>
  );
};

export default GovernanceSettingAgenda;
export {
  TreasuryMoneyUse,
  DaoRatioEdit,
  WonderRatioEdit,
  GovernanceSettingEdit,
  TreasuryTokenEdit,
  StationReOpen,
  TrustCheckSetting,
  EtcAgenda,
  EmptyAgenda,
};
