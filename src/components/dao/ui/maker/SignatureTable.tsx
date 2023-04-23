import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { Avatar, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Tag from '@/components/tag/Tag';

export interface TableItemType {
  user: {
    isWriter?: boolean;
    profileImg?: string;
    walletAddress: string;
  };
  isSigned?: boolean;
  signDate?: string;
}

interface Props {
  data: TableItemType[];
}

const TableColumns: ColumnsType<TableItemType> = [
  {
    title: '대상 멤버 지갑 주소',
    dataIndex: 'user',
    key: 'user',
    align: 'center',
    render: (_, { user }) => (
      <div className={cn('user-cell')}>
        {user.isWriter && (
          <Tag color="primary" size="xs">
            작성자
          </Tag>
        )}
        <Avatar
          className={cn('user-image', user.isWriter ? 'has-tag' : 'no-tag')}
          size={20}
          style={user.profileImg !== undefined ? { backgroundImage: `url(${user.profileImg})` } : {}}
        />
        <span className={cn('wallet-address')}>{user.walletAddress}</span>
      </div>
    ),
  },
  {
    title: '서명 여부',
    dataIndex: 'isSigned',
    key: 'isSigned',
    align: 'center',
    width: 210,
    render: (_, { isSigned }) => <span>{isSigned ? '서명 완료' : '미서명'}</span>,
  },
  {
    title: '서명 일시',
    dataIndex: 'signDate',
    key: 'signDate',
    align: 'center',
    width: 210,
    render: (_, { signDate }) => <span>{signDate ? signDate : '-'}</span>,
  },
];

const SignatureTable = ({ data }: Props): ReactElement => {
  return <Table className={cn('table-type-lg', 'maker-signature-table')} columns={TableColumns} dataSource={data} pagination={false} />;
};

export { SignatureTable };
