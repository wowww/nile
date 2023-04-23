import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export type TermAgreement = {
  birthAt: string;
  zipCode: string;
  agreement: boolean;
}

export const termAgreementAtom = atomWithStorage<TermAgreement>('termAgreementAtom', {
  birthAt: '',
  zipCode: '',
  agreement: false,
});

export const termModalAtom = atom<boolean>(false);