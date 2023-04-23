import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Tabs } from 'antd';
import { animateScroll as scroll, scroller } from 'react-scroll';
import { headerHideFull } from '@/state/layoutAtom';
import { useAtom } from 'jotai';

import TabAbout from './TabAbout';
import TabMembers from './TabMembers';
import { useTranslation } from 'next-i18next';
import OperationProtocol from '@/components/dao/ui/station/recruit/OperationProtocol';
import OperationToken from '@/components/dao/ui/station/recruit/OperationToken';
import OperationTokenomics from '@/components/dao/ui/station/recruit/OperationTokenomics';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import StationParticipate from '@/components/dao/ui/station/complete/StationParticipate';
import LastRecruitingResult from '@/components/dao/ui/station/complete/LastRecruitingResult';
import useMediaQuery from '@/hook/useMediaQuery';

const StationTab = ({ isAdditional }: { isAdditional: boolean }) => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const [currentTab, setCurrentTab] = useState<string>('about');
  const [tabHeight, setTabHeight] = useState<number>(60);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const [headerHide, setHeaderHide] = useAtom(headerHideFull);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleScrollUp = () => {
    if (stickyHeaderRef.current) {
      stickyHeaderRef.current.classList.add('main-header-inhibitor');

      setHeaderHide(true);
    }
  };

  const ContentTabs = [
    {
      label: t('station.recruiting.tabs.button.4'),
      key: 'history',
      children: (
        <>
          {/* 
          'beforeWalletConnect' - 지갑 연결 전
          'beforeParticipate' - 참여 전
          'beforeAcquireRefund' - 획득 & 환급 전
          'afterAcquireRefund' - 획득 & 환급 후
           */}
          <StationParticipate
            status="afterAcquireRefund"
            historyList={[
              {
                step: 2,
                status: 'progress',
                date: '2023-01-03 11:50:56',
                participant: {
                  amount: 170001,
                  total: 1700010,
                },
                acquireRefund: {
                  acquire: 11800,
                  total: 200,
                },
              },
              {
                step: 1,
                status: 'done',
                date: '2023-01-13 11:50:56',
                participant: {
                  amount: 120000,
                  total: 1700010,
                },
                acquireRefund: {
                  acquire: 12800,
                  total: 200,
                },
              },
              {
                step: 0, // 최초모집
                status: 'done',
                date: '2023-01-23 11:50:56',
                participant: {
                  amount: 1200000,
                  total: 1700010,
                },
                acquireRefund: {
                  acquire: 13800,
                  total: 200,
                },
              },
            ]}
          />
          <LastRecruitingResult />
        </>
      ),
    },
    {
      label: t('station.recruiting.tabs.button.0'),
      key: 'about',
      children: (
        <div className={cn('station-tab-content')}>
          <div className={cn('tab-content-title')}>
            <strong className={cn('title')}>{t('station.recruiting.tabs.title.0', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
          </div>
          <TabAbout isAdditional={isAdditional} />
        </div>
      ),
    },
    {
      label: t('station.recruiting.tabs.button.1'),
      key: 'management',
      children: (
        <div className={cn('station-tab-content')}>
          <div className={cn('tab-content-title')}>
            <strong className={cn('title')}>{t('station.recruiting.tabs.title.1', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
          </div>
          <OperationProtocol smartContract={true} />
          <OperationToken />
          <OperationTokenomics />
        </div>
      ),
    },
    {
      label: t('station.recruiting.tabs.button.2'),
      key: 'members',
      children: <TabMembers />,
    },
  ];

  useEffect(() => {
    const navEl = stickyHeaderRef.current;
    if (navEl) {
      const offset = navEl.querySelector('.ant-tabs-nav-wrap')?.clientHeight || 62;
      setTabHeight(offset);
    }
  }, [stickyHeaderRef, isMobile]);

  return (
    <div className={cn('dao-station-tab dao-sticky-tab-wrap', { active: headerHide })} id="station-tab-wrap" ref={stickyHeaderRef}>
      <Tabs
        destroyInactiveTabPane
        className={cn('dao-sticky-tab')}
        id="station-tab"
        items={ContentTabs}
        onChange={() => {
          if (stickyHeaderRef.current && stickyHeaderRef.current.getBoundingClientRect().top > 0) return;
          handleScrollUp();
          scroller.scrollTo('station-tab-wrap', {
            offset: tabHeight * -1 + (isMobile ? 60 : 40),
            duration: 200,
          });
        }}
      />
    </div>
  );
};

export default StationTab;
