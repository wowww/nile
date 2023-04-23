import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

export const useCharacterUppercase = (text: string = '') => {
  const upperText = text.toUpperCase();

  return upperText;
};

export const useCharacterFirstUppercase = (text: string = '') => {
  let upperText = text.charAt(0).toUpperCase() + text.slice(1);

  return upperText;
};

export const useDaoCharacterConvert = (value: string) => {
  switch (value) {
    case 'wonder':
      return value.toUpperCase();
    case 'arteum':
      // TODO: 해당 다오 오픈 시 대소문자 구분 확인 후 적용, 아래는 convert
      return value.toUpperCase();
    case 'delta':
      // TODO: 해당 다오 오픈 시 대소문자 구분 확인 후 적용 필요
      return value.toUpperCase();
    case 'oracle':
      // TODO: 해당 다오 오픈 시 대소문자 구분 확인 후 적용 필요
      // return value.charAt(0).toUpperCase() + value.slice(1);
      return value.toUpperCase();
    default:
      return false;
  }
};
