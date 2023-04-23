import cn from 'classnames';
import Image from 'next/image';
import { Modal } from 'antd';

import IconClose from '@images/icon/ico_close.svg';
import { NileCDNLoader } from '@utils/image/loader';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  youtubeId: string;
}

const NileHeroModal = ({ isOpen, setIsOpen, youtubeId }: Props) => {
  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);
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
      <div className={cn('video-wrap')}>
        <div className={cn('video-inner')}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Modal>
  );
};

export default NileHeroModal;
