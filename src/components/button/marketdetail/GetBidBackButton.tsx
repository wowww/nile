import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import BgButton from '@components/button/BgButton';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';
import {NileNftOrder} from "@/models/nile/marketplace/NileNft";

const RetractingBidModal = dynamic(() => import('@components/modal/Payment/RetractingBidModal'), { ssr: false });

interface GetBidBackButtonProps {
  size: 'lg-f' | 'xl';
  dark?: boolean;
  order?: NileNftOrder;
}

export const GetBidBackButton = ({ size, dark, order }: GetBidBackButtonProps) => {
  const { t } = useTranslation('common');
  const nft = useAtomValue(marketNftAtom);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <BgButton buttonText={t('marketplaceModal.getMyBidBack')} color={dark ? "white" : "black"} size={size} onClick={() => setIsModalOpen(true)} />
      <RetractingBidModal nft={nft} isOpen={isModalOpen} setIsOpen={setIsModalOpen} bidBack order={order} />
    </>
  );
};
