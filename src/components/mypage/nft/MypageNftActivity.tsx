import { useCallback, useEffect, useMemo, useState } from 'react';

import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import PaginationCustom from '@/components/button/PaginationCustom';
import Empty from '@/components/empty/Empty';
import MypageFilter from '@/components/mypage/MypageFilter';

import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/tag/Tag';
import { Input, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ReactSVG } from 'react-svg';
import { uuid } from 'uuidv4';
import { NileCDNLoader } from '@utils/image/loader';
import { MyPageActivityItemType, MyPageTabPros } from '@/types/myPage.types';
import { NileApiService } from '@/services/nile/api';
import { useAtomValue } from 'jotai';
import { defaultPageInfo, PageInfoType } from '@/types/common.types';
import { useWalletFormatter } from '@utils/formatter/wallet';
import dayjs from 'dayjs';
import { selectedWalletAtom } from '@/state/accountAtom';
import dynamic from 'next/dynamic';
import { useCountdown } from '@utils/countdown';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

const { Option } = Select;

const Popover = dynamic(() => import('antd/lib/popover'), { ssr: false });

const MypageNftActivity = ({ tabKey, currentTabKey }: MyPageTabPros) => {
  const { t } = useTranslation(['mypage', 'common', 'marketplace']);
  const [searchValue, setSearchValue] = useState('');
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { shorten } = useWalletFormatter();
  const { mypage } = NileApiService();
  const [activityList, setActivityList] = useState<MyPageActivityItemType[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoType>(defaultPageInfo);
  const selectedWallet = useAtomValue(selectedWalletAtom);

  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });

  const fetchActivities = useCallback(
    (page: number) => {
      mypage.activity
        .getList(page, 20, selectedWallet)
        .then(({ data }) => {
          setActivityList(data.results.map((item: any) => ({ key: item.id, ...item })));
          setPageInfo(data.pageInfo);
        })
        .catch((err) => console.log(err));
    },
    [selectedWallet],
  );

  const timestampFormatter = useCallback(
    (timestamp: string) => {
      const updateAt = dayjs.utc(timestamp);

      const remainDays = dayjs().diff(updateAt, 'day');
      const remainHours = dayjs().diff(updateAt, 'hour');
      const remainMinutes = dayjs().diff(updateAt, 'minute');
      const remainSeconds = dayjs().diff(updateAt, 'second');

      if (remainHours > 24) {
        return dayjs.utc(timestamp).local().format('YYYY-MM-DD HH:mm');
      }

      if (remainDays >= 1) {
        if (remainDays === 0) {
          return '1 days ago';
        } else {
          return updateAt.format('YYYY-MM-DD');
        }
      }

      if (remainHours > 0) {
        return `${remainHours} hours ago`;
      }

      if (remainMinutes > 0) {
        return `${remainMinutes} minutes ago`;
      }

      if (remainSeconds > 0) {
        return `${remainSeconds} seconds ago`;
      }
    },
    [remainTime],
  );

  useEffect(() => {
    selectedWallet && fetchActivities(1);
  }, [selectedWallet]);

  const Id = uuid();

  const onChange = (page: number) => {
    fetchActivities(page);
  };

  const offersType = (type: string) => {
    if (type === 'Canceled' || type === 'Expired') return true;
  };

  const tableColumns: ColumnsType<MyPageActivityItemType> = [
    {
      title: t('collectionPage.nftName', { ns: 'marketplace' }),
      key: 'nft',
      align: 'left',
      render: (_, { collectionAddress, tokenId, type, token, covenant, collection }) => (
        <div className={cn('nft-wrap')}>
          {token && (
            <>
              <div className="img-wrap">
                {token.imageUrl ? (
                  <Image src={token.imageUrl} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                ) : (
                  <video autoPlay loop muted playsInline disablePictureInPicture>
                    <source src={token?.videoUrl ?? ''} type="video/mp4" />
                  </video>
                )}
              </div>
              {/* 22.11.01 수정: 환불 받기 버튼 추가 */}
              <div className={cn('text-wrap', type === 'Expired' || (type === 'covenantClaim' && 'isBtn'))}>
                <Link
                  href={{
                    pathname: '/marketplace/[collectionAddressOrSlug]/[tokenId]',
                    query: { collectionAddressOrSlug: collectionAddress, tokenId: tokenId },
                  }}
                >
                  <a>
                    <span className={cn('name')}>{token && token.name}</span>
                    {/* 23.03.11 수정: isNft 추가 */}
                    {(collection?.slug === 'CONE' || collection?.slug === 'CORA' || collection?.slug === 'TTPS') && (
                      <span className={cn('icon-wrap')}>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/neithCollections/img_covenant_badge.svg" />
                      </span>
                    )}
                  </a>
                </Link>
                {type === 'Expired' && <button className={cn('refund-btn')}>{t('collectionPage.refund', { ns: 'marketplace' })}</button>}
                {covenant && (
                  <div className={cn('tag-wrap')}>
                    <Tag size="sm" type="tag">
                      Covenant Claim
                    </Tag>
                  </div>
                )}
              </div>
            </>
          )}
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
            {shorten(from)}
          </button>
          {to && <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_table_arrow.svg" />}
          <button type="button" onClick={() => {}}>
            {shorten(to)}
          </button>
        </div>
      ),
    },
    {
      title: t('collectionPage.type', { ns: 'marketplace' }),
      key: 'type',
      align: 'center',
      render: (_, { type }) => (
        <div className={cn('type-wrap', { cancel: offersType(type) })}>
          {offersType(type) ? (
            <>
              <Tag size="s" color="light-gray">
                {type === 'TRANSFER' && 'Transfer'}
              </Tag>
            </>
          ) : (
            <span>{t(`activity.type.${type}`, { ns: 'mypage' })}</span>
          )}
        </div>
      ),
    },
    {
      title: t('collectionPage.transactionAmount', { ns: 'marketplace' }),
      key: 'price',
      align: 'right',
      className: 'align-right',
      render: (_, { type, price, payment }) => (
        <div className={cn('price-wrap', { cancel: offersType(type) })}>
          {/* {price && fromWei(price, 'ether')} {payment && getPaymentUnit(payment)} */}
        </div>
      ),
    },
    {
      title: t('collectionPage.time', { ns: 'marketplace' }),
      key: 'date',
      align: 'right',
      className: 'align-right',
      render: (_, { timestamp, hash }) => (
        <Link href={`https://explorer.wemix.com/tx/${hash}`}>
          <a className={cn('time-wrap')} target="_blank">
            <div className={cn('tooltip-wrap')}>
              <Popover
                overlayClassName="tooltip"
                placement="top"
                content={<div className={cn('tooltip-contents')}>{dayjs.utc(timestamp).local().format('YYYY-MM-DD HH:mm:ss')}</div>}
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                {timestampFormatter(timestamp)}
              </Popover>
            </div>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
          </a>
        </Link>
      ),
    },
  ];

  return (
    <>
      {/*<div className={cn('mypage-utils activity')}>*/}
      {/*  <div className={cn('filters-wrap')}>*/}
      {/*    <MypageFilter />*/}
      {/*  </div>*/}
      {/*  <div className={cn('utils-wrap')}>*/}
      {/*    <Input*/}
      {/*      value={searchValue}*/}
      {/*      onChange={(e) => setSearchValue(e.target.value)}*/}
      {/*      placeholder={t('collectionPage.searchPlaceholder', { ns: 'marketplace' })}*/}
      {/*      prefix={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg" />}*/}
      {/*      allowClear={{*/}
      {/*        clearIcon: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_clear.svg" />,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <Select*/}
      {/*      size="middle"*/}
      {/*      defaultValue="week"*/}
      {/*      key={Id}*/}
      {/*      suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}*/}
      {/*      popupClassName="select-size-md-dropdown"*/}
      {/*      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}*/}
      {/*    >*/}
      {/*      <Option value="day">{t('1Day', { ns: 'common' })}</Option>*/}
      {/*      <Option value="week">{t('1Week', { ns: 'common' })}</Option>*/}
      {/*      <Option value="month">{t('1Month', { ns: 'common' })}</Option>*/}
      {/*      <Option value="all">{t('all', { ns: 'common' })}</Option>*/}
      {/*    </Select>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={cn('activity-table')}>
        {activityList.length > 0 && <span className={cn('total-num')}>{pageInfo.total} Activities</span>}
        {activityList.length > 0 ? (
          <>
            <Table
              className={cn('table-type-md')}
              columns={tableColumns}
              dataSource={activityList}
              pagination={false}
              scroll={isMobile ? { x: 688 } : undefined}
            />
            <PaginationCustom
              defaultCurrent={pageInfo.number + 1}
              defaultPageSize={pageInfo.size}
              total={pageInfo.total}
              onChange={onChange}
              activate={pageInfo.number + 1}
            />
          </>
        ) : (
          <Empty subText={t('empty.activity')} />
        )}
        {/* 검색시 조건에 맞는 결과 값이 없는 경우 */}
        {/* {collectionTableColumnsData.length < 1 && searchValue !== '' && (
          <Empty
            iconType="search"
            text={t('empty.searchDefault')}
            subText={locale === 'ko' ? "'sunny '" + t('empty.search') : t('empty.search') + "'sunny'"}
          />
        )} */}
      </div>
    </>
  );
};

export default MypageNftActivity;
