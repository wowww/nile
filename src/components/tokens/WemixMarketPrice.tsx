import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

// components
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { IconLogo } from '@components/logo/IconLogo';
import { TinyChartData } from '@/components/chart/tokensChartDummyData';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TinyChart = dynamic(() => import('@/components/chart/TinyChart'), { ssr: false });

interface Props {
  wemix?: any;
  wemix$?: any;
}

const WemixMarketPrice = ({ wemix, wemix$ }: Props) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const tinyChartInit = useAtomValue(TinyChartData);

  const [primaryPeriod, setPrimaryPeriod] = useState('day');
  const [secondaryPeriod, setSecondaryPeriod] = useState('day');

  const [primaryChartData, setPrimaryChartData] = useState<any[]>();
  const [secondaryChartData, setSecondaryChartData] = useState<any[]>();

  useEffect(() => {
    if (wemix && primaryPeriod) {
      const params = {
        token: wemix.token_address,
        type: 'price',
        unit: 'minute',
        unit_count: 48,
        unit_multiplier: 30,
      };

      switch (primaryPeriod) {
        case 'day':
          params.unit = 'minute';
          params.unit_count = 48;
          params.unit_multiplier = 30;
          break;
        case 'week':
          params.unit = 'hour';
          params.unit_count = 42;
          params.unit_multiplier = 4;
          break;
        case 'month':
          params.unit = 'day';
          params.unit_count = 30;
          params.unit_multiplier = 1;
          break;
        case 'year':
          params.unit = 'day';
          params.unit_count = 48;
          params.unit_multiplier = 7;
          break;
      }

      axios.get(`/api/tokenHistory`, { params }).then(({ data }) => {
        const chartData = data.map((item: any) => ({
          date: item.timestamp,
          value: Number(item['price']),
        }));

        setPrimaryChartData(chartData);
      });
    }
  }, [wemix, primaryPeriod]);

  useEffect(() => {
    if (wemix$ && secondaryPeriod) {
      const params = {
        token: wemix$.token_address,
        type: 'price',
        unit: 'minute',
        unit_count: 48,
        unit_multiplier: 30,
      };

      console.log(secondaryPeriod);

      switch (secondaryPeriod) {
        case 'day':
          params.unit = 'minute';
          params.unit_count = 48;
          params.unit_multiplier = 30;
          break;
        case 'week':
          params.unit = 'hour';
          params.unit_count = 42;
          params.unit_multiplier = 4;
          break;
        case 'month':
          params.unit = 'day';
          params.unit_count = 30;
          params.unit_multiplier = 1;
          break;
        case 'year':
          params.unit = 'day';
          params.unit_count = 48;
          params.unit_multiplier = 7;
          break;
      }
      console.log(params);
      axios.get(`/api/tokenHistory`, { params }).then(({ data }) => {
        if (Array.isArray(data)) {
          const chartData = data.map((item: any) => ({
            date: item.timestamp,
            value: 1.0,
          }));

          setSecondaryChartData(chartData);
        }
      });
    }
  }, [wemix$, secondaryPeriod]);

  return (
    <div className={cn('market-price-wrap')}>
      <div className={cn('market-price-inner')}>
        <div className={cn('token-info-box')}>
          <a
            href={`https://wemix.fi/${locale}/tokensdetail?address=0x7D72b22a74A216Af4a002a1095C8C707d6eC1C5f`}
            className={cn('token-link')}
            target="_blank"
            title={t('blank')}
            rel="noopener noreferrer"
          >
            <IconLogo type="wemix" size={40} />
            <div className={cn('text-box')}>
              <span className={cn('coin-name')}>WEMIX</span>
              <div className={cn('row')}>
                {wemix && <span className={cn('figure')}>${new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(wemix.price)}</span>}
                {wemix && <TagFluctuationRate figure={wemix['24h'].price_change} />}
              </div>
            </div>
          </a>
          <div className={cn('chart-area')}>
            {primaryChartData && <TinyChart dataItems={primaryChartData} height={46} isPeriod onPeriodChange={setPrimaryPeriod} />}
          </div>
        </div>
        <div className={cn('token-info-box')}>
          <a
            href={`https://wemix.fi/${locale}/tokensdetail?address=0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1`}
            className={cn('token-link')}
            target="_blank"
            title={t('blank')}
            rel="noopener noreferrer"
          >
            <IconLogo type="wemix$" size={40} />
            <div className={cn('text-box')}>
              <span className={cn('coin-name')}>WEMIX$</span>
              <div className={cn('row')}>
                <span className={cn('figure')}>$1.00</span>
                <TagFluctuationRate figure={0} />
              </div>
            </div>
          </a>
          <div className={cn('chart-area')}>
            {secondaryChartData && <TinyChart dataItems={secondaryChartData} height={46} isPeriod onPeriodChange={setSecondaryPeriod} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WemixMarketPrice;
