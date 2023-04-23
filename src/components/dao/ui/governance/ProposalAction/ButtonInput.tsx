import { useReducer } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

interface Props {
  disabled?: boolean;
  unit: string;
}

interface Action {
  type: string;
}

const reducer = (state: number, action: Action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
};

const ButtonInput: React.FC<Props> = ({ disabled, unit }) => {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div className={cn('input-number-wrap', 'governance')}>
      <div className={cn('input-wrap', { 'input-disabled': disabled })}>
        <div className={cn('num-wrap')}>
          {state} {unit}
        </div>
      </div>
      <div className={cn('button-wrap')}>
        <button type="button" className={cn('btn-plus')} onClick={() => dispatch({ type: 'INCREASE' })}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_input_num_up.svg" />
          <span className={cn('a11y')}>plus</span>
        </button>
        <button type="button" className={cn('btn-minus')} onClick={() => dispatch({ type: 'DECREASE' })}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_input_num_down.svg" />
          <span className={cn('a11y')}>minus</span>
        </button>
      </div>
    </div>
  );
};

export default ButtonInput;
