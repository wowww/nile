/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

interface tagPropsType {
  dataText: string;
  option: string;
}

const TagData: React.FC<tagPropsType> = ({ dataText, option }) => {
  return option === 'up' ? (
    <span className={cn('tag-data data-up')}>
      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_data.svg' />
      {dataText}
    </span>
  ) : (
    <span className={cn('tag-data data-down')}>
      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_data.svg' />
      {dataText}
    </span>
  );
};
export default TagData;
