import { contractsAtom, tokensAtom, tokenSymbolSort, tokenType } from '@/state/web3Atom';
import { atom } from 'jotai';
import { provider } from '@/state/nileWalletAtom';
import { daoJsonAbiAddress } from '@/web3/abis/dao';

export const treasuryTokensAtom = atom<Map<string, tokenType>>(new Map());

export const treasuryTokenListAtom = atom<tokenType[]>((get) => Array.from(get(tokensAtom).values()).sort(tokenSymbolSort));

export const treasuryBalanceLoadingAtom = atom<boolean>(false);

export const refreshTreasuryBalanceAtom = atom(null, async (get, set) => {
  const { ERC20 } = get(contractsAtom);

  set(treasuryBalanceLoadingAtom, true);
  const tokens = get(treasuryTokensAtom);

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
        provider.web3.eth.getBalance(daoJsonAbiAddress().current.Treasury).then((balance: string) => {
          callback(token, key, balance);
        });
      } else {
        ERC20?.methods.balanceOf(daoJsonAbiAddress().current.Treasury).call({}, (err: any, res: any) => {
          callback(token, key, res);
        });
      }
    });
  });

  set(treasuryTokensAtom, tokens);
  set(treasuryBalanceLoadingAtom, false);
});