import { atom } from 'jotai';


export const myPageTabAtom = atom<string>('dao');

export const marketplaceTabAtom = atom<string>('nft');

export const marketplaceViewTypeAtom = atom<boolean>(false);