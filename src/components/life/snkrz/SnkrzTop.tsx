import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import BgButton from '@/components/button/BgButton';
import { IconLogo } from '@/components/logo/IconLogo';
import LifeMarketCap from '@/components/life/LifeMarketCap';

const SnkrzTop = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <div className={cn('life-top-section snkrz')}>
      <div className={cn('con-inner')}>
        <h2>
          <span className={cn('title')}>
            <span className={cn('symbol')}>
              <IconLogo type="snkrz" size={44} />
            </span>
            <span className={cn('text')}>SNKR2</span>
          </span>
          <strong>{t('snkrz.main.title')}</strong>
        </h2>
        <div>
          <div className={cn('btn-wrap')}>
            <BgButton
              iconType
              iconValue="android"
              color="white"
              size="lg"
              type="primary"
              buttonText="Google Play"
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.thesnkrz.dapp&pli=1"
            />
            <BgButton
              iconType
              iconValue="ios"
              color="white"
              size="lg"
              type="primary"
              buttonText="App Store"
              target="_blank"
              href="https://apps.apple.com/kr/app/apple-store/id1621666106"
            />
            <BgButton
              color="white"
              size="lg"
              type="primary"
              buttonText={t('snkrz.main.btnOfficial')}
              href="https://www.thesnkrz.com/ "
              target="_blank"
            />
          </div>
          <LifeMarketCap tokenAddress="0x58083B54013631BaCc0bbB6d4efa543Fee1D9cE0" tokenName="FORCE" iconName="frc" />
        </div>
      </div>
    </div>
  );
};

export default SnkrzTop;
