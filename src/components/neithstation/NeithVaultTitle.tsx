import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { Popover } from 'antd';
import { NileCDNLoader } from '@/utils/image/loader';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { updateVaultBalanceAtom, vaultWalletAtom } from '@/state/web3Atom';
import { useAtomValue } from 'jotai';
import { useSetAtom } from 'jotai';
import { fromWei, toBN } from 'web3-utils';
import axios from 'axios';
import { useWalletFormatter } from '@utils/formatter/wallet';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

const imgRoot = 'https://nile.blob.core.windows.net/images/assets/images/icon';

const NeithVaultTitle = () => {
  const { t } = useTranslation('neithStation');
  const { shorten } = useWalletFormatter();
  const updateBalance = useSetAtom(updateVaultBalanceAtom);
  const vaultWallet = useAtomValue(vaultWalletAtom);
  const [tokenWemix, setTokenWemix] = useState<any>();
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

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
    <div className={cn('neith-vault-top-wrap')}>
      <div className={cn('vault-title-wrap')}>
        <h2 className={cn('title-inner')}>
          <div className={cn('title-icon')}>
            <Image
              src="/assets/images/img/img_neith_vault_title_icon.png"
              alt="vault-icon"
              layout="fill"
              objectFit="contain"
              loader={NileCDNLoader}
            />
          </div>
          <span className={cn('title')}>NEITH Vault</span>
        </h2>
        <p className={cn('desc')}>{t('vault.title.desc')}</p>
      </div>
      <dl className={cn('vault-top-info-wrap')}>
        <div className={cn('vault-info-list')}>
          <dt className={cn('title-wrap')}>
            <span className={cn('title')}>{t('vault.topInfo.1.title')}</span>
            <Popover
              overlayClassName="tooltip"
              placement="top"
              content={
                <div className={cn('tooltip-contents')}>
                  <ul className={cn('list-type-dot')}>
                    <li>{t('vault.topInfo.1.tooltip.1')}</li>
                    <li>{t('vault.topInfo.1.tooltip.2')}</li>
                  </ul>
                </div>
              }
              trigger="hover"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button">
                <ReactSVG src={`${imgRoot}/ico_info.svg`} />
              </button>
            </Popover>
          </dt>
          <dd className={cn('vault-info-content')}>
            <span className={cn('price')}>{Number(fromWei(vaultWallet.balance, 'ether')).toLocaleString()}</span>
            <span className={cn('unit')}>WEMIX</span>
            <span className={cn('dollar')}>(${getCurrentValue})</span>
          </dd>
        </div>
        {/* 23.03.14 수정 start: 기획 변경으로 주석 처리 */}
        {/* <div className={cn('vault-info-list')}>
          <dt className={cn('title-wrap')}>
            <span className={cn('title')}>{t('vault.topInfo.2.title')}</span>
            <Popover
              overlayClassName="tooltip"
              placement="top"
              content={
                <div className={cn('tooltip-contents')}>
                  <ul className={cn('list-type-dot')}>
                    <li>{t('vault.topInfo.2.tooltip.1')}</li>
                    <li>{t('vault.topInfo.2.tooltip.2')}</li>
                  </ul>
                </div>
              }
              trigger="hover"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button">
                <ReactSVG src={`${imgRoot}/ico_info.svg`} />
              </button>
            </Popover>
          </dt>
          <dd className={cn('vault-info-content')}>
            <span className={cn('price')}>
              <span>$</span> */}
        {/* 23.03.12 수정: 소수점 표기 수정 */}
        {/* {covenantValue}
            </span>
          </dd>
        </div> */}
        {/* 23.03.14 수정 end: 기획 변경으로 주석 처리 */}
        <div className={cn('vault-info-list')}>
          <dt className={cn('title-wrap')}>
            <span className={cn('title')}>{t('vault.topInfo.3.title')}</span>
          </dt>
          <dd className={cn('vault-info-content')}>
            {/*<span className={cn('guide-text')}>{t('vault.topInfo.3.guide')}</span>*/}
            <button className={cn('btn-vault-address')}>
              <a href={`https://explorer.wemix.com/address/${vaultWallet.address}`} target="_blank">
                <div className={cn('btn-inner')}>
                  <ReactSVG src={`${imgRoot}/ico_vault.svg`} />
                  <span className={cn('btn-text')}>
                    <span>{isMobile ? shorten(vaultWallet.address) : vaultWallet.address}</span>
                  </span>
                  <ReactSVG src={`${imgRoot}/ico_link.svg`} />
                </div>
              </a>
            </button>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export { NeithVaultTitle };
