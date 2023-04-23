// TODO: 더이상 사용 안함
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useRef } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useEffect, useState, useMemo } from 'react';
import { throttle } from 'lodash';

interface tagPropsType {
  rate?: number;
  firstData?: string;
  secondData?: string;
  people?: number;
  complete?: boolean;
}

const RecruitmentReward: React.FC<tagPropsType> = ({ rate, firstData, secondData, people, complete }) => {
  const { t } = useTranslation(['common']);

  const [isRate, setIsRate] = useState<boolean>(false);
  const [sectionTopPageY, setSectionTopPageY] = useState<number>(0);

  const documentRef = useRef<Document>();
  const programsRef = useRef<any>(null);

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        if (programsRef.current) {
          const { pageYOffset } = window;
          const reallyPosition = programsRef.current.getBoundingClientRect().top + pageYOffset;

          if (reallyPosition - pageYOffset < 100) {
            setIsRate(false);
          } else if (reallyPosition < pageYOffset + 800) {
            setIsRate(true);
          } else {
            setIsRate(false);
          }
        }
      }, 100),
    [sectionTopPageY],
  );

  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);

    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
  }, [throttleHandler]);

  return (
    <div className={cn('progress-type reward-wrap')}>
      {!complete && (
        <p className={cn('guide')}>
          <em>{firstData} WEMIX </em> / {secondData} WEMIX
        </p>
      )}
      <span className={cn('progress-line goal-line')} ref={programsRef}>
        {complete ? (
          <span className={cn('progress-rate')} style={{ width: isRate ? '100%' : '0%' }} />
        ) : (
          <span className={cn('progress-rate')} style={{ width: isRate ? `${rate}%` : '0%' }} />
        )}
      </span>
      {!complete && (
        <p className={cn('chart-field-wrap')}>
          {people}
          {t('rewardPeople')}
        </p>
      )}
    </div>
  );
};
export default RecruitmentReward;
