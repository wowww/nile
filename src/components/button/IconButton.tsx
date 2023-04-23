/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React from 'react';
import cn from 'classnames';
import { Button } from 'antd';

import { ReactSVG } from 'react-svg';
import { uuid } from 'uuidv4';

interface buttonPropsType {
  onClick?: () => void;
  buttonText: string;
  block?: boolean;
  size: string;
  disabled?: boolean;
  classnames?: string;
  circle?: boolean;
  iconValue: string;
  activate?: boolean;
}

const IconButton: React.FC<buttonPropsType> = ({ onClick, buttonText, block, size, classnames, iconValue, circle, disabled, activate = false }) => {
  const key = uuid();
  const viewIcon = () => {
    switch (iconValue) {
      case 'lang': // info lang
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang.svg" />;
      case 'search': // search icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg" />;
      case 'notice': // notice icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_notice.svg" />;
      case 'noticeActive': // notice Active icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_notice_active.svg" />;
      case 'close': // close icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />;
      case 'list': // list view icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_view_list.svg" />;
      case 'card': // card view icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_view_card.svg" />;
      case 'cardMo': // card view icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_view_card_mo.svg" />;
      /* 23.03.02 수정 start: Icon 추가 */
      case 'arrowSingle': // card view icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg" />;
      case 'arrowDouble': // card view icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_double_arrow.svg" />;
      /* 23.03.02 수정 end: Icon 추가 */
      /* 23.03.20 수정 start: Icon 추가 */
      case 'info': // more info
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_more.svg" />;
      /* 23.03.20 수정 end: Icon 추가 */
      default:
        return false;
    }
  };

  return (
    <Button
      onClick={onClick}
      block={block}
      className={cn(`btn btn-icon btn-${size}`, circle !== undefined ? circle : '', classnames !== undefined ? classnames : '', activate && 'active')}
      disabled={disabled}
      key={key}
    >
      {viewIcon()}
      <span className={cn('a11y')}>{buttonText}</span>
    </Button>
  );
};
export default IconButton;
