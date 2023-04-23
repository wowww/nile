/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { uuid } from 'uuidv4';
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import BigNumber from 'bignumber.js';
import { setChartDateFormats, setXBaseInterval, setXGridIntervals } from '@utils/chartUtils';
import { ChartPeriodType } from '@/types/common.types';
import { useTranslation } from 'next-i18next';
import { PriceChartItemType } from '@/types/chart.types';

/* 23.02.28 수정: 그래프 다오 컬러 변경으로 인한 daoColorSet1, useAtomValue, daoThemeAtom 추가 */
import { daoColorSet1 } from '@components/dao/ui/daoColorSet';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

interface LineChartPropsType {
  chartPeriod: ChartPeriodType;
  chartData: PriceChartItemType[];
  isMobile?: boolean;
  setSelectedItem: (selectedItem: any) => void;
  type: string;
}

const FilledLineChart: React.FC<LineChartPropsType> = ({ chartPeriod, chartData, isMobile = false, setSelectedItem, type }) => {
  /* 23.02.28 수정: 그래프 다오 컬러 변경으로 인한 daoColorSet1, useAtomValue, daoThemeAtom 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  // const timeParse = (time: number) => moment(time).format('YYYY-MM-DD HH:MM');

  const calcPercentage = (v1: number, v2: number): number => {
    console.log(v1, v2);
    let denominator = v1;
    if (v1 === 0) {
      denominator = 1;
    }
    const percent = new BigNumber(v2).minus(v1).multipliedBy(100).dividedBy(denominator).toNumber();

    return percent;
  };

  const Id = uuid();
  useEffect(() => {
    const root = am5.Root.new(Id);
    root.setThemes([am5themes_Animated.new(root)]);
    // root.numberFormatter.setAll({
    //   numberFormat: '#.00',
    // });

    setTimeout(() => {
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          maxTooltipDistance: 0,
          cursor: am5xy.XYCursor.new(root, {}),
        }),
      );
      chart.zoomOutButton.set('forceHidden', true);

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          numberFormat: '#.00',
          min: type === 'obelisk' ? 0 : undefined,
          max: type === 'obelisk' ? 100 : undefined,
          // logarithmic: true,
          // maxPrecision: 100,
          renderer: am5xy.AxisRendererY.new(root, {
            opposite: true,
            visible: true,
          }),
        }),
      );

      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: setXBaseInterval(chartPeriod, !isMobile),
          // baseInterval: { timeUnit: 'hour', count: 1 },
          // gridIntervals: setXGridIntervals(chartPeriod, !isMobile),
          // dateFormats: setChartDateFormats(chartPeriod, !isMobile),
          markUnitChange: false,
          endLocation: 1,
          /* 23.04.11 수정: 4/6검수 - obelist, trust 차트 cursor bullet 잘리는 현상 수정 */
          startLocation: 0,
          paddingLeft: 0,
          renderer: am5xy.AxisRendererX.new(root, {
            visible: false,
          }),
          tooltip: am5.Tooltip.new(root, {
            forceHidden: true,
          }),
        }),
      );
      xAxis.data.setAll(chartData);

      // 축 스타일
      const xRenderer = xAxis.get('renderer');
      xRenderer.grid.template.setAll({
        visible: false,
        // stroke: am5.color(0xffffff),
      }); // x축 배경선
      xRenderer.labels.template.setAll({
        oversizedBehavior: 'none',
        // maxWidth: 40,
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        paddingTop: 8,
        paddingLeft: 0,
        fontSize: 12,
        /* 23.04.11 수정: 4/6검수 - obelist, trust 차트 cursor bullet 잘리는 현상 수정 */
        minPosition: 0.1,
      }); // x축 라벨
      const yRenderer = yAxis.get('renderer');
      yRenderer.grid.template.setAll({
        visible: false,
      }); // y축 배경선
      yRenderer.labels.template.setAll({
        visible: type === 'obelisk' ? false : true,
        oversizedBehavior: 'fit',
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        fontSize: 12,
      }); // y축 라벨

      // 시리즈 생성
      const createSeries = (name: string, field: string, stroke: any) => {
        const series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name,
            xAxis,
            yAxis,
            valueYField: field,
            valueXField: 'date',
            stroke,
            // minDistance: 0,
            // minBulletDistance: 10,
            /* 23.04.11 수정: 4/6검수 - obelist, trust 차트 cursor bullet 잘리는 현상 수정 */
            maskBullets: false,
            fill: am5.color(0x9860ff),
            stacked: true,
            tooltip: am5.Tooltip.new(root, {
              forceHidden: true,
            }),
          }),
        );
        // series.fills.template.setAll({
        //   visible: true,
        //   fillOpacity: 0.6,
        // });
        series.fills.template.setAll({
          visible: true,
          fillOpacity: 1,
          fillGradient: am5.LinearGradient.new(root, {
            /* 23.02.28 수정: 그래프 컬러 변경 */
            stops: [
              {
                color: am5.color(0xffffff),
                opacity: 0,
              },
              {
                color: am5.color(0xffffff),
                opacity: 0,
              },
            ],
          }),
        });
        series.strokes.template.setAll({
          strokeWidth: 2,
          stroke,
        });

        series.data.setAll(chartData);
        series.appear(1000);

        series.bullets.push(() => {
          // create the circle first
          /* 23.03.29 수정: 불릿 테두리 색상 변경 */
          const circle = am5.Circle.new(root, {
            radius: 6,
            interactive: true,
            fill: am5.color(0xffffff),
            stroke: am5.color(daoColorSet1(activeDao.value)),
            strokeWidth: 2,
            opacity: 0,
          });
          circle.states.create('default', {
            opacity: 0,
          });
          circle.states.create('hover', {
            opacity: 1,
          });
          return am5.Bullet.new(root, {
            sprite: circle,
          });
        });

        const cursor = chart.set(
          'cursor',
          am5xy.XYCursor.new(root, {
            xAxis: xAxis,
          }),
        );

        cursor.lineY.set('visible', false);

        /* 23.03.29 수정: XYcursor 라인 컬러 변경 */
        cursor.lineX.setAll({
          stroke: am5.color(daoColorSet1(activeDao.value)),
        });

        let previousBulletSprites: any = [];
        const cursorMoved = () => {
          for (let i = 0; i < previousBulletSprites.length; i++) {
            previousBulletSprites[i].unhover();
          }
          previousBulletSprites = [];
          const dataItem = series?.get('tooltip')?.dataItem;
          if (dataItem?.bullets) {
            const bulletSprite = dataItem.bullets[0].get('sprite');
            bulletSprite.hover();
            previousBulletSprites.push(bulletSprite);

            const chartItem = dataItem.dataContext as PriceChartItemType;

            let index = chartData.indexOf(chartItem);
            const isLastData = index === chartData.length - 1;
            if (index > 0) {
              index--;
            } else {
              index = 0;
            }

            setSelectedItem({
              value: chartItem.value,
              date: chartItem.date,
              changeRate: calcPercentage(chartData[index].value, chartItem.value),
            });
          }
        };

        cursor.events.on('cursormoved', cursorMoved);

        if (type === 'obelisk') {
          const seriesRangeDataItem = yAxis.makeDataItem({ value: 100 });
          const valueAxisDataList = [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }];
          const seriesRange = yAxis.createAxisRange(seriesRangeDataItem);

          /* 23.03.29 수정: 오벨리스크 가로 라인 제거 요청으로 인한 주석 */
          // seriesRange.get('grid')?.setAll({
          //   strokeOpacity: 1,
          //   visible: true,
          //   stroke: am5.color(0x000000),
          //   strokeDasharray: [2, 2],
          //   dx: -12,
          // });
          seriesRange.get('label')?.setAll({
            fill: am5.color(0x404040),
            visible: true,
            text: '100.00',
            textAlign: 'center',
          });

          valueAxisDataList.forEach((el) => {
            const seriesAxisDataItem = yAxis.makeDataItem(el);
            const seriesRange = yAxis.createAxisRange(seriesAxisDataItem);
            if (seriesRange) {
              seriesRange.get('label')?.setAll({
                fill: am5.color(0x8c8c8c),
                visible: true,
                text: el.value.toFixed(2).toString(),
                textAlign: 'center',
              });
            }
          });
        }
      };

      /* 23.02.28 수정: 그래프 컬러 변경 */
      createSeries('LineChart', 'value', am5.color(daoColorSet1(activeDao.value)));

      chart.appear(1000);
    });

    return () => {
      root.dispose();
    };
  }, [chartPeriod]);
  return (
    <>
      <div className={cn('chart-wrap')}>
        <div id={Id} className={cn('filled-chart-wrap')} />
      </div>
    </>
  );
};

export default FilledLineChart;
