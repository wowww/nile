import { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import cn from 'classnames';
import { uuid } from 'uuidv4';
import { TinyChartFilterState } from '@/components/chart/tokensChartDummyData';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import { useAtom } from 'jotai';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

interface actionPropsType {
  payload: statePropsType;
}
interface statePropsType {
  value: string;
}
interface Props {
  dataItems?: any;
  coinName?: string;
  strokeWidth?: number;
  isPeriod?: boolean;
  type?: string;
  height: number;

  onPeriodChange?: Function
}

const TinyChart = ({ dataItems, strokeWidth = 1, isPeriod = false, type = 'ascend', height, onPeriodChange }: Props) => {
  const [period, setPeriod] = useState('day');

  const chartRef: any = useRef(null);
  const Id = uuid();
  // const strokeColor = type === 'ascend' ? '#00bf20' : '#ff3333';
  const initValue = dataItems[0]?.value || 0;
  const upColor = '#00bf20';
  const lowColor = '#ff3333';

  const changePeriod = (_period: string) => {
    setPeriod(_period);
    if(onPeriodChange) {
      onPeriodChange(_period);
    }
  }

  useEffect(() => {
    let root = am5.Root.new(`${Id}`);

    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: -20,
        paddingTop: 2,
        paddingBottom: 2,
        focusable: false,
        pinchZoomX: false,
      })
    );
    chartRef.current = chart;
    /* 22.10.27 수정: 차트 zoomButton 제거 코드 추가 */
    chart.zoomOutButton.set('forceHidden', true);

    setTimeout(() => {
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          numberFormat: "#.00'M'",
          strictMinMaxSelection: true,
          extraMax: 0.01,
          extraMin: 0.01,
          baseValue: 300,
          renderer: am5xy.AxisRendererY.new(root, {
            opposite: true,
          }),
        })
      );
      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: 'hour', count: 1 },
          dateFormats: {
            day: 'dd',
            week: 'dd',
            month: 'mm',
            year: 'yyyy',
          },
          renderer: am5xy.AxisRendererX.new(root, {
            visible: false,
            minGridDistance: 30,
          }),
        })
      );
      xAxis.data.setAll(dataItems);

      // 축 스타일
      const xRenderer = xAxis.get('renderer');
      xRenderer.grid.template.setAll({
        visible: false,
      }); // x축 배경선
      xRenderer.labels.template.setAll({
        visible: false,
      }); // x축 라벨
      const yRenderer = yAxis.get('renderer');
      yRenderer.grid.template.setAll({
        visible: false,
      }); // y축 배경선
      yRenderer.labels.template.setAll({
        visible: false,
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
            minDistance: 5,
          })
        );
        series.fills.template.setAll({
          visible: false,
        });
        series.strokes.template.setAll({
          strokeWidth: strokeWidth,
          stroke: stroke,
        });

        series.data.setAll(dataItems);
        series.appear(1000);
        series.events.on('datavalidated', function () {
          // initValue와 그래프 값중 가장 차이가 큰 값의 수치를 계산하여 최소/최대 수치가 입력되어야
          // 등락 그래프가 위아래로 치우치지 않고 정확하게 한가운데서 그려집니다.

          const minVal = yAxis.getPrivate('min') || 0;
          const maxVal = yAxis.getPrivate('max') || 0;

          yAxis.setAll({
            min: minVal,
            max: maxVal,
          });

          const rangeDataItem = yAxis.makeDataItem({
            value: 0,
            endValue: initValue,
          });
          const range: any = series.createAxisRange(rangeDataItem);
          range.strokes.template.setAll({
            stroke: lowColor,
            strokeWidth: 1,
          });
        });
      };

      createSeries('LineChart', 'value', am5.color(upColor));

      chartRef.current = chart;
      root.resize();
    }, 300);

    return () => {
      root.dispose();
    };
  }, [dataItems, period]);

  return (
    <>
      {isPeriod && (
        <div className={cn('chart-overview tiny')}>
          <ChartPeriodTab defaultValue={'day'} setFilter={changePeriod} filterData={['day', 'week', 'month', 'year']} />
        </div>
      )}
      <div id={Id} style={{ width: 'auto', height: height }}></div>
    </>
  );
};

export default TinyChart;
