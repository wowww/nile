import cn from "classnames";
import {Popover} from "antd";
import IconInfo from "@images/icon/ico_info.svg";
import {useNumberFormatter} from "@utils/formatter/number";

interface Props {
  subtitle: any;
  hasNotice?: boolean;
  notice?: string;
  unit?: string | number;
  price: any;
  active?: boolean;
  classnames?: string;
  hasClassnameUnit?: boolean;
  hasClassnameUnitDollar?: boolean;
  dollar?: number;
}

const DaoReportContents = ({subtitle, notice, hasNotice, unit, hasClassnameUnit, hasClassnameUnitDollar, dollar, price, classnames, active}: Props) => {
  const { shorthanded } = useNumberFormatter();

  return (
    <li className={cn('card-item', classnames)}>
      <div className={cn('card-notice')}>
        <h5>{subtitle}</h5>
        {hasNotice &&
          <Popover
            overlayClassName="tooltip"
            placement="top"
            content={<div className={cn('tooltip-contents')}>{notice}</div>}
            trigger="hover"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <button type="button">
              <IconInfo/>
            </button>
          </Popover>
        }
      </div>
      <strong className={cn('card-unit', active && 'active')}>
        { !hasClassnameUnit && unit}
        { !isNaN(price)
          ? shorthanded(price)
          : price
        }
        { hasClassnameUnit &&
          <span className={cn('unit')}>
            {' '}{unit}
          </span>
        }
      </strong>
      { hasClassnameUnitDollar &&
				<span className="card-unit-dollar">(${' '}{shorthanded(dollar)})</span>
      }
    </li>
  )
}

export default DaoReportContents;