import cn from 'classnames';
import OutlineButton from '@/components/button/OutlineButton';
import { Trans, useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Dropdown, message, Popover } from 'antd';
import { ellipsisAddress } from '@/utils/web3Utils';
import { useCallback } from 'react';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { useAtomValue } from 'jotai';

type snsLinkType = {
  [key: string]: string;
};

interface Props {
  token: any;
  snsLink: snsLinkType;
}

const TokenInfo = ({ snsLink, token }: Props) => {
  const { t } = useTranslation(['tokens', 'common']);

  const nileWallet = useAtomValue(nileWalletAtom);
  const addToken = useCallback((token: any) => {
    // NOTICE: currently "decimals : 18" is assumed, image url is not given
    // @ts-ignore
    provider.web3.currentProvider?.sendAsync({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: token.token_address,
          symbol: token.token_symbol,
          decimals: 18,
          //image: icon[token.token_symbol] ?? null,
        },
      },
    });
  }, []);

  return (
    <div className={cn('token-info-wrap')}>
      {/* 23.04.06 수정 start: 지갑 주소 추가 */}
      <div className={cn('info-title-area')}>
        <strong className={cn('info-title')}>{t('tokenInfo.title')}</strong>
        <div className={cn('contract-address')}>
          <div className={cn('contract-address-info')}>
            <em>Contracts:</em>
            <div className={cn('tooltip-wrap')}>
              <Popover
                overlayClassName="tooltip"
                placement="top"
                content={<div className={cn('tooltip-contents')}>{token.token_address}</div>}
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                <button type="button">
                  <span>{ellipsisAddress(token.token_address)}</span>
                </button>
              </Popover>
            </div>
            {/* 23.04.20 수정: 클립보드 텍스트 전달갑 변경 */}
            <CopyToClipboard text={token.token_address}>
              <button
                className={cn('btn-copy')}
                type="button"
                onClick={() => message.info({ content: t('completeCopy', { ns: 'common' }), key: 'toast' })}
              >
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg" />
                {/* <span>{t('shareBtn.copy')}</span> */}
              </button>
            </CopyToClipboard>
          </div>
          {nileWallet && (
            <OutlineButton
              buttonText={t('tokenInfo.btnMetaMask')}
              color="black"
              size="sm"
              onClick={() => addToken(token)}
              iconType
              iconValue="metamask"
            />
          )}
        </div>
      </div>
      <p className={cn('info-contents')}>
        <Trans i18nKey={t(`tokenInfo.${token.token_symbol.toLowerCase()}`)} />
      </p>
      <div className={cn('btn-wrap')}>
        <div className={cn('outline-btn-wrap')}>
          {token.token_symbol === 'FRC' && (
            <OutlineButton buttonText={t('tokenInfo.link.snkrz')} color="black" align size="sm" href="/life/snkrz" target="_blank" />
          )}
          {token.token_symbol === 'TIPO' && (
            <OutlineButton buttonText={t('tokenInfo.link.tangled')} color="black" align size="sm" href="/life/ttps" target="_blank" />
          )}
          {token.token_symbol === 'FRC' && (
            <OutlineButton
              buttonText={t('tokenInfo.link.official')}
              color="black"
              align
              size="sm"
              iconType
              iconValue="link"
              href="https://www.thesnkrz.com/"
              target="_blank"
            />
          )}
          {token.token_symbol === 'TIPO' && (
            <OutlineButton
              buttonText={t('tokenInfo.link.official')}
              color="black"
              align
              size="sm"
              iconType
              iconValue="link"
              href="https://tangled.im/"
              target="_blank"
            />
          )}
        </div>
        <ul className={cn('token-sns')}>
          {Object.keys(snsLink).map((el, idx) => (
            <li key={el + idx}>
              <a href={snsLink[el]} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
                <span className={cn('a11y')}>{el}</span>
                <ReactSVG src={`https://nile.blob.core.windows.net/images/icons/ico_${el}.svg`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TokenInfo;
