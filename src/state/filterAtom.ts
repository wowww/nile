import { atom } from 'jotai';

export const FILTER_SORTING_DEFAULT = 'endAt,asc|orderId,desc' as const;

export type FilterType = {
  page?: number;
  collections?: {
    [key: string]: string[];
  },
  properties?: {
    type?: string;
    subType?: string[];
  }
  sorting?: string;
  status?: string[];
  type?: string[];
  collectionSlug?: string;
}

export const tokenFilterAtom = atom<FilterType>({ sorting: FILTER_SORTING_DEFAULT, status: [], type: [], collectionSlug: 'SNKRZ' });

export const collectionFilterAtom = atom<FilterType>({ sorting: 'tokenId,asc', status: [], type: [] })

export const visibleMyPageFilterAtom = atom<boolean>(false);