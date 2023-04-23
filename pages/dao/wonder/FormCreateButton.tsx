import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import BgButton from '@/components/button/BgButton';

interface Props {
  buttonText: string;
  isActive?: boolean;
}

const FormCreateButton = ({ buttonText, isActive }: Props): ReactElement => {
  const { t } = useTranslation('');

  return (
    <div className={cn('form-create-button-wrap')}>
      <BgButton buttonText={buttonText} size="xl" color="highlight" disabled={!isActive} />
    </div>
  );
};

export default FormCreateButton;
