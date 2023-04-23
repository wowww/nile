import cn from 'classnames';
import { fromWei, toBN } from 'web3-utils';
import { IconLogo } from '@components/logo/IconLogo';
import React, { useEffect, useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { tokenListAtom } from '@/state/web3Atom';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { useTranslation } from 'next-i18next';
import axios from 'axios';

export const HeaderAccountCoinTab = () => {
  const { t } = useTranslation('common');

  const tokenList = useAtomValue(tokenListAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const [wemixUsdPrice, setWemixUsdPrice] = useState<number>(0);

  useEffect(() => {
    axios
      .get('/api/marketcap')
      .then(({ data }) => {
        setWemixUsdPrice(data.WEMIX[0].quote.USD.price);
      })
      .catch((error) => {
        setWemixUsdPrice(0);
      });
  }, []);

  const totalAmount = useMemo(() => {
    const bnTotal = tokenList
      ?.filter(({ balance }) => balance)
      ?.map(({ name, balance }) => toBN(`${balance}`).muln(name === 'wemix' ? wemixUsdPrice : 1))
      ?.reduce((prev, curr) => prev.add(curr), toBN(0));

    if (bnTotal) {
      const etherValue = fromWei(bnTotal, 'ether');
      return Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(Number(etherValue));
    }
    return '0';
  }, [tokenList, nileWallet, wemixUsdPrice]);

  return (
    <div className={cn('total-balance')}>
      <dl>
        <dt>{t('header.account.totalAmount')}</dt>
        <dd>
          <strong>${totalAmount}</strong>
        </dd>
      </dl>
      <div className={cn('coin-list-wrap')}>
        <ul className={cn('coin-list')}>
          {tokenList?.map(({ name, balance }): JSX.Element => {
            const bnValue = toBN(balance ?? '0');
            const etherValue = fromWei(bnValue, 'ether');
            const amount = Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(Number(etherValue));

            const wemixUSDValue = bnValue.muln(wemixUsdPrice);
            const etherWemixUSDValue = fromWei(wemixUSDValue, 'ether');
            const formattedWemixUSDValue = Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(Number(etherWemixUSDValue));

            return (
              <li key={name}>
                <span className={cn('coin-name')}>
                  {/* 23.04.06 수정: FRC 토큰은 현재 <IconLogo/>에 frc로 적용되어 있습니다. 참고 부탁드립니다.  */}
                  <IconLogo
                    type={name.toLowerCase() === 'wemix$' || name.toLowerCase() === 'wemix' ? `${name.toLowerCase()}_dark` : name.toLowerCase()}
                    size={16}
                  />
                  <span>{name.toUpperCase()}</span>
                </span>
                {
                  <div className={cn('amount-wrap')}>
                    <span className={cn('amount')}>{name.toLowerCase() === 'wemix$' ? `$${amount}` : amount}</span>
                    {name.toLowerCase() !== 'wemix$' && <span className={cn('converted')}>(${formattedWemixUSDValue})</span>}
                  </div>
                }
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
