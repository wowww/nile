import cn from 'classnames';
import Marquee from 'react-fast-marquee';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

const LifeHeroMarquee = () => {
  const offset = useAtomValue(windowResizeAtom);

  const lifeList = [
    'COLLECTIBLES',
    'PIXEL ART',
    'PFP',
    'MOVE TO EARN',
    'PLAY TO EARN',
    'UTILITY',
    'TALK TO EARN',
    'RELAX TO EARN',
    'SPORTS',
    'MUSIC',
  ];

  const originalEl: React.ReactElement[] = [];
  const copyEvent = (times: number) => {
    for (let i = 0; i < times; i++) {
      originalEl.push(
        ...lifeList.map((item, index) => (
          <li key={`life-marquee-${index}-${i}`} className={cn('marquee-item', item.split(' ').join('').toLocaleLowerCase())}>
            <span className={cn('marquee-text')}>{item.toUpperCase()}</span>
          </li>
        )),
      );
    }
    return originalEl;
  };

  return (
    <Marquee gradient={false} speed={30}>
      {/* 23.02.13 수정: 라이브 띠배너 pc 해상도 copy 조건 수정 */}
      <ul className={cn('life-hero-marquee')}>{copyEvent(offset.width > 768 ? (offset.width > 2560 ? 3 : 2) : 1)}</ul>
    </Marquee>
  );
};

export default LifeHeroMarquee;
