import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import OutlineButton from '@components/button/OutlineButton';
import { IconLogo } from '@components/logo/IconLogo';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { ReactSVG } from 'react-svg';
import { useNumberFormatter } from '@utils/formatter/number';
import { wonderObeliskBalanceAtom } from '@/state/obeliskAtom';

interface DaoStakeModalInputProps {
  title?: string;
  value?: string;
  type?: 'wonder' | 'gWonder';
  setValue?: (value: string) => void;
  desc?: string;
}

const DaoInput = ({ title, type, value, setValue, desc }: DaoStakeModalInputProps) => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const balance = useAtomValue(wonderObeliskBalanceAtom);

  const { toFix } = useNumberFormatter();
  const [inputFocus, setInputFocus] = useState(false);

  const currentBalance = useMemo(() => {
    if (type === 'wonder') {
      return balance?.wonder;
    }
    return balance?.gWonder;
  }, [balance, type]);

  return (
    <div className={cn('stake-input-wrap', inputFocus && 'focus')}>
      <div className={cn('input-block-title')}>
        <strong className={cn('title')}>{title}</strong>
        <OutlineButton
          size="xs"
          buttonText={t('stakingPool.modal.input.max')}
          color="dark-gray"
          onClick={() => setValue?.(String(Number(currentBalance) ?? 0))}
        />
      </div>
      <div className={cn('input-wrap')}>
        <div className={cn('token-logo')}>
          <IconLogo type={type === 'wonder' ? activeDao.value : `g.${activeDao.value}`} size={32} fullType={true} />
          <div className={cn('token-text')}>
            <strong>{type === 'wonder' ? useDaoCharacterConvert(activeDao.value) : `g.${useDaoCharacterConvert(activeDao.value)}`}</strong>
            <span>
              {toFix(Number(currentBalance) ?? 0)}&nbsp;
              <span className={cn('unit')}>
                {type === 'wonder' ? t(`amountUnit.${activeDao.value}.unit1`) : t(`amountUnit.${activeDao.value}.unit2`)}
              </span>
            </span>
          </div>
        </div>
        <div className={cn('input')}>
          <input
            placeholder="0"
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue?.(e.target.value)}
            onFocus={(e: any) => setInputFocus(true)}
            onBlur={(e: any) => setInputFocus(false)}
          />
        </div>
        {value && Number(value) > (Number(currentBalance) ?? 0) && (
          <div className={cn('error-text')}>
            <ReactSVG src={'https://nile.blob.core.windows.net/images/assets/images/icon/ico_exclamation.svg'} />
            <span>{t('stakingPool.modal.error.1', { unit: t(`amountUnit.${activeDao.value}.${type === 'wonder' ? 'unit1' : 'unit2'}`) })}</span>
          </div>
        )}
      </div>
      {desc && <p className={cn('input-info-text')}>{desc}</p>}
    </div>
  );
};

export default DaoInput;
