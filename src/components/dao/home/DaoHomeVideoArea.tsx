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
    videoId: '',
    poster: '',
  });
  const [playVideo, setPlayVideo] = useState(false);

  const videoList: Record<string, { videoId: string; poster: string }> = {
    wonder: {
      videoId: 'I1dvQFN4GhI',
      poster: '/images/bg_introducing_wonder.jpg',
    },
    arteum: {
      videoId: 'uUVKsh02Srg',
      poster: '/images/bg_introducing_arteum.jpg',
    },
    delta: {
      videoId: 'ParLLQbCwFM',
      poster: '/images/bg_introducing_delta.jpg',
    },
    oracle: {
      videoId: '_166_p_dDks',
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
        {activeDaoVideo.videoId && (
          <iframe
            className={cn('video-control')}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${activeDaoVideo.videoId}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default DaoHomeVideoArea;
