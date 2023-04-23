import { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import cn from 'classnames';
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { useTranslation } from 'next-i18next';
import { uuid } from 'uuidv4';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { checkAllValueZero, setChartBoundary, setChartDateFormats, setXBaseInterval, setXGridIntervals } from '@/utils/chartUtils';
import { ChartPeriodType } from '@/types/common.types';
import { toFixed } from '@utils/web3Utils';
import { PriceChartItemType } from '@/types/chart.types';

am5.addLicense('AM5C358434391');

interface Props {
  chartPeriod: ChartPeriodType;
  chartData: PriceChartItemType[];
  initItem?: PriceChartItemType;
  token?: any;
  isMobile?: boolean;
  setChartPeriod: (e: ChartPeriodType) => void;
}

const NegativeLineChart = ({ chartPeriod, setChartPeriod, chartData, initItem, token, isMobile = false }: Props) => {
  const { t } = useTranslation('common');

  const [selectedItem, setSelectedItem] = useState<PriceChartItemType | undefined>(initItem);
  const timeParse = (time: number) => moment(time).format('YYYY-MM-DD HH:MM');

  const isAllZero = checkAllValueZero(chartData);
  const { isSmallDiff, max, min } = setChartBoundary(chartData);

  const initValue = chartData.find((e: any) => e.value)?.value || 0;

  const chartRef: any = useRef(null);
  const Id = uuid();

  const calcPercentage = (v1: number, v2: number): number => {
    let denominator = v1;
    if (v1 === 0) {
      denominator = 1;
    }
    const percent = new BigNumber(v2).minus(v1).multipliedBy(100).dividedBy(denominator).toNumber();

    return percent;
  };

  useEffect(() => {
    if (initItem) {
      setSelectedItem(initItem);
    }
  }, [initItem]);

  useEffect(() => {
    const root = am5.Root.new(`${Id}`);
    root.setThemes([am5themes_Animated.new(root)]);
    root.numberFormatter.setAll({
      numberFormat: '#a',

      // Group only into M (millions), and B (billions)
      bigNumberPrefixes: [
        { number: 1e3, suffix: 'K' },
        { number: 1e6, suffix: 'M' },
        { number: 1e9, suffix: 'B' },
      ],

      // Do not use small number prefixes at all
      smallNumberPrefixes: [],
    });

    setTimeout(() => {
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          // paddingLeft: 0,
          paddingRight: 0,
          focusable: false,
          pinchZoomX: false,
          // cursor: am5xy.XYCursor.new(root, {}),
        })
      );
      chart.zoomOutButton.set('forceHidden', true);

      chartRef.current = chart;

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          ...(isAllZero ? { min: 0, max: 100 } : isSmallDiff ? { min, max } : {}),
          numberFormat: '#,###.00a',
          renderer: am5xy.AxisRendererY.new(root, {
            opposite: true,
          }),
        })
      );
      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          tooltipLocation: 0.5,
          baseInterval: setXBaseInterval(chartPeriod, !isMobile),
          gridIntervals: setXGridIntervals(chartPeriod, !isMobile),
          dateFormats: setChartDateFormats(chartPeriod, !isMobile),
          markUnitChange: false,
          renderer: am5xy.AxisRendererX.new(root, {
            // minGridDistance: 30,
          }),
          tooltip: am5.Tooltip.new(root, {
            forceHidden: true,
          }),
        })
      );
      xAxis.data.setAll(chartData);

      // 축 스타일
      const xRenderer = xAxis.get('renderer');
      xRenderer.grid.template.setAll({
        forceHidden: true,
      }); // x축 배경선
      xRenderer.labels.template.setAll({
        oversizedBehavior: 'none',
        maxWidth: 50,
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        paddingTop: 8,
        fontSize: 12,
      }); // x축 라벨
      const yRenderer = yAxis.get('renderer');
      yRenderer.grid.template.setAll({
        strokeOpacity: 0,
        stroke: am5.color(0xf2f2f2),
      }); // y축 배경선
      yRenderer.labels.template.setAll({
        oversizedBehavior: 'none',
        maxWidth: 50,
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        fontSize: 12,
      }); // y축 라벨

      const createSeries = (
        name: string,
        field: string | undefined,
        lowColor: am5.Color | undefined,
        upColor: am5.Color | undefined,
        endValue: number
      ): void => {
        const series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: field,
            valueXField: 'date',
            locationX: 0,
            stroke: upColor,
            tooltip: am5.Tooltip.new(root, {
              forceHidden: true,
            }),
          })
        );
        series.strokes.template.setAll({
          strokeWidth: 2,
        });
        series.data.setAll(chartData);
        series.bullets.push(() => {
          // create the circle first
          const circle = am5.Circle.new(root, {
            radius: 4,
            interactive: true,
            fill: am5.color(0xffffff),
            stroke: am5.color(0x1a1a1a),
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
            locationX: 0,
            sprite: circle,
          });
        });

        const rangeDataItem = yAxis.makeDataItem({
          value: -1000,
          endValue: endValue,
        });
        const range: any = series.createAxisRange(rangeDataItem);
        range.strokes.template.setAll({
          stroke: lowColor,
          strokeWidth: 2,
        });

        const cursor = chart.set(
          'cursor',
          am5xy.XYCursor.new(root, {
            // xAxis: xAxis,
            snapToSeries: [series],
            snapToSeriesBy: 'x',
          })
        );
        cursor.lineX.setAll({
          stroke: am5.color(0x373b4e),
          strokeWidth: 1,
          strokeDasharray: [3],
        });
        cursor.lineY.set('visible', false);

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
        cursor.events.on('cursorhidden', () => {
          previousBulletSprites.forEach((element: any) => {
            element.unhover();
            // setDate(null);
            // setPer(priceChange);
            // setNumUnit(numUnit_count(currentValue, 2, false, chartKey));
          });
        });

        series.appear(1000);
      };

      createSeries('value', 'value', am5.color(0xff3333), am5.color(0x00bf20), initValue);

      function createRange(value: number, color: am5.Color | undefined): void {
        const rangeDataItem = yAxis.makeDataItem({
          value: value,
        });

        const range: any = yAxis.createAxisRange(rangeDataItem);

        range.get('label').setAll({
          fill: am5.color(0xffffff),
          text: `${toFixed(value, 2, false)}`,
          background: am5.Rectangle.new(root, {
            fill: color,
          }),
        });

        range.get('grid').setAll({
          stroke: color,
          strokeDasharray: [3],
          strokeOpacity: 1,
          location: 1,
        });
      }

      createRange(initValue, am5.color(0x595959));

      chartRef.current = chart;
      root.resize();
    }, 300);

    return () => {
      root.dispose();
    };
  }, [chartData, chartPeriod]);

  return (
    <>
      <div className={cn('chart-overview')}>
        {selectedItem && (
          <div className={cn('total-status')}>
            <span className={cn('figure-wrap')}>
              <span className={cn('figure')}>${new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(selectedItem.value)}</span>
              {selectedItem && <TagFluctuationRate figure={selectedItem.changeRate!!} />}
            </span>
            <div className={cn('today')}>
              {timeParse(selectedItem.date)} {t('koDateStandard')}
            </div>
          </div>
        )}
        <ChartPeriodTab setFilter={setChartPeriod} />
      </div>
      <div className={cn('chart-wrap')}>
        <div id={Id} className={cn('negative-chart-wrap')} />
      </div>
    </>
  );
};

export default NegativeLineChart;
