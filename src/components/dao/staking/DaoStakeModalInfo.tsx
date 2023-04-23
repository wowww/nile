import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { IconLogo } from '@components/logo/IconLogo';
import OutlineButton from '@components/button/OutlineButton';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNumberFormatter } from '@utils/formatter/number';
import { provider } from '@/state/nileWalletAtom';
import dayjs, { Dayjs } from 'dayjs';
import { wonderDaoStakingPoolUserInfoAtom, wonderObeliskBalanceAtom } from '@/state/obeliskAtom';
import { useWonder } from '@/hook/useWonder';
import { TimeFormat, utcToLocal } from '@utils/formatter/time';
import axios from 'axios';

const DaoStakeModalInfo = () => {
  const { t } = useTranslation('dao');

  const { toFix } = useNumberFormatter();
  const { wonderDao } = useWonder();

  const activeDao = useAtomValue(daoThemeAtom);
  const userInfos = useAtomValue(wonderDaoStakingPoolUserInfoAtom);
  const balance = useAtomValue(wonderObeliskBalanceAtom);

  const [lastStakeTimestamp, setLastStakeTimestamp] = useState<Dayjs>();
  const [tokenWonder, setTokenWonder] = useState<any>();
  const [tokenGWonder, setTokenGWonder] = useState<any>();

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

  useEffect(() => {
    axios.get(`/api/tokenInfoList`).then(({ data }) => {
      data.forEach((token: any) => {
        if (token.token_address === wonderDao?.dtAddress) {
          setTokenWonder(token);
        }
        if (token.token_address === wonderDao?.gtAddress) {
          setTokenGWonder(token);
        }
      });
    });
  }, []);

  const getDtDoller = useCallback(
    // Calc WONDER doller value
    (value: number) => {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value * tokenWonder?.price);
    },
    [tokenWonder],
  );
  const getGtDoller = useCallback(
    // Calc gWONDER doller value
    (value: number) => {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value * tokenGWonder?.price);
    },
    [tokenGWonder],
  );

  return (
    <div className={cn('stake-modal-top-wrap')}>
      <dl>
        <div>
          <dt>
            <span className={cn('logo')}>
              <ReactSVG src={'https://nile.blob.core.windows.net/images/assets/images/icon/ico_dao_color_arrow.svg'} />
            </span>
            <span>Staked {useDaoCharacterConvert(activeDao.value)}</span>
          </dt>
          <dd className={cn('stake-price-wrap')}>
            <strong className={cn('price')}>{balance?.stakedWonder ? toFix(Number(balance?.stakedWonder) ?? 0) : '-'}</strong>
            <span className={cn('unit')}>{t(`amountUnit.${activeDao.value}.unit1`)}</span>
            <span className={cn('dollar')}>($0.00)</span>
          </dd>
        </div>
        {balance?.stakedWonder && Number(balance?.stakedWonder) > 0 && (
          <div className={cn('no-line')}>
            <dt>
              <span className={cn('logo')}></span>
              <span>{t('stakingPool.modal.box.11')}</span>
            </dt>
            <dd className={cn('stake-price-wrap')}>
              <strong>{utcToLocal(unstakeableDate, TimeFormat.STANDARD)}</strong>
            </dd>
          </div>
        )}
        <div>
          <dt>
            <span className={cn('logo')}>
              <IconLogo type={activeDao.value} size={16} fullType={true} />
              <IconLogo type={`g.${activeDao.value}`} size={16} fullType={true} />
            </span>
            <span>{t('stakingPool.modal.box.1')}</span>
            <div className={cn('buy-fi-wrap')}>
              <OutlineButton
                size="xs"
                buttonText={t('stakingPool.modal.btn.wemixfi', { token: useDaoCharacterConvert(activeDao.value) })}
                iconType={true}
                color="gray"
                iconValue="wemixfi"
                align={false}
                // TODO: wonder구매 페이지로 연결
                href={'https://wemix.fi/'}
                target={'_blank'}
              />
            </div>
          </dt>
          <dd className={cn('stake-price-wrap')}>
            <strong className={cn('price')}>{balance?.gWonder ? toFix(Number(balance?.wonder) ?? 0) : '-'}</strong>
            <span className={cn('unit')}>{t(`amountUnit.${activeDao.value}.unit1`)}</span>
            <span className={cn('dollar')}>($15,000,000.00)</span>
          </dd>
          <dd className={cn('stake-price-wrap')}>
            <strong className={cn('price')}>{balance?.gWonder ? toFix(Number(balance?.gWonder) ?? 0) : '-'}</strong>
            <span className={cn('unit')}>{t(`amountUnit.${activeDao.value}.unit2`)}</span>
            <span className={cn('dollar')}>($15,000,000.00)</span>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default DaoStakeModalInfo;
