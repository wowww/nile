import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Button } from 'antd';

interface Props {
  type: 'button' | 'link';
  buttonText: string | undefined;
  link?: string;
  onClick?: () => void;
}

const DaoScanTableButton = ({ type, buttonText, link, onClick }: Props): ReactElement => {
  const { t } = useTranslation('common');

  return type === 'button' ? (
    <Button onClick={onClick} className={cn('dao-scan-table-button')}>
      <span className={cn('text')}>{buttonText}</span>
    </Button>
  ) : (
    <a href={link} target="_blank" title={t('blank')} rel="noopener noreferrer" className={cn('dao-scan-table-button')}>
      <span className={cn('text')}>{buttonText}</span>
    </a>
  );
};

export { DaoScanTableButton };
