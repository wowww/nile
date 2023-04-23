import { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Tabs, TabsProps } from 'antd';

import { headerHideFull } from '@/state/layoutAtom';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtom, useAtomValue } from 'jotai';

import OperationProtocol from '@/components/dao/station/recruit/OperationProtocol';
import OperationToken from '@/components/dao/station/recruit/OperationToken';
import OperationTokenomics from '@/components/dao/station/recruit/OperationTokenomics';
import ParticipateInfo from '@/components/dao/station/complete/ParticipateInfo';
import RecruitingParticipantProcedure from '@components/dao/station/RecruitingParticipantProcedure';
import DistributionMethod from '@components/dao/station/DistributionMethod';

import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

import useMediaQuery from '@/hook/useMediaQuery';
import StationParticipate from '@components/dao/station/complete/StationParticipate';
import LastRecruitingResult from '@components/dao/station/complete/LastRecruitingResult';
import TabMembers from '@components/dao/station/complete/TabMembers';
import ParticipantProcedure from '@components/dao/station/complete/ParticipantProcedure';
import { scroller } from 'react-scroll';
import { DaoStatus } from '@/types/dao/dao.types';
import { useWonder } from '@/hook/useWonder';

const StationStickyTab = () => {
  const { t } = useTranslation('dao');
  const [tabHeight, setTabHeight] = useState<number>(60);
  const activeDao = useAtomValue(daoThemeAtom);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const [headerHide, setHeaderHide] = useAtom(headerHideFull);

  const { wonderDao, wonderStations } = useWonder();

  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleScrollUp = () => {
    if (stickyHeaderRef.current) {
      stickyHeaderRef.current.classList.add('main-header-inhibitor');

      setHeaderHide(true);
    }
  };

  const tabItems: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: t('station.recruiting.tabs.button.4'),
        key: 'history',
        children: (
          <>
            <StationParticipate
              historyList={[
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
        key: 'participate-method',
        children: (
          <div className={cn('station-tab-content')}>
            <div className={cn('tab-content-title')}>
              <strong className={cn('title')}>{t('station.recruiting.tabs.title.0', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
            </div>
            {wonderDao?.status !== DaoStatus.CONFIRM && <ParticipateInfo />}
            {wonderDao?.status === DaoStatus.CONFIRM ? (
              <>
                <ParticipantProcedure isAdditional={Number(wonderStations?.at(0)?.reOpenId) !== 0} />
              </>
            ) : (
              <RecruitingParticipantProcedure />
            )}
            <div className={cn('station-tab-content-section')}>
              <DistributionMethod />
            </div>
          </div>
        ),
      },
      {
        label: t('station.recruiting.tabs.button.1'),
        key: 'operation-method',
        children: (
          <div className={cn('station-tab-content')}>
            <div className={cn('tab-content-title')}>
              <strong className={cn('title')}>{t('station.recruiting.tabs.title.1', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
            </div>
            <OperationProtocol />
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
  }, [wonderDao, t]);

  useEffect(() => {
    const navEl = stickyHeaderRef.current;
    if (navEl) {
      const offset = navEl.querySelector('.ant-tabs-nav-wrap')?.clientHeight || 62;
      setTabHeight(offset);
    }
  }, [stickyHeaderRef, isMobile]);

  const items = useMemo(() => {
    if(!wonderDao){
      return;
    }
    if (!wonderDao?.status || wonderDao?.status === DaoStatus.CONFIRM) return tabItems;
    return tabItems.slice(1, 3);
  }, [wonderDao, t]);

  return (
    <div className={cn('station-sticky-tab-wrap dao-sticky-tab-wrap', { active: headerHide })} id="station-sticky-tab-wrap" ref={stickyHeaderRef}>
      <Tabs
        items={items}
        className={cn('station-sticky-tab dao-sticky-tab')}
        id="station-sticky-tab"
        onChange={() => {
          if (stickyHeaderRef.current && stickyHeaderRef.current.getBoundingClientRect().top > 0) return;
          handleScrollUp();
          scroller.scrollTo('station-sticky-tab-wrap', {
            offset: tabHeight * -1 + (isMobile ? 60 : 40),
            duration: 200,
          });
        }}
      />
    </div>
  );
};

export default StationStickyTab;
