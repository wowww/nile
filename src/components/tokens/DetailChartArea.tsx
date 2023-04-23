import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

// components
import axios from 'axios';
import { addEmptyData } from '@utils/chartUtils';
import { isMobile } from 'react-device-detect';
import { ChartPeriodType, PriceChartItemType, TokenChartType } from '@/types/chart.types';
import { Radio } from 'antd';
import Chip from '@components/tag/Chip';

const NegativeLineChart = dynamic(() => import('@/components/chart/NegativeLineChart'), { ssr: false });
const FilledLineChart = dynamic(() => import('@/components/chart/FilledLineChart'), { ssr: false });
const BarChart = dynamic(() => import('@/components/chart/BarChart'), { ssr: false });

interface Props {
  token: any;
}

const DetailChartArea = ({ token }: Props) => {
  const { t } = useTranslation(['tokens']);
  const [desktop] = useState<boolean>(!isMobile);

  const [chartType, setChartType] = useState<TokenChartType>(TokenChartType.PRICE);
  const [chartPeriod, setChartPeriod] = useState<ChartPeriodType>(ChartPeriodType.DAY);

  const [chartData, setChartData] = useState<PriceChartItemType[]>();

  const priceChangeRate = useMemo((): number => {
    if (chartPeriod === ChartPeriodType.DAY) {
      return token['24h'].price_change as number;
    }

    if (chartPeriod === ChartPeriodType.WEEK) {
      return token['7d'].price_change as number;
    }

    if (chartPeriod === ChartPeriodType.MONTH) {
      return token['1m'].price_change as number;
    }

    if (chartPeriod === ChartPeriodType.YEAR) {
      return token['1y'].price_change as number;
    }

    return 0;
  }, [chartPeriod, token]);

  const chartInitItem = useMemo((): PriceChartItemType | undefined => {
    if (chartData) {
      console.log('chartInitItem', chartData[chartData.length - 1].value);
      return { ...chartData[chartData.length - 1], changeRate: priceChangeRate };
    }

    return undefined;
  }, [chartData]);

  const btnList = [
    {
      name: t('detailChartArea.price'),
      value: TokenChartType.PRICE,
    },
    {
      name: t('detailChartArea.liquidity'),
      value: TokenChartType.LIQUIDITY,
    },
    {
      name: t('detailChartArea.volume'),
      value: TokenChartType.VOLUME,
    },
  ];

  useEffect(() => {
    setChartPeriod(ChartPeriodType.DAY);
  }, [chartType])

  useEffect(() => {
    if (token) {
      const params = {
        token: token.token_address,
        type: chartType,
        unit: '',
        unit_count: 30,
        unit_multiplier: 30,
      };

      switch (chartPeriod) {
        case ChartPeriodType.DAY:
          params.unit = 'minute';
          params.unit_count = 48;
          params.unit_multiplier = 30;
          break;
        case ChartPeriodType.WEEK:
          params.unit = 'hour';
          params.unit_count = 42;
          params.unit_multiplier = 4;
          break;
        case ChartPeriodType.MONTH:
          params.unit = 'day';
          params.unit_count = 30;
          params.unit_multiplier = 1;
          break;
        case ChartPeriodType.YEAR:
          params.unit = 'day';
          params.unit_count = 48;
          params.unit_multiplier = 7;
          break;
      }

      axios.get(`/api/tokenHistory`, { params })
        .then(({ data }) => {
          setChartData(
            [...addEmptyData(
              data.map((item: any) => ({
                date: item.timestamp,
                value: Number(item[chartType]),
              })),
              chartPeriod,
              desktop,
            )],
          );
        });
    }
  }, [token, chartType, chartPeriod]);

  return (
    <div className={cn('chart-area')}>
      <Radio.Group onChange={(e) => setChartType(e.target.value)} value={chartType} className={cn('radio-chip')}>
        {btnList.map((el, idx) => (
          <Radio.Button value={el.value} key={`${el.name}-${idx}`}>
            <Chip size="lg" bg={chartType === el.value}>
              {el.name}
            </Chip>
          </Radio.Button>
        ))}
      </Radio.Group>
      {chartData && (
        <>
          {chartType === TokenChartType.PRICE && (
            <NegativeLineChart
              chartPeriod={chartPeriod}
              setChartPeriod={setChartPeriod}
              chartData={chartData}
              initItem={chartInitItem}
              isMobile={isMobile} />
          )}
          {chartType === TokenChartType.LIQUIDITY && (
            <FilledLineChart
              chartPeriod={chartPeriod}
              setChartPeriod={setChartPeriod}
              chartData={chartData}
              initItem={chartInitItem}
              isMobile={isMobile} />
          )}
          {chartType === TokenChartType.VOLUME && (
            <BarChart
              chartPeriod={chartPeriod}
              setChartPeriod={setChartPeriod}
              chartData={chartData}
              initItem={chartInitItem}
              isMobile={isMobile}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DetailChartArea;
