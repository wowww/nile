import { atom } from 'recoil';

export const headerMyPage = atom({
  key: 'headerMyPage',
  default: false,
});

export const headerNotification = atom({
  key: 'headerNotification',
  default: false,
});

export const headerLang = atom({
  key: 'headerLang',
  default: false,
});

export const headerAccount = atom({
  key: 'headerAccount',
  default: false,
});
