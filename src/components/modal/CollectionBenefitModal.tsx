import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Trans, useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import Tag from '../tag/Tag';
import ModalSlideLayout from './ModalSlideLayout';
import { Modal } from 'antd';
import { NileCDNLoader } from '@utils/image/loader';

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

const CollectionBenefitModal = ({ isModal, setIsModal }: Props) => {
  const { t } = useTranslation(['life', 'common']);

  const [swiperClassName, setSwiperClassName] = useState('first-slide');

  const swiperEvt = useRef<any>();
  const innerSwiperEvt = useRef<any>();

  const onModalClose = () => {
    Modal.destroyAll();
    setIsModal(false);
  };
  useEffect(() => {
    if (!!isModal) {
      const swiperInitFirst = setTimeout(() => {
        swiperEvt.current?.slideTo(0, 0, false);
        innerSwiperEvt.current?.slideTo(0, 0, false);
      }, 100);

      return () => {
        clearTimeout(swiperInitFirst);
      };
    }
  }, [isModal]);

  return (
    <ModalSlideLayout
      // 22.11.21 수정: maskClosable 속성 추가
      maskClosable={false}
      wrapClassName={cn('collection-benefit-modal')}
      isOpen={isModal}
      setIsOpen={setIsModal}
      destroyOnClose={true}
      onCancel={onModalClose}
    >
      {/* 22.11.21 수정: mask 태그 추가 */}
      <div className="mask-custom-wrap" onClick={() => setIsModal(false)}></div>
      <Swiper
        modules={[Pagination, Navigation]}
        className={cn('modal-slide')}
        slidesPerView={1}
        speed={1000}
        threshold={20}
        pagination={{
          el: '.modal-slide-pagination',
          clickable: true,
        }}
        navigation={{
          prevEl: '.btn-prev',
          nextEl: '.btn-next',
        }}
        onInit={(swiper) => {
          swiperEvt.current = swiper;
        }}
        observer={true}
        observeParents={true}
      >
        <SwiperSlide className={cn('modal-slide-content')}>
          <div className={cn('auction-guide-wrap')}>
            <div className={cn('auction-list-wrap')}>
              <div className={cn('list', 'full')}>
                <div className={cn('text-inner')}>
                  {/* <strong className={cn('title')}>{t('lus.auctionGuide.item.2.title')}</strong> */}
                  <div className={cn('list-inner')}>
                    <p className={cn('desc')}>{t('lus.auctionGuide.item.2.desc')}</p>
                  </div>
                </div>
                <div className={cn('auction-detail-wrap', swiperClassName)}>
                  <Swiper
                    modules={[Pagination, Scrollbar]}
                    scrollbar={{ el: '.swiper-scrollbar', draggable: true }}
                    slidesPerView={5}
                    spaceBetween={14}
                    threshold={10}
                    onInit={(swiper) => {
                      innerSwiperEvt.current = swiper;
                    }}
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
                      360: {
                        slidesPerView: 1.1,
                        spaceBetween: 12,
                        scrollbar: {
                          enabled: false,
                        },
                      },
                      768: {
                        slidesPerView: 2,
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
                      <div className={cn('item')}>
                        <div className={cn('detail-top')}>
                          <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.4.name')}</strong>
                          <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.4.value')}</span>
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
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={cn('item')}>
                        <div className={cn('detail-top')}>
                          <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.3.name')}</strong>
                          <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.3.value')}</span>
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
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={cn('item')}>
                        <div className={cn('detail-top')}>
                          <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.2.name')}</strong>
                          <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.2.value')}</span>
                        </div>
                        <div className={cn('auction-img-wrap')}>
                          <Image
                            src="/assets/images/icon/ico_lus_busy.gif"
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
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={cn('item')}>
                        <div className={cn('detail-top')}>
                          <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.1.name')}</strong>
                          <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.1.value')}</span>
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
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={cn('item')}>
                        <div className={cn('detail-top')}>
                          <strong className={cn('name')}>{t('lus.auctionGuide.item.2.list.0.name')}</strong>
                          <span className={cn('value')}>{t('lus.auctionGuide.item.2.list.0.value')}</span>
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
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  <div className={cn('swiper-scrollbar')}></div>
                </div>
                <p className={cn('sub-desc')}>{t('lus.auctionGuide.item.2.caption')}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={cn('modal-slide-content')}>
          <div className={cn('people-wrap')}>
            <div className={cn('people-inner')}>
              <div className={cn('people-info')}>
                <div className={cn('info-top')}>
                  <Tag size="md-m">{t('lus.people.label')}</Tag>
                  <h3 className={cn('people-title')}>{t('lus.people.title')}</h3>
                  <p className={cn('people-desc')}>{t('lus.people.desc')}</p>
                </div>
                {/* 2.11.17 수정: 마크업 위치 수정 및 클래스명 변경 */}
                <div className={cn('people-img-wrap')}></div>
                <div className={cn('info-bottom')}>
                  <h4 className={cn('people-benefit-title')}>{t('lus.people.subTitle', { num: '01' })}</h4>
                  <p className={cn('people-benefit-desc')}>{t('lus.people.subDesc')}</p>
                  <span className={cn('people-notice')}>{t('lus.people.notice')}</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={cn('modal-slide-content')}>
          <div className={cn('generation-wrap')} id="lus_benefit">
            <div className={cn('generation-inner')}>
              <div className={cn('generation-info')}>
                <div className={cn('info-top')}>
                  <Tag size="md-m">{t('lus.generation.label')}</Tag>
                  <h3 className={cn('generation-title')}>{t('lus.generation.title')}</h3>
                  <p className={cn('generation-desc')}>{t('lus.generation.desc')}</p>
                </div>
                <div className={cn('info-bottom')}>
                  <h4 className={cn('generation-benefit-title')}>{t('lus.generation.subTitle', { num: '02' })}</h4>
                  <p className={cn('generation-benefit-desc')}>{t('lus.generation.subDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className={cn('modal-slide-bottom')}>
        <div className={cn('btn-wrap')}>
          <button type="button" className={cn('btn-swiper', 'btn-prev')}>
            <span className={cn('a11y')}>{t('prev', { ns: 'common' })}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
          </button>
          <div className={cn('modal-slide-pagination')} />
          <button type="button" className={cn('btn-swiper', 'btn-next')}>
            <span className={cn('a11y')}>{t('next', { ns: 'common' })}</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
          </button>
        </div>
      </div>
    </ModalSlideLayout>
  );
};

export default CollectionBenefitModal;
