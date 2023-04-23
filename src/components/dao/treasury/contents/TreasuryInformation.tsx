import cn from 'classnames';
import { Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import useMediaQuery from '@/hook/useMediaQuery';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';
import { NileApiService } from '@/services/nile/api';
import axios from 'axios';

interface DaoTreasuryFund {
  daoId: string;
  timestamp: string;
  tokenSymbol: string;
  totalDeposit: number;
  totalWithdrawal: number;
  balance: number;
}

export const TreasuryInformation = () => {
  const { t } = useTranslation('dao');
  const isTablet = useMediaQuery('(max-width: 1279px)');
  const api = NileApiService();
  // pagination 사용시 필요한 부분 Start
  const [activatePagination, setPaginationActivate] = useState(1);
  const [activities, setActivities] = useState<DaoTreasuryFund[]>();
  const [tokenWemix, setTokenWemix] = useState<any>();

  const onChange = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };
  // pagination 사용시 필요한 부분 End

  useEffect(() => {
    api.dao.treasury.fund
      .getList()
      .then((data) => setActivities(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`/api/tokenInfoList`).then(({ data }) => {
      data.forEach((token: any) => {
        if (token.token_symbol === 'WEMIX') {
          setTokenWemix(token);
        }
      });
    });
  }, []);

  const getCurrentValue = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value * tokenWemix?.price);
    },
    [tokenWemix],
  );

  const DaoFilterColumns: ColumnsType<DaoTreasuryFund> = [
    // {
    //   title: t('daoInformationTable.table.th1'),
    //   dataIndex: 'currency',
    //   key: 'currency',
    //   width: '172px',
    //   align: 'left',
    //   render: (_, { tokenSymbol }) => (
    //     <Link href="/" passHref>
    //       <a className={cn('currency-td left')}>
    //         <Image src={tokenSymbol === 'WEMIX' ? '/temp/@temp_ico_wemix12.svg' : ''} alt="" width="12" height="12" loader={NileCDNLoader} />
    //         {tokenSymbol}
    //         <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />
    //       </a>
    //     </Link>
    //   ),
    //   fixed: 'left',
    // },
    // {
    //   title: t('daoInformationTable.table.th2'),
    //   dataIndex: 'inflows',
    //   key: 'inflows',
    //   width: '172px',
    //   align: 'right',
    //   render: (_, { totalDeposit }) => {
    //     return <>{useNumberFormatterToFix(totalDeposit)} WEMIX</>;
    //   },
    //   showSorterTooltip: false,
    // },
    // {
    //   title: t('daoInformationTable.table.th3'),
    //   dataIndex: 'outflows',
    //   key: 'outflows',
    //   width: '172px',
    //   align: 'right',
    //   render: (_, { totalWithdrawal }) => {
    //     return <>{useNumberFormatterToFix(totalWithdrawal)} WEMIX</>;
    //   },
    //   showSorterTooltip: false,
    // },
    // {
    //   title: t('daoInformationTable.table.th4'),
    //   dataIndex: 'reward',
    //   key: 'reward',
    //   width: '172px',
    //   align: 'right',
    //   render: (_, { totalDeposit, totalWithdrawal }) => {
    //     return <>{useNumberFormatterToFix(totalDeposit - totalWithdrawal)} WEMIX</>;
    //   },
    // },
    // {
    //   title: t('daoInformationTable.table.th5'),
    //   dataIndex: 'value',
    //   key: 'value',
    //   width: '172px',
    //   align: 'right',
    //   render: (_, { totalDeposit, totalWithdrawal }) => {
    //     return <>{`$${getCurrentValue(totalDeposit - totalWithdrawal)}`}</>;
    //   },
    // },
    // {
    //   title: t('daoInformationTable.table.th6'),
    //   dataIndex: 'ratio',
    //   key: 'ratio',
    //   width: !isTablet ? '172px' : '158px',
    //   align: 'center',
    //   render: (_, { balance }) => {
    //     return <>{balance.toFixed(2)} %</>;
    //   },
    //   showSorterTooltip: false,
    // },
  ];

  return (
    <div className={cn('dao-table-wrap')}>
      <Table
        className={cn('table-type-lg')}
        columns={DaoFilterColumns}
        dataSource={activities}
        pagination={false}
        scroll={isTablet ? { x: 936 } : undefined}
      />
    </div>
  );
};

export default TreasuryInformation;
