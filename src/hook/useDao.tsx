import { useCallback, useEffect, useMemo, useState } from 'react';
import { StationStatus, NileDao } from '@/types/dao/dao.types';
import dayjs from 'dayjs';
import { useCountdown } from '@utils/countdown';
import { MarketNftItemStatusType } from '@/services/nile/api';
import {useAtomValue} from "jotai";
import {nileWalletAtom} from "@/state/nileWalletAtom";

export const useDao = (dao: NileDao | undefined) => {
  const nileWallet = useAtomValue(nileWalletAtom);

  const [status, setStatus] = useState<StationStatus>();
  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });

  const getDaoRecruitmentStatus = useCallback(() => {
    const now = dayjs();
    const startTime = dayjs.utc(dao?.startAt);
    const endTime = dayjs.utc(dao?.endAt);

    if (now.isBefore(startTime)) {
      return StationStatus.BEFORE_RECRUITMENT;
    }

    if (now.isBefore(endTime)) {
      return StationStatus.RECRUITING;
    }

    if ((dao?.current ?? 0) >= (dao?.goal ?? 0)) {
      return StationStatus.RECRUITMENT_SUCCESS;
    }

    return StationStatus.RECRUITMENT_FAILED;
  }, [dao]);

  const hasJoinRecruit = useMemo(() => {
    return dao?.participants?.find((item) => item.address?.toLowerCase() === nileWallet?.toLowerCase());
  }, [dao, nileWallet]);

  useEffect(() => {
    const newStatus = getDaoRecruitmentStatus();
    setStatus(newStatus);
  }, [remainTime, dao]);

  return {
    status,
    getDaoRecruitmentStatus,
    hasJoinRecruit,
  };
};
