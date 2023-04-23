/* eslint-disable react/no-array-index-key */
// import { atom } from 'recoil';
import Image from 'next/image';
import Link from 'next/link';
import type { ColumnsType } from 'antd/es/table';
import cn from 'classnames';

import { Avatar, Popover } from 'antd';
import Tag from '@/components/tag/Tag';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import React from 'react';
import { useTranslation } from 'next-i18next';

export interface daoHomeTableDataType {
  key?: string;
  date?: string;
  members?: {
    userId?: string;
    imgUrl?: string;
    userDefaultType?: string;
    userGreetings?: string;
    memberPurpose?: string;
    lastActivityDate?: Date;
    votes?: number;
  };
  type?: string;
  transferAmount?: string[];
  wonderRanking?: number;
  wonders?: number;
  gWonderRanking?: number;
  castPower?: number;
  proposalCreated?: number;
  ratio?: string;
  status?: string;
}
interface filterSampleDataType {
  key: string;
  name: string;
  address: string;
  age: number;
}

export interface bidHistoryTableDataType {
  key: string;
  members: {
    userId: string;
    imgUrl?: string;
    userDefaultType?: string;
    lastActivityTime: string;
    canceled: boolean;
    expired: boolean;
  };
  bids: {
    amount: string;
    unit: string;
  };
  date: string;
}

export interface collectionTableDataType {
  key?: string;
  nftLink: string;
  link: string;
  img: string;
  nft: string;
  from: string;
  to: string | null;
  type: string;
  price: string;
  date: string;
  detailDate: string | null;
  whichCancel?: string;
}

export const avatarClick = (userId: string) => {
  console.log(userId);
};

const offersType = (type: string) => {
  if (type === 'Canceled' || type === 'Expired') return true;
};

export const daoHomeTableColumns: ColumnsType<daoHomeTableDataType> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'daoHomeDate',
    align: 'center',
    className: 'padding-default',
  },
  {
    title: 'Members',
    dataIndex: 'members',
    key: 'daoHomeMembers',
    align: 'center',
    render: (_, { members }) => (
      <button type="button" className={cn('btn-user-open inner-name')} onClick={() => avatarClick(members?.userId ?? '')}>
        <Avatar className={cn('user-image')} size={28} style={{ backgroundImage: `url(${members?.imgUrl})` }}>
          <span className={cn('a11y')}>프로필 열기</span>
        </Avatar>
      </button>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'daoHomeStatus',
    align: 'center',
    render: (_, { status }) => {
      let statusType = 'amount-icon-red';
      if (status === 'Unstaking') statusType = 'amount-icon-green';
      return (
        <>
          <span className={cn(`amount-icon ${statusType}`)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_amount.svg" />
            {status}
          </span>
        </>
      );
    },
  },
  {
    title: 'Transfer Amount',
    dataIndex: 'transferAmount',
    key: 'daoHomeTransferAmount',
    align: 'left',
    render: (_, { transferAmount }) => (
      <>
        {transferAmount!.map((amount: string, index: number) => {
          let amountType;
          if (index === 0) amountType = 'amount-icon-red';
          else amountType = 'amount-icon-green';
          return (
            <span className={cn(`amount-icon ${amountType}`)} key={amount + index}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_amount.svg" />
              {amount}
            </span>
          );
        })}
      </>
    ),
  },
  {
    title: 'Ratio',
    dataIndex: 'ratio',
    key: 'daoHomeRatio',
    align: 'center',
  },
];

export const daoHomeTableColumnsData: daoHomeTableDataType[] = [
  {
    key: '1',
    date: '2022-07-01 13:30:34',
    members: {
      imgUrl: 'https://picsum.photos/32/32/?image=1',
    },
    type: 'staking',
    transferAmount: ['10,000,000.0000', '10,000,000.0000'],
    ratio: '1:0.8510',
  },
  {
    key: '2',
    date: '2022-07-01 13:30:34',
    members: {
      imgUrl: 'https://picsum.photos/32/32/?image=2',
    },
    type: 'Unstaking',
    transferAmount: ['10,000,000.0000', '10,000,000.0000'],
    ratio: '1:0.8510',
  },
  {
    key: '3',
    date: '2022-07-01 13:30:34',
    members: {
      imgUrl: 'https://picsum.photos/32/32/?image=3',
    },
    type: 'staking',
    transferAmount: ['10,000,000.0000', '10,000,000.0000'],
    ratio: '1:0.8510',
  },
];

export const filterSampleColumns: ColumnsType<filterSampleDataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
    filterMode: 'tree',
    filterSearch: false,
    onFilter: (value, record) => record.address.startsWith(String(value)),
    width: '30%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: <span>London</span>,
        value: 'London',
      },
      {
        text: <span>New York</span>,
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.startsWith(String(value)),
    filterSearch: true,
    width: '40%',
  },
];

export const filterSampleData: filterSampleDataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

// 스테이션 모집 완료 멤버 탭 테이블
export const daoStationTableColumns: ColumnsType<daoHomeTableDataType> = [
  {
    title: 'Member',
    dataIndex: 'members',
    key: 'daoStationMember',
    align: 'left',
    render: (_, { members }) => (
      <button type="button" className={cn('btn-user-open inner-name')} onClick={() => avatarClick(members?.userId ?? '')}>
        <Avatar
          className={cn('user-image', members?.userDefaultType)}
          size={20}
          style={members?.imgUrl !== undefined ? { backgroundImage: `url(${members?.imgUrl})` } : {}}
        >
          <span className={cn('a11y')}>프로필 열기</span>
        </Avatar>
        <span>{members?.userId}</span>
      </button>
    ),
  },
  {
    title: 'WONDER Ranking',
    dataIndex: 'wonderRanking',
    key: 'daoStationWRanking',
    align: 'center',
    sorter: (a, b) => (a.wonderRanking ?? 0) - (b.wonderRanking ?? 0),
  },
  {
    title: 'WONDERs',
    dataIndex: 'wonders',
    key: 'daoStationWonders',
    align: 'center',
    sorter: (a, b) => (a.wonders ?? 0) - (b.wonders ?? 0),
    render: (_, { wonders }) =>
      `${Number(wonders)
        .toFixed(3)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} WONDER`,
  },
  {
    title: 'gWONDER Ranking',
    dataIndex: 'gWonderRanking',
    key: 'daoStationGWRanking',
    align: 'center',
    sorter: (a, b) => (a.gWonderRanking ?? 0) - (b.gWonderRanking ?? 0),
  },
  {
    title: 'Cast Power',
    dataIndex: 'castPower',
    key: 'daoStationCastPower',
    align: 'center',
    sorter: (a, b) => (a.castPower ?? 0) - (b.castPower ?? 0),
    render: (_, { castPower }) =>
      `${Number(castPower)
        .toFixed(3)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} gWONDER`,
  },
  {
    title: 'Proposal Created',
    dataIndex: 'proposalCreated',
    key: 'daoStationProposalCreated',
    align: 'center',
    sorter: (a, b) => (a.proposalCreated ?? 0) - (b.proposalCreated ?? 0),
  },
];

export const daoStationTableColumnsData: daoHomeTableDataType[] = [
  {
    key: '1',
    members: {
      userDefaultType: 'type1',
      imgUrl: 'https://picsum.photos/32/32/?image=1',
      userGreetings: 'Hi there!',
      memberPurpose: 'INVEST',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 1,
    wonders: 10000000.0,
    gWonderRanking: 3,
    castPower: 10000000.0,
    proposalCreated: 52,
  },
  {
    key: '2',
    members: {
      userDefaultType: 'type2',
      userGreetings: 'Hi there!',
      memberPurpose: 'FUN',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 2,
    wonders: 10000000.0,
    gWonderRanking: 5,
    castPower: 10000000.0,
    proposalCreated: 4,
  },
  {
    key: '3',
    members: {
      userDefaultType: 'type3',
      imgUrl: 'https://picsum.photos/32/32/?image=1',
      userGreetings: '',
      memberPurpose: 'FRIENDSHIP',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 3,
    wonders: 10000000.0,
    gWonderRanking: 2,
    castPower: 10000000.0,
    proposalCreated: 25,
  },
  {
    key: '4',
    members: {
      userDefaultType: 'type4',
      imgUrl: 'https://picsum.photos/32/32/?image=1',
      userGreetings: 'Hi there!',
      memberPurpose: 'MANAGE',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 4,
    wonders: 10000000.0,
    gWonderRanking: 1,
    castPower: 10000000.0,
    proposalCreated: 58,
  },
  {
    key: '5',
    members: {
      userDefaultType: 'type5',
      userGreetings: 'Hi there!',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 5,
    wonders: 10000000.0,
    gWonderRanking: 8,
    castPower: 10000000.0,
    proposalCreated: 12,
  },
  {
    key: '6',
    members: {
      userDefaultType: 'type1',
      userGreetings: 'Hi there!',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 6,
    wonders: 10000000.0,
    gWonderRanking: 4,
    castPower: 10000000.0,
    proposalCreated: 139,
  },
  {
    key: '7',
    members: {
      userDefaultType: 'type1',
      imgUrl: 'https://picsum.photos/32/32/?image=1',
      userGreetings: 'Hi there!',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 7,
    wonders: 10000000.0,
    gWonderRanking: 7,
    castPower: 10000000.0,
    proposalCreated: 23,
  },
  {
    key: '8',
    members: {
      userDefaultType: 'type2',
      imgUrl: 'https://picsum.photos/32/32/?image=1',
      userGreetings: 'Hi there!',
      memberPurpose: 'INVEST',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 8,
    wonders: 10000000.0,
    gWonderRanking: 9,
    castPower: 10000000.0,
    proposalCreated: 1,
  },
  {
    key: '9',
    members: {
      userDefaultType: 'type3',
      imgUrl: 'https://picsum.photos/32/32/?image=1',
      userGreetings: 'Hi there!',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 9,
    wonders: 10000000.0,
    gWonderRanking: 6,
    castPower: 10000000.0,
    proposalCreated: 4,
  },
  {
    key: '10',
    members: {
      userDefaultType: 'type4',
      userGreetings: 'Hi there!',
      memberPurpose: 'INVEST',
      lastActivityDate: new Date('2022, 8, 18'),
      votes: 121,
    },
    wonderRanking: 10,
    wonders: 10000000.0,
    gWonderRanking: 10,
    castPower: 10000000.0,
    proposalCreated: 76,
  },
];

// marketplace detail bidding history 모달 테이블
// export const bidHistoryTableColumnsBuy: ColumnsType<bidHistoryTableDataType> = [
//   {
//     title: 'User',
//     dataIndex: 'user',
//     key: 'bidHistoryUser',
//     align: 'left',
//     render: (_, { members }) => (
//       <button type="button" className={cn('btn-user-open inner-name')} onClick={() => !members.canceled && avatarClick(members?.userId ?? '')}>
//         <Avatar
//           className={cn('user-image', members?.userDefaultType)}
//           size={32}
//           style={members?.imgUrl !== undefined ? { backgroundImage: `url(${members?.imgUrl})` } : {}}
//         >
//           <span className={cn('a11y')}>프로필 열기</span>
//         </Avatar>
//         <span>
//           <span className={cn('user-id')}>{members?.userId}</span>
//           <span className={cn('activity-time')}>{members?.lastActivityTime}</span>
//         </span>
//       </button>
//     ),
//     // width: 192,
//     className: 'user-cell',
//   },
//   {
//     title: 'Bids',
//     dataIndex: 'bids',
//     key: 'bidHistoryBids',
//     align: 'right',
//     render: (_, { bids, members }) => (
//       <>
//         <span className={cn('bid-amount')}>
//           {bids.amount} {bids.unit}
//         </span>
//         {members.canceled && (
//           <Tag size="s" color="light-gray">
//             Canceled
//           </Tag>
//         )}
//       </>
//     ),
//     width: 160,
//     className: 'bids-cell',
//   },
//   { title: 'Date', dataIndex: 'date', key: 'bidHistoryDate', align: 'center', width: 140, className: 'bid-date' },
// ];

// export const bidHistoryTableColumnsDataBuy: bidHistoryTableDataType[] = [
//   {
//     key: '1',
//     members: {
//       userId: '0x3650...601F8',
//       imgUrl: 'https://picsum.photos/32/32/?image=1',
//       lastActivityTime: '10초전',
//       canceled: false,
//       expired: false,
//     },
//     bids: {
//       amount: '1,000,000.00',
//       unit: 'WEMIX$',
//     },
//     date: '2022-09-10 13:00:00',
//   },
//   {
//     key: '2',
//     members: {
//       userId: '0x3650...601F9',
//       userDefaultType: 'type2',
//       lastActivityTime: '10초전',
//       canceled: true,
//       expired: false,
//     },
//     bids: {
//       amount: '1,000,000.00',
//       unit: 'WEMIX$',
//     },
//     date: '2022-09-10 13:00:00',
//   },
//   {
//     key: '3',
//     members: {
//       userId: '0x3650...601F9',
//       userDefaultType: 'type3',
//       lastActivityTime: '10초전',
//       canceled: false,
//       expired: true,
//     },
//     bids: {
//       amount: '1,000,000.00',
//       unit: 'WEMIX$',
//     },
//     date: '2022-09-10 13:00:00',
//   },
//   {
//     key: '4',
//     members: {
//       userId: '0x3650...601F9',
//       userDefaultType: 'type4',
//       lastActivityTime: '10초전',
//       canceled: false,
//       expired: false,
//     },
//     bids: {
//       amount: '1,000,000.00',
//       unit: 'WEMIX$',
//     },
//     date: '2022-09-10 13:00:00',
//   },
//   {
//     key: '5',
//     members: {
//       userId: '0x3650...601F9',
//       userDefaultType: 'type5',
//       lastActivityTime: '10초전',
//       canceled: false,
//       expired: false,
//     },
//     bids: {
//       amount: '1,000,000.00',
//       unit: 'WEMIX$',
//     },
//     date: '2022-09-10 13:00:00',
//   },
//   {
//     key: '6',
//     members: {
//       userId: '0x3650...601F9',
//       userDefaultType: 'type5',
//       lastActivityTime: '10초전',
//       canceled: false,
//       expired: false,
//     },
//     bids: {
//       amount: '1,000,000.00',
//       unit: 'WEMIX$',
//     },
//     date: '2022-09-10 13:00:00',
//   },
//   {
//     key: '7',
//     members: {
//       userId: '0x3650...601F9',
//       userDefaultType: 'type5',
//       lastActivityTime: '10초전',
//       canceled: false,
//       expired: false,
//     },
//     bids: {
//       amount: '1,000,000.00',
//       unit: 'WEMIX$',
//     },
//     date: '2022-09-10 13:00:00',
//   },
//   {
//     key: '8',
//     members: {
//       userId: '0x3650...601F9',
//       userDefaultType: 'type5',
//       lastActivityTime: '10초전',
//       canceled: false,
//       expired: false,
//     },
//     bids: {
//       amount: '1,000,000.00',
//       unit: 'WEMIX$',
//     },
//     date: '2022-09-10 13:00:00',
//   },
// ];

export const bidHistoryTableColumnsSell: ColumnsType<bidHistoryTableDataType> = [
  {
    title: 'User',
    dataIndex: 'user',
    key: 'bidHistoryUser',
    align: 'left',
    render: (_, { members }) => (
      <button
        type="button"
        className={cn('btn-user-open inner-name')}
        onClick={() => !members.canceled && !members.expired && avatarClick(members?.userId ?? '')}
      >
        <Avatar
          className={cn('user-image', members?.userDefaultType)}
          size={32}
          style={members?.imgUrl !== undefined ? { backgroundImage: `url(${members?.imgUrl})` } : {}}
        >
          <span className={cn('a11y')}>프로필 열기</span>
        </Avatar>
        <span>
          <span className={cn('user-id')}>{members?.userId}</span>
          <span className={cn('activity-time')}>{members?.lastActivityTime}</span>
        </span>
      </button>
    ),
    // width: 192,
    className: 'user-cell',
  },
  {
    title: 'Offers',
    dataIndex: 'bids',
    key: 'bidHistoryBids',
    align: 'right',
    render: (_, { bids, members }) => (
      <>
        <span className={cn('bid-amount')}>
          {bids.amount} {bids.unit}
        </span>
        {members.canceled && (
          <Tag size="s" color="light-gray">
            Canceled
          </Tag>
        )}
        {members.expired && (
          <Tag size="s" color="light-gray">
            Expired
          </Tag>
        )}
      </>
    ),
    width: 160,
    className: 'bids-cell',
  },
  { title: 'Date', dataIndex: 'date', key: 'bidHistoryDate', align: 'center', width: 140, className: 'bid-date' },
];
export const bidHistoryTableColumnsDataSell: bidHistoryTableDataType[] = [
  {
    key: '1',
    members: {
      userId: '0x3650...601F8',
      imgUrl: 'https://picsum.photos/32/32/?image=1',
      lastActivityTime: '10초전',
      canceled: false,
      expired: false,
    },
    bids: {
      amount: '1,000,000.00',
      unit: 'WEMIX$',
    },
    date: '2022-09-10 13:00:00',
  },
  {
    key: '2',
    members: {
      userId: '0x3650...601F9',
      userDefaultType: 'type2',
      lastActivityTime: '10초전',
      canceled: true,
      expired: false,
    },
    bids: {
      amount: '1,000,000.00',
      unit: 'WEMIX$',
    },
    date: '2022-09-10 13:00:00',
  },
  {
    key: '3',
    members: {
      userId: '0x3650...601F9',
      userDefaultType: 'type3',
      lastActivityTime: '10초전',
      canceled: false,
      expired: true,
    },
    bids: {
      amount: '1,000,000.00',
      unit: 'WEMIX$',
    },
    date: '2022-09-10 13:00:00',
  },
  {
    key: '4',
    members: {
      userId: '0x3650...601F9',
      userDefaultType: 'type4',
      lastActivityTime: '10초전',
      canceled: false,
      expired: false,
    },
    bids: {
      amount: '1,000,000.00',
      unit: 'WEMIX$',
    },
    date: '2022-09-10 13:00:00',
  },
  {
    key: '5',
    members: {
      userId: '0x3650...601F9',
      userDefaultType: 'type5',
      lastActivityTime: '10초전',
      canceled: false,
      expired: false,
    },
    bids: {
      amount: '1,000,000.00',
      unit: 'WEMIX$',
    },
    date: '2022-09-10 13:00:00',
  },
  {
    key: '6',
    members: {
      userId: '0x3650...601F9',
      userDefaultType: 'type5',
      lastActivityTime: '10초전',
      canceled: false,
      expired: false,
    },
    bids: {
      amount: '1,000,000.00',
      unit: 'WEMIX$',
    },
    date: '2022-09-10 13:00:00',
  },
  {
    key: '7',
    members: {
      userId: '0x3650...601F9',
      userDefaultType: 'type5',
      lastActivityTime: '10초전',
      canceled: false,
      expired: false,
    },
    bids: {
      amount: '1,000,000.00',
      unit: 'WEMIX$',
    },
    date: '2022-09-10 13:00:00',
  },
  {
    key: '8',
    members: {
      userId: '0x3650...601F9',
      userDefaultType: 'type5',
      lastActivityTime: '10초전',
      canceled: false,
      expired: false,
    },
    bids: {
      amount: '1,000,000.00',
      unit: 'WEMIX$',
    },
    date: '2022-09-10 13:00:00',
  },
];

/* 22.11.01 수정: whichCancel 데이터 추가 */
export const collectionTableColumnsData: collectionTableDataType[] = [
  {
    key: '1',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_collection_represent.png',
    nft: 'abcdefghijklnmopqrstuvwxyzabcdefghijkln abcdefghijklnmopqrstuvwxyznmopqrstuv',
    from: '0x34fd...df67',
    to: '0x34fd...df67',
    type: 'Sale',
    price: '1,000,000.000 WEMIX$',
    date: '2022-08-23 14:52',
    detailDate: null,
  },
  {
    key: '2',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_ranking.png',
    nft: '024 Hounslow West ',
    from: '0x34fd...df67',
    to: null,
    type: 'Listing',
    price: '14,000 WEMIX$',
    date: '3 hours ago',
    detailDate: '2022-08-23 14:52',
  },
  {
    key: '3',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_ranking.png',
    nft: 'B01 Baker street',
    from: '0x34fd...df67',
    to: '0x34fd...df67',
    type: 'Offer',
    price: '1,000,000.000 WEMIX$',
    date: '1 minutes ago',
    detailDate: '2022-08-23 14:52',
  },
  {
    key: '4',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_ranking.png',
    nft: 'B01 Baker street',
    from: '0x34fd...df67',
    to: '0x34fd...df67',
    type: 'Canceled',
    whichCancel: 'Listing',
    price: '1,000,000.000 WEMIX$',
    date: '30 minutes ago',
    detailDate: '2022-08-23 14:52',
  },
  {
    key: '5',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_ranking.png',
    nft: 'B01 Baker street',
    from: '0x34fd...df67',
    to: '0x34fd...df67',
    type: 'Expired',
    whichCancel: 'Binding',
    price: '14,000 WEMIX$',
    date: '1 minutes ago',
    detailDate: '2022-08-23 14:52',
  },
  {
    key: '6',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_ranking.png',
    nft: 'B01 Baker street',
    from: '0x34fd...df67',
    to: '0x34fd...df67',
    type: 'Transfer',
    price: '1,000,000.000 WEMIX$',
    date: '2022-08-23 14:52',
    detailDate: null,
  },
  {
    key: '7',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_collection_represent.png',
    nft: 'B01 Baker street',
    from: '0x34fd...df67',
    to: '0x34fd...df67',
    type: 'Sale',
    price: '1,000,000.000 WEMIX$',
    date: '1 minutes ago',
    detailDate: '2022-08-23 14:52',
  },
  {
    key: '8',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_ranking.png',
    nft: '024 Hounslow West ',
    from: '0x34fd...df67',
    to: null,
    type: 'Listing',
    price: '1,000,000.000 WEMIX$',
    date: '1 minutes ago',
    detailDate: '2022-08-23 14:52',
  },
  {
    key: '9',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_ranking.png',
    nft: 'B01 Baker street',
    from: '0x34fd...df67',
    to: '0x34fd...df67',
    type: 'Offer',
    price: '1,000,000.000 WEMIX$',
    date: '1 minutes ago',
    detailDate: '2022-08-23 14:52',
  },
  {
    key: '10',
    nftLink: '/',
    link: '/',
    img: '/temp/@temp_ranking.png',
    nft: 'B01 Baker street',
    from: '0x34fd...df67',
    to: '0x34fd...df67',
    type: 'Canceled',
    whichCancel: 'Binding',
    price: '1,000,000.000 WEMIX$',
    date: '30 minutes ago',
    detailDate: '2022-08-23 14:52',
  },
];

export const collectionTableColumns: ColumnsType<collectionTableDataType> = [
  {
    title: 'NFT',
    key: 'nft',
    align: 'left',
    render: (_, { nftLink, nft, img, type }) => (
      <div className={cn('nft-wrap')}>
        <div className="img-wrap">
          <Image src={img} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
        </div>
        {/* 22.11.01 수정: 환불 받기 버튼 추가 */}
        <div className={cn('text-wrap', type === 'Expired' && 'isBtn')}>
          <Link href={nftLink}>
            <a>{nft}</a>
          </Link>
          {type === 'Expired' && <button className={cn('refund-btn')}>환불받기</button>}
        </div>
      </div>
    ),
  },
  {
    title: 'From To',
    key: 'fromto',
    align: 'center',
    render: (_, { from, to }) => (
      <div className={cn('fromto-wrap')}>
        <button type="button" onClick={() => {}}>
          {from}
        </button>
        {to && <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_table_arrow.svg" />}
        <button type="button" onClick={() => {}}>
          {to}
        </button>
      </div>
    ),
  },
  {
    title: 'Type',
    key: 'type',
    align: 'center',
    render: (_, { type, whichCancel }) => (
      <div className={cn('type-wrap', { cancel: offersType(type) })}>
        {offersType(type) ? (
          <>
            <span>{whichCancel}</span>
            <Tag size="s" color="light-gray">
              {type}
            </Tag>
          </>
        ) : (
          <span>{type}</span>
        )}
      </div>
    ),
  },
  {
    title: 'Price',
    key: 'price',
    align: 'right',
    className: 'align-right',
    render: (_, { type, price }) => <div className={cn('price-wrap', { cancel: offersType(type) })}>{price}</div>,
  },
  {
    title: 'Date',
    key: 'date',
    align: 'right',
    className: 'align-right',
    render: (_, { link, date, detailDate }) => (
      <Link href={link}>
        <a className={cn('time-wrap')}>
          {detailDate === null ? (
            <>{date}</>
          ) : (
            <div className={cn('tooltip-wrap')}>
              <Popover
                overlayClassName="tooltip"
                placement="top"
                content={<div className={cn('tooltip-contents')}>{detailDate}</div>}
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                {date}
              </Popover>
            </div>
          )}
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </a>
      </Link>
    ),
  },
];
