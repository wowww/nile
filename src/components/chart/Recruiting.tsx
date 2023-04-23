/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

interface tagPropsType {
  rate: number;
  goalNum: string;
}

const Recruiting: React.FC<tagPropsType> = ({ goalNum, rate }) => {
  const [excess, setExcess] = useState<boolean>(false);
  useEffect(() => {
    if (rate >= 100) return setExcess(true);
  }, [rate]);
  return (
    <div className={cn('progress-type recruiting-wrap')}>
      <span className={cn('progress-line goal-line', excess && 'goal-excess')}>
        {excess ? (
          <span className={cn('progress-rate')} style={{ width: `${rate / 100}%` }} />
        ) : (
          <span className={cn('progress-rate')} style={{ width: `${rate}%` }} />
        )}
        <span className={cn('progress-pin')}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_goal.svg' />
          <span>
            <strong>Our Goal</strong>
            <span>{goalNum} WEMIX</span>
          </span>
        </span>
      </span>
    </div>
  );
};
export default Recruiting;
