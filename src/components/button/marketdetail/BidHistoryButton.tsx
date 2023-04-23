import OutlineButton from '@components/button/OutlineButton';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import NileNft from '@/models/nile/marketplace/NileNft';
import dynamic from 'next/dynamic';
import {useAtomValue} from "jotai";
import {marketNftAtom} from "@/state/marketplace";

const BidHistoryModal = dynamic(() => import('@components/modal/BidHistoryModal'), { ssr: false });

interface BidHistoryButtonProps {
  size?: 'xs' | 'lg-f' | 'xl';
  dark?: boolean;
}

export const BidHistoryButton = ({ size, dark }: BidHistoryButtonProps) => {
  const nft = useAtomValue(marketNftAtom);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation('common');

  return (
    <>
      <OutlineButton buttonText={t('bidHistoryPopup.title')} color={dark? "white" : "black"} size={size ?? 'xs'} onClick={() => setIsModalOpen(true)} />
      <BidHistoryModal nft={nft} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
