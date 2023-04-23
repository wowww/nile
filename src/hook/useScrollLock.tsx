import useWindowScroll from '@/hook/useWindowScroll';
import { windowScrollAtom } from '@/state/windowAtom';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const useScrollLock = () => {
  const scroll = useWindowScroll();
  const [currentScroll, setCurrentScroll] = useState<number>(0);

  useEffect(() => {
    return () => {
      const body = document.querySelector('body');
      body?.classList.remove('lock');
      document.body.removeAttribute('style');
    };
  }, []);

  const lockScroll = (isOpen: boolean) => {
    const body = document.querySelector('body');
    body?.classList.remove('lock');

    if (isOpen) {
      setCurrentScroll(scroll);
      body?.classList.add('lock');
      document.documentElement.style.setProperty('--scroll', `-${scroll}px`);
    } else {
      document.body.removeAttribute('style');
      window.scrollTo(0, currentScroll);
    }
  };

  return {
    lockScroll,
  };
};

export default useScrollLock;
