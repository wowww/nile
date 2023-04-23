import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import cn from 'classnames';
/* 22.11.02 수정: useTranslation 추가 */
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { Select } from 'antd';
import Chip from '@/components/tag/Chip';
import TagData from '@/components/tag/TagData';
/* 22.11.21 수정: uid 추가 */
import { uuid } from 'uuidv4';
import { NileCDNLoader } from '@utils/image/loader';

const { Option } = Select;
interface RankingItem {
  key: string;
  rankingCount?: number;
  rankingState?: string;
  title: string;
  subTitle: string;
  img: string | StaticImageData;
  link: string;
}

interface TransactionsItem extends RankingItem {
  transitionDay: number;
}

interface HighestItem extends RankingItem {
  price: string;
  change: string;
  changeState: string;
}

interface CategoryRanking {
  key: string;
  name: string;
}

const MarketplaceRanking = () => {
  /* 22.11.21 수정: uid 추가 */
  const Id = uuid();

  /* 22.11.02 수정: useTranslation, useRouter 추가 */
  const { t } = useTranslation(['marketplace', 'common']);

  const [currentCategory, setCurrentCategory] = useState<string>('1');
  const [currentList, setCurrentList] = useState<(TransactionsItem | HighestItem)[]>([]);
  const [currentDay, setCurrentDay] = useState<string>('day');
  const [transactionRankingList, setTransactionRankingList] = useState<TransactionsItem[]>([
    {
      key: '1',
      rankingCount: 4,
      rankingState: 'up',
      title: 'P05 Piccadilly circus',
      subTitle: 'London Underground Station(LUS) 264 Genesis',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
    {
      key: '2',
      rankingCount: 4,
      rankingState: 'down',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz ',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
    {
      key: '3',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
    {
      key: '4',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
    {
      key: '5',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
    {
      key: '6',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
    {
      key: '7',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
    {
      key: '8',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
    {
      key: '9',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
    {
      key: '10',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      transitionDay: 1234,
    },
  ]);
  const [highestRankingList, setHighestRankingList] = useState<HighestItem[]>([
    {
      key: '1',
      rankingCount: 4,
      rankingState: 'up',
      title: 'P05 Piccadilly circus',
      subTitle: 'London Underground Station(LUS) 264 Genesis',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000.0000',
      change: '24.5%',
      changeState: 'up',
    },
    {
      key: '2',
      rankingCount: 4,
      rankingState: 'down',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000',
      change: '24.5%',
      changeState: 'down',
    },
    {
      key: '3',
      rankingCount: 4,
      rankingState: 'down',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000',
      change: '24.5%',
      changeState: 'down',
    },
    {
      key: '4',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000.0000',
      change: '24.5%',
      changeState: 'down',
    },
    {
      key: '5',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000.0000',
      change: '24.5%',
      changeState: 'down',
    },
    {
      key: '6',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000.0000',
      change: '24.5%',
      changeState: 'down',
    },
    {
      key: '7',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000.0000',
      change: '24.5%',
      changeState: 'down',
    },
    {
      key: '8',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000.0000',
      change: '24.5%',
      changeState: 'down',
    },
    {
      key: '9',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000.0000',
      change: '24.5%',
      changeState: 'down',
    },
    {
      key: '10',
      title: 'abcdefghijklnmopqrstuvwxyz abcdefghijklnmopqrstuvwxyz',
      subTitle: 'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz',
      img: '/temp/@temp_ranking.png',
      link: '/marketplace/collection',
      price: '1,000,000.0000',
      change: '24.5%',
      changeState: 'down',
    },
  ]);
  const categoryList: CategoryRanking[] = [
    {
      key: '1',
      name: t('ranking.tabBtn'),
    },
    {
      key: '2',
      name: t('ranking.tabBtn2'),
    },
  ];

  useEffect(() => {
    setCurrentList(transactionRankingList);
  }, []);

  return (
    <div className={cn('marketplace-ranking-section')}>
      <h3>{t('ranking.title')}</h3>
      <div className={cn('ranking-category')}>
        {categoryList.map((category: CategoryRanking, index: number) => (
          <button
            key={`ranking-category-${index}`}
            type="button"
            onClick={() => {
              setCurrentCategory(category.key);
              category.key === '1' && setCurrentList(transactionRankingList);
              category.key === '2' && setCurrentList(highestRankingList);
            }}
          >
            <Chip size="md" bg={category.key === currentCategory}>
              {category.name}
            </Chip>
          </button>
        ))}
      </div>
      <div className={cn('ranking-list-wrap')}>
        <div className={cn('ranking-list-top')}>
          <p>{currentCategory === '1' ? t('ranking.notice') : t('ranking.notice2')}</p>
          <Select
            size="small"
            defaultValue="1day"
            /* 22.11.21 수정:  셀렉트 키값 추가  */
            key={Id}
            suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
            popupClassName="select-size-sm-dropdown"
            onChange={(value) => {
              setCurrentDay(value);
            }}
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <Option value="day">1 Day</Option>
            <Option value="week">1 Week</Option>
            <Option value="month">1 Month</Option>
          </Select>
        </div>
        <div className={cn('ranking-list-content')}>
          <div className={cn('ranking-list')}>
            <div className={cn('ranking-list-head')}>
              <span className={cn('column-ranking')}>{t('ranking.unit')}</span>
              <span className={cn('column-nft')}>{t('ranking.unit2')}</span>
              {currentCategory === '1' && (
                <span className={cn('column-transition-day')}>
                  {t('ranking.unit3')} {currentDay}
                </span>
              )}

              {currentCategory === '2' && (
                <>
                  <span className={cn('column-price')}>Price($)</span>
                  <span className={cn('column-change')}>change(%)</span>
                </>
              )}
            </div>
            <ol className={cn('ranking-list-body')}>
              {currentList.map((item, index: number) => {
                const itemt = item as TransactionsItem;
                const itemh = item as HighestItem;
                return (
                  <li key={`ranking-list-${index}`} className={cn('row-list', { big: index < 3 })}>
                    <Link href={item.link}>
                      <a>
                        <div className={cn('column-ranking')}>
                          <div className={cn('ranking-wrap')}>
                            <strong>{item.key}</strong>
                            {item.rankingCount && item.rankingState && <TagData dataText={String(item.rankingCount)} option={item.rankingState} />}
                          </div>
                        </div>
                        <div className={cn('column-nft')}>
                          <div className={cn('nft-wrap')}>
                            <div className={cn('img-wrap')}>
                              <Image src={item.img} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                            </div>
                            <div className={cn('nft-title-wrap')}>
                              <span className={cn('nft-title')}>{item.title}</span>
                              <span className={cn('nft-sub-title')}>{item.subTitle}</span>
                            </div>
                          </div>
                        </div>
                        {currentCategory === '1' && (
                          <div className={cn('column-transition-day')}>
                            <div className={cn('transition-day-wrap')}>{itemt.transitionDay}</div>
                          </div>
                        )}
                        {currentCategory === '2' && (
                          <>
                            <div className={cn('column-price')}>
                              <div className={cn('price-wrap')}>{itemh.price}</div>
                            </div>
                            <div className={cn('column-change')}>
                              <div className={cn('change-wrap')}>
                                <TagData dataText={itemh.change} option={itemh.changeState} />
                              </div>
                            </div>
                          </>
                        )}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceRanking;
