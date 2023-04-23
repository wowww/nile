import { ReactSVG } from 'react-svg';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import TextButton from '@/components/button/TextButton';
import { windowResizeAtom } from '@/state/windowAtom';
import { useAtomValue } from 'jotai';
/* 23.03.25 수정: useMediaQuery 추가 */
import useMediaQuery from '@/hook/useMediaQuery';

const DaoWondersMember = () => {
  const { t, i18n } = useTranslation('daoHome');
  // const offset = useAtomValue(windowResizeAtom);
  /* 23.03.25 수정: offset 삭제, useMediaQuery 추가 */
  const isTablet = useMediaQuery('(max-width: 1279px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const typeList = [
    'WONDER DAO',
    'AQX',
    'DSRV',
    'Cross Angle',
    'ANKR',
    'Allnodes',
    'OZYS',
    'coinplug',
    'Blockdaemon',
    'Figment',
    'Cosmostation',
    'B-Harvest',
    'Algorith Capital',
    'Wemade',
  ];

  const itemCount = typeList.length;
  const transitionDuration = `${itemCount * 5}s`;
  const bannerListStyle = {
    '--banner-show-el': itemCount,
    '--item-width': isMobile ? '136px' : '204px',
    /* 23.03.25 수정: offset 삭제, useMediaQuery 추가 */
    animation: `scrolling-type${isMobile ? '-s' : isTablet ? '-m' : ''} ${transitionDuration} linear infinite`,
  } as React.CSSProperties;

  const typeIcon = (iconType: string) => {
    const iconClassName = iconType.toLocaleLowerCase().replace(' ', '-');
    switch (iconType) {
      case 'WONDER DAO':
        return (
          <span className={cn('circle', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_dao.svg" />
          </span>
        );
      case 'AQX':
        return (
          <span className={cn('horizontal-long', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_aqx.svg" />
          </span>
        );
      case 'DSRV':
        return (
          <span className={cn('square', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_dsrv.svg" />
          </span>
        );
      case 'Cross Angle':
        return (
          <span className={cn('square', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_crossangle.svg" />
          </span>
        );
      case 'ANKR':
        return (
          <span className={cn('circle', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_ankr.svg" />
          </span>
        );
      case 'Allnodes':
        return (
          <span className={cn('circle', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_allnodes.svg" />
          </span>
        );
      case 'OZYS':
        return (
          <span className={cn('circle', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_ozys.svg" />
          </span>
        );
      case 'Blockdaemon':
        return (
          <span className={cn('vertical-long', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_blockdaemon.svg" />
          </span>
        );
      case 'Figment':
        return (
          <span className={cn('square', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_figment.svg" />
          </span>
        );
      case 'Cosmostation':
        return (
          <span className={cn('horizontal-long', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_cosmostation.svg" />
          </span>
        );
      case 'Algorith Capital':
        return (
          <span className={cn('horizontal-long', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_algorith.svg" />
          </span>
        );
      case 'Wemade':
        return (
          <span className={cn('square', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_wemade.svg" />
          </span>
        );
      case 'coinplug':
        return (
          <span className={cn('square', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_coinplug.svg" />
          </span>
        );
      case 'B-Harvest':
        return (
          <span className={cn('square', iconClassName)}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_bharvest.svg" />
          </span>
        );
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
            <span className={cn('banner-item-name')}>{item}</span>
          </div>
        )),
      );
    }
    return originalEl;
  };

  return (
    <div className={cn('dao-wonders-member')}>
      <div className={cn('wonders-member-title')}>
        <h2 className={cn('title')}>{t('members.title')}</h2>
        <p className={cn('desc')}>{t('members.desc')}</p>
      </div>
      <div className={cn('type-banner-wrap')}>
        <div className={cn('wonder-dao-card')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/wonders/ico_wonders_card.svg" />
        </div>
        <div className={cn('type-banner')} style={bannerListStyle}>
          {copyEvent(2)}
        </div>
      </div>
      <div className={cn('btn-wrap')}>
        <TextButton
          buttonText={t('members.btn')}
          iconValue="line-arrow"
          gapSpacing="lg"
          size="md"
          href={`https://40wonders.wemix.com/${i18n.language === 'ko' ? '?lang=ko' : ''}`}
          target="_blank"
        />
      </div>
    </div>
  );
};

export default DaoWondersMember;
