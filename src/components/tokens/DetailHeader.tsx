import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Menu, MenuProps } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// components
import { IconLogo } from '@components/logo/IconLogo';
import BgButton from '@/components/button/BgButton';
import { ReactSVG } from 'react-svg';

interface Props {
  token: any;
}

const DetailHeader = ({ token } : Props) => {
  const { i18n } = useTranslation(['nile', 'common']);
  const { t } = useTranslation(['tokens', 'common']);
  const [isStar, setIsStar] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const moreBtnRef = useRef(null);
  const { locale } = useRouter();

  return (
    <div className={cn('detail-header')}>
      <div className={cn('basic-info')}>
        {/* 23.04.06 수정 start: frc 노출, TIPO 주석(ui 검수용) */}
        <IconLogo type={token.token_symbol.toLowerCase()} size={40} />
        {token.token_symbol} <span className={cn('full-name')}>({token.token_symbol === 'TIPO' ? 'TIPO Token' : 'FORCE'})</span>
        {/* <IconLogo type="tipo" size={40} />
        TIPO <span className={cn('full-name')}>(TIPO Token)</span> */}
        {/* 23.04.06 수정 end: frc 노출, TIPO 주석(ui 검수용) */}
        {/* <button onClick={() => setIsStar(!isStar)} className={cn(!isStar ? 'unselected' : null)}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_start.svg" />
        </button> */}
      </div>
      <div className={cn('btn-area')}>
        {/* <a href="https://coinmarketcap.com/currencies/wemix/" target={'_blank'} rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
          {t('DetailHeader.link.coinmarket')}
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />
        </a> */}

        {/* 23.04.06 수정: FRC 익스플로러 링크 
        테스트넷 https://explorer.test.wemix.com/address/0x58083B54013631BaCc0bbB6d4efa543Fee1D9cE0/txs 
        메인넷 https://explorer.wemix.com/address/0x58083B54013631BaCc0bbB6d4efa543Fee1D9cE0/txs */}

        <a
          href={`https://explorer.wemix.com/token/${token.token_address}/transfers`}
          target={'_blank'}
          rel="noopener noreferrer"
          title={t('blank', { ns: 'common' })}
        >
          {t('DetailHeader.link.explorer')}
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />
        </a>
        <BgButton
          buttonText={t('DetailHeader.link.swap')}
          color="black"
          size="sm"
          iconType
          align
          iconValue="link"
          // 23.04.06 수정: frc 노출, TIPO 주석(ui 검수용)
          href={`https://wemix.fi/swap?from=${token.token_symbol}&to=WEMIX`}
          target={'_blank'}
        />
      </div>
      <div className={cn('mobile-btn-wrap')}>
        {/* <button onClick={() => setIsStar(!isStar)} className={cn('star', !isStar ? 'unselected' : null)}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_start.svg" />
        </button> */}
        <button className={cn('more-btn')} ref={moreBtnRef}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_more.svg" onClick={() => setIsMenu(!isMenu)} />
        </button>
        {isMenu && <MobileMenu setIsMenu={setIsMenu} btn={moreBtnRef} />}
      </div>
    </div>
  );
};

const MobileMenu = ({ setIsMenu, btn }: { setIsMenu: (isMenu: boolean) => void; btn: any }) => {
  const { i18n } = useTranslation(['nile', 'common']);
  const { t } = useTranslation(['tokens', 'common']);
  const menuItem: MenuProps['items'] = [
    {
      label: (
        <a
          href={`https://stage.wemix.fi/${i18n.language === 'ko' ? 'ko' : 'en'}/swap`}
          target={'_blank'}
          rel="noopener noreferrer"
          title={t('blank', { ns: 'common' })}
        >
          {t('DetailHeader.link.swap')}
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />
        </a>
      ),
      key: 'Swap',
    },
    // {
    //   label: (
    //     <a href="/" target={'_blank'} rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
    //       {t('DetailHeader.link.coinmarket')}
    //       <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />
    //     </a>
    //   ),
    //   key: 'Coinmarket Cap',
    // },
    {
      label: (
        <a
          href="https://explorer.wemix.com/token/0x70f1F317697337d297F5338d3dD72a6C4C51BDE1/transfers"
          target={'_blank'}
          rel="noopener noreferrer"
          title={t('blank', { ns: 'common' })}
        >
          {t('DetailHeader.link.explorer')}
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />
        </a>
      ),
      key: 'Explorer',
    },
  ];

  const MenuRef = useRef<any>(null);

  function checkClick(e: MouseEvent) {
    if (!MenuRef.current?.contains(e.target) && !btn?.current?.contains(e.target)) {
      setIsMenu(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', checkClick, true);
    return () => window.removeEventListener('click', checkClick, true);
  }, []);

  return (
    <div ref={MenuRef}>
      <Menu style={{ width: 156 }} items={menuItem} mode="vertical" className={'mobile-dropdown'} onClick={() => setIsMenu(false)} />
    </div>
  );
};

export default DetailHeader;
