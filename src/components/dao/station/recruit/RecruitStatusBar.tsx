import { useTranslation } from 'next-i18next';
import { useNumberFormatter } from '@utils/formatter/number';
import { useMemo, useRef } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { fromWei } from 'web3-utils';
import { DaoStatus, NileDao } from '@/types/dao/dao.types';
import { RealTimeInfo } from '@/types/contract.types';

interface RecruitStatusBar {
  dao?: NileDao | null;
  stationRealTimeInfo?: RealTimeInfo;
}

const RecruitStatusBar = ({ dao, stationRealTimeInfo }: RecruitStatusBar) => {
  const { t } = useTranslation(['common', 'dao']);

  const { shorthanded } = useNumberFormatter();

  const targetRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const rate = useMemo(() => {
    if (dao?.purposeAmount && stationRealTimeInfo?.totalEnterAmount) {
      return (Number(stationRealTimeInfo.totalEnterAmount) / Number(fromWei(dao?.purposeAmount ?? '', 'ether'))) * 100;
    }
    return 0;
  }, [dao, stationRealTimeInfo]);

  const targetPosition = useMemo(() => {
    if (!stationRealTimeInfo?.totalEnterAmount || !fromWei(dao?.purposeAmount ?? '', 'ether')) {
      console.log(stationRealTimeInfo, dao);
      return 0;
    }

    const result = Number(stationRealTimeInfo?.totalEnterAmount) / Number(fromWei(dao?.purposeAmount ?? '', 'ether'));

    if (result > 2) {
      return 50;
    }

    if (result > 1) {
      return (100 / (100 * result)) * 100;
    }

    return 100;
  }, [dao, stationRealTimeInfo]);

  const isTargetAlignCenter = useMemo(() => {
    if (targetRef?.current && progressRef?.current) {
      const percent = ((progressRef.current?.clientWidth - targetRef.current?.clientWidth) / progressRef.current?.clientWidth) * 100;
      return percent >= targetPosition;
    }
    return true;
  }, [targetRef.current, progressRef.current, targetPosition]);

  return (
    <div className={cn('progress-type reward-wrap')} style={{ '--goal': `${targetPosition}%` } as React.CSSProperties} ref={progressRef}>
      {!dao && <p className={cn('notice')}>{t('station.recruitCondition.condition.status.recruited.notice', { ns: 'dao' })}</p>}
      {dao && (
        <p className={cn('guide')}>
          <span className={cn('percent')}>{rate.toFixed(2)}%</span>
          <span className={cn('amount')}>
            {Number(stationRealTimeInfo?.totalEnterAmount).toLocaleString('ko-KR')}
            <span className={cn('unit')}>WEMIX</span>
          </span>
        </p>
      )}

      <span className={cn('progress-line goal-line')}>
        <span
          className={cn('progress-rate')}
          style={{
            width: `${rate > 100 ? 100 : rate}%`,
          }}
        />
        <span
          className={cn('progress-goal')}
          style={
            {
              '--goal': `${targetPosition}%`,
            } as React.CSSProperties
          }
        >
          <span className={cn('img-goal')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_station_goal.svg" />
          </span>
          <span className={cn(`target-goal ${isTargetAlignCenter ? 'center' : 'right'}`)} ref={targetRef}>
            {Number(fromWei(dao?.purposeAmount ?? '', 'ether')).toLocaleString()} WEMIX
          </span>
        </span>
      </span>
      {dao && (
        <p className={cn('chart-field-wrap')}>
          <span className={cn('counting')}>
            <span className={cn('number')}>{stationRealTimeInfo?.enterCount}</span>
            {/* 23.04.10 수정: 참여중, 참여 완료 레이블 참여 인원수 표기 통일 */}
            {t('rewardPeople')}
          </span>
        </p>
      )}
    </div>
  );
};

export default RecruitStatusBar;
