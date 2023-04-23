import BgButton from '@components/button/BgButton';
import React, {useCallback, useMemo, useState} from 'react';
import { useTranslation } from 'next-i18next';
import PlaceBidModal from '@components/modal/Payment/PlaceBidModal';
import { useAtomValue } from 'jotai';
import {nileWalletAtom, provider} from '@/state/nileWalletAtom';
import { marketNftAtom } from '@/state/marketplace';
import { useNileNft } from '@/hook/useNileNft';

interface PlaceBidButtonProps {
  price?: number;
  dark?: boolean;
}

export const PlaceBidButton = ({ price, dark }: PlaceBidButtonProps) => {
  const { t } = useTranslation('common');
  const nft = useAtomValue(marketNftAtom);

  const { lastOrder } = useNileNft(nft);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const nileWallet = useAtomValue(nileWalletAtom);

  const isCurrentAuctionWinner = useMemo(() => {
    if (nileWallet) {
      return lastOrder?.biddingList?.at(0)?.address?.toLowerCase() === nileWallet.toLowerCase();
    }
    return false;
  }, [lastOrder, nileWallet]);

  const connectWallet = useCallback(() => {
    provider.connect().then(() => {
      provider.closeModal();
    });
  }, [nileWallet]);

  return (
    <>
      <BgButton
        buttonText={t('placeBid', { ns: 'common' })}
        color={dark ? 'white' : 'black'}
        size="lg-f"
        disabled={isCurrentAuctionWinner}
        onClick={() => {
          if (nileWallet) {
            setIsModalOpen(true);
          } else {
            connectWallet();
          }
        }}
      />
      <PlaceBidModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} price={price} />
    </>
  );
};
