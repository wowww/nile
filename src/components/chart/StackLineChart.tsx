/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { basicChartDataType } from '@/components/chart/chartDummyData';
import { uuid } from 'uuidv4';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

interface LineChartPropsType {
  data: basicChartDataType[];
}

const StackLineChart: React.FC<LineChartPropsType> = ({ data }) => {
  const Id = uuid();

  useEffect(() => {
    const root = am5.Root.new(Id);
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
      })
    );
    /* 22.10.27 수정: 차트 zoomButton 제거 코드 추가 */
    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: "#.#'B'",
        renderer: am5xy.AxisRendererY.new(root, {
          // opposite: true,
          visible: false,
        }),
      })
    );
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'date',
        renderer: am5xy.AxisRendererX.new(root, {
          visible: false,
        }),
        paddingLeft: 15,
      })
    );
    xAxis.data.setAll(data);

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
          categoryXField: 'date',
          stroke,
          // minDistance: 0,
          minBulletDistance: 10,
          // maskBullets: false,
          fill: am5.color(0x9860ff),
          stacked: true,
        })
      );
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.6,
      });
      series.strokes.template.setAll({
        strokeWidth: 1,
        stroke,
      });

      const tooltip = series.set(
        'tooltip',
        am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          getFillFromSprite: false,
          getLabelFillFromSprite: false,
          paddingRight: 8,
          paddingLeft: 8,
          paddingTop: 6,
          paddingBottom: 6,
          width: 95,
        })
      );

      tooltip.get('background')!.setAll({
        // interactive: true,
        opacity: 1,
        fill: am5.color(0x404040),
        stroke: am5.color(0x404040),
        fillOpacity: 1,
        // width: 95,
      });

      tooltip.label.adapters.add('html', () => {
        return `<div class="stack-tooltip">
          <span class="name">
            TIPO
          </span>
          <span class="figure">
            {valueY}B
          </span>
        </div>`;
      });

      const cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
          // behavior: 'none',
          xAxis,
        })
      );
      cursor.lineX.setAll({
        stroke: am5.color(0x404040),
        strokeDasharray: [0, 0],
      });
      cursor.lineY.set('visible', false);
      series.data.setAll(data);
      series.appear(1000);
    };

    createSeries('LineChart', 'value', am5.color(0x9860ff));
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);
  return (
    <div className={cn('chart-wrap')}>
      <div id={Id} className={cn('stack-chart-wrap')} />
    </div>
  );
};

export default StackLineChart;
