import { useState, useEffect, ReactNode } from 'react';
import cn from 'classnames';

import { useTranslation } from 'next-i18next';

import { Tabs } from 'antd';
import { DaoBox, DaoBoxLayout, DaoBoxTitle } from '@/components/dao/ui/DaoBoxLayout';
import SystemStation from '@/components/dao/ui/station/protocol/SystemStation';
import SystemTreasury from '@/components/dao/ui/station/protocol/SystemTreasury';
import SystemTrust from '@/components/dao/ui/station/protocol/SystemTrust';
import SystemIncinerator from '@/components/dao/ui/station/protocol/SystemIncinerator';
import SystemStakingPool from '@/components/dao/ui/station/protocol/SystemStakingPool';
import SystemGovernance from '@/components/dao/ui/station/protocol/SystemGovernance';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
/* 23.02.16 수정 start: 다오 테마 텍스트 관련 추가 */
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { daoThemeAtom } from '@/state/daoAtom';
/* 23.02.16 수정 end: 다오 테마 텍스트 관련 추가 */

import useMediaQuery from '@/hook/useMediaQuery';

const DaoStationProtocol = () => {
  const { t } = useTranslation('dao');
  const [currentTab, setCurrentTab] = useState<string>('station');

  const [isDaoWrap, setDaoWrap] = useState<boolean>(false);
  const [systemImage, setSystemImage] = useState<ReactNode>(
    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_protocol_system.svg" />,
  );
  /* 23.02.16 수정: 다오 테마 텍스트 관련 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');
  const isTablet1024 = useMediaQuery('(max-width: 1023px)');
  const isXl = useMediaQuery('(min-width: 1440px)');

  const stationTabs = [
    {
      label: 'Station',
      key: 'station',
      children: <SystemStation />,
    },
    {
      label: 'Treasury',
      key: 'treasury',
      children: <SystemTreasury />,
    },
    {
      label: 'Trust',
      key: 'trust',
      children: <SystemTrust />,
    },
    {
      label: 'Incinerator',
      key: 'incinerator',
      children: <SystemIncinerator />,
    },
    /* 23.02.20 수정 start: 메뉴명 변경 */
    {
      label: 'Obelisk',
      key: 'Obelisk',
      children: <SystemStakingPool />,
    },
    /* 23.02.20 수정 end: 메뉴명 변경 */
    {
      label: 'Governance',
      key: 'governance',
      children: <SystemGovernance />,
    },
  ];

  const systemImageHandler = () => {
    if (isDaoWrap && !isTablet && !isXl) {
      return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_protocol_system_lg.svg" />;
    } else if (isDaoWrap && !isMobile && isTablet1024) {
      return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_protocol_system_md.svg" />;
    } else if (!isDaoWrap && !isMobile && isTablet) {
      return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_protocol_system_md.svg" />;
    } else if (isMobile) {
      return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_protocol_system_sm.svg" />;
    } else {
      return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_protocol_system.svg" />;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const body = document.querySelector('body');

      if (body?.classList.contains('dao-wrap')) {
        setDaoWrap(true);
      }
    });
  }, [isDaoWrap]);

  useEffect(() => {
    setSystemImage(systemImageHandler());
  }, [isMobile, isTablet, isTablet1024, isXl, isDaoWrap]);

  return (
    <div className={cn('dao-protocol-container')}>
      <div className={cn('protocol-inner')}>
        <DaoBoxTitle title={t('station.title')} className="protocol-title" />
        <DaoBoxLayout type="half">
          <DaoBox className={cn('protocol-info')}>
            <h4>{t('station.neithProtocol.title')}</h4>
            {/* 23.02.16 수정: 다오 테마 텍스트 관련 추가 */}
            <p>{t('station.neithProtocol.desc', { type: useDaoCharacterConvert(activeDao.value) })} </p>
          </DaoBox>
          <DaoBox className={cn('protocol-info')}>
            <h4>{t('station.smartContract.title')}</h4>
            <p>{t('station.smartContract.desc')} </p>
          </DaoBox>
        </DaoBoxLayout>
        <DaoBoxLayout>
          <DaoBox className={cn('protocol-info')}>
            {/* 23.02.16 수정: 다오 테마 텍스트 관련 추가 */}
            <h4>{t('station.operationSystem.title', { type: useDaoCharacterConvert(activeDao.value) })}</h4>
            <div className={cn('protocol-system-image')}>
              {systemImage}
              {/* 23.02.20 수정: 메뉴명 변경 */}
              <span className={cn('a11y')}>Station, Treasury, Trust, Incinerator, Obelisk, Governance</span>
            </div>
            <div className={cn('protocol-system-tab')}>
              <Tabs
                destroyInactiveTabPane
                activeKey={currentTab}
                className={cn('tab-type', 'tab-md', 'tab-underline')}
                items={stationTabs}
                onTabClick={(key: string) => {
                  setCurrentTab(key);
                }}
              />
            </div>
          </DaoBox>
        </DaoBoxLayout>
      </div>
    </div>
  );
};

export default DaoStationProtocol;
