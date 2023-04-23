import BgButton from '@components/button/BgButton';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const CompleteCheckOutModal = dynamic(() => import('@components/modal/Payment/CompleteCheckOutModal'), {
  ssr: false,
});

interface CompleteCheckOutButtonProps {
  dark?: boolean;
  size: 'lg-f' | 'xl';
}

export const CompleteCheckOutButton = ({ dark, size }: CompleteCheckOutButtonProps) => {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <BgButton
        buttonText={t('marketplaceModal.completePayment')}
        color={dark ? 'white' : 'black'}
        size={size}
        onClick={() => setIsModalOpen(true)}
      />
      <CompleteCheckOutModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
