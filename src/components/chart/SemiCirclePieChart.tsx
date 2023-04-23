import { useEffect } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { uuid } from 'uuidv4';

am5.addLicense('AM5C358434391');

interface SemiCirclePieChartData {
  value: number;
  category: string;
}

const SemiCirclePieChart = ({ data }: { data: SemiCirclePieChartData[] }) => {
  const Id = uuid();

  useEffect(() => {
    let root = am5.Root.new(`${Id}`);
    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        /* 23.04.07 수정: 4/6 DAO 영문 번역 이슈로 인한 그래프 영역 수정(공통) */
        radius: am5.percent(100),
        innerRadius: am5.percent(55),
      }),
    );
    const createSeries = () => {
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          startAngle: 180,
          endAngle: 360,
          valueField: 'value',
          categoryField: 'category',
          alignLabels: false,
        }),
      );

      series.states.create('hidden', {
        startAngle: 180,
        endAngle: 180,
      });
      series.slices.template.setAll({
        stroke: am5.color(0xffffff),
        strokeWidth: 4,
      });

      series.get('colors')?.set('colors', [am5.color(0x7246ee), am5.color(15263976)]);

      series.ticks.template.setAll({
        forceHidden: true,
      });
      series.slices.template.set('tooltipText', '');
      series.labels.template.setAll({
        visible: false,
        // disabled: true,
      });

      series.slices.template.states.create('active', {
        shiftRadius: 0,
        scale: 1,
        forceInactive: true,
      });
      series.slices.template.states.create('hover', {
        shiftRadius: 0,
        scale: 1,
      });
      if (data[0].value === 0 && data[1].value === 0) {
        series.data.setAll([{ value: 0 }, { value: 100 }]);
      } else {
        series.data.setAll(data);
      }
    };

    createSeries();
    chart.appear(1000, 100);
    return () => root.dispose();
  }, [data]);

  return (
    <div className={cn('chart-wrap', 'semi-circle-pie-chart')}>
      <div id={Id} className={cn('bar-chart-wrap')} />
    </div>
  );
};

export default SemiCirclePieChart;
