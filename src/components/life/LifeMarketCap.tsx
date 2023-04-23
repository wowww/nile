import cn from 'classnames';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconLogo } from '@/components/logo/IconLogo';

interface Props {
  tokenAddress: string;
  tokenName: string;
  iconName: string;
}

const LifeMarketCap = ({ tokenAddress, tokenName, iconName }: Props) => {
  const [tokenData, setTokenData] = useState<[]>();

  useEffect(() => {
    axios
      .get(`/api/tokenHistory`, {
        params: {
          token: `${tokenAddress}`,
          type: 'liquidity',
          unit: 'hour',
          unit_count: 1,
          unit_multiplier: 1,
        },
      })
      .then(({ data }) => {
        const Liquidity =
          data &&
          data.map((item: any) => ({
            TOKEN: Number(item['liquidity']),
          }));

        setTokenData(Liquidity?.at(0)?.TOKEN);
      });
  }, []);

  return (
    <div className={cn('life-market-cap')}>
      <dl>
        <dt>
          <IconLogo type={iconName} size={24} />
          <p>{tokenName} Liquidity</p>
        </dt>
        <dd className={cn('token-link')}>
          <Link href={`/tokens/detail?address=${tokenAddress}`}>
            <a>
              <p>$ {Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(Number(tokenData))}</p>
              <ReactSVG wrapper="span" src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
            </a>
          </Link>
        </dd>
      </dl>
    </div>
  );
};

export default LifeMarketCap;
