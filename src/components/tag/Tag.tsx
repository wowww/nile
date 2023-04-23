/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React from 'react';
import cn from 'classnames';

interface tagPropsType {
  size?: any;
  type?: any;
  bg?: boolean;
  disabled?: boolean;
  color?: any;
  /* 23.03.10 수정: border props 추가 */
  border?: any;
  children: React.ReactNode;
}

const Tag: React.FC<tagPropsType> = ({ size, bg, children, type, disabled, color, border }) => {
  return (
    /* 23.03.10 수정: border props 추가, type props 수정 */
    <span
      className={cn(`tag tag-${size}  tag-${color}`, type && `tag-${type}`, border && `tag-border-${border}`, bg && 'tag-bg', disabled && 'disabled')}
    >
      {children}
    </span>
  );
};
export default Tag;

Tag.defaultProps = {
  size: 'md',
  bg: false,
  type: 'tag',
  color: 'black',
  disabled: false,
};
