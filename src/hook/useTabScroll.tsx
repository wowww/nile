export const useTabScroll = (standardTop: number = 0, extraSpace: number = 30) => {
  if(typeof window !== 'undefined') {
    if (window.pageYOffset > standardTop + extraSpace) {
      window.scrollTo(0, standardTop);
    }
  }
};
