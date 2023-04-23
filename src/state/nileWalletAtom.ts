import { ClientMeta, WEMIX_OPTIONS, WEMIX_TESTNET_OPTIONS, WemixProvider } from '@utils/wemixWallet';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const provider = new WemixProvider(
  // WEMIX_OPTIONS,
  process.env.NEXT_PUBLIC_ENV_WEMIX_NETWORK === 'mainnet' ? WEMIX_OPTIONS : WEMIX_TESTNET_OPTIONS,
);

export enum NileWalletProviderType {
  METAMASK_BROWSER_EXTENSION = 'MetaMask Browser Extension',
  METAMASK_MOBILE_APP = 'MetaMask Mobile app',
  WEMIX_WALLET_MOBILE_APP = 'WEMIX Wallet',
  WEMIX_WALLET_MOBILE_APP_DESC = 'DAO & LIFE platform based on the WEMIX3.0 mainnet',
};

export const nileWalletAtom = atom<string>('');
export const nileWalletMetaAtom = atomWithStorage<ClientMeta | null>('nileWalletMeta',null);
export const nileWalletPersistenceAtom = atomWithStorage<string | null>(
  'nileWalletPersistenceAtom',
  null,
);
export const nileWalletInfoChangeAtom = atom<boolean>(false);
