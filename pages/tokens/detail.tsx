import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import DetailHeader from '@/components/tokens/DetailHeader';
import TokenFluctuationInfo from '@/components/tokens/TokenFluctuationInfo';
import TokenInfo from '@/components/tokens/TokenInfo';
import DetailChartArea from '@/components/tokens/DetailChartArea';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as http from 'http';
import axios from 'axios';

const TokensDetail = () => {
  const router = useRouter();
  const [tokenAddress, setTokenAddress] = useState('');
  const [token, setToken] = useState<any>();

  const snsLink = {
    // TIPO
    // telegram: 'https://t.me/Tangled_announcement',
    // twitter: 'https://twitter.com/tangled_nft',
    // youtube: 'https://www.youtube.com/@tangledofficial8038',
    // discord: 'https://discord.com/invite/tUNwSykFGb',
    // gitbook: 'https://static.tangled.at/whitepaper.pdf',

    // FRC
    telegram: '',
    twitter: 'https://twitter.com/theSNKRZ',
    youtube: 'https://www.youtube.com/@thesnkrz',
    discord: 'https://discord.com/invite/thesnkrz',
    gitbook: '',
  };

  const fetchToken = async () => {
    return await axios.get(`/api/tokenInfoList?token=${tokenAddress}`);
  };

  useEffect(() => {
    if (router.isReady) {
      const address = router.query.address as string;

      if (!address) {
        router.replace('/tokens');
      }

      console.log(address);

      setTokenAddress(address);
    }
  }, [router]);

  useEffect(() => {
    if (tokenAddress) {
      axios.get(`/api/tokenInfoList?token=${tokenAddress}`).then(({ data }) => {
        setToken(data[0]);
      });
    }
  }, [tokenAddress]);

  return (
    <div className={cn('tokens')}>
      <div className={cn('tokens-inner')}>

        {token && (
          <>
            <DetailHeader token={token} />
            <div className={cn('detail-body')}>
              <TokenFluctuationInfo token={token} />
              <div className={cn('body-right')}>
                <DetailChartArea token={token} />
                <TokenInfo snsLink={snsLink} token={token} />
              </div>
            </div>
          </>
        )}
      </div>
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

export default TokensDetail;
