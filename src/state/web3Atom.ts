import { atom } from 'jotai';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { MarketJsonAbiName } from '@/web3/abis/market';
import { DaoJsonAbiName } from '@/web3/abis/dao';
import { Contract } from 'ethers';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export type contractsAtomType = {
  [key in MarketJsonAbiName]?: Contract;
};

export type DaoContractAtom = {
  [key in DaoJsonAbiName]?: Contract;
};

export type tokenType = {
  name: string;
  symbol: string;
  address: string;
  balance: string;
};

export type tokensType = {
  [key: string]: tokenType;
};

export const tokenSymbolSort = (a: tokenType, b: tokenType) => {
  const fa = a.symbol.toLowerCase();
  const fb = b.symbol.toLowerCase();

  if (fa < fb) {
    return 1;
  }
  if (fa > fb) {
    return -1;
  }
  return 0;
};

export const contractsAtom = atom<contractsAtomType>({});
export const tokensAtom = atom<Map<string, tokenType>>(new Map());
export const addressListAtom = atom<{ [key: string]: string }>({});
export const vaultWalletAtom = atom<{ address: string; balance: string }>({
  address: '0xe48d713393a4A813fa49c4e20D2134598C24FBE7',
  balance: '',
});

export const tokenListAtom = atom<tokenType[]>((get) => Array.from(get(tokensAtom).values()).sort(tokenSymbolSort));

export const balanceLoadingAtom = atom<boolean>(false);
export const updateBalanceAtom = atom(null, async (get, set) => {
  const { ERC20 } = get(contractsAtom);
  const nileWalletAddress = get(nileWalletAtom);
  if (!nileWalletAddress) return;

  set(balanceLoadingAtom, true);
  const tokens = get(tokensAtom);

  let counter = 0;
  const total = tokens.size;

  await new Promise((resolve, reject) => {
    const callback = (value: any, key: string, balance: string) => {
      let newValue = value;
      newValue.balance = balance;

      tokens.set(key, newValue);

      counter++;
      if (counter === total) resolve('');
    };

    tokens.forEach(async (token, key) => {
      if (token.symbol === 'wemix' && provider) {
        provider.web3.eth.getBalance(nileWalletAddress).then((balance: string) => {
          callback(token, key, balance);
        });
      } else {
        ERC20?.methods.balanceOf(nileWalletAddress).call({}, (err: any, res: any) => {
          callback(token, key, res);
        });
      }
    });
  });

  set(tokensAtom, tokens);
  set(balanceLoadingAtom, false);
});

export const updateVaultBalanceAtom = atom(null, async (get, set) => {
  const wallet = get(vaultWalletAtom);

  await new Promise((resolve, reject) => {
    provider.web3.eth.getBalance(wallet.address).then((balance: string) => {
      set(vaultWalletAtom, { address: wallet.address, balance: balance });
    });
  });
});

export const daoContractsAtom = atom<DaoContractAtom>({});
export const daoAddressListAtom = atom<{ [key: string]: string }>({});