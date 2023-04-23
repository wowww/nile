import dayjs, { Dayjs } from 'dayjs';

export const TimeFormat = {
  ONLY_DATE: 'YYYY-MM-DD',
  ONLY_TIME: 'HH:mm',
  STANDARD_WITHOUT_SECOND: 'YYYY-MM-DD HH:mm',
  STANDARD: 'YYYY-MM-DD HH:mm:ss',
  STANDARD_WITH_TIMEZONE: 'z YYYY-MM-DD hh:mm A',
};

export const utcToLocal = (date?: Dayjs | string, format?: string) => {
  if (!date) return date;
  return dayjs.utc(date).local().format(format);
};