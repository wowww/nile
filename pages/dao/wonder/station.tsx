import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAtomValue, useSetAtom } from 'jotai';
import { daoSelectedMenu, daoThemeAtom } from '@/state/daoAtom';

import { DaoBox, DaoBoxLayout } from '@/components/dao/DaoBoxLayout';
import DaoLayout from '@/components/dao/DaoLayout';
import StationStickyTab from '@/components/dao/station/StationStickyTab';
import RecruitMember from '@/components/dao/station/recruit/RecruitMember';
import DaoStationRecruit from '@components/dao/station/DaoStationRecruit';
import StationCompleteTop from '@components/dao/station/complete/StationCompleteTop';
import { DaoStatus } from '@/types/dao/dao.types';
import { useWonder } from '@/hook/useWonder';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import DaoStationRecruitSkeleton from '@components/dao/station/DaoStationRecruitSkeleton';

const DaoRecruiting = () => {
  const activeDao = useAtomValue(daoThemeAtom);
  const setDaoSelectedMenu = useSetAtom(daoSelectedMenu);
  const {
    wonderDao,
    wonderStations,
    wonderStationRealTimeInfo,
    refreshWonderDao,
    refreshWonderStations,
    refreshWonderStationRealTimeInfo,
    refreshWonderStationsUserInfo,
  } = useWonder();
  const nileWallet = useAtomValue(nileWalletAtom);

  const [onLoaded, handleOnLoaded] = useState<Boolean>(false);
  useEffect(() => {
    setDaoSelectedMenu('Station');

    if (!wonderDao) {
      refreshWonderDao();
    }
  }, [nileWallet]);

  useEffect(() => {
    if (wonderDao?.daoId) {
      refreshWonderStations();
      refreshWonderStationRealTimeInfo();
      refreshWonderStationsUserInfo();
    }
  }, [wonderDao]);

  const isMenuOpen = useMemo(() => {
    if (!wonderDao || !wonderStations) return 'recruiting';
    if (wonderDao?.status === DaoStatus.CONFIRM || Number(wonderStations?.at(0)?.reOpenId) !== 0) {
      return 'station';
    }
    return 'recruiting';
  }, [wonderDao, wonderStations]);

  const isConfirmed = useMemo(() => {
    if (!wonderDao || !wonderStations) return false;
    return wonderDao?.status === DaoStatus.CONFIRM;
  }, [wonderDao, wonderStations]);

  useEffect(() => {//RecruitMember가 나타나지 않는 경우 StationStickyTab handling
    if (
      wonderDao?.status &&
      wonderStationRealTimeInfo?.enterCount !== undefined &&
      (wonderDao?.status !== DaoStatus.OPEN || Number(wonderStationRealTimeInfo?.enterCount) === 0)
    ) {
      handleOnLoaded(true);
    }
  }, [wonderDao, wonderStationRealTimeInfo]);
  return (
    <>
      <Helmet>
        <title>WONDER DAO</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap', 'has-floating', `dao-${isMenuOpen}`)} />
      </Helmet>
      <div className={cn('recruiting-wrap')}>
        <DaoLayout activate="menu-station">
          {isConfirmed && <StationCompleteTop />}
          {wonderDao?.status !== DaoStatus.CONFIRM && wonderDao && wonderStations ? <DaoStationRecruit /> : <DaoStationRecruitSkeleton />}
          <DaoBoxLayout className={cn('recruiting-member-box')}>
            {wonderDao?.status === DaoStatus.OPEN && Number(wonderStationRealTimeInfo?.enterCount) > 0 && (
              <DaoBox>
                <RecruitMember handleOnLoaded={handleOnLoaded} />
              </DaoBox>
            )}
          </DaoBoxLayout>
          {onLoaded && <StationStickyTab />}
        </DaoLayout>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'daoHome', 'dao'])),
    },
  };
};

export default DaoRecruiting;
