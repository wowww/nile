import cn from 'classnames';

import { Popover, Table } from 'antd';
import { useCallback } from 'react';
import type { ColumnsType } from 'antd/es/table';

import { ScanFromToCell } from '@components/dao/scan/ScanFromToCell';
import { DaoActivity } from '@/types/dao/dao.types';
import { useCountdown } from '@utils/countdown';
import dayjs from 'dayjs';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { useLayoutResize } from '@utils/layout';
import { useCharacterUppercase } from '@/hook/useCharacterConverter';

interface DaoStakingActivityProps {
  activities?: DaoActivity[];
}

export const DaoComponentActivity = ({ activities }: DaoStakingActivityProps) => {
  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });

  const { shorten } = useWalletFormatter();
  const { isTablet, isLargeDesktop } = useLayoutResize();

  const remain = useCallback(
    (date?: string) => {
      const updateAt = dayjs.utc(date);

      const remainDays = dayjs().diff(updateAt, 'day');
      const remainHours = dayjs().diff(updateAt, 'hour');
      const remainMinutes = dayjs().diff(updateAt, 'minute');
      const remainSeconds = dayjs().diff(updateAt, 'second');

      if (remainDays >= 1) {
        return `${remainDays} days ago`;
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
    [remainTime],
  );

  const DaoFilterColumns: ColumnsType<DaoActivity> = [
    {
      title: 'TX Hash',
      dataIndex: 'hash',
      key: 'daoTrustHash',
      width: isLargeDesktop ? 120 : 150,
      align: 'left',
      render: (_, { txHash }) => {
        return <ScanFromToCell type="hash" buttonText={txHash} buttonLink={`https://explorer.wemix.com/${txHash}`} />;
      },
      fixed: 'left',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'daoTrustAge',
      width: isLargeDesktop ? 120 : 150,
      align: 'center',
      render: (_, { timestamp }) => {
        return (
          <>
            <div className={cn('tooltip-wrap')}>
              <Popover
                overlayClassName="tooltip"
                placement="bottom"
                content={<div className={cn('tooltip-contents')}>{dayjs(timestamp).format('YYYY-MM-DD hh:mm')}</div>}
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                {remain(timestamp)}
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'daoHomeFrom',
      align: 'center',
      className: 'padding-default',
      width: 180,
      render: (_, { from }) => {
        return <ScanFromToCell buttonText={from} buttonTextShort={shorten(from)} buttonLink="" detailInfo={from} profileImgUrl="" />;
      },
    },
    {
      title: <div className={cn('icon-arrow-direction')} aria-hidden="true"></div>,
      dataIndex: 'icon',
      key: 'daoHomeIcon',
      align: 'center',
      className: 'padding-default',
      width: 28,
      render: (_, {}) => {
        return <div className={cn('icon-arrow-direction')} aria-hidden="true"></div>;
      },
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'daoHomeTo',
      align: 'center',
      width: 180,
      render: (_, { to }) => (
        <ScanFromToCell type="to" buttonText={to} buttonTextShort={shorten(to)} buttonLink="" detailInfo={to} profileImgUrl="" contract />
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'daoTrustValue',
      align: 'right',
      render: (_, { value, tokenSymbol }) => {
        return (
          <div className={cn('amount-value')}>
            {Number(value).toLocaleString()}
            <span className={cn('unit')}>{useCharacterUppercase(tokenSymbol)}</span>
          </div>
        );
      },
    },
    {
      title: 'TX Fee (WEMIX)',
      dataIndex: 'txFee',
      key: 'txFee',
      align: 'right',
      width: isLargeDesktop ? 108 : 144,
    },
  ];

  return (
    <div className={cn('dao-table-wrap')}>
      <Table
        className={cn('table-type-lg')}
        pagination={false}
        columns={DaoFilterColumns}
        dataSource={activities}
        scroll={isTablet ? { x: 936 } : undefined}
      />
    </div>
  );
};
export default DaoComponentActivity;
