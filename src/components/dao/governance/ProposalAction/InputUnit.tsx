import { Input } from 'antd';

interface Props {
  unit: string;
  disabled?: boolean;
  error?: boolean;
}

const InputUnit: React.FC<Props> = ({ unit, disabled = false, error = false }) => {
  return <Input suffix={unit} placeholder={'0'} disabled={disabled} status={error ? 'error' : ''} />;
};

export default InputUnit;
