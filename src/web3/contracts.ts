import { AbiItem } from 'web3-utils';
import { marketAbis, marketJsonAbiAddresses, marketJsonAbiNames } from './abis/market';
import { daoAbis, daoJsonAbiAddress, daoJsonAbiNames } from './abis/dao';
import { provider } from '@/state/nileWalletAtom';
import { tokensType, tokenType, ZERO_ADDRESS } from '@/state/web3Atom';

const initContracts = async () => {
  const marketContracts = marketJsonAbiNames
    .map((name) => {
      const abi = marketAbis[name];
      return { [name]: new provider.web3.eth.Contract(abi, marketJsonAbiAddresses().current[name]) };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});
  const marketAddresses = marketJsonAbiNames
    .map((name) => ({ [name]: marketJsonAbiAddresses().current[name] }))
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});

  const tokens: tokensType = {};

  tokens[ZERO_ADDRESS] = {
    name: 'wemix',
    symbol: 'wemix',
    address: ZERO_ADDRESS,
    balance: '0',
  };
  tokens[marketAddresses.ERC20 || ''] = {
    name: 'wemix$',
    symbol: 'wemix$',
    address: marketAddresses.ERC20 || '',
    balance: '0',
  };

  const daoContracts = daoJsonAbiNames
    .map((name) => {
      const abi = daoAbis[name];
      return { [name]: new provider.web3.eth.Contract(abi, daoJsonAbiAddress().current[name]) };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});

  const daoAddresses = daoJsonAbiNames.map((name) => ({ [name]: daoJsonAbiAddress().current[name] })).reduce((prev, curr) => ({ ...prev, ...curr }), {});

  return { marketContracts, marketAddresses, tokens, daoContracts, daoAddresses };
};

export const web3Init = async () => {
  const { marketContracts, marketAddresses, tokens, daoContracts, daoAddresses } = await initContracts();

  return { marketContracts, marketAddresses, tokens, daoContracts, daoAddresses };
};
