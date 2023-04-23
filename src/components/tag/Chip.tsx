/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import cn from 'classnames';
/* 23.03.11 수정: 이미지 컴포넌트 추가를 위한 라이브러리 추가 */
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

interface tagPropsType {
  size?: string;
  bg?: boolean;
  primary?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  /* 23.03.11 수정: type props 추가 */
  type?: string;
}

const Tag: React.FC<tagPropsType> = ({ size, bg, children, primary, disabled, type }) => {
  return (
    <span className={cn(`chip chip-${size}`, bg && 'chip-bg', primary && 'chip-primary', disabled && 'disabled', type && `chip-${type}`)}>
      {/* 23.03.11 수정: neith 타입 추가 */}
      {type === 'neith' && (
        <span className={cn('badge-wrap')}>
          {/* TODO: react-svg 사용 할 경우 div wrapper이 추가되는 관계로 Image 컴포넌트 사용함 */}
          <Image
            src="https://nile.blob.core.windows.net/images/assets/images/img/neithCollections/img_covenant_badge.svg"
            alt=""
            quality={100}
            layout="fill"
            loader={NileCDNLoader}
          />
        </span>
      )}
      {children}
    </span>
  );
};
export default Tag;

Tag.defaultProps = {
  size: 'md',
  bg: false,
  primary: false,
  disabled: false,
};
