import { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import cn from 'classnames';
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { useRecoilState } from 'recoil';
import { TinyChartFilterState } from '@/components/chart/tokensChartDummyData';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import { useAtom } from 'jotai';
import useMediaQuery from '@/hook/useMediaQuery';

am5.addLicense('AM5C358434391');

interface Props {
  dataItems?: any;
  isPeriod?: boolean;
}

const BarChartHour = ({ dataItems, isPeriod }: Props) => {
  const [filter, setFilter] = useAtom(TinyChartFilterState);
  const isPC = useMediaQuery('(min-width: 1440px)');
  const chartRef: any = useRef(null);

  useEffect(() => {
    let root = am5.Root.new('barChartHourDiv');
    root.setThemes([am5themes_Animated.new(root)]);
    root.numberFormatter.setAll({
      numberFormat: '#,###.00a',

      // Group only into M (millions), and B (billions)
      bigNumberPrefixes: [
        //{ number: 1e3, suffix: "K" },
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
      }),
    );
    chartRef.current = chart;
    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: '#,###.00a',
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 1,
          stroke: am5.color(0xd9d9d9),
          strokeWidth: 2,
          opposite: true,
        }),
      }),
    );
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'hour', count: 1 },
        gridIntervals: [{ timeUnit: 'hour', count: isPC ? 2 : 8 }],
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 1,
          stroke: am5.color(0xd9d9d9),
          strokeWidth: 2,
          minGridDistance: 30,
        }),
      }),
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
      paddingLeft: 35,
    }); // x축 라벨
    const yRenderer = yAxis.get('renderer');
    yRenderer.grid.template.setAll({
      visible: false,
    }); // y축 배경선
    yRenderer.labels.template.setAll({
      oversizedBehavior: 'fit',
      textAlign: 'left',
      fill: am5.color(0x8c8c8c),
      fontSize: 12,
      paddingLeft: 10,
      paddingRight: 12,
      // location: 1,
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
        }),
      );
      // bar chart style
      series.columns.template.setAll({
        width: 10,
        strokeOpacity: 0,
        fillOpacity: 1,
        fill: am5.color(0x875cff),
      });

      const tooltip = series.set(
        'tooltip',
        am5.Tooltip.new(root, {
          autoTextColor: false,
          pointerOrientation: 'down',
          getFillFromSprite: false,
          getLabelFillFromSprite: false,
          paddingRight: 8,
          paddingLeft: 8,
          paddingTop: 6,
          paddingBottom: 6,
          // width: 95,
        }),
      );

      tooltip.get('background')!.setAll({
        opacity: 1,

        fill: am5.color(0x404040),
        stroke: am5.color(0x404040),
        fillOpacity: 1,
      });

      tooltip.label.setAll({
        fill: am5.color(0xffffff),
      });

      series.data.setAll(dataItems);
      series.appear(1000);

      series.columns.template.setAll({
        tooltipX: am5.percent(50),
        tooltipY: -5,
        tooltipText: '{valueY}',
      });
    };

    createSeries('BarChart', 'TOTAL', am5.color(0xff3333));

    chartRef.current = chart;
    root.resize();

    return () => {
      root.dispose();
    };
  }, [isPC, dataItems]);

  return (
    <>
      {isPeriod && (
        <div className={cn('chart-overview')}>
          <div className={cn('total-status')}>
            <span className={cn('figure-wrap')}>
              <span className={cn('figure')}>$258.09</span>
              <TagFluctuationRate figure={9.66} />
            </span>
            <div className={cn('today')}>2022-08-16 13:53</div>
          </div>
          <ChartPeriodTab setFilter={setFilter} />
        </div>
      )}
      <div className={cn('chart-wrap')}>
        <div id="barChartHourDiv" className={cn('bar-chart-wrap')} />
      </div>
    </>
  );
};

export default BarChartHour;
