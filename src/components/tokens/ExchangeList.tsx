import { useEffect, useState } from 'react';
import cn from 'classnames';
import { windowResizeAtom } from '@/state/windowAtom';
import { Collapse } from 'antd';
import { useTranslation } from 'next-i18next';
import PaginationCustom from '@/components/button/PaginationCustom';
/* 23.03.28 수정: windowResizeAtom -> useMediaQuery 교체 */
import useMediaQuery from '@/hook/useMediaQuery';

// components
import TextButton from '../button/TextButton';

import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

const ExchangeList = () => {
  const { t } = useTranslation(['tokens', 'common']);
  const { Panel } = Collapse;
  /* 23.03.28 수정: windowResizeAtom -> useMediaQuery 교체 */
  const isMobile = useMediaQuery('(max-width: 767px)');
  const imgSize = { width: 186, height: 80 };

  // pagination 사용시 필요한 부분 Start
  const [activatePagination, setPaginationActivate] = useState(1);
  // 페이지 넘버
  const [pageNumber, setPageNumber] = useState(10);
  // 보여줄 데이터 최소값
  const [minData, setMinData] = useState(0);
  // 보여줄 데이터 최대값
  const [maxData, setMaxData] = useState(8);
  // 반응형에 따른 보여줄 데이터값 수
  const [responsive, setResponsive] = useState(8);

  const onChange = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);

    setMinData(responsive * (page - 1));

    setMaxData(responsive * page);
  };

  const exchangeList = [
    /* 23.03.28 수정: 링크 대체 텍스트 추가 */
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_coinone.svg" />,
      link: 'https://coinone.co.kr/exchange/trade/wemix/krw',
      name: 'coinone',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_gdac.svg" />,
      link: 'https://www.gdac.com/exchange/WEMIXC/BTC',
      name: 'GDAC',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_gateio.svg" />,
      link: 'https://www.gate.io/trade/WEMIX_USDT',
      name: 'gate.io',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_huobi.svg" />,
      link: 'https://www.huobi.com/en-us/exchange/wemix_usdt/',
      name: 'Huobi Global',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_bitmart.svg" />,
      link: 'https://www.bitmart.com/trade/en-US?symbol=WEMIX_USDT&layout=basic',
      name: 'BitMart',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_kucoin.svg" />,
      link: 'https://www.kucoin.com/ko/trade/WEMIX-USDT',
      name: 'KUCOIN',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_bybit.svg" />,
      link: 'https://www.bybit.com/en-US/trade/spot/WEMIX/USDT',
      name: 'BYBIT',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_mexc.svg" />,
      link: 'https://www.mexc.com/ko-KR/exchange/WEMIX_USDT',
      name: 'MEXC Global',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_bitget.svg" />,
      link: 'https://www.bitget.com/en-GB/spot/WEMIXUSDT_SPBL',
      name: 'Bitget',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_bit.svg" />,
      link: 'https://www.bit.com/spot?pair=WEMIX-USDT',
      name: 'BIT',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_bns.svg" />,
      link: 'https://bitbns.com/trade/#/wemix',
      name: 'BNS',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_indodax.svg" />,
      link: 'https://indodax.com/market/WEMIXIDR',
      name: 'INDODAX',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_mercado.svg" />,
      link: 'https://www.mercadobitcoin.com.br/negociacoes/wemix',
      name: 'Mercado Bitcoin',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_bitforex.svg" />,
      link: isMobile ? 'https://m.bitforex.com/en/spot?busitype=coin-usdt-wemix&appTheme=light' : 'https://www.bitforex.com/en/spot/wemix_usdt',
      name: 'BitForex',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_crypto.svg" />,
      link: 'https://crypto.com/exchange/trade/WEMIX_USD',
      name: 'crypto.com',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_probit.svg" />,
      link: 'https://www.probit.com/app/exchange/WEMIX-USDT',
      name: 'PROBIT GLOBAL',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_bittrex.svg" />,
      link: 'https://global.bittrex.com/trade/wemix-usdt',
      name: 'BITTREX GLOBAL',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_xt.svg" />,
      link: 'https://www.xt.com/trade/wemix_usdt',
      name: 'xt.com',
    },
    {
      icon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/exchange/icon_coinex.svg" />,
      link: 'https://www.coinex.com/exchange/wemix-usdt',
      name: 'CoinEx',
    }
  ];
  const [list, setList] = useState(exchangeList);
  const [activateShowMore, setActivateShowMore] = useState(true);

  return (
    <div className={cn('exchange-wrap')}>
      <div className={cn('exchange-inner')}>
        <h2 className={cn('tokens-title')}>{t('exchangeList.title')}</h2>
        <p className={cn('desc')}>{t('exchangeList.desc')}</p>
        <ul className={cn('exchange-list', 'active')}>
          {/* 23.03.28 수정: useState 값 삭제, exchangeList 값 바로 연결로 수정 */}
          {exchangeList.map((e, idx) => {
            return (
              <li key={idx}>
                <a href={e.link} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
                  {e.icon}
                  {/* 23.03.28 수정: 대체 텍스트 추가 */}
                  <span className={cn('a11y')}>{e.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExchangeList;
