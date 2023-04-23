import { atom } from 'jotai';
import { ChartPeriodType } from '@/types/common.types';

export interface stackedChartDefaultData {
  date: number | undefined;
  total: number | undefined;
  WBNB: number | undefined;
  USDT: number | undefined;
  BUSD: number | undefined;
  etc: number | undefined;
}

export interface stackedChartTokenDataType {
  date: number | undefined;
  total: number | undefined;
  TIPO: number | undefined;
  FRC: number | undefined;
}

// 23.04.05 수정: frc 추가로 mockup 데이터 수정
// TIPO + FRC
export const stackedChartTokenData: stackedChartTokenDataType[] = [
  {
    date: new Date(2022, 7, 12).getTime(),
    total: 0,
    TIPO: 1.41,
    FRC: 2.51,
  },
  {
    date: new Date(2022, 7, 13).getTime(),
    total: 0,
    TIPO: 1.41,
    FRC: 2.51,
  },
  {
    date: new Date(2022, 7, 14).getTime(),
    total: 0,
    TIPO: 1.71,
    FRC: 2.71,
  },
  {
    date: new Date(2022, 7, 15).getTime(),
    total: 0,
    TIPO: 1.34,
    FRC: 2.34,
  },
  {
    date: new Date(2022, 7, 16).getTime(),
    total: 0,
    TIPO: 1.44,
    FRC: 2.44,
  },
  {
    date: new Date(2022, 7, 17).getTime(),
    total: 0,
    TIPO: 1.81,
    FRC: 2.81,
  },
  {
    date: new Date(2022, 7, 18).getTime(),
    total: 0,
    TIPO: 2.31,
    FRC: 2.31,
  },
  {
    date: new Date(2022, 7, 19).getTime(),
    total: 0,
    TIPO: 2.51,
    FRC: 2.51,
  },
  {
    date: new Date(2022, 7, 20).getTime(),
    total: 0,
    TIPO: 5.5,
    FRC: 6.5,
  },
  {
    date: new Date(2022, 7, 21).getTime(),
    total: 0,
    TIPO: 10.04,
    FRC: 12.04,
  },
  {
    date: new Date(2022, 7, 22).getTime(),
    total: 0,
    TIPO: 11.23,
    FRC: 13.71,
  },
  {
    date: new Date(2022, 7, 23).getTime(),
    total: 0,
    TIPO: 11.23,
    FRC: 10.71,
  },
];

// 오픈 후
export const stackedChartDefaultData = [
  {
    date: new Date(2022, 7, 12).getTime(),
    total: 0,
    WBNB: 1.31,
    USDT: 0.99,
    BUSD: 0.78,
    etc: 0.4,
  },
  {
    date: new Date(2022, 8, 13).getTime(),
    total: 0,
    WBNB: 1.41,
    USDT: 0.9,
    BUSD: 0.7,
    etc: 0.6,
  },
  {
    date: new Date(2022, 9, 14).getTime(),
    total: 0,
    WBNB: 1.71,
    USDT: 1.32,
    BUSD: 1.01,
    etc: 0.87,
  },
  {
    date: new Date(2022, 10, 15).getTime(),
    total: 0,
    WBNB: 1.34,
    USDT: 0.87,
    BUSD: 0.63,
    etc: 0.6,
  },
  {
    date: new Date(2022, 11, 15).getTime(),
    total: 0,
    WBNB: 1.44,
    USDT: 0.97,
    BUSD: 0.73,
    etc: 0.5,
  },
  {
    date: new Date(2022, 12, 15).getTime(),
    total: 0,
    WBNB: 1.81,
    USDT: 1.38,
    BUSD: 1.11,
    etc: 0.9,
  },
  {
    date: new Date(2023, 1, 15).getTime(),
    total: 0,
    WBNB: 2.31,
    USDT: 1.98,
    BUSD: 1.61,
    etc: 1.3,
  },
  {
    date: new Date(2023, 2, 19).getTime(),
    total: 0,
    WBNB: 2.51,
    USDT: 2.18,
    BUSD: 1.81,
    etc: 1.4,
  },
  {
    date: new Date(2023, 3, 20).getTime(),
    total: 0,
    WBNB: 5.5,
    USDT: 2.2,
    BUSD: 1.71,
    etc: 1.6,
  },
  {
    date: new Date(2023, 4, 21).getTime(),
    total: 0,
    WBNB: 10.04,
    USDT: 2.9,
    BUSD: 1.81,
    etc: 1.11,
  },
  {
    date: new Date(2023, 5, 22).getTime(),
    total: 0,
    WBNB: 11.23,
    USDT: 1.02,
    BUSD: 2.32,
    etc: 0.35,
  },
  {
    date: new Date(2023, 6, 22).getTime(),
    total: 0,
    WBNB: 11.23,
    USDT: 1.02,
    BUSD: 4.32,
    etc: 1.25,
  },
];

export const totalFuncStacked = stackedChartDefaultData.forEach((el, index) => {
  el.total = el.WBNB + el.USDT + el.BUSD + el.etc;
});

export const StackedChartData = atom([...stackedChartTokenData]);

// 오픈 전
export const stackChartDefaultData = [
  {
    date: new Date(2022, 8, 22).getTime(),
    value: 2.0,
  },
  {
    date: new Date(2022, 8, 23).getTime(),
    value: 2.56,
  },
  {
    date: new Date(2022, 8, 24).getTime(),
    value: 4.86,
  },
  {
    date: new Date(2022, 8, 25).getTime(),
    value: 4.3,
  },
  {
    date: new Date(2022, 8, 26).getTime(),
    value: 3.3,
  },
  {
    date: new Date(2022, 8, 27).getTime(),
    value: 4.5,
  },
  {
    date: new Date(2022, 8, 28).getTime(),
    value: 3.24,
  },
  {
    date: new Date(2022, 8, 29).getTime(),
    value: 5.2,
  },
  {
    date: new Date(2022, 8, 30).getTime(),
    value: 4.1,
  },
  {
    date: new Date(2022, 9, 1).getTime(),
    value: 5.0,
  },
  {
    date: new Date(2022, 9, 2).getTime(),
    value: 8.2,
  },
  {
    date: new Date(2022, 9, 3).getTime(),
    value: 8.3,
  },
  {
    date: new Date(2022, 9, 4).getTime(),
    value: 8.45,
  },
  {
    date: new Date(2022, 9, 5).getTime(),
    value: 9.1,
  },
  {
    date: new Date(2022, 9, 6).getTime(),
    value: 13.2,
  },
  {
    date: new Date(2022, 9, 7).getTime(),
    value: 14.58,
  },
  {
    date: new Date(2022, 9, 8).getTime(),
    value: 14.2,
  },
  {
    date: new Date(2022, 9, 9).getTime(),
    value: 14.5,
  },
  {
    date: new Date(2022, 9, 10).getTime(),
    value: 15.01,
  },
  {
    date: new Date(2022, 9, 11).getTime(),
    value: 15.0,
  },
  {
    date: new Date(2022, 9, 12).getTime(),
    value: 15.12,
  },
  {
    date: new Date(2022, 9, 13).getTime(),
    value: 15.03,
  },
  {
    date: new Date(2022, 9, 14).getTime(),
    value: 15.45,
  },
];

export const StackChartData = atom([...stackChartDefaultData]);

export const StackChartFilterState = atom<'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'>('year');

export const TinyChartDefaultData = [
  {
    date: new Date(2022, 7, 13, 0, 0).getTime(),
    value: 209.01,
  },
  {
    date: new Date(2022, 7, 13, 1, 0).getTime(),
    value: 130.0,
  },
  {
    date: new Date(2022, 7, 13, 2, 0).getTime(),
    value: 110.12,
  },
  {
    date: new Date(2022, 7, 13, 3, 0).getTime(),
    value: 160.12,
  },
  {
    date: new Date(2022, 7, 13, 4, 0).getTime(),
    value: 130.03,
  },
  {
    date: new Date(2022, 7, 13, 5, 0).getTime(),
    value: 240.01,
  },
  {
    date: new Date(2022, 7, 13, 6, 0).getTime(),
    value: 240.01,
  },
  {
    date: new Date(2022, 7, 13, 7, 0).getTime(),
    value: 250.2,
  },
  {
    date: new Date(2022, 7, 13, 8, 0).getTime(),
    value: 210.2,
  },
  {
    date: new Date(2022, 7, 13, 9, 0).getTime(),
    value: 260.2,
  },
  {
    date: new Date(2022, 7, 13, 10, 0).getTime(),
    value: 200.2,
  },
  {
    date: new Date(2022, 7, 13, 11, 0).getTime(),
    value: 22.01,
  },
];

export const TinyChartData = atom([...TinyChartDefaultData]);

export const TinyChartFilterState = atom<ChartPeriodType>('day');

export const TinyChartDefaultHourData = [
  {
    date: new Date(2022, 8, 18, 0, 0).getTime(),
    value: 15.0,
  },
  {
    date: new Date(2022, 8, 18, 1, 0).getTime(),
    value: 10.0,
  },
  {
    date: new Date(2022, 8, 18, 2, 0).getTime(),
    value: 6.12,
  },
  {
    date: new Date(2022, 8, 18, 3, 0).getTime(),
    value: 3.03,
  },
  {
    date: new Date(2022, 8, 18, 4, 0).getTime(),
    value: 4.01,
  },
  {
    date: new Date(2022, 8, 18, 5, 0).getTime(),
    value: 12.01,
  },
  {
    date: new Date(2022, 8, 18, 6, 0).getTime(),
    value: 14.2,
  },
  {
    date: new Date(2022, 8, 18, 7, 0).getTime(),
    value: 13.2,
  },
  {
    date: new Date(2022, 8, 18, 8, 0).getTime(),
    value: 11.2,
  },
  {
    date: new Date(2022, 8, 18, 9, 0).getTime(),
    value: 9.01,
  },
  {
    date: new Date(2022, 8, 18, 10, 0).getTime(),
    value: 8.0,
  },
  {
    date: new Date(2022, 8, 18, 11, 0).getTime(),
    value: 2.01,
  },
  {
    date: new Date(2022, 8, 18, 12, 0).getTime(),
    value: 6.02,
  },
  {
    date: new Date(2022, 8, 18, 13, 0).getTime(),
    value: 13.03,
  },
  {
    date: new Date(2022, 8, 18, 14, 0).getTime(),
    value: 14.01,
  },
  {
    date: new Date(2022, 8, 18, 15, 0).getTime(),
    value: 13.0,
  },
  {
    date: new Date(2022, 8, 18, 16, 0).getTime(),
    value: 5.2,
  },
  {
    date: new Date(2022, 8, 18, 17, 0).getTime(),
    value: 6.2,
  },
  {
    date: new Date(2022, 8, 18, 18, 0).getTime(),
    value: 9.01,
  },
  {
    date: new Date(2022, 8, 18, 19, 0).getTime(),
    value: 13.01,
  },
  {
    date: new Date(2022, 8, 18, 20, 0).getTime(),
    value: 4.01,
  },
  {
    date: new Date(2022, 8, 18, 21, 0).getTime(),
    value: 6.2,
  },
  {
    date: new Date(2022, 8, 18, 22, 0).getTime(),
    value: 13.01,
  },
  {
    date: new Date(2022, 8, 18, 23, 0).getTime(),
    value: 12.01,
  },
  {
    date: new Date(2022, 8, 18, 24, 0).getTime(),
    value: 6.2,
  },
];

export const TinyChartHourData = atom([...TinyChartDefaultHourData]);

// export const TinyChartFilterState = atom<'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'>({
//   key: 'TinyChartFilterState',
//   default: 'year',
// });
