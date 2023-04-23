import cn from 'classnames';
import BgButton from '@/components/button/BgButton';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import lottie from 'lottie-web';
import congratulations from '@/assets/lottie/lottie_congratulations.json';
import FlipClock from './flip-clock/FlipClock';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
/* 23.03.31 수정: Recruitment 삭제, RecruitmentConditionReward 추가 */
import { RecruitmentConditionReward } from '@/components/dao/ui/station/DaoRecruitCondition';
/* 23.03.31 수정: useDaoCharacterConvert 추가 */
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

interface buttonTypes {
  btnName: string;
  disabled?: boolean;
  href?: string;
  target?: string;
}

interface rewardData {
  /* 23.03.31 수정: firstData, secondData 타입 변경 */
  firstData: number;
  secondData: number;
  people?: number;
  percent?: number;
}

interface Props {
  mainTitle?: string;
  desc?: string;
  subTitle?: '시작' | '종료';
  completeTitle?: string;
  /* 23.03.31 수정: fail 추가 */
  fail?: boolean;
  date?: string;
  isTime?: boolean;
  reward?: rewardData;
  subContent?: boolean;
  mainContent?: string;
  theme?: 'wonder' | 'arteum' | 'delta' | 'oracle';
  className?: string;
  buttons: buttonTypes[];
}

const RecruitmentCard = ({
  mainTitle,
  desc,
  subTitle,
  completeTitle,
  date,
  isTime,
  reward,
  subContent,
  mainContent,
  theme = 'wonder',
  buttons,
  className,
  /* 23.03.31 수정: fail 추가 */
  fail,
}: Props) => {
  const [complete, setComplete] = useState<boolean>();

  const activeDao = useAtomValue(daoThemeAtom).value;

  const noticeData = {
    /* 23.03.31 수정: useDaoCharacterConvert 추가 */
    dao: useDaoCharacterConvert(activeDao),
    token: (activeDao === 'oracle' ? 'PARTICLE' : activeDao.toUpperCase()) + '(DAO Token)',
  };

  useEffect(() => {
    completeTitle ? setComplete(true) : setComplete(false);

    const lottieLoad = lottie.loadAnimation({
      container: recruitmentCard.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: congratulations,
    });
    return () => lottieLoad.destroy();
  }, [completeTitle, complete]);

  const recruitmentCard = useRef<HTMLDivElement>(null);

  let inputDate: string = '';
  if (subTitle) {
    const parsedDate = date!.split(' ~ ');
    inputDate = subTitle === '시작' ? parsedDate[0] : parsedDate[1];
  }

  const { t } = useTranslation(['common']);
  return (
    /* 23.03.31 수정: fail 추가 */
    <div className={cn('recruitment-card-wrap', className, theme, complete && 'complete', fail && 'fail')}>
      <div className={cn('left')}>
        {/* 23.03.31 수정 start: mainTitle, desc, subTitle, fail 조건문 변경 */}
        {mainTitle && <strong className={cn('recruitment-main-title')}>{mainTitle}</strong>}
        {desc && <strong className={cn('recruitment-main-title')}>{t('recruitmentCard.start', { date: desc })}</strong>}
        {subTitle && (
          <strong className={cn('recruitment-sub-title')}>
            {t('recruitmentCard.time01', { time: subTitle === '시작' ? t('recruitmentCard.time02') : t('recruitmentCard.time03') })}
          </strong>
        )}
        {fail && <strong className={cn('recruitment-fail-title')}>{t('recruitmentCard.fail')}</strong>}
        {/* 23.03.31 수정 end: mainTitle, desc, subTitle, fail 조건문 변경 */}
        {completeTitle && <strong className={cn('recruitment-complete-title')}>{t('recruitmentCard.completeDao', { n: completeTitle })}</strong>}
        {date && <p className={cn('recruitment-date')}>{date}</p>}
        {isTime && (
          <div className={cn('recruitment-time')}>
            <FlipClock inputDate={inputDate} />
          </div>
        )}
        {/* 23.04.11 수정: 주석 해제 */}
        {subContent && <p className={cn('recruitment-sub-content')}>{t('recruitmentCard.notice')}</p>}
      </div>
      <div className={cn('right')}>
        {/* 23.03.31 수정: reward 조건식 수정 */}
        {reward && (
          /* 23.03.31 수정: 컴포넌트 교체(RecruitmentReward -> RecruitmentConditionReward) */
          <RecruitmentConditionReward firstData={reward.firstData} secondData={reward.secondData} people={reward?.people} complete={complete} />
        )}
        {mainContent && (
          <p className={cn('recruitment-main-content', isTime && 'after-time')}>
            {/* 23.03.31 수정: 텍스트 변경(표기 방법 추가, 바인딩 값 변경) */}
            {Number(mainContent).toLocaleString('ko-KR')}
            {t('recruitmentCard.watch', { dao: noticeData.dao })}
          </p>
        )}
        {complete && <p className={cn('recruitment-complete-content')}> {t('recruitmentCard.join', { type: noticeData.dao })}</p>}
        {complete && (
          <p className={cn('recruitment-complete-notice')}>
            {t('recruitmentCard.dynamicNotice', {
              dao: noticeData.dao,
              token: noticeData.token,
            })}
          </p>
        )}
        {/* 23.03.31 수정: fail 추가 */}
        {fail && <p className={cn('recruitment-fail-notice')}> {t('recruitmentCard.failDesc')}</p>}
        <div className={cn('btn-wrap', isTime && 'after-time', (reward || complete) && 'reward-progress')}>
          {buttons.map((item, index) => (
            /* 23.04.19 수정: 버튼 사이즈 변경 */
            <BgButton buttonText={item.btnName} color="white" size="lg" key={index} disabled={item.disabled} href={item.href} target="_blank" />
          ))}
        </div>
        {complete && <div className={cn('recruitment-lottie')} ref={recruitmentCard} />}
      </div>
    </div>
  );
};

export default RecruitmentCard;
