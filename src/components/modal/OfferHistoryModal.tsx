import cn from 'classnames';
import BgButton from '@/components/button/BgButton';
import { Avatar, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'next-i18next';
import Tag from '@/components/tag/Tag';
import NileNft, { NileNftOrder, NileOrderStatusType } from '@/models/nile/marketplace/NileNft';
import { useWalletFormatter } from '@utils/formatter/wallet';
import dayjs from 'dayjs';
import { useUnitFormatter } from '@utils/formatter/unit';
import React, { useCallback, useMemo, useState } from 'react';
import { useCountdown } from '@utils/countdown';
import { useNumberFormatter } from '@utils/formatter/number';
import dynamic from 'next/dynamic';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';
import { fromWei } from 'web3-utils';

const ModalLayout = dynamic(() => import('@/components/modal/ModalLayout'), { ssr: false });
const AcceptOfferModal = dynamic(() => import('@components/modal/Payment/AcceptOfferModal'), { ssr: false });

interface ModalProps {
  nft?: NileNft;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  modalEvent?: () => void;
}

type TableDataType = {
  key?: string;
  offer?: NileNftOrder;
  canceled?: boolean;
  expired?: boolean;
};

const OfferHistoryModal = ({ nft, isOpen, setIsOpen }: ModalProps) => {
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { t } = useTranslation('common');

  const { shorten } = useWalletFormatter();
  const { shorthanded } = useNumberFormatter();

  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });

  const { getPaymentUnit } = useUnitFormatter();
  const [isAcceptOfferModal, setIsAcceptOfferModal] = useState<boolean>(false);

  const [selectedOffer, setSelectedOffer] = useState<NileNftOrder>();

  const offerHistory = useMemo(() => {
    return nft?.token?.offerList ?? [];
  }, [nft]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TableDataType[]) => {
      setSelectedOffer(selectedRows?.at(0)?.offer);
    },
    getCheckboxProps: (record: TableDataType) => ({
      disabled: record.canceled || record.expired,
      name: record.offer?.creator,
    }),
  };

  const isOfferExpired = useCallback(
    (offer: NileNftOrder) => {
      return dayjs().isAfter(dayjs.utc(offer?.endAt));
    },
    [offerHistory],
  );

  const calcRemainTime = useCallback(
    (offer?: NileNftOrder) => {
      const createdAt = dayjs.utc(offer?.createdAt);

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
    [offerHistory, remainTime],
  );

  const tableColumns: ColumnsType<TableDataType> = [
    {
      title: t('offerHistoryPopup.th1', { ns: 'common' }),
      dataIndex: 'user',
      key: 'bidHistoryUser',
      align: 'left',
      render: (_, { offer }) => (
        <button type="button" className={cn('btn-user-open inner-name')}>
          <Avatar
            className={cn('user-image', `type${offer?.profile?.themeIndex}`)}
            size={32}
            style={offer?.profile?.img ? { backgroundImage: `url(${offer?.profile?.img})` } : {}}
          >
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          <span>
            <span className={cn('user-id')}>{shorten(offer?.creator)}</span>
            <span className={cn('activity-time')}>{calcRemainTime(offer)}</span>
          </span>
        </button>
      ),
      className: 'user-cell',
    },
    {
      title: t('offerHistoryPopup.th2', { ns: 'common' }),
      dataIndex: 'bids',
      key: 'bidHistoryBids',
      align: 'right',
      render: (_, { offer, canceled, expired }) => (
        <>
          <span className={cn('bid-amount')}>
            {shorthanded(Number(fromWei(String(offer?.price), 'ether')))} {getPaymentUnit(offer?.payment)}
          </span>
          {canceled && (
            <Tag size="s" color="light-gray">
              {t('bidHistoryPopup.canceled')}
            </Tag>
          )}
          {expired && (
            <Tag size="s" color="light-gray">
              {t('bidHistoryPopup.expired')}
            </Tag>
          )}
        </>
      ),
      width: 160,
      className: 'bids-cell',
    },
    {
      title: t('offerHistoryPopup.th3', { ns: 'common' }),
      dataIndex: 'date',
      key: 'bidHistoryDate',
      align: 'center',
      render: (_, { offer }) => dayjs.utc(offer?.createdAt).local().format('YYYY-MM-DD HH:mm:ss'),
      width: 140,
      className: 'bid-date',
    },
  ];

  const tableData: TableDataType[] = useMemo(() => {
    return (
      offerHistory?.map((offer) => ({
        key: offer.id,
        offer,
        canceled: offer?.status === NileOrderStatusType.CANCELED,
        expired: isOfferExpired(offer) && offer?.status !== NileOrderStatusType.CANCELED,
      })) ?? []
    );
  }, [offerHistory]);

  const resetModal = useCallback(() => {
    setIsOpen(false);
    setIsAcceptOfferModal(false);
  }, []);

  return (
    <>
      <ModalLayout
        wrapClassName="bid-history-modal-wrap"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="md-t"
        title={t('offerHistoryPopup.title')}
        subTitle={t('offerHistoryPopup.desc')}
        footer
        footerContent={[
          <BgButton key="history" buttonText={t('offerHistoryPopup.btn')} color="black" size="md" onClick={() => setIsAcceptOfferModal(true)} />,
        ]}
        destroyOnClose={true}
      >
        <div className={cn('bid-history-modal')}>
          <Table
            rowSelection={{ type: 'radio', defaultSelectedRowKeys: ['1'], ...rowSelection }}
            className={cn('table-type-md bid-sell-table')}
            columns={tableColumns}
            dataSource={tableData}
            pagination={false}
            rowClassName={(record) => {
              if (record.canceled) {
                return 'canceled-bid';
              }
              if (record.expired) {
                return 'expired-bid';
              }
              return '';
            }}
            scroll={{ x: isMobile ? 492 : undefined }}
          />
        </div>
      </ModalLayout>
      <AcceptOfferModal selectedOffer={selectedOffer} isOpen={isAcceptOfferModal} setIsOpen={setIsAcceptOfferModal} resetModal={resetModal} />
    </>
  );
};

export default OfferHistoryModal;
