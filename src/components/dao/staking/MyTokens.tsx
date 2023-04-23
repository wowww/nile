import cn from 'classnames';
import { Popover } from 'antd';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import BgButton from '@components/button/BgButton';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DaoStakeModal from '@components/modal/DaoStakeModal';
import { daoThemeAtom } from '@/state/daoAtom';
import { ReactSVG } from 'react-svg';
import { useLayoutResize } from '@utils/layout';
import { wonderDaoStakingPoolUserInfoAtom, wonderObeliskBalanceAtom } from '@/state/obeliskAtom';
import { useNumberFormatter } from '@utils/formatter/number';
import dayjs, { Dayjs } from 'dayjs';
import { useWonder } from '@/hook/useWonder';
import { TimeFormat, utcToLocal } from '@utils/formatter/time';

const MyTokens = () => {
  const { t } = useTranslation('dao');
  const { wonderDao } = useWonder();

  const nileWallet = useAtomValue(nileWalletAtom);
  const activeDao = useAtomValue(daoThemeAtom);
  const balance = useAtomValue(wonderObeliskBalanceAtom);
  const userInfos = useAtomValue(wonderDaoStakingPoolUserInfoAtom);

  const { isMobile } = useLayoutResize();
  const { toFix } = useNumberFormatter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lastStakeTimestamp, setLastStakeTimestamp] = useState<Dayjs>();

  const stakable = useMemo(() => {
    return Number(balance?.stakedWonder) !== 0 || Number(balance?.wonder) !== 0 || Number(balance?.gWonder) !== 0;
  }, [balance]);

  const connect = useCallback(() => {
    provider.connect().then(() => {
      provider.closeModal();
    });
  }, []);

  useEffect(() => {
    if (!userInfos?.lastStakeBlock) return;

    provider.web3.eth.getBlock(userInfos?.lastStakeBlock).then((res: any) => {
      setLastStakeTimestamp(dayjs.unix(Number(res.timestamp)));
    });
  }, [userInfos]);

  const unstakeableDate = useMemo(() => {
    if (!lastStakeTimestamp || !wonderDao?.dtLockupTime) return;
    return dayjs(lastStakeTimestamp).add(Number(wonderDao?.dtLockupTime), 'seconds');
  }, [wonderDao, lastStakeTimestamp]);

  return (
    <>
      <div className={cn('card-title', 'flex-box')}>
        <h4>{t('stakingPool.tokens.title')}</h4>
        <p className={cn('card-tooltip')}>
          {t('stakingPool.tokens.tooltip.title')}
          <Popover
            overlayClassName='tooltip'
            placement='top'
            content={
              <div className={cn('tooltip-contents')}>
                {t('stakingPool.tokens.tooltip.desc1')}
                <p className={cn('sub-desc')}>{t('stakingPool.tokens.tooltip.desc2')}</p>
              </div>
            }
            trigger='hover'
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <button type='button'>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg' />
            </button>
          </Popover>
        </p>
      </div>
      {nileWallet ? (
        <>
          <ul className={cn('card-item-list', 'primary')}>
            <li className={cn('card-item')}>
              <div
                className={cn('card-notice')}>{t('stakingPool.tokens.item.2', { token: useDaoCharacterConvert(activeDao.value) })}</div>
              <strong className={cn('card-unit')}>
                {balance?.stakedWonder ? toFix(Number(balance?.stakedWonder)) : '-'}&nbsp;
                <span className={cn('unit')}>
                  {t('unit1', {
                    ns: 'dao',
                    keyPrefix: `amountUnit.${activeDao.value}`,
                  })}
                </span>
                {unstakeableDate && <span
                  className={cn('unstake-date')}>{t('stakingPool.modal.box.6')} : {utcToLocal(unstakeableDate, TimeFormat.STANDARD)}</span>}
              </strong>
            </li>
          </ul>

          <ul className={cn('card-item-list')}>
            <li className={cn('card-item')}>
              <div className={cn('card-notice')}>{useDaoCharacterConvert(activeDao.value)}</div>
              <strong className={cn('card-unit')}>
                {balance?.wonder ? toFix(Number(balance?.wonder) ?? 0) : '-'}&nbsp;
                <span className={cn('unit')}>
                  {t('unit1', {
                    ns: 'dao',
                    keyPrefix: `amountUnit.${activeDao.value}`,
                  })}
                </span>
              </strong>
            </li>
            <li className={cn('card-item')}>
              <div className={cn('card-notice')}>g.{useDaoCharacterConvert(activeDao.value)}</div>
              <strong className={cn('card-unit')}>
                {balance?.gWonder ? toFix(Number(balance?.gWonder)) : '-'}&nbsp;
                <span className={cn('unit')}>
                  g.
                  {t('unit1', {
                    ns: 'dao',
                    keyPrefix: `amountUnit.${activeDao.value}`,
                  })}
                </span>
              </strong>
            </li>
          </ul>

          <div className={cn('btn-wrap')}>
            <BgButton
              buttonText={Number(balance?.stakedWonder) === 0 ? t('stakingPool.modal.stake') : t('stakingPool.modal.managingStake')}
              color='highlight'
              size={isMobile ? 'lg' : 'md'}
              onClick={() => setIsOpen(true)}
              disabled={!stakable}
            />
          </div>
        </>
      ) : (
        <>
          <div className={cn('wallet-none-area')}>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_wallet.svg' />
            <p className={cn('card-guide-info')}>{t('stakingPool.tokens.desc')}</p>
          </div>
          <div className={cn('btn-wrap')}>
            <BgButton buttonText={t('stakingPool.tokens.btn3')} block color='highlight' size={isMobile ? 'lg' : 'md'}
                      onClick={connect} />
          </div>
        </>
      )}
      <DaoStakeModal isOpen={isOpen} setIsOpen={setIsOpen}
                     desc={t('station.participationProcess.bannerText', { ns: 'dao' })} />
    </>
  );
};

export default MyTokens;
