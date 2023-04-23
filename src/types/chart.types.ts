export const TokenChartType = {
  PRICE: 'price',
  LIQUIDITY: 'liquidity',
  VOLUME: 'volume',
} as const;

export type TokenChartType = typeof TokenChartType[keyof typeof TokenChartType];

export const ChartPeriodType = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
} as const;

export type ChartPeriodType = typeof ChartPeriodType[keyof typeof ChartPeriodType];

export type PriceChartItemType = {
  value: number,
  date: number,
  changeRate?: number,
};