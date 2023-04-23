import React from 'react';
import cn from 'classnames';
import useWindowResize from '@/hook/useWindowResize';
import { windowResizeAtom } from '@/state/windowAtom';

// components
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { IconLogo } from '@components/logo/IconLogo';
import { useAtomValue } from 'jotai';

const TopMovers = () => {
  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);
  const data = [
    {
      name: 'Wrapped BNB(WBNB)',
      type: 'wbnb',
      price: 237.53,
      figure: 9.66,
    },
    {
      name: 'Tether(USDT)',
      type: 'usdt',
      price: 237.53,
      figure: -9.66,
    },
    {
      name: 'BUSD Token(BUSD)',
      type: 'busd',
      price: 237.53,
      figure: 0,
    },
    {
      name: 'USD Coin(USDC)',
      type: 'usdc',
      price: 237.53,
      figure: 9.66,
    },
  ];

  return (
    <div className={cn('top-movers-wrap')}>
      <h2 className={cn('tokens-title')}>Top Movers</h2>
      <ul className={cn('top-movers-list')}>
        {data.map((token) => (
          <li className={cn('movers-inner')}>
            <span className={cn('logo-wrap')}>
              <IconLogo type={token.type} size={offset.width >= 768 ? 40 : 32} />
            </span>
            <div className={cn('movers-info-txt-wrap')}>
              <h3 className={cn('token-name')}>{token.name}</h3>
              <div className={cn('price')}>${token.price}</div>
              <TagFluctuationRate figure={token.figure} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopMovers;
