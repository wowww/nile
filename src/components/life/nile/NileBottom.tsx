import { forwardRef, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Tabs } from 'antd';
import LifeNileNfts from '@/components/life/nile/LifeNileNfts';
import LifeNileOverView from '@/components/life/nile/LifeNileOverView';

const NileBottom = forwardRef<HTMLDivElement>(({}, ref) => {
  const [currentTab, setCurrentTab] = useState<string>('nfts');
  const { t } = useTranslation(['life', 'common']);

  const tangledTabs = [
    {
      label: 'nft',
      key: 'nfts',
      children: <LifeNileNfts />,
    },
    {
      label: 'Overview',
      key: 'overview',
      children: <LifeNileOverView />,
    },
  ];

  return (
    <div className={cn('life-nile-bottom-section')}>
      <Tabs
        destroyInactiveTabPane
        activeKey={currentTab}
        className={cn('tab-type tab-lg tab-full')}
        items={tangledTabs}
        onTabClick={(key: string) => {
          setCurrentTab(key);
        }}
      />
    </div>
  );
});

export default NileBottom;
