/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import cn from 'classnames';
import { Input, Select } from 'antd';
import IconArrow from '@images/icon/ico_arrow_16.svg';
import IconButton from '@components/button/IconButton';

const { Option } = Select;
interface PaginationPropsType {
  total: number;
  jumpArray?: [25, 50, 100];
}

const PaginationTransaction: React.FC<PaginationPropsType> = ({ jumpArray = [25, 50, 100], total }) => {
  const [jumpValue, setJumpValue] = useState(jumpArray[0]);

  return (
    <div className={cn('pagination-transaction-wrap')}>
      <div className={cn('jump-pagination')}>
        <span>Show</span>
        <Select
          size="small"
          defaultValue={jumpArray[0]}
          suffixIcon={<IconArrow />}
          popupClassName="select-size-sm-dropdown"
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          onChange={setJumpValue}
        >
          {jumpArray.map((value, index) => (
            <React.Fragment key={`${value}-${index}`}>
              <Option value={value}>{value}</Option>
            </React.Fragment>
          ))}
        </Select>
        <span>Transactions/Page</span>
      </div>
      <div className={cn('input-pagination')}>
        <IconButton size="32" iconValue="arrowDouble" buttonText="first" classnames="pagination-first" disabled={true} />
        <IconButton size="32" iconValue="arrowSingle" buttonText="prev" classnames="pagination-prev" disabled={true} />
        <div className={cn('pagination-input-wrap')}>
          <Input size="small" value={1} />
          <span>/ {total / jumpValue}</span>
        </div>
        <IconButton size="32" iconValue="arrowSingle" buttonText="next" classnames="pagination-next" />
        <IconButton size="32" iconValue="arrowDouble" buttonText="last" classnames="pagination-last" />
      </div>
    </div>
  );
};
export default PaginationTransaction;
