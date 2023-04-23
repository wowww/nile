import { useEffect, useState } from 'react';
import cn from 'classnames';
import useInterval from '@/hook/useInterval';

import FlipUnitContainer from './FlipUnitContainer';
import dayjs from 'dayjs';
import moment from 'moment';

const FlipClock = ({ inputDate }: { inputDate: string }) => {
  let targetDate = dayjs(inputDate);
  let currentDate = dayjs();

  let timeDifference = targetDate.diff(currentDate);

  const isDateRemain = timeDifference > 0 ? true : false;

  let duration = dayjs.duration(timeDifference);

  let daysRemaining = duration.days();
  let hoursRemaining = duration.hours();
  let minutesRemaining = duration.minutes();
  let secondsRemaining = duration.seconds();

  const [date, setDate] = useState({
    days: 0,
    daysShuffle: false,
    hours: 0,
    hoursShuffle: false,
    minutes: 0,
    minutesShuffle: false,
    seconds: 0,
    secondsShuffle: false,
  });

  useEffect(() => {
    if (timeDifference < 0) {
      setDate((date) => ({
        ...date,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }));
    } else {
      setDate({
        days: daysRemaining,
        daysShuffle: false,
        hours: hoursRemaining,
        hoursShuffle: false,
        minutes: minutesRemaining,
        minutesShuffle: false,
        seconds: secondsRemaining,
        secondsShuffle: false,
      });
    }
  }, []);

  const updateTime = () => {
    let currentDate = dayjs();

    let timeDifference = targetDate.diff(currentDate);

    let duration = moment.duration(timeDifference);

    let days = duration.days();
    let hours = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();

    if (timeDifference < 0) {
      setDate((date) => ({
        ...date,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }));
      return;
    }

    if (days !== date.days) {
      const daysShuffle = !date.daysShuffle;
      setDate((date) => ({
        ...date,
        days,
        daysShuffle,
      }));
    }

    if (hours !== date.hours) {
      const hoursShuffle = !date.hoursShuffle;
      setDate((date) => ({
        ...date,
        hours,
        hoursShuffle,
      }));
    }

    if (minutes !== date.minutes) {
      const minutesShuffle = !date.minutesShuffle;
      setDate((date) => ({
        ...date,
        minutes: minutes,
        minutesShuffle: minutesShuffle,
      }));
    }

    if (seconds !== date.seconds) {
      const secondsShuffle = !date.secondsShuffle;
      setDate((date) => {
        return {
          ...date,
          seconds: seconds,
          secondsShuffle: secondsShuffle,
        };
      });
    }
  };

  useInterval(() => updateTime(), 50);

  return (
    <div className={cn('time-flicker')}>
      <div className={'flip-clock'}>
        <div className={cn('unit-wrap')}>
          <FlipUnitContainer unit={'days'} digit={date.days} shuffle={date.daysShuffle} />
          <span className={cn('unit-text')}>DAYS</span>
        </div>
        <div className={cn('unit-wrap')}>
          <FlipUnitContainer unit={'hours'} digit={date.hours} shuffle={date.hoursShuffle} />
          <span className={cn('unit-text')}>HOURS</span>
        </div>
        <div className={cn('unit-wrap')}>
          <FlipUnitContainer unit={'minutes'} digit={date.minutes} shuffle={date.minutesShuffle} />
          <span className={cn('unit-text')}>MINUTES</span>
        </div>
        <div className={cn('unit-wrap')}>
          <FlipUnitContainer unit={'seconds'} digit={date.seconds} shuffle={date.secondsShuffle} />
          <span className={cn('unit-text')}>SECONDS</span>
        </div>
      </div>
    </div>
  );
};

export default FlipClock;
