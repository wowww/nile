import cn from "classnames";
import {ReactNode} from "react";

interface Props {
  title: string;
  classnames?: string;
  children?: ReactNode;
}

const DaoReportSection = ({title, classnames, children}: Props) => {
  return (
    <div className={cn('dao-common-card')}>
      <h4 className={cn('card-title')}>{title}</h4>
      <ul className={cn('card-item-list', classnames)}>
        {children}
      </ul>
    </div>
  )
}

export default DaoReportSection;
