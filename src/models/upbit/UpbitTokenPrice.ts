type UpbitTokenPrice = {
  market: string;
  tradeDate: string;
  tradeTime: string;
  tradeDateKst: string;
  tradeTimeKst: string;
  tradeTimestamp: number;
  openingPrice: number
  highPrice: number;
  lowPrice: number;
  tradePrice: number;
  prevClosingPrice: number;
  change: string;
  changePrice: number;
  changeRate: number;
  signedChangePrice: number;
  signedChangeRate: number;
  tradeVolume: number;
  accTradePrice: number;
  accTradePrice24h: number;
  accTradeVolume: number;
  accTradeVolume24h: number;
  highest52WeekPrice: number;
  highest52WeekDate: string;
  lowest52WeekPrice: number;
  lowest52WeekDate: string;
  timestamp: number;
};

export default UpbitTokenPrice;
