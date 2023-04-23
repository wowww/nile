import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { daoThemeAtom, refreshWonderDaoAtom } from '@/state/daoAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { DaoStatus } from '@/types/dao/dao.types';
import { useWonder } from '@/hook/useWonder';
import { useNumberFormatter } from '@utils/formatter/number';
import { UserInfoStatus } from '@/types/contract.types';
import DaoStationRecruitCard from '@components/dao/station/DaoStationRecruitCard';
import { nileWalletAtom } from '@/state/nileWalletAtom';

const DaoStationRecruit = ({ title }: { title?: string }) => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const refreshWonderDao = useSetAtom(refreshWonderDaoAtom);

  const { wonderDao, wonderStationRealTimeInfo, wonderStationUserInfo } = useWonder();
  const { shorthanded } = useNumberFormatter();

  useEffect(() => {
    if (nileWallet) {
      refreshWonderDao();
    }
  }, [nileWallet]);

  const participateRate = useMemo(() => {
    return ((Number(wonderStationUserInfo?.amount) * 100) / Number(wonderStationRealTimeInfo?.totalEnterAmount)).toFixed(2);
  }, [wonderStationUserInfo, wonderStationRealTimeInfo]);

  const statusClassName = useMemo(() => {
    switch (wonderDao?.status) {
      case DaoStatus.READY:
        return 'recruited';
      case DaoStatus.OPEN:
        return 'recruiting';
      case DaoStatus.CLOSE:
        if (Number(wonderStationRealTimeInfo?.totalEnterAmount) >= Number(wonderDao?.purposeAmount)) {
          return 'completed';
        }
        return 'failed';
      case DaoStatus.FAIL:
        return 'failed';
    }
  }, [wonderDao]);

  return (
    <div className={cn(`dao-recruit-condition-wrap ${statusClassName}`, { participant: wonderStationUserInfo?.status === '1' })}>
      <div className={cn('condition-title-wrap')}>
        <div className={cn('text-wrap')}>
          {title ? <strong className={cn('title')}>{title}</strong> : <strong className={cn('protocol-name')}>Station</strong>}
          <p className={cn('protocol-desc')}>{t('station.recruitCondition.desc', { type: useDaoCharacterConvert(activeDao.value) })}</p>
          <p className={cn('protocol-sub-desc')}>{t('station.recruitCondition.subDesc')}</p>
          <div className={cn('img-wrap')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_station.svg" />
          </div>
        </div>

        {wonderStationUserInfo?.status === UserInfoStatus.ENTER && nileWallet && (
          <div
            className={cn('participant-wrap', {
              additional: title,
              participant: wonderStationUserInfo?.status === UserInfoStatus.ENTER,
            })}
          >
            <div className={cn('item')}>
              <span className={cn('name')}>{t('station.recruitCondition.participant.amount')}</span>
              <span className={cn('value')}>
                {shorthanded(wonderStationUserInfo?.amount)}
                <span className={cn('unit')}>WEMIX</span>
              </span>
            </div>
            <div className={cn('item')}>
              <span className={cn('name')}>{t('station.recruitCondition.participant.occupy')}</span>
              <span className={cn('value')}>
                {participateRate}
                <span className={cn('unit')}>%</span>
              </span>
            </div>
          </div>
        )}
      </div>
      <DaoStationRecruitCard />
    </div>
  );
};

export default DaoStationRecruit;
