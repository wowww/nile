import cn from 'classnames';
import { Popover, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'next-i18next';
import useMediaQuery from '@/hook/useMediaQuery';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';
import { DaoActivity } from '@/types/dao/dao.types';

import { ScanFromToCell, DataProps } from '@/components/dao/scan/ScanFromToCell';
import Empty from '@/components/empty/Empty';
import dayjs from 'dayjs';
import { useCountdown } from '@utils/countdown';
import { NileApiService } from '@/services/nile/api';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';

export const DaoActivities = () => {
  const { t } = useTranslation(['dao', 'common']);
  const api = NileApiService();
  const { shorten } = useWalletFormatter();
  // daoTreasuryData 필터된 데이터
  const [daoTreasuryData, setDaoTreasuryData] = useState<DaoActivity[]>();
  const isPC = useMediaQuery('(min-width: 1440px)');
  const isTablet = useMediaQuery('(max-width: 1023px)');
  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });

  const timestampFormatter = useCallback(
    (timestamp: string) => {
      const updateAt = dayjs.utc(timestamp);

      const remainDays = dayjs().diff(updateAt, 'day');
      const remainHours = dayjs().diff(updateAt, 'hour');
      const remainMinutes = dayjs().diff(updateAt, 'minute');
      const remainSeconds = dayjs().diff(updateAt, 'second');

      if (remainHours > 24) {
        return dayjs.utc(timestamp).local().format('YYYY-MM-DD HH:mm');
      }

      if (remainDays >= 1) {
        if (remainDays === 0) {
          return '1 days ago';
        } else {
          return updateAt.format('YYYY-MM-DD');
        }
      }

      if (remainHours > 0) {
        return `${remainHours} hours ago`;
      }

      if (remainMinutes > 0) {
        return `${remainMinutes} minutes ago`;
      }

      if (remainSeconds > 0) {
        return `${remainSeconds} secs ago`;
      }
    },
    [remainTime],
  );

  const addressInfo = useCallback((address: string) => {
    const type = !address || typeof address === 'string';
    if (type && address.includes('0x00')) {
      // WEMIX.Fi 가짜 주소
      return [{ text: 'WEMIX.Fi', link: 'wemix.fi.link' }];
    } else if (address === daoJsonAbiAddress().current.Treasury) {
      return [{ text: 'Treasury', link: 'treasury.link' }];
    } else if (address === daoJsonAbiAddress().current.Trust) {
      return [{ text: 'Trust', link: 'trust.link' }];
    } else {
      return [{ text: '', link: address }];
    }
  }, []);

  useEffect(() => {
    return () => {
      api.dao.activity.treasury
        .getList()
        .then((data) => setDaoTreasuryData(data))
        .catch((e) => console.log(e));
    };
  }, []);

  const DaoFilterColumns: ColumnsType<DaoActivity> = [
    {
      title: 'TX Hash',
      dataIndex: 'hash',
      key: 'daoTreasuryHash',
      width: isPC ? 150 : 120,
      align: 'left',
      render: (_, { txHash }) => {
        return <ScanFromToCell type="hash" buttonText={shorten(txHash)} buttonLink={`${txHash}`} />;
      },
      fixed: 'left',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'daoTrustAge',
      width: isPC ? 150 : 120,
      align: 'center',
      render: (_, { timestamp }) => {
        return (
          <>
            {timestamp && (
              <div className={cn('tooltip-wrap')}>
                {/* 23.03.29 수정: 툴팁 방향 수정 */}
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={<div className={cn('tooltip-contents')}>{timestampFormatter(timestamp)}</div>}
                  trigger="hover"
                  getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                >
                  <div className={cn('short-age-wrap')}>{timestampFormatter(timestamp)}</div>
                </Popover>
              </div>
            )}
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
      render: (from) => {
        return (
          <ScanFromToCell
            buttonText={addressInfo(from)?.at(0)?.text}
            buttonTextShort={shorten(from)}
            buttonLink={addressInfo(from)?.at(0)?.link}
            detailInfo={from}
            profileImgUrl={from.profileImgUrl}
          />
        );
      },
    },
    {
      title: <div className={cn('icon-arrow-direction')} aria-hidden="true"></div>,
      dataIndex: 'icon',
      key: 'daoTreasuryIcon',
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
      key: 'daoTreasuryTo',
      align: 'center',
      width: 180,
      render: (to) => (
        <ScanFromToCell
          type="to"
          buttonText={addressInfo(to)?.at(0)?.text}
          buttonTextShort={shorten(to)}
          buttonLink={addressInfo(to)?.at(0)?.link}
          detailInfo={to}
          profileImgUrl={to.profileImgUrl}
          contract
        />
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'daoTreasuryValue',
      align: 'right',
      render: (_, { value, tokenAddress }) => {
        return (
          <div className={cn('amount-value')}>
            {useNumberFormatterToFix(Number(value))}
            <span className={cn('unit')}>{!(tokenAddress === '') ? 'WDR' : 'WEMIX'}</span>
          </div>
        );
      },
    },
    {
      title: 'TX Fee (WEMIX)',
      dataIndex: 'txFee',
      key: 'daoTreasuryFee',
      align: 'right',
      width: isPC ? 144 : 108,
    },
  ];

  let locale = {
    emptyText: <Empty subText={t('empty.noData', { ns: 'common' })} />,
  };

  return (
    <div className={cn('dao-table-wrap')}>
      <Table
        className={cn('table-type-lg')}
        pagination={false}
        columns={DaoFilterColumns}
        dataSource={daoTreasuryData}
        scroll={isTablet ? { x: 936 } : undefined}
        locale={locale}
      />
    </div>
  );
};
export default DaoActivities;
