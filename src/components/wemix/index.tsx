import { useCallback, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import { useAtomValue } from 'jotai';
import { nileWalletMetaAtom, NileWalletProviderType, provider } from '@/state/nileWalletAtom';

export const useWemixWalletProvider = () => {
  const nileWalletMeta = useAtomValue(nileWalletMetaAtom);

  const isConnectToApp = useMemo(() => {
    return [
      String(NileWalletProviderType.WEMIX_WALLET_MOBILE_APP_DESC),
      String(NileWalletProviderType.WEMIX_WALLET_MOBILE_APP),
      String(NileWalletProviderType.METAMASK_MOBILE_APP),
    ].includes(nileWalletMeta?.description ?? '');
  }, [nileWalletMeta]);

  const openApp = useCallback(async () => {
    if (isMobile && isConnectToApp) {
      const openUri = provider.getWallAppOpenUri();
      if (openUri) {
        setTimeout(() => {
          window.location.href = openUri;
        });
      }
    }
  }, [nileWalletMeta]);

  return {
    openApp,
  };
};
