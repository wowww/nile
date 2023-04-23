import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { Avatar, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  data: TableItemType[];
}

export interface TableItemType {
  key?: number;
  user: {
    profileImg?: string;
    walletAddress: string;
  };
}

const TableColumns: ColumnsType<TableItemType> = [
  {
    title: '대상 멤버 지갑 주소',
    dataIndex: 'user',
    key: 'user',
    align: 'center',
    render: (_, { user }) => (
      <div className={cn('user-cell')}>
        <Avatar className={cn('user-image')} size={20} style={user.profileImg !== undefined ? { backgroundImage: `url(${user.profileImg})` } : {}} />
        <span className={cn('wallet-address')}>{user.walletAddress}</span>
      </div>
    ),
  },
];

const SignatureTargetTable = ({ data }: Props): ReactElement => {
  return <Table className={cn('table-type-lg', 'maker-signature-table')} columns={TableColumns} dataSource={data} pagination={false} />;
};

export { SignatureTargetTable };
