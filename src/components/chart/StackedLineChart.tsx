/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
/* 23.04.05 수정: frc 추가로 명칭 수정 */
import { stackedChartDefaultData, stackedChartTokenDataType } from '@/components/chart/tokensChartDummyData';
import { omit } from 'lodash';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { uuid } from 'uuidv4';
import millify from 'millify';
import useMediaQuery from '@/hook/useMediaQuery';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

/* 23.04.05 수정: frc 추가로 명칭 수정 */
interface LineChartPropsType {
  data: stackedChartTokenDataType[];
  category: string[]; // 더미 데이터 label 바꾸는 용도
  // setSelectedItem: (selectedItem: any) => void;
}

const StackLineChart: React.FC<LineChartPropsType> = ({ data, category }) => {
  const Id = uuid();
  const tooltipColorChip = [am5.color(0x9860ff), am5.color(0x36b8ff), am5.color(0x5e5ff5), am5.color(0xffd056)];
  const graphColorChip = [am5.color(0x9860ff), am5.color(0x1d94f5), am5.color(0x465cff), am5.color(0xeda20b)];
  const isPC = useMediaQuery('(min-width: 1440px)');
  useEffect(() => {
    const root = am5.Root.new(Id);
    root.setThemes([am5themes_Animated.new(root)]);
    root.numberFormatter.setAll({
      // numberFormat: '0.00',
      // numericFields: ["valueY"],
      // Group only into M (millions), and B (billions)
      bigNumberPrefixes: [
        // { number: 1e3, suffix: 'K' },
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
        maxTooltipDistance: -1,
      }),
    );
    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: '#,###.00a',
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
          opposite: true,
          strokeOpacity: 1,
          stroke: am5.color(0xd9d9d9),
          strokeWidth:2,
        }),
      }),
    );
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'hour', count: 1 },
        gridIntervals: [
          {
            timeUnit: 'day',
            count: isPC ? 1 : 2,
          },
        ],
        startLocation: isPC ? 0.5 : 0,
        endLocation: 0,
        paddingLeft: isPC ? -25 : 30,
        dateFormats: {
          // HOUR: 'HH:mm',
          day: 'MM-dd',
        },
        renderer: am5xy.AxisRendererX.new(root, {
          visible: false,
          minGridDistance: 31,
          strokeOpacity: 1,
          stroke: am5.color(0xd9d9d9),
          strokeWidth:2,
        }),
      }),
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
      paddingLeft: 25,
      paddingRight: 10,
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
      paddingRight: 0,
      fontSize: 12,
    }); // y축 라벨

    // 시리즈 생성
    const createSeries = (name: string, field: string, stroke: any, hasTooltip: boolean) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueYField: field,
          valueXField: 'date',
          stroke,
          fill: stroke,
          minBulletDistance: 10,
          minDistance: 10,
          stacked: true,
        }),
      );
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.7,
      });
      series.strokes.template.setAll({
        strokeWidth: 1,
        stroke,
      });

      if (hasTooltip) {
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
          }),
        );

        tooltip.get('background')!.setAll({
          // interactive: true,
          opacity: 1,
          fill: am5.color(0x404040),
          stroke: am5.color(0x404040),
          fillOpacity: 1,
          // width: 95,
        });

        //TODO 개발 진행중
        tooltip.label.adapters.add('html', (html, target) => {
          const categoryValueObj: any = target.dataItem?.dataContext;

          if (categoryValueObj) {
            console.log(categoryValueObj);
            const newCategoryValueObj = omit(categoryValueObj, ['date']); // date 뺀 값 가져오기
            const newObjArray = Object.entries(newCategoryValueObj).map(([key, value]) => ({ key, value }));
            const sortedArray = [...newObjArray].sort((obj1, obj2) => obj2.value - obj1.value);
            //descending order
            console.log(newObjArray);
            let text = '';
            text += `<div class="stack-tooltip">`;
            const totalValue = sortedArray.find((newObj) => newObj.key === 'TOTAL')?.value;
            sortedArray.forEach((newObj) => {
              if (newObj.key === 'TOTAL') {
                text += `<dl class="total">
                    <dt>Total</dt>
                    <dd>${millify(newObj.value, { precision: 2 })} <strong>100%</strong></dd>
                  </dl>`;
              } else {
                if (category.includes(newObj.key)) {
                  const index = category.findIndex((token) => token === newObj.key);
                  text += `<dl class="category">
                      <dt><span style="background-color: ${graphColorChip[index - 1]}"></span>${newObj.key}</dt>
                      <dd>${millify(newObj.value, { precision: 2 })} <strong>${((newObj.value / totalValue) * 100).toFixed(2)}%</strong></dd>
                    </dl>`;
                }
              }
            });
            // category.forEach((newCategoryValueObj, index) => {
            //   const totalValue = newObjArray[0].value;
            //   const categoryValue = newObjArray.find((item) => item.key === newCategoryValueObj);
            //   if (categoryValue !== undefined) {
            //     const currentValue = categoryValue.value;
            //     if (index === 0) {
            //       // total
            //       text += `<dl class="total">
            //         <dt>${category[index]}</dt>
            //         <dd>${millify(currentValue, { precision: 2})} <strong>100%</strong></dd>
            //       </dl>`;
            //     } else {
            //       text += `<dl class="category">
            //           <dt><span style="background-color: ${graphColorChip[index - 1]}"></span>${categoryValue.key}</dt>
            //           <dd>${millify(currentValue, { precision: 2})} <strong>${ ((currentValue / totalValue) * 100).toFixed(0) }%</strong></dd>
            //         </dl>`;
            //     }
            //   }
            // });

            text += '</div>';
            return text;
          }
        });
      }

      const cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
          // behavior: 'none',
          // xAxis,
        }),
      );
      cursor.lineX.setAll({
        stroke: am5.color(0x404040),
        strokeDasharray: [0, 0],
      });
      cursor.lineY.set('visible', false);

      // xAxis.set(
      //   'tooltip',
      //   am5.Tooltip.new(root, {
      //     themeTags: ['axis'],
      //   })
      // );

      series.data.setAll(data);
      series.appear();
    };

    category
      .filter((c) => c !== 'TOTAL')
      .forEach((c, cIdx) => {
        createSeries(c, c, graphColorChip[cIdx], true);
      });

    // only TIPO
    // createSeries(category[0], category[0], graphColorChip[0], true);
    /* 23.04.06 수정 end: frc 추가로 차트 다중 데이터용 활성화, only TIPO 케이스 주석 처리 */

    // createSeries('etc', 'etc', graphColorChip[3]);
    // createSeries('BUSD', 'BUSD', graphColorChip[2]);
    // createSeries('USDT', 'USDT', graphColorChip[1]);
    // createSeries('WBNB', 'WBNB', graphColorChip[0]);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data, isPC]);

  return (
    <div className={cn('chart-wrap')}>
      <div id={Id} className={cn('stack-chart-wrap')} />
    </div>
  );
};

export default StackLineChart;
