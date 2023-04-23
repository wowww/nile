import cn from 'classnames';

import InputUnit from './InputUnit';
import { Input } from 'antd';

interface Props {
  category: string;
  initValue: number;
  disabled?: boolean;
  unit: string;
  error?: boolean;
}

const ChangeInputRow = ({ category, initValue, disabled = false, unit, error = false }: Props) => {
  return (
    <div className={cn('change-input-row-wrap')}>
      <span className={cn('category')}>{category}</span>
      <div className={cn('input-area')}>
        <Input disabled value={`${initValue} ${unit}`} className={cn('init-input')} />
        <div className={cn('arrow-icon')}></div>
        <InputUnit unit={unit} disabled={disabled} error={error} />
      </div>
    </div>
  );
};

export default ChangeInputRow;
