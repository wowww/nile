import { useEffect, useState } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'next-i18next';
/* 22.11.04 수정: useRouter 추가 */
import { useRouter } from 'next/router';

// components
import RadioTab from '@/components/tokens/RadioTab';
/* 23.04.06 수정: frc 추가로 명칭 수정(stackedChartOnlyTIPODefaultDataType ->stackedChartTokenDataType) */
import { StackChartData, StackedChartData, stackedChartTokenDataType, TinyChartHourData } from '@/components/chart/tokensChartDummyData';
import { useAtomValue } from 'jotai';
import axios from 'axios';
import millify from 'millify';
import dayjs from 'dayjs';
import _ from 'lodash';

// 오픈 전
const StackLineChart = dynamic(() => import('@/components/chart/StackLineChart'), { ssr: false });
// 오픈 후
const StackedLineChart = dynamic(() => import('@/components/chart/StackedLineChart'), { ssr: false });
const BarChartHour = dynamic(() => import('@/components/chart/BarChartHour'), { ssr: false });

interface Props {
  tipo?: any;
  force?: any;
  tokens?: any[];
}

const TotalCapValue = ({ tipo, force, tokens }: Props) => {
  const { t } = useTranslation('tokens');
  /* 22.11.04 수정: useRouter 추가 */
  const { locale } = useRouter();
  const stackChartInit = useAtomValue(StackChartData);
  const stackedChartInit = useAtomValue(StackedChartData);
  const tinyChartInit = useAtomValue(TinyChartHourData);
  const [nowTab, setNowTab] = useState<string>('liquidity');
  const coinCount = 0;
  const TabItems = [
    {
      value: 'liquidity',
      name: t('totalCapValue.tabItems.liquidity'),
    },
    {
      value: 'volume',
      name: t('totalCapValue.tabItems.volume'),
    },
  ];

  /* 23.04.06 수정: frc 추가로 명칭 수정(stackedChartOnlyTIPODefaultDataType ->stackedChartTokenDataType) */
  const [liquidityChartData, setLiquidityChartData] = useState<stackedChartTokenDataType[]>();
  const [volumeChartData, setVolumeChartData] = useState<any[]>();

  useEffect(() => {
    if (tokens) {
      console.log(tokens);
      Promise.all(
        tokens.map((token) =>
          axios.get(`/api/tokenHistory`, {
            params: {
              token: token.token_address,
              type: 'liquidity',
              unit: 'hour',
              unit_count: 42,
              unit_multiplier: 4,
            },
          }),
        ),
      ).then((res) => {
        console.log(res);
        const stdData = _.maxBy(res, (item) => item.data?.length);
        if (stdData?.data.length) {
          const arr = stdData.data.map((item: any) => {
            const obj: { [key: string]: any } = {};

            obj['date'] = item.timestamp;
            obj['TOTAL'] = 0;
            res.forEach((resItem, resIdx) => {
              const dataItem = resItem.data.find((dataItem: any) => dataItem.timestamp == item.timestamp);

              if (tokens[resIdx].token_symbol) {
                obj[tokens[resIdx].token_symbol] = dataItem ? Number(dataItem['liquidity']) : 0;
                console.log(tokens[resIdx].token_symbol, obj[tokens[resIdx].token_symbol]);

                obj['TOTAL'] += obj[tokens[resIdx].token_symbol];
              }
            });

            return obj;
          });

          setLiquidityChartData(arr);
        }
      });

      Promise.all(
        tokens.map((token) =>
          axios.get(`/api/tokenHistory`, {
            params: {
              token: token.token_address,
              type: 'volume',
              unit: 'minute',
              unit_count: 48,
              unit_multiplier: 30,
            },
          }),
        ),
      ).then((res) => {
        console.log(res);
        const stdData = _.maxBy(res, (item) => item.data?.length);
        if (stdData?.data.length) {
          const arr = stdData.data.map((item: any) => {
            const obj: { [key: string]: any } = {};

            obj['date'] = item.timestamp;
            obj['TOTAL'] = 0;
            res.forEach((resItem, resIdx) => {
              const dataItem = resItem.data.find((dataItem: any) => dataItem.timestamp == item.timestamp);

              if (tokens[resIdx].token_symbol) {
                obj[tokens[resIdx].token_symbol] = dataItem ? Number(dataItem['volume']) : 0;

                obj['TOTAL'] += obj[tokens[resIdx].token_symbol];
              }
            });

            return obj;
          });

          setVolumeChartData(arr);
        }
      });
    }
  }, [tokens]);

  return (
    <div className={cn('tokens-inner', 'total-cap-value')}>
      <strong className={cn('tokens-header-text')}>
        {/* 코인 개수 10개 이하는 숫자 제외 문구 */}
        {coinCount > 10 && coinCount} Tokens on NILE
        <br />
        are changing our life
      </strong>
      <div className={cn('tokens-overview')}>
        <div className={cn('left')}>
          <RadioTab btnList={TabItems} nowTab={nowTab} setNowTab={setNowTab} />
          <div className={cn('info-wrap')}>
            <strong className={cn('info-name')}>{nowTab === 'liquidity' ? t('totalCapValue.infoName') : t('totalCapValue.infoName2')}</strong>
            <span className={cn('figure')}>
              {tokens &&
                `$${new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
                  _.sumBy(tokens, (item) => (nowTab === 'liquidity' ? item.liquidity : item['24h'].volume)),
                )}`}
            </span>
            <span className={cn('date')}>
              {locale === 'ko' ? `${dayjs().format('YYYY-MM-DD HH:mm')} ${t('totalCapValue.dateText')}` : `${dayjs().format('YYYY-MM-DD HH:mm')}`}
            </span>
          </div>
        </div>
        <div className={cn('right')}>
          {nowTab === 'liquidity' && liquidityChartData && <StackedLineChart data={liquidityChartData} category={['TOTAL', 'TIPO', 'FRC']} />}
          {nowTab === 'volume' && volumeChartData && <BarChartHour dataItems={volumeChartData} />}
        </div>
      </div>
    </div>
  );
};

export default TotalCapValue;
