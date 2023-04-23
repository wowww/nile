import { useAtomValue, useSetAtom } from 'jotai';
import {
  refreshWonderDaoAtom,
  refreshWonderStationRealTimeInfoAtom,
  refreshWonderStationsAtom,
  refreshWonderStationUserInfoAtom,
  wonderDaoAtom,
  wonderStationAtom,
  wonderStationRealTimeInfoAtom,
  wonderStationUserInfoAtom,
} from '@/state/daoAtom';
import { refreshWonderProposalsAtom, wonderProposalsAtom } from '@/state/governanceAtom';

export const useWonder = () => {
  const refreshWonderDao = useSetAtom(refreshWonderDaoAtom);
  const refreshWonderStations = useSetAtom(refreshWonderStationsAtom);
  const refreshWonderStationRealTimeInfo = useSetAtom(refreshWonderStationRealTimeInfoAtom);
  const refreshWonderStationsUserInfo = useSetAtom(refreshWonderStationUserInfoAtom);
  const refreshWonderProposals = useSetAtom(refreshWonderProposalsAtom);

  const wonderDao = useAtomValue(wonderDaoAtom);
  const wonderStations = useAtomValue(wonderStationAtom);
  const wonderStationRealTimeInfo = useAtomValue(wonderStationRealTimeInfoAtom);
  const wonderStationUserInfo = useAtomValue(wonderStationUserInfoAtom);
  const wonderProposals = useAtomValue(wonderProposalsAtom);

  return {
    wonderDao,
    wonderStations,
    wonderProposals,
    wonderStationRealTimeInfo,
    wonderStationUserInfo,
    refreshWonderDao,
    refreshWonderStations,
    refreshWonderStationRealTimeInfo,
    refreshWonderStationsUserInfo,
    refreshWonderProposals,
  };
};