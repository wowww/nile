/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { basicChartDataType } from '@/components/chart/chartDummyData';

am5.addLicense('AM5C358434391');

interface LineChartBasicPropsType {
  id: string;
  data: basicChartDataType[];
}

const LineChartBasic: React.FC<LineChartBasicPropsType> = ({ id, data }) => {
  useEffect(() => {
    if (!id) {
      return;
    }
    const root = am5.Root.new(`${id}`);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
      }),
    );
    // chartRef.current = chart;
    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        // numberFormat: "#.00'M'",
        renderer: am5xy.AxisRendererY.new(root, {
          // opposite: true,
          visible: false,
        }),
      }),
    );
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        // baseInterval: { timeUnit: 'day', count: 1 },
        // dateFormats: {
        //   day: 'dd',
        //   week: 'dd',
        //   month: 'mm',
        //   year: 'yyyy',
        // },
        categoryField: 'date',
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: false,
          // minGridDistance: 30,
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
      maxWidth: 80,
      textAlign: 'center',
      fill: am5.color(0x737373),
      paddingTop: 8,
      fontSize: 12,
    }); // x축 라벨
    const yRenderer = yAxis.get('renderer');
    yRenderer.grid.template.setAll({
      visible: false,
    }); // y축 배경선
    yRenderer.labels.template.setAll({
      visible: false,
      // oversizedBehavior: "fit",
      // textAlign: "center",
      // fill: am5.color(0x8c8c8c),
      // fontSize: 12,
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
        }),
      );
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 1,
        fillGradient: am5.LinearGradient.new(root, {
          stops: [
            {
              color: am5.color(0x00bf20),
              opacity: 0.3,
            },
            {
              color: am5.color(0x00bf20),
              opacity: 0,
            },
          ],
        }),
      });
      series.strokes.template.setAll({
        strokeWidth: 2,
        stroke,
      });

      series.data.setAll(data);
      series.appear(1000);
    };

    createSeries('LineChart', 'value', am5.color(0x00bf20));
  }, [id, data]);
  return <div id={id} style={{ width: '100%', height: '100%' }} />;
};
export default LineChartBasic;
