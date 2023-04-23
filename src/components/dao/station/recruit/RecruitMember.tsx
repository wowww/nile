import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';
import { Avatar, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ProfileModal from '@/components/modal/ProfileModal';
import { StationLog } from '@/types/dao/dao.types';
import dayjs from 'dayjs';
import { useNumberFormatter } from '@utils/formatter/number';
import { useLayoutResize } from '@utils/layout';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { fromWei } from 'web3-utils';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useWonder } from '@/hook/useWonder';
import { refreshWonderStationMembersAtom, stationMembersPageAtom, stationMembersPageMetaAtom, wonderStationMembersAtom } from '@/state/daoAtom';
import PaginationCustom from '@components/button/PaginationCustom';
import { NileApiService } from '@/services/nile/api';
import RecruitMemberSkeleton from './RecruitMemberSkeleton';
interface propsType {
  handleOnLoaded: Dispatch<SetStateAction<Boolean>>;
}
const RecruitMember = ({ handleOnLoaded }: propsType) => {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const { t } = useTranslation('dao');
  const { user } = NileApiService();
  const { wonderDao, wonderStationRealTimeInfo } = useWonder();

  const wonderStationMembers = useAtomValue(wonderStationMembersAtom);

  const refreshWonderStationMembers = useSetAtom(refreshWonderStationMembersAtom);

  const { shorthanded } = useNumberFormatter();
  const { shorten } = useWalletFormatter();
  const { isMobile, isTablet } = useLayoutResize();
  const [pageInfo, setPageInfo] = useAtom(stationMembersPageAtom);
  const pageMeta = useAtomValue(stationMembersPageMetaAtom);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<NileUserAccount>();
  const [profiles, setProfiles] = useState<any[]>();

  useEffect(() => {
    if (!wonderStationMembers) {
      refreshWonderStationMembers();
    }
  }, [pageInfo, wonderDao]);

  const onChange = useCallback((page: number, pageSize: number) => {
    setPageInfo((prev) => ({ ...prev, page }));
    refreshWonderStationMembers();
  }, []);

  const MembersTableColumns: ColumnsType<StationLog> = [
    {
      title: t('daoInformationTable.table.th7'),
      dataIndex: 'user',
      key: 'user',
      width: isTablet && !isMobile ? '116px' : isMobile ? '140px' : '160px',
      render: (_, { address, profileImage, nickname }) => {
        return (
          <button
            className={cn('member-cell')}
            onClick={() => {
              setSelectedUser({
                address,
                nickname,
                img: profileImage,
              });
              setIsProfileModalOpen(true);
            }}
          >
            <Avatar className={cn('user-image')} size={20} style={profileImage ? { backgroundImage: `url(${profileImage})` } : {}}>
              <span className={cn('a11y')}>프로필 열기</span>
            </Avatar>
            <span>{nickname ? nickname : shorten(address)}</span>
          </button>
        );
      },
      fixed: 'left',
    },
    {
      title: t('daoInformationTable.table.th8'),
      dataIndex: 'value',
      key: 'value',
      align: 'right',
      className: 'amount-cell',
      width: isTablet && !isMobile ? '120px' : isMobile ? '140px' : '160px',
      render: (_, { amount }) => (
        <>
          <strong>{shorthanded(fromWei(amount ?? '', 'ether'))}</strong> WEMIX
        </>
      ),
      sorter: (a, b) => (Number(b.amount) ?? 0) - (Number(a.amount) ?? 0),
    },
    {
      title: t('daoInformationTable.table.th9'),
      dataIndex: 'greeting',
      key: 'greeting',
      align: 'center',
    },
    {
      title: t('daoInformationTable.table.th10'),
      dataIndex: 'timestamp',
      key: 'timestamp',
      align: 'center',
      width: isTablet && !isMobile ? '130px' : isMobile ? '170px' : '160px',
      render: (_, { timestamp }) => {
        return timestamp ? dayjs.utc(timestamp, dateFormat).local().format(dateFormat) : '-';
      },
      sorter: (a, b) => dayjs(a?.timestamp).valueOf() - dayjs(b?.timestamp).valueOf(),
      showSorterTooltip: false,
    },
  ];
  if (!wonderStationMembers || !wonderStationRealTimeInfo) {
    return <RecruitMemberSkeleton />;
  }
  if (wonderStationMembers && wonderStationRealTimeInfo) {
    handleOnLoaded(true);
  }
  return (
    <div className={cn('recruit-member-wrap')}>
      <strong className={cn('title')}>
        <Trans i18nKey="station.recruiting.table.title" ns="dao" values={{ count: wonderStationRealTimeInfo?.enterCount }}>
          <b></b>
        </Trans>
      </strong>

      {wonderStationMembers && (
        <>
          <Table
            className={cn('table-type-lg recruit-member-table')}
            pagination={false}
            columns={MembersTableColumns}
            dataSource={wonderStationMembers}
            scroll={isMobile ? { x: 936 } : undefined}
            rowKey={(render) => render.id}
          />
          <PaginationCustom
            defaultCurrent={pageInfo?.page}
            activate={pageInfo?.page}
            defaultPageSize={5}
            current={pageMeta?.currentPage}
            total={pageMeta?.totalItems}
            onChange={onChange}
          />
        </>
      )}
      <ProfileModal isOpen={isProfileModalOpen} setIsOpen={setIsProfileModalOpen} nileUser={selectedUser} />
    </div>
  );
};

export default RecruitMember;
