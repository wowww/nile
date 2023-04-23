// 23.02.28 수정 start: 그래프 컬러 변경
export const daoColorSet1 = (value: string) => {
  switch (value) {
    case 'wonder': // wonder dao
      return 0x7246ee;
    case 'arteum': // arteum dao
      return 0xeb605f;
    case 'delta': // delta dao
      return 0x1f8df2;
    default: // oracle dao
      return 0x7ca016;
  }
};

export const daoColorSet2 = (value: string) => {
  switch (value) {
    case 'wonder': // wonder dao
      return 0xe4ddf8;
    case 'arteum': // arteum dao
      return 0xf8d4d1;
    case 'delta': // delta dao
      return 0xd4ebff;
    default: // oracle dao
      return 0xe9f2b3;
  }
};
// 23.02.28 수정 end: 그래프 컬러 변경
