import cn from 'classnames';
import { Popover, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { windowResizeAtom } from '@/state/windowAtom';
import PaginationCustom from '@/components/button/PaginationCustom';
import IconTableFilter from '@public/icons/ico_table_filter.svg';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

export const TokenUsage = () => {
  const [size, setSize] = useState('lg');
  const offset = useAtomValue(windowResizeAtom);
  // 22.11.15 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);

  // pagination 사용시 필요한 부분 Start
  const [activatePagination, setPaginationActivate] = useState(1);

  const onChange = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };
  // pagination 사용시 필요한 부분 End

  interface daoHomeTableDataType {
    date: string;
    link: string;
    key?: string;
    fullDate?: Date;
    status: string;
    transferAmount?: string[];
    ratio?: string[];
    token?: string[];
    shortDate: string | null;
  }

  const [DaoTokenUsage, SetDaoTokenUsage] = useState<daoHomeTableDataType[]>();
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  function filterHandler(keydata: any) {
    let AllBtn = document.querySelectorAll('.filter-custom button');

    let elBtn = keydata.target;

    AllBtn.forEach((el) => {
      el.classList.remove('active');
    });

    elBtn.classList.add('active');

    let filetDate = daoTokenUsage.filter((el) => {
      if (keydata.target.name === 'All') {
        return daoTokenUsage;
      } else {
        return el.status === keydata.target.name;
      }
    });

    SetDaoTokenUsage(filetDate);
    setOpenFilter(false);
  }

  const daoTokenUsage: daoHomeTableDataType[] = [
    {
      key: '1',
      status: 'Using',
      link: '/',
      transferAmount: ['1,000,000 DT', '(Used  1,200 WEMIX in Station)'],
      ratio: ['WEMIX : DT', ' 1:1.412'],
      token: ['1,000,000 DT', ' 1,142,000 GT'],
      date: '2022-08-23 14:53',
      shortDate: '1 minutes ago',
    },
    {
      key: '2',
      status: 'Purchasing',
      link: '/',
      transferAmount: ['1,000,000 DT', '(Used  1,200 WEMIX in Station)'],
      ratio: ['WEMIX : DT', ' 1:1.412'],
      token: ['1,000,000 DT', ' 1,142,000 GT'],
      date: '2022-08-23 14:54',
      shortDate: null,
    },
    {
      key: '3',
      status: 'Staking',
      link: '/',
      transferAmount: ['1,000,000 DT', '(Used  1,200 WEMIX in Station)'],
      ratio: ['WEMIX : DT', ' 1:1.412'],
      token: ['1,000,000 DT', ' 1,142,000 GT'],
      date: '2022-08-23 14:55',
      shortDate: null,
    },
    {
      key: '4',
      status: 'Using',
      link: '/',
      transferAmount: ['1,000,000 DT', '(Used  1,200 WEMIX in Station)'],
      ratio: ['WEMIX : DT', ' 1:1.412'],
      token: ['1,000,000 DT', ' 1,142,000 GT'],
      date: '2022-08-23 14:52',
      shortDate: null,
    },
    {
      key: '5',
      status: 'Using',
      link: '/',
      transferAmount: ['1,000,000 DT', '(Used  1,200 WEMIX in Station)'],
      ratio: ['WEMIX : DT', ' 1:1.412'],
      token: ['1,000,000 DT', ' 1,142,000 GT'],
      date: '2022-08-23 14:52',
      shortDate: '1 minutes ago',
    },
    {
      key: '6',
      status: 'Using',
      link: '/',
      transferAmount: ['1,000,000 DT', '(Used  1,200 WEMIX in Station)'],
      ratio: ['WEMIX : DT', ' 1:1.412'],
      token: ['1,000,000 DT', ' 1,142,000 GT'],
      date: '2022-08-23 14:52',
      shortDate: '1 minutes ago',
    },
  ];

  useEffect(() => {
    SetDaoTokenUsage(daoTokenUsage);
  }, []);

  const DaoFilterColumns: ColumnsType<daoHomeTableDataType> = [
    {
      title: t('daoOperate.table.1'),
      dataIndex: 'status',
      key: 'status',
      width: size === 'lg' ? '20%' : '17.5%',
      align: 'center',
      filters: [
        {
          text: <span>Using</span>,
          value: 'Using',
        },
        {
          text: <span>Purchasing</span>,
          value: 'Purchasing',
        },
        {
          text: <span>Staking</span>,
          value: 'Staking',
        },
        {
          text: <span>UnStaking</span>,
          value: 'UnStaking',
        },
      ],
      onFilter: (value, record) => record.status?.includes(String(value)),
      filterIcon: (filtered) => <IconTableFilter />,
      onFilterDropdownOpenChange: () => {
        setOpenFilter(!openFilter);
      },
      filterDropdownOpen: openFilter,
      filterDropdown: () => (
        <div className={cn('filter-custom')}>
          <ul>
            <li>
              <button type="button" name="All" onClick={filterHandler}>
                All
              </button>
            </li>
            <li>
              <button type="button" name="Using" onClick={filterHandler}>
                Using
              </button>
            </li>
            <li>
              <button type="button" name="Purchasing" onClick={filterHandler}>
                Purchasing
              </button>
            </li>
            <li>
              <button type="button" name="Staking" onClick={filterHandler}>
                Staking
              </button>
            </li>
            <li>
              <button type="button" name="Unstaking" onClick={filterHandler}>
                Unstaking
              </button>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: t('daoOperate.table.2'),
      dataIndex: 'transferAmount',
      key: 'transferAmount',
      width: size === 'lg' ? '20%' : '29%',
      render: (_, { transferAmount }) => (
        <>
          {transferAmount!.map((amount: string, index: number) => {
            return (
              <span className={cn('dao-cell-item')} key={amount + index}>
                {amount}
              </span>
            );
          })}
        </>
      ),
    },
    {
      title: t('daoOperate.table.3'),
      dataIndex: 'ratio',
      key: 'ratio',
      width: size === 'lg' ? '20%' : '19%',
      align: 'center',
      render: (_, { ratio }) => (
        <>
          {ratio!.map((ratio: string, index: number) => {
            return (
              <span className={cn('dao-cell-item')} key={ratio + index}>
                {ratio}
              </span>
            );
          })}
        </>
      ),
    },
    {
      title: t('daoOperate.table.4'),
      dataIndex: 'token',
      key: 'token',
      width: size === 'lg' ? '20%' : '17%',
      align: 'center',
      render: (_, { token }) => (
        <>
          {token!.map((token: string, index: number) => {
            return (
              <span className={cn('dao-cell-item')} key={token + index}>
                {token}
              </span>
            );
          })}
        </>
      ),
    },
    {
      title: t('daoOperate.table.5'),
      dataIndex: 'date',
      key: 'date',
      width: size === 'lg' ? '20%' : '19%',
      align: 'center',
      sorter: (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf(),
      render: (_, { link, date, shortDate }) => (
        <Link href={link}>
          <a className={cn('time-wrap')}>
            {shortDate ? (
              <div className={cn('tooltip-wrap')}>
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={<div className={cn('tooltip-contents')}>{date}</div>}
                  trigger="hover"
                  getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                >
                  {shortDate}
                </Popover>
              </div>
            ) : (
              <>{date}</>
            )}
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
          </a>
        </Link>
      ),
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
    <>
      <Table
        className={cn('table-type-lg')}
        columns={DaoFilterColumns}
        dataSource={DaoTokenUsage}
        pagination={false}
        scroll={size === 'sm' ? { x: 688 } : undefined}
      />
      <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={100} onChange={onChange} activate={activatePagination} />
    </>
  );
};

export default TokenUsage;
