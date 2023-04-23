import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import FlipUnitContainer from './FlipUnitContainer';
import { useCountdown } from '@/hook/useCountdown';
import dayjs from 'dayjs';

interface FlipClock {
  inputDate?: string;
  refresh?: () => void;
}

const FlipClock = ({ inputDate, refresh }: FlipClock) => {
  const targetDay = dayjs.utc(inputDate);
  // const targetDate = moment.utc(inputDate);
  const remainSeconds = useMemo(() => targetDay.diff(dayjs.utc(), 'seconds'), [targetDay]);
  const { remainTime } = useCountdown({ seconds: remainSeconds });

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const remain = dayjs.duration(remainTime, 'seconds');

    setDays(remain.days());
    setHours(remain.hours());
    setMinutes(remain.minutes());
    setSeconds(remain.seconds());

    if (remainTime <= 0) {
      refresh?.();
    }
  }, [remainTime]);

  const [shuffle, setShuffle] = useState<{ days: boolean; hours: boolean; minutes: boolean; seconds: boolean }>({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  useEffect(() => {
    setShuffle((prev) => ({ ...prev, days: !prev.days }));
  }, [days]);

  useEffect(() => {
    setShuffle((prev) => ({ ...prev, hours: !prev.hours }));
  }, [hours]);

  useEffect(() => {
    setShuffle((prev) => ({ ...prev, minutes: !prev.minutes }));
  }, [minutes]);

  useEffect(() => {
    setShuffle((prev) => ({ ...prev, seconds: !prev.seconds }));
  }, [seconds]);

  return (
    <div className={cn('time-flicker')}>
      <div className="flip-clock">
        <div className={cn('unit-wrap')}>
          <FlipUnitContainer unit="days" digit={days} shuffle={shuffle.days} />
          <span className={cn('unit-text')}>DAYS</span>
        </div>
        <div className={cn('unit-wrap')}>
          <FlipUnitContainer unit="hours" digit={hours} shuffle={shuffle.hours} />
          <span className={cn('unit-text')}>HOURS</span>
        </div>
        <div className={cn('unit-wrap')}>
          <FlipUnitContainer unit="minutes" digit={minutes} shuffle={shuffle.minutes} />
          <span className={cn('unit-text')}>MINUTES</span>
        </div>
        <div className={cn('unit-wrap')}>
          <FlipUnitContainer unit="seconds" digit={seconds} shuffle={shuffle.seconds} />
          <span className={cn('unit-text')}>SECONDS</span>
        </div>
      </div>
    </div>
  );
};

export default FlipClock;
