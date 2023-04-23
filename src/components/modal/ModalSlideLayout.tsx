import React, { CSSProperties, ReactElement, ReactFragment, useEffect } from 'react';
import cn from 'classnames';
import { Modal } from 'antd';

import { ReactSVG } from 'react-svg';
import useScrollLock from '@/hook/useScrollLock';

interface ModalSlideProps {
  isOpen: boolean;
  setIsOpen: Function;
  children: ReactFragment;
  footer?: boolean;
  destroyOnClose?: boolean;
  footerContent?: ReactElement[];
  wrapClassName?: string;
  style?: CSSProperties;
  closable?: boolean;
  maskClosable?: boolean;
  onCancel?: () => void;
}

const ModalSlideLayout = ({
  isOpen,
  setIsOpen,
  children,
  footer,
  footerContent,
  destroyOnClose,
  wrapClassName,
  style,
  closable,
  maskClosable,
  onCancel,
}: ModalSlideProps) => {
  const { lockScroll } = useScrollLock();

  useEffect(() => {
    lockScroll(isOpen);
  }, [isOpen]);

  const onModalClose = () => {
    document.body.removeAttribute('style');
    onCancel?.();
  };

  return (
    <Modal
      className={cn('modal-slide-wrap', !footer && 'none-footer')}
      closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />}
      title={null}
      style={style && style}
      footer={footer && footerContent}
      width={'none'}
      open={isOpen}
      onCancel={onModalClose}
      centered={true}
      wrapClassName={wrapClassName}
      destroyOnClose={destroyOnClose}
      closable={closable}
      maskClosable={maskClosable}
    >
      <div className={cn('modal-body')}>{children}</div>
    </Modal>
  );
};

ModalSlideLayout.defaultProps = {
  footer: false,
  destroyOnClose: false,
  closable: true,
  maskClosable: true,
  onCancel: () => {},
};

export default ModalSlideLayout;
