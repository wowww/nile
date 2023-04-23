import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { windowResizeAtom } from '@/state/windowAtom';
import { useAtomValue } from 'jotai';
import { Avatar } from 'antd';
import RecruitMarqueeBannerModal from '@/components/modal/daostation/RecruitMarqueeBannerModal';
import { useTranslation } from 'next-i18next';
import lottie from 'lottie-web';
import lottieCongratulations from '@/assets/lottie/lottie_congratulations.json';

export type RecruitMarqueeBannerItemType = {
  name: string;
  text?: string;
  figure: number;
  tag?: string;
  /* 23.02.15 수정: 타입 추가 */
  imgUrl?: string;
};

interface RecruitMarqueeBannerProps {
  itemList: RecruitMarqueeBannerItemType[];
  loopTimes: number;
}

const BannerCard = ({ item, idx, modalOpen }: { item: any; idx: number; modalOpen: (item: RecruitMarqueeBannerItemType) => void }) => {
  const bgLottie = useRef<any>(null);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: bgLottie.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieCongratulations,
    });

    return () => lottieLoad.destroy();
  }, []);

  return (
    <li
      key={idx + String(Math.random())}
      className={cn('banner-item')}
      style={{ backgroundImage: `url(https://nile.blob.core.windows.net/images/images/bg_footprint_bottom_${3}.png)` }}
      onClick={() => modalOpen(item)}
    >
      {item.tag && (
        <>
          <div className={cn('lottie-wrap')}>
            <div className={cn('lottie-area')} ref={bgLottie} />
          </div>
          <div className={cn('top-tag')}>{item.tag}</div>
        </>
      )}
      <div className={cn('top-area')}>
        <Avatar className={cn('user-image type8')} size={40} />
        <span className={cn('name')}>{item.name}</span>
        <p className={cn('desc')}>{item.text}</p>
      </div>
      <div className={cn('bottom-area')}>
        <span className={cn('info-name')}>참여 금액</span>
        <span className={cn('figure')}>{item.figure} WEMIX</span>
      </div>
    </li>
  );
};

const RecruitMarqueeBanner = ({ itemList, loopTimes }: RecruitMarqueeBannerProps) => {
  const { t } = useTranslation('dao');

  const offset = useAtomValue(windowResizeAtom);
  const originalEl: React.ReactElement[] = [];
  const itemCount = itemList.length;
  const transitionDuration = `${itemCount * 5}s`;
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<RecruitMarqueeBannerItemType>({
    name: '',
    text: '',
    figure: 0,
  });

  const bannerListStyle = {
    '--banner-show-el': itemCount,
    animation: `scrolling-banner${offset.width < 1280 ? '-m' : ''} ${transitionDuration} linear infinite`,
  } as React.CSSProperties;

  const modalOpen = (item: RecruitMarqueeBannerItemType) => {
    setModalData({
      name: item.name,
      figure: item.figure,
      text: item.text,
    });
    setIsModal(true);
  };

  const copyEvent = (times: number) => {
    let i: number;
    for (i = 0; i < times; i++) {
      originalEl.push(...itemList.map((item, idx) => <BannerCard item={item} idx={idx} modalOpen={modalOpen} key={idx + String(Math.random())} />));
    }

    return originalEl;
  };

  return (
    <div className={cn('recruit-marquee-banner-wrap')}>
      <strong className={cn('banner-title')}>{t('station.recruiting.banner.header', { n: 158 })}</strong>
      <ul className={cn('recruit-marquee-banner')} style={bannerListStyle}>
        {copyEvent(loopTimes)}
      </ul>
      <RecruitMarqueeBannerModal isOpen={isModal} setIsOpen={setIsModal} />
    </div>
  );
};

export default RecruitMarqueeBanner;
