import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dynamic from 'next/dynamic';
import { TinyChartData } from '@/components/chart/tokensChartDummyData';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// components
import { IconLogo } from '../logo/IconLogo';
/* 22.11.08 수정: outline 버튼 추가 */
import OutlineButton from '@components/button/OutlineButton';
import { useAtomValue } from 'jotai';
import millify from 'millify';
import axios from 'axios';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';
import { convertTokensData } from '@utils/ConvertTokensData';

const TinyChart = dynamic(() => import('@/components/chart/TinyChart'), { ssr: false });

interface TokenDataType {
  key: number;
  name: string;
  shortenName: string;
  price: number;
  price1h: number;
  price1hRate: number;
  price24h: number;
  price24hRate: number;
  price7d: number;
  price7dRate: number;
  volume7d: number;
  liquidity: number;
  /* 22.11.08 수정: swap 버튼 추가에 따른 props type 추가 */
  swapLink: string;
  isSwap: boolean;
  address: string;
}

interface TokenDataWithChartType extends TokenDataType {
  tokenChartData: any[];
}

interface Props {
  tipo?: any;
  force?: any;
  tokens?: any[];
}

const TokensTable = ({ tokens }: Props) => {
  const { t } = useTranslation('tokens');
  const tinyChartInit = useAtomValue(TinyChartData);
  const router = useRouter();
  const [isCurrent, setCurrent] = useState(0);
  const [activatePagination, setPaginationActivate] = useState(1);
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  const tokensData = convertTokensData(tokens ?? []);
  const tokensDataWithChart = tokensData?.map((tokenData, index) => {
    if (tokenData?.shortenName === 'TIPO') {
      return { ...tokenData, tokenChartData: tipoChartData };
    } else if (tokenData?.shortenName === 'FRC') {
      return { ...tokenData, tokenChartData: forceChartData };
    }
  });

  const [tokenChartData, setTokenChartData] = useState<any[]>([]);

  const tokensSortList = [
    { index: 0, name: t('tokensTableTab.all') },
    { index: 1, name: t('tokensTableTab.favorite') },
  ];

  const onChangePaging = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };

  const [tipoChartData, setTipoChartData] = useState<any[]>();
  const [forceChartData, setForceChartData] = useState<any[]>();

  const onTokenCell = (record: TokenDataType, rowIndex: number | undefined): any => {
    return {
      onClick: (event: MouseEvent) => {
        // console.log(record);
        router.push({
          pathname: '/tokens/detail',
          query: { address: record.address },
        });
      },
    };
  };

  useEffect(() => {
    if (tokens) {
      Promise.all(
        tokens.map((token) =>
          axios
            .get(`/api/tokenHistory`, {
              params: {
                token: token.token_address,
                type: 'price',
                unit: 'hour',
                unit_count: 42,
                unit_multiplier: 4,
              },
            }),
        ),
      ).then((res) => {
        setTokenChartData(
          res.map((item) => item.data.map((chartDataItem: any) => ({
            date: chartDataItem.timestamp,
            value: Number(chartDataItem['price']),
          }))),
        );
      });
    }
  }, [tokens]);

  const tokensColumns: ColumnsType<TokenDataType> = [
    // {
    //   title: <span className={cn('index')}>#</span>,
    //   dataIndex: 'key',
    //   width: size === 'lg' ? 60 : 40,
    //   render: (text) => <span className={cn('index')}>{text}</span>,
    //   align: 'center',
    //   className: 'index-column',
    //   /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가, fixed 값 추가 */
    //   onCell: (record, rowIndex) => {
    //     return {
    //       onClick: (event) => {
    //         router.push({
    //           pathname: '/tokens/detail',
    //           query: { token: record.shortenName },
    //         });
    //       },
    //     };
    //   },
    //   fixed: 'left',
    // },
    {
      title: <span>{t('tokensTableHeader.name')}</span>,
      dataIndex: ['name', 'shortenName'],
      width: isMobile ? 100 : 160,
      align: 'left',
      render: (_: any, { name, shortenName }) => {
        return (
          <div className={cn('token-table-list-item')}>
            <IconLogo type={shortenName.toLowerCase()} size={20}></IconLogo>
            <div className={cn('coin-name')}>
              <span>{shortenName}</span>
              <span className={cn('entire')}>{name}</span>
            </div>
          </div>
        );
      },
      className: 'name-column',
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가, fixed 값 추가 */
      onCell: onTokenCell,
      fixed: 'left',
    },
    {
      title: <div>{t('tokensTableHeader.price')}</div>,
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: false,
      width: 100,
      align: 'right',
      render: (text): string => {
        return `$${new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(text)}`;
      },
      onCell: onTokenCell,
      className: 'normal-column',
    },

    {
      title: <div>{t('tokensTableHeader.price1h')}</div>,
      dataIndex: ['price1h', 'price1hRate'],
      showSorterTooltip: false,
      width: 140,
      align: 'right',
      render: (_, { price, price1hRate }): JSX.Element => {
        return <ChangeCell percentage={price1hRate} figure={price} />;
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: onTokenCell,
      className: 'normal-column',
    },
    {
      title: <div>{t('tokensTableHeader.price24h')}</div>,
      dataIndex: ['price24h', 'price24hRate'],
      showSorterTooltip: false,
      width: 140,
      align: 'right',
      render: (_, { price, price24hRate }): JSX.Element => {
        return <ChangeCell percentage={price24hRate} figure={price} />;
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: onTokenCell,
      className: 'normal-column',
    },
    {
      title: <div className="no-sort">{t('tokensTableHeader.price7d')}</div>,
      dataIndex: 'price7d',
      sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: false,
      width: 180,
      align: 'right',
      render: (text, record, index): JSX.Element => {
        return <div className="table-chart">{tokenChartData && tokenChartData[index] &&
          <TinyChart dataItems={tokenChartData[index]} height={40} />}</div>;
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: onTokenCell,
      className: 'normal-column',
    },

    {
      title: <div>{t('tokensTableHeader.volume7d')}</div>,
      dataIndex: 'volume7d',
      sorter: (a, b) => a.volume7d - b.volume7d,
      sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: false,
      defaultSortOrder: 'descend',
      width: 120,
      align: 'right',
      render: (text): string => {
        return `$${millify(text, {
          precision: 2,
        })}`;
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: onTokenCell,
      className: 'normal-column',
    },
    {
      title: <div className="no-sort">{t('tokensTableHeader.liquidity')}</div>,
      dataIndex: 'liquidity',
      // sorter: (a, b) => a.TVL - b.TVL,
      sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: false,
      width: 120,
      align: 'right',
      render: (text): string => {
        return `${millify(text, {
          precision: 2,
        })}`;
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: onTokenCell,
      className: 'normal-column',
    },
    /* 22.11.08 수정: 신규 컬럼 추가 */
    {
      title: <div className={cn('a11y')}>swap button</div>,
      dataIndex: 'swap',
      width: 140,
      align: 'center',
      render: (_: any, { swapLink, isSwap }) => {
        return (
          <div className={cn('btn-cell', !isSwap ? 'disabled' : '')}>
            <OutlineButton
              buttonText="Swap"
              color="black"
              align
              size="sm"
              href={swapLink}
              target="_blank"
              iconType
              iconValue="link"
              disabled={!isSwap}
            />
          </div>
        );
      },
      className: 'swap-column',
    },
  ];
  return (
    <div className={cn('tokens-table-wrap')}>
      <h2 className={cn('tokens-title')}>Tokens</h2>
      {/* TODO: 11월 11일 오픈 기준 탭 버튼 영역 삭제 */}
      {/* <div className="sort-area">
        {tokensSortList.map((item, index) => (
          <button type="button" onClick={() => setCurrent(index)}>
            <Chip size="lg" bg={item.index === isCurrent}>
              {item.name}
            </Chip>
          </button>
        ))}
      </div> */}
      <Table
        className={cn('table-type-md', 'tokens-table')}
        /* 22.11.08 수정: onRow click 이벤트 삭제 */
        columns={tokensColumns}
        dataSource={tokensData}
        pagination={false}
        /* 22.10.28 수정: scroll 속성 수정 */
        /* 22.11.08 수정: scroll 속성 값 수정 */
        scroll={{ x: 1100 }}
      />

      {/* TODO: 11일 오픈 시점에 보이지 않도록 주석 처리 */}
      {/* <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChangePaging} activate={activatePagination} /> */}
    </div>
  );
};

const ChangeCell = ({ percentage, figure }: { percentage: number; figure: number }) => {
  const changedPrice = figure / (1 + percentage / 100);
  return (
    <div className={cn('change-cell-wrap')}>
      <span className={cn('percentage', percentage >= 0 ? 'increase' : 'decrease')}>
        {percentage >= 0 ? '+' : '-'} {new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(Math.abs(percentage))}%
      </span>
      <span
        className={cn('figure')}>${new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(changedPrice)}</span>
    </div>
  );
};

export default TokensTable;
