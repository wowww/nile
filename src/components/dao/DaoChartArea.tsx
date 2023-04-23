import { useEffect, useState } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { useAtomValue, useAtom } from 'jotai';
import { Popover } from 'antd';
import useMediaQuery from '@/hook/useMediaQuery';

import TagFluctuationRate from '@/components/tag/TagFluctuationRate';
import ChartPeriodTab from '@/components/chart/ChartPeriodTab';
import { ColumnLineMixChartData, lineChartData, DaoIncineratorChartData } from '@/components/chart/chartDummyData';

import { ChartPeriodType } from '@/types/common.types';
/* 23.02.22 수정: daoThemeAtom 추가 */
import { daoThemeAtom } from '@/state/daoAtom';
import Link from 'next/link';
import TextButton from '@/components/button/TextButton';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import dayjs from 'dayjs';

const NegativeLineChart = dynamic(() => import('@/components/chart/DaoNegativeLineChart'), {
  ssr: false,
});

const ColumnLineMixChart = dynamic(() => import('@/components/chart/ColumnLineMixChart'), {
  ssr: false,
});

const FilledLineChart = dynamic(() => import('@/components/chart/DaoFilledLineChart'), { ssr: false });

const AreaLineMixChart = dynamic(() => import('@/components/chart/AreaLineMixChart'), {
  ssr: false,
});

interface Props {
  areaType: 'home' | 'treasury' | 'incinerator' | 'obelisk' | 'trust';
  title: string;
  figure: number;
  exchange?: number;
  date: string;
  total?: number;
  inflow?: number;
  supply?: number;
  burn?: number;
  outflow?: number;
  /* 23.03.02 수정: titleHref 케이스 추가 */
  titleHref?: string;
}

/* 23.03.02 수정: titleHref 케이스 추가 */
const DaoChartArea = ({ areaType, title, exchange, date, total, inflow, supply, burn, outflow, titleHref }: Props) => {
  const hasDollarSign = ['home'];
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { t } = useTranslation('dao');

  const [chartPeriod, setChartPeriod] = useState<ChartPeriodType>('day');
  const [columnLineMixChartInit, setColumnLineMixChart] = useAtom(ColumnLineMixChartData);
  const ChartDummy = [
    {
      value: 0,
      date: new Date('2023-01-08 00:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 01:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 02:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 03:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 04:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 05:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 06:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 07:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 08:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 09:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 10:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 11:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 12:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 13:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 14:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 15:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 16:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 17:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 18:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 19:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 20:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 21:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 22:00').getTime(),
    },
    {
      value: 0,
      date: new Date('2023-01-08 23:00').getTime(),
    },
  ];

  const [selectedItem, setSelectedItem] = useState<any>(
    areaType === 'treasury' ? columnLineMixChartInit[0] : areaType === 'incinerator' ? DaoIncineratorChartData[0] : ChartDummy[0],
  );
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('chart-box')}>
      {/* 23.03.02 수정: titleHref 케이스 추가 */}
      {/* 23.04.05 수정: arrow svg xl 케이스 변경 */}
      <strong className={cn('title')}>{titleHref ? <TextButton buttonText={title} iconValue="arrow-xl" size="xl" href={titleHref} /> : title}</strong>
      <div className={cn('chart-area')}>
        <div className={cn('info-area')}>
          <div className={cn('left')}>
            <div className={cn('main-info')}>
              <div className={cn('figure', areaType)}>
                <div className={cn('amount-data')}>
                  {hasDollarSign.includes(areaType) ? (
                    `$ ${selectedItem?.value.toFixed(2)}`
                  ) : areaType === 'treasury' ? (
                    `$ ${selectedItem.total.toLocaleString()}`
                  ) : areaType === 'incinerator' ? (
                    <>
                      {`${selectedItem.burn.toLocaleString()}`}
                      {/* 23.03.29 수정: 단위 다국어 표기 unit2 -> unit1 */}
                      {/* 23.03.24 수정: 단위 다국어 표기 */}
                      <span className={cn('chart-unit')}>{t(`amountUnit.${activeDao.value}.unit1`)}</span>
                    </>
                  ) : /* 23.03.22 수정: 트러스트 타입 추가 */
                  areaType === 'trust' ? (
                    <>
                      {`${selectedItem?.value.toFixed(2)}`}
                      <span className={cn('chart-unit')}>%</span>
                    </>
                  ) : (
                    /* 23.03.22 수정: 오벨리스크 타입 */
                    /* 23.03.29 수정: 합산액 소수점 표기 X, 단위 표기 변경 */
                    <>
                      {`${selectedItem?.value}`}
                      {/* 23.03.24 수정: 단위 다국어 표기 */}
                      <span className={cn('chart-unit')}>{t(`amountUnit.${activeDao.value}.unit1`)}</span>
                    </>
                  )}
                  {exchange && <span className={cn('wemix-unit')}>({exchange} WEMIX)</span>}
                  {!isMobile && areaType !== 'trust' && areaType !== 'home' && (
                    <div className={cn('date')}>{areaType === 'treasury' ? date : dayjs.utc(selectedItem.date).format('YYYY-MM-DD mm:ss')}</div>
                  )}
                </div>
                {areaType === 'treasury' && (
                  <div className={cn('flow-info')}>
                    <>
                      <div className={cn('info-row')}>
                        <span className={cn('info-name')}>{!isMobile ? t('treasury.chart.legend.0') : t('treasury.chart.legend.3')}</span>
                        <span className={cn('figure')}>$ {selectedItem.inflow ? Math.abs(selectedItem.inflow).toLocaleString() : inflow}</span>
                      </div>
                      <div className={cn('info-row')}>
                        <span className={cn('info-name')}>{!isMobile ? t('treasury.chart.legend.1') : t('treasury.chart.legend.4')}</span>
                        <span className={cn('figure')}>$ {selectedItem.outflow ? Math.abs(selectedItem.outflow).toLocaleString() : outflow}</span>
                      </div>
                    </>
                  </div>
                )}
                {areaType === 'incinerator' && (
                  <div className={cn('flow-info')}>
                    {' '}
                    <div className={cn('info-row')}>
                      <span className={cn('info-name')}>{t('incinerator.chart.legend.0')} : $</span>
                      <span className={cn('figure for-incinerator')}>
                        {selectedItem.supply
                          ? Number(Math.abs(selectedItem.supply))
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : supply}
                      </span>
                    </div>
                  </div>
                )}

                {/* 23.03.21 수정: 디자인 수정에 따른  chip 마크업 위치 수정 */}
                {/* 23.03.29 수정: 가격 소수점 둘째자리까지 */}
                {areaType !== 'treasury' && areaType !== 'incinerator' && areaType !== 'trust' && areaType !== 'home' && (
                  <span className={cn('dollar-tag')}>$0</span>
                )}
                {/* 23.03.22 수정: 조건 추가 */}
                {areaType === 'home' && <TagFluctuationRate figure={9} large type="primary" />}
                {areaType === 'trust' && <TagFluctuationRate figure={9} large type="primary" />}
              </div>
              {areaType === 'trust' && <div className={cn('date')}>{dayjs.utc(selectedItem.date).format('YYYY-MM-DD mm:ss')}</div>}
              {areaType === 'home' && <div className={cn('date')}>{dayjs.utc(selectedItem.date).format('YYYY-MM-DD mm:ss')}</div>}
              {isMobile && areaType !== 'trust' && areaType !== 'home' && (
                <div className={cn('date')}>{areaType === 'treasury' ? date : dayjs.utc(selectedItem.date).format('YYYY-MM-DD mm:ss')}</div>
              )}
            </div>
          </div>
          <div className={cn('right')}>
            {total && (
              <div className={cn('total')}>
                <span className={cn('info-name')}>{t('daoChart.total')}</span>
                <div className={cn('info-detail')}>
                  <span className={cn('figure')}>{total.toLocaleString()}</span>
                  <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                </div>
              </div>
            )}
            {areaType === 'treasury' && (
              <>
                <ChartPeriodTab setFilter={setChartPeriod} filterData={['daily', 'monthly', 'yearly']} defaultValue="daily" />
                {!isMobile ? (
                  <ul className={cn('treasury-custom-legend')}>
                    <li>{t('treasury.chart.legend.0')}</li>
                    <li>{t('treasury.chart.legend.1')}</li>
                    <li>{t('treasury.chart.legend.2')}</li>
                  </ul>
                ) : (
                  <Popover
                    overlayClassName="tooltip"
                    placement="topRight"
                    content={
                      <ul className={cn('treasury-custom-legend')}>
                        <li>{t('treasury.chart.legend.0')}</li>
                        <li>{t('treasury.chart.legend.1')}</li>
                        <li>{t('treasury.chart.legend.2')}</li>
                      </ul>
                    }
                    trigger="hover"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    className="tooltip-button-wrap"
                  >
                    {/* 23.03.30 수정: Legend 다국어 처리 */}
                    <span className={cn('tooltip-name')}>{t('treasury.chart.legend.5')}</span>
                    <button type="button" className={cn('chart-area-tooltip-button')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                    </button>
                  </Popover>
                )}
              </>
            )}
            {areaType === 'incinerator' && (
              <>
                <ChartPeriodTab setFilter={setChartPeriod} filterData={['month', 'year']} defaultValue="month" />
                {!isMobile ? (
                  <ul className={cn('treasury-custom-legend incinerator')}>
                    {/* 23.03.31 수정: 다국어 토큰명 변수처리 */}
                    <li>{t('incinerator.chart.legend.0', { type: useDaoCharacterConvert(activeDao.value) })}</li>
                    <li>{t('incinerator.chart.legend.1')}</li>
                  </ul>
                ) : (
                  <Popover
                    overlayClassName="tooltip"
                    placement="topRight"
                    content={
                      <ul className={cn('treasury-custom-legend incinerator')}>
                        {/* 23.03.31 수정: 다국어 토큰명 변수처리 */}
                        <li>{t('incinerator.chart.legend.0', { type: useDaoCharacterConvert(activeDao.value) })}</li>
                        <li>{t('incinerator.chart.legend.1')}</li>
                      </ul>
                    }
                    trigger="hover"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    className="tooltip-button-wrap"
                  >
                    {/* 23.03.30 수정: Legend 다국어 처리 */}
                    <span className={cn('tooltip-name')}>{t('treasury.chart.legend.5')}</span>
                    <button type="button" className={cn('chart-area-tooltip-button')}>
                      <span className={cn('a11y')}>tooltip</span>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                    </button>
                  </Popover>
                )}
              </>
            )}
            {(areaType === 'trust' || areaType === 'obelisk') && <ChartPeriodTab setFilter={setChartPeriod} />}
          </div>
        </div>
        <div className={cn('chart-wrap', areaType)}>
          {areaType === 'home' && <NegativeLineChart initItem={ChartDummy[0]} chartData={ChartDummy} setSelectedItem={setSelectedItem} />}
          {areaType === 'incinerator' && <AreaLineMixChart id="incinerator-chart" data={DaoIncineratorChartData} setSelectedItem={setSelectedItem} />}
          {areaType === 'treasury' && (
            <>
              <ColumnLineMixChart id="treasury-chart" data={columnLineMixChartInit} setSelectedItem={setSelectedItem} />
              <button className={cn('chart-button')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
              </button>
              <button className={cn('chart-button')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
              </button>
            </>
          )}
          {(areaType === 'trust' || areaType === 'obelisk') && (
            <FilledLineChart chartPeriod={chartPeriod} chartData={ChartDummy} setSelectedItem={setSelectedItem} type={areaType} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DaoChartArea;
