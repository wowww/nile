import cn from 'classnames';
import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import IconLink from '@images/icon/ico_link.svg';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

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
export const IncineratorInformation = () => {
  const { t } = useTranslation('dao');
  const [size, setSize] = useState('lg');
  // pagination 사용시 필요한 부분 Start
  const [activatePagination, setPaginationActivate] = useState(1);

  const offset = useAtomValue(windowResizeAtom);

  const daoTokenUsage: daoHomeTableDataType[] = [
    {
      key: '1',
      currency: 'WEMIX',
      inflows: 10000000,
      outflows: 5000000,
      reward: 5000000,
      value: 1000000,
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
      align: 'center',
      render: (_, { currency, img }) => (
        <Link href="/" passHref>
          <a className={cn('currency-td')}>
            <Image src={img} width="12" height="12" alt="" />
            {currency}
            <IconLink />
          </a>
        </Link>
      ),
    },
    {
      title: t('daoInformationTable.table.th2'),
      dataIndex: 'inflows',
      key: 'inflows',
      width: '172px',
      align: 'right',
      sorter: (a, b) => a.inflows - b.inflows,
      render: (_, { inflows }) => {
        let result = inflows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return <>{result} WEMIX</>;
      },
    },
    {
      title: t('daoInformationTable.table.th3'),
      dataIndex: 'outflows',
      key: 'outflows',
      width: '172px',
      align: 'right',
      sorter: (a, b) => a.outflows - b.outflows,
      render: (_, { outflows }) => {
        let result = outflows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return <>{result} WEMIX</>;
      },
    },
    {
      title: t('daoInformationTable.table.th4'),
      dataIndex: 'reward',
      key: 'reward',
      width: '172px',
      align: 'right',
      render: (_, { reward }) => {
        let result = reward?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return <>{result} WEMIX</>;
      },
    },
    {
      title: t('daoInformationTable.table.th5'),
      dataIndex: 'value',
      key: 'value',
      width: '172px',
      align: 'right',
      render: (_, { value }) => {
        let result = value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return <>$ {result}</>;
      },
    },
    {
      title: t('daoInformationTable.table.th6'),
      dataIndex: 'ratio',
      key: 'ratio',
      width: size === 'lg' ? '172px' : '66px',
      align: 'right',
      sorter: (a, b) => a.ratio - b.ratio,
      render: (_, { ratio }) => {
        return <>{ratio} %</>;
      },
    },
  ];

  useEffect(() => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setSize('md');
    } else if (offset.width < 768) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  }, [offset.width]);

  return (
    <div className={cn('dao-table-wrap')}>
      <Table
        className={cn('table-type-lg')}
        columns={DaoFilterColumns}
        dataSource={daoTokenUsage}
        pagination={false}
        scroll={size === 'sm' ? { x: 680 } : undefined}
      />
    </div>
  );
};

export default IncineratorInformation;
