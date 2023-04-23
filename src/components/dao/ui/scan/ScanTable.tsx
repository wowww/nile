import { Popover, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import cn from 'classnames';
import { ScanFromToCell, DataProps } from './ScanFromToCell';
import PaginationTransaction from '@/components/button/PaginationTransaction';
import Empty from '@/components/empty/Empty';
import { useTranslation } from 'next-i18next';
import useMediaQuery from '@/hook/useMediaQuery';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';

// 검색 결과 케이스를 보기 위한 props 값 (실제 사용 X)
type searchResultType = {
  searchResult?: false | number;
};

const ScanTable = ({ searchResult = false }: searchResultType) => {
  const { t } = useTranslation('dao');
  const isPC = useMediaQuery('(min-width: 1440px)');
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const scanTransaction: DataProps[] = [
    {
      key: '1',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      /**
       * From / to 제공 항목별 표기 정의
       * protocol : Station Treasury Obelisk Governance Trust Incinerator,
       * User
       */
      // 1. 프로토콜
      from: {
        buttonName: 'Station',
        detailInfo: '상세주소',
        buttonLink: '/',
      },
      to: {
        buttonName: 'Treasury',
        detailInfo: '상세주소',
        buttonLink: '/',
      },
      // protocol : Station Treasury Obelisk Governance Trust Incinerator 이외 컨트랙트 주소가 있는 데이터일 경우 contract: true
      contract: true,
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402' /* 23.04.06 수정: 말줄임 없는 케이스 추가 */,
    },

    // 2-1. User - User 프로필 미설정 + 닉네임 미설정
    {
      key: '2',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonNameShort: '0x34fd...df67',
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67',
        profileImgUrl: '',
        buttonLink: '/',
      },
      to: {
        buttonName: 'Incinerator',
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67', // 지갑 주소
        buttonLink: '/',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402' /* 23.04.06 수정: 말줄임 없는 케이스 추가 */,
    },
    // 2-2. User - User 프로필 미설정 + 닉네임 설정
    {
      key: '3',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonName: 'NILER',
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67', // 지갑 주소
        profileImgUrl: '',
        buttonLink: '/',
      },
      to: {
        buttonName: 'Trust',
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67', // 지갑 주소
        buttonLink: '',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },

    // 2-3. User - User 프로필 설정 + 닉네임 설정
    {
      key: '4',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonName: 'NILERNILERNILERNILERNILERNILER',
        detailInfo: '0x575ebe8dd52dc2652920695bab822bb42891f4b5',
        profileImgUrl: 'https://picsum.photos/32/32/?image=1',
        buttonLink: '/',
      },
      to: {
        buttonName: 'Incinerator',
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67', // 지갑 주소
        buttonLink: '/',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
    // 2-4. User - User 프로필 설정 + 닉네임 미설정
    {
      key: '5',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonNameShort: '0x34fd...df67', // 지갑 주소(축약)
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67', // 지갑 주소
        profileImgUrl: 'https://picsum.photos/32/32/?image=1',
        buttonLink: '/',
      },
      to: {
        buttonName: 'Obelisk',
        detailInfo: '상세주소',
        buttonLink: '/',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
    // 3. 명칭 + 주소
    {
      key: '6',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 mins ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonName: 'Trust Wallet',
        detailInfo: '상세 주소',
        buttonLink: '/',
      },
      to: {
        buttonName: 'Dead Wallet',
        detailInfo: '상세 주소',
        buttonLink: '/',
      },
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
    // 4. 명칭 or 주소
    {
      key: '7',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '2 hours ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonNameShort: '0x34fd...df67', // 지갑 주소(축약)
        detailInfo: '0x575ebe8dd52dc2652920695bab822bb42891f4b5',
        buttonLink: '/',
      },
      to: {
        buttonName: 'WEMIX.Fi',
        detailInfo: '상세 주소',
        buttonLink: '/',
      },
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
  ];
  const scanFilterColumns: ColumnsType<DataProps> = [
    /* 23.04.06 수정: TX Hash 중앙정렬 반영, 1열 고정 */
    {
      title: 'TX Hash',
      dataIndex: 'hash',
      key: 'daoTrustHash',
      width: isPC ? 150 : 120,
      align: 'center',
      className: 'align-center',
      render: (_, { hash }) => {
        return <ScanFromToCell type="hash" buttonText={hash?.buttonName} buttonLink={hash?.buttonLink} />;
      },
      fixed: 'left',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'daoTrustAge',
      width: isPC ? 150 : 120,
      align: 'left',
      className: 'align-left',
      render: (_, { shortAge, age }) => {
        return (
          <>
            {shortAge ? (
              <div className={cn('tooltip-wrap')}>
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={<div className={cn('tooltip-contents')}>{age}</div>}
                  trigger="hover"
                  getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                >
                  <div className={cn('short-age-wrap')}>{shortAge}</div>
                </Popover>
              </div>
            ) : (
              <>{age}</>
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
      render: (_, { from }) => {
        return (
          <ScanFromToCell
            buttonText={from.buttonName}
            buttonTextShort={from.buttonNameShort}
            buttonLink={from.buttonLink}
            detailInfo={from.detailInfo}
            profileImgUrl={from.profileImgUrl}
          />
        );
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
      render: (_, { to, contract }) => (
        <ScanFromToCell
          type="to"
          buttonText={to.buttonName}
          buttonTextShort={to.buttonNameShort}
          buttonLink={to.buttonLink}
          detailInfo={to.detailInfo}
          profileImgUrl={to.profileImgUrl}
          contract={contract}
        />
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'daoTrustValue',
      align: 'right',
      width: 200,
      className: 'align-center',
      render: (_, { value }) => {
        return (
          <div className={cn('amount-value')}>
            {useNumberFormatterToFix(value.num)}
            <span className={cn('unit')}>{value.unit}</span>
          </div>
        );
      },
    },
    {
      title: 'TX Fee (WEMIX)',
      dataIndex: 'fee',
      key: 'daoTrustFee',
      align: 'right',
      className: 'align-right',
      width: isPC ? 144 : 108,
      /* 23.04.06 수정: 검수 - 말줄임 없는 케이스 추가로 인한 마크업 수정 */
      render: (_, { fee }) => {
        return <span className={cn('tx-fee')}>{fee}</span>;
      },
    },
  ];

  let locale = {
    emptyText: <Empty subText={t('scan.empty')} />,
  };

  return (
    <div className={cn('dao-table-wrap')}>
      {searchResult && <SearchResult num={searchResult} />}
      <Table
        className={cn('table-type-lg')}
        pagination={false}
        columns={scanFilterColumns}
        dataSource={scanTransaction}
        scroll={isTablet ? { x: 936 } : undefined}
        locale={locale}
      />

      {scanTransaction.length > 0 && <PaginationTransaction total={2000} jumpArray={[25, 50, 100]} />}
    </div>
  );
};

type propsType = {
  num?: number;
};
const SearchResult = ({ num }: propsType) => {
  return (
    <button
      className={cn('result-info')}
      onClick={() => {
        console.log('link');
      }}
    >
      <span>
        {num} results for <strong>‘Station’</strong>
      </span>
    </button>
  );
};

export default ScanTable;
