import OutlineButton from '@components/button/OutlineButton';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import BgButton from '@components/button/BgButton';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';

const MakeOfferModal = dynamic(() => import('@/components/modal/MakeOfferModal'), { ssr: false });

interface OpenMakeOfferButtonProps {
  background?: boolean;
  dark?: boolean;
}

export const OpenMakeOfferButton = ({ background, dark }: OpenMakeOfferButtonProps) => {
  const nft = useAtomValue(marketNftAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation('common');

  const connectWallet = useCallback(() => {
    provider.connect().then(() => {
      provider.closeModal();
    });
  }, [nileWallet]);

  return (
    <>
      {background ? (
        <BgButton
          buttonText={t('makeOffer', { ns: 'common' })}
          color={dark ? 'white' : 'black'}
          size="lg-f"
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
          buttonText={t('makeOffer')}
          color={dark ? 'white' : 'black'}
          size="lg-f"
          onClick={() => {
            if (nileWallet) {
              setIsModalOpen(true);
            } else {
              connectWallet();
            }
          }}
        />
      )}
      <MakeOfferModal nft={nft} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
