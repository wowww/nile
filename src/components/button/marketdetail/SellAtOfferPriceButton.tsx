import BgButton from '@components/button/BgButton';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';

const OfferHistoryModal = dynamic(() => import('@components/modal/OfferHistoryModal'), { ssr: false });

interface SellAtOfferPriceButtonProps {
  dark?: boolean;
}

export const SellAtOfferPriceButton = ({ dark }: SellAtOfferPriceButtonProps) => {
  const nft = useAtomValue(marketNftAtom);

  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <BgButton buttonText={t('sellAtOfferPrice')} color={dark ? 'white' : 'black'} size="lg-f" onClick={() => setIsModalOpen(true)} />
      <OfferHistoryModal nft={nft} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
