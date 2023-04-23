import cn from 'classnames';
import Image from 'next/image';
import { Modal } from 'antd';

import IconClose from '@images/icon/ico_close.svg';
import { NileCDNLoader } from '@utils/image/loader';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  src: string;
  isVideo?: boolean;
  refList?: React.MutableRefObject<null | HTMLVideoElement>[] | null;
}

const LifeSlideImageModal = ({ isOpen, setIsOpen, src, isVideo, refList }: Props) => {
  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);

    if (refList) {
      refList.map((el) => {
        if (el.current !== null) el.current.play();
      });
    }
  };

  return (
    <Modal
      className="slide-full-size-modal"
      closeIcon={<IconClose />}
      open={isOpen}
      onCancel={onCancel}
      width={'none'}
      footer={null}
      title={null}
      centered={true}
      closable={true}
      maskClosable={true}
      destroyOnClose={true}
    >
      <div className={cn('modal-contents')}>
        <div className={cn('img-wrap')}>
          {isVideo ? (
            <video
              className={cn('video-control')}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controls
              controlsList="nodownload nofullscreen"
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <Image src={src} layout="responsive" objectFit="contain" height="100%" width="100%" loader={NileCDNLoader} alt="" />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LifeSlideImageModal;
