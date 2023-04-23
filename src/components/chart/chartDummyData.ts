import { atom } from 'jotai';

export interface basicChartDataType {
  date?: string | number | undefined;
  time?: string | number;
  value?: number | undefined;
  bullet?: boolean | undefined;
}

export interface multiChartDataType {
  inflow: number;
  outflow: number;
  total: number;
  date: number | string;
}

export interface StackChartDataType {
  date?: number | undefined;
  wonderDao?: number | undefined;
  patronDao?: number | undefined;
  Top3Dao?: number | undefined;
  etc?: number | undefined;
  total?: number | undefined;
}

export interface PriceHistoryDataType {
  date?: string | number | undefined;
  value?: number | undefined;
  bullet?: boolean | undefined;
}

export interface DaoWonderPriceChartDataType {
  date: number;
  value: number;
}

export interface DaoIncineratorChartDataType {
  date: number | string;
  supply: number;
  burn: number;
}

export const lineBasicChartDefaultData = [
  {
    date: '22.08.13',
    value: 0,
  },
  {
    date: '22.08.14',
    value: 0,
  },
  {
    date: '22.08.15',
    value: 0,
  },
  {
    date: '22.08.16',
    value: 0,
  },
  {
    date: '22.08.17',
    value: 0,
  },
  {
    date: '22.08.18',
    value: 0,
  },
  {
    date: '22.08.19',
    value: 0,
  },
  {
    date: '22.08.20',
    value: 0,
  },
];

// 기본 bullet 값이 false 인 상태에서 데이터 갱신 시 마지막 데이터 값만 bullet을 true로 변경해주세요.
export const lineChartDefaultData = [
  {
    date: new Date(2022, 8, 18, 0, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 1, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 2, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 3, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 4, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 5, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 6, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 7, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 8, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 9, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 10, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 11, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 12, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 13, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 14, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 15, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 16, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 17, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 18, 0).getTime(),
    value: 0,
    bullet: true,
  },
  {
    date: new Date(2022, 8, 18, 19, 0).getTime(),
    // value: 230.01,
    // bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 20, 0).getTime(),
    // value: 0,
    // bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 21, 0).getTime(),
    // value: 0,
    // bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 22, 0).getTime(),
    // value: 260.03,
    // bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 23, 0).getTime(),
    // value: 233.45,
    // bullet: false,
  },
];

// inflow의 데이터 값은 음수로 변환해서 들어와야 합니다.
export const ColumnLineMixChartDefaultData = [
  {
    inflow: 0,
    outflow: 0,
    total: 0,
    date: new Date('2022-08-15 00:00').getTime(),
  },
  {
    inflow: 0,
    outflow: 0,
    total: 0,
    date: new Date('2022-08-16 00:00').getTime(),
  },
  {
    inflow: 0,
    outflow: 0,
    total: 0,
    date: new Date('2022-08-17 00:00').getTime(),
  },
  {
    inflow: 0,
    outflow: 0,
    total: 0,
    date: new Date('2022-08-18 00:00').getTime(),
  },
  {
    inflow: 0,
    outflow: 0,
    total: 0,
    date: new Date('2022-08-19 00:00').getTime(),
  },
  {
    inflow: 0,
    outflow: 0,
    total: 0,
    date: new Date('2022-08-20 00:00').getTime(),
  },
  {
    inflow: 0,
    outflow: 0,
    total: 0,
    date: new Date('2022-08-21 00:00').getTime(),
  },
];

// export const PriceHistoryDefaultData = [
//   {
//     date: new Date(2022, 8, 18, 0, 0).getTime(),
//     value: 10,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 1, 0).getTime(),
//     value: 1216,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 2, 0).getTime(),
//     value: 1267,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 3, 0).getTime(),
//     value: 1317,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 4, 0).getTime(),
//     value: 1507,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 5, 0).getTime(),
//     value: 1206,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 6, 0).getTime(),
//     value: 1709,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 7, 0).getTime(),
//     value: 1666,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 8, 0).getTime(),
//     value: 1654,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 9, 0).getTime(),
//     value: 1544,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 10, 0).getTime(),
//     value: 1557,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 11, 0).getTime(),
//     value: 1601,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 12, 0).getTime(),
//     value: 1777,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 13, 0).getTime(),
//     value: 1888,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 14, 0).getTime(),
//     value: 1999,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 15, 0).getTime(),
//     value: 2053,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 16, 0).getTime(),
//     value: 1953,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 17, 0).getTime(),
//     value: 1553,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 18, 0).getTime(),
//     value: 1567,
//     bullet: true,
//   },
//   {
//     date: new Date(2022, 8, 18, 19, 0).getTime(),
//     // value: 230.01,
//     // bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 20, 0).getTime(),
//     // value: 0,
//     // bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 21, 0).getTime(),
//     // value: 0,
//     // bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 22, 0).getTime(),
//     // value: 260.03,
//     // bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 23, 0).getTime(),
//     // value: 233.45,
//     // bullet: false,
//   },
// ];

export const PriceHistoryDefaultData = [
  {
    date: new Date(2023, 0, 18, 5, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 1, 18, 6, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 2, 18, 7, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 3, 18, 8, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 4, 18, 9, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 5, 18, 10, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 6, 18, 11, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 7, 18, 12, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 8, 18, 13, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 9, 18, 14, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 10, 18, 15, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2023, 11, 18, 16, 0).getTime(),
    value: 0,
    bullet: false,
  },
];

export const stackChartDefaultData = [
  {
    date: new Date(2023, 7, 25).getTime(),
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
    total: 0,
  },
  {
    date: new Date(2023, 7, 26).getTime(),
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
    total: 0,
  },
  {
    date: new Date(2023, 7, 27).getTime(),
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
    total: 0,
  },
  {
    date: new Date(2023, 7, 28).getTime(),
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
    total: 0,
  },
  {
    date: new Date(2023, 7, 29).getTime(),
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
    total: 0,
  },
  {
    date: new Date(2023, 7, 30).getTime(),
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
    total: 0,
  },
  {
    date: new Date(2023, 7, 31).getTime(),
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
    total: 0,
  },
];

export const lineBasicChartData = atom<basicChartDataType[]>([...lineBasicChartDefaultData]);

export const lineChartData = atom<basicChartDataType[]>([...lineChartDefaultData]);

export const ColumnLineMixChartData = atom<multiChartDataType[]>([...ColumnLineMixChartDefaultData]);

// export const PriceHistoryData = selectAtom({
//   key: 'PriceHistoryData',
//   get: ({ get }) => {
//     const filter = get(PriceHistoryFilterState);
//     switch (filter) {
//       case 'day':
//         return [...PriceHistoryDefaultData];
//       case 'week':
//         return [...PriceHistoryDefaultData];
//       case 'month':
//         return [...PriceHistoryDefaultData];
//       case 'year':
//         return [...PriceHistoryDefaultData];
//       default:
//         return [...PriceHistoryDefaultData];
//     }
//   },
// });

export const PriceHistoryFilterState = atom<'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'>('year');

// mypage line chart
// 기본 bullet 값이 false 인 상태에서 데이터 갱신 시 마지막 데이터 값만 bullet을 true로 변경해주세요.
export const mypageLineChartDefaultData = [
  {
    date: new Date(2022, 8, 18, 0, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 1, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 2, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 3, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 4, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 5, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 6, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 7, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 8, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 9, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 10, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 11, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 12, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 13, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 14, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 15, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 16, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 17, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 18, 0).getTime(),
    value: 0,
    bullet: true,
  },
  {
    date: new Date(2022, 8, 18, 19, 0).getTime(),
    // value: 0,
    // bullet: true,
  },
  {
    date: new Date(2022, 8, 18, 20, 0).getTime(),
    value: 0,
    bullet: true,
  },
  {
    date: new Date(2022, 8, 18, 21, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 22, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 23, 0).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 24, 0).getTime(),
    value: 0,
    bullet: false,
  },
];

// export const LineChartData = selector({
//   key: 'LineChartData',
//   get: ({ get }) => {
//     const filter = get(LinChartFilterState);
//     switch (filter) {
//       case 'day':
//         return [...mypageLineChartDefaultData];
//       case 'week':
//         return [...mypageLineChartDefaultData];
//       case 'month':
//         return [...mypageLineChartDefaultData];
//       case 'year':
//         return [...mypageLineChartDefaultData];
//       default:
//         return [...mypageLineChartDefaultData];
//     }
//   },
// });

// dao line chanrt
export const daoLineChartDefaultData = [
  {
    date: new Date(2022, 8, 18).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 19).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 20).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 21).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 22).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 23).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 24).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 25).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 26).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 30).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 9, 5).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 9, 10).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 9, 18).getTime(),
    value: 0,
    bullet: false,
  },
  {
    date: new Date(2022, 9, 28).getTime(),
    value: 0,
    bullet: false,
  },
];

export const daoLineChartData = atom([...daoLineChartDefaultData]);

// export const daoLineChartData = selector({
//   key: 'DaoFilterState',
//   get: ({ get }) => {
//     const filter = get(LinChartFilterState);
//     switch (filter) {
//       case 'week':
//         return [...daoLineChartDefaultData];
//       case 'month':
//         return [...daoLineChartDefaultData];
//       case 'year':
//         return [...daoLineChartDefaultData];
//       default:
//         return [...daoLineChartDefaultData];
//     }
//   },
// });

export const LinChartFilterState = atom<'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'>('day');

export const DaoFilterState = atom<'week' | 'month' | 'year'>('week');

export const DaoWonderPriceChartDefaultData = [] as DaoWonderPriceChartDataType[];

for (let i = 0; i < 30; i++) {
  const dayData = {} as DaoWonderPriceChartDataType;
  dayData.date = new Date(2022, 10, i, 13, 0).getTime();
  dayData.value = Math.floor(Math.random() * 250 + 350);
  DaoWonderPriceChartDefaultData.push(dayData);
}

export const DaoWonderPriceChartData = atom<DaoWonderPriceChartDataType[]>([...DaoWonderPriceChartDefaultData]);

export const stackChartDarkDefaultData = [
  {
    date: new Date(2023, 7, 25).getTime(),
    total: 0,
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
  },
  {
    date: new Date(2023, 7, 26).getTime(),
    total: 0,
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
  },
  {
    date: new Date(2023, 7, 27).getTime(),
    total: 0,
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
  },
  {
    date: new Date(2023, 7, 28).getTime(),
    total: 0,
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
  },
  {
    date: new Date(2023, 7, 29).getTime(),
    total: 0,
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
  },
  {
    date: new Date(2023, 7, 30).getTime(),
    total: 0,
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
  },
  {
    date: new Date(2023, 7, 31).getTime(),
    total: 0,
    wonderDao: 0,
    patronDao: 0,
    Top3Dao: 0,
    etc: 0,
  },
];

// dao incinerator chart data
export const DaoIncineratorChartData = [
  {
    date: new Date(2023, 7, 25).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 7, 26).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 7, 27).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 7, 28).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 7, 29).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 7, 30).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 7, 31).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 1).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 2).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 3).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 4).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 5).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 6).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 7).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 8).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 9).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 10).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 11).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 12).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 13).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 14).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 15).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 16).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 17).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 18).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 19).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 20).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 21).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 22).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 23).getTime(),
    supply: 0,
    burn: 0,
  },
  {
    date: new Date(2023, 8, 24).getTime(),
    supply: 0,
    burn: 0,
  },
];

// 임시 code
export const totalFuncDark = stackChartDarkDefaultData.forEach((el) => {
  el.total = el.wonderDao + el.patronDao + el.Top3Dao + el.etc;
});
