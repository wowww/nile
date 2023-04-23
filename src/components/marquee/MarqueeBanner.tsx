import React from 'react';
import cn from 'classnames';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

interface marqueePropsType {
  itemList: string[];
  loopTimes: number;
  classNames?: string;
}

const MarqueeBanner: React.FC<marqueePropsType> = ({ itemList, loopTimes, classNames }) => {
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isTablet = useMediaQuery('(max-width: 1279px)');

  const itemCount = itemList.length;
  const transitionDuration = `${itemCount * 5}s`;
  const bannerListStyle = {
    '--banner-show-el': itemCount,
    animation: `scrolling-banner${isTablet ? '-m' : ''} ${transitionDuration} linear infinite`,
  } as React.CSSProperties;

  const originalEl: React.ReactElement[] = [];
  const copyEvent = (times: number) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < times; i++) {
      originalEl.push(
        ...itemList.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={item + idx + i} className={cn('banner-item', item.split(' ').join('').toLocaleLowerCase())}>
            {item.toUpperCase()}
          </li>
        )),
      );
    }
    return originalEl;
  };

  return (
    <div className={cn('marquee-banner-wrap', classNames)}>
      <ul className={cn('marquee-banner')} style={bannerListStyle}>
        {copyEvent(loopTimes)}
      </ul>
    </div>
  );
};

export default MarqueeBanner;
