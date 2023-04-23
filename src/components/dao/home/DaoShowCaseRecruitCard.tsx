import cn from 'classnames';
import BgButton from '@/components/button/BgButton';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import lottie from 'lottie-web';
import congratulations from '@/assets/lottie/lottie_congratulations.json';
import FlipClock from './flip-clock/FlipClock';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { DaoStatus, NileDao, StationInfo } from '@/types/dao/dao.types';
import dayjs from 'dayjs';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { NileApiService } from '@/services/nile/api';
import RecruitStatusBar from '@components/dao/station/recruit/RecruitStatusBar';
import { RealTimeInfo } from '@/types/contract.types';
import { fromWei } from 'web3-utils';
import { TimeFormat, utcToLocal } from '@utils/formatter/time';

interface DaoShowCaseRecruitCardProps {
  dao: NileDao;
  station: StationInfo;
  stationRealTimeInfo: RealTimeInfo;
  refresh?: () => void;
}

interface DaoShowCaseRecruitCardProps {}

const DaoShowCaseRecruitCard = ({ dao, station, stationRealTimeInfo, refresh }: DaoShowCaseRecruitCardProps) => {
  const { t } = useTranslation(['common']);
  const api = NileApiService();

  const daoTheme = useAtomValue(daoThemeAtom).value;
  const recruitmentCard = useRef<HTMLDivElement>(null);

  const [pageViewInfo, setPageViewInfo] = useState<any>();

  useEffect(() => {
    api.dao.stat.fetchViewCount(`/dao/${daoTheme}`).then(({ data }) => {
      setPageViewInfo(data.data);
    });
  }, [daoTheme]);

  const noticeData = {
    dao: useDaoCharacterConvert(daoTheme),
    token: (daoTheme === 'oracle' ? 'PARTICLE' : daoTheme.toUpperCase()) + '(DAO Token)',
  };

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: recruitmentCard.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: congratulations,
    });
    return () => lottieLoad.destroy();
  }, []);

  const isDaoStatusClose = useMemo(() => {
    return dayjs().isAfter(dayjs.utc(dao?.endAt));
  }, [dao]);

  const isDaoSuccess = useMemo(() => {
    return Number(stationRealTimeInfo?.totalEnterAmount) >= Number(fromWei(dao?.purposeAmount ?? '', 'ether'));
  }, [stationRealTimeInfo, dao]);

  const title = useMemo(() => {
    if (daoTheme !== 'wonder') {
      console.log(daoTheme, 'daoTheme');
      if (daoTheme === 'oracle') {
        return (
          <>
            <strong className={cn('recruitment-main-title')}>{t('recruitmentCard.soonOracle')}</strong>
            {/* 23.04.19 수정: 클래스명 추가 */}
            <small className={cn(daoTheme, 'recruitment-sub-content')}>{t('recruitmentCard.soonOracleSub')}</small>
          </>
        );
      }
      return (
        <>
          <strong className={cn('recruitment-main-title')}>{t('recruitmentCard.soonArteumDelta')}</strong>
          <small className={cn(daoTheme, 'recruitment-sub-content')}>{t('recruitmentCard.soonArteumDeltaSub')}</small>
        </>
      );
    }
    if (!station || !dao) {
      return <strong className={cn('recruitment-main-title')}>{t('recruitmentCard.soon')}</strong>;
      // TODO: {{date}}에 시작될 예정입니다.
      // <strong className={cn('recruitment-main-title')}>{t('recruitmentCard.start', { date: desc })}</strong>
    }
    // 시작 예정
    if (dayjs().isBefore(dayjs.utc(dao?.startAt))) {
      return <strong className={cn('recruitment-sub-title')}>{t('recruitmentCard.time01', { time: t('recruitmentCard.time02') })}</strong>;
    }
    if (dayjs().isBefore(dayjs.utc(dao?.endAt))) {
      return <strong className={cn('recruitment-sub-title')}>{t('recruitmentCard.time01', { time: t('recruitmentCard.time03') })}</strong>;
    }
  }, [dao, station, t, daoTheme]);

  const desc = useMemo(() => {
    if (daoTheme === 'wonder' && (dao?.status === DaoStatus.READY || dao?.status === DaoStatus.OPEN)) {
      return (
        <>
          <p className={cn('recruitment-date')}>
            {utcToLocal(dao?.startAt, TimeFormat.STANDARD_WITHOUT_SECOND)} ~ {utcToLocal(dao?.endAt, TimeFormat.STANDARD_WITHOUT_SECOND)}
          </p>
          <div className={cn('recruitment-time')}>
            <FlipClock inputDate={dao?.status === DaoStatus.READY ? utcToLocal(dao?.startAt) : utcToLocal(dao?.endAt)} refresh={refresh} />
          </div>
        </>
      );
    }
    if (!dao || !station) {
      // return <p className={cn('recruitment-sub-content')}>{t('recruitmentCard.notice')}</p>;
    }
  }, [dao, station]);

  const recruitCloseTitle = useMemo(() => {
    if (isDaoStatusClose) {
      if (isDaoSuccess) {
        return (
          <strong className={cn('recruitment-complete-title')}>
            {t('recruitmentCard.completeDao', { n: Number(stationRealTimeInfo?.totalEnterAmount).toLocaleString() })}
          </strong>
        );
      }
      // TODO: 모집 목표액 달성에 실패하였습니다. 영문 수급 필요
      return <strong className={cn('recruitment-fail-title')}>{t('recruitmentCard.fail')}</strong>;
    }
  }, [dao, t]);

  const buttons = useMemo(() => {
    if (isDaoStatusClose && isDaoSuccess) {
      return (
        <>
          {/* 23.04.19 수정: 버튼 사이즈 변경 */}
          <BgButton buttonText={t('recruitmentCard.goToFi', { ns: 'common' })} color="white" size="lg" href="https://wemix.fi/" target="_blank" />
          <BgButton
            buttonText={`${daoTheme?.toUpperCase()} DAO 바로가기`}
            color="white"
            size="lg"
            href={`/dao/${daoTheme}/station`}
            disabled={daoTheme !== 'wonder'}
          />
        </>
      );
    }

    return (
      <BgButton
        buttonText={t('recruitmentCard.goToStation', { ns: 'common' })}
        color="white"
        /* 23.04.19 수정: 버튼 사이즈 변경 */
        size="lg"
        disabled={!dao || dao?.status === DaoStatus.READY || daoTheme !== 'wonder'}
        href={`/dao/${daoTheme}/station`}
      />
    );
  }, [dao]);

  return (
    <div className={cn('recruitment-card-wrap dao-showcase', daoTheme, isDaoStatusClose && !isDaoSuccess && 'fail')}>
      {/* TODO: css 'complete'*/}
      <div className={cn('left')}>
        {title}
        {recruitCloseTitle}
        {desc}
      </div>
      <div className={cn('right')}>
        {dao && dao?.status !== DaoStatus?.READY && <RecruitStatusBar dao={dao} stationRealTimeInfo={stationRealTimeInfo} />}
        {(!dao || dao?.status === DaoStatus?.READY) && (
          <p className={cn('recruitment-main-content', 'after-time')}>
            {Number(pageViewInfo?.count).toLocaleString('ko-KR')}
            {t('recruitmentCard.watch', { dao: noticeData.dao })}
          </p>
        )}
        {isDaoStatusClose && isDaoSuccess && <p className={cn('recruitment-complete-content')}> {t('recruitmentCard.join', { type: 'WONDER' })}</p>}
        {isDaoStatusClose && isDaoSuccess && (
          <p className={cn('recruitment-complete-notice')}>
            {t('recruitmentCard.dynamicNotice', {
              dao: noticeData.dao,
              token: noticeData.token,
            })}
          </p>
        )}
        {/* TODO: 영문 수급 필요 */}
        {isDaoStatusClose && !isDaoSuccess && <p className={cn('recruitment-fail-notice')}> {t('recruitmentCard.failDesc')}</p>}
        <div className={cn('btn-wrap')}>
          {/* TODO: reward || complete 'reward-progress'*/}
          {/* TODO: isTime 'after-time'*/}
          {buttons}
        </div>
        {isDaoStatusClose && dao?.status === DaoStatus.CONFIRM && <div className={cn('recruitment-lottie')} ref={recruitmentCard} />}
      </div>
    </div>
  );
};

export default DaoShowCaseRecruitCard;
