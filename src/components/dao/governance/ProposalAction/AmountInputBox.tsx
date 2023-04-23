import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import cn from 'classnames';
import OutlineButton from '@/components/button/OutlineButton';
import { useTranslation } from 'next-i18next';

interface Props {
  unit: string;
  disabled?: boolean;
}

const AmountInputBox: React.FC<Props> = ({ unit, disabled = false }) => {
  const { t } = useTranslation('dao');

  const [isError, setIsError] = useState<boolean>(false);

  return (
    <div className={cn('proposal-amount-input-box')}>
      <div className={cn('input-block', isError && 'error', disabled && 'disabled')}>
        <span className={cn('unit')}>{unit}</span>
        <div className={cn('input-wrap')}>
          <input type="number" placeholder="0" disabled={disabled} />
          <OutlineButton buttonText="Max" size="sm" color="black" disabled={disabled} />
        </div>
      </div>
      {isError && (
        <div className={cn('error-message')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
          <span>{t('governance.proposal.action.inputError')}</span>
        </div>
      )}
    </div>
  );
};

export default AmountInputBox;
