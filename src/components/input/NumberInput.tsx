import React, {ReactNode, useCallback, useEffect} from 'react';
import cn from 'classnames';
/* 22.11.16 수정: IconArrow 추가 IconInputNumUp, IconInputNumDown 삭제 */
import { useNumberFormatter } from '@utils/formatter/number';
import { ReactSVG } from 'react-svg';

interface inputPropsType {
  onClickPlus?: (price: number) => void;
  onClickMinus?: (price: number) => void;
  value?: any;
  setValue?: (n: any) => void;
  unit: string;
  plusDisabled?: boolean;
  minusDisabled?: boolean;
  error?: boolean;
  bgBlack?: boolean;
  inputDisabled?: boolean;
  parentName?: string;
}

const NumberInput = ({
  value,
  setValue,
  unit,
  onClickPlus,
  onClickMinus,
  plusDisabled,
  minusDisabled,
  error,
  bgBlack,
  inputDisabled,
  parentName
}: inputPropsType) => {
  const { shorthanded } = useNumberFormatter();

  const currentValue = useCallback(() => {
    const newList: ReactNode[] = [];

    let price = shorthanded(value);
    if (value >= 1000000 && !price.includes('.')) {
      price = price.replace(price.slice(-1),`.0${price.slice(-1)}`);
    }

    const priceLength = price.length;
    price = price.padStart(priceLength > 3 ? 7 : 6, '0');

    let idx = 0;
    for (let current of price) {
      if (value < 1000 && idx === 3) {
        newList.push(<span key={`num-inputs-${parentName}-${idx}`} className={cn('comma')}>,</span>);
      }
      newList.push(
        <span
          key={`num-inputs-${parentName}-${idx}-1`}
          className={cn({
            num: current.match(/[0-9]/),
            comma: current.match(/[,.]/),
            active: idx >= price.length - priceLength,
          })}
        >
          {current}
        </span>
      );
      idx += 1;
    }

    return newList;
  }, [value]);

  return (
    /* 22.10.05 수정: disabled 상태 세분화에 따라 class 삭제 */
    <div className={cn('input-number-wrap', error && 'error', bgBlack && 'input-bg-black')}>
      <div className={cn('input-wrap', { 'input-disabled': inputDisabled })}>
        <span className={cn('unit')}>{unit}</span>
        <div className={cn('num-wrap')}>{currentValue()}</div>
      </div>
      <div className={cn('button-wrap')}>
        {/* 22.10.05 수정: disabled 상태 세분화에 따라 button에 disabled 상태 추가 */}
        <button type="button" className={cn('btn-plus')} onClick={() => onClickPlus?.(value)} disabled={plusDisabled}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
          <span className={cn('a11y')}>plus</span>
        </button>
        {/* 22.10.05 수정: disabled 상태 세분화에 따라 button에 disabled 상태 추가 */}
        <button type="button" className={cn('btn-minus')} onClick={() => onClickMinus?.(value)} disabled={minusDisabled}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
          <span className={cn('a11y')}>minus</span>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
