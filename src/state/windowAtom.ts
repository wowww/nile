import { atom } from 'jotai';

export type WindowSize = {
  width: number;
  height: number;
}

export type WindowScrollLock = {
  isLocked: boolean;
  modalActiveCount: number;
}

export const windowResizeAtom = atom<WindowSize>({ width: 0, height: 0 });

export const windowScrollAtom = atom<number>(0);

export const marketScrollAtom = atom<number>(0);

export const windowScrollLockAtom = atom<WindowScrollLock>({ isLocked: false, modalActiveCount: 0 });
