import dynamic from 'next/dynamic';
import cn from 'classnames';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import { ColumnLineMixChartData, PriceHistoryFilterState } from '@/components/chart/chartDummyData';
import { DaoBox, DaoBoxLayout, DaoChartBox } from '@/components/dao/DaoBoxLayout';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { useAtom } from 'jotai';

import DaoChartArea from '../../DaoChartArea';

const ColumnLineMixChart = dynamic(() => import('@/components/chart/ColumnLineMixChart'), {
  ssr: false,
});

export const TreasuryGraph = () => {
  const { t } = useTranslation('dao');
  const [columnLineMixChartInit, setColumnLineMixChart] = useAtom(ColumnLineMixChartData);
  const [filter, setFilter] = useAtom(PriceHistoryFilterState);

  /* 23.03.30 수정: 다국어 missing 에러 수정 */
  const summaryObject = [
    {
      name: t('treasury.name'),
      value: '$ 1,200,000',
    },
  ];

  return (
    <div className={cn('dao-individual-graph-wrap treasury')}>
      <DaoBoxLayout className={cn('ratio')}>
        <DaoBox>
          <DaoChartArea
            areaType="treasury"
            title={t('treasury.chart.title')}
            figure={0}
            date="2022-07-22 03:30"
            inflow={0}
            outflow={0}
          />
        </DaoBox>
        <DaoBox className={cn('dao-common-card', 'treasury-report')}>
          <h4 className={cn('card-title')}>{t('treasury.report.title')}</h4>
          <ul className={cn('card-item-list', 'primary')}>
            <li className={cn('card-item')}>
              <div className={cn('card-notice')}>{t('treasury.report.item.0')}</div>
              <strong className={cn('card-unit active')}>$ 0</strong>
            </li>
          </ul>
          <ul className={cn('card-item-list')}>
            <li className={cn('card-item')}>
              <div className={cn('card-notice')}>{t('treasury.report.item.1')}</div>
              <strong className={cn('card-unit')}>$ 0</strong>
            </li>
            <li className={cn('card-item')}>
              <div className={cn('card-notice outflow')}>{t('treasury.report.item.2')}</div>
              <strong className={cn('card-unit')}>$ 0</strong>
            </li>
          </ul>
        </DaoBox>
      </DaoBoxLayout>
    </div>
  );
};

export default TreasuryGraph;
