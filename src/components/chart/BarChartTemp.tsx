import { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import cn from 'classnames';
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { TinyChartFilterState } from '@/components/chart/tokensChartDummyData';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import moment from 'moment';
import { useAtom } from 'jotai';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

interface Props {
  dataItems?: any;
  isPeriod?: boolean;
}

const BarChart = ({ dataItems, isPeriod }: Props) => {
  const [filter, setFilter] = useAtom(TinyChartFilterState);
  const [figure, setFigure] = useState(258.09);
  const initTime: number = dataItems[dataItems.length - 1].date;
  const timeParse = (time: number) => moment(time).format('YYYY-MM-DD HH:MM');
  const [date, setDate] = useState(timeParse(initTime));

  const chartRef: any = useRef(null);

  const checkAllValueZero = (dataItems: any[]): boolean => {
    let isZero = true;
    dataItems.forEach((item) => {
      if (item.value != 0) isZero = false;
    });

    return isZero;
  };

  const isAllZero = checkAllValueZero(dataItems);

  useEffect(() => {
    let root = am5.Root.new('barChartdiv');
    root.setThemes([am5themes_Animated.new(root)]);
    root.numberFormatter.setAll({
      numberFormat: "#a",

      // Group only into M (millions), and B (billions)
      bigNumberPrefixes: [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ],

      // Do not use small number prefixes at all
      smallNumberPrefixes: [],
    });
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        cursor: am5xy.XYCursor.new(root, {}),
      })
    );
    chartRef.current = chart;
    /* 22.10.27 수정: 차트 zoomButton 제거 코드 추가 */
    chart.zoomOutButton.set('forceHidden', true);

    setTimeout(() => {
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          ...(isAllZero
            ? { min: 0, max: 100 }
            : {}),
          numberFormat: "#.00a",
          renderer: am5xy.AxisRendererY.new(root, {
            opposite: true,
          }),
        })
      );
      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: 'day', count: 1 },
          dateFormats: {
            hour: 'hh:mm',
            day: 'dd',
            week: 'dd',
            month: 'MM-dd',
            year: 'yyyy',
          },
          renderer: am5xy.AxisRendererX.new(root, {
            visible: false,
            minGridDistance: 30,
          }),
          tooltipLocation: 0.5,
          tooltip: am5.Tooltip.new(root, {
            forceHidden: true,
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
        oversizedBehavior: 'fit',
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        paddingTop: 8,
        fontSize: 12,
      }); // x축 라벨
      const yRenderer = yAxis.get('renderer');
      yRenderer.grid.template.setAll({
        visible: false,
      }); // y축 배경선
      yRenderer.labels.template.setAll({
        oversizedBehavior: 'fit',
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        fontSize: 12,
      }); // y축 라벨

      // 시리즈 생성
      const createSeries = (name: string, field: string, stroke: any) => {
        const series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name,
            xAxis,
            yAxis,
            valueYField: field,
            valueXField: 'date',
            stroke,
            tooltip: am5.Tooltip.new(root, {
              forceHidden: true,
            }),
          })
        );
        // bar chart style
        series.columns.template.setAll({
          width: 13,
          strokeOpacity: 0,
          fillOpacity: 1,
          fill: am5.color(0x875cff),
        });

        series.data.setAll(dataItems);
        series.appear(1000);

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
            locationX: 0.5,
            locationY: 1,
            sprite: circle,
          });
        });

        const cursor = chart.set(
          'cursor',
          am5xy.XYCursor.new(root, {
            xAxis: xAxis,
          })
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
            // @ts-ignore // FIXME: 빌드 오류로 임시 ignore 처리
            setFigure(dataItem.dataContext?.value);
            // @ts-ignore // FIXME: 빌드 오류로 임시 ignore 처리
            setDate(timeParse(dataItem?.dataContext?.date));
          }
        };

        cursor.events.on('cursormoved', cursorMoved);
      };

      createSeries('BarChart', 'value', am5.color(0x875cff));

      chartRef.current = chart;
      root.resize();
    }, 300);

    return () => {
      root.dispose();
    };
  }, [dataItems, filter]);

  return (
    <>
      {isPeriod && (
        <div className={cn('chart-overview')}>
          <div className={cn('total-status')}>
            <span className={cn('figure-wrap')}>
              <span className={cn('figure')}>${figure}</span>
              <TagFluctuationRate figure={9.66} />
            </span>
            <div className={cn('today')}>{date}</div>
          </div>
          <ChartPeriodTab setFilter={setFilter} />
        </div>
      )}
      <div className={cn('chart-wrap')}>
        <div id="barChartdiv" className={cn('bar-chart-wrap')} />
      </div>
    </>
  );
};

export default BarChart;
