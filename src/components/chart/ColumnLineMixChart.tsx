/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import { Percent } from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { daoColorSet1, daoColorSet2 } from '@/components/dao/daoColorSet';
import { multiChartDataType } from '@/components/chart/chartDummyData';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtom } from 'jotai';

// 모바일 데이터용 임시
import useMediaQuery from '@/hook/useMediaQuery';

am5.addLicense('AM5C358434391');
interface ColumnLineMixChartPropsType {
  id: string;
  data: multiChartDataType[];
  setSelectedItem: (selectedItem: any) => void;
}
const ColumnLineMixChart: React.FC<ColumnLineMixChartPropsType> = ({ id, data, setSelectedItem }) => {
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);

  // 임시 데이터 파싱 (모바일)
  const [chartData, setChartData] = useState<multiChartDataType[]>(data);
  const isMobile = useMediaQuery('(max-width: 767px)');
  useEffect(() => {
    if (isMobile && chartData.length > 4) {
      setChartData([...data.slice(0, 4)]);
    } else if (!isMobile && chartData.length < 5) {
      setChartData([...data]);
    }
  }, [isMobile]);

  useEffect(() => {
    const root = am5.Root.new(id);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 32,
        /* 23.03.03 수정: 차트 간격 수정 */
        paddingRight: 0,
        paddingBottom: 0,
        showTooltipOn: 'always',
      }),
    );
    chart.zoomOutButton.set('forceHidden', true);
    /* 23.03.31 수정: 숫자 표기법 변경 */
    chart.getNumberFormatter().set('numberFormat', '#.#sK|#.#sK|0');
    /* 23.03.29 수정: y축 간격 조절 */
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          cellStartLocation: 0,
          cellEndLocation: 0.9,
          minGridDistance: 25,
          opposite: true,
        }),
        min: -200,
        max: 200,
        strictMinMax: true,
        paddingLeft: 32,
        showTooltipOn: 'always',
      }),
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        gridIntervals: [
          {
            timeUnit: 'day',
            count: 1,
          },
        ],
        dateFormats: {
          day: 'MM-dd',
        },
        renderer: am5xy.AxisRendererX.new(root, {
          // visible: true,
        }),
        showTooltipOn: 'always',
        tooltip: am5.Tooltip.new(root, {
          forceHidden: true,
        }),
      }),
    );
    // xAxis.data.setAll(data);
    xAxis.data.setAll(chartData);

    const yRenderer = yAxis.get('renderer');
    // 축 스타일
    const xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      visible: false,
    }); // x축 배경선
    xRenderer.labels.template.setAll({
      oversizedBehavior: 'none',
      // textAlign: 'left',
      fill: am5.color(0xa6a6a6),
      paddingTop: 8,
      // paddingLeft: 25,
      fontSize: 12,
      showTooltipOn: 'always',
    }); // x축 라벨
    yRenderer.grid.template.setAll({
      visible: false,
      fill: am5.color(0xd9d9d9),
      strokeDasharray: [4, 4],
      showTooltipOn: 'always',
    }); // y축 배경선
    /* 23.03.29 수정: y축 label 우측 정렬 */
    yRenderer.labels.template.setAll({
      // visible: false,
      oversizedBehavior: 'none',
      textAlign: 'right',
      fill: am5.color(0xa6a6a6),
      fontSize: 12,
      showTooltipOn: 'always',
      width: am5.p100,
      /* 23.03.31 수정: 여백 추가 */
      paddingLeft: 32,
    }); // y축 라벨
    // 시리즈 생성

    const createSeriesLine = (name: string, field: string, stroke: any) => {
      const seriesLine = chart.series.push(
        am5xy.LineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueYField: field,
          valueXField: 'date',
          stroke,
          showTooltipOn: 'always',
          tooltip: am5.Tooltip.new(root, {
            forceHidden: true,
            // visible: false,
          }),
        }),
      );
      seriesLine.strokes.template.setAll({
        strokeWidth: 2,
        stroke,
        strokeDasharray: [2, 2],
        showTooltipOn: 'always',
      });
      seriesLine.bullets.push(() => {
        // create the circle first
        const circle = am5.Circle.new(root, {
          radius: 5,
          interactive: true,
          fill: am5.color(0xffffff),
          strokeWidth: 1,
          stroke,
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
          snapToSeries: [seriesLine],
          snapToSeriesBy: 'x',
        }),
      );
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
        const dataItem = seriesLine?.get('tooltip')?.dataItem;
        if (dataItem?.bullets) {
          const bulletSprite = dataItem.bullets[0].get('sprite');
          bulletSprite.hover();
          previousBulletSprites.push(bulletSprite);

          const chartItem = dataItem.dataContext as multiChartDataType;

          let index = data.indexOf(chartItem);
          const isLastData = index === data.length - 1;
          if (index > 0) {
            index--;
          } else {
            index = 0;
          }

          setSelectedItem(() => ({
            inflow: chartItem.inflow,
            outflow: Math.abs(chartItem.outflow),
            total: chartItem.total,
            date: chartItem.date,
          }));
        }
      };

      cursor.events.on('cursormoved', cursorMoved);
      cursor.events.on('cursorhidden', () => {
        previousBulletSprites.forEach((element: any) => {
          element.unhover();
        });
      });

      // seriesLine.data.setAll(data);
      seriesLine.data.setAll(chartData);
    };

    const createSeries = (name: string, labelCenterX: Percent, field: string, stroke: any) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueYField: field,
          valueXField: 'date',
          clustered: false,
          fill: stroke,
          showTooltipOn: 'always',
        }),
      );
      series.columns.template.setAll({
        width: 4,
        height: am5.p100,
        templateField: 'columnSettings',
        cornerRadiusTL: 2,
        cornerRadiusTR: 2,
        showTooltipOn: 'always',
      });
      const seriesRangeDataItem = yAxis.makeDataItem({ value: 0, endValue: 0 });
      const seriesRange = series.createAxisRange(seriesRangeDataItem);

      if (seriesRangeDataItem !== undefined) {
        seriesRangeDataItem.get('grid')?.setAll({
          strokeOpacity: 1,
          visible: true,
          stroke: am5.color(0x8c8c8c),
          strokeDasharray: [0, 0],
          dx: -12,
        });
      }
      let i = 0;
      series.bullets.push((root, dataItem: any) => {
        if (Math.abs(dataItem.dataItems[i].dataContext[field] as number) > 100) {
          i++;
          return am5.Bullet.new(root, {
            locationY: 1,
            sprite: am5.Circle.new(root, {
              tooltipText: '{valueY}',
              showTooltipOn: 'always',
              tooltip: am5.Tooltip.new(root, {
                pointerOrientation: 'left',
                getFillFromSprite: false,
                labelText: '{valueY}',
                labelHTML: `<div class="total-tooltip"><span>1.5M</span></div>`,
              }),
            }),
          });
        }
        i++;
      });

      // series.data.setAll(data);
      series.data.setAll(chartData);
    };
    createSeriesLine('totalChart', 'total', am5.color(daoColorSet1(activeDao.value)));
    createSeries('inflowChart', am5.p0, 'inflow', am5.color(daoColorSet1(activeDao.value)));
    createSeries('outflowChart', am5.p100, 'outflow', am5.color(daoColorSet2(activeDao.value)));

    return () => {
      root.dispose();
    };
  }, [id, chartData]);
  return <div id={id} className={cn('line-chart-wrap')} />;
};
export default ColumnLineMixChart;
