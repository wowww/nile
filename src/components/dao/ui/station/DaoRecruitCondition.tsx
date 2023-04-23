import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'next-i18next';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
/* 23.03.31 수정 start: lottie 추가 */
import lottie from 'lottie-web';
import congratulations from '@/assets/lottie/lottie_congratulations.json';
/* 23.03.31 수정 end: lottie 추가 */

import FlipClock from '@/components/dao/ui/home/flip-clock/FlipClock';
import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';
import { useNumberFormatter } from '@/utils/formatter/number';
import { message } from 'antd';
import useMediaQuery from '@/hook/useMediaQuery';

export type StationStatusProps = 'recruited' | 'recruiting' | 'completed' | 'failed' | undefined;

export type dataProps = {
  title: string;
  desc?: string;
  isTime?: boolean; // 시간 카운팅 여부
  date?: string; // 모집 기간
  notice?: string; // 모집 안내 텍스트
  reward?: tagPropsType; // 모집 상태;
  buttons: {
    // 버튼 상태
    btnName: string;
    disabled?: boolean;
  }[];
  result?: string; // 모집 결과 안내 텍스트
  guide?: string; // 현황 가이드
};

type StationParticipantProps = {
  amount?: number;
  occupy?: number;
};

type tagPropsType = {
  status?: string;
  firstData: number;
  secondData: number;
  notice?: string;
  people?: number;
  complete?: boolean;
  isTime?: boolean;
};

/* 23.03.31 수정: export 추가 */
export const RecruitmentConditionReward: React.FC<tagPropsType> = ({ status, firstData, secondData, people = 0, complete, notice, isTime }) => {
  const { t } = useTranslation(['common']);
  const { shorthanded } = useNumberFormatter();

  const [rate, setRate] = useState<number | null>(0);
  const [targetPosition, setTargetPosition] = useState(100); // 목표량 위치값
  const [targetAlign, setTargetAlign] = useState('center'); // 목표량 CSS 정렬 관련 클래스

  const targetRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstData && secondData) {
      const newRate = (firstData / secondData) * 100;
      setRate(newRate);
      if (firstData / secondData > 1) {
        if (firstData / secondData > 2) {
          setTargetPosition(50); // 목표 200 프로 달성 이후
        } else {
          setTargetPosition((100 / (100 * (firstData / secondData))) * 100); // 목표 100 프로 달성 이후, 200프로 전까진 역방향으로 이동
        }
      } else {
        setTargetPosition(100); // 모집 예정
      }
    }
  }, [firstData, secondData, rate]);

  useEffect(() => {
    const totalWidth = progressRef.current?.clientWidth || 400;
    const wordWidth = targetRef.current?.clientWidth || 70;
    const percent = ((totalWidth - wordWidth) / totalWidth) * 100;
    if (percent < targetPosition) {
      setTargetAlign('right');
    } else {
      setTargetAlign('center');
    }
  }, [targetRef.current, progressRef.current, targetPosition]);

  return (
    <div className={cn('progress-type reward-wrap')} style={{ '--goal': targetPosition + '%' } as React.CSSProperties} ref={progressRef}>
      {status === 'recruited' && notice && <p className={cn('notice')}>{notice}</p>}
      {isTime}
      {(status !== 'recruited' || (status === 'recruited' && isTime)) && (
        <p className={cn('guide')}>
          <span className={cn('percent')}>{Math.round((firstData / secondData) * 100)}%</span>
          <span className={cn('amount')}>
            {firstData?.toLocaleString('ko-KR')}
            <span className={cn('unit')}>WEMIX</span>
          </span>
        </p>
      )}

      <span className={cn('progress-line goal-line')}>
        <span className={cn('progress-rate')} style={{ width: firstData && secondData && firstData / secondData > 1 ? '100%' : `${rate}%` }} />
        <span
          className={cn('progress-goal')}
          style={{ '--goal': firstData && secondData && firstData / secondData < 1 ? '100%' : `${targetPosition}%` } as React.CSSProperties}
        >
          <span className={cn('img-goal')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_station_goal.svg" />
          </span>
          <span className={cn('target-goal', targetAlign)} ref={targetRef}>
            {secondData?.toLocaleString('ko-KR')} WEMIX
          </span>
        </span>
      </span>

      <p className={cn('chart-field-wrap')}>
        <span className={cn('counting')}>
          <span className={cn('number')}>{people ? people : firstData}</span>
          {/* 23.04.10 수정: 참여중, 참여 완료 레이블 참여 인원수 표기 통일 */}
          {t('rewardPeople')}
        </span>
      </p>
    </div>
  );
};

const DaoRecruitCondition = ({
  additional,
  refund,
  status,
  title,
  data,
  participant,
}: {
  additional?: boolean;
  refund?: boolean;
  status?: StationStatusProps;
  title?: string;
  data: dataProps;
  participant?: StationParticipantProps;
}) => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const isMobile = useMediaQuery('(max-width: 767px)');
  /**
   * 모집 예정 recruited
   * 모집 중 recruiting
   * 모집 완료 - Wonder 배분 계산 : completed
   * 모집실패 : failed
   */
  const [stationStatus, setStationStatus] = useState(status); // 모집 단계
  const [inputDate, setInputDate] = useState<any>(new Date());

  /* 23.03.31 수정 start: 모집 완료 시 lottie 추가 */
  const recruitmentCard = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: recruitmentCard.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: congratulations,
    });
    return () => lottieLoad.destroy();
  }, [status]);
  /* 23.03.31 수정 end: 모집 완료 시 lottie 추가 */

  useEffect(() => {
    let inputFlipDate: string = '';
    if (data && data?.date!) {
      const parsedDate = data?.date!.split(' ~ ');
      inputFlipDate = stationStatus === 'recruiting' ? parsedDate[1] : parsedDate[0];

      setInputDate(inputFlipDate);
    }
  }, [data, status]);

  return (
    <div className={cn('dao-recruit-condition-wrap', status, additional, { participant: title || participant, 'refund-completed': refund })}>
      <div className={cn('condition-title-wrap')}>
        <div className={cn('text-wrap')}>
          {!title && <strong className={cn('protocol-name')}>Station</strong>}
          {title && <strong className={cn('title')}>{title}</strong>}
          <p className={cn('protocol-desc')}>{t('station.recruitCondition.desc', { type: useDaoCharacterConvert(activeDao.value) })}</p>
          {!additional && <p className={cn('protocol-sub-desc')}>{t('station.recruitCondition.subDesc')}</p>}
          <div className={cn('img-wrap')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_station.svg" />
          </div>
        </div>

        {(title || participant) && (
          <div className={cn('participant-wrap', { additional: title, participant: participant })}>
            {participant && (
              <>
                <div className={cn('item')}>
                  <span className={cn('name')}>{t('station.recruitCondition.participant.amount')}</span>
                  <span className={cn('value')}>
                    {participant.amount?.toLocaleString('ko-KR')}
                    <span className={cn('unit')}>WEMIX</span>
                  </span>
                </div>
                <div className={cn('item')}>
                  <span className={cn('name')}>{t('station.recruitCondition.participant.occupy')}</span>
                  <span className={cn('value')}>
                    {participant.occupy?.toLocaleString('ko-KR')}
                    <span className={cn('unit')}>%</span>
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className={cn('condition-card-wrap')}>
        <div className={cn('top-wrap')}>
          <strong className={cn('condition-main-title')}>{data.title}</strong>
          {data.desc && <p className={cn('condition-sub-title')}>{data.desc}</p>}
          {data.date && <p className={cn('condition-date-wrap')}>{data.date}</p>}

          {data.isTime && (
            <div className={cn('recruitment-time')}>
              <FlipClock inputDate={inputDate} />
            </div>
          )}
          {data.result && <p className={cn('recruitment-result-content')}>{data.result}</p>}
        </div>

        <div className={cn('bottom-wrap')}>
          <div className={cn('recruitment-card-wrap', { notice: data.reward?.notice })}>
            {data.notice && <p className={cn('recruitment-sub-desc')}>{data.notice}</p>}
            {data.reward && (
              <RecruitmentConditionReward
                status={status}
                isTime={data.isTime}
                firstData={data.reward.firstData}
                secondData={data.reward.secondData}
                people={data.reward.people}
                notice={data.reward.notice}
                complete={data.reward.complete}
              />
            )}
          </div>
          <div className={cn('btn-wrap')}>
            {data.buttons.map((el, index) => {
              if (data.buttons.length - 1 === index) {
                return (
                  <BgButton
                    key={index}
                    buttonText={el.btnName}
                    color="white"
                    /* 23.04.19 수정: 버튼 사이즈 변경 */
                    size="lg"
                    disabled={el.disabled}
                    block
                    onClick={
                      // 참여한 멤버일 경우 (participant 값이 있을 경우)
                      () => {
                        if (status === 'failed' && participant) {
                          message.info({ content: t('station.recruitCondition.condition.refundCompleted'), key: 'toast' });
                        }
                      }
                    }
                  />
                );
              } else {
                /* 23.04.19 수정: 버튼 사이즈 변경 */
                return <OutlineButton key={index} buttonText={el.btnName} color="white" size="lg" block />;
              }
            })}
          </div>
          {/* 23.04.05 수정: 가이드 텍스트 해상도 별 노출 추가 */}
          <div className={cn('pc-guide')}>{data.guide && <p className={cn('guide-text')}>{data.guide}</p>}</div>
        </div>
        {/* 23.04.05 수정: 가이드 텍스트 해상도 별 노출 추가 */}
        <div className={cn('tm-guide')}>{data.guide && <p className={cn('guide-text')}>{data.guide}</p>}</div>
        {/* 23.03.31 수정: 모집 완료 시 lottie 추가 */}
        {status === 'completed' && <div className={cn('recruitment-lottie')} ref={recruitmentCard} />}
      </div>
    </div>
  );
};

export default DaoRecruitCondition;
