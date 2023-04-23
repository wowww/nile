/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { daoColorSet1 } from '@/components/dao/daoColorSet';
import { basicChartDataType, LinChartFilterState } from '@/components/chart/chartDummyData';
import { useAtom, useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import useMediaQuery from '@/hook/useMediaQuery';

am5.addLicense('AM5C358434391');

interface LineChartPropsType {
  id: string;
  data: basicChartDataType[];
}

const DaoLineChart: React.FC<LineChartPropsType> = ({ id, data }) => {
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);
  const [filter, setFilter] = useAtom(LinChartFilterState);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    setFilter('week');
  }, []);

  useEffect(() => {
    const root = am5.Root.new(id);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        maxTooltipDistance: 0,
      }),
    );
    chart.zoomOutButton.set('forceHidden', true);

    chart.children.unshift(
      am5.Label.new(root, {
        html: "<div style='width: 100%; height: 1px; border-bottom: 1px solid #8c8c8c;'></div>",
        x: am5.percent(0),
        y: am5.percent(100),
        dy: -25,
        paddingTop: 0,
        paddingBottom: 0,
      }),
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: "#.00'%'",
        renderer: am5xy.AxisRendererY.new(root, {
          visible: false,
        }),
        width: 50,
      }),
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'week', count: 1 },
        dateFormats: {
          week: 'YYYY-MM-dd',
          month: 'YYYY-MM-dd',
          year: 'YYYY-MM-dd',
        },
        gridIntervals: [{ timeUnit: 'week', count: 1 }],
        periodChangeDateFormats: { week: 'YYYY-MM-dd', month: 'YYYY-MM-dd', year: 'YYYY-MM-dd' },
        renderer: am5xy.AxisRendererX.new(root, {
          visible: false,
        }),
      }),
    );
    xAxis.data.setAll(data);

    // 축 스타일
    const xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      visible: false,
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
      // visible: false,
      fill: am5.color(0x8c8c8c),
      strokeDasharray: [4, 4],
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
          minDistance: 0,
          maskBullets: false,
        }),
      );
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 1,
        fillGradient: am5.LinearGradient.new(root, {
          stops: [
            {
              color: am5.color(daoColorSet1(activeDao.value)),
              opacity: 0.3,
            },
            {
              color: am5.color(daoColorSet1(activeDao.value)),
              opacity: 0,
            },
          ],
        }),
      });
      series.strokes.template.setAll({
        strokeWidth: 2,
        stroke,
      });

      series.bullets.push((root, _series, dataItem: any) => {
        const container: am5.Container = am5.Container.new(root, {});
        if (dataItem.dataContext.bullet) {
          const circle = container.children.push(
            am5.Circle.new(root, {
              radius: 5,
              interactive: true,
              fill: am5.color(0xffffff),
              strokeWidth: 2,
              stroke,
            }),
          );
          circle.states.create('default', {});
          return am5.Bullet.new(root, {
            sprite: container,
          });
        }
        // }
      });

      const tooltip = series.set(
        'tooltip',
        am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          // animationDuration: 150
        }),
      );

      tooltip.get('background')!.setAll({
        interactive: true,
        opacity: 0,
      });

      tooltip.label.adapters.add('html', () => {
        const text = '<div style="display: block; width: 0; height: 0;"></div>';
        return text;
      });

      series.data.setAll(data);
      series.appear(1000);
    };

    createSeries('LineChart', 'value', am5.color(daoColorSet1(activeDao.value)));
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [id, data, isMobile]);

  return (
    <div className={cn('mypage-chart-area')}>
      <div className={cn('line-chart-wrap')}>
        <div id={id} className={cn('line-chart-wrap')} />
      </div>
    </div>
  );
};
export default DaoLineChart;
