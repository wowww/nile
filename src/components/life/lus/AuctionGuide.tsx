import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Trans, useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Scrollbar } from 'swiper';
import TextButton from '@/components/button/TextButton';
import lottie from 'lottie-web';

import lottieLusAuction from '@/assets/lottie/lottie_lus_auction.json';
import { ReactSVG } from 'react-svg';
import { NileCDNLoader } from '@utils/image/loader';

const AuctionGuide = () => {
  const { t } = useTranslation(['life', 'common']);
  const [swiperClassName, setSwiperClassName] = useState('first-slide');

  // lottie div Element
  const auctionLottieHeroWonder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: auctionLottieHeroWonder.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieLusAuction,
    });
  }, []);

  return (
    <div className={cn('auction-guide-wrap')}>
      <div className={cn('auction-inner')}>
        <h3 className={cn('auction-guide-title')}>{t('lus.auctionGuide.title')}</h3>
        <ul className={cn('auction-list-wrap')}>
          <li className={cn('list')}>
            {/* 22.11.17 수정 start: text-inner 추가 */}
            <div className={cn('text-inner')}>
              <strong className={cn('title')}>{t('lus.auctionGuide.item.0.title')}</strong>
              <p className={cn('desc')}>{t('lus.auctionGuide.item.0.desc')}</p>
              <div className={cn('img-wrap')}>
                <Image src="/assets/images/img/img_lus_auction1.png" alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
                {/* <div className="open-date-text">LUS 264</div> */}
              </div>
              <TextButton
                href="https://medium.com/nile-official/english-auction-the-most-popular-auction-format-made-by-the-sothebys-founder-5922c544a9b0"
                target="_blank"
                buttonText={t('lus.auctionGuide.item.0.button')}
                iconValue="line-arrow"
                gapSpacing="lg"
                size="md"
              />
            </div>
            {/* 22.11.17 수정 end: text-inner 추가 */}
          </li>
          <li className={cn('list')}>
            {/* 22.11.17 수정 start: text-inner 추가 */}
            <div className={cn('text-inner')}>
              <strong className={cn('title')}>{t('lus.auctionGuide.item.1.title')}</strong>
              <p className={cn('desc')}>{t('lus.auctionGuide.item.1.desc')}</p>
              <div className={cn('img-wrap')}>
                <Image src="/assets/images/img/img_lus_auction2.png" alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
              </div>
              <div className={cn('lottie')} ref={auctionLottieHeroWonder} />
              <p className={cn('sub-desc')}>{t('lus.auctionGuide.item.1.caption')}</p>
            </div>
            {/* 22.11.17 수정 end: text-inner 추가 */}
          </li>
          <li className={cn('list', 'full')}>
            {/* 22.11.17 수정 start: text-inner 추가 */}
            <div className={cn('text-inner')}>
              <strong className={cn('title')}>{t('lus.auctionGuide.item.2.title')}</strong>
              <div className={cn('list-inner')}>
                <p className={cn('desc')}>{t('lus.auctionGuide.item.2.desc')}</p>
                {/* 22.11.18 수정: 22일 3시 오픈 시 버튼 주석 표기 */}
                {/* <TextButton buttonText={t('lus.btn')} iconValue="line-arrow" gapSpacing="lg" size="md" href="/life/lusdetail" /> */}
              </div>
            </div>
            {/* 22.11.17 수정 end: text-inner 추가 */}
            <div className={cn('auction-detail-wrap', swiperClassName)}>
              <Swiper
                modules={[Pagination, Scrollbar]}
                scrollbar={{ el: '.swiper-scrollbar', draggable: true }}
                slidesPerView={5}
                spaceBetween={14}
                threshold={10}
                observer={true}
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
                    slidesPerView: 1.1,
                    spaceBetween: 14,
                    scrollbar: {
                      enabled: false,
                    },
                  },
                  360: {
                    slidesPerView: 1.1,
                    spaceBetween: 14,
                    scrollbar: {
                      enabled: false,
                    },
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 14,
                    scrollbar: {
                      enabled: true,
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
                pagination={{
                  clickable: true,
                }}
              >
                <SwiperSlide>
                  <Link href={''}>
                    <a href="/" className={cn('item')}>
                      <div className={cn('detail-top')}>
                        <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.4.name')}</strong>
                        <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.4.value')}</span>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
                      </div>
                      <div className={cn('auction-img-wrap')}>
                        <Image
                          src="/assets/images/icon/ico_lus_packed.gif"
                          alt=""
                          layout="fill"
                          quality="100"
                          loading="eager"
                          loader={NileCDNLoader}
                        />
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
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link href={''}>
                    <a href="/" className={cn('item')}>
                      <div className={cn('detail-top')}>
                        <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.3.name')}</strong>
                        <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.3.value')}</span>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
                      </div>
                      <div className={cn('auction-img-wrap')}>
                        <Image
                          src="/assets/images/icon/ico_lus_crowded.gif"
                          alt=""
                          layout="fill"
                          quality="100"
                          loading="eager"
                          loader={NileCDNLoader}
                        />
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
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link href={''}>
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
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link href={''}>
                    <a href="/" className={cn('item')}>
                      <div className={cn('detail-top')}>
                        <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.1.name')}</strong>
                        <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.1.value')}</span>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
                      </div>
                      <div className={cn('auction-img-wrap')}>
                        <Image
                          src="/assets/images/icon/ico_lus_moderate.gif"
                          alt=""
                          layout="fill"
                          quality="100"
                          loading="eager"
                          loader={NileCDNLoader}
                        />
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
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link href={''}>
                    <a href="/" className={cn('item')}>
                      <div className={cn('detail-top')}>
                        <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.0.name')}</strong>
                        <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.0.value')}</span>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
                      </div>
                      <div className={cn('auction-img-wrap')}>
                        <Image
                          src="/assets/images/icon/ico_lus_serene.gif"
                          alt=""
                          layout="fill"
                          quality="100"
                          loading="eager"
                          loader={NileCDNLoader}
                        />
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
                  </Link>
                </SwiperSlide>
              </Swiper>
              <div className={cn('swiper-scrollbar')}></div>
            </div>
            <p className={cn('sub-desc')}>{t('lus.auctionGuide.item.2.caption')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuctionGuide;
