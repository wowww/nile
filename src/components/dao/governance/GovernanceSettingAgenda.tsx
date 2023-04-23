import React, {useEffect, useMemo, useRef, useState} from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import BgButton from '@/components/button/BgButton';
import Empty from '@/components/empty/Empty';
import {AgendaType, BasePolicyType, SubPolicyType} from '@/types/dao/proposal.types';
import { useAtomValue } from 'jotai';
import {
  distributionParamsAtom, governanceParamsAtom, reopenParamsAtom,
  revenueParamsAtom,
  swapParamsAtom,
  textParamAtom,
  treasuryParamsAtom, trustCheckParamAtom
} from '@/state/governanceAtom';
import { useNumberFormatter } from '@utils/formatter/number';
import { useWonder } from '@/hook/useWonder';
import { fromWei } from 'web3-utils';
import dayjs from "dayjs";
import {provider} from "@/state/nileWalletAtom";
import {daoAbis, daoJsonAbiAddress} from "@/web3/abis/dao";

// Treasury 자금 사용
const TreasuryMoneyUse = React.memo(() => {
  const { t } = useTranslation('dao');
  const params = useAtomValue(treasuryParamsAtom);
  const { toFix } = useNumberFormatter();

  return (
    <table className={cn('proposal-table')}>
      <colgroup>
        <col className={cn('column2')} />
        <col className={cn('column2')} />
      </colgroup>
      <tbody>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab1.th1')}</th>
          <td>{params?.receiver?.name}</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab1.th2')}</th>
          <td>{params?.fundAddr?.symbol}</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab1.th3')}</th>
          <td>{toFix(Number(params?.amount) ?? 0)} {params?.fundAddr?.symbol}</td>
        </tr>
      </tbody>
    </table>
  );
});

// DAO 수익 분배 비율 변경
const DaoRatioEdit = React.memo(() => {
  const { t } = useTranslation('dao');
  const params = useAtomValue(revenueParamsAtom);
  const { wonderDao } = useWonder();

  return (
    <table className={cn('proposal-table')}>
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
          <td>{fromWei(wonderDao?.revenueRatio ?? '', 'ether')}%</td>
          <td className={cn('is-changed')}>{params?.treasury}%</td>
        </tr>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab1.th3')}</th>
          <td>{String(100 - Number(fromWei(wonderDao?.revenueRatio ?? '', 'ether')))}%</td>
          <td className={cn('is-changed')}>{params?.incinerator}%</td>
        </tr>
      </tbody>
    </table>
  );
});

// Buyback WONDER 분배 비율 변경
const WonderRatioEdit = React.memo(() => {
  const { t } = useTranslation('dao');
  const params = useAtomValue(distributionParamsAtom);
  const { wonderDao } = useWonder();

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
          <td>{fromWei(wonderDao?.burnRatio ?? '', 'ether')}%</td>
          <td className={cn('is-changed')}>{params?.burnRatio}%</td>
        </tr>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab3.th3')}</th>
          <td>{String(100 - Number(fromWei(wonderDao?.burnRatio ?? '', 'ether')))}%</td>
          <td className={cn('is-changed')}>{params?.obelisk}%</td>
        </tr>
      </tbody>
    </table>
  );
});

// Governance 설정 변경
const GovernanceSettingEdit = React.memo(() => {
  const { t } = useTranslation('dao');
  const params = useAtomValue(governanceParamsAtom);
  const [subPolicy, setSubPolicy] = useState<SubPolicyType[]>();
  const { wonderDao } = useWonder();

  useEffect(() => {
    if (wonderDao?.daoId && params?.spellType?.value) {
      const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

      contract?.methods.getPolicy(wonderDao?.daoId, params?.spellType?.value).call(function (err: any, res: any) {
        console.log('policy >> ', res);
        setSubPolicy(res[1]);
      });
    }
  }, [wonderDao, params]);

  return (
    <>
      <table className={cn('proposal-table')}>
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
            <td>{t('governance.agenda.tab4.label2', { percent: fromWei(wonderDao?.baseRatio ?? "", 'ether') })}</td>
            <td>
              {t('governance.agenda.tab4.label2', { percent: params?.baseRatio?.value })} {fromWei(wonderDao?.baseRatio ?? '', 'ether') === params?.baseRatio?.value && t('governance.agenda.tab4.label6')}
            </td>
          </tr>
          <tr className={cn('dark-line')}>
            <th rowSpan={2}>{t('governance.agenda.tab4.th3') /* 투표기간 */}</th>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th4')}</th>
            <td>{t('governance.agenda.tab4.label3', { day: 1 })}</td>
            <td className={cn('is-changed')}>{t('governance.agenda.tab4.label3', { day: params?.subPolicy?.consensus?.deadline?.value })}</td>
          </tr>
          <tr>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th5')}</th>
            <td>{t('governance.agenda.tab4.label3', { day: 1 })}</td>
            <td>
              {t('governance.agenda.tab4.label3', { day: params?.subPolicy?.governance?.deadline?.value })} {t('governance.agenda.tab4.label6')}
            </td>
          </tr>
          <tr className={cn('dark-line')}>
            <th rowSpan={2}>
              {t('governance.agenda.tab4.th6') /* 정족수 */}
              <span>{t('governance.agenda.tab4.th7') /* (이상) */}</span>
            </th>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th4')}</th>
            <td>{t('governance.agenda.tab4.label2', { percent: 5 })}</td>
            <td className={cn('is-changed')}>{t('governance.agenda.tab4.label2', { percent: params?.subPolicy?.consensus?.quorum })}</td>
          </tr>
          <tr>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th5')}</th>
            <td>{t('governance.agenda.tab4.label2', { percent: 5 })}</td>
            <td>
              {t('governance.agenda.tab4.label2', { percent: params?.subPolicy?.governance?.quorum })} {t('governance.agenda.tab4.label6')}
            </td>
          </tr>
          <tr className={cn('dark-line')}>
            <th rowSpan={2}>
              {t('governance.agenda.tab4.th8') /* 가결조건 */}
              <span>{t('governance.agenda.tab4.th9') /* (초과) */}</span>
            </th>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th4')}</th>
            <td>{t('governance.agenda.tab4.label2', { percent: 30 })}</td>
            <td className={cn('is-changed')}>{t('governance.agenda.tab4.label2', { percent: params?.subPolicy?.consensus?.permitCutOff })}</td>
          </tr>
          <tr>
            <th className={cn('sub')}>{t('governance.agenda.tab4.th5')}</th>
            <td>{t('governance.agenda.tab4.label2', { percent: 50.1234 })}</td>
            <td>
              {t('governance.agenda.tab4.label2', { percent: params?.subPolicy?.governance?.permitCutOff })} {t('governance.agenda.tab4.label6')}
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
  const params = useAtomValue(swapParamsAtom);

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
          <td>{params?.payment?.symbol}</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab5.th2')}</th>
          <td>{params?.amount} WEMIX</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab5.th3')}</th>
          <td>
            <span>{params?.receipt?.symbol}</span>
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
  const params = useAtomValue(reopenParamsAtom);
  
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
          <td>
            {dayjs().format('YYYY-MM-DD hh:mm a')} ~{' '}
            {dayjs()
              .add(params?.period ?? 0, 'seconds')
              .format('YYYY-MM-DD hh:mm a')}
          </td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab6.th2')}</th>
          <td>{params?.purposeAmount} WEMIX</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab6.th3')}</th>
          <td>
            <span>{params?.addMintAmount} WDR</span>
            <span className={cn('exchange')}>($1,5230.89)</span>
          </td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab6.th4')}</th>
          <td>{params?.minEnterAmount} WEMIX</td>
        </tr>
        <tr className={cn('one-line')}>
          <th>{t('governance.agenda.tab6.th5')}</th>
          <td>{params?.unit} WEMIX</td>
        </tr>
      </tbody>
    </table>
  );
});

// Trust Check 설정 변경
const TrustCheckSetting = React.memo(() => {
  const { t } = useTranslation('dao');
  const params = useAtomValue(trustCheckParamAtom);
  const { wonderDao } = useWonder();

  const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

  let policy: BasePolicyType = {};
  contract?.methods.getPolicy(wonderDao, 3).call(function (err: any, res: any) {
    policy = res[0];
  });

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
          <td>{t('governance.agenda.tab7.label3', { day: policy?.emergencyPolicy?.emergencyDeadline })}</td>
          <td className={cn('is-changed')}>{t('governance.agenda.tab7.label3', { day: params?.deadline })}</td>
        </tr>
        <tr className={cn('column-line')}>
          <th>{t('governance.agenda.tab7.th2')}</th>
          <td>{t('governance.agenda.tab7.label2', { percent: policy?.emergencyPolicy?.emergencyPermitCutOff })}</td>
          <td className={cn('is-changed')}>{t('governance.agenda.tab7.label2', { percent: params?.permitCutOff })}</td>
        </tr>
      </tbody>
    </table>
  );
});

// 기타 안건
const EtcAgenda = React.memo(() => {
  const { t } = useTranslation('dao');
  const param = useAtomValue(textParamAtom);

  return (
    <table className={cn('proposal-table')}>
      <tbody>
        <tr>
          <th>{t('governance.agenda.tab8.th1')}</th>
        </tr>
        <tr>
          <td className={cn('etc-text')}>
            {param}
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

const GovernanceSettingAgenda = ({ setModalOpen, currentType }: { setModalOpen: (value: boolean) => void; currentType?: AgendaType }) => {
  const { t } = useTranslation('dao');

  const contentRef = useRef<HTMLDivElement>(null);

  const current = useMemo(() => {
    switch (currentType) {
      case AgendaType.TREASURY:
        return <TreasuryMoneyUse />;
      case AgendaType.REVENUE:
        return <DaoRatioEdit />;
      case AgendaType.DISTRIBUTION:
        return <WonderRatioEdit />;
      case AgendaType.GOVERNANCE:
        return <GovernanceSettingEdit />;
      case AgendaType.SWAP:
        return <TreasuryTokenEdit />;
      case AgendaType.REOPEN:
        return <StationReOpen />;
      case AgendaType.TRUST_CHECK:
        return <TrustCheckSetting />;
      case AgendaType.ETC:
        return <EtcAgenda />;
    }
  }, [currentType]);

  const title = useMemo(() => {
    switch (currentType) {
      case AgendaType.TREASURY:
        return t('governance.agenda.item.1');
      case AgendaType.REVENUE:
        return t('governance.agenda.item.2');
      case AgendaType.DISTRIBUTION:
        return t('governance.agenda.item.3');
      case AgendaType.GOVERNANCE:
        return t('governance.agenda.item.4');
      case AgendaType.SWAP:
        return t('governance.agenda.item.5');
      case AgendaType.REOPEN:
        return t('governance.agenda.item.6');
      case AgendaType.TRUST_CHECK:
        return t('governance.agenda.item.7');
      case AgendaType.ETC:
        return t('governance.agenda.item.8');
    }
  }, [currentType, t]);

  return (
    <>
      <div className={cn('governance-setting-wrap')}>
        {currentType ? (
          <>
            <div className={cn('proposal-wrap')}>
              <span className={cn('tag')}>{t('governanceSet.title.tag')}</span>
              <div className={cn('tooltip-wrap')}>
                <strong>{title}</strong>
              </div>
            </div>
            <div className={cn('governance-setting-type-wrap')}>
              <div className={cn('check-title-wrap')}>
                <div>
                  <span className={cn('tag')}>
                    <span>01</span>
                  </span>
                  <strong className={cn('title')}>Temperature Check</strong>
                </div>
                <div>
                  <span className={cn('date')}>2023-07-10</span>
                </div>
              </div>
              <div className={cn('agenda-cont-wrap')}>
                <div className={cn('check-content-wrap')} ref={contentRef}>
                  {current}
                </div>
              </div>
              <div className={cn('bottom-btn-wrap')}>
                <BgButton buttonText={t('governance.agenda.modifying')} size="sm" color="soft" type="link" onClick={() => setModalOpen(true)} />
              </div>
            </div>
          </>
        ) : (
          <div className={cn('governance-setting-type-wrap')}>
            <EmptyAgenda />
            <div className={cn('bottom-btn-wrap')}>
              <BgButton buttonText={t('governance.agenda.modifying')} size="sm" color="soft" type="link" onClick={() => setModalOpen(true)} />
            </div>
          </div>
        )}
      </div>
    </>
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
