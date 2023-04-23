import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export type ModalAtom = {
  open: boolean;
  requestId: string;
  onSuccess?: <T>(res: T) => void;
  onError?: <T>(error: T) => void;
  type?: 'login' | 'transaction';
}

export const cookieAgreementAtom = atomWithStorage<string | undefined>('cookieAgreementAtom', '');

export const eventModalAtom = atomWithStorage<string | undefined>('eventModalAtom', '');

export const actionBarAtom = atom<boolean>(false);

export const wemixCommonModalAtom = atom<ModalAtom>({
  open: false,
  requestId: '',
  onSuccess: undefined,
  onError: undefined,
  type: undefined,
});