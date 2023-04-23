import { useCallback, useEffect } from 'react';
import { throttle } from 'lodash';
import { useAtom } from 'jotai';
import { windowScrollAtom } from '@/state/windowAtom';

const useWindowScroll = () => {
  const [windowScrollTop, setScrollTop] = useAtom(windowScrollAtom);

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setScrollTop(window.pageYOffset);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', throttle(handleScroll, 100));
    }
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return windowScrollTop;
};

export default useWindowScroll;
