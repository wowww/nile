import { toBN, Unit } from 'web3-utils';
import BigNumber from 'bignumber.js';
import { provider } from '@/state/nileWalletAtom';
import { contractsAtomType, tokenType } from '@/types/contract.types';
import { HttpProvider } from 'web3-core/types';
import { TransactionReceipt } from 'web3-core';


export interface EstimateGasReturnType {
  newGasLimit: string;
  newTotalGasFee: string;
}


export const TOKEN_MAX_APPROVE_AMOUNT: string =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';


export const MAX_GASLIMIT: number = 1000000;

export const RateStateConst = {
  INC: 'increase',
  DEC: 'decrease',
  ZERO: '',
};

const fmt = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

/**
 * Ellpsis address
 * @param address
 * @param start
 * @param end
 * @returns
 */
export const ellipsisAddress = (
  address: string | null,
  start: number = 6,
  end: number = 4,
): string => {
  if (!address) {
    return '';
  }
  if (address!.length < start + end) {
    return address!;
  }
  return (
    address!.substring(0, start) +
    '...' +
    address!.substring(address!.length - end)
  );
};

const toFixedZeroPadding = (
  value: BigNumber | string | number,
  decimalPlace: number | undefined = undefined,
  zeroPadding: boolean = true,
): string => {
  if (!value) {
    return '0';
  }
  value = new BigNumber(value);

  if (value.isInteger()) {
    decimalPlace = undefined;
  }

  const ret =
    decimalPlace !== undefined
      ? value.toFormat(decimalPlace, fmt)
      : value.toFormat(fmt);

  return zeroPadding ? ret.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1') : ret;
};

export const getAmountFormat = (amount: BigNumber | string, fixed: number) => {
  let result =
    fixed == 0 ? new BigNumber(amount).toFixed(0) : toFixed(amount, fixed);
  if (result.indexOf('.') == -1) {
    result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    let _arr = result.split('.');
    result = _arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + _arr[1];
  }
  return result;
};

export const getAmountFixed = (
  amount: string | BigNumber | number,
  fixed: number,
) => {
  let result = new BigNumber(amount).toFixed(fixed);
  let _arr = result.split('.');
  result = _arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + _arr[1];
  return result;
};

/**
 * BigNumber toFixed
 * @param value
 * @param decimalPlace
 * @returns
 */
export const toFixed = toFixedZeroPadding;

/**
 * Convert wei to unit
 * @param balance
 * @param unit
 * @param decimalPlace
 * @returns
 */
export const fromWei = (
  balance: string,
  unit: Unit,
  decimalPlace?: number,
): string => {
  const unitValue = new BigNumber(fromWei(balance, unit));

  return toFixedZeroPadding(unitValue, decimalPlace);
};

/**
 * Convert ERC20 balance
 * @param balance
 * @param decimal
 * @param decimalPlace
 * @returns
 */
export const balanceFromToken = (
  balance: string | BigNumber,
  decimal: number,
  decimalPlace?: number,
): string => {
  var value = typeof balance === 'string' ? new BigNumber(balance) : balance;
  value = value.dividedBy(new BigNumber(10).pow(decimal));

  return toFixedZeroPadding(value, decimalPlace);
};

const decimalExist = (decimal: any) => decimal || decimal == 0;

export const plus_BigNumber = (
  x: string | number,
  y: string | number,
  decimal?: string | number,
): string => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return decimalExist(decimal)
    ? number1.plus(number2).toFixed(Number(decimal))
    : number1.plus(number2).toFixed();
};

export const minus_BigNumber = (
  x: string | number,
  y: string | number,
  decimal?: string | number,
): string => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return decimalExist(decimal)
    ? number1.minus(number2).toFixed(Number(decimal))
    : number1.minus(number2).toFixed();
};

export const divide_BigNumber = (
  x: string | number,
  y: string | number,
  decimal?: string | number,
): string => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return decimalExist(decimal)
    ? number1.dividedBy(number2).toFixed(Number(decimal))
    : number1.dividedBy(number2).toFixed();
};

export const multiple_BigNumber = (
  x: string | number,
  y: string | number,
  decimal?: number,
): string => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return decimalExist(decimal)
    ? number1.multipliedBy(number2).toFixed(Number(decimal))
    : number1.multipliedBy(number2).toFixed();
};

export const isLessThan_BigNumber = (
  x: string | number,
  y: string | number,
  isEqual: boolean = false,
): boolean => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return !isEqual
    ? number1.isLessThan(number2)
    : number1.isLessThanOrEqualTo(number2);
};

export const isGreaterThan_BigNumber = (
  x: string | number,
  y: string | number,
  isEqual: boolean = false,
): boolean => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return !isEqual
    ? number1.isGreaterThan(number2)
    : number1.isGreaterThanOrEqualTo(number2);
};

export const isEqual_BigNumber = (
  x: string | number,
  y: string | number,
): boolean => {
  const number1 = new BigNumber(x);
  const number2 = new BigNumber(y);

  return number1.isEqualTo(number2);
};

export const weiToEther = (
  wei: string | number = 0,
  decimal: string | number = 18,
): string => {
  const wei_BN = new BigNumber(wei);
  const divide_value = new BigNumber(Math.pow(10, Number(decimal)));

  return wei_BN.dividedBy(divide_value).toFixed(Number(decimal));
};

export const etherToWei = (
  ether: string | number = 0,
  decimal: string | number = 18,
): string => {
  const ether_BN = new BigNumber(ether);
  const multiple_value = new BigNumber(Math.pow(10, Number(decimal)));

  return ether_BN.multipliedBy(multiple_value).toFixed(0);
};

export const waitForReceipt = (hash: string, cb: Function) => {
  // console.log('Start waitForReceipt: ', hash)
  provider.web3.eth.getTransactionReceipt(hash, (err: Error, receipt: TransactionReceipt) => {
    // console.log('getTransactionReceipt: ', receipt)
    if (err) console.log('err: ', err);

    if (receipt === undefined || receipt === null) {
      // Try again in 1 second
      window.setTimeout(() => {
        waitForReceipt(hash, cb);
      }, 1000);
    } else {
      // Transaction went through
      if (cb) cb(receipt);
    }
  });
};

/**
 * async execuateBatch<br/>
 *
 * const batch = new web3.BatchRequest();
 * batch.add((web3.eth.getGasPrice as any).request());
 * batch.add(swapRouter.methods.get("0x1a26368e3e8c2EC37dbDb3bfC82a43C807654981").call.request({}));
 *
 * const [a, b] = await asyncExecuteBatch(batch);
 *
 * @param batch
 * @returns
 */
export const asyncExecuteBatch = (batch: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    var requests = batch.requests;

    batch.requestManager.sendBatch(requests, (err: any, results: any) => {
      results = results || [];
      var response = requests
        .map((request: any, index: number) => {
          return results[index] || {};
        })
        .map((result: any, index: number) => {
          return requests[index].format
            ? requests[index].format(result.result)
            : result.result;
        });

      resolve(response);
    });
  });
};

/**
 * get token balance from tokensArrayAtom
 * @param tokens
 * @param targetSymbol
 * @param returnUnit
 */
export const findTokenBalance = (
  tokensArray: any[],
  targetSymbol: string | undefined,
  returnUnit: 'wei' | 'ether',
) => {
  const token = tokensArray.find((item) => item.symbol === targetSymbol);
  const balance_Wei = token?.balance;

  return returnUnit === 'wei'
    ? balance_Wei
    : weiToEther(balance_Wei, token?.decimal);
};

/**
 * Get gas price
 * 직접 transaction 을 보낸 필요가 없어서 현재 값으로 처리
 * @returns gas price
 */
export const getGasPrice = async (): Promise<string> => {
  return provider.web3.eth.getGasPrice();
};

interface GasPrice {
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
}

export const getGasPriceType2 = async (): Promise<GasPrice> => {
  return new Promise((resolve, reject) => {
    (provider.httpWeb3.currentProvider as HttpProvider).send(
      {
        method: 'eth_maxPriorityFeePerGas',
        params: [],
        jsonrpc: '2.0',
        id: new Date().getTime(),
      },
      (error: any, result: any) => {
        if (!error) {
          const maxPriorityFeePerGas = toBN(result.result);
          provider.web3.eth.getBlock('latest').then((result: any) => {
            const maxFeePerGas = maxPriorityFeePerGas.add(
              toBN(result.baseFeePerGas || 1)
                .mul(toBN(10)),
            );

            resolve({
              maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
              maxFeePerGas: maxFeePerGas.toString(),
            });
          });
        }
      },
    );
  });
};

// gas limit 계산
export const estimateGas = async (
  from: string, // wallet Address
  to: string, // contract or wallet Address
  coinValue: string, // token은 0 입력
  gasPrice: string,
  encodeData: string,
): Promise<EstimateGasReturnType> => {
  // TODO 에러 처리
  // try {

  console.log('new gas limit', from, to, coinValue, gasPrice, encodeData);

  const newGasLimit: number = await provider.web3.eth.estimateGas({
    from,
    to,
    value: coinValue,
    data: encodeData,
  });

  console.log('new gas limit', newGasLimit);

  const newTotalGasFee = multiple_BigNumber(newGasLimit, gasPrice);

  console.log('new total gas gee', newTotalGasFee);

  return {
    newGasLimit: new BigNumber(newGasLimit).toFixed(),
    newTotalGasFee: weiToEther(newTotalGasFee),
  };
  // } catch (e) {
  //   console.log(e);
  // }
};

/**
 * symbol 로 WEMIX$ 환산 가치 조회
 * @param tokens tokensAtom value
 * @param prices wemixDollarPricesAtom value
 * @param symbol
 * @returns
 */
export const findPrice = (
  tokens: Map<string, tokenType>,
  prices: { [key: string]: string },
  symbol: string,
): string => {
  const token = findTokenWithSymbol(tokens, symbol);
  if (token) {
    return prices[token.address];
  } else {
    return '0';
  }
};

/**
 * Symbol 로 token 정보 조회
 * @param tokens tokensAtom value
 * @param symbol
 * @returns
 */
export const findTokenWithSymbol = (
  tokens: Map<string, tokenType>,
  symbol: string,
): tokenType | undefined => {
  return Array.from(tokens.values()).find(
    (value: tokenType) => value.symbol === symbol,
  );
};

/**
 * WEMIX$ 환산 가치 계산
 * @param prices wemixDollarPricesAtom value
 * @param tokens tokensAtom value
 * @param symbol
 * @param amount 수량
 * @returns
 */
export const calcWemixDollarWithSymbol = (
  prices: { [key: string]: string },
  tokens: Map<string, tokenType>,
  symbol: string,
  amount: string,
): string => {
  const token = findTokenWithSymbol(tokens, symbol);
  const wdToken = findTokenWithSymbol(tokens, 'WEMIX$');

  if (token && wdToken) {
    const price = new BigNumber(prices[token.address]);
    return price
      .multipliedBy(new BigNumber(amount))
      .dividedBy(token?.decimal)
      .dividedBy(wdToken.decimal)
      .toString();
  } else {
    return '0';
  }
};

export const calcWemixDollar = (
  prices: { [key: string]: string },
  tokens: Map<string, tokenType>,
  token_address: string,
  amount: string,
): string => {
  const token = tokens.get(token_address);
  const wdToken = findTokenWithSymbol(tokens, 'WEMIX$');

  if (token && wdToken) {
    const price = new BigNumber(prices[token.address]);
    return price
      .multipliedBy(new BigNumber(amount))
      .dividedBy(token?.decimal)
      .dividedBy(wdToken.decimal)
      .toString();
  } else {
    return '0';
  }
};

export const getRateInfo = (change: number, decimalPlace: number = 2) => {
  const fixedValue: string = toFixed(change, decimalPlace);
  const comp: number = Math.abs(change) < 999 ? Number(fixedValue) : change;
  const rate: string = fixedValue === '-0' ? '0' : fixedValue;
  let state: string = RateStateConst.ZERO;

  switch (true) {
    case comp > 0:
      state = RateStateConst.INC;
      break;
    case comp < 0:
      state = RateStateConst.DEC;
      break;
  }

  return { state: state, rate: rate };
};

export const walletConnect = async (
  isMobile: boolean = false,
  isMetaMask: boolean = false,
) => {
  if (isMobile) {
    await provider.connectWalletConnectMobile(isMetaMask, (url) => {
      window.open(url);
    });
  } else {
    provider.connect();
  }
};

export const getMaxBalance = (symbol: string, nowBalance: string) => {
  if (symbol === 'WEMIX') {
    const value = minus_BigNumber(nowBalance, 1);
    if (new BigNumber(value).isNegative()) return '0';
    else return value;
  } else {
    return nowBalance;
  }
};