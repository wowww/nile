import cn from 'classnames';
import { TimeFormat, utcToLocal } from '@utils/formatter/time';
import { DaoStatus } from '@/types/dao/dao.types';
import FlipClock from '@components/dao/home/flip-clock/FlipClock';
import RecruitStatusBar from '@components/dao/station/recruit/RecruitStatusBar';
import React, { useEffect, useMemo } from 'react';
import BgButton from '@components/button/BgButton';
import RefundRecruitingButton from '@components/dao/station/button/RefundRecruitingButton';
import { UserInfoStatus } from '@/types/contract.types';
import CancelRecruitingButton from '@components/dao/station/button/CancelRecruitingButton';
import RecruitingButton from '@components/dao/station/button/RecruitingButton';
import { useWonder } from '@/hook/useWonder';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { useLayoutResize } from '@utils/layout';
import { fromWei } from 'web3-utils';
import dayjs from 'dayjs';

const DaoStationRecruitCard = () => {
  const { t } = useTranslation('dao');

  const nileWallet = useAtomValue(nileWalletAtom);
  const { isMobile } = useLayoutResize();

  const {
    wonderDao,
    wonderStations,
    wonderStationRealTimeInfo,
    wonderStationUserInfo,
    refreshWonderStations,
    refreshWonderDao,
    refreshWonderStationRealTimeInfo,
    refreshWonderStationsUserInfo,
  } = useWonder();

  const lastStation = useMemo(() => {
    return wonderStations?.at(0);
  }, [wonderStations]);

  useEffect(() => {
    if (wonderDao?.daoId) {
      refreshWonderStationRealTimeInfo();

      if (nileWallet) {
        refreshWonderStationsUserInfo();
      }
    }
  }, [wonderDao, nileWallet]);

  const refresh = async () => {
    refreshWonderStations();
    refreshWonderDao();
  };

  const guide = useMemo(() => {
    switch (wonderDao?.status) {
      case DaoStatus.READY:
        if (wonderStationUserInfo?.status === UserInfoStatus?.ENTER) {
          return t('station.recruitCondition.condition.status.recruitingParticipated.guide', { type: 'WONDER' });
        }
        return;
      case DaoStatus.CONFIRM:
        return t('station.recruitCondition.condition.status.completed.guide', { type: 'WONDER' });
      case DaoStatus.CLOSE:
        if (Number(wonderStationRealTimeInfo?.totalEnterAmount) >= Number(fromWei(wonderDao?.purposeAmount ?? '', 'ether'))) {
          return t('station.recruitCondition.condition.status.completed.guide', { type: 'WONDER' });
        }
        // TODO: 영문 수급 필요
        return t('station.recruitCondition.condition.status.failed.guide5');
      case DaoStatus.FAIL:
        if (lastStation?.reOpenId) {
          return (
            <>
              {t('station.recruitCondition.condition.status.failed.guide2')}
              {wonderStationUserInfo?.status === UserInfoStatus?.ENTER && (
                <>
                  <br />
                  {t('station.recruitCondition.condition.status.failed.guideRefund')}
                </>
              )}
            </>
          );
        }
        return (
          <>
            {wonderStationUserInfo?.status === UserInfoStatus?.ENTER && (
              <>
                <br />
                {t('station.recruitCondition.condition.status.failed.guideRefund')}
              </>
            )}
          </>
        );
    }
  }, [wonderDao, lastStation, wonderStationRealTimeInfo, t, wonderStationUserInfo]);

  const recruitTitle = useMemo(() => {
    if (!wonderStations) {
      return t('station.recruitCondition.condition.status.recruited.title');
    }
    switch (wonderDao?.status) {
      case DaoStatus.READY:
        if (dayjs().isAfter(dayjs.utc(wonderDao?.startAt))) {
          if (wonderStationUserInfo?.status === UserInfoStatus.ENTER) {
            return t('station.recruitCondition.condition.status.recruitingParticipated.title');
          }
          return t('station.recruitCondition.condition.status.recruitingParticipated.title');
        }
        return t('station.recruitCondition.condition.status.recruitedConfirmed.title');
      case DaoStatus.OPEN:
        if (wonderStationUserInfo?.status === UserInfoStatus.ENTER) {
          return t('station.recruitCondition.condition.status.recruitingParticipated.title');
        }
        return t('station.recruitCondition.condition.status.recruitingParticipated.title');
      case DaoStatus.CLOSE:
        if (Number(wonderStationRealTimeInfo?.totalEnterAmount) >= Number(fromWei(wonderDao?.purposeAmount ?? '', 'ether'))) {
          return t('station.recruitCondition.condition.status.completed.title');
        }
        return t('station.recruitCondition.condition.status.failed.title');
      case DaoStatus.FAIL:
        return t('station.recruitCondition.condition.status.failed.title');
    }
  }, [wonderStations, wonderStationRealTimeInfo, wonderDao, t, wonderStationUserInfo]);

  const button = useMemo(() => {
    if (wonderDao?.status === DaoStatus.CLOSE || wonderDao?.status === DaoStatus.FAIL) {
      if (Number(wonderStationRealTimeInfo?.totalEnterAmount) >= Number(fromWei(wonderDao?.purposeAmount ?? '', 'ether'))) {
        return (
          /* 23.04.19 수정: 버튼 사이즈 변경 */
          <BgButton buttonText={t('station.recruitCondition.condition.btnCalculator', { type: 'WONDER' })} color="white" size="lg" disabled block />
        );
      }
      return <RefundRecruitingButton disabled={wonderDao?.status === DaoStatus.CLOSE || wonderStationUserInfo?.status !== UserInfoStatus.ENTER} />;
    }
    return (
      <>
        {wonderStationUserInfo?.status === UserInfoStatus.ENTER && nileWallet && <CancelRecruitingButton />}
        <RecruitingButton disabled={dayjs().isBefore(dayjs.utc(wonderDao?.startAt))} />
      </>
    );
  }, [wonderStationUserInfo, wonderDao, t, nileWallet, wonderStationRealTimeInfo]);

  return (
    <div className={cn('condition-card-wrap')}>
      <div className={cn('top-wrap')}>
        <strong className={cn('condition-main-title')}>{recruitTitle}</strong>
        {!lastStation && <p className={cn('condition-sub-title')}>{t('station.recruitCondition.condition.status.recruited.desc')}</p>}
        {lastStation && (
          <p className={cn('condition-date-wrap')}>
            {utcToLocal(wonderDao?.startAt, TimeFormat.STANDARD_WITHOUT_SECOND)} ~ {utcToLocal(wonderDao?.endAt, TimeFormat.STANDARD_WITHOUT_SECOND)}
          </p>
        )}

        {(wonderDao?.status === DaoStatus.READY || wonderDao?.status === DaoStatus.OPEN) && (
          <div className={cn('recruitment-time')}>
            <FlipClock
              inputDate={dayjs().isBefore(dayjs.utc(wonderDao?.startAt)) ? utcToLocal(wonderDao?.startAt) : utcToLocal(wonderDao?.endAt)}
              refresh={refresh}
            />
          </div>
        )}
        {lastStation && wonderDao?.status === DaoStatus.CLOSE && (
          <p className={cn('recruitment-result-content')}>
            {Number(wonderStationRealTimeInfo?.totalEnterAmount) >= Number(fromWei(wonderDao?.purposeAmount ?? '', 'ether'))
              ? t('station.recruitCondition.condition.status.completed.result', {
                  number: Number(wonderStationRealTimeInfo?.totalEnterAmount ?? 0).toLocaleString(),
                })
              : // TODO: 모집 목표액 달성에 실패하였습니다. 영문 수급 필요
                t('station.recruitCondition.condition.status.failed.result')}
          </p>
        )}
        {wonderDao?.status === DaoStatus.FAIL && (
          <p className={cn('recruitment-result-content')}>{t('station.recruitCondition.condition.status.failed.result')}</p>
        )}
      </div>

      <div className={cn('bottom-wrap')}>
        <div className={cn('recruitment-card-wrap', { notice: !wonderStations })}>
          <RecruitStatusBar dao={wonderDao} stationRealTimeInfo={wonderStationRealTimeInfo} />
        </div>
        <div className={cn('btn-wrap')}>{button}</div>
        {/* 23.04.13 수정: 태그 유지로 인한 깨짐현상 수정 (조건문 안 -> 밖) */}
        {guide && (
          <div className={cn('pc-guide')}>
            <p className={cn('guide-text')}>{guide}</p>
          </div>
        )}
      </div>
      {guide && (
        <div className={cn('tm-guide')}>
          <p className={cn('guide-text')}>{guide}</p>
        </div>
      )}
    </div>
  );
};

export default DaoStationRecruitCard;
