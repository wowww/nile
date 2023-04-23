import moment, { Moment } from 'moment';
import cn from 'classnames';
import { DatePicker, TimePicker } from 'antd';
import { ReactSVG } from 'react-svg';
import OutlineButton from '@components/button/OutlineButton';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { range } from 'lodash';
import { useTranslation } from 'next-i18next';

type MarketplaceDatePickerProps = {
  setTargetDate?: (v: Moment) => void;
};

export const MarketplaceDatePicker = ({ setTargetDate }: MarketplaceDatePickerProps) => {
  const { t } = useTranslation('marketplace');

  const [selectedDate, setSelectedDate] = useState<Moment | null>();
  const [selectedTime, setSelectedTime] = useState<Moment | null>();
  const [now, setNow] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const availableTime = useMemo(() => {
    return now.add(10, 'minute');
  }, [now]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const result = selectedDate.set('h', selectedTime.hour()).set('m', selectedTime.minute()).set('s', 0);
      setTargetDate?.(result);
    }
  }, [selectedDate, selectedTime]);

  const disabledDate = (current: Moment) => {
    return current < moment().add(10, 'minute').subtract(1, 'day').endOf('day');
  };

  const calHour = (now: Moment) => {
    if (selectedDate) {
      if (availableTime.day() === selectedDate.day()) {
        if (availableTime.hour() === 0) {
          return [];
        }
        return range(0, availableTime.hour());
      }
    }
    return [];
  };

  const calMinute = (now: Moment, selectedHour: number) => {
    if (selectedDate) {
      if (now.hour() === selectedHour) {
        if (availableTime.minute() === 0) {
          return [];
        }
        return range(0, availableTime.minute());
      }
    }
    return [];
  };

  const disabledTime = (now: Moment) => {
    return {
      disabledHours: () => calHour(now),
      disabledMinutes: (selectedHour: number) => calMinute(now, selectedHour),
    };
  };

  const setTime = useCallback(() => {
    const calMin = availableTime.minute() % 5 > 0 ? 5 * (Math.floor(availableTime.minute() / 5) + 1) : availableTime.minute();

    setSelectedDate(moment());
    setSelectedTime(availableTime.set('minute', calMin));
  }, []);

  return (
    <div className={cn('listing-form-wrap')}>
      <DatePicker
        value={selectedDate}
        placeholder="YYYY-MM-DD"
        className="listing-date-picker-calendar-wrap"
        popupClassName="listing-date-picker-calendar-popup"
        suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_date_picker.svg" />}
        inputReadOnly
        disabledDate={disabledDate}
        onChange={(date) => setSelectedDate(date)}
        showToday={false}
        allowClear={false}
      />
      <TimePicker
        value={selectedTime}
        use12Hours
        format="hh:mm a"
        placeholder="HH:MM"
        className="listing-time-picker-wrap"
        popupClassName="listing-time-picker-popup"
        minuteStep={5}
        inputReadOnly
        suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_time_picker.svg" />}
        disabledTime={(date) => disabledTime(date)}
        disabled={!selectedDate}
        onChange={(time) => setSelectedTime(time)}
        showNow={false}
        allowClear={false}
      />
      <button type="button" className={cn('btn-now-time')} onClick={setTime}>
        {t('listing.setStartingDate')}
      </button>
      {/* <OutlineButton buttonText={t('listing.setStartingDate')} color="black" size="md" onClick={setTime} /> */}
    </div>
  );
};
