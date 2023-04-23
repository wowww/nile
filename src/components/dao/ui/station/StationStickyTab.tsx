import { ReactElement, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Tabs } from 'antd';
import * as Scroll from 'react-scroll';
import { animateScroll as scroll, scroller } from 'react-scroll';

import { headerHideFull } from '@/state/layoutAtom';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { useAtom } from 'jotai';

import OperationProtocol from '@/components/dao/ui/station/recruit/OperationProtocol';
import OperationToken from '@/components/dao/ui/station/recruit/OperationToken';
import OperationTokenomics from '@/components/dao/ui/station/recruit/OperationTokenomics';
import ParticipateInfo from '@/components/dao/ui/station/complete/ParticipateInfo';
import ParticipantProcedure from '@/components/dao/ui/station/recruit/ParticipantProcedure';
import DistributionMethod from '@/components/dao/ui/station/recruit/DistributionMethod';

import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

import useMediaQuery from '@/hook/useMediaQuery';

interface Props {}

const StationStickyTab = ({}: Props): ReactElement => {
  const { t } = useTranslation('dao');
  const [tabHeight, setTabHeight] = useState<number>(60);
  const activeDao = useAtomValue(daoThemeAtom);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const stickyTabRef = useRef<HTMLDivElement>(null);
  const [headerHide, setHeaderHide] = useAtom(headerHideFull);
  const [currentTab, setCurrentTab] = useState<string>('participate-method');

  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleScrollUp = () => {
    if (stickyHeaderRef.current) {
      stickyHeaderRef.current.classList.add('main-header-inhibitor');

      setHeaderHide(true);
    }
  };

  const tabItems = [
    {
      label: t('station.recruiting.tabs.button.0'),
      key: 'participate-method',
      children: (
        <div className={cn('station-tab-content')}>
          <div className={cn('tab-content-title')}>
            <strong className={cn('title')}>{t('station.recruiting.tabs.title.0', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
          </div>
          <ParticipateInfo />
          <ParticipantProcedure />
          <DistributionMethod />
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
  ];

  useEffect(() => {
    const navEl = stickyHeaderRef.current;
    if (navEl) {
      const offset = navEl.querySelector('.ant-tabs-nav-wrap')?.clientHeight || 62;
      setTabHeight(offset);
    }
  }, [stickyHeaderRef, isMobile]);

  return (
    <div className={cn('station-sticky-tab-wrap dao-sticky-tab-wrap', { active: headerHide })} id="station-sticky-tab-wrap" ref={stickyHeaderRef}>
      <Tabs
        items={tabItems}
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
