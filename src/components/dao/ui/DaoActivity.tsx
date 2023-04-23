import cn from 'classnames';

import { Popover, Table } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import useMediaQuery from '@/hook/useMediaQuery';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';

import { ScanFromToCell, DataProps } from '@/components/dao/ui/scan/ScanFromToCell';
import Empty from '@/components/empty/Empty';

export const DaoActivity = () => {
  const { t } = useTranslation(['dao', 'common']);

  // daoTreasuryData 필터된 데이터
  const [daoTreasuryData, setDaoTreasuryData] = useState<DataProps[] | any>();
  const isPC = useMediaQuery('(min-width: 1440px)');
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const activeDao = useAtomValue(daoThemeAtom);

  const daoTreasury: DataProps[] = [
    {
      key: '1',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonName: 'Trust',
        detailInfo: '상세주소',
        buttonLink: '',
      },
      to: {
        buttonName: 'Treasury',
        detailInfo: '상세주소',
        buttonLink: '',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
    {
      key: '2',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonName: 'Treasury',
        detailInfo: '상세주소',
        buttonLink: '',
      },
      to: {
        buttonName: 'WEMIX.Fi',
        detailInfo: '상세주소',
        buttonLink: '',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
    {
      key: '3',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonName: 'WEMIX.Fi',
        detailInfo: '상세주소',
        buttonLink: '',
      },
      to: {
        buttonName: 'Treasury',
        detailInfo: '상세주소',
        buttonLink: '',
      },
      contract: true,
      value: {
        num: 2400,
        unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
      },
      fee: '0.021402...',
    },
    {
      key: '4',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonName: 'Treasury',
        detailInfo: '상세 주소',
        buttonLink: '',
      },
      to: {
        buttonNameShort: '0x34fd...df67',
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67',
        buttonLink: '',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
    {
      key: '5',
      hash: {
        buttonName: '0x34fd...df67',
        buttonLink: '',
      },
      shortAge: '10 secs ago',
      age: '2022-07-01 13:30:34',
      from: {
        buttonName: 'Trust Wallet',
        detailInfo: '상세 주소',
        buttonLink: '',
      },
      to: {
        buttonName: 'Treasury',
        detailInfo: '상세 주소',
        buttonLink: '',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
  ];

  const DaoFilterColumns: ColumnsType<DataProps> = [
    {
      title: 'TX Hash',
      dataIndex: 'hash',
      key: 'daoTrustHash',
      width: isPC ? 150 : 120,
      align: 'left',
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
      align: 'center',
      render: (_, { shortAge, age }) => {
        return (
          <>
            {shortAge ? (
              <div className={cn('tooltip-wrap')}>
                {/* 23.03.29 수정: 툴팁 방향 수정 */}
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
      width: isPC ? 144 : 108,
    },
  ];
  useEffect(() => {
    setDaoTreasuryData(daoTreasury);
  }, []);

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
export default DaoActivity;
