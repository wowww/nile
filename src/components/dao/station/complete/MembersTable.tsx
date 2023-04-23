import {useCallback, useState} from 'react';
import cn from 'classnames';
import { Avatar, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StationMemberType } from './TabMembers';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
/* 23.02.23 수정: daoThemeAtom, useAtomValue 추가 */
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';
import dayjs from 'dayjs';

interface Props {
  list?: any;
}

const MembersTable = ({ list }: Props) => {
  const { t } = useTranslation('dao');

  const activeDao = useAtomValue(daoThemeAtom);

  const daoStationTableColumns: ColumnsType<StationMemberType> = [
    {
      title: t('station.complete.table.header.1'),
      dataIndex: 'members',
      key: 'daoStationMember',
      fixed: 'left',
      align: 'left',
      width: 120,
      render: (_, { profile }) => (
        <button type="button" className={cn('btn-user-open inner-name')}>
          <Avatar className={cn('user-image')} size={20} style={profile.imgUrl !== '' ? { backgroundImage: `url(${profile.imgUrl})` } : {}}>
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          <span>{profile.userId}</span>
        </button>
      ),
    },
    {
      title: t('station.complete.table.header.3', { type: useDaoCharacterConvert(activeDao.value) }),
      dataIndex: 'figure.wonder',
      key: 'daoStationWonders',
      align: 'right',
      width: 160,
      sorter: (a, b) => (a.figure.wonder ?? 0) - (b.figure.wonder ?? 0),
      render: (_, { figure }) =>
        `${useNumberFormatterToFix(figure.wonder)} ${t('unit1', {
          ns: 'dao',
          keyPrefix: `amountUnit.${activeDao.value}`,
        })}`,
    },
    {
      title: t('station.complete.table.greeting'),
      dataIndex: 'profile.introduce',
      key: 'daoStationProposalCreated',
      align: 'center',
      render: (_, { profile }) => <span>{profile.introduce}</span>,
    },
    {
      title: t('station.complete.table.participateDate'),
      dataIndex: 'participateDate',
      key: 'daoStationProposal',
      align: 'center',
      width: 160,
      sorter: (a, b) => (Number(dayjs(a.participateDate)) ?? 0) - (Number(dayjs(b.participateDate)) ?? 0),
      render: (_, { participateDate }) => <span>{participateDate}</span>,
    },
    // 23.02.28 수정 END: 기획 변경으로 인한 데이터 변경
  ];

  return (
    <>
      <Table
        className={cn('table-type-lg', 'station-member-table')}
        columns={daoStationTableColumns}
        dataSource={list}
        pagination={false}
        scroll={{ x: 936 }}
        rowKey={(render)=> render.id}
      />
    </>
  );
};

export default MembersTable;
