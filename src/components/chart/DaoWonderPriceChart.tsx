/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { DaoWonderPriceChartDataType } from '@/components/chart/chartDummyData';

am5.addLicense('AM5C358434391');
interface LineChartBasicPropsType {
  id: string;
  data: DaoWonderPriceChartDataType[];
}

const DaoWonderPriceChart: React.FC<LineChartBasicPropsType> = ({ id, data }) => {
  useEffect(() => {
    const root = am5.Root.new(id);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
      })
    );

    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          visible: false,
        }),
      })
    );
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        visible: false,
        // markUnitChange: false,
        // dateFormats: {
        //   day: 'YY.MM.dd',
        // },
        gridIntervals: [{ timeUnit: 'day', count: 30 }],
        renderer: am5xy.AxisRendererX.new(root, {}),
        // // paddingLeft: 30,
        // // paddingRight: 200,
        // width: 100,
        // dx: 50,
      })
    );
    xAxis.data.setAll(data);

    // 축 스타일
    const xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      visible: false,
    }); // x축 배경선
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
          valueXField: 'date',
          stroke,
        })
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
    return () => {
      root.dispose();
    };
  }, [id, data]);

  const parseDate = (milliSec: number) => {
    const date = new Date(milliSec);
    const year = date.getFullYear() - 2000;
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={cn('chart-wrap')} style={{ width: '100%', height: '100%' }}>
      <div id={id} style={{ width: '100%', height: '100%' }} />
      <div className={cn('date-axis')}>
        <span>{parseDate(data[0].date)}</span>
        <span>{parseDate(data[data.length - 1].date)}</span>
      </div>
    </div>
  );
};
export default DaoWonderPriceChart;
