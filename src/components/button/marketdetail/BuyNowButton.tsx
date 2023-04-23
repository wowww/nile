import BgButton from '@components/button/BgButton';
import React, {useCallback, useMemo, useState} from 'react';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { useNileNft } from '@/hook/useNileNft';
import { useTranslation } from 'next-i18next';
import OutlineButton from '@components/button/OutlineButton';
import {nileWalletAtom, provider} from "@/state/nileWalletAtom";

const BuyNowModal = dynamic(() => import('@components/modal/Payment/BuyNowModal'), { ssr: false });

interface BuyNowButtonProps {
  background?: boolean;
  dark?: boolean;
}

export const BuyNowButton = ({ background, dark }: BuyNowButtonProps) => {
  const { t } = useTranslation('common');
  const nft = useAtomValue(marketNftAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const { lastOrder } = useNileNft(nft);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isAfterSale = useMemo(() => {
    return dayjs().isAfter(dayjs.utc(lastOrder?.startAt));
  }, [lastOrder]);

  const connectWallet = useCallback(() => {
    provider.connect().then(() => {
      provider.closeModal();
    });
  }, [nileWallet]);

  return (
    <>
      {background ? (
        <BgButton
          buttonText={t('marketplaceModal.buyNow')}
          color={dark ? 'white' : 'black'}
          size="lg-f"
          disabled={!isAfterSale}
          onClick={() => {
            if (nileWallet) {
              setIsModalOpen(true);
            } else {
              connectWallet();
            }
          }}
        />
      ) : (
        <OutlineButton
          buttonText={t('marketplaceModal.buyNow', { ns: 'common' })}
          color={dark ? 'white' : 'black'}
          size="lg-f"
          disabled={!isAfterSale}
          onClick={() => {
            if (nileWallet) {
              setIsModalOpen(true);
            } else {
              connectWallet();
            }
          }}
        />
      )}
      <BuyNowModal nft={nft} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
