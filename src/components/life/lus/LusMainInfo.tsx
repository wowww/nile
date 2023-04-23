import { forwardRef, useState } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import TimeList from '@/components/list/TimeList';

import { NileCDNLoader } from '@utils/image/loader';
import { useTranslation } from 'next-i18next';
import BgButton from '@/components/button/BgButton';
import * as Scroll from 'react-scroll';
import { useRouter } from 'next/router';

const LusMainInfo = forwardRef<HTMLDivElement>(({}, ref) => {
  const [currentState, setCurrentState] = useState<string>('buy-now');
  const { t } = useTranslation(['life', 'common']);
  const { locale } = useRouter();

  const changeButtonText = (state: string) => {
    switch (state) {
      case 'upcoming':
        return t('goToNFTs', { ns: 'common' });
      case 'buyNow':
        return t('buyNft', { ns: 'common' });
      default:
        return '';
    }
  };

  return (
    <div className={cn('main-info-wrap')}>
      <div className={cn('main-info-inner')}>
        <div className={cn('contents-area')}>
          <h2>
            LONDON
            <br />
            UNDERGROUND
            <br />
            STATION(LUS)
            <br />
            264 GENESIS
          </h2>
          <div className={cn('artist-info')}>
            <strong>{t('creator', { ns: 'common' })}</strong>
            <div className={cn('artist-name')}>
              <div className={cn('artist-icon-wrap')}>
                <Image
                  src="/assets/images/icon/ico_lus_artist_border_male.png"
                  layout="fill"
                  alt="Zeeha"
                  quality="100"
                  loading="eager"
                  loader={NileCDNLoader}
                />
              </div>
              <div className={cn('artist-icon-wrap')}>
                <Image
                  src="/assets/images/icon/ico_lus_artist_border_female.png"
                  layout="fill"
                  alt="Locho"
                  quality="100"
                  loading="eager"
                  loader={NileCDNLoader}
                />
              </div>
              <span>Zeeha &amp; Locho</span>
            </div>
            <div className={cn('btn-wrap', locale === 'en' ? 'en' : '')}>
              <BgButton buttonText={t('goAuction', { ns: 'common' })} color="black" size="lg" href="/marketplace/LUS" />
              <div className={cn('only-mo')}></div>
              <Scroll.Link to={'lus_benefit'} className={cn('scroll-btn')}>
                <BgButton buttonText={t('lus.btn1')} color="white" size="lg" />
              </Scroll.Link>
            </div>
            {currentState === 'upcoming' && (
              <div className={cn('lus-time')} ref={ref}>
                <strong>{t('auctionStartIn', { ns: 'common' })}</strong>
                <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_LUS_START_DATE} />
              </div>
            )}

            {currentState === 'buy-now' && (
              <div className={cn('lus-sale')} ref={ref}>
                <div className={cn('inner')}>
                  <strong className={cn('title')}>{t('startingBid', { ns: 'common' })}</strong>
                  <ul>
                    <li>
                      <strong>Red</strong>
                      <span>
                        <span className={cn('price')}>2,200</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                    <li>
                      <strong>Orange</strong>
                      <span>
                        <span className={cn('price')}>1,800</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                    <li>
                      <strong>Yellow</strong>
                      <span>
                        <span className={cn('price')}>1,400</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                    <li>
                      <strong>Green</strong>
                      <span>
                        <span className={cn('price')}>1,100</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                    <li>
                      <strong>Blue</strong>
                      <span>
                        <span className={cn('price')}>750</span>
                        <span className={cn('unit')}>WEMIX$</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={cn('bus-animation-wrap')}>
        <div className={cn('row')}>
          <div className={cn('gif-wrap', 'bus')}>
            <Image src="/images/ico_lus_bus.gif" layout="fill" loader={NileCDNLoader} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default LusMainInfo;
