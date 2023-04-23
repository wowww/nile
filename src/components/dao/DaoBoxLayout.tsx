import cn from 'classnames';
import { ReactNode } from 'react';
import TextButton from '@/components/button/TextButton';

interface DaoBoxLayoutType {
  children: ReactNode;
  className?: string;
  type?: 'full' | 'half' | 'ratio';
}

interface DaoBoxType {
  children: ReactNode;
  className?: string;
  type?: 'full';
}

interface DaoTitleType {
  children?: ReactNode;
  icon?: ReactNode;
  title: string | ReactNode;
  titleHref?: string;
  desc?: string;
  className?: string;
  type?: 'text' | 'img';
}

type ChartSummaryType = {
  name: string;
  value: string;
  unit?: string;
  subValue?: string;
};

interface DaoChartBoxType {
  children?: ReactNode;
  title: string;
  titleHref?: string;
  date?: string;
  className?: string;
  summary?: ChartSummaryType[];
}
/* 23.02.16 수정: DaoTableTitle 추가 */
interface DaoTableTitle {
  title: string;
  className?: string;
  children?: ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}

export const DaoBoxLayout = ({ children, className, type = 'full' }: DaoBoxLayoutType) => {
  return <div className={cn('dao-box-wrap', className, type)}>{children}</div>;
};

export const DaoBox = ({ children, className, type }: DaoBoxType) => {
  return <div className={cn('dao-box', className, type)}>{children}</div>;
};

export const DaoBoxTitle = ({ children, icon, title, titleHref, desc, className, type }: DaoTitleType) => {
  return (
    <div className={cn('dao-title-box', className, type)}>
      <div className={cn('title-wrap')}>
        {icon && icon}
        <h2 className={cn('title')}>{titleHref ? <TextButton buttonText={title} iconValue="arrow" size="xl" href={titleHref} /> : title}</h2>
        {desc && <p className={cn('desc')}>{desc}</p>}
      </div>
      {children}
    </div>
  );
};

export const DaoChartBox = ({ children, title, titleHref, date, summary, className }: DaoChartBoxType) => {
  return (
    <div className={cn('dao-chart-top', className)}>
      <div className={cn('chart-info-wrap')}>
        <h2 className={cn('title')}>{titleHref ? <TextButton buttonText={title} iconValue="arrow" size="xl" href={titleHref} /> : title}</h2>
        <p className={cn('date')}>{date}</p>
      </div>
      <div className={cn('chart-detail-wrap')}>
        <div className={cn('chart-summary-wrap')}>
          {summary &&
            summary.map((el, index) => {
              return (
                <div className={cn('summary-wrap', { active: index === 0, sub: index > 0 })} key={`summary${index}`}>
                  <strong className={cn('name')}>{el.name}</strong>
                  <span className={cn('value')}>
                    <strong className={cn('num')}>{el.value}</strong>
                    {el.unit && <span className={cn('unit')}>{el.unit}</span>}
                    {el.subValue && <span className={cn('sub-value')}>{el.subValue}</span>}
                  </span>
                </div>
              );
            })}
        </div>
        {children && <div className={cn('chart-control-wrap')}>{children}</div>}
      </div>
    </div>
  );
};

/* 23.02.16 수정 start: DaoTableLayout, DaoTableTitle 추가 */
export const DaoTableLayout = ({ children }: DaoBoxLayoutType) => {
  return <div className={cn('dao-individual-table-area')}>{children}</div>;
};

export const DaoTableTitle = ({ title, className, children, direction }: DaoTableTitle) => {
  return (
    <div className={cn('dao-individual-table-title', className, direction)}>
      {title}
      {children}
    </div>
  );
};
/* 23.02.16 수정 end: DaoTableLayout, DaoTableTitle 추가 */
