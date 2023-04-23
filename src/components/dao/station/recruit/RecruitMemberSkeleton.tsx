import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StationLog } from '@/types/dao/dao.types';
import { useLayoutResize } from '@utils/layout';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useWonder } from '@/hook/useWonder';
import { refreshWonderStationMembersAtom, stationMembersPageAtom, wonderStationMembersAtom } from '@/state/daoAtom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { UserInfoStatus } from '@/types/contract.types';

const RecruitMemberSkeleton = () => {
  const { wonderDao } = useWonder();

  const wonderStationMembers = useAtomValue(wonderStationMembersAtom);
  const refreshWonderStationMembers = useSetAtom(refreshWonderStationMembersAtom);
  const { isMobile, isTablet } = useLayoutResize();
  const [pageInfo, setPageInfo] = useAtom(stationMembersPageAtom);

  useEffect(() => {
    if (!wonderStationMembers) {
      refreshWonderStationMembers();
    }
  }, [pageInfo, wonderDao]);

  const MembersTableColumns: ColumnsType<StationLog> = [
    {
      title: <Skeleton />,
      dataIndex: 'user',
      key: 'user',
      width: isTablet && !isMobile ? '116px' : isMobile ? '140px' : '160px',
      render: () => {
        return <Skeleton />;
      },
      fixed: 'left',
    },
    {
      title: <Skeleton />,
      dataIndex: 'value',
      key: 'value',
      align: 'right',
      className: 'amount-cell',
      width: isTablet && !isMobile ? '120px' : isMobile ? '140px' : '160px',
      render: () => <Skeleton />,
    },
    {
      title: <Skeleton />,
      dataIndex: 'greeting',
      key: 'greeting',
      align: 'center',
      render: () => <Skeleton />,
    },
    {
      title: <Skeleton />,
      dataIndex: 'timestamp',
      key: 'timestamp',
      align: 'center',
      width: isTablet && !isMobile ? '130px' : isMobile ? '170px' : '160px',
      render: () => <Skeleton />,
    },
  ];

  const MockMemberSource: StationLog[] = [
    {
      id: 'asd',
      daoId: 1,
      address: 'asdasdasdasd',
      reOpenId: 2,
      status: UserInfoStatus.ENTER,
    },
    {
      id: 'asd',
      daoId: 1,
      address: 'asdasdasdasd',
      reOpenId: 2,
      status: UserInfoStatus.ENTER,
    },
    {
      id: 'asd',
      daoId: 1,
      address: 'asdasdasdasd',
      reOpenId: 2,
      status: UserInfoStatus.ENTER,
    },
    {
      id: 'asd',
      daoId: 1,
      address: 'asdasdasdasd',
      reOpenId: 2,
      status: UserInfoStatus.ENTER,
    },
    {
      id: 'asd',
      daoId: 1,
      address: 'asdasdasdasd',
      reOpenId: 2,
      status: UserInfoStatus.ENTER,
    },
  ];
  return (
    <div className={cn('recruit-member-wrap')}>
      <strong className={cn('title')}>
        <Skeleton />
      </strong>

      {
        <>
          <Table
            className={cn('table-type-lg recruit-member-table')}
            pagination={false}
            columns={MembersTableColumns}
            dataSource={MockMemberSource}
            scroll={isMobile ? { x: 936 } : undefined}
            rowKey={(render) => render.id}
          />
        </>
      }
    </div>
  );
};

export default RecruitMemberSkeleton;
