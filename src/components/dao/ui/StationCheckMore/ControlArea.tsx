import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import BottomInfo from './BottomInfo';
import BtnArea from './BtnArea';

export interface ComponentProps {
  joinAmount?: number; // 현재 유저의 참여 여부 및 참여 금액
  ongoing?: boolean; // 모집 시작 전/후
  isEnd?: boolean; // 모집 종료 여부
  participate?: {
    // 모집 중 스테이션의 현재 모집 양
    amount: string;
    percent: number;
  };
  list?: boolean; // 다오 홈 다오 리스트에 들어가는지 여부
  chartData?: ChartProps;
}

type ChartProps = {
  goalNum: number;
  currentNum: number;
  participateNum: number;
};

const ControlArea = ({ joinAmount, ongoing, participate, list, isEnd, chartData }: ComponentProps) => {
  return (
    <div className={cn('control-wrap')}>
      {!list && (joinAmount || ongoing) && <BottomInfo joinAmount={joinAmount} />}
      <div className={cn('btn-wrap')}>
        <BtnArea list={list} ongoing={ongoing} participate={participate} isEnd={isEnd} joinAmount={joinAmount} chartData={chartData} />
      </div>
    </div>
  );
};

export default ControlArea;
