export const useNumberFormatterToFix = (num: number, fixed: number = 4): string => {
  let parts = num.toFixed(fixed).split('.');
  let result = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
  return result;
};
