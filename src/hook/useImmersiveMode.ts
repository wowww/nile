import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useImmersiveMode = () => {
  const router = useRouter();

  const immersiveMode = useMemo(() => ['/wemix-wallet'].filter((it) => router.asPath.includes(it)).length > 0, [router.asPath]);

  return immersiveMode;
};