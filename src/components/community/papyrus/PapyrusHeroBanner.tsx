import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { isAndroid, isIOS, isMacOs, isWindows } from 'react-device-detect';
import useWindowResize from '@/hook/useWindowResize';
import { windowResizeAtom } from '@/state/windowAtom';
/* 22.11.02 수정: 다국어 추가 */
import { useTranslation } from 'next-i18next';

import BgButton from '@/components/button/BgButton';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

const PapyrusHeroBanner = () => {
  const { t } = useTranslation('community');
  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);
  const [size, setSize] = useState('');
  const [userDevice, setUserDevice] = useState({
    btnText: '',
    iconValue: '',
    iconType: false,
  });

  const windowWidthCheck = () => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setSize('md');
    } else if (offset.width < 768) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  };

  const deviceCheck = () => {
    const html = document.querySelector('html');
    const device = html?.getAttribute('data-device');

    const windowWidth = offset.width;

    if (windowWidth === 0) {
      return;
    }

    if (isAndroid || isWindows) {
      if (size === 'md' || (windowWidth >= 768 && windowWidth <= 1279)) {
        setUserDevice({ btnText: 'Google Play', iconType: true, iconValue: 'android' });
      } else if (size === 'sm' || windowWidth < 768) {
        setUserDevice({ btnText: 'Google Play', iconType: true, iconValue: 'android' });
      } else {
        setUserDevice({ btnText: 'For Windows', iconType: false, iconValue: '' });
      }
    } else if (isIOS || isMacOs) {
      if (size === 'md' || (windowWidth >= 768 && windowWidth <= 1279)) {
        setUserDevice({ btnText: 'App Store', iconType: true, iconValue: 'ios' });
      } else if (size === 'sm' || windowWidth < 768) {
        setUserDevice({ btnText: 'App Store', iconType: true, iconValue: 'ios' });
      } else {
        setUserDevice({ btnText: 'For macOS', iconType: false, iconValue: '' });
      }
    }
  };

  // load 시
  useEffect(() => {
    deviceCheck();
  }, []);

  // resize 시
  useEffect(() => {
    if (offset.width === 0) {
      return;
    }
    windowWidthCheck();
    deviceCheck();
  }, [offset.width]);

  return (
    <>
      <div className={cn('hero-logo-area')}>
        <em className={cn('hero-banner-copy')}>The best communication place for Web3</em>
        <h2 className={cn('hero-banner-logo')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_logo_papyrus.svg" />
        </h2>
        <div className={cn('papyrus-btn-area')}>
          <em>{t('banner.download')}</em>
          <BgButton
            buttonText={userDevice.btnText}
            color="white"
            size="md"
            iconType={userDevice.iconType}
            iconValue={userDevice.iconValue}
            hasTooltip
            tooltipPlace="bottom"
            disabled
          />
          <span className={cn('os-img')}>
            {userDevice.btnText === 'For macOS' ? (
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_os_appStore.svg" />
            ) : (
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_os_googlePlay.svg" />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default PapyrusHeroBanner;
