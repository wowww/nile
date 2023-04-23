/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { PriceHistoryDataType, PriceHistoryFilterState } from '@/components/chart/chartDummyData';
import { uuid } from 'uuidv4';
import { useAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import useMediaQuery from '@/hook/useMediaQuery';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

export interface PriceHistoryChartPropsType {
  data: PriceHistoryDataType[];
}

interface actionPropsType {
  payload: statePropsType;
}

interface statePropsType {
  value: string;
}

const LineChart: React.FC<PriceHistoryChartPropsType> = ({ data }) => {
  console.log(data);
  const [filter, setFilter] = useAtom(PriceHistoryFilterState);
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);
  const Id = uuid();
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const root = am5.Root.new(`${Id}`);
    // root.setThemes([
    //   am5themes_Animated.new(root)
    // ]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        maxTooltipDistance: 0,
      }),
    );
    /* 22.10.27 수정: 차트 zoomButton 제거 코드 추가 */
    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: '#,###',
        renderer: am5xy.AxisRendererY.new(root, {
          // opposite: true,
          // visible: false,
          cellEndLocation: -1,
        }),
      }),
    );
    yAxis.children.unshift(
      am5.Label.new(root, {
        text: 'WEMIX$',
        fontSize: 12,
        position: 'absolute',
        fill: am5.color(0x737373),
        y: am5.percent(100),
        x: -10,
        dy: 5,
      }),
    );
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'minute', count: 60 },
        dateFormats: {
          // day: 'dd',
          // week: 'dd',
          // month: 'MMM',
          hour: 'YYYY-MM-dd HH:mm:ss',
        },

        // categoryField: 'time',
        // endLocation: 24,
        gridIntervals: [{ timeUnit: 'hour', count: isMobile ? 2 : 1 }],
        renderer: am5xy.AxisRendererX.new(root, {
          visible: false,
          // minGridDistance: 100,
        }),
        // paddingTop: 5,

        markUnitChange: !isMobile,
        x: isMobile ? 59 : 50,
        extraMax: -0.01,
        extraMin: isMobile ? 0 : 0.01,
      }),
    );
    xAxis.data.setAll(data);

    // 축 스타일
    const xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      fill: am5.color(0x737373),
      strokeDasharray: [4, 4],
    }); // x축 배경선
    xRenderer.labels.template.setAll({
      oversizedBehavior: 'none',
      // maxWidth: 40,
      textAlign: 'center',
      fill: am5.color(0x737373),
      paddingTop: 8,
      paddingLeft: 0,
      fontSize: 12,
      // maxWidth: 95,
    }); // x축 라벨

    const yRenderer = yAxis.get('renderer');
    yRenderer.grid.template.setAll({
      fill: am5.color(0x737373),
      strokeDasharray: [4, 4],
    }); // y축 배경선
    yRenderer.labels.template.setAll({
      oversizedBehavior: 'fit',
      textAlign: 'right',
      width: 66,
      fill: am5.color(0x737373),
      fontSize: 12,
      paddingRight: 25,
      // paddingRight: 8,
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
          minDistance: 0,
          // minBulletDistance: 10,
          maskBullets: false,
        }),
      );
      series.strokes.template.setAll({
        strokeWidth: 2,
        stroke,
      });
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
        }
      };

      cursor.events.on('cursormoved', cursorMoved);

      const tooltip = series.set(
        'tooltip',
        am5.Tooltip.new(root, {
          pointerOrientation: 'vertical',
          // animationDuration: 150
          getFillFromSprite: false,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          centerY: 25,
        }),
      );

      tooltip.get('background')!.setAll({
        fill: am5.color(0x1a1a1a),
        strokeOpacity: 0,
        fillOpacity: 1,
      });

      tooltip.label.adapters.add('html', () => {
        return `
          <div class="tooltip">
            <span style="color: #fff; line-height: 18px; font-size: 12px;">
              {valueY} WEMIX$
            </span>
          </div>
        `;
      });

      series.data.setAll(data);
      series.appear(1000);
    };

    createSeries('LineChart', 'value', am5.color(0x1a1a1a));
    chart.appear(1000, 100);
    return () => root.dispose();
  }, [data, isMobile]);
  return (
    <div className={cn('price-history-chart')}>
      <div className={cn('chart-header')}>
        <strong className={cn('chart-title')}>Price History</strong>
        {/* <ChartPeriodTab setFilter={setFilter} /> */}
      </div>
      <div id={Id} style={{ width: '100%' }} className={cn('price-history-chart-wrap')} />
    </div>
  );
};
export default LineChart;
