import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { DaoBox, DaoBoxLayout, DaoBoxTitle } from '../DaoBoxLayout';
import { useAtomValue } from 'jotai';
import { Popover, Table } from 'antd';
import RecruitMarqueeBannerModal from '@/components/modal/daostation/RecruitMarqueeBannerModal';
import { useEffect, useState } from 'react';
import { RecruitMarqueeBannerItemType } from '../station/recruit/RecruitMarqueeBanner';
import type { ColumnsType } from 'antd/es/table';

import DaoChartArea from '../DaoChartArea';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { ScanFromToCell, DataProps } from '@/components/dao/ui/scan/ScanFromToCell';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';
import useMediaQuery from '@/hook/useMediaQuery';
import Empty from '@/components/empty/Empty';
import TextButton from '@/components/button/TextButton';

const DaoIndividualHomeToken = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  const [size, setSize] = useState('xl');
  const daoUrlRoot = `/dao/ui/${activeDao.value}`;

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDaoMd = useMediaQuery('(max-width: 1024px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');
  const isTablet1024 = useMediaQuery('(max-width: 1023px)');
  const isDaoLg = useMediaQuery('(max-width: 1439px)');

  const daoHomeTableColumnsData: DataProps[] = [
    {
      key: '1',
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
    {
      key: '2',
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
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
    {
      key: '3',
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
    {
      key: '4',
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
        unit: 'WEMIX',
      },
      fee: '0.021402...',
    },
  ];

  const daoHomeTableColumns: ColumnsType<DataProps> = [
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'daoHomeAge',
      align: 'left',
      fixed: 'left',
      /* 23.03.23 수정: 정렬수정 */
      className: 'align-center',
      // width: isTablet && !isDaoLg ? 79 : isDaoLg ? 56 : 80,
      width: isMobile ? 80 : isDaoMd ? 79 : isDaoLg ? 56 : 80,
      /* 23.03.28 수정: 툴팁 깨짐 현상 destroyTooltipOnHide으로 변경 */
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
                  destroyTooltipOnHide={{ keepParent: false }}
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
      width: !isDaoLg || isMobile ? 128 : isDaoLg ? 126 : 134,
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
      width: 16,
      render: (_, {}) => {
        return <div className={cn('icon-arrow-direction')} aria-hidden="true"></div>;
      },
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'daoHomeTo',
      align: 'center',
      className: 'padding-default',
      width: !isDaoLg || isMobile ? 154 : isDaoLg ? 140 : 146,
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
      key: 'daoHomeValue',
      align: 'right',
      /* 23.03.23 수정: 정렬 수정 */
      className: 'align-center padding-amount',
      render: (_, { value }) => {
        return (
          <div className={cn('amount-value')}>
            {useNumberFormatterToFix(value.num)}
            <span className={cn('unit', 'block')}>{value.unit}</span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!isTablet1024 && !isDaoLg) {
      setSize('lg');
    } else if (!isMobile && isTablet1024) {
      setSize('md');
    } else if (isMobile) {
      setSize('sm');
    } else {
      setSize('xl');
    }
  }, [isMobile, isTablet, isTablet1024, isDaoLg]);

  let locale = {
    emptyText: <Empty subText={t('empty.noData', { ns: 'common' })} />,
  };

  return (
    <DaoBoxLayout className="half">
      <DaoBox className={cn('dao-home-type')}>
        <DaoChartArea
          areaType="home"
          title={t('price', { type: useDaoCharacterConvert(activeDao.value) })}
          figure={5.12}
          date="2022-07-22 03:30"
          exchange={1.41}
          total={1900000}
          titleHref={`${daoUrlRoot}/incinerator`}
        />
      </DaoBox>
      {/* 23.04.05 수정: arrow svg xl 케이스 변경 */}
      <DaoBox className="dao-common-card">
        <h4 className={cn('card-title')}>
          <TextButton buttonText="Obelisk" iconValue="arrow-xl" size="xl" href="/dao/ui/obelisk" />
        </h4>
        <div className={cn('staking-pool-wrap')}>
          <div className={cn('box-wrap')}>
            <span className={cn('ratio-number')}>
              <span className={cn('num')}>1</span>
              <span className={cn('unit')}>{`g.${useDaoCharacterConvert(activeDao.value)}`}</span>
            </span>
            <span className={cn('equal')}>=</span>
            <span className={cn('ratio-number')}>
              <span className={cn('num')}> 1.1421</span>
              <span className={cn('unit')}>{useDaoCharacterConvert(activeDao.value)}</span>
            </span>
          </div>

          <Table
            className={cn('table-type-md', 'dao-individual')}
            columns={daoHomeTableColumns}
            dataSource={daoHomeTableColumnsData}
            pagination={false}
            tableLayout={'fixed'}
            scroll={isMobile ? { x: 480 } : {}}
            locale={locale}
          />
        </div>
      </DaoBox>
      {/* <RecruitMarqueeBannerModal isOpen={isModal} setIsOpen={setIsModal} /> */}
    </DaoBoxLayout>
  );
};

export default DaoIndividualHomeToken;
