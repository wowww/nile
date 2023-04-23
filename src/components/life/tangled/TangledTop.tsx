import { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import BgButton from '@/components/button/BgButton';
import { IconLogo } from '@/components/logo/IconLogo';
import LifeMarketCap from '@/components/life/LifeMarketCap';

const TangledTop = () => {
  /* 22.10.26 수정: currentState 추가 */
  const [currentState, setCurrentState] = useState<string>('buy-now');
  const { t } = useTranslation(['life', 'common']);

  const changeButtonText = (state: string) => {
    switch (state) {
      case 'up-coming':
        return t('viewArtwork', { ns: 'common' });
      case 'buy-now':
        return t('buyNft', { ns: 'common' });
      default:
        return '';
    }
  };

  return (
    <div className={cn('life-top-section tangled')}>
      <div className={cn('con-inner')}>
        <h2>
          <span className={cn('title')}>
            <span className={cn('symbol')}>
              <IconLogo type="tangled" size={44} />
            </span>
            <span className={cn('text')}>Tangled</span>
          </span>
          <strong>{t('tangled.main.title')}</strong>
        </h2>
        <div>
          <div className={cn('btn-wrap')}>
            {/* 23.03.29 수정: OutlineButton 삭제 */}
            {/* 23.03.17 수정: 토스트 팝업 추가 및 키값 수정 */}
            {/* 23.03.29 수정: android, ios BgButton 추가 */}
            <BgButton
              iconType
              iconValue="android"
              color="white"
              size="lg"
              type="primary"
              buttonText="Google Play"
              target="_blank"
              href="https://play.google.com/store/apps/details?id=net.intimelabs.tangled"
            />
            <BgButton
              iconType
              iconValue="ios"
              color="white"
              size="lg"
              type="primary"
              buttonText="App Store"
              target="_blank"
              href="https://apps.apple.com/app/id1633786243"
            />
            <BgButton
              color="white"
              size="lg"
              type="primary"
              /* 23.03.29 수정: 다국어 수정 */
              buttonText={t('tangled.main.btnOfficial')}
              href="https://tangled.im/web3-live-chat"
              target="_blank"
            />
          </div>
          <LifeMarketCap tokenAddress="0x70f1F317697337d297F5338d3dD72a6C4C51BDE1" tokenName="TIPO" iconName="tipo" />
        </div>
      </div>
    </div>
  );
};

export default TangledTop;
