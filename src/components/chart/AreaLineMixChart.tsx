/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import { Percent } from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { daoColorSet1, daoColorSet2 } from '@/components/dao/ui/daoColorSet';
import { DaoIncineratorChartDataType } from '@/components/chart/chartDummyData';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtom } from 'jotai';

am5.addLicense('AM5C358434391');
interface AreaLineMixChartPropsType {
  id: string;
  data: DaoIncineratorChartDataType[];
  setSelectedItem: (selectedItem: any) => void;
}
const AreaLineMixChart: React.FC<AreaLineMixChartPropsType> = ({ id, data, setSelectedItem }) => {
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);

  // 임시 데이터 파싱 (모바일)
  const [chartData, setChartData] = useState<DaoIncineratorChartDataType[]>(data);

  useEffect(() => {
    const root = am5.Root.new(id);
    root.setThemes([am5themes_Animated.new(root)]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        showTooltipOn: 'always',
      }),
    );
    chart.zoomOutButton.set('forceHidden', true);
    chart.getNumberFormatter().set('numberFormat', '#a');
    const yAxisLeft = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 50,
        }),
        min: 0,
        max: 3000000,
        strictMinMax: true,
        // paddingRight: 32,
        showTooltipOn: 'always',
      }),
    );
    const yAxisRight = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 50,
          opposite: true,
        }),
        min: 0,
        max: 300000,
        strictMinMax: true,
        paddingLeft: 0,
        showTooltipOn: 'always',
      }),
    );
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        gridIntervals: [
          {
            timeUnit: 'day',
            count: 5, // 임의값
          },
        ],
        dateFormats: {
          day: 'MM-dd',
        },
        renderer: am5xy.AxisRendererX.new(root, {
          // visible: true,
        }),
        showTooltipOn: 'always',
      }),
    );
    // xAxis.data.setAll(data);
    xAxis.data.setAll(chartData);

    const yRendererLeft = yAxisLeft.get('renderer');
    const yRendererRight = yAxisRight.get('renderer');
    const xRenderer = xAxis.get('renderer');

    xRenderer.grid.template.setAll({
      visible: false,
    }); // x축 배경선
    xRenderer.labels.template.setAll({
      oversizedBehavior: 'none',
      // textAlign: 'left',
      fill: am5.color(0xa6a6a6),
      paddingTop: 8,
      fontSize: 12,
      showTooltipOn: 'always',
    }); // x축 라벨
    yRendererLeft.grid.template.setAll({
      visible: false,
    }); // y축 배경선
    yRendererRight.grid.template.setAll({
      visible: false,
    }); // y축 배경선
    yRendererLeft.labels.template.setAll({
      // visible: false,
      oversizedBehavior: 'none',
      textAlign: 'center',
      fill: am5.color(0xa6a6a6),
      fontSize: 12,
      showTooltipOn: 'always',
    }); // y축 라벨
    yRendererRight.labels.template.setAll({
      oversizedBehavior: 'none',
      textAlign: 'center',
      fill: am5.color(daoColorSet1(activeDao.value)),
      fontSize: 12,
      showTooltipOn: 'always',
    }); // y축 라벨
    // 시리즈 생성

    const createSeriesLine = (name: string, field: string, stroke: am5.Color) => {
      const seriesLine = chart.series.push(
        am5xy.LineSeries.new(root, {
          name,
          xAxis,
          yAxis: yAxisLeft,
          valueYField: field,
          valueXField: 'date',
          stroke,
          showTooltipOn: 'always',
          tooltip: am5.Tooltip.new(root, {
            forceHidden: true,
          }),
        }),
      );
      seriesLine.strokes.template.setAll({
        strokeWidth: 2,
        stroke,
        showTooltipOn: 'always',
      });
      seriesLine.bullets.push(() => {
        // create the circle first
        /* 23.03.29 수정: 불릿 테두리 색상 변경 */
        const circle = am5.Circle.new(root, {
          radius: 6,
          interactive: true,
          fill: am5.color(0xffffff),
          strokeWidth: 2,
          stroke: am5.color(daoColorSet1(activeDao.value)),
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

      // seriesLine.data.setAll(data);
      seriesLine.data.setAll(chartData);
    };

    const createStepSeries = (name: string, field: string, stroke: am5.Color, fill: am5.Color) => {
      const seriesStep = chart.series.push(
        am5xy.StepLineSeries.new(root, {
          name,
          xAxis,
          yAxis: yAxisRight,
          valueYField: field,
          valueXField: 'date',
          stroke,
          fill,
          showTooltipOn: 'always',
          tooltip: am5.Tooltip.new(root, {
            forceHidden: true,
          }),
        }),
      );
      seriesStep.strokes.template.setAll({
        strokeWidth: 2,
      });
      seriesStep.fills.template.setAll({
        visible: true,
        fillOpacity: 1,
        fill,
      });
      seriesStep.bullets.push(() => {
        // create the circle first
        const circle = am5.Circle.new(root, {
          radius: 6,
          interactive: true,
          fill: am5.color(0xffffff),
          strokeWidth: 2,
          stroke,
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

      seriesStep.data.setAll(chartData);
    };
    createSeriesLine('supplyChart', 'supply', am5.color(0x595959));
    createStepSeries('burnChart', 'burn', am5.color(daoColorSet1(activeDao.value)), am5.color(daoColorSet2(activeDao.value)));

    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    // cursor.lineX.set('visible', false);
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
      chart.series.each(function (series) {
        const dataItem = series?.get('tooltip')?.dataItem;
        if (dataItem?.bullets) {
          const bulletSprite = dataItem.bullets[0].get('sprite');
          bulletSprite.hover();
          previousBulletSprites.push(bulletSprite);

          const chartItem = dataItem.dataContext as DaoIncineratorChartDataType;

          setSelectedItem(() => ({
            supply: chartItem.supply,
            burn: chartItem.burn,
            date: chartItem.date,
          }));
        }
      });
    };

    cursor.events.on('cursormoved', cursorMoved);
    cursor.events.on('cursorhidden', () => {
      previousBulletSprites.forEach((element: any) => {
        element.unhover();
      });
    });

    return () => {
      root.dispose();
    };
  }, [id, chartData]);
  return <div id={id} className={cn('line-mix-chart-wrap')} />;
};
export default AreaLineMixChart;
