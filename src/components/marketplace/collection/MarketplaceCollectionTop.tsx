import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import cn from 'classnames';

import Tag from '@/components/tag/Tag';
import BgButton from '@/components/button/BgButton';
import ShareButton from '@/components/button/ShareButton';
import OutlineButton from '@/components/button/OutlineButton';
import { useTranslation } from 'next-i18next';
import CollectionBenefitModal from '@/components/modal/CollectionBenefitModal';
import { NileCDNLoader } from '@utils/image/loader';
import { NileApiService } from '@/services/nile/api';
import { OrderStatType, PriceStatType } from '@components/marketplace/MarketplaceSubBanner';
import { useNumberFormatter } from '@utils/formatter/number';
import CollectionSonModal from '@/components/modal/CollectionSonModal';
import axios from 'axios';
import { fromWei } from 'web3-utils';

const MarketplaceCollectionTop = ({ collection }: any) => {
  const api = NileApiService();
  const { t } = useTranslation('marketplace');
  const [isCollectionBenefitModal, setCollectionBenefitModal] = useState(false);
  const [isCollectionSonModal, setCollectionSonModal] = useState(false);

  const [orderStat, setOrderStat] = useState<OrderStatType>();
  const [priceStat, setPriceStat] = useState<PriceStatType>();

  const { shorthanded, isValidNumber } = useNumberFormatter();

  useEffect(() => {
    if (collection) {
      api.marketplace.collection
        .getOrderStat(collection.slug)
        .then(({ data }) => {
          setOrderStat(data.result);
        })
        .catch((e) => {
          setOrderStat({
            total: 0,
            ongoing: 0,
            closed: 0,
          });
        });

      api.marketplace.collection
        .getPriceStat(collection.slug)
        .then(({ data }) => {
          setPriceStat(data.result);
        })
        .catch((e) => {
          setPriceStat(undefined);
        });
    }
  }, [collection]);

  const [tokenWemix, setTokenWemix] = useState<any>();

  useEffect(() => {
    axios.get(`/api/tokenInfoList`).then(({ data }) => {
      data.forEach((token: any) => {
        if (token.token_symbol === 'WEMIX') {
          setTokenWemix(token);
        }
      });
    });
  }, []);

  const getCurrentValue = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value * tokenWemix?.price);
    },
    [tokenWemix],
  );

  return (
    <div className={cn('collection-top-section')}>
      <div className="collection-img-wrap">
        {collection?.logoImageUrl && <Image src={collection.logoImageUrl} alt="" layout="fill" loader={NileCDNLoader} unoptimized />}
      </div>
      <div className={cn('collection-info-wrap')}>
        <h2>{collection?.name}</h2>
        <p>
          {/*description: 값 null로 하드 코딩으로 수정
          {collection?.description}
          */}
          {collection?.slug === 'CORA' && t('collectionDetail.cora.desc')}
          {collection?.slug === 'CONE' && t('collectionDetail.cone.desc')}
          {collection?.slug === 'TTPS' && t('collectionDetail.tangled.desc')}
          {collection?.slug === 'KARI' && t('collectionDetail.kari.desc')}
          {collection?.slug === 'SNKRZ' && t('collectionDetail.snkrz.desc')}
        </p>
        <div className={cn('tag-list')}>
          {/*{collection?.categories.map((item: any) => (*/}
          {/*  <Tag size="sm" color="gray" bg>*/}
          {/*    {item}*/}
          {/*  </Tag>*/}
          {/*))}*/}
          {collection?.slug === 'LUS' && (
            <Tag size="sm" color="gray" bg>
              Pixel Art
            </Tag>
          )}

          {collection?.slug === 'CONE' || collection?.slug === 'CORA' && (
            <>
              <Tag size="sm" color="gray" bg>
                {'Collectibles'}
              </Tag>
              <Tag size="sm" color="gray" bg>
                {'PFP'}
              </Tag>
              <Tag size="sm" color="gray" bg>
                {'NEITH NFT'}
              </Tag>
            </>
          )}
          {collection?.slug === 'TTPS' && (
            <>
              <Tag size="sm" color="gray" bg>
                {'DApp'}
              </Tag>
              <Tag size="sm" color="gray" bg>
                {'Talk to Earn'}
              </Tag>
              <Tag size="sm" color="gray" bg>
                {'NEITH NFT'}
              </Tag>
            </>
          )}
          {/* 23.03.23 수정: Kari 프로젝트 태그 추가 */}
          {collection?.slug === 'KARI' && (
            <>
              <Tag size="sm" color="gray" bg>
                {'PFP'}
              </Tag>
            </>
          )}
          {collection?.slug === 'SNKRZ' && (
            <>
              <Tag size="sm" color="gray" bg>
                {'DApp'}
              </Tag>
              <Tag size="sm" color="gray" bg>
                {'Walk to Earn'}
              </Tag>
            </>
          )}
        </div>
      </div>
      {collection?.slug !== 'CONE' && collection?.slug !== 'TTPS' && collection?.slug !== 'CORA' ? (
        <div className={cn('collection-data-wrap')}>
          <div>
            <dl>
              <dt>{t('collectionPage.head.data.1')}</dt>
              <dd>{orderStat && orderStat.total}</dd>
            </dl>
            <dl>
              <dt>{collection?.slug === 'KARI' ||collection?.slug==='SNKRZ' ? t('collectionPage.head.data.6') : t('collectionPage.head.data.2')}</dt>
              <dd>{collection?.slug==='SNKRZ' ? 0: orderStat && orderStat.ongoing}</dd>
            </dl>
            <dl>
              <dt>{collection?.slug === 'KARI'||collection?.slug==='SNKRZ' ? t('collectionPage.head.data.7') : t('collectionPage.head.data.5')}</dt>
              <dd>{orderStat && orderStat.closed}</dd>
            </dl>
          </div>
          <dl>
            <dt>{t('collectionPage.head.data.3')}</dt>
            <dd>
              {priceStat &&
                isValidNumber(priceStat.floorPrice) &&
                shorthanded(Number(fromWei(String(priceStat.floorPrice ?? '0'), 'ether')))}{' '}
              <span>WEMIX$</span>
            </dd>
          </dl>
          <dl>
            <dt>{t('collectionPage.head.data.4')}</dt>
            <dd>
              {priceStat &&
                isValidNumber(priceStat.totalPrice) &&
                shorthanded(Number(fromWei(String(priceStat.totalPrice ?? '0'), 'ether')))}{' '}
              <span>WEMIX$</span>
            </dd>
          </dl>
        </div>
      ) : (
        <div className={cn('collection-data-wrap neith-type')}>
          <div>
            <dl>
              {/* 23.03.14 수정: Value 삭제 wemix $환산 가치 순서 변경 */}
              <dt>Collection Covenant</dt>
              <dd>
                {collection?.slug === 'CONE' || collection?.slug === 'CORA' ? '198,000' : '10,000'} WEMIX
                <span className={cn('convert-value')}>
                  (${collection?.slug === 'CONE' || collection?.slug === 'CORA' ? `${getCurrentValue(198000)}` : `${getCurrentValue(10000)}`})
                </span>
              </dd>
            </dl>
            <dl>
              <dt>Covenant Date</dt>
              <dd>
                2024-
                {collection?.slug === 'CONE' && '03-16'}
                {collection?.slug === 'TTPS' && '03-22'}
                {collection?.slug === 'CORA' && '04-12'}
              </dd>
            </dl>
          </div>
          <div>
            <dl>
              <dt>Total Trading Volume</dt>
              <dd>
                {priceStat && shorthanded(Number(fromWei(String(priceStat.totalPrice ?? '0'), 'ether')))}
                <span className="unit">WEMIX$</span>
              </dd>
            </dl>
            <dl>
              <dt>Items</dt>
              <dd>{orderStat && orderStat.total}</dd>
            </dl>
          </div>
        </div>
      )}

      <div className={cn('collection-utils-wrap')}>
        <BgButton buttonText={t('collectionPage.head.btn')} color="black" size="md" href={collection?.slug === 'CORA' ? '/life/cone?tab=nfts' : `/life/${collection?.slug.toLowerCase()}`}></BgButton>
        {collection?.slug === 'LUS' && (
          <OutlineButton
            buttonText={t('collectionPage.head.btn2')}
            color="black"
            size="md"
            onClick={() => {
              setCollectionBenefitModal(true);
            }}
          ></OutlineButton>
        )}
        {collection?.slug === 'SON' && (
          <OutlineButton
            buttonText={t('collectionPage.head.btn3')}
            color="black"
            size="md"
            onClick={() => {
              setCollectionSonModal(true);
            }}
          ></OutlineButton>
        )}

        {collection?.slug === 'CONE' ||
          (collection?.slug === 'TTPS' ||
            collection?.slug === 'CORA' && (
            <OutlineButton buttonText={t('collectionPage.head.btn4')} color="black" size="md" href={'/neith-station'}></OutlineButton>
          ))}

        {/*<LikeButton count={collection.likeCount} isLike={collection.favorite}/>*/}
        <ShareButton placement="bottomLeft" telegram facebook />
      </div>
      <CollectionBenefitModal isModal={isCollectionBenefitModal} setIsModal={setCollectionBenefitModal} />
      <CollectionSonModal isModal={isCollectionSonModal} setIsModal={setCollectionSonModal} />
    </div>
  );
};

export default MarketplaceCollectionTop;
