/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, {useEffect, useMemo, useState} from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

interface AgoraProps {
  current?: number;
  goal?: number;
  total?: number;
}

const Agora = ({ goal, current, total }: AgoraProps) => {
  const currentRate = useMemo(() => {
    return (current ?? 0) / (total ?? 0) * 100;
  }, [current, total])

  const goalRate = useMemo(() => {
    return (goal ?? 0) / (total ?? 0) * 100;
  }, [goal, total])

  return (
    <div className={cn('progress-type agora-wrap')}>
      <span className={cn('progress-line')}>
        <span className={cn('progress-rate')} style={{ width: `${currentRate}%` }}>
          <span className={cn(currentRate < 16 ? 'rate-align-left' : 'rate-align-right')}>Now : {currentRate}%</span>
        </span>
        <span className={cn('progress-pin')} style={{ left: `${goalRate}%` }}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_goal.svg' />
          <span>
            <span>Quorum {goalRate}%</span>
          </span>
        </span>
      </span>
    </div>
  );
};
export default Agora;
