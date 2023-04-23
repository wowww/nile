import { useState, useEffect } from 'react';
import cn from 'classnames';
import ProposalSlider from './ProposalSlider';
import { useTranslation } from 'next-i18next';
interface Props {
  readonly category: [string, string];
  readonly initValue: [number, number];
  desc?: string;
  disabled?: boolean;
}

const ProposalDualSlider: React.FC<Props> = ({ category, initValue, desc, disabled }) => {
  const { t } = useTranslation('dao');

  const [leftValue, setLeftValue] = useState<number>(initValue![0]);
  const [rightValue, setRightValue] = useState<number>(initValue![1]);

  useEffect(() => {
    setRightValue(100 - leftValue);
  }, [leftValue]);

  return (
    <div className={cn('proposal-dual-slider-wrap')}>
      <ProposalSlider type="dual" value={leftValue} setValue={setLeftValue} disabled={disabled} />
      <ul className={cn('slider-info-list')}>
        <li>
          {category[0]} : <span className={cn('figure')}>{leftValue}%</span>
        </li>
        <li>
          {category[1]} : <span className={cn('figure')}>{rightValue}%</span>
        </li>
      </ul>
      <span className={cn('slider-desc')}>
        *{desc} {category[0]} : {category[1]} = {initValue[0]}% : {initValue[1]}%
      </span>
    </div>
  );
};

export default ProposalDualSlider;
