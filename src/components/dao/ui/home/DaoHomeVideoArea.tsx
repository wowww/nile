import { daoThemeAtom } from '@/state/daoAtom';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';
import cn from 'classnames';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

const DaoHomeVideoArea = () => {
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);
  const [activeDaoVideo, setActiveDaoVideo] = useState({
    video: '',
    poster: '',
  });
  const [playVideo, setPlayVideo] = useState(false);

  const videoList: Record<string, { video: string; poster: string }> = {
    wonder: {
      video: '/video/life_sights_of_nile3_nakta.mp4',
      poster: '/images/bg_introducing_wonder.jpg',
    },
    arteum: {
      video: '/video/life_sights_of_nile3_nakta.mp4',
      poster: '/images/bg_introducing_arteum.jpg',
    },
    delta: {
      video: '/video/life_sights_of_nile3_nakta.mp4',
      poster: '/images/bg_introducing_delta.jpg',
    },
    oracle: {
      video: '/video/life_sights_of_nile3_nakta.mp4',
      poster: '/images/bg_introducing_oracle.jpg',
    },
  };

  const onPlayVideo = () => {
    setPlayVideo(true);
    document.querySelector('video')?.play();
  };

  useEffect(() => {
    setPlayVideo(false);
    setActiveDaoVideo(videoList[activeDao.value]);
  }, [activeDao.value]);

  return (
    <div className={cn('dao-home-showcase-video-wrap')}>
      <div className={cn('title')}>Introducing {activeDao.value.toLocaleUpperCase()} DAO</div>
      <div className={cn('dao-home-showcase-video-inner', { active: playVideo })}>
        <button type="button" className={cn('video-play-wrap')} onClick={() => onPlayVideo()}>
          <span className={cn('a11y')}>video play</span>
          {activeDaoVideo.poster && (
            <Image
              src={activeDaoVideo.poster}
              alt={`${activeDao.value} flag`}
              layout="fill"
              quality="100"
              loading="eager"
              objectFit="cover"
              loader={NileCDNLoader}
            />
          )}
          <span className={cn('play-button')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_play_btn.svg" />
          </span>
        </button>
        {activeDaoVideo.video && (
          <video className={cn('video-control')} playsInline disablePictureInPicture controls controlsList="nodownload">
            <source src={activeDaoVideo.video} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};

export default DaoHomeVideoArea;
