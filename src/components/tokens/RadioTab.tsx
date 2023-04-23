import cn from 'classnames';
import { Radio, RadioChangeEvent } from 'antd';
import Chip from '@components/tag/Chip';

interface btnListProps {
  value?: string;
  name: string;
  count?: number;
}

interface Props {
  btnList: Array<btnListProps>;
  nowTab: string;
  setNowTab: (defaultVal: string) => void;
  chipSize?: string;
  strong?: boolean;
  /* 23.03.24 수정: type 추가 */
  type?: string;
}

/* 23.03.24 수정: type 추가 */
const RadioTab: React.FC<Props> = ({ btnList, nowTab, setNowTab, chipSize = 'lg', strong, type }) => {
  const _handleTabChange = (e: RadioChangeEvent) => {
    setNowTab(e.target.value);
  };
  return (
    <Radio.Group onChange={_handleTabChange} value={nowTab} className={cn('radio-chip', [type])}>
      {btnList.map((el, idx) => (
        <Radio.Button value={el.value} key={`${el.name}-${idx}`}>
          <Chip size={chipSize} bg={nowTab === el.value}>
            {strong ? <strong>{el.name}</strong> : <>{el.name}</>}
            {el.count && <span className={cn('count')}>{el.count}</span>}
          </Chip>
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default RadioTab;
