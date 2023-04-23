import { TimeUnit } from '@amcharts/amcharts5/.internal/core/util/Time';

export type SlippageStateType = 'warning' | 'safe' | 'normal' | 'danger';

export interface SlippageDetailType {
  state: SlippageStateType;
  title: string;
  percent: string;
}

export interface TokenHistoryParams {
  token: string;
  unit: 'hour' | 'day' | 'month';
  type: 'price' | 'liquidity' | 'volume';
  unit_count: number;
}

export type ChartPeriodType = 'day' | 'week' | 'month' | 'year';
// for swap
export type chartKeyType = 'price' | 'liquidity' | 'volume';
// for pool
export type chartKeyType_P = 'liquidity' | 'volume';

export type DateType = 'MIN' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export const DateConst: { [Key in DateType]: TimeUnit } = {
  MIN: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export type PageInfoType = {
  hasNextPage: boolean;
  number: number;
  size: number;
  total: number;
}

export const defaultPageInfo = {
  number: 0,
  size: 0,
  total: 0,
  hasNextPage: false,
};

export interface ChartBoundaryOutput {
  isSmallDiff: boolean;
  max?: number;
  min?: number;
}