import { useCallback } from 'react';
import { Address } from '@/models/nile/contract';

export const useUnitFormatter = () => {
  const getPaymentUnit = useCallback((address?: Address) => {
    if (address?.toLowerCase() === process.env.NEXT_PUBLIC_ENV_WEMIX_TOKEN_DEFAULT_ADDRESS?.toLowerCase()) {
      return 'WEMIX';
    } else if (address?.toLowerCase() === process.env.NEXT_PUBLIC_ENV_WEMIX_DOLLAR_CONTRACT_ADDRESS?.toLowerCase()) {
      return 'WEMIX$';
    }
    return 'WEMIX$';
  }, []);

  return {
    getPaymentUnit,
  };
};
