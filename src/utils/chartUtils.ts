import { ChartBoundaryOutput, ChartPeriodType, DateConst } from '@/types/common.types';
import { ITimeInterval } from '@amcharts/amcharts5/.internal/core/util/Time';
import BigNumber from 'bignumber.js';
import {
  isEqual_BigNumber,
  isLessThan_BigNumber,
  minus_BigNumber,
  multiple_BigNumber,
  plus_BigNumber,
} from '@utils/web3Utils';

export const setXBaseInterval = (
  period: ChartPeriodType,
  isWide: boolean,
): ITimeInterval => {
  switch (period) {
    case DateConst.DAY:
      return {
        timeUnit: isWide ? DateConst.MIN : DateConst.HOUR,
        count: isWide ? 30 : 1,
      };
    case DateConst.WEEK:
      return { timeUnit: DateConst.HOUR, count: isWide ? 4 : 8 };
    case DateConst.MONTH:
      return { timeUnit: DateConst.DAY, count: 1 };
    default:
      return { timeUnit: DateConst.DAY, count: isWide ? 7 : 15 };
  }
  // else return { timeUnit: "month", count: Math.ceil(data.length / 4) };
};

export const setXGridIntervals = (
  period: ChartPeriodType,
  isWide: boolean,
): ITimeInterval[] => {
  switch (period) {
    case DateConst.DAY:
      return [
        {
          timeUnit: isWide ? DateConst.MIN : DateConst.HOUR,
          count: isWide ? 240 : 8,
        },
      ];
    case DateConst.WEEK:
      return [
        {
          timeUnit: DateConst.HOUR,
          count: isWide ? 24 : 48,
        },
      ];
    case DateConst.MONTH:
      return [
        {
          timeUnit: DateConst.DAY,
          count: isWide ? 5 : 10,
        },
      ];
    default:
      return [
        {
          timeUnit: DateConst.DAY,
          count: isWide ? 56 : 120,
        },
      ];
  }
};

export const setChartDateFormats = (
  period: ChartPeriodType,
  isWide: boolean,
) => {
  switch (period) {
    case DateConst.DAY:
      return { [isWide ? DateConst.MIN : DateConst.HOUR]: "HH:mm" };
    case DateConst.WEEK:
      return { [DateConst.HOUR]: "MM-dd" };
    case DateConst.MONTH:
      return { [DateConst.DAY]: "MM-dd" };
    default:
      return { [DateConst.DAY]: "MM-dd" };
  }
};

const boundNumSet = (value: number) => {
  const value_BN = new BigNumber(value);

  const N = 1; // Normal
  const K = Math.pow(10, 3);
  const M = Math.pow(10, 6);
  const B = Math.pow(10, 9);
  let finalValue, unit;

  if (value_BN.isLessThan(K)) {
    finalValue = value_BN.toFixed();
    unit = N;
  } else if (value_BN.isLessThan(M)) {
    finalValue = value_BN.dividedBy(K).toFixed();
    unit = K;
  } else if (value_BN.isLessThan(B)) {
    finalValue = value_BN.dividedBy(M).toFixed();
    unit = M;
  } else {
    finalValue = value_BN.dividedBy(B).toFixed();
    unit = B;
  }

  return { finalValue, unit };
};

export const setChartBoundary = (dataItems: any[]): ChartBoundaryOutput => {
  const valueArray = dataItems.map((item) => item.value);
  const max_tmp = Math.max(...valueArray);
  const min_tmp = Math.min(...valueArray);
  const { finalValue: max, unit: unit_max } = boundNumSet(max_tmp);
  const { finalValue: min, unit: unit_min } = boundNumSet(min_tmp);

  const difference = minus_BigNumber(max, min);

  if (
    isEqual_BigNumber(unit_max, unit_min) &&
    isLessThan_BigNumber(difference, 0.01)
  ) {
    return {
      isSmallDiff: true,
      max: Number(
        multiple_BigNumber(
          plus_BigNumber(BigNumber(max).toFixed(2), 0.02),
          unit_max,
        ),
      ),
      min: Number(
        multiple_BigNumber(
          minus_BigNumber(BigNumber(min).toFixed(2), 0.01),
          unit_min,
        ),
      ),
    };
  } else {
    return {
      isSmallDiff: false,
    };
  }
};

export const checkAllValueZero = (dataItems: any[]): boolean => {
  let isZero = true;
  dataItems.forEach((item) => {
    if (item.value != 0) isZero = false;
  });

  return isZero;
};

export const chart_unit_count = (
  period: string,
  isWide: boolean, // wide 차트인지 small 차트인지
) => {
  let unit: string = DateConst.DAY;
  let unit_count: number = 1;
  let unit_multiplier: number = 1;

  switch (period) {
    case DateConst.DAY:
      unit = isWide ? DateConst.MIN : DateConst.HOUR;
      unit_count = isWide ? 48 : 24;
      unit_multiplier = isWide ? 30 : 1;
      break;
    case DateConst.WEEK:
      unit = DateConst.HOUR;
      unit_count = isWide ? 42 : 21;
      unit_multiplier = isWide ? 4 : 8;
      break;
    case DateConst.MONTH:
      unit = DateConst.DAY;
      unit_count = 30;
      unit_multiplier = 1;
      break;
    case DateConst.YEAR:
      unit = DateConst.DAY;
      unit_count = isWide ? 48 : 24;
      unit_multiplier = isWide ? 7 : 15;
      break;
  }

  return { unit, unit_count, unit_multiplier };
};

const getUnitMillisecond = (unit: string): number => {
  switch (unit) {
    case DateConst.MIN:
      return 60000;
    case DateConst.HOUR:
      return 3600000;
    case DateConst.DAY:
      return 86400000;
    default:
      return 0;
  }
};

export const addEmptyData = (
  dataItems: any[],
  period: ChartPeriodType,
  isWide: boolean,
) => {
  const { unit, unit_count, unit_multiplier } = chart_unit_count(
    period,
    isWide,
  );
  let sTime = dataItems[0].date; // 받아온 데이터의 시작 시간
  const emptyLength = unit_count - dataItems.length;
  const unitTime = getUnitMillisecond(unit);
  const timeTerm = multiple_BigNumber(unitTime, unit_multiplier);
  const emptyArray = [];

  for (let i = 0; i < emptyLength; i++) {
    sTime = minus_BigNumber(sTime, timeTerm);
    const newData = { date: Number(sTime) };
    emptyArray.push(newData as any);
  }

  return emptyArray.concat(dataItems);
};
