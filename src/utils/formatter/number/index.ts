import BigNumber from 'bignumber.js';
import { Unit } from 'web3-utils';

export const useNumberFormatter = () => {

  const MaximumPrice = 99999999.9999;
  const MinimumPrice = -MaximumPrice;

  const isValidInteger = (num?: string | number) => {
    if (!num) {
      return false;
    }
    return `${num}`.match(/^\d+$/i);
  };

  const isValidNumber = (num?: string | number) => {
    if (!num) {
      return false;
    }
    return `${num}`.match(/^\d*\.?\d+$/i);
  };

  const shorthanded = (num?: number | string, options?: { digits?: number, largeNumberDigits?: number, separate?: boolean }) => {
    if (!num || Number(num) === 0) {
      return String(0);
    }

    if (!isValidNumber(num)) {
      return String(0);
    }

    const largeNumberDigits = options?.largeNumberDigits ? options.largeNumberDigits : 2;
    const digits = options?.digits ? options.digits : 0;

    if (num === 0) {
      return String(num);
    }
    if (Number(num) < 1) {
      const result = new BigNumber(num).toFixed(digits, BigNumber.ROUND_FLOOR).toString();
      return result;
    }


    // const units = ['0', 'kwei', 'mwei', 'nano', 'micro', 'milli', 'ether', 'kether'];
    //
    // const e = Math.floor(value.length / 3);
    // const f = e > 0 ? e - 1 : e;
    // return fromWei(units[f]).toLocaleString();


    const si = [
      { value: 1, symbol: '', memo: 'Normal Number' },
      { value: 1e6, symbol: 'M', memo: 'Million' },
      { value: 1e9, symbol: 'B', memo: 'Billion' },
      { value: 1e12, symbol: 'T', memo: 'Trillion' },
      { value: 1e15, symbol: 'Q', memo: 'Quadrillion' },
    ];
    // 퍼포먼스 향상을 위해 큰 자릿수부터 비교하는 For 문 사용
    const value = Number(num);
    let i;
    const count = si.length - 1;
    for (i = count; i > 0; i -= 1) {
      if (value >= si[i].value) {
        break;
      }
    }
    const selectedDigits = i > 0 ? largeNumberDigits : digits;
    const slicedValue = new BigNumber(Number(num) / si[i].value).toFixed(selectedDigits, BigNumber.ROUND_FLOOR);
    const formattedSlicedValue = new BigNumber(slicedValue).toFormat();
    return `${formattedSlicedValue}${si[i].symbol}`;
  };

  const toFix: (num: number, fixed?: number) => string = (num, fixed) => {
    const parts = num.toFixed(fixed ?? 4).split('.');
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');;
  }

  // const toWei: (value: string | number | BigNumber | undefined, unit?: Unit) => string = (value, unit) => {
  //   if (value === undefined) {
  //     return '0';
  //   }
  //   if (typeof value === 'number') {
  //     if (!isValidInteger(value)) {
  //       return '0';
  //     }
  //     return toWei(String(value), unit);
  //   }
  //   if (value instanceof BigNumber) {
  //     return toWei(value, unit).toString();
  //   }
  //   return toWei(value, unit);
  // };

  // const fromWei: (value: string | number | BigNumber | undefined, unit?: Unit) => string = (value, unit) => {
  //   if (value === undefined) {
  //     return '0';
  //   }
  //   if (typeof value === 'number') {
  //     if (!isValidInteger(value)) {
  //       return '0';
  //     }
  //     return fromWei(String(value), unit);
  //   }
  //   if (value instanceof BigNumber) {
  //     return fromWei(value, unit).toString();
  //   }
  //   return fromWei(value, unit);
  // };

  return {
    MaximumPrice,
    MinimumPrice,
    // toWei,
    toFix,
    // fromWei,
    isValidInteger,
    isValidNumber: isValidInteger,
    shorthanded,
  };
};
