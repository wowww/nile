import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type ModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: (open: boolean) => void;
};

export const Modal = ({ children, open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <Container onClick={() => onClose(false)}>
      <Wrapper open={open}>{children}</Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;

  @keyframes popInFromBottom {
    0% {
      opacity: 0;
      transform: translateY(40px) scale(0.75);
    }
    75% {
      opacity: 1;
      transform: translateY(-8px) scale(1);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes popOutToBottom {
    0% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(40px) scale(0.75);
    }
  }
`;

const Wrapper = styled.div<{ open: boolean }>`
  position: relative;
  z-index: 10;
  max-width: 240px;
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  ${({ open }) =>
    open
      ? css`
        animation: popInFromBottom 0.2s forwards ease-in-out;
      `
      : css`
        animation: popOutToBottom 0.2s forwards ease-in-out;
      `}
`;
