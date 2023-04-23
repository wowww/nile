import cn from 'classnames';
import BgButton from '@/components/button/BgButton';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import lottie from 'lottie-web';
import congratulations from '@/assets/lottie/lottie_congratulations.json';

import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import FlipClock from '../dao/home/flip-clock/FlipClock';
import { NileApiService } from '@/services/nile/api';
import dayjs from 'dayjs';
import { useWonder } from '@/hook/useWonder';
import { DaoStatus } from '@/types/dao/dao.types';
import { TimeFormat, utcToLocal } from '@utils/formatter/time';
import RecruitStatusBar from '@components/dao/station/recruit/RecruitStatusBar';
import { fromWei } from 'web3-utils';

interface rewardData {
  /* 23.03.31 수정: firstData, secondData 타입 변경 */
  firstData: number;
  secondData: number;
  people?: number;
  percent?: number;
}

interface Props {
  theme?: 'wonder' | 'arteum' | 'delta' | 'oracle';
}

const RecruitmentCard = ({ theme = 'wonder' }: Props) => {
  const { t } = useTranslation(['common']);
  const activeDao = useAtomValue(daoThemeAtom).value;
  const api = NileApiService();

  const noticeData = {
    dao: useDaoCharacterConvert(activeDao),
    token: (activeDao === 'oracle' ? 'PARTICLE' : activeDao.toUpperCase()) + '(DAO Token)',
  };
  const [pageViewInfo, setPageViewInfo] = useState<any>(0);
  const { wonderDao, wonderStations, wonderStationRealTimeInfo, refreshWonderDao, refreshWonderStations, refreshWonderStationRealTimeInfo } =
    useWonder();
  const dao = wonderDao;
  const station = wonderStations?.at(0);
  const stationRealTimeInfo = wonderStationRealTimeInfo;
  const refresh = refreshWonderDao;
  const recruitmentCard = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wonderDao) {
      refreshWonderDao();
    }
  }, []);
  useEffect(() => {
    if (wonderDao?.daoId) {
      if (!wonderStations) {
        refreshWonderStations();
      }
      if (!wonderStationRealTimeInfo) {
        refreshWonderStationRealTimeInfo();
      }
    }
  }, [wonderDao]);

  useEffect(() => {
    api.dao.stat.fetchViewCount(`/dao/${theme}`).then(({ data }) => {
      setPageViewInfo(data.data.count);
    });
  }, [theme]);

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

  const confirm = isDaoStatusClose && isDaoSuccess;
  const fail = isDaoStatusClose && !isDaoSuccess;

  const mainTitle = useMemo(() => {
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
  }, [dao, station, t]);

  const desc = useMemo(() => {
    if (dao?.status === DaoStatus.READY || dao?.status === DaoStatus.OPEN) {
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
      return <p className={cn('recruitment-sub-content')}>{t('recruitmentCard.notice')}</p>;
    }
  }, [dao, station]);

  const recruitCloseTitle = useMemo(() => {
    if (fail) {
      return <strong className={cn('recruitment-fail-title')}>{t('recruitmentCard.fail')}</strong>;
    }
    if (confirm) {
      return (
        <strong className={cn('recruitment-complete-title')}>
          {t('recruitmentCard.completeDao', { n: Number(stationRealTimeInfo?.totalEnterAmount).toLocaleString() })}
        </strong>
      );
    }
  }, [dao, t, fail, confirm]);

  const buttons = useMemo(() => {
    if (confirm) {
      return (
        <>
          {/* 23.04.19 수정: 버튼 사이즈 변경 */}
          <BgButton buttonText={t('recruitmentCard.goToFi', { ns: 'common' })} color="white" size="lg" />
          <BgButton buttonText={`${theme?.toUpperCase()} DAO 바로가기`} color="white" size="lg" />
        </>
      );
    }

    return (
      <BgButton
        buttonText={t('recruitmentCard.goToStation', { ns: 'common' })}
        color="white"
        /* 23.04.19 수정: 버튼 사이즈 변경 */
        size="lg"
        disabled={!dao || dao?.status === DaoStatus.READY}
        href={`/dao/${theme}/station`}
      />
    );
  }, [dao]);
  return (
    <div className={cn('recruitment-card-wrap nile-home', theme, confirm && 'complete', fail && 'fail')}>
      <div className={cn('left')}>
        {mainTitle}
        {recruitCloseTitle}
        {desc}
        {/*/!* 23.03.31 수정 start: mainTitle, desc, subTitle, fail 조건문 변경 *!/*/}
        {/*{mainTitle && <strong className={cn('recruitment-main-title')}>{t('recruitmentCard.soon')}</strong>}*/}
        {/*{desc && <strong className={cn('recruitment-main-title')}>{t('recruitmentCard.start', { date: desc })}</strong>}*/}
        {/*{subTitle && (*/}
        {/*  <strong className={cn('recruitment-sub-title')}>*/}
        {/*    {t('recruitmentCard.time01', { time: subTitle === '시작' ? t('recruitmentCard.time02') : t('recruitmentCard.time03') })}*/}
        {/*  </strong>*/}
        {/*)}*/}
        {/*{fail && <strong className={cn('recruitment-fail-title')}>{t('recruitmentCard.fail')}</strong>}*/}
        {/*/!* 23.03.31 수정 end: mainTitle, desc, subTitle, fail 조건문 변경 *!/*/}
        {/*{completeTitle && <strong className={cn('recruitment-complete-title')}>{t('recruitmentCard.completeDao', { n: completeTitle })}</strong>}*/}
        {/*{date && <p className={cn('recruitment-date')}>{date}</p>}*/}
        {/*{isTime && (*/}
        {/*  <div className={cn('recruitment-time')}>*/}
        {/*    <FlipClock inputDate={inputDate} />*/}
        {/*  </div>*/}
        {/*)}*/}
        {/*{subContent && <p className={cn('recruitment-sub-content')}>{t('recruitmentCard.notice')}</p>}*/}
      </div>
      <div className={cn('right')}>
        {dao && dao?.status !== DaoStatus?.READY && !confirm && !fail && <RecruitStatusBar dao={dao} stationRealTimeInfo={stationRealTimeInfo} />}
        {(!dao || dao?.status === DaoStatus?.READY) && (
          <p className={cn('recruitment-main-content', 'after-time')}>
            {Number(pageViewInfo).toLocaleString('ko-KR')}
            {t('recruitmentCard.watch', { dao: noticeData.dao })}
          </p>
        )}
        {confirm && <p className={cn('recruitment-complete-content')}> {t('recruitmentCard.join', { type: noticeData.dao })}</p>}
        {confirm && (
          <p className={cn('recruitment-complete-notice')}>
            {t('recruitmentCard.dynamicNotice', {
              dao: noticeData.dao,
              token: noticeData.token,
            })}
          </p>
        )}
        {fail && <p className={cn('recruitment-fail-notice')}> {t('recruitmentCard.failDesc')}</p>}
        {/*{fail && (*/}
        {/*  <p className={cn('recruitment-complete-notice')}>*/}
        {/*    {t('recruitmentCard.dynamicNotice', {*/}
        {/*      dao: noticeData.dao,*/}
        {/*      token: noticeData.token,*/}
        {/*    })}*/}
        {/*  </p>*/}
        {/*)}*/}
        <div className={cn('btn-wrap')}>
          {/* TODO: reward || complete 'reward-progress'*/}
          {/* TODO: isTime 'after-time'*/}
          {buttons}
        </div>
        {confirm && <div className={cn('recruitment-lottie')} ref={recruitmentCard} />}
      </div>
    </div>
  );
};

export default RecruitmentCard;
