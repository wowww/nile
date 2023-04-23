/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { basicChartDataType } from '@/components/chart/chartDummyData';
import { uuid } from 'uuidv4';
import { StackChartFilterState } from '@/components/chart/tokensChartDummyData';
import moment from 'moment';
import { useAtom } from 'jotai';

am5.addLicense('AM5C358434391');

interface LineChartPropsType {
  data: basicChartDataType[];
}

const DaoIncineratorChart: React.FC<LineChartPropsType> = ({ data }) => {
  const [filter, setFilter] = useAtom(StackChartFilterState);
  const [figure, setFigure] = useState(258.09);
  const initTime: number = Number(data[data.length - 1].date);
  const timeParse = (time: number) => moment(time).format('YYYY-MM-DD HH:MM');
  const [date, setDate] = useState(timeParse(initTime));

  const Id = uuid();
  useEffect(() => {
    const root = am5.Root.new(Id);
    root.setThemes([am5themes_Animated.new(root)]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        maxTooltipDistance: 0,
        // cursor: am5xy.XYCursor.new(root, {}),
      })
    );
    /* 22.10.27 수정: 차트 zoomButton 제거 코드 추가 */
    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: "#.000'",
        marginRight: 16,
        renderer: am5xy.AxisRendererY.new(root, {
          opposite: false,
          visible: false,
        }),
      })
    );
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        dateFormats: {
          day: 'MM-dd',
        },
        gridIntervals: [{ timeUnit: 'day', count: 3 }],
        markUnitChange: false,
        // endLocation: 1,
        // startLocation: 1,
        paddingLeft: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: false,
        }),
        tooltip: am5.Tooltip.new(root, {
          forceHidden: true,
        }),
      })
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
      visible: true,
      strokeDasharray: [3],
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
        })
      );

      // chart color
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 1,
        fillGradient: am5.LinearGradient.new(root, {
          stops: [
            {
              color: am5.color(0x5e5ff5),
              opacity: 0.3,
            },
            {
              color: am5.color(0x5e5ff5),
              opacity: 0,
            },
          ],
        }),
      });
      series.strokes.template.setAll({
        strokeWidth: 1.5,
        stroke,
      });

      // set data
      series.data.setAll(data);
      series.appear(1000);

      // bullet
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
        // circle.states.create('default', {
        //   opacity: 0,
        // });
        // circle.states.create('hover', {
        //   opacity: 1,
        // });
        return am5.Bullet.new(root, {
          sprite: circle,
        });
      });

      console.log(series.dataItems[series.dataItems.length - 1]);

      // 향후 cursor 필요 시 주석해제
      // const cursor = chart.set(
      //   'cursor',
      //   am5xy.XYCursor.new(root, {
      //     xAxis: xAxis,
      //   })
      // );

      // cursor.lineY.set('visible', false);

      // let previousBulletSprites: any = [];
      // const cursorMoved = () => {
      //   for (let i = 0; i < previousBulletSprites.length; i++) {
      //     previousBulletSprites[i].unhover();
      //   }
      //   previousBulletSprites = [];
      //   const dataItem = series?.get('tooltip')?.dataItem;
      //   if (dataItem?.bullets) {
      //     const bulletSprite = dataItem.bullets[0].get('sprite');
      //     bulletSprite.hover();
      //     previousBulletSprites.push(bulletSprite);
      //     setFigure(dataItem.dataContext.value);
      //     setDate(timeParse(dataItem?.dataContext?.date));
      //   }
      // };

      // cursor.events.on('cursormoved', cursorMoved);
    };

    createSeries('LineChart', 'value', am5.color(0x5e5ff5));
    chart.appear(1000);

    return () => {
      root.dispose();
    };
  }, [data]);
  return (
    <>
      <div className={cn('chart-wrap')}>
        <div id={Id} className={cn('incinerator-chart-wrap')} />
      </div>
    </>
  );
};

export default DaoIncineratorChart;
