import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

interface tagPropsType {
  current?: number;
  goal?: number;
  participate?: number;
  isEnd?: boolean;
  ongoing?: boolean;
}

const Reward = ({ goal, current, participate, isEnd, ongoing }: tagPropsType) => {
  const { t } = useTranslation('daoHome');

  const [excess, setExcess] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    if (rate >= 100) return setExcess(true);
  }, [rate]);

  useEffect(() => {
    if (current && goal) {
      setRate(Math.floor((current / goal) * 100));
    }
  }, [goal, current]);

  return (
    <div className={cn('progress-type reward-wrap', isEnd && 'end')}>
      <p className={cn('guide', { participating: participate })}>
        {isEnd ? (
          t('check.about.end', { num: participate })
        ) : participate ? (
          <Trans
            i18nKey="check.about.participating"
            ns="daoHome"
            values={{
              num: participate,
            }}
          >
            <span></span>
          </Trans>
        ) : (
          t('check.about.participate')
        )}
      </p>
      <span className={cn('progress-line goal-line')}>
        {excess ? (
          <span className={cn('progress-rate')} style={{ width: `${100}%` }} />
        ) : (
          <span className={cn('progress-rate')} style={{ width: `${rate}%` }} />
        )}
      </span>
      <div className={cn('chart-field-wrap', ongoing && 'ongoing')}>
        <div className={cn('current')}>
          <span className={cn('name')}>{t('check.about.fieldName')}</span>
          <span className={cn('value')}>
            {current?.toLocaleString()} WEMIX {ongoing && <strong className="percent">({rate}%)</strong>}
            {/* 향후 goalNum number 타입으로 변경 시 모바일 케이스를 위한 분기 */}
            {/* {currentNum} WEMIX {ongoing && <strong className={cn('percent', goalNum > 10000000 && 'over-num')}>({rate}%)</strong>} */}
          </span>
        </div>
        <div className={cn('target')}>
          {/* TODO: 목표 달성 분기 처리 */}
          {excess ? (
            <span className={cn('name')}>{t('check.about.fieldName3')}</span>
          ) : (
            <span className={cn('name')}>{t('check.about.fieldName2')}</span>
          )}
          <span className={cn('value')}>{goal?.toLocaleString()} WEMIX</span>
        </div>
      </div>
    </div>
  );
};
export default Reward;