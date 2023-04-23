import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';

interface ComponentProps {
  list?: boolean;
  ongoing?: boolean;
  participate?: {
    amount: string;
    percent: number;
  };
  isEnd?: boolean;
  joinAmount?: number;
  chartData?: ChartProps;
}

type ChartProps = {
  goalNum: number;
  currentNum: number;
  participateNum: number;
};

const BtnArea = ({ list, ongoing, participate, isEnd, joinAmount, chartData }: ComponentProps) => {
  const { t } = useTranslation('daoHome');

  // Dao List의 경우 항상 '보러가기' 버튼 노출
  if (list) {
    return (
      <BgButton
        buttonText={
          <Trans
            i18nKey="check.about.btn2"
            ns="daoHome"
            values={{
              link: 'WONDER DAO',
            }}
          />
        }
        color="highlight"
        size="md"
      />
    );
  }

  // 이하 스테이션 모집 중 페이지 (recruiting)

  // 모집 전 경우
  if (!ongoing && !isEnd && !list) {
    return <BgButton buttonText={t('check.about.before.btn1')} color="highlight" size="md" disabled />;
  }

  // 모집 중 && 유저 참여 안함
  if (!isEnd && !joinAmount) {
    return <BgButton buttonText={t('check.about.before.btn1')} color="highlight" size="md" />;
  }

  // 모집 중 && 유저 참여
  if (!isEnd && joinAmount) {
    return (
      <>
        <BgButton
          buttonText={t('check.about.after.btn1')}
          color="highlight"
          size="md"
          hasTooltip
          tooltipPlace={'top'}
          tooltipHtml={t('check.about.after.tooltip')}
          tooltipClassName={'dao-station-check-more-tooltip'}
        />
        <OutlineButton buttonText={t('check.about.after.btn2')} color="highlight" size="md" />
      </>
    );
  }

  // 모집 완료 && 유저참여 -> 배분 계산
  if (isEnd && joinAmount && chartData && chartData.currentNum >= chartData.goalNum) {
    return (
      <BgButton
        buttonText={t('check.about.btn.btn.1')}
        color="primary"
        disabled
        size="md"
        hasTooltip
        tooltipPlace={'topRight'}
        tooltipHtml={t('check.about.btn.tooltip.1')}
        tooltipClassName={'dao-station-check-more-tooltip'}
      />
    );
  }

  // 모집 무산 && 유저참여 -> 환불
  if (isEnd && joinAmount && chartData && chartData.currentNum < chartData.goalNum) {
    return (
      <BgButton
        buttonText={t('check.about.btn.btn.2')}
        color="highlight"
        size="md"
        hasTooltip
        tooltipPlace={'topRight'}
        tooltipHtml={t('check.about.btn.tooltip.2')}
        tooltipClassName={'dao-station-check-more-tooltip'}
      />
    );
  }

  return <div>'잘못된 Props를 넣었습니다'</div>;
};

export default BtnArea;
