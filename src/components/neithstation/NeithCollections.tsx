import cn from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { IconLogo } from '../logo/IconLogo';
import OutlineButton from '../button/OutlineButton';
import { NileCDNLoader } from '@/utils/image/loader';
import NeithContentTitle from '@/components/neithstation/NeithContentTitle';
import Tag from '@/components/tag/Tag';
import TimeList from '@/components/list/TimeList';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import useMediaQuery from '@/hook/useMediaQuery';
import getCollections from './collectionsData';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';

type Status = 'upcoming' | 'onSale' | 'onAuction';

export interface CollectionsData {
  type: string;
  name: string;
  status: Status;
  releaseDate: string;
  items: string;
  covenantValueWemix: string | null;
  covenantValue: string | null;
  covenantDate: string;
  marketLink: string;
}

const Collections = () => {
  const { t } = useTranslation('neithStation');
  const [tokenWemix, setTokenWemix] = useState<any>();
  const isMobile = useMediaQuery('(max-width: 767px)');

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
      console.log(tokenWemix?.price);
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value * tokenWemix?.price);
    },
    [tokenWemix],
  );

  /* 23.04.12 수정: collections 데이터 변수로 선언 */
  const collections = getCollections(t);
  /* 23.04.04 수정: collections 새 디자인으로 교체하며 신규 props 추가 */
  const collectionsData: CollectionsData[] = [
    {
      type: 'tangled',
      name: 'Tangled',
      status: 'onSale',
      releaseDate: collections.tangled.releaseDate as string,
      items: '100',
      covenantValueWemix: '20,000',
      covenantValue: getCurrentValue(20000),
      covenantDate: collections.tangled.covenantDate as string,
      marketLink: '/marketplace/TTPS',
    },
    {
      type: 'bagc',
      name: 'BAGC',
      status: 'upcoming',
      releaseDate: collections.bagc.releaseDate as string,
      items: '300',
      covenantValueWemix: null,
      covenantValue: null,
      covenantDate: collections.bagc.covenantDate as string,
      marketLink: '/life/bagc',
    },
    {
      type: 'cora',
      name: 'City of RA',
      status: 'onSale',
      releaseDate: collections.cora.releaseDate as string,
      items: '88',
      covenantValueWemix: '198,000',
      covenantValue: getCurrentValue(198000),
      covenantDate: collections.cora.covenantDate as string,
      marketLink: '/marketplace/CORA',
    },
    {
      type: 'cone',
      name: 'City of NEITH',
      status: 'onSale',
      releaseDate: collections.neith.releaseDate as string,
      items: '88',
      covenantValueWemix: '198,000',
      covenantValue: getCurrentValue(198000),
      covenantDate: collections.neith.covenantDate as string,
      marketLink: '/marketplace/CONE',
    },
  ];

  /* 23.04.04 수정: stateTag 함수 추가 */
  const stateTag = (state: Status) => {
    if (state !== 'onAuction') {
      return (
        <Tag size="md-m" color="dark-gray">
          {state === 'onSale' ? 'On Sale' : 'Upcoming'}
        </Tag>
      );
    } else {
      return (
        <Tag type="market" size="md-m" color="negative">
          On Auction
        </Tag>
      );
    }
  };

  return (
    /* 23.04.04 수정: collections 전체 새 디자인으로 교체 */
    <section className={cn('collections-wrap')}>
      <NeithContentTitle field="Collections" title={t('home.collections.title')} />
      <div className={cn('collections-wrap-inner')}>
        {/* 23.04.17 수정 start: Swiper로 구조 변경 */}
        <Swiper
          className="collections"
          autoplay={{
            delay: 5000,
          }}
          slidesPerView="auto"
          spaceBetween={16}
          breakpoints={{
            768: {
              spaceBetween: 24,
            },
          }}
        >
          {collectionsData.map((d, i) => (
            <SwiperSlide key={`collection-${i}`} className={cn('collection', d.type)}>
              <div className={cn('type-wrap')}>
                <IconLogo type={d.type} size={isMobile ? 52 : 60} fullType={true} />
                <div className={cn('name-wrap')}>
                  {stateTag(d.status)}
                  <h2>{d.name}</h2>
                </div>
              </div>
              <div className={cn('image-wrap')}>
                {d.status === 'upcoming' && d.type !== 'bagc' && (
                  <div className={cn('countdown-wrap')}>
                    <strong className={cn('auction-title')}>Auction Starts In</strong>
                    <TimeList target={dayjs.utc(process.env.NEXT_PUBLIC_ENV_NFT_CORA_START_DATE).tz('Asia/Seoul').format()} type="dot" />
                  </div>
                )}
                <Image
                  src={`/assets/images/img/neithCollections/img_collections_${d.type}.png`}
                  alt={`${d.name} Image`}
                  layout="fill"
                  loader={NileCDNLoader}
                />
              </div>
              <ul className={cn('info-wrap')}>
                <li>
                  <div className={cn('info-detail-wrap')}>
                    <span>Release Date {d.type ==='tangled' && <span>(Round 2)</span>}</span>
                    <strong>{d.releaseDate}</strong>
                  </div>
                </li>
                <li>
                  <div className={cn('info-detail-wrap')}>
                    <span>Items</span>
                    <strong>{d.items}</strong>
                  </div>
                </li>
                <li>
                  <div className={cn('info-detail-wrap')}>
                    <span>Collection Covenant</span>
                    <strong>
                      {d.covenantValueWemix ? d.covenantValueWemix + '\u00a0WEMIX' : t('tba')}
                      {d.covenantValue && <span>(${d.covenantValue})</span>}
                    </strong>
                  </div>
                </li>
                <li>
                  <div className={cn('info-detail-wrap')}>
                    <span>Covenant Date</span>
                    <strong>{d.covenantDate}</strong>
                  </div>
                </li>
              </ul>
              <div className={cn('button-wrap')}>
                {/* 23.04.10 수정: 버튼 레이블명 수정 */}
                <OutlineButton
                  color="white"
                  size={'md'}
                  type="primary"
                  buttonText={d.type === 'bagc' ? t('discoverProjectBtn', { ns: 'common' }) : t('goToCollection', { ns: 'common' })}
                  href={String(d.marketLink)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* 23.04.17 수정 end: Swiper로 구조 변경 */}
      </div>
    </section>
  );
};

export default Collections;
