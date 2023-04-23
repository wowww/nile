import React from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import GovernanceSettingCheck from './GovernanceSettingCheck';

interface Props {
  // 현재 진행중인 세팅 정의
  type: 'Temperature' | 'Consensus' | 'Governance' | 'Trust' | 'Agenda';
}

const GovernanceSetting = ({ type }: Props) => {
  const { t } = useTranslation('dao');

  const typeRender = () => {
    switch (type) {
      case 'Temperature':
        return <GovernanceSettingCheck type="Temperature" />;
      case 'Consensus':
        return (
          <>
            <GovernanceSettingCheck type="Consensus" />
            <GovernanceSettingCheck type="Temperature" change={{ type: true, compare: type }} more />
          </>
        );
      case 'Governance':
        return (
          <>
            <GovernanceSettingCheck type="Governance" />
            <GovernanceSettingCheck type="Consensus" change={{ type: false, compare: type }} more />
            <GovernanceSettingCheck type="Temperature" change={{ type: true, compare: type }} more />
          </>
        );
      case 'Trust':
        return <GovernanceSettingCheck type="Trust" />;
      default:
        return <></>;
    }
  };

  return (
    <div className={cn('governance-setting-wrap')}>
      <div className={cn('proposal-wrap')}>
        <span className={cn('tag')}>{t('governanceSet.title.tag')}</span>
        <div className={cn('tooltip-wrap')}>
          <strong>{t('governanceSet.title.text')}</strong>
        </div>
      </div>
      {typeRender()}
    </div>
  );
};

export default GovernanceSetting;
