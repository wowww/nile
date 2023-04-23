import { useState } from 'react';

import cn from 'classnames';
import type { ColumnsType } from 'antd/es/table';
import { Input, Popover, Select, Table } from 'antd';
import PaginationCustom from '@/components/button/PaginationCustom';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/tag/Tag';
import { ReactSVG } from 'react-svg';
import { uuid } from 'uuidv4';
import { NileCDNLoader } from '@utils/image/loader';

const { Option } = Select;

export interface collectionTableDataType {
  key?: string;
  nftLink: string;
  link: string;
  img: string;
  nft: string;
  from: string;
  to: string | null;
  type: string;
  price: string;
  date: string;
  detailDate: string | null;
  whichCancel?: string;
}

const MarketplaceCollectionActivity = () => {
  const [activatePagination, setPaginationActivate] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const Id = uuid();
  const Id2 = uuid();

  const onChange = (page: number) => {
    setPaginationActivate(page);
  };

  const { t } = useTranslation(['marketplace', 'common']);
  const offersType = (type: string) => {
    if (type === 'Canceled' || type === 'Expired') return true;
  };
  const collectionTableColumnsData: collectionTableDataType[] = [
    {
      key: '1',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_collection_represent.png',
      nft: 'abcdefghijklnmopqrstuvwxyzabcdefghijkln abcdefghijklnmopqrstuvwxyznmopqrstuv',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Sale',
      price: '1,000,000.000 WEMIX$',
      date: '2022-08-23 14:52',
      detailDate: null,
    },
    {
      key: '2',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: '024 Hounslow West ',
      from: '0x34fd...df67',
      to: null,
      type: 'Listing',
      price: '14,000 WEMIX$',
      date: '3 hours ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '3',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Offer',
      price: '1,000,000.000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '4',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Canceled',
      whichCancel: 'Offers',
      price: '1,000,000.000 WEMIX$',
      date: '30 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '5',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Expired',
      whichCancel: 'Offers',
      price: '14,000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '6',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Transfer',
      price: '1,000,000.000 WEMIX$',
      date: '2022-08-23 14:52',
      detailDate: null,
    },
    {
      key: '7',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_collection_represent.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Sale',
      price: '1,000,000.000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '8',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: '024 Hounslow West ',
      from: '0x34fd...df67',
      to: null,
      type: 'Listing',
      price: '1,000,000.000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '9',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Offer',
      price: '1,000,000.000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '10',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Canceled',
      whichCancel: 'Listing',
      price: '1,000,000.000 WEMIX$',
      date: '30 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
  ];
  const collectionTableColumns: ColumnsType<collectionTableDataType> = [
    {
      title: t('collectionPage.nftName'),
      key: 'nft',
      align: 'left',
      render: (_, { nftLink, nft, img, type }) => (
        <div className={cn('nft-wrap')}>
          <div className="img-wrap">
            <Image src={img} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
          </div>
          <div className={cn('text-wrap', type === 'Expired' && 'isBtn')}>
            <Link href={nftLink}>
              <a>{nft}</a>
            </Link>
            {type === 'Expired' && <button className={cn('refund-btn')}>{t('refund')}</button>}
          </div>
        </div>
      ),
    },
    {
      title: <span>From &rarr; To</span>,
      key: 'fromto',
      align: 'center',
      render: (_, { from, to }) => (
        <div className={cn('fromto-wrap')}>
          <button type="button" onClick={() => {}}>
            {from}
          </button>
          {to && <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_table_arrow.svg' />}
          <button type="button" onClick={() => {}}>
            {to}
          </button>
        </div>
      ),
    },
    {
      title: t('collectionPage.type'),
      key: 'type',
      align: 'center',
      render: (_, { type, whichCancel }) => (
        <div className={cn('type-wrap', { cancel: offersType(type) })}>
          {offersType(type) ? (
            <>
              <span>{whichCancel}</span>
              <Tag size="s" color="light-gray">
                {type}
              </Tag>
            </>
          ) : (
            <span>{type}</span>
          )}
        </div>
      ),
    },
    {
      title: t('collectionPage.transactionAmount'),
      key: 'price',
      align: 'right',
      className: 'align-right',
      render: (_, { type, price }) => <div className={cn('price-wrap', { cancel: offersType(type) })}>{price}</div>,
    },
    {
      title: t('collectionPage.time'),
      key: 'date',
      align: 'right',
      className: 'align-right',
      render: (_, { link, date, detailDate }) => (
        <Link href={link}>
          <a className={cn('time-wrap')}>
            {detailDate === null ? (
              <>{date}</>
            ) : (
              <div className={cn('tooltip-wrap')}>
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={<div className={cn('tooltip-contents')}>{detailDate}</div>}
                  trigger="hover"
                  getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                >
                  {date}
                </Popover>
              </div>
            )}
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
          </a>
        </Link>
      ),
    },
  ];
  return (
    <div className={cn('activity-wrap')}>
      <div className={cn('activity-top')}>
        <div className={cn('activity-utils')}>
          <span className={cn('total')}>1,291 NFT</span>
          <Select
            size="middle"
            defaultValue={t('collectionPage.filter.1')}
            key={Id}
            suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <Option value="all">{t('collectionPage.filter.1')}</Option>
            <Option value="sales">{t('collectionPage.filter.2')}</Option>
            <Option value="listings">{t('collectionPage.filter.3')}</Option>
            <Option value="offers">{t('collectionPage.filter.4')}</Option>
            <Option value="transfers">{t('collectionPage.filter.5')}</Option>
          </Select>
          <Select
            size="middle"
            defaultValue="week"
            key={Id2}
            suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <Option value="day">1Day</Option>
            <Option value="week">1Week</Option>
            <Option value="month">1Month</Option>
            <Option value="all">All</Option>
          </Select>
        </div>
        <div className={cn('activity-search')}>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t('collectionPage.searchPlaceholder')}
            prefix={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg' />}
            allowClear={{ clearIcon: <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_clear.svg' /> }}
          />
        </div>
      </div>
      <div className={cn('activity-table')}>
        {collectionTableColumnsData.length > 0 && (
          <>
            <Table
              scroll={{ x: true }}
              className={cn('table-type-md')}
              columns={collectionTableColumns}
              dataSource={collectionTableColumnsData}
              pagination={false}
            />
            <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChange} activate={activatePagination} />
          </>
        )}
        {/* 조건문은 수정 필요 */}
        {/* 필터시 조건에 맞는 결과 값이 없는 경우 */}
        {/* {collectionTableColumnsData.length > 1 && searchValue === '' && <Empty subText={t('filterEmptyCase', { ns: 'common' })} />} */}

        {/* 검색시 조건에 맞는 결과 값이 없는 경우 */}
        {/* {collectionTableColumnsData.length < 1 && searchValue !== '' && (
          <Empty iconType="search" text={t('collectionPage.noSearch')} subText={t('collectionPage.noSearchKeyword', { keyword: 'asdf' })} />
        )} */}
      </div>
    </div>
  );
};

export default MarketplaceCollectionActivity;
