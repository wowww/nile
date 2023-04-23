import cn from 'classnames';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import { useAtomValue } from 'jotai';
import useMediaQuery from '@/hook/useMediaQuery';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';

interface daoHomeTableDataType {
  key?: string;
  currency?: string;
  inflows: number;
  outflows: number;
  reward?: number;
  value?: number;
  ratio: number;
  img: string;
}
export const TreasuryInformation = () => {
  const { t } = useTranslation('dao');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  // pagination 사용시 필요한 부분 Start
  const [activatePagination, setPaginationActivate] = useState(1);

  const onChange = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };
  // pagination 사용시 필요한 부분 End

  const daoTokenUsage: daoHomeTableDataType[] = [
    {
      key: '1',
      currency: 'WEMIX',
      inflows: 10000000.0,
      outflows: 5000000.0,
      reward: 5000000.0,
      value: 1000000.0,
      ratio: 100,
      img: '/temp/@temp_ico_wemix12.svg',
    },
  ];

  const DaoFilterColumns: ColumnsType<daoHomeTableDataType> = [
    {
      title: t('daoInformationTable.table.th1'),
      dataIndex: 'currency',
      key: 'currency',
      width: '172px',
      align: 'left',
      render: (_, { currency, img }) => (
        <Link href="https://coinmarketcap.com/currencies/wemix" passHref>
          <a className={cn('currency-td left')}>
            <Image src={img} width="12" height="12" alt="" loader={NileCDNLoader} />
            {currency}
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />
          </a>
        </Link>
      ),
      fixed: 'left',
    },
    {
      title: t('daoInformationTable.table.th2'),
      dataIndex: 'inflows',
      key: 'inflows',
      width: '172px',
      align: 'right',
      render: (_, { inflows }) => {
        return <>{useNumberFormatterToFix(inflows)} WEMIX</>;
      },
      showSorterTooltip: false,
    },
    {
      title: t('daoInformationTable.table.th3'),
      dataIndex: 'outflows',
      key: 'outflows',
      width: '172px',
      align: 'right',
      render: (_, { outflows }) => {
        return <>{useNumberFormatterToFix(outflows)} WEMIX</>;
      },
      showSorterTooltip: false,
    },
    {
      title: t('daoInformationTable.table.th4'),
      dataIndex: 'reward',
      key: 'reward',
      width: '172px',
      align: 'right',
      render: (_, { reward }) => {
        if (reward) {
          return <>{useNumberFormatterToFix(reward)} WEMIX</>;
        }
      },
    },
    {
      title: t('daoInformationTable.table.th5'),
      dataIndex: 'value',
      key: 'value',
      width: '172px',
      align: 'right',
      render: (_, { value }) => {
        if (value) {
          return <>$ {useNumberFormatterToFix(value)}</>;
        }
      },
    },
    {
      title: t('daoInformationTable.table.th6'),
      dataIndex: 'ratio',
      key: 'ratio',
      width: !isTablet ? '172px' : '158px',
      align: 'center',
      render: (_, { ratio }) => {
        return <>{ratio.toFixed(2)} %</>;
      },
      showSorterTooltip: false,
    },
  ];

  return (
    <div className={cn('dao-table-wrap')}>
      <Table
        className={cn('table-type-lg')}
        columns={DaoFilterColumns}
        dataSource={daoTokenUsage}
        pagination={false}
        scroll={isTablet ? { x: 936 } : undefined}
      />
    </div>
  );
};

export default TreasuryInformation;
