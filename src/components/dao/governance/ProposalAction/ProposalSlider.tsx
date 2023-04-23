import { useState } from 'react';
import { Slider } from 'antd';
import cn from 'classnames';

interface Props {
  readonly type?: 'single' | 'dual';
  readonly value?: number;
  setValue?: (value: number) => void;
  disabled?: boolean;
}

const ProposalSlider: React.FC<Props> = ({ type = 'single', value, setValue, disabled = false }) => {
  // const [sliderValue, setSliderValue] = useState<number>(50);

  const _handleSingleSliderValue = (value: number) => {
    if (value < 50) {
      setValue!(50);
    } else {
      setValue!(value);
    }
  };

  if (type === 'single') {
    return (
      <Slider
        className={cn('dao-governance-proposal-slider')}
        defaultValue={50}
        min={0}
        max={100}
        value={value}
        tooltip={{ open: false }}
        onChange={(v) => _handleSingleSliderValue(v)}
        disabled={disabled}
      />
    );
  } else {
    return (
      <Slider
        className={cn('dao-governance-proposal-slider', 'dual')}
        defaultValue={50}
        min={0}
        max={100}
        value={value}
        tooltip={{ open: false }}
        onChange={(v) => setValue!(v)}
        disabled={disabled}
      />
    );
  }
};

export default ProposalSlider;
