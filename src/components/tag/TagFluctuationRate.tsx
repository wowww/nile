import { Tag } from 'antd';
import cn from 'classnames';

type Props = {
  bg?: boolean;
  large?: boolean;
  figure: number;
  /* 23.02.28 수정: type props 추가 */
  type?: string;
};

/* 23.02.28 수정: type props 추가 */
const TagFluctuationRate = ({ bg, large, figure, type }: Props) => {
  const state = figure > 0 ? 'increase' : figure < 0 ? 'decrease' : 'even';
  const absNum = Math.abs(figure);
  return (
    <Tag
      className={cn(
        'rate',
        {
          increase: state === 'increase',
          decrease: state === 'decrease',
          large: large,
          bg: bg,
        },
        /* 23.02.28 수정: type 추가 */
        type,
      )}
    >
      {state === 'increase' ? '+' : state === 'decrease' ? '-' : null}
      {new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(absNum)}%
    </Tag>
  );
};

export default TagFluctuationRate;
