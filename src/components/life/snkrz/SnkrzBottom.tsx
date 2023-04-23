import { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Tabs } from 'antd';
import SnkrzMysteryBox from '@components/life/snkrz/SnkrzMysteryBox';
import SnkrzOverview from '@components/life/snkrz/SnkrzOverview';
// 22.11.17 수정: 스니커즈 배너 위치 이동으로 추가
import SnkrzSocialBanner from './SnkrzSocialBanner';

const SnkrzBottom = () => {
  const [currentTab, setCurrentTab] = useState<string>('mysteryBox');
  const { t } = useTranslation(['life', 'common']);

  const snkrzTabs = [
    {
      label: 'Mystery Box',
      key: 'mysteryBox',
      children: <SnkrzMysteryBox />,
    },
    {
      label: 'Overview',
      key: 'overview',
      children: <SnkrzOverview />,
    },
    // {
    //   label: 'Launchpad',
    //   key: 'launchpad',
    //   disabled: true,
    // },
  ];

  return (
    <div className={cn('life-snkrz-bottom-section')}>
      <Tabs
        destroyInactiveTabPane
        activeKey={currentTab}
        className={cn('tab-type tab-lg tab-full')}
        items={snkrzTabs}
        onTabClick={(key: string) => {
          setCurrentTab(key);
        }}
      />
      {/* 22.11.17 수정: 스니커즈 배너 위치 이동으로 추가 */}
      <SnkrzSocialBanner />
    </div>
  );
};

export default SnkrzBottom;
