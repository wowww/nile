import cn from 'classnames';
import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@/utils/image/loader';

const CollectionCard = ({ category, price, amount }: { category: string; price?: number; amount?: number }) => {
  const { t } = useTranslation(['life', 'common']);
  const getThumb = (category: string): string => {
    switch (category) {
      case 'Mythical':
        return '/assets/images/img/img_con_mythical_thumbnail.png';
      case 'Legendary':
        return '/assets/images/img/img_con_legendary_thumbnail.png';
      case 'Epic':
        return '/assets/images/img/img_con_epic_thumbnail.png';
      case 'Rare':
        return '/assets/images/img/img_con_rare_thumbnail.png';
      case 'Civic':
        return '/assets/images/img/img_con_civic_thumbnail.png';
      default:
        return '/assets/images/img/img_con_mythical_thumbnail.png';
    }
  };

  return (
    <div className={cn('collection-card', category?.toLocaleLowerCase())}>
      <div className={cn('collection-card-dim')}></div>
      <div className={cn('category-thumb')}>
        <p className={cn('category')}>{category}</p>
        <div className={cn('thumbnail')}>
          <Image src={getThumb(category)} alt={category} layout="fill" objectFit="contain" loader={NileCDNLoader} />
        </div>
      </div>
      <div className={cn('price-amount-info')}>
        <div className={cn('price')}>
          {/* 23.03.16 수정: 가격 정보 분기 삭제(옥션가로 텍스트 고정) */}
          {/* 23.03.16 수정: Starting Price -> Bid 문구 수정으로 다국어 표기 */}
          <span className={cn('sub-title')}>{t('startingBid', { ns: 'common' })}</span>
          <p>
            {price?.toLocaleString('ko-KR')} <span>WEMIX$</span>
            {/* 23.03.13 수정: key값 수정 */}
            {/*{t('toBeRevealed', { ns: 'common' })}*/}
          </p>
        </div>

        <div className={cn('amount')}>
          <span className={cn('sub-title')}>{t('con.collections.collectionCount')}</span>
          <p>
            {amount}
            {/* 23.03.13 수정: 다국어 적용 */}
            <span>{t('con.collections.count')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const ConCollections = () => {
  const { t } = useTranslation('life');
  return (
    <div className={cn('life-neith-section collections-info')}>
      <div className={cn('life-neith-section-inner')}>
        <h2>{t('con.collections.headingTitle')}</h2>
        <div className={cn('collections-cards-wrap')}>
          <div className={cn('collections-cards')}>
            <div className={cn('type-auction')}>
              <p className={cn('title')}>
                <strong>{t('con.collections.auctionTitle')}</strong>
              </p>
              <div className={cn('cards-wrap')}>
                <CollectionCard category="Mythical" price={100000} amount={1} />
                <CollectionCard category="Legendary" price={50000} amount={1} />
                <CollectionCard category="Epic" price={10000} amount={2} />
                <CollectionCard category="Rare" price={5000} amount={4} />
                <CollectionCard category="Civic" price={100} amount={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConCollections);
