import cn from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment-timezone';
import { useCountdown } from '@/hook/useCountdown';
import useScrollLock from '@/hook/useScrollLock';
import dayjs from "dayjs";

interface TimeListType {
  target?: string | any;
  type?: 'dot' | undefined;
}

const TimeList = ({ target, type }: TimeListType) => {
  const targetDate = dayjs.tz(target ?? process.env.NEXT_PUBLIC_ENV_NFT_SALE_START_DATE, 'Asia/Seoul');
  const remainSeconds = useMemo(() => targetDate.diff(dayjs(), 'seconds'), [targetDate]);
  const { remainTime } = useCountdown({ seconds: remainSeconds });

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const remain = moment.duration(remainTime, 'seconds');

    setDays(remain.days());
    setHours(remain.hours());
    setMinutes(remain.minutes());
    setSeconds(remain.seconds());
  }, [remainTime]);

  const convertTime = useCallback((time: number) => {
    if (time < 0) {
      return '00';
    }
    if (time < 10) {
      return `0${time}`;
    }

    return time;
  }, []);

  return (
    <ul className={cn('auction-time', type)}>
      <li>
        <strong>{convertTime(days)}</strong>
        <span>DAYS</span>
      </li>
      <li>
        <strong>{convertTime(hours)}</strong>
        <span>HOURS</span>
      </li>
      <li>
        <strong>{convertTime(minutes)}</strong>
        <span>MINUTES</span>
      </li>
      <li>
        <strong>{convertTime(seconds)}</strong>
        <span>SECONDS</span>
      </li>
    </ul>
  );
};

export default TimeList;
