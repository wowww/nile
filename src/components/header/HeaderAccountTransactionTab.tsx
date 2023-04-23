import cn from 'classnames';
import Empty from '@components/empty/Empty';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { NileApiService } from '@/services/nile/api';
import dayjs from 'dayjs';
import { useWalletFormatter } from '@utils/formatter/wallet';

type HeaderAccountTransactionTabProps = {
  isOpen?: boolean;
};

type TransactionType = {
  id: string;
  type: string;
  hash: string;
  from: string;
  to: string;
  timestamp: string;
  collection?: any;
  token?: any;
};

interface transactionListItem {
  type: string;
  date: string;
  content: string;
  status: string;
  statusText: string;
  statusDetail?: string;
  url: string;
}

const transactionList: transactionListItem[] = [
  {
    type: 'NFT',
    date: '2022-06-24 15:44:00',
    content: '{NFT명}에 대한 응찰금 63.90 WEMIX$와 가스비 10 WEMIX가 결제되었습니다.',
    status: 'success',
    statusText: 'Bid 완료',
    url: '/',
  },
  {
    type: 'NFT',
    date: '2022-06-24 15:44:00',
    content: '{NFT명}에 대한 응찰금 63.90 WEMIX$와 가스비 10 WEMIX 결제에 실패하였습니다.',
    status: 'fail',
    statusText: 'Bid 실패',
    statusDetail: 'Network Error',
    url: '/',
  },
  {
    type: 'NFT',
    date: '2022-06-24 15:44:00',
    content: '{NFT명}에 대한 응찰금 63.90 WEMIX$와 가스비 10 WEMIX가 결제되었습니다.',
    status: 'success',
    statusText: 'Bid 완료',
    url: '/',
  },
  {
    type: 'NFT',
    date: '2022-06-24 15:44:00',
    content: '{NFT명}에 대한 응찰금 63.90 WEMIX$와 가스비 10 WEMIX 결제에 실패하였습니다.',
    status: 'fail',
    statusText: 'Bid 실패',
    statusDetail: 'Network Error',
    url: '/',
  },
];

export const HeaderAccountTransactionTab = ({ isOpen }: HeaderAccountTransactionTabProps) => {
  const { t } = useTranslation('common');
  const nileWallet = useAtomValue(nileWalletAtom);
  const api = NileApiService();

  const { shorten } = useWalletFormatter();

  const [transactions, setTransactions] = useState<TransactionType[]>();

  useEffect(() => {
    if (isOpen && nileWallet) {
      api.mypage.nft
        .getTransactionHistory(nileWallet)
        .then(({ data }) => {
          setTransactions(data.results);
        })
        .catch((e) => console.log(e));
    }

    return () => {
      setTransactions([]);
    };
  }, [isOpen]);

  return (
    <div className={cn('transaction-area', transactions?.length === 0 && 'empty')}>
      {(transactions?.length ?? 0) > 0 ? (
        <ul className={cn('transaction-list')}>
          {transactions?.map((transaction) => (
            <li key={transaction.id}>
              <div className="title-wrap">
                <span className="title">
                  {transaction.type}
                  <a href={`https://explorer.test.wemix.com/tx/${transaction?.hash}`} target="_blank" title={t('blank')} rel="noopener noreferrer">
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />
                    <span className="a11y">{t('seeMore')}</span>
                  </a>
                </span>
                <span className="date">{dayjs.utc(transaction.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>
              <p className="desc">
                {transaction.collection?.name} {transaction.token?.name}
              </p>
              <p className="desc">
                {shorten(transaction.from)} - {shorten(transaction.to)}
              </p>
              <div className="status-wrap">
                <strong className={cn('status', 'success')}>{transaction.type}</strong>
                {/* {!!item.statusDetail && <span className="status-detail">{item.statusDetail}</span>} */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Empty subText={t('header.account.noTransaction')} iconType="account" />
      )}
      {/*{transactionList.length > 0 ? (*/}
      {/*  <ul className={cn('transaction-list')}>*/}
      {/*    {transactionList.map((item: transactionListItem, index: number) => {*/}
      {/*      return (*/}
      {/*        <li key={item.type + index}>*/}
      {/*          <div className="title-wrap">*/}
      {/*            <span className="title">*/}
      {/*              {item.type}*/}
      {/*              <a href={item.url} target="_blank" title={t('blank')} rel="noopener noreferrer">*/}
      {/*                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />*/}
      {/*                <span className="a11y">{t('seeMore')}</span>*/}
      {/*              </a>*/}
      {/*            </span>*/}
      {/*            <span className="date">{item.date}</span>*/}
      {/*          </div>*/}
      {/*          <p className="desc">{item.content}</p>*/}
      {/*          <div className="status-wrap">*/}
      {/*            <strong className={cn('status', 'success')}>{item.statusText}</strong>*/}
      {/*            {!!item.statusDetail && <span className="status-detail">{item.statusDetail}</span>}*/}
      {/*          </div>*/}
      {/*        </li>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </ul>*/}
      {/*) : (*/}
      {/*  <Empty subText={t('header.account.noTransaction')} iconType="account" />*/}
      {/*)}*/}
    </div>
  );
};
