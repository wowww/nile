import useMediaQuery from '@/hook/useMediaQuery';
import { NileCDNLoader } from '@/utils/image/loader';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useState } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';

type BagcNeithNftDataType = {
  stepInfo: string;
}[];

const BagcNeithNft = () => {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { t } = useTranslation(['life', 'common']);
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const onOpen = (isVideo: boolean, src: string) => {
    // 모바일, 태블릿 기기에서 비디오 팝업 노출하지 않음
    if (isVideo && (isAndroid || isIOS)) {
      return;
    }

    setIsOpen(true);
    setSrc(src);
    setIsVideo(isVideo);

    if (isVideo) {
      // refList.map((el) => {
      //   if (el.current !== null) el.current.pause();
      // });
    }
  };

  const data: BagcNeithNftDataType = [
    {
      stepInfo: t('bagc.neithNft.stepInfo.1'),
    },
    {
      stepInfo: t('bagc.neithNft.stepInfo.2'),
    },
    {
      stepInfo: t('bagc.neithNft.stepInfo.3'),
    },
  ];

  return (
    <div className={cn('bagc-neith-nft-contain')}>
      <div className={cn('bagc-neith-nft-wrap')}>
        <div className={cn('bagc-neith-nft-detail')}>
          <strong className={cn('bagc-nft-title')}>
            How to get <br />
            BAGC NEITH PFP & MERCH NFT
          </strong>
          {!isDesktop && (
            <div className={cn('bagc-video-wrap')}>
              <video
                className={cn('video-control marketplace-video')}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controls
                controlsList="nodownload nofullscreen"
                src={'/video/life_bagc_neith_nft.mp4'}
                onClick={(e) => {
                  e.preventDefault();
                  onOpen(true, 'video/life_bagc_neith_nft.mp4');
                }}
              >
                <source src={''} type="video/mp4" />
              </video>
            </div>
          )}
          {data.map((info, i) => (
            <dl key={`nft-step-${i}`}>
              <dt>STEP 0{i + 1}.</dt>
              <dd>{info.stepInfo}</dd>
            </dl>
          ))}
        </div>
        {isDesktop && (
          <div className={cn('bagc-video-wrap')}>
            <video
              className={cn('video-control marketplace-video')}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controls
              controlsList="nodownload nofullscreen"
              src={'/video/life_bagc_neith_nft.mp4'}
              onClick={(e) => {
                e.preventDefault();
                onOpen(true, '/video/life_bagc_neith_nft.mp4');
              }}
            >
              <source src={''} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default BagcNeithNft;
