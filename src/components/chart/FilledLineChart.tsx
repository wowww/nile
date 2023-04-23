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
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { setChartDateFormats, setXBaseInterval, setXGridIntervals } from '@utils/chartUtils';
import { ChartPeriodType } from '@/types/common.types';
import { useTranslation } from 'next-i18next';
import { PriceChartItemType } from '@/types/chart.types';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

interface LineChartPropsType {
  chartPeriod: ChartPeriodType;
  setChartPeriod: (e: ChartPeriodType) => void,
  chartData: PriceChartItemType[],
  initItem?: PriceChartItemType,
  token?: any;
  isMobile?: boolean,
}

const FilledLineChart: React.FC<LineChartPropsType> = ({
                                                         chartPeriod,
                                                         setChartPeriod,
                                                         chartData,
                                                         initItem,
                                                         token,
                                                         isMobile = false,
                                                       }) => {
  const { t } = useTranslation('common');

  const [selectedItem, setSelectedItem] = useState<PriceChartItemType | undefined>(initItem);
  const timeParse = (time: number) => moment(time).format('YYYY-MM-DD HH:MM');

  const calcPercentage = (v1: number, v2: number): number => {
    console.log(v1, v2);
    let denominator = v1;
    if (v1 === 0) {
      denominator = 1;
    }
    const percent = new BigNumber(v2)
      .minus(v1)
      .multipliedBy(100)
      .dividedBy(denominator)
      .toNumber();

    return percent;
  };

  useEffect(() => {
    if(initItem) {
      setSelectedItem(initItem);
    }
  }, [initItem])

  const Id = uuid();
  useEffect(() => {
    const root = am5.Root.new(Id);
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
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        maxTooltipDistance: 0,
        cursor: am5xy.XYCursor.new(root, {}),
      }),
    );
    /* 22.10.27 수정: 차트 zoomButton 제거 코드 추가 */
    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: '#.#a',
        renderer: am5xy.AxisRendererY.new(root, {
          opposite: true,
          visible: false,
        }),
      }),
    );
    // const xAxis = chart.xAxes.push(
    //   am5xy.DateAxis.new(root, {
    //     baseInterval: { timeUnit: 'day', count: 1 },
    //     dateFormats: {
    //       day: 'MM-dd',
    //     },
    //     gridIntervals: [{ timeUnit: 'day', count: 3 }],
    //     renderer: am5xy.AxisRendererX.new(root, {
    //       visible: false,
    //     }),
    //   })
    // );
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: setXBaseInterval(chartPeriod, !isMobile),
        gridIntervals: setXGridIntervals(chartPeriod, !isMobile),
        dateFormats: setChartDateFormats(chartPeriod, !isMobile),
        markUnitChange: false,
        endLocation: 1,
        startLocation: 0.5,
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
    }); // x축 라벨
    const yRenderer = yAxis.get('renderer');
    yRenderer.grid.template.setAll({
      visible: false,
    }); // y축 배경선
    yRenderer.labels.template.setAll({
      // visible: false,
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
          // maskBullets: false,
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
          stops: [
            {
              color: am5.color(0x27c683),
              opacity: 0.6,
            },
            {
              color: am5.color(0x27c683),
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
        const circle = am5.Circle.new(root, {
          radius: 4.5,
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
    };

    createSeries('LineChart', 'value', am5.color(0x27c683));
    chart.appear(1000);

    return () => {
      root.dispose();
    };
  }, [chartData, chartPeriod]);
  return (
    <>
      <div className={cn('chart-overview')}>
        {selectedItem && (<div className={cn('total-status')}>
          <span className={cn('figure-wrap')}>
            <span
              className={cn('figure')}>${new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(selectedItem.value)}</span>
            {selectedItem && <TagFluctuationRate figure={selectedItem.changeRate!!} />}
          </span>
          <div className={cn('today')}>
            {timeParse(selectedItem.date)} {t('koDateStandard')}
          </div>
        </div>)}
        <ChartPeriodTab setFilter={setChartPeriod} />
      </div>
      <div className={cn('chart-wrap')}>
        <div id={Id} className={cn('filled-chart-wrap')} />
      </div>
    </>
  );
};

export default FilledLineChart;
