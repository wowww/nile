import { useCallback } from 'react';

export const useWalletFormatter = () => {
  const shorten = useCallback((address?: string) => {
    const shortenFormat = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = address?.match(shortenFormat);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  }, []);

  return {
    shorten,
  };
};
