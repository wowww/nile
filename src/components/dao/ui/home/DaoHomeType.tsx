import React, { forwardRef, useState } from 'react';
import cn from 'classnames';
import OutlineButton from '@/components/button/OutlineButton';
import { useTranslation } from 'next-i18next';

import { ReactSVG } from 'react-svg';
import dynamic from 'next/dynamic';
/* 22.12.19 수정: useRouter 추가 */
import { useRouter } from 'next/router';

import useMediaQuery from '@/hook/useMediaQuery';

const DaoRequestModal = dynamic(() => import('@/components/modal/DaoRequestModal'), { ssr: false });

const DaoHomeType = forwardRef(({}, ref: any) => {
  const { t } = useTranslation('daoHome');
  /* 22.12.19 수정: useRouter 추가 */
  const { locale } = useRouter();
  const [isAskToJoinModal, setIsAskToJoinModal] = useState<boolean>(false);
  const typeList = ['concert', 'film', 'entertainment', 'investment', 'business', 'fandom', 'product', 'art', 'sport', 'music', 'social'];

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  const itemCount = typeList.length;
  const transitionDuration = `${itemCount * 5}s`;
  const bannerListStyle = {
    '--banner-show-el': itemCount,
    '--item-width': isMobile ? '160px' : '200px',
    animation: `scrolling-type${isMobile ? '-s' : isTablet ? '-m' : ''} ${transitionDuration} linear infinite`,
  } as React.CSSProperties;

  const typeIcon = (iconType: string) => {
    switch (iconType) {
      case 'concert':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_concert.svg" />;
      case 'film':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_film.svg" />;
      case 'entertainment':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_entertainment.svg" />;
      case 'investment':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_investment.svg" />;
      case 'business':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_business.svg" />;
      case 'fandom':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_fandom.svg" />;
      case 'product':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_product.svg" />;
      case 'art':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_art.svg" />;
      case 'sport':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_sport.svg" />;
      case 'music':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_music.svg" />;
      case 'social':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotype/ico_type_social.svg" />;
      default:
        return false;
    }
  };

  const originalEl: React.ReactElement[] = [];
  const copyEvent = (times: number) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < times; i++) {
      originalEl.push(
        ...typeList.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={item + idx + i} className={cn('banner-item')}>
            {typeIcon(item)}
            <span className={cn('banner-item-name')}>{item} DAO</span>
          </div>
        )),
      );
    }
    return originalEl;
  };

  return (
    <div className={cn('dao-type-join')}>
      <div className={cn('dao-type-wrap')}>
        <div className={cn('title-wrap')}>
          <h2>
            <span className={cn('title-small')}>{t('type.title1')}</span>
            <span className={cn('title-large')}>{t('type.title2')}</span>
          </h2>
          <p className={cn('title-desc', 'type-desc')}>
            <span>{t('type.desc1')}</span>
            <span>{t('type.desc2')}</span>
          </p>
        </div>

        <div className={cn('type-banner-wrap')}>
          <div className={cn('type-banner')} style={bannerListStyle}>
            {copyEvent(2)}
          </div>
        </div>
      </div>
      <div className={cn('dao-join-wrap')} ref={ref}>
        <div className={cn('title-wrap')}>
          <h2 className={cn('title-large join-title')}>{t('join.title')}</h2>
          <p className={cn('title-desc', 'join-desc')}>{t('join.desc')}</p>
        </div>
        <div className={cn('button-wrap')}>
          <OutlineButton
            buttonText={t('join.btn1')}
            color="white"
            /* 22.11.09 수정: 버튼 사이즈 변경 */
            /* 22.12.19 수정: 다국어별 버튼 사이즈 분기 추가 */
            size="sm"
            onClick={() => {
              setIsAskToJoinModal(true);
            }}
          />
        </div>
      </div>
      <DaoRequestModal isModal={isAskToJoinModal} setIsModal={setIsAskToJoinModal} />
    </div>
  );
});

export default DaoHomeType;
