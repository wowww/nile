import { atom } from 'jotai';
import NileNft from '@/models/nile/marketplace/NileNft';
import { NileApiService } from '@/services/nile/api';

export const marketNftAtom = atom<NileNft>({ token: {} });

export const updateMarketNftAtom = atom(null, (get, set) => {
  const nft = get(marketNftAtom);
  const api = NileApiService();

  if (!nft) return;

  const collectionSlug = nft?.token?.collection?.slug;
  const tokenId = nft?.token?.tokenId;

  if (!collectionSlug && !tokenId) return;

  api.marketplace.nft
    .getItem({ collectionSlug, tokenId: Number(tokenId) })
    .then(({ data }) => set(marketNftAtom, { token: data.result, orderList: data.result.orderList }))
    .catch((error) => {
      console.log(error);
    });
});

export const nftTabPageAtom = atom<number>(1);

export const collectionDetailPageAtom = atom<number>(1);