import BgButton from '@components/button/BgButton';
import React from 'react';
import OutlineButton from '@components/button/OutlineButton';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';

interface CreateListingButtonProps {
  dark?: boolean;
  background?: boolean;
}

export const CreateListingButton = ({ dark, background }: CreateListingButtonProps) => {
  const { t } = useTranslation('common');
  const nft = useAtomValue(marketNftAtom);

  return (
    <>
      {background ? (
        <BgButton
          buttonText={t('createListing')}
          color={dark ? 'white' : 'black'}
          size="lg-f"
          href={`/marketplace/listing/${nft?.token?.collection?.slug}/${nft?.token?.tokenId}`}
        />
      ) : (
        <OutlineButton
          buttonText={t('createListing')}
          color={dark ? 'white' : 'black'}
          size="lg-f"
          href={{
            pathname: '/marketplace/listing/[collectionAddressOrSlug]/[tokenId]',
            query: { collectionAddressOrSlug: nft?.token?.collection?.slug, tokenId: nft?.token?.tokenId },
          }}
        />
      )}
    </>
  );
};
