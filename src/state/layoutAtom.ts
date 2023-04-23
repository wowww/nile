import { atom } from 'jotai';

/* 23.02.01 수정: headerHideFull atom 상태 추가 */
export const headerHideFull = atom<boolean>(false);

export const headerVisibleMyPageAtom = atom<boolean>(false);

export const headerVisibleNotificationAtom = atom<boolean>(false);

export const headerVisibleLangAtom = atom<boolean>(false);

export const headerVisibleAccountAtom = atom<boolean>(false);
