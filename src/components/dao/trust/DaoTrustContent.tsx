import { useState } from 'react';
import { Popover, Select, Tabs } from 'antd';
import cn from 'classnames';
import { i18n, useTranslation } from 'next-i18next';

import { DaoBox, DaoBoxLayout } from '@/components/dao/DaoBoxLayout';
import { ReactSVG } from 'react-svg';
import DaoTrustActivity from '@/components/dao/DaoTrustActivity';
import DaoNotice from '@/components/dao/DaoNotice';
import OutlineButton from '@/components/button/OutlineButton';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import ContractSendModal from '@/components/modal/ContractSendModal';
import TrustNoticeTab from '@components/dao/trust/content/TrustNoticeTab';
import TrustAboutTab from '@components/dao/trust/content/TrustAboutTab';
import TrustActivityTab from '@components/dao/trust/content/TrustActivityTab';

export type ContractDataType = {
  funding: string;
  token: number;
};

const DaoTrustContent = () => {
  const { t, i18n } = useTranslation('dao');
  const [currentTab, setCurrentTab] = useState<string>('about');
  // 새로운 공지 등록 시 newNotice 값 true
  const [newNotice, setNewNotice] = useState<boolean>(true);
  const activeDao = useAtomValue(daoThemeAtom);

  const ContentTabs = [
    {
      label: 'About',
      key: 'about',
      children: <TrustAboutTab />,
    },
    {
      label: 'Transactions',
      key: 'Transactions',
      children: <TrustActivityTab />,
    },
    {
      label: newNotice ? (
        <>
          {t('trust.notice')} <i className={cn('new-flag')}></i>
        </>
      ) : (
        t('trust.notice')
      ),
      key: 'notice',
      children: <TrustNoticeTab />,
    },
  ];

  return (
    <DaoBoxLayout>
      <div className={cn('dao-trust-tab')}>
        <Tabs
          destroyInactiveTabPane
          activeKey={currentTab}
          className={cn('tab-type', 'tab-xlg', 'tab-underline')}
          items={ContentTabs}
          onTabClick={(key: string) => {
            setCurrentTab(key);
          }}
        />
        <div className={cn('more-btn-st-wrap')}>
          <OutlineButton
            buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
            color="gray"
            size="sm"
            iconType={true}
            iconValue="line-arrow"
            align={true}
            href={'/wonderscan'}
          />
        </div>
      </div>
      {/* 23.03.30 수정: 모바일에서 버튼 위치 수정 */}
      {/* 23.03.21 수정: 모바일 더보기 레이아웃 분기 디자인 변경 */}
      <div className={cn('mobile-scan-btn')}>
        <div className={cn('more-btn-st-wrap')}>
          <OutlineButton
            buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
            color="gray"
            size="sm"
            iconType={true}
            iconValue="line-arrow"
            align={true}
            href={'/wonderscan'}
          />
        </div>
      </div>
    </DaoBoxLayout>
  );
};

export default DaoTrustContent;
