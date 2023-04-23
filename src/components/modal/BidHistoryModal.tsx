import cn from 'classnames';
import { Avatar, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'next-i18next';
import Tag from '@/components/tag/Tag';
import NileNft, { NileBidding, NileOrderStatusType } from '@/models/nile/marketplace/NileNft';
import { useWalletFormatter } from '@utils/formatter/wallet';
import dayjs from 'dayjs';
import { useUnitFormatter } from '@utils/formatter/unit';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { useNileNft } from '@/hook/useNileNft';
import React, { useCallback, useMemo, useState } from 'react';
import { useNumberFormatter } from '@utils/formatter/number';
import dynamic from 'next/dynamic';
import ProfileModal from '@components/modal/ProfileModal';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';
import { fromWei } from 'web3-utils';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface ModalProps {
  nft?: NileNft;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface TableDataType {
  key?: string;
  bidding?: NileBidding;
  canceled?: boolean;
}

const BidHistoryModal = ({ nft, isOpen, setIsOpen }: ModalProps) => {
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');
  const nileWallet = useAtomValue(nileWalletAtom);

  const { t } = useTranslation('common');
  const { lastOrder } = useNileNft(nft);
  const { shorthanded } = useNumberFormatter();

  const { shorten } = useWalletFormatter();

  const { getPaymentUnit } = useUnitFormatter();

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<NileUserAccount>();

  const biddingHistory = useMemo(() => {
    return lastOrder?.biddingList ?? [];
  }, [nft]);

  const calcRemainTime = useCallback(
    (bidding?: NileBidding) => {
      const createdAt = dayjs.utc(bidding?.createdAt);

      const remainDays = dayjs().diff(createdAt, 'day');
      const remainHours = dayjs().diff(createdAt, 'hour');
      const remainMinutes = dayjs().diff(createdAt, 'minute');
      const remainSeconds = dayjs().diff(createdAt, 'second');

      if (remainDays >= 1) {
        if (remainDays === 0) {
          return '1 days ago';
        } else {
          return createdAt.format('YYYY-MM-DD');
        }
      }

      if (remainHours > 0) {
        return `${remainHours} hours ago`;
      }

      if (remainMinutes > 0) {
        return `${remainMinutes} minutes ago`;
      }

      if (remainSeconds > 0) {
        return `${remainSeconds} seconds ago`;
      }
    },
    [biddingHistory],
  );

  const tableColumns: ColumnsType<TableDataType> = [
    {
      title: t('bidHistoryPopup.th1', { ns: 'common' }),
      dataIndex: 'user',
      key: 'bidHistoryUser',
      align: 'left',
      render: (_, { bidding }) => (
        <button type="button" className={cn('btn-user-open inner-name')}>
          <Avatar
            className={cn('user-image', `type${bidding?.profile?.themeIndex}`)}
            size={32}
            style={bidding?.profile?.img ? { backgroundImage: `url(${bidding?.profile?.img})` } : {}}
          >
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          <span>
            <span
              className={cn('user-id profile-modal-btn')}
              onClick={() => {
                setIsProfileOpen(true);
                setProfile(bidding?.profile);
              }}
            >
              {shorten(bidding?.address)}
            </span>
            <span className={cn('activity-time')}>{calcRemainTime(bidding)}</span>
          </span>
        </button>
      ),
      className: 'user-cell',
    },
    {
      title: t('bidHistoryPopup.th2', { ns: 'common' }),
      dataIndex: 'bids',
      key: 'bidHistoryBids',
      align: 'right',
      render: (_, { bidding, canceled }) => (
        <>
          <span className={cn('bid-amount')}>
            {shorthanded(Number(fromWei(String(bidding?.price), 'ether')))} {getPaymentUnit(nft?.token?.payment)}
          </span>
          {canceled && (
            <Tag size="s" color="light-gray">
              {t('bidHistoryPopup.canceled')}
            </Tag>
          )}
        </>
      ),
      width: 160,
      className: 'bids-cell',
    },
    {
      title: t('bidHistoryPopup.th3', { ns: 'common' }),
      dataIndex: 'date',
      key: 'bidHistoryDate',
      align: 'center',
      render: (_, { bidding }) => dayjs.utc(bidding?.createdAt).local().format('YYYY-MM-DD HH:mm:ss'),
      width: 140,
      className: 'bid-date',
    },
  ];

  const tableData: TableDataType[] =
    biddingHistory?.map((bidding) => ({
      key: bidding.id,
      bidding,
      canceled: bidding?.status === NileOrderStatusType.CANCELED,
    })) ?? [];

  return (
    <>
      <ModalLayout
        wrapClassName="bid-history-modal-wrap"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="md"
        title={t('bidHistoryPopup.title')}
        subTitle={t('offerHistoryPopup.desc')}
        destroyOnClose={true}
      >
        <div className={cn('bid-history-modal')}>
          <Table
            className={cn('table-type-md')}
            columns={tableColumns}
            dataSource={tableData}
            pagination={false}
            rowClassName={(record) => {
              if (record.canceled) {
                return 'canceled-bid';
              }
              if (record.bidding?.address?.toLowerCase() === nileWallet.toLowerCase()) {
                return 'own-bid';
              }
              return '';
            }}
            scroll={{ x: isMobile ? 492 : undefined }}
          />
        </div>
      </ModalLayout>
      <ProfileModal isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} nileUser={profile} />
    </>
  );
};

export default BidHistoryModal;
