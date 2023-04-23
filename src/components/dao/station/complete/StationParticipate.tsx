import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';

import BgButton from '@/components/button/BgButton';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { useWonder } from '@/hook/useWonder';
import { useNileDao } from '@/hook/useNileDao';
import { UserInfoStatus } from '@/types/contract.types';
import { DaoStatus, StationHistory, StationUserHistory } from '@/types/dao/dao.types';
import { NileApiService } from '@/services/nile/api';
import ReceiveDTButton from '@components/dao/station/button/ReceiveDTButton';
import { fromWei } from 'web3-utils';
import { daoAbis } from '@/web3/abis/dao';
import { daoContractsAtom } from '@/state/web3Atom';

interface StationParticipateProps {
  historyList?: {
    step: number;
    status: string;
    date: string;
    participant: {
      amount: number;
      total: number;
    };
    acquireRefund: {
      acquire: number;
      total: number;
    };
  }[];
}

interface ReceiveInfo {
  refund?: number;
  receive?: number;
}

const StationParticipate = ({ historyList }: StationParticipateProps) => {
  const { t } = useTranslation('dao');
  const { wonderDao, wonderStationUserInfo, wonderStationRealTimeInfo } = useWonder();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);

  const activeDao = useAtomValue(daoThemeAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const daoContracts = useAtomValue(daoContractsAtom);
  const api = NileApiService();

  const { status } = useNileDao();
  const [userHistory, setUserHistory] = useState<StationUserHistory>();
  const [stationHistory, setStationHistory] = useState<StationHistory>();
  const [userReceiveInfo, setUserReceiveInfo] = useState<ReceiveInfo>();

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (listRef.current && !isOpen) {
        listRef.current.style.maxHeight = listRef.current.children[0]?.scrollHeight - 1 + 'px';
      }
    });
  }, [listRef]);

  useEffect(() => {
    if (listRef.current && isOpen) {
      listRef.current.style.maxHeight = listRef.current?.scrollHeight + 'px';
    }

    if (listRef.current && !isOpen) {
      listRef.current.style.maxHeight = listRef.current.children[0]?.scrollHeight - 1 + 'px';
    }
  }, [isOpen]);

  useEffect(() => {
    if (!wonderDao?.daoId) return;

    api.dao.station.history
      .getList(wonderDao?.daoId)
      .then(({ data }) => setStationHistory(data.data))
      .catch((err) => setStationHistory(undefined));

    if (nileWallet) {
      api.dao.station.history
        .getMyList(wonderDao?.daoId, nileWallet)
        .then(({ data }) => setUserHistory(data.data))
        .catch((err) => setUserHistory(undefined));
    }
  }, [wonderDao, nileWallet]);

  const titleWrapDesc = () => {
    if (!nileWallet) {
      return <span className={cn('title-desc')}>{t('station.complete.participate.beforeConnect.desc')}</span>;
    }
    if (wonderStationUserInfo?.status !== UserInfoStatus.ENTER) {
      /* 23.04.10 수정: 다국어 표현 수정 */
      return (
        <span className={cn('title-desc')}>
          {t('station.complete.participate.beforeParticipate.desc', { type: useDaoCharacterConvert(activeDao.value) })}
        </span>
      );
    }
  };

  const connectWallet = useCallback(() => {
    provider.connect().then(() => {
      provider.closeModal();
    });
  }, [nileWallet]);

  const titleButton = () => {
    if (!nileWallet) {
      return <BgButton buttonText={t('station.complete.participate.beforeConnect.button')} size="lg" color="highlight" onClick={connectWallet} />;
    }
    if (wonderStationUserInfo?.status !== UserInfoStatus.ENTER) {
      return (
        <BgButton
          buttonText={t('station.complete.participate.beforeParticipate.button')}
          size="lg"
          color="highlight"
          href="https://wemix.fi"
          target="_blank"
        />
      );
    }
  };

  const refreshReceiveInfo = async () => {
    if (!wonderDao?.daoId) return;

    const refundWemix = Number(wonderStationRealTimeInfo?.totalRemainAmount) * Number(wonderStationUserInfo?.stakeRatio);
    setUserReceiveInfo((prev) => ({ ...prev, refund: refundWemix }));

    const contract = new provider.web3.eth.Contract(daoAbis.DaoToken, wonderDao?.dtAddress);

    let dtSupply = '';
    await contract?.methods.totalSupply().call((err: any, res: string) => {
      dtSupply = res;
    });

    let trustDTAmount = '';
    await daoContracts.Station?.methods.getDAOContractInfo(wonderDao?.daoId).call((err: any, res: string) => {
      trustDTAmount = res;
    });

    const receiveDT = (Number(dtSupply) - Number(trustDTAmount)) * Number(wonderStationUserInfo?.stakeRatio);
    setUserReceiveInfo((prev) => ({ ...prev, receive: receiveDT }));
  };

  useEffect(() => {
    if (wonderStationUserInfo?.status === UserInfoStatus.ENTER) {
      refreshReceiveInfo();
    }
  }, [wonderStationUserInfo]);

  return (
    <div
      className={cn('station-participate-wrap', historyList && historyList.length > 1 && 'has-more-btn', {
        'before-acquire-refund': status === DaoStatus.CONFIRM && !wonderStationUserInfo?.isDTReceive,
      })}
    >
      <div className={cn('title-wrap')}>
        <div className={cn('left')}>
          <strong className={cn('station-section-title')}>{t('station.complete.participate.title')}</strong>
          {titleWrapDesc()}
        </div>
        {titleButton()}
      </div>
      {nileWallet && (
        <>
          <div className={cn('box-wrap')}>
            <div className={cn('box')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_station_box_1.svg" />
              <div className={cn('text-wrap')}>
                <span className={cn('info-name')}>{t('station.complete.participate.after.box-1')}</span>
                <div className={cn('figure-wrap')}>
                  <span className={cn('figure')}>{userHistory?.memberTotalParticipationWemix}</span>
                  <span className={cn('unit')}>WEMIX</span>
                </div>
              </div>
            </div>
            <div className={cn('box')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_station_box_2.svg" />
              <div className={cn('text-wrap')}>
                {/* 23.04.10 수정: 다국어 표현 수정 */}
                <span className={cn('info-name')}>
                  {t('station.complete.participate.after.box-2', { type: useDaoCharacterConvert(activeDao.value) })}
                </span>
                <div className={cn('figure-wrap')}>
                  <span className={cn('figure')}>{userHistory?.memberTotalReceived}</span>
                  <span className={cn('unit')}>
                    {t('unit1', {
                      ns: 'dao',
                      keyPrefix: `amountUnit.${activeDao.value}`,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ul className={cn('history-wrap', historyList && historyList.length > 1 && isOpen && 'open')} ref={listRef}>
            {userHistory?.stationInfo?.map((history) => (
              <li key={`list-${history.daoId}`}>
                <div className={cn('history-title-wrap')}>
                  <div className={cn('left')}>
                    <strong className={cn('history-title')}>
                      {history?.reOpenId && history?.reOpenId > 0 ? (
                        <>
                          {t('station.complete.participate.after.history.title.2')}
                          {t('station.complete.participate.after.history.title.key_two', { count: history?.reOpenId })}
                        </>
                      ) : (
                        t('station.complete.participate.after.history.title.1')
                      )}
                    </strong>
                    {/* TODO: 참여일자 */}
                    <span className={cn('date')}>{t('station.complete.participate.after.history.date')} : 2023-04-11</span>
                  </div>
                </div>
                <ul className={cn('list-type-dot')}>
                  <li>
                    <Trans
                      i18nKey="station.complete.participate.after.history.desc.1"
                      ns="dao"
                      values={{
                        percent:
                          Math.round(
                            (Number(fromWei(history?.memberInfo?.amount ?? '', 'ether')) / Number(fromWei(history?.purposeAmount ?? '', 'ether'))) *
                              100,
                          ) / 100,
                        figure1: fromWei(history?.memberInfo?.amount ?? '', 'ether'),
                        figure2: fromWei(history?.purposeAmount ?? '', 'ether'),
                      }}
                    >
                      <span className={cn('bold-text')}></span>
                      <span className={cn('bold-text')}></span>
                      <span className={cn('bold-text')}></span>
                    </Trans>
                  </li>
                  <li>
                    {wonderStationUserInfo?.isDTReceive ? (
                      <Trans
                        i18nKey="station.complete.participate.after.history.desc.2"
                        ns="dao"
                        values={{
                          figure1: history?.memberInfo?.receivedAmount,
                          figure2: history?.memberInfo?.refundedAmount,
                          type: useDaoCharacterConvert(activeDao.value),
                          unit1: t(`amountUnit.${activeDao.value}.unit1`),
                        }}
                      >
                        <span className={cn('bold-text')}></span>
                        <span className={cn('bold-text', 'number')}></span>
                        <span className={cn('bold-text', 'number')}></span>
                      </Trans>
                    ) : (
                      <Trans
                        i18nKey="station.complete.participate.after.history.desc.3"
                        ns="dao"
                        values={{
                          figure1: '1',
                          figure2: '2',
                          type: useDaoCharacterConvert(activeDao.value),
                          unit1: t(`amountUnit.${activeDao.value}.unit1`),
                        }}
                      >
                        <span className={cn('bold-colored-text')}></span>
                        <span className={cn('bold-colored-text', 'number')}></span>
                        <span className={cn('bold-colored-text', 'unit')}></span>
                        <span className={cn('bold-colored-text', 'number')}></span>
                        <span className={cn('bold-colored-text', 'unit')}></span>
                      </Trans>
                    )}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          {status === DaoStatus.CONFIRM && !wonderStationUserInfo?.isDTReceive && wonderStationUserInfo?.status === UserInfoStatus.ENTER && (
            <ReceiveDTButton />
          )}
        </>
      )}
      {historyList && historyList.length > 1 && (
        <button className={cn('show-more-btn', isOpen && 'open')} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? t('station.complete.participate.after.history.close') : t('station.complete.participate.after.history.open')}
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
      )}
    </div>
  );
};

export default StationParticipate;
