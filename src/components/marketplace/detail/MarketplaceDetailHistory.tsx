import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { PriceHistoryDataType } from '@/components/chart/chartDummyData';

import cn from 'classnames';

import { ReactSVG } from 'react-svg';
import NileNft from '@/models/nile/marketplace/NileNft';
import { useTranslation } from 'next-i18next';
import { NileApiService } from '@/services/nile/api';
import dayjs from 'dayjs';
import { fromWei } from 'web3-utils';
import { useWalletFormatter } from '@utils/formatter/wallet';
import Empty from '@components/empty/Empty';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';

const PriceHistoryChart = dynamic(() => import('@/components/chart/PriceHistoryChart'), {
  ssr: false,
});

export type TokenTransaction = {
  id: string;
  type: string;
  hash: string;
  from?: string;
  to?: string;
  timestamp: string;
};

export type TokenPrice = {
  id: string;
  payment: string;
  price: string;
  timestamp: string;
};

const MarketplaceDetailHistory = () => {
  const { t } = useTranslation('marketplace');
  const api = NileApiService();
  const nft = useAtomValue(marketNftAtom);

  const { shorten } = useWalletFormatter();

  const [transactions, setTransactions] = useState<TokenTransaction[]>();
  const [prices, setPrices] = useState<TokenPrice[]>();
  const [priceChartData, setPriceChartData] = useState<PriceHistoryDataType[]>([]);

  const nileAddress = [
    marketJsonAbiAddresses().current['CurateMarket'],
    marketJsonAbiAddresses().current['OpenMarket'],
    marketJsonAbiAddresses().current['EnglishAuctionOrder'],
  ];

  useEffect(() => {
    if (nft) {
      api.marketplace.nft
        .getTransactionHistory({
          collectionAddress: nft.token.collectionAddress,
          tokenId: nft.token.tokenId,
        })
        .then(({ data }) => {
          setTransactions(data.results);
        })
        .catch((e) => {
          console.log(e);
        });

      api.marketplace.nft
        .getPriceHistory({
          collectionAddress: nft.token.collectionAddress,
          tokenId: nft.token.tokenId,
        })
        .then(({ data }) => {
          console.log(data);
          setPrices(data.results);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [nft]);

  useEffect(() => {
    if (prices) {
      const datas = prices.map((price) => {
        return {
          date: dayjs.utc(price.timestamp).local().toDate().getTime(),
          value: Number(fromWei(price.price, 'ether')),
          bullet: false,
        };
      });
      console.log(datas);
      setPriceChartData(datas);
    }
  }, [prices]);

  const makeTransactionMessage = (tx: TokenTransaction) => {
    let messageId = '';

    if (tx.type === 'MINT') {
      return t(`detailHistory.1`, { 1: nft?.token.name });
    } else if (tx.type === 'AUCTION_START') {
      return t(`detailHistory.2`, { 1: shorten(tx.from) });
    } else if (tx.type === 'AUCTION_BID') {
      return t('detailHistory.3', { 1: shorten(tx.from) });
    } else if (tx.type === 'AUCTION_CLAIM') {
      return t('detailHistory.5', { 1: shorten(tx.from) });
    } else if (tx.type === 'TRANSFER') {
      return t('detailHistory.12', {
        1: nileAddress.includes(`${tx.from}`) ? 'NILE' : shorten(tx.from),
        2: nileAddress.includes(`${tx.to}`) ? 'NILE' : shorten(tx.to),
      });
    }

    return '';
  };

  /* 22.10.06 수정: infinite loader 관련 제거 */
  const historyList = [
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.1', { 1: 'user_name' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.2', { 1: 'user_name' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.3', { 1: 'user_name', 2: 'user_name2' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.4', { 1: 'user_name', 2: 'user_name2' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.5', { 1: 'user_name', 2: 'user_name2' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.6', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.7', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.8', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.9', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.10', { 1: 'user_name', 2: 'user_name2', 3: 'user_name3' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.11', { 1: 'user_name' }),
    },
    {
      profileImage: 'https://picsum.photos/32/32/?image=1',
      link: '/',
      text: t('detailHistory.12', { 1: 'user_name', 2: 'user_name2' }),
    },
  ];

  return (
    <div className={cn('marketplace-history')}>
      <div className={cn('chart-wrap')}>
        <PriceHistoryChart data={priceChartData} />
      </div>
      <div className={cn('history-wrap')}>
        <strong>Transaction History</strong>
        <div className={cn('history-list-wrap')}>
          <ul className={cn('history-list')}>
            {transactions && transactions?.length > 0 ? (
              transactions?.map((tx) => (
                <li key={`history-item-${tx.id}`} className={cn('history-item')}>
                  <button type="button" className={cn('btn-user-open')}>
                    {/*<Avatar*/}
                    {/*  className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}*/}
                    {/*  size={32}*/}
                    {/*  style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }}*/}
                    {/*/>*/}
                  </button>
                  <a href={`https://explorer.test.wemix.com/tx/${tx.hash}`} target={`_blank`}>
                    <span className={cn('text')}>{makeTransactionMessage(tx)}</span>
                    <span className={cn('time')}>{dayjs.utc(tx.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                  </a>
                </li>
              ))
            ) : (
              <Empty subText={t('noTransaction')} iconType="account" />
            )}
            {/* {historyList.map((item, index) => ( */}
            {/*   <li key={`history-item-${index}`} className={cn('history-item')}> */}
            {/*     <button type="button" className={cn('btn-user-open')}> */}
            {/*       <Avatar item={item} size={32} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} /> */}
            {/*     </button> */}
            {/*     <Link href={item.link}> */}
            {/*       <a> */}
            {/*         <span className={cn('text')}>{item.text}</span> */}
            {/*         <span className={cn('time')}>2022-08-11 15:32</span> */}
            {/*         <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' /> */}
            {/*       </a> */}
            {/*     </Link> */}
            {/*   </li> */}
            {/* ))} */}
          </ul>
          {/* 22.10.06 수정: InfiniteLoader 컴포넌트로 수정 */}
          {/* <InfiniteLoader /> */}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDetailHistory;
