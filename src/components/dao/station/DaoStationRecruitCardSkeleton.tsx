import cn from 'classnames';
import React, { useEffect, useMemo } from 'react';
import { useWonder } from '@/hook/useWonder';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DaoStationRecruitCard = () => {
  const { t } = useTranslation('dao');

  const nileWallet = useAtomValue(nileWalletAtom);

  const {
    wonderDao,
    wonderStations,
    wonderStationRealTimeInfo,
    wonderStationUserInfo,
    refreshWonderStationRealTimeInfo,
    refreshWonderStationsUserInfo,
  } = useWonder();

  const lastStation = useMemo(() => {
    return wonderStations?.at(0);
  }, [wonderStations]);

  useEffect(() => {
    if (wonderDao?.daoId) {
      refreshWonderStationRealTimeInfo();

      if (nileWallet) {
        refreshWonderStationsUserInfo();
      }
    }
  }, [wonderDao, nileWallet]);

  const button = useMemo(() => {
    return <Skeleton height="37px" width="100%" baseColor="#5032a7" highlightColor="#5937ba" />;
  }, [wonderStationUserInfo, wonderDao, t, nileWallet, wonderStationRealTimeInfo]);

  return (
    <div className={cn('condition-card-wrap')}>
      <div className={cn('top-wrap')}>
        <strong className={cn('condition-main-title')}>
          <Skeleton baseColor="#5032a7" highlightColor="#5937ba" />
        </strong>
        <p className={cn('condition-date-wrap')}>
          <Skeleton baseColor="#5032a7" highlightColor="#5937ba" />
        </p>
        <div className={cn('recruitment-time')}>
          <Skeleton height="80px" baseColor="#5032a7" highlightColor="#5937ba" />
        </div>
      </div>
      <div className={cn('bottom-wrap')}>
        <div className={cn('recruitment-card-wrap', { notice: !wonderStations })}>
          <Skeleton baseColor="#5032a7" highlightColor="#5937ba" />
        </div>
        <div className={cn('btn-wrap skeleton-button')}>{button}</div>
      </div>
    </div>
  );
};

export default DaoStationRecruitCard;
