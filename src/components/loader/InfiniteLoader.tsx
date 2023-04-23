import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import cn from 'classnames';

import ListLoaderLottie from '@/assets/lottie/list_loader.json';

interface InfiniteLoader {
  size?: string; // lg | md | sm
}

const InfiniteLoader = ({ size = 'md' }: InfiniteLoader) => {
  const listLoader = useRef<any>(null);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: listLoader.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: ListLoaderLottie,
    });

    return () => lottieLoad.destroy();
  }, [listLoader]);

  return <div ref={listLoader} className={cn('infinite-loader', `size-${size}`)} />;
};

export default InfiniteLoader;
