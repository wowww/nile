import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import React, { useMemo } from 'react';
import { useWonder } from '@/hook/useWonder';
import cn from 'classnames';
import DaoInput from '@components/dao/common/input/DaoInput';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import dayjs from 'dayjs';
import { TimeFormat, utcToLocal } from '@utils/formatter/time';
import { wonderDaoStakingPoolSwapAmountAtom } from '@/state/obeliskAtom';

interface DaoStakeModalContent {
  value?: string;
  setValue?: (value: string) => void;
  type?: string;
  lockUp?: boolean;
}

const DaoStakeModalContent = ({ value, setValue, type, lockUp }: DaoStakeModalContent) => {
  const { t } = useTranslation('dao');
  const { wonderDao } = useWonder();

  const activeDao = useAtomValue(daoThemeAtom);
  const swapAmount = useAtomValue(wonderDaoStakingPoolSwapAmountAtom);

  const unstakeableDate = useMemo(() => {
    if (!wonderDao?.dtLockupTime) return;
    return dayjs().add(Number(wonderDao?.dtLockupTime), 'seconds');
  }, [wonderDao]);

  const expectAmount = useMemo(() => {
    if (!swapAmount || !value) return 0;
    if (type === 'stake') {
      return Number(swapAmount) * Number(value);
    }
    return (1 / Number(swapAmount)) * Number(value);
  }, [swapAmount, value]);

  return (
    <div className={cn('stake-modal-content', type === 'unstake' && lockUp && 'rock-up')} key={type}>
      {type === 'unstake' && lockUp ? (
        <div className={cn('rock-up-info')}>
          <strong>{t('stakingPool.modal.box.7')}</strong>
          <span>{t('stakingPool.modal.box.8')}</span>
        </div>
      ) : (
        <>
          <DaoInput
            type={type === 'stake' ? 'wonder' : 'gWonder'}
            title={type === 'stake' ? t('stakingPool.modal.input.title.stake') : t('stakingPool.modal.input.title.unstake')}
            value={value}
            setValue={setValue}
          />
          <div className={cn('stake-modal-list', 'important')}>
            <dl>
              <div>
                <dt>
                  {t('stakingPool.modal.expectancyGet', {
                    token: type === 'stake' ? `g.${useDaoCharacterConvert(activeDao.value)}` : useDaoCharacterConvert(activeDao.value),
                  })}
                </dt>
                <dd>
                  <strong>{expectAmount}</strong>
                  <span>{type === 'stake' ? t(`amountUnit.${activeDao.value}.unit2`) : t(`amountUnit.${activeDao.value}.unit1`)}</span>
                </dd>
              </div>
            </dl>
          </div>
          <ul className={cn('stake-bottom-info')}>
            <li className={cn('stake-info important')}>
              <strong className={cn('text')}>
                1 {t(`amountUnit.${activeDao.value}.unit1`)} = {swapAmount} {t(`amountUnit.${activeDao.value}.unit2`)}
              </strong>
            </li>
            {type === 'stake' && (
              <li className={cn('stake-info')}>
                <strong className={cn('text')}>
                  {t('stakingPool.modal.info1')}: {utcToLocal(unstakeableDate, TimeFormat.STANDARD)}
                </strong>
                <span className={cn('desc')}>{t('stakingPool.modal.info2')}</span>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default DaoStakeModalContent;
