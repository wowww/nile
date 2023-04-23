import cn from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment-timezone';
import { useCountdown } from '@/hook/useCountdown';

interface TimeListType {
  target?: string;
}

const TimeListLower = ({ target }: TimeListType) => {
  const targetDate = moment.tz(target ?? process.env.NEXT_PUBLIC_ENV_NFT_SALE_START_DATE, 'Asia/Seoul');
  const remainSeconds = useMemo(() => targetDate.diff(moment(), 'seconds'), [targetDate]);
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
    <ul className={cn('auction-time')}>
      <li>
        <strong>{convertTime(days)}</strong>
        <span>Days</span>
      </li>
      <li>
        <strong>{convertTime(hours)}</strong>
        <span>Hours</span>
      </li>
      <li>
        <strong>{convertTime(minutes)}</strong>
        <span>Minutes</span>
      </li>
      <li>
        <strong>{convertTime(seconds)}</strong>
        <span>Seconds</span>
      </li>
    </ul>
  );
};

export default TimeListLower;
