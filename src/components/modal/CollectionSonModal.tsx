import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import ModalSlideLayout from './ModalSlideLayout';
import { Modal } from 'antd';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
}

const CollectionSonModal = ({ isModal, setIsModal }: Props) => {
  const { t } = useTranslation(['marketplace', 'common']);
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  const swiperEvt = useRef<any>();
  const [isActiveIndex, setActiveIndex] = useState(0);

  const onModalClose = () => {
    Modal.destroyAll();
    setIsModal(false);
  };

  return (
    <ModalSlideLayout
      // 22.11.21 수정: maskClosable 속성 추가
      maskClosable={false}
      wrapClassName={cn('home-event-modal collection-son-modal')}
      isOpen={isModal}
      setIsOpen={setIsModal}
      destroyOnClose={true}
      onCancel={onModalClose}
    >
      {/* 22.11.21 수정: mask 태그 추가 */}
      <div className="mask-custom-wrap" onClick={() => setIsModal(false)}></div>
      <div className={cn('son-modal-contents')}>
        <div className={cn('title-wrap')}>
          <h2 className={cn('title')}>Sights of NILE</h2>
          <div className={cn('desc-wrap')}>
            <span className={cn('desc')}>{t('sonCollection.desc')}</span>
            <div className={cn('count-wrap')}>
              ( <span>{isActiveIndex + 1}</span> / <span>{!isMobile ? '2' : '4'}</span> )
            </div>
          </div>
        </div>
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
          onSlideChange={(swiper: any) => {
            setActiveIndex(swiper.realIndex);
          }}
          onSwiper={() => {
            setTimeout(() => {
              swiperEvt.current.navigation.destroy();
              swiperEvt.current.navigation.init();
              swiperEvt.current.navigation.update();

              swiperEvt.current.pagination.destroy();
              swiperEvt.current.pagination.init();
              swiperEvt.current.pagination.update();
            });
          }}
        >
          {!isMobile ? (
            <>
              <SwiperSlide className={cn('modal-slide-content')}>
                <div className={cn('son-contents')}>
                  <dl>
                    <dt data-number={1}>{t('sonCollection.q1')}</dt>
                    <dd>{t('sonCollection.a1')}</dd>
                  </dl>
                  <dl>
                    <dt data-number={2}>{t('sonCollection.q2')}</dt>
                    <dd>{t('sonCollection.a2')}</dd>
                  </dl>
                </div>
              </SwiperSlide>
              <SwiperSlide className={cn('modal-slide-content')}>
                <div className={cn('son-contents')}>
                  <dl>
                    <dt data-number={3}>{t('sonCollection.q3')}</dt>
                    <dd>{t('sonCollection.a3')}</dd>
                  </dl>
                  <dl>
                    <dt data-number={4}>{t('sonCollection.q4')}</dt>
                    <dd>{t('sonCollection.a4')}</dd>
                  </dl>
                </div>
              </SwiperSlide>
            </>
          ) : (
            <>
              <SwiperSlide className={cn('modal-slide-content')}>
                <div className={cn('son-contents')}>
                  <dl>
                    <dt data-number={1}>{t('sonCollection.q1')}</dt>
                    <dd>{t('sonCollection.a1')}</dd>
                  </dl>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={cn('son-contents')}>
                  <dl>
                    <dt data-number={2}>{t('sonCollection.q2')}</dt>
                    <dd>{t('sonCollection.a2')}</dd>
                  </dl>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={cn('son-contents')}>
                  <dl>
                    <dt data-number={3}>{t('sonCollection.q3')}</dt>
                    <dd>{t('sonCollection.a3')}</dd>
                  </dl>
                </div>
              </SwiperSlide>
              <SwiperSlide className={cn('modal-slide-content')}>
                <div className={cn('son-contents')}>
                  <dl>
                    <dt data-number={4}>{t('sonCollection.q4')}</dt>
                    <dd>{t('sonCollection.a4')}</dd>
                  </dl>
                </div>
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </div>
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

export default CollectionSonModal;
