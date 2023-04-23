import React, { CSSProperties, ReactElement, ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import useScrollLock from '@/hook/useScrollLock';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  title?: string | JSX.Element;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'md-t' | 'lg-t';
  footer?: boolean;
  titleType?: 'center' | undefined;
  titleFont?: 'serif' | undefined;
  subTitle?: string | JSX.Element;
  destroyOnClose?: boolean;
  footerContent?: ReactElement[];
  wrapClassName?: string;
  style?: CSSProperties;
  closable?: boolean;
  maskClosable?: boolean;
  forceRender?: boolean;
  className?: string;
}

const ModalLayout = ({
  isOpen,
  setIsOpen,
  title,
  children,
  size = 'md',
  footer = false,
  footerContent,
  titleType = undefined,
  titleFont = undefined,
  subTitle,
  destroyOnClose = false,
  className,
  wrapClassName,
  style,
  closable = true,
  maskClosable = true,
  forceRender,
}: ModalProps) => {
  const offset = useAtomValue(windowResizeAtom);
  const [headerHeight, setHeaderHeight] = useState<string>('60px');
  const [footerHeight, setFooterHeight] = useState<string>('109px');
  const [destroyClose, setDestroyClose] = useState<boolean>(false);
  const { lockScroll } = useScrollLock();

  useEffect(() => {
    lockScroll(isOpen);
  }, [isOpen]);

  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);
  };

  const onOk = () => {
    Modal.destroyAll();
    setIsOpen(false);
  };

  useEffect(() => {
    isOpen && setDestroyClose(true);
  }, [isOpen]);

  useEffect(() => {
    const headerH = `${document.querySelector('.ant-modal-header')?.clientHeight}px`;
    const footerH = `${document.querySelector('.ant-modal-footer')?.clientHeight}px`;
    setHeaderHeight(headerH);
    setFooterHeight(footerH);
  }, [offset.width, destroyClose]);

  return (
    <>
      <Modal
        className={cn(
          'modal-wrap',
          `modal-size-${size}`,
          !footer && 'none-footer',
          titleType === 'center' && 'title-center-type',
          titleFont === 'serif' && 'serif',
          className,
        )}
        closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />}
        title={
          <>
            {title}
            {(size === 'md-t' || size === 'lg-t') && <div className={cn('modal-sub-title')}>{subTitle}</div>}
          </>
        }
        style={
          {
            '--modal-header-height': headerHeight,
            '--modal-footer-height': footerHeight,
            '--modal': '10px',
            style,
          } as React.CSSProperties
        }
        footer={footer && footerContent}
        width={'none'}
        open={isOpen}
        onCancel={onCancel}
        centered={true}
        wrapClassName={wrapClassName}
        destroyOnClose={destroyOnClose}
        closable={closable}
        maskClosable={maskClosable}
        forceRender={forceRender}
      >
        <div className={cn('modal-body')}>{children}</div>
      </Modal>
    </>
  );
};

export default ModalLayout;
