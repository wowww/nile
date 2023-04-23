import BgButton from '@components/button/BgButton';
import cn from 'classnames';
import { IconLogo } from '@components/logo/IconLogo';
import OutlineButton from '@components/button/OutlineButton';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface CoinType {
  iconType?: string;
  symbol?: string;
  onClickApprove?: () => void;
}

interface CoinApproveModalProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  onClickNext?: () => void;
  coins?: CoinType[];
  isApproved?: boolean;
}

const CoinApproveModal = ({ isOpen, setIsOpen, coins, onClickNext, isApproved }: CoinApproveModalProps) => {
  const { t } = useTranslation('dao');

  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="sm"
      title={t('coinConfirm.title')}
      footer={true}
      destroyOnClose={true}
      wrapClassName="coin-confirm"
      footerContent={[
        <BgButton buttonText={t('coinConfirm.next')} color="highlight" size="md" key="Next" disabled={!isApproved} onClick={onClickNext} />,
      ]}
    >
      <div className={cn('coin-confirm-wrap')}>
        <div className={cn('text-wrap')}>{t('coinConfirm.desc')}</div>
        <dl className={cn('coin-confirm-list')}>
          <dt>{t('coinConfirm.confirmList')}</dt>
          {coins &&
            coins.map((item) => (
              <dd className={cn('coin-list-inner')}>
                <div className={cn('coin-wrap')}>
                  <IconLogo type={item.iconType} size={20} fullType />
                  <span className={cn('coin-name')}>{item?.symbol}</span>
                </div>
                <OutlineButton
                  size="xs"
                  buttonText={isApproved ? t('coinConfirm.approved') : t('coinConfirm.approve')}
                  color="highlight"
                  disabled={isApproved}
                  onClick={item.onClickApprove}
                />
              </dd>
            ))}
        </dl>
      </div>
    </ModalLayout>
  );
};
export default CoinApproveModal;
