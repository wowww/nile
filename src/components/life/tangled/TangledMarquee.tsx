import React from 'react';
import cn from 'classnames';
import { windowResizeAtom } from '@/state/windowAtom';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { useAtomValue } from 'jotai';

interface TangledMarqueePropsType {
  itemLength: number;
  type: string;
}

const TangledMarquee: React.FC<TangledMarqueePropsType> = ({ itemLength, type }) => {
  const offset = useAtomValue(windowResizeAtom);

  const transitionDuration = `${itemLength * 5}s`;
  const bannerListStyle = {
    '--banner-show-tangled': itemLength,
    animation: `scrolling-tangled-banner${offset.width < 1280 ? '-md' : offset.width < 768 ? '-sm' : ''} ${transitionDuration} linear infinite`,
  } as React.CSSProperties;

  const originalEl: React.ReactElement[] = [];

  const originalEvent = (idx: number) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= itemLength; i++) {
      originalEl.push(
        <div className="life-tangled-loop-image-wrap" key={`${type}-${i}-${idx}`}>
          <Image src={`/images/img_life_${type}${i}.png`} alt="" layout="fill" loader={NileCDNLoader} />
        </div>
      );
    }
    return originalEl;
  };

  const copyEvt = () => {
    for (let idx = 0; idx < 2; idx++) {
      originalEvent(idx);
    }
    return originalEl;
  };

  return (
    <div className={cn('life-tangled-loop-wrap')}>
      <div className={cn('life-tangled-loop-inner')} style={bannerListStyle}>
        {copyEvt()}
      </div>
    </div>
  );
};

export default TangledMarquee;
