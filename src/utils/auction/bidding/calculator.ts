import { useCallback, useState } from 'react';

/**
 * # 응찰 가격 기준
 * [응찰 가격] = [이전 가격] + [호가 단위]
 * # 호가 단위
 * - 1~10은 1씩 증분
 * - 10~100은 10씩 증분
 * - 100 이후로 1로 시작하는 단위에서, ‘1s’ 증분 (100-110-120... 또는 10,000-11,000-12,000…)
 * - 2로 시작되는 단위에서, ‘2s’ 증분 (200-220-240… 또는 2,000-2,200-2400…)
 * - 3또는 4로 시작되는 단위에서, ‘0-2-5-8’ 증분 (300-320-350-380… 또는 40,000-42,000-45,000…)
 * - 5~9로 시작되는 단위에서, ‘5s’ 증분 (500-550-600-650… 또는 7,000-7,500-8,000…)
 * 위와 같은 패턴으로 반복
 */
export const useAuctionBiddingCalculator = () => {
  const [memory, setMemory] = useState<number[]>([]);

  const getNextPrice = useCallback((price: number) => {
    if (memory.includes(price)) {
      const next = memory.at(memory.indexOf(price) + 1);
      if (next) {
        return next;
      }
    } else {
      setMemory((items) => [...items, price]);
    }
    if (price < 10) {
      const result = price + 1;
      setMemory((items) => [...items, result]);
      return result;
    }
    if (price < 100) {
      const result = price + 10;
      setMemory((items) => [...items, result]);
      return result;
    }
    const m = Number(`${price}`.at(0));
    const n = `${price}`.length - 1;
    const e = 10 ** (n - 1);
    if ([1].includes(m)) {
      const result = price + e;
      setMemory((items) => [...items, result]);
      return result;
    }
    if ([2].includes(m)) {
      const result = price + e * 2;
      setMemory((items) => [...items, result]);
      return price + e * 2;
    }
    if ([3, 4].includes(m)) {
      const rule: { [key: number]: number } = { 0: 2, 2: 3, 5: 3, 8: 2 };
      const o = Number(`${price}`.at(1) ?? '0');
      const result = price + e * rule[o];
      setMemory((items) => [...items, result]);
      return result;
    }
    const result = price + e * 5;
    setMemory((items) => [...items, result]);
    return result;
  }, [memory]);

  const getPrevPrice = useCallback((price: number) => {
    const currentIndex = memory.indexOf(price);
    return currentIndex > 0 ? (memory.at(currentIndex - 1) ?? price) : price;
  }, [memory]);

  return ({
    getNextPrice,
    getPrevPrice,
  });
};
