import { useState } from 'react';
import { Tabs } from 'antd';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Switch } from 'antd';
import useMediaQuery from '@/hook/useMediaQuery';

// tab components
import TemperatureTabContent from './TemperatureTabContent';
import ConsensusTabContent from './ConsensusTabContent';
import GovernanceTabContent from './GovernanceTabContent';

const GovernanceTab = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDaoTablet = useMediaQuery('(max-width: 1023px)');
  const { t } = useTranslation('dao');
  const [currentTab, setCurrentTab] = useState<string>('temperature');

  const governanceTabs = [
    {
      label: 'Temperature\nCheck (0)',
      key: 'temperature',
      children: (
        <TemperatureTabContent
          chipsList={[
            {
              name: 'All',
              value: 'all',
              count: 0,
            },
            {
              name: 'Active',
              value: 'active',
              count: 0,
            },
            {
              name: 'Passed',
              value: 'passed',
              count: 0,
            },
            {
              name: 'Rejected',
              value: 'rejected',
              count: 0,
            },
          ]}
          type="temperature"
        />
      ),
    },
    {
      label: (
        <>
          {`Consensus\nCheck (0)`}
          <i className={cn('new')}>
            <span className={cn('a11y')}>new</span>
          </i>
        </>
      ),
      key: 'consensus (120)',
      children: (
        <ConsensusTabContent
          chipsList={[
            {
              name: 'All',
              value: 'all',
              count: 344,
            },
            {
              name: 'Active',
              value: 'active',
              count: 2,
            },
            {
              name: 'Passed',
              value: 'passed',
              count: 300,
            },
            {
              name: 'Rejected',
              value: 'rejected',
              count: 20,
            },
          ]}
          type="consensus"
        />
      ),
    },
    {
      label: 'Governance\nCheck (0)',
      key: 'governance (120)',
      children: (
        <GovernanceTabContent
          chipsList={[
            {
              name: 'All',
              value: 'all',
              count: 344,
            },
            {
              name: 'Active',
              value: 'active',
              count: 2,
            },
            {
              name: 'Executed',
              value: 'executed',
              count: 300,
            },
            {
              name: 'Rejected',
              value: 'rejected',
              count: 20,
            },
          ]}
          type="governance"
        />
      ),
    },
  ];

  return (
    <div className={cn('governance-tab-wrap')}>
      {!isDaoTablet && (
        <div className={cn('switch-button-wrap-md-sm')}>
          <SwitchButton />
        </div>
      )}
      <Tabs
        destroyInactiveTabPane
        activeKey={currentTab}
        items={governanceTabs}
        onTabClick={(key: string) => {
          setCurrentTab(key);
        }}
        tabBarExtraContent={
          <div className={cn('switch-button-wrap-lg')}>
            <SwitchButton />
          </div>
        }
        className={cn('tab-type', 'tab-lg', { 'tab-full': isDaoTablet })}
      />
    </div>
  );
};

const SwitchButton = () => {
  const { t } = useTranslation('dao');
  return (
    <div className={cn('switch-button')}>
      <span>{t('governance.viewMyAgenda')}</span>
      <Switch />
    </div>
  );
};
export default GovernanceTab;
