import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

export const useLayoutResize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const isMobile = useMemo(() => {
    return size.width < 768;
  }, [size]);

  const isTablet = useMemo(() => {
    return size.width < 1024;
  }, [size]);

  const isDesktop = useMemo(() => {
    return size.width < 1280;
  }, [size]);

  const isLargeDesktop = useMemo(() => {
    return size.width < 1440;
  }, [size]);

  const onResize = useMemo(() => {
    return debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);
  }, [setSize]);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return ({
    size,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    onResize,
  });
};
