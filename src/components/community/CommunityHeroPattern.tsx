import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import cn from 'classnames';

import HeroBannerPatternLottie from '@/assets/lottie/lottie_community_hero_pattern.json';

const HeroBannerPattern = () => {
  const pattern = useRef<any>(null);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: pattern.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: HeroBannerPatternLottie,
    });

    return () => lottieLoad.destroy();
  }, [pattern]);

  return <div ref={pattern} className={cn('pattern')} />;
};

export default HeroBannerPattern;
