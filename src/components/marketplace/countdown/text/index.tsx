import { useCallback, useMemo } from 'react';
import { useCountdown } from '@utils/countdown';
import dayjs from 'dayjs';

export type TextAuctionCountdownProps = {
  expireTime: number;
  shrink?: boolean;
};

export const MarketCountdownText = ({ expireTime, shrink }: TextAuctionCountdownProps) => {
  const { remainTime } = useCountdown({ seconds: expireTime });

  const time = useMemo(() => {
    return dayjs.duration(remainTime, 'seconds');
  }, [remainTime]);

  const days = useMemo(() => {
    return Math.floor(time.asDays());
  }, [time]);

  const hours = useMemo(() => {
    return time.hours();
  }, [time]);

  const minutes = useMemo(() => {
    return time.minutes();
  }, [time]);

  const seconds = useMemo(() => {
    return time.seconds();
  }, [time]);

  // const remainTimeText = useMemo(() => {
  //   const time = dayjs().startOf('day').seconds(remainTime);
  //   if (shrink) {
  //     return time.hours() > 0 ? time.format('H[h] : m[m] : s[s]') : time.format('m[m] : ss[s]');
  //   }
  //   return time.format('H[h] : m[m] : s[s]');
  // }, [remainTime, shrink]);

  const formatted = useCallback((value: number, digit = 2) => {
    return value.toLocaleString('en-US', { minimumIntegerDigits: digit });
  }, []);

  return (
    <>
      {days > 0 && `${formatted(days)}d : `}
      {(hours > 0 || (hours === 0 && days > 0)) && `${formatted(hours)}h : `}
      {formatted(minutes)}m{days <= 0 && ` : ${formatted(seconds)}s`}
    </>
  );
};

MarketCountdownText.defaultProps = {
  shrink: false,
};
