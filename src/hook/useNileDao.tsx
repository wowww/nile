import { useCallback, useEffect, useMemo, useState } from 'react';
import { DaoStatus } from '@/types/dao/dao.types';
import dayjs from 'dayjs';
import { useCountdown } from '@utils/countdown';
import { useWonder } from '@/hook/useWonder';

export const useNileDao = () => {
  const [status, setStatus] = useState<DaoStatus>();
  const { wonderDao, wonderStations } = useWonder();
  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });

  const lastStation = useMemo(() => {
    return wonderStations?.at(0);
  }, [wonderStations]);

  const getStatus = useCallback(() => {
    const now = dayjs();
    const startTime = dayjs.utc(wonderDao?.startAt);
    const endTime = dayjs.utc(wonderDao?.endAt);

    if (!wonderDao?.status) return;

    if (now.isBefore(startTime)) {
      return DaoStatus.READY;
    }

    if (now.isBefore(endTime)) {
      return DaoStatus.OPEN;
    }

    if (now.isAfter(endTime)) {
      if (wonderDao?.status === DaoStatus.CONFIRM) {
        return DaoStatus.CONFIRM;
      }
      if (wonderDao?.status === DaoStatus.FAIL) {
        return DaoStatus.FAIL;
      }
      return DaoStatus.CLOSE;
    }
  }, [wonderDao]);

  const isStationClosed = useMemo(() => {
    return status === DaoStatus.FAIL || status === DaoStatus.CONFIRM || status === DaoStatus.CLOSE;
  }, [status]);

  useEffect(() => {
    const newStatus = getStatus();
    setStatus(newStatus);
  }, [remainTime]);

  return {
    lastStation,
    status,
    getStatus,
    isStationClosed,
  };
};
