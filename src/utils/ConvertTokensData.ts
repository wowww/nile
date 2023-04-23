import { useCallback, useRef } from 'react';

interface TokenDataType {
  key: number;
  name: string;
  shortenName: string;
  price: number;
  price1h: number;
  price1hRate: number;
  price24h: number;
  price24hRate: number;
  price7d: number;
  price7dRate: number;
  volume7d: number;
  liquidity: number;
  swapLink: string;
  isSwap: boolean;
  address:string;
}

interface TokenInfo {
  symbol: string;
  name: string;
  shortenName: string;
  swapLink: string;
  isSwap: boolean;
}

export const convertTokensData = (rawTokens: any[]): TokenDataType[] | undefined => {
  //const index = useRef(1);
  if (!rawTokens) {
    return;
  }
  const tokenInfo: TokenInfo[] = [
    //토큰 API에 담겨있지 않은 정보들을 입력
    {
      symbol: 'TIPO',
      name: 'TIPO Token',
      shortenName: 'TIPO',
      swapLink: 'https://wemix.fi/swap?from=TIPO&to=WEMIX',
      isSwap: true,
    },
    {
      symbol: 'FRC',
      name: 'FORCE',
      shortenName: 'FRC',
      swapLink: 'https://wemix.fi/swap?from=FRC&to=WEMIX',
      isSwap: true,
    },
  ];
  const deserialize = (rawData: any, index: number): TokenDataType => {
    // if(!rawData){
    //   return;
    // }
    return {
      key: index,
      name: tokenInfo.find((candidate) => candidate.symbol === rawData.token_symbol)?.name ?? '',
      shortenName: tokenInfo.find((candidate) => candidate.symbol === rawData.token_symbol)?.shortenName ?? '',
      price: rawData.price,
      price1h: rawData['1h'].price,
      price1hRate: rawData['1h'].price_change,
      price24h: rawData['24h'].price,
      price24hRate: rawData['24h'].price_change,
      price7d: rawData['7d'].price,
      price7dRate: rawData['7d'].price_change,
      volume7d: rawData['7d'].volume,
      liquidity: rawData.liquidity,
      swapLink: tokenInfo.find((candidate) => candidate.symbol === rawData.token_symbol)?.swapLink ?? '',
      isSwap: tokenInfo.find((candidate) => candidate.symbol === rawData.token_symbol)?.isSwap ?? false,
      address: rawData.token_address,
    };
  };
  return rawTokens.map((rawToken, index) => deserialize(rawToken, index));
};
