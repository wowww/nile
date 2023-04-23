import cn from 'classnames';

import { Popover, Table } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';

import { daoThemeAtom } from '@/state/daoAtom';

import { ScanFromToCell, DataProps } from '@/components/dao/ui/scan/ScanFromToCell';
import useMediaQuery from '@/hook/useMediaQuery';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';
/* 23.03.23 수정: Empty 케이스 추가 */
import Empty from '@/components/empty/Empty';

export const DaoStakingActivity = () => {
  const isPC = useMediaQuery('(min-width: 1440px)');
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const { t } = useTranslation('dao');

  const activeDao = useAtomValue(daoThemeAtom);

  const [daoObeliskData, setDaoObeliskData] = useState<DataProps[] | any>();

  const daoObelisk: DataProps[] = [
    {
      key: '1',
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
        unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
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
        buttonName: 'Obelisk',
        detailInfo: '상세주소',
        buttonLink: '/',
      },
      to: {
        buttonNameShort: '0x34fd...df67', // 지갑 주소(축약)
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67', // 지갑 주소
        profileImgUrl: 'https://picsum.photos/32/32/?image=1',
        buttonLink: '/',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: t('unit2', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
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
        unit: t('unit2', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
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
        buttonName: 'Obelisk',
        detailInfo: '상세주소',
        buttonLink: '/',
      },
      to: {
        buttonNameShort: '0x34fd...df67', // 지갑 주소(축약)
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67', // 지갑 주소
        profileImgUrl: 'https://picsum.photos/32/32/?image=1',
        buttonLink: '/',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
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
        buttonName: 'Obelisk',
        detailInfo: '상세주소',
        buttonLink: '/',
      },
      to: {
        buttonNameShort: '0x34fd...df67', // 지갑 주소(축약)
        detailInfo: '0x34fdbe8dd52dc2652920695bab822bb42891df67', // 지갑 주소
        profileImgUrl: 'https://picsum.photos/32/32/?image=1',
        buttonLink: '/',
      },
      contract: true,
      value: {
        num: 1000000,
        unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
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
      /* 23.03.31 수정: 툴팁 bottom->top으로 수정 */
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
                  {shortAge}
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

  let locale = {
    emptyText: <Empty subText={t('empty.noData', { ns: 'common' })} />,
  };

  useEffect(() => {
    setDaoObeliskData(daoObelisk);
  }, []);
  return (
    <div className={cn('dao-table-wrap')}>
      <Table
        className={cn('table-type-lg')}
        pagination={false}
        columns={DaoFilterColumns}
        dataSource={daoObeliskData}
        scroll={isTablet ? { x: 936 } : undefined}
        /* 23.03.23 수정: Empty 케이스 추가 */
        locale={locale}
      />
    </div>
  );
};
export default DaoStakingActivity;
