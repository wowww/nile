import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';
import { Select } from 'antd';
import { windowResizeAtom } from '@/state/windowAtom';
import { Helmet } from 'react-helmet-async';
import MarketplaceCollectionBanner from '@/components/marketplace/collection/MarketplaceCollectionBanner';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SwiperCore, { Pagination, Scrollbar } from 'swiper';
import { arr1100, arr1400, arr1800, arr2200, arr750 } from '@/components/life/lus/LusData';
import { ReactSVG } from 'react-svg';
import { cardDataPropsType } from '@/components/marketplace/cardData';
import { NileCDNLoader } from '@utils/image/loader';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import { useAtomValue } from 'jotai';
import { Swiper, SwiperSlide } from 'swiper/react';

interface categoryProps {
  selectedMenu: string;
  setSelectedMenu: (selectedMenu: string) => void;
}

const selectData: any = {
  Red: 4,
  Orange: 9,
  Yellow: 21,
  Green: 44,
  Blue: 186,
};

const priceData: any = {
  Red: '2,200',
  Orange: '1,800',
  Yellow: '1,400',
  Green: '1,100',
  Blue: '750',
};

const { Option } = Select;

const LusDetail = () => {
  const { t } = useTranslation(['common']);
  const [cardDummy, setCardDummy] = useState<NileNftToken[] | cardDataPropsType[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<any>('Red');

  useEffect(() => {
    if (selectedMenu === 'Blue') setCardDummy(arr750);
    else if (selectedMenu === 'Green') setCardDummy(arr1100);
    else if (selectedMenu === 'Yellow') setCardDummy(arr1400);
    else if (selectedMenu === 'Orange') setCardDummy(arr1800);
    else if (selectedMenu === 'Red') setCardDummy(arr2200);
  }, [selectedMenu]);

  return (
    <>
      <Helmet>
        {/* <html className={cn(offset.width < 768 && open && 'body-lock')} /> */}
        <body className={cn('lus-detail')} />
      </Helmet>

      <div className={cn('lus-detail-wrap')}>
        <MarketplaceCollectionBanner />
        <LusDetailTop />
        <div className={cn('lus-detail-inner')}>
          <Category selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
          <div className={cn('card-area')}>
            <div className={cn('info')}>
              <span>
                {selectedMenu} ({selectData[selectedMenu]})
              </span>
              <span className={cn('figure')}>
                {priceData[selectedMenu]} <span className={cn('unit')}>WEMIX$</span>
              </span>
            </div>
            {/*<div className={cn(selectedMenu)}>*/}
            {/*  <MarketplaceCard cardData={cardDummy} />*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

const Category: React.FC<categoryProps> = ({ selectedMenu, setSelectedMenu }) => {
  const offset = useAtomValue(windowResizeAtom);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [tabOffsetTop, setTabOffsetTop] = useState<number>(0);
  const onChange = (value: string) => {
    setSelectedMenu(value);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, tabOffsetTop);
    }
  };
  const menuList = [];
  const menuListMo = [];
  (function() {
    for (const [key, value] of Object.entries(selectData)) {
      menuList.push(
        <li className={cn(key === selectedMenu ? 'active' : '')} key={`${key}-${value}`}>
          <button type="button" onClick={() => setSelectedMenu(key)}>
            {`${key} (${value})`}
          </button>
        </li>,
      );
    }
  })();

  (function() {
    for (const [key, value] of Object.entries(selectData)) {
      menuListMo.push(
        <Option value={key}>
          {`${key} (${value})`}
        </Option>,
      );
    }
  })();
  useEffect(() => {
    setTabOffsetTop(categoryRef.current?.offsetTop ?? 0);
  }, [offset.width]);
  return (
    <div className={cn('lus-detail-category-wrap')} ref={categoryRef}>
      <ul className={cn('lus-detail-category-list')}>{menuList}</ul>

      <Select
        size="middle"
        defaultValue={selectedMenu}
        suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
        popupClassName="select-size-md-dropdown"
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
        onChange={onChange}
      >
        {menuListMo}
      </Select>
    </div>
  );
};

const LusDetailTop = () => {
  const { t } = useTranslation(['marketplace', 'common', 'life']);
  return (
    <>
      <div className={cn('collection-top-section')}>
        <div className="collection-img-wrap">
          <Image src="/temp/@temp_collection_represent.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
        </div>
        <div className={cn('collection-info-wrap')}>
          <h2>London Underground Station(LUS) 264 Genesis</h2>
          <p>{t('lus.detail.desc', { ns: 'life' })}</p>
        </div>
        <div className={cn('collection-data-wrap')}>
          <dl>
            <dt>{t('collectionPage.head.data.1')}</dt>
            <dd>264</dd>
          </dl>
          <dl>
            {/* 22.11.18 수정: QA시트 221117 25번 사항 */}
            <dt>Opens on</dt>
            <dd>2022-11-22</dd>
          </dl>
          <dl>
            <dt>{t('creator', { ns: 'common' })}</dt>
            <dd>Zeeha & Locho</dd>
          </dl>
        </div>
      </div>
      <AuctionGuide />
    </>
  );
};

const AuctionGuide = () => {
  const { t, i18n } = useTranslation(['life']);
  const [swiperClassName, setSwiperClassName] = useState('first-slide');
  return (
    <div className={cn('auction-guide-wrap')}>
      <div className={cn('auction-inner')}>
        <ul className={cn('auction-list-wrap')}>
          <li className={cn('list', 'full')}>
            <p className={cn('desc')}>
              {i18n.language === 'ko'
                ? '옥션 시작가는 각 역의 연간 이용객 수*에 따라 5개로 나뉩니다.'
                : 'The starting price of the auction is divided into 5 parts, according to the number of annual passengers* at each station.'}
            </p>
            <div className={cn('auction-detail-wrap', swiperClassName)}>
              <Swiper
                modules={[Pagination, Scrollbar]}
                scrollbar={{ el: '.swiper-scrollbar', draggable: false }}
                slidesPerView={5}
                spaceBetween={14}
                threshold={10}
                onSlideChange={(swiper: SwiperCore) => {
                  if (swiper.realIndex === 0) {
                    setSwiperClassName('first-slide');
                  } else if (swiper.realIndex === swiper.slides.length - 1) {
                    setSwiperClassName('last-slide');
                  } else {
                    setSwiperClassName('');
                  }
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1.23,
                    spaceBetween: 14,
                    scrollbar: {
                      enabled: false,
                    },
                  },
                  360: {
                    slidesPerView: 1.23,
                    spaceBetween: 12,
                    scrollbar: {
                      enabled: false,
                    },
                  },
                  768: {
                    slidesPerView: 3.12,
                    spaceBetween: 14,
                    scrollbar: {
                      enabled: false,
                    },
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 14,
                    scrollbar: {
                      enabled: false,
                    },
                  },
                }}
              >
                <SwiperSlide>
                  <a href="/" className={cn('item')}>
                    <div className={cn('detail-top')}>
                      <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.4.name')}</strong>
                      <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.4.value')}</span>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
                    </div>
                    <div className={cn('auction-img-wrap')}>
                      <Image src="/assets/images/icon/ico_lus_packed.gif" alt="" layout="fill" loader={NileCDNLoader} />
                    </div>
                    <div className={cn('detail-bottom')}>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.4.sub.desc1"
                          ns="life"
                          values={{
                            strong1: t('lus.auctionGuide.item.2.list.4.sub.strong1'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.4.sub.desc2"
                          ns="life"
                          values={{
                            strong2: t('lus.auctionGuide.item.2.list.4.sub.strong2'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                    </div>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a href="/" className={cn('item')}>
                    <div className={cn('detail-top')}>
                      <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.3.name')}</strong>
                      <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.3.value')}</span>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
                    </div>
                    <div className={cn('auction-img-wrap')}>
                      <Image src="/assets/images/icon/ico_lus_crowded.gif" alt="" layout="fill" quality="100" loading="eager"
                             loader={NileCDNLoader} />
                    </div>
                    <div className={cn('detail-bottom')}>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.3.sub.desc1"
                          ns="life"
                          values={{
                            strong1: t('lus.auctionGuide.item.2.list.3.sub.strong1'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.3.sub.desc2"
                          ns="life"
                          values={{
                            strong2: t('lus.auctionGuide.item.2.list.3.sub.strong2'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                    </div>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a href="/" className={cn('item')}>
                    <div className={cn('detail-top')}>
                      <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.2.name')}</strong>
                      <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.2.value')}</span>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
                    </div>
                    <div className={cn('auction-img-wrap')}>
                      <Image src="/assets/images/icon/ico_lus_busy.gif" alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
                    </div>
                    <div className={cn('detail-bottom')}>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.2.sub.desc1"
                          ns="life"
                          values={{
                            strong1: t('lus.auctionGuide.item.2.list.2.sub.strong1'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.2.sub.desc2"
                          ns="life"
                          values={{
                            strong2: t('lus.auctionGuide.item.2.list.2.sub.strong2'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                    </div>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a href="/" className={cn('item')}>
                    <div className={cn('detail-top')}>
                      <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.1.name')}</strong>
                      <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.1.value')}</span>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
                    </div>
                    <div className={cn('auction-img-wrap')}>
                      <Image src="/assets/images/icon/ico_lus_moderate.gif" alt="" layout="fill" quality="100" loading="eager"
                             loader={NileCDNLoader} />
                    </div>
                    <div className={cn('detail-bottom')}>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.1.sub.desc1"
                          ns="life"
                          values={{
                            strong1: t('lus.auctionGuide.item.2.list.1.sub.strong1'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.1.sub.desc2"
                          ns="life"
                          values={{
                            strong2: t('lus.auctionGuide.item.2.list.1.sub.strong2'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                    </div>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a href="/" className={cn('item')}>
                    <div className={cn('detail-top')}>
                      <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.0.name')}</strong>
                      <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.0.value')}</span>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
                    </div>
                    <div className={cn('auction-img-wrap')}>
                      <Image src="/assets/images/icon/ico_lus_serene.gif" alt="" layout="fill" quality="100" loading="eager"
                             loader={NileCDNLoader} />
                    </div>
                    <div className={cn('detail-bottom')}>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.0.sub.desc1"
                          ns="life"
                          values={{
                            strong1: t('lus.auctionGuide.item.2.list.0.sub.strong1'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                      <p className={cn('text')}>
                        <Trans
                          i18nKey="lus.auctionGuide.item.2.list.0.sub.desc2"
                          ns="life"
                          values={{
                            strong2: t('lus.auctionGuide.item.2.list.0.sub.strong2'),
                          }}
                        >
                          <strong className={cn('important')}></strong>
                        </Trans>
                      </p>
                    </div>
                  </a>
                </SwiperSlide>
              </Swiper>
              <div className={cn('swiper-scrollbar')}></div>
            </div>
            <p className={cn('sub-desc')}>{t('lus.auctionGuide.item.2.comment')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      // 22.11.02 수정: 다국어 추가
      ...(await serverSideTranslations(locale, ['common', 'marketplace', 'life'])),
    },
  };
};

export default LusDetail;
