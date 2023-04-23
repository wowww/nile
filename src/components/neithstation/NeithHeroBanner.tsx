import cn from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import BgButton from '@/components/button/BgButton';
import { NileCDNLoader } from '@utils/image/loader';
import { Popover } from 'antd';
import { ReactSVG } from 'react-svg';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';
import {fromWei} from "web3-utils";
import {useAtomValue, useSetAtom} from "jotai";
import {updateVaultBalanceAtom, vaultWalletAtom} from "@/state/web3Atom";

interface Prop {}

const NeithHeroBanner = ({}: Prop) => {
  const { t } = useTranslation(['neithStation']);
  const [tokenWemix, setTokenWemix] = useState<any>();
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');
  const vaultWallet = useAtomValue(vaultWalletAtom);
  const updateBalance = useSetAtom(updateVaultBalanceAtom);

  useEffect(() => {
    axios.get(`/api/tokenInfoList`).then(({ data }) => {
      data.forEach((token: any) => {
        if (token.token_symbol === 'WEMIX') {
          setTokenWemix(token);
        }
      });
    });
  }, []);

  useEffect(() => {
    updateBalance();
  }, []);

  const getCurrentValue = useMemo(() => {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(Number(fromWei(vaultWallet.balance, 'ether')) * tokenWemix?.price);
  }, [vaultWallet, tokenWemix]);

  return (
    <div className={cn('wrap-hero-banner')}>
      <div className={cn('hero-banner')}>
        <div className={cn('wrap-text-visual')}>
          <div className={cn('info-text')}>
            <span className={cn('wrap-icon')}></span>
            <h2>{t('hero.title')}</h2>
            <strong>{t('hero.sub')}</strong>
            <p>{t('hero.desc')}</p>
            <BgButton buttonText={t('hero.button')} color="white" size="lg" href="/neith-station/vault" />
          </div>
          <div className={cn('wrap-visual')}>
            <div className={cn('bg')}>
              <Image
                src="/assets/images/img/img_neith_hero_emptycards.png"
                alt="background image"
                layout="fill"
                objectFit="contain"
                loader={NileCDNLoader}
              />
            </div>
            <div className={cn('image')}>
              <Image
                src="/assets/images/img/img_neith_hero_herocards.png"
                alt=""
                className={cn('visual')}
                layout="fill"
                objectFit="contain"
                loader={NileCDNLoader}
              />
            </div>
          </div>
        </div>
        <ul className={cn('hero-info-list')}>
          <li>
            <span className={cn('name')}>
              {t('hero.totalValue')}
              {/* 23.03.12 수정: 툴팁 추가 */}
              <Popover
                overlayClassName="tooltip"
                placement={!isMobile ? 'top' : 'right'}
                content={
                  <div className={cn('tooltip-contents')}>
                    <ul className={cn('list-type-dot')}>
                      <li>{t('hero.tooltip.1')}</li>
                      <li>{t('hero.tooltip.2')}</li>
                    </ul>
                  </div>
                }
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                <button type="button">
                  <span className={cn('a11y')}>tooltip</span>
                  <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg`} />
                </button>
              </Popover>
            </span>
            {/* 23.03.12 수정: 소수점 두자리 수까지 표기 */}
            {/* 23.03.14 수정: 디자인 변경 */}
            <div className={cn('price-wemix-wrap')}>
              {/* 4월 11일 오후 4시 이후 406,000 변경 */}
              {/* <strong>406,000</strong> */}
              <strong>{Number(fromWei(vaultWallet.balance, 'ether')).toLocaleString()}</strong>
              <span>WEMIX</span>
            </div>
            <div className={cn('dollar-price')}>{`($${getCurrentValue})`}</div>
          </li>
          <li>
            <span className={cn('name')}>{t('hero.totalNft')}</span>
            <strong>276</strong>
          </li>
          <li>
            <span className={cn('name')}>{t('hero.covenantPrice')}</span>
            {/* 23.03.12 수정: 소수점 두자리 수까지 표기 */}
            {/* 23.03.14 수정: 디자인 변경 */}
            <div className={cn('price-wemix-wrap')}>
              <strong>0</strong>
              <span>WEMIX</span>
            </div>
            <div className={cn('dollar-price')}>($0)</div>
          </li>
          <li>
            <span className={cn('name')}>{t('hero.covenantNft')}</span>
            <strong>0</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NeithHeroBanner;
