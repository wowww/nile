type DunamuExchangeInformation = {
  id: number;
  createdAt: string;
  modifiedAt: string;
  timestamp: number;
  code: string;
  currencyCode: string;
  country: string;
  name: string;
  date: string; // YYYY-MM-DD
  time: string; // hh:mm:ss
  recurrenceCode: number; // integer
  basePrice: number; // 0.00
  openingPrice: number; // 0.00
  highPrice: number; // 0.00
  lowPrice: number; // 0.00
  change: string;
  changePrice: number; // 0.00
  cashBuyingPrice: number; // 0.00
  cashSellingPrice: number; // 0.00
  ttBuyingPrice: number; // 0.00
  ttSellingPrice: number; // 0.00
  tcBuyingPrice?: number; // 0.00
  fcBuyingPrice?: number; // 0.00
  exchangeCommission: number;
  usDollarRate: number;
  high52wPrice: number;
  high52wDate: string; // YYYY-MM-DD
  currencyUnit: number;
  provider: string;
  changeRate: number; // 0.0000000000;
  signedChangePrice: number; // 0.00
  signedChangeRate: number; // 0.0000000000;
};

export default DunamuExchangeInformation;
