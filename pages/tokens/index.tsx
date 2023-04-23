import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import TotalCapValue from '@/components/tokens/TotalCapValue';
import WemixMarketPrice from '@/components/tokens/WemixMarketPrice';
import TokensTable from '@/components/tokens/TokensTable';
import ExchangeList from '@/components/tokens/ExchangeList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTokens } from '@utils/useTokens';

const Tokens = () => {
  const { tokenWemix, tokenWemix$, tokenTipo, tokenForce,tokens,  onComplete } = useTokens();

  return (
    <div className={cn('tokens')}>
      <TotalCapValue tokens={tokens} />
      <WemixMarketPrice wemix={tokenWemix} wemix$={tokenWemix$} />
      {onComplete && <TokensTable tokens={tokens} />}
      <ExchangeList />
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'tokens'])),
    },
  };
};

export default Tokens;
