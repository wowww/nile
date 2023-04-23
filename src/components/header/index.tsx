import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { throttle } from 'lodash';
import { Avatar, Drawer, message, Popover } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import IconButton from '@/components/button/IconButton';
import SearchModal from '@/components/modal/search';
import HeaderNotification from '@/components/header/HeaderNotification';
import HeaderAccount from '@/components/header/HeaderAccount';
import NetworkModal from '@/components/modal/NetworkModal';
import { useWalletFormatter } from '@utils/formatter/wallet';
import NetworkSettingModal from '../modal/NetworkSettingModal';
import HeaderMyMiniPage from './HeaderMyMiniPage';
import { ReactSVG } from 'react-svg';
import { useAtom, useAtomValue } from 'jotai';
import { nileWalletAtom, nileWalletInfoChangeAtom, nileWalletMetaAtom, nileWalletPersistenceAtom, provider } from '@/state/nileWalletAtom';
import { addressListAtom, contractsAtom, updateBalanceAtom, daoContractsAtom, daoAddressListAtom } from '@/state/web3Atom';
import { useSetAtom } from 'jotai';
import { NileApiService } from '@/services/nile/api';
import { web3Init } from '@/web3/contracts';
/* 23.03.22 수정: useMediaQuery 훅 추가 */
import useMediaQuery from '@/hook/useMediaQuery';

import { authTokenAtom, defaultAuthToken, userProfileAtom } from '@/state/accountAtom';
import { myPageTabAtom } from '@/state/tabAtom';
/* 23.02.01 수정: headerHideFull atom 상태 추가 */
import {
  headerHideFull,
  headerVisibleAccountAtom,
  headerVisibleLangAtom,
  headerVisibleMyPageAtom,
  headerVisibleNotificationAtom,
} from '@/state/layoutAtom';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import { parseJwt } from '@utils/jwtUtils';
import { useWemixWalletProvider } from '@components/wemix';
/* 23.02.09 수정: 개별 다오 페이지의 경우 gnb 메뉴 비노출 조건 처리로 전역 변수 추가 */
/* 23.02.28 수정: 현재 선택중인 다오 메뉴 atom 추가 */
/* 23.03.07 수정: 현재 선택중인 다오 메뉴 atom 이름 수정 */
import { daoVisibleMenuAtom, daoSelectedMenu, daoThemeAtom } from '@/state/daoAtom';
/* 23.02.28 수정: outline button component 추가 */
import OutlineButton from '../button/OutlineButton';
import DaoBadge from '../dao/ui/DaoBadge';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import Tag from '../tag/Tag';
/* 23.03.07 추가: useScrollLock 추가*/
import useScrollLock from '@/hook/useScrollLock';
import useScrollPositionListener from '@/hook/useScrollPositionListener';
import dayjs from 'dayjs';

const menuList = [
  /* 22.11.09 수정: TODO : disabled 추가 */
  /* 23.03.11 수정: life title 수정, NEITH Station 메뉴 추가, 메뉴 활성화용 키밸류 추가 */
  {
    title: 'DAO',
    activeTitle: 'dao',
    url: '/dao',
    disabled: false,
  },
  {
    title: 'NEITH Station',
    activeTitle: 'neith-station',
    url: '/neith-station',
    disabled: false,
  },
  {
    title: 'Marketplace',
    activeTitle: 'marketplace',
    url: '/marketplace',
    disabled: false,
  },
  {
    title: 'Projects',
    activeTitle: 'life',
    url: '/life',
    disabled: false,
  },
  {
    title: 'Community',
    activeTitle: 'community',
    url: '/community',
    disabled: false,
  },
  {
    title: 'Tokens',
    activeTitle: 'tokens',
    url: '/tokens',
    disabled: false,
  },
];

export const Header: React.FC<{
  disabled?: boolean;
  token?: NileNftToken;
}> = ({ disabled, token }) => {
  const { t } = useTranslation('common');
  /* 23.03.22 수정: 브레이크 포인트 추가 */
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');
  const isPc = useMediaQuery('(min-width: 1440px)');

  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const [nileWallet, setNileWallet] = useAtom(nileWalletAtom);
  const [nileWalletPersistence, setNileWalletPersistence] = useAtom(nileWalletPersistenceAtom);
  const [nileWalletMeta, setNileWalletMeta] = useAtom(nileWalletMetaAtom);
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const [_, setNileWalletInfoChange] = useAtom(nileWalletInfoChangeAtom);
  const updateBalance = useSetAtom(updateBalanceAtom);

  const api = NileApiService();

  const router = useRouter();
  const { shorten } = useWalletFormatter();
  const setActiveDao = useSetAtom(daoThemeAtom);

  /* 23.02.09 수정: 개별 다오 페이지의 경우 gnb 메뉴 비노출 조건 처리로 전역 변수 추가 */
  /* 23.03.07 수정: 다오 메뉴 atom 이름 수정 */
  const daoVisibleMenu = useAtomValue(daoVisibleMenuAtom);
  const documentRef = useRef<Document>();
  const { asPath, locale, pathname } = useRouter();

  const [isConnect, setConnect] = useState(false);

  const setContracts = useSetAtom(contractsAtom);
  const setAddressList = useSetAtom(addressListAtom);

  const setDaoContracts = useSetAtom(daoContractsAtom);
  const setDaoAddressList = useSetAtom(daoAddressListAtom);

  const daoSelected = useAtomValue(daoSelectedMenu);

  useEffect(() => {
    if (nileWallet) {
      refreshProfile(nileWallet);
    }
  }, [nileWallet]);

  useEffect(() => {
    web3Init().then((data) => {
      const { marketContracts, marketAddresses, tokens, daoAddresses, daoContracts } = data;
      setContracts(marketContracts);
      setAddressList(marketAddresses);

      setDaoContracts(daoContracts);
      setDaoAddressList(daoAddresses);

      // setEtcContracts(etc);
      // setContractsRecoilAtom(contracts);
      // setAddressListRecoilAtom(addresses);
    });
  }, []);

  useEffect(() => {
    setConnect((nileWallet ?? '').length > 0);
  }, [nileWallet]);

  useEffect(() => {
    if (nileWalletMeta) {
      provider.closeModal();
    }
  }, [nileWalletMeta, provider]);

  // notice activate 제어용
  const [isNewNotice, setIsNewNotice] = useState(false);

  // const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [isHeaderTop, setIsHeaderTop] = useState(true);

  const [headerHide, setHeaderHide] = useAtom(headerHideFull);
  const [visibleMyPage, setVisibleMyPage] = useAtom(headerVisibleMyPageAtom);
  const [visibleNotification, setVisibleNotification] = useAtom(headerVisibleNotificationAtom);
  const [visibleLang, setVisibleLang] = useAtom(headerVisibleLangAtom);
  const [visibleAccount, setVisibleAccount] = useAtom(headerVisibleAccountAtom);
  const [currentMyTab, setCurrentMyTab] = useAtom(myPageTabAtom);

  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isConnectModal, setIsConnectModal] = useState<boolean>(false);
  const [isModalNetwork, setModalNetwork] = useState(false);

  // 모바일 메뉴용
  const [moNotificationOpen, setMoNotificationOpen] = useState(false);
  const [moMenuOpen, setMoMenuOpen] = useState(false);
  const [isModalNetworkSetting, setModalNetworkSetting] = useState(false);

  const { openApp } = useWemixWalletProvider();

  const signing = (account: string, data: string) => provider.web3?.eth.personal.sign(data, account, '');

  const loginToApiServer = async (address: string, nonce?: number) => {
    const message = `Welcome to NILE\n\nWallet address:\n${address.toLowerCase()}\n\nNonce:\n${nonce?.toString().padStart(10, '0')}`;

    signing(address, message)
      .then((signature?: string) => {
        console.log(address, 'on signing', signature);
        if (signature) {
          api.user
            .login(address, signature)
            .then(({ data }) => {
              setAuthToken({ accessToken: data.accessToken, refreshToken: data.refreshToken });
              setUserProfile(data.account);

              setNileWallet(provider.currentAddress || '');
              setNileWalletPersistence(provider.currentAddress || '');
              setNileWalletMeta(provider.getProviderMeta());
            })
            .catch(({ response }) => {
              console.log(response);
              provider.disconnect();
            });
        }
      })
      .catch((error: any) => {
        console.log('user deny sign', error);
        provider.disconnect();
      });
  };

  const signup = (account: string) => {
    api.user
      .signup(account)
      .then(({ data }) => {
        loginToApiServer(account, data.result.nonce);
      })
      .catch(({ response }) => console.log(response));
  };

  const refreshProfile = useCallback(async (wallet: string) => {
    await api.user.account.getUserInfo(wallet).then(({ data }) => {
      setUserProfile(data.result);
    });
  }, []);

  const getProfile = useCallback(
    (account: string) => {
      return api.user.account
        .getUserInfo(account)
        .then(({ data }) => {
          if (data.errorCode === 11000) {
            return signup(account);
          } else {
            setUserProfile(data.result);
            loginToApiServer(account, data.result?.nonce);
          }
        })
        .catch(({ response }) => {
          switch (response?.status) {
            case 404:
              return signup(account);
            default:
              break;
          }
        });
    },
    [api],
  );

  const handleClickToProfile = () => {
    if (isConnect) {
      router.push(`/mypage/${nileWallet}`).then(() => {
        setMoMenuOpen(false);
      });
    } else {
      // walletContext?.login().then(() => {
      //   closeMobileMenu();
      // });
    }
  };

  const handleMyPageVisibleChange = (newVisible: boolean) => {
    setVisibleMyPage(newVisible);
  };

  const handleNotificationVisibleChange = (newVisible: boolean) => {
    setVisibleNotification(newVisible);
  };

  const handleLangVisibleChange = (newVisible: boolean) => {
    setVisibleLang(newVisible);
  };

  const handleAccountVisibleChange = (newVisible: boolean) => {
    setVisibleAccount(newVisible);
  };

  const openAccountModal = () => {
    setVisibleAccount(true);
  };

  const openMobileMenu = () => {
    setMoMenuOpen(true);
    setVisibleAccount(false);
  };

  const closeMobileMenu = () => {
    setMoMenuOpen(false);
    setMoNotificationOpen(false);
  };

  const closeNotification = () => {
    setVisibleNotification(false);
  };

  const closeMyMiniPage = () => {
    setVisibleMyPage(false);
    setCurrentMyTab('dao');
  };

  const closeAllHeaderModal = () => {
    setVisibleMyPage(false);
    setVisibleNotification(false);
    setVisibleLang(false);
    setVisibleAccount(false);
  };

  const pageYRef = useRef(0);

  useScrollPositionListener((scrollPosition) => {
    const deltaY = scrollPosition.y - pageYRef.current;
    const hide = scrollPosition.y >= 60 && deltaY >= 0;

    /* 23.02.23 수정: 기존 헤더 관련 동작 제어 클래스명 수정 */
    const headerInhibitor = document.querySelector('.main-header-inhibitor');
    if (headerInhibitor) {
      console.log(headerInhibitor.classList);
      if (headerInhibitor.classList.contains('main-header-inhibitor')) {
        headerInhibitor.classList.remove('main-header-inhibitor');
        return;
      }
    }

    /* 23.02.01 수정 end: 개별 dao 관련 헤더 동작 제어로 로직 추가 */

    let inhibitor = document.querySelector<HTMLElement>('.dao-lineup-wrap');
    /* 23.03.22 수정: useMediaQuery 사용으로 수정 */
    const offsetValue = !isTablet ? 95 : isMobile ? 100 : 141;

    if (inhibitor !== null) {
      let targetOffset = inhibitor && inhibitor.offsetTop + inhibitor.offsetHeight - offsetValue + 1;
      if (targetOffset >= window.scrollY) {
        setTimeout(() => {
          if (inhibitor !== null) {
            inhibitor.classList.remove('header-inhibitor');
            inhibitor = document.querySelector<HTMLElement>('.dao-lineup-wrap');
          }
        });
      }
      if (inhibitor.classList.contains('header-inhibitor')) {
        return;
      }
    }
    setHeaderHide(hide);
    pageYRef.current = scrollPosition.y;
    setIsHeaderTop(scrollPosition.y <= 60);
  }, []);

  const resizeMobileGnb = () => {
    if (!isTablet) {
      setMoMenuOpen(false);
      setMoNotificationOpen(false);
    }
  };

  const resizeVh = () => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };

  // 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가
  const changeConnectFirst = () => {
    setModalNetworkSetting(true);
  };

  // const deviceCheckEvt = () => {
  //   if (isAndroid) {
  //     return 'android';
  //   } else if (isIOS) {
  //     return 'ios';
  //   } else if (isWindows) {
  //     return 'window';
  //   } else if (isMacOs) {
  //     return 'mac';
  //   }
  // };
  //
  // // device check
  // useEffect(() => {
  //   const html = document.querySelector('html');
  //   html?.setAttribute('data-device', deviceCheckEvt() ?? '');
  //   html?.setAttribute('data-browser', browserName);
  // }, []);

  // width에 따른 함수 실행
  useEffect(() => {
    resizeMobileGnb();
  }, [isMobile, isTablet, isPc]);
  // 커스텀 vh 함수 실행
  useEffect(() => {
    resizeVh();
    window.addEventListener('resize', resizeVh);

    return () => {
      window.removeEventListener('resize', resizeVh);
    };
  }, []);

  useEffect(() => {
    if (headerHide) {
      closeAllHeaderModal();
    }
  }, [headerHide]);

  useEffect(() => {
    provider.disconnectCallback = (code, reason) => {
      console.log(`disconnectCallback => `);
      setNileWallet('');
      setNileWalletPersistence(null);
      setNileWalletMeta(null);

      setAuthToken(defaultAuthToken);
    };
    provider.accountsChangedCallback = (accounts: string[]) => {
      if (accounts.length > 0) {
        connect();
      }
    };
  }, [nileWallet]);

  const connect = async () => {
    if (provider.currentAddress) {
      // if (!checkTermAgree(provider.currentAddress)) {
      //   addTermAgree(provider.currentAddress);
      // }
    }

    if (!nileWallet) {
      const walletName = provider.getProviderMeta()?.name;
      // showToast(
      //   t('toast.wallet.connected.title'),
      //   t('toast.wallet.connected.desc', {
      //     name: walletName,
      //     address: ellipsisAddress(provider.currentAddress || ''),
      //   }),
      //   _handleWalletBtn,
      // );
    } else if (nileWallet !== provider.currentAddress) {
      console.log(`account changed ${nileWallet} => ${provider.currentAddress}`);
      await provider.disconnect();
      return;
      // showToast(
      //   t('toast.wallet.connected.title'),
      //   t('toast.wallet.connected.desc', {
      //     name: provider.getProviderMeta()?.name,
      //     address: ellipsisAddress(provider.currentAddress || ''),
      //   }),
      //   _handleWalletBtn,
      // );
      // showToast("계정 변경", `${provider.currentAddress} 으로 변경되었습니다.`);
    }

    if (!authToken || !authToken.accessToken) {
      if(provider.currentAddress) {
        getProfile(provider.currentAddress).then(async () => {
          await updateBalance();
        });
      }
    } else {
      setNileWallet(provider.currentAddress || '');
      setNileWalletPersistence(provider.currentAddress || '');
      setNileWalletMeta(provider.getProviderMeta());
      setNileWalletInfoChange((a) => !a);
    }

    //setIsDisAgree(false);
  };

  useEffect(() => {
    console.log(nileWalletPersistence);
    if (nileWalletPersistence && !nileWallet) {
      provider.reconnect();
    } else if (nileWalletPersistence === null) {
      provider.disconnect();
    }

  }, [nileWalletPersistence]);

  useEffect(() => {
    provider.t = t;
    provider.locale = locale;
    // window.addEventListener('scroll', windowScroll);
    return () => {
      // window.removeEventListener('scroll', windowScroll);
    };
  }, [t]);

  // const windowScroll = () => {
  //   const scrollTop = window.scrollY;
  //
  //   scrollTop >= 10 ? setScroll(true) : setScroll(false);
  // };

  const _handleConnectBtn = (): void => {
    console.log('_handleConnectBtn');
    // setIsConnectModal(!isConnectModal);
    provider.connect().then(() => {
      provider.closeModal();
    });
    // setIsDropdown(false);
    // setIsAlertPopup(false);
  };

  /* 23.02.28 수정: DAO 모바일 메뉴 추가 */
  const activeDao = useAtomValue(daoThemeAtom).value;
  const daoUrlRoot = `/dao/ui/${activeDao}`;
  const setDaoMobileMenu = (daoType: string) => {
    switch (daoType) {
      case 'wonder':
        return ['Home', 'Station', 'Treasury', 'Obelisk', 'Governance', 'Trust', 'Incinerator', `WONDER Scan`];
    }
  };
  // 향후 Governance 오픈 시 governance 분기 내용 삭제
  const daoMenuList = setDaoMobileMenu(activeDao)?.map((item) => {
    return {
      title: item,
      label: (
        <>
          {/recruiting/.test(pathname) ? (
            <Link href={`${daoUrlRoot}/recruiting`}>
              <a>{item}</a>
            </Link>
          ) : (
            /* 23.03.07 수정: onClick closeMobileMenu 추가 */
            <Link href="/dao/wonder/station">
              {/*href={`${daoUrlRoot}/${item.split(' ').join('').toLocaleLowerCase()}`}*/}
              <a onClick={closeMobileMenu}>{item}</a>
            </Link>
          )}
        </>
      ),
      // key: `menu-${item.split(' ').join('').toLocaleLowerCase()}`,
      selected: false,
    };
  });

  const activeDaoMenuFind = () => {
    daoMenuList?.forEach((el) => {
      if (el.title === daoSelected) {
        el.selected = true;
      }
    });
  };

  activeDaoMenuFind();

  return (
    <header className={cn('header', headerHide ? 'hide' : 'active', isHeaderTop && 'header-top')}>
      <h1>
        <Link href={{ pathname: '/' }} passHref>
          <a className={cn('header-logo')}>
            {isMobile ? (
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_logo_symbol.svg" />
            ) : (
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_logo.svg" />
            )}
            <span className={cn('a11y')}>Nile</span>
          </a>
        </Link>
        {/* 23.02.28 수정: DAO 메뉴용 로고 추가 */}
        {/* 23.03.07 수정: atom 이름 및 조건 수정 */}
        {daoVisibleMenu && !isPc && (
          <span className={cn('header-logo-dao-badge')}>
            <DaoBadge type={activeDao} />
            <span>{useDaoCharacterConvert(activeDao)} DAO</span>
          </span>
        )}
      </h1>
      <nav className={cn('header-navigation')}>
        <ul>
          {menuList.map((menu) => {
            return (
              <li key={menu.title}>
                <Link href={{ pathname: menu.url }} passHref>
                  <a
                    className={cn(pathname.includes(menu.activeTitle) && 'active', { disabled: menu.disabled })}
                    onClick={() => {
                      if (menu.url.includes('dao')) {
                        setActiveDao({ value: 'wonder' });
                      }
                    }}
                  >
                    {/* 22.11.09 수정: TODO : 11일 오픈 unfolding soon 추가 */}

                    <span>{menu.title}</span>
                    {menu.disabled && <em>Unfolding Soon</em>}
                    <span className={cn('hidden-text')} aria-hidden="true">
                      {menu.title}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={cn('header-utils')}>
        {/* TODO: 2022.11.08 수정 : 11일 오픈 시 기능 히든 */}
        {/* <div className={cn('search-wrap')}>
          <Button
            className={cn('btn btn-icon btn-40 btn-circle btn-header')}
            onClick={() => {
              setIsSearchModal(true);
            }}
          >
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg' />
            <span className={cn('a11y')}>{t('openSearchWindow')}</span>
          </Button>
        </div> */}
        {/* <div className={cn('notice-wrap')}>
          <Popover
            destroyTooltipOnHide={true}
            overlayClassName="notification header-inner-popup"
            placement="bottom"
            content={<HeaderNotification clickEvent={closeNotification} />}
            trigger="click"
            open={notificationVisible}
            onOpenChange={handleNotificationVisibleChange}
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <Button className={cn('btn btn-icon btn-40 btn-circle btn-header')}>
              {isNewNotice ? <IconNoticeActive /> : <IconNotice />}
              <span className={cn('a11y')}>{t('openNotification')}</span>
            </Button>
          </Popover>
        </div> */}
        {/* TODO: 2022.11.08 수정 : 11일 오픈 시 기능 히든 */}
        {isConnect && (
          <div className={cn('user-info-wrap')}>
            <Popover
              destroyTooltipOnHide={true}
              overlayClassName="my-mini-page header-inner-popup"
              placement="bottom"
              content={<HeaderMyMiniPage clickEvent={closeMyMiniPage} />}
              trigger="click"
              open={visibleMyPage}
              onOpenChange={handleMyPageVisibleChange}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button" className={cn('btn-user-open')}>
                {/* 사용자 이미지 추가 : backgroundImage url 속성에 해당 이미지 경로 넣어주어야 합니다. */}
                {/* 아바타 기본 클래스 : type1, type2, type3, type4, type5 (type* 클래스 추가 하지 않으면 기본 회색 이미지) */}
                <Avatar
                  className={cn('user-image', `type${userProfile?.themeIndex}`)}
                  size={32}
                  style={{ backgroundImage: userProfile?.img && `url(${userProfile.img})` }}
                >
                  <span className={cn('a11y')}>{t('openProfile')}</span>
                </Avatar>
              </button>
            </Popover>
          </div>
        )}
        <div className={cn('user-wallet')}>
          {nileWallet ? (
            <>
              <button type="button" className={cn('btn-wallet-id')} onClick={() => setVisibleAccount(true)}>
                {shorten(nileWallet)}
              </button>
              <HeaderAccount isOpen={visibleAccount} setIsOpen={setVisibleAccount} setOpenChange={handleAccountVisibleChange} />
            </>
          ) : (
            <button disabled={disabled} type="button" className={cn('btn-wallet-join')} onClick={() => _handleConnectBtn()}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_wallet.svg" />
              Connect
            </button>
          )}
        </div>
        <div className={cn('lang-wrap-pc')}>
          {/* 22.11.03 수정: 언어 선택 토글 버튼으로 변경 (향후 언어 3개 이상일 시 기존 드롭다운으로 롤백) */}
          {locale === 'en' ? (
            <Link href={asPath} locale="ko">
              <a href={asPath} className={cn('lang-btn', 'btn btn-icon btn-40 btn-circle btn-header')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_en.svg" title="Korean Site" />
              </a>
            </Link>
          ) : (
            <Link href={asPath} locale="en">
              <a href={asPath} className={cn('lang-btn', 'btn btn-icon btn-40 btn-circle btn-header')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_ko.svg" title="영문 사이트" />
              </a>
            </Link>
          )}
          {/* <Popover
            destroyTooltipOnHide={true}
            overlayClassName="lang-list-wrap header-inner-popup"
            content={
              <ul className={cn('lang-list')}>
                <li>
                  <Link href={asPath} locale="en">
                    <a href={asPath} className={cn(locale === 'en' && 'active', 'link')}>
                      English
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={asPath} locale="ko">
                    <a href={asPath} className={cn(locale === 'ko' && 'active')}>
                      Korean
                    </a>
                  </Link>
                </li>
              </ul>
            }
            trigger="click"
            open={langVisible}
            onOpenChange={handleLangVisibleChange}
            placement="bottomRight"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <div className={cn('btn-open-lang', langVisible && 'active')}>
              <Button className={cn('btn btn-icon btn-40 btn-circle btn-header')}>
                <IconLang />
                <span className={cn('a11y')}>{t('selectLang')}</span>
              </Button>
            </div>
          </Popover> */}
        </div>
        <div className={cn('mobile-menu')}>
          <button disabled={disabled} type="button" className={cn('btn-menu-open')} onClick={openMobileMenu}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_menu.svg" />
            <span className={cn('a11y')}>{t('openAllMenu')}</span>
          </button>
          <Drawer
            title={
              <div className={cn('mobile-menu-utils')}>
                {/* 23.03.07 수정: atom 이름 및 조건 수정 */}
                {daoVisibleMenu && (
                  <Link href="/" passHref>
                    <a className={cn('btn-home')} onClick={closeMobileMenu}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_logo_symbol.svg" />
                    </a>
                  </Link>
                )}
                {moNotificationOpen ? (
                  <button type="button" className={cn('btn-back')} onClick={() => setMoNotificationOpen(false)}>
                    <span className={cn('a11y')}>{t('returnToFullMenu')}</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_right.svg" />
                  </button>
                ) : (
                  <>
                    {/* TODO: 2022.11.08 수정 : 11일 오픈 시 기능 히든 */}
                    {/* <div className={cn('notice-wrap')}>
                      {isNewNotice ? (
                        <IconButton
                          buttonText="알림 열기"
                          size="40"
                          iconValue="noticeActive"
                          circle
                          classnames="btn-header"
                          onClick={() => setMoNotificationOpen(true)}
                        />
                      ) : (
                        <IconButton
                          buttonText="알림 열기"
                          size="40"
                          iconValue="notice"
                          circle
                          classnames="btn-header"
                          onClick={() => setMoNotificationOpen(true)}
                        />
                      )}
                    </div> */}
                    {/* 22.11.03 수정: 언어 선택 토글 버튼으로 변경 (향후 언어 3개 이상일 시 기존 드롭다운으로 롤백) */}
                    {locale === 'en' ? (
                      <Link href={asPath} locale="ko">
                        <a href={asPath} className={cn('lang-btn', 'btn btn-icon btn-40 btn-circle btn-header')}>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_en.svg" />
                        </a>
                      </Link>
                    ) : (
                      <Link href={asPath} locale="en">
                        <a href={asPath} className={cn('lang-btn', 'btn btn-icon btn-40 btn-circle btn-header')}>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_ko.svg" />
                        </a>
                      </Link>
                    )}
                    {/* <Popover
                      overlayClassName="lang-list-wrap"
                      content={
                        <ul className={cn('lang-list')}>
                          <li>
                            <Link href={asPath} locale="en">
                              <a href={asPath} className={cn(locale === 'en' && 'active', 'link')}>
                                English
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href={asPath} locale="ko">
                              <a href={asPath} className={cn(locale === 'ko' && 'active')}>
                                Korean
                              </a>
                            </Link>
                          </li>
                        </ul>
                      }
                      trigger="click"
                      // open={langVisible}
                      // onOpenChange={handleLangVisibleChange}
                      placement="bottomLeft"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <div className={cn('btn-open-lang', langVisible && 'active')} style={{ display: 'inline-flex' }}>
                        <IconButton buttonText="언어 변경" size="40" iconValue="lang" circle classnames="btn-header" />
                      </div>
                    </Popover> */}
                  </>
                )}
              </div>
            }
            placement="right"
            closable={false}
            onClose={closeMobileMenu}
            open={moMenuOpen}
            extra={<IconButton iconValue="close" onClick={closeMobileMenu} buttonText="Close" size="32" />}
            className="mobile-menu-wrap"
          >
            <div className={cn('mobile-menu-top')}>
              {/* TODO: 2022.11.08 수정 : 11일 오픈 시 기능 히든 */}
              {/* <div className={cn('mypage-banner')}>
                <div className={cn('info-wrap')}>
                  <Avatar className={cn('user-image', userProfile?.themeIndex && `type${userProfile?.themeIndex}`)}  size={48} />
                  <div>
                    <strong className={cn('user-nickname')}>Scarlet Jang</strong>
                    <div className={cn('user-id-wrap')}>
                      <span className={cn('user-id')}>{ID}</span>
                      <CopyToClipboard text={ID}>
                        <button className={cn('btn-copy-id')} onClick={() => message.info({ content: '지갑 주소가 복사되었습니다.', key: 'toast' })}>
                          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg' />
                          <span className={cn('a11y')}>{t('copyWallet')}</span>
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <Link href="/mypage" passHref>
                  <a className={cn('btn-move-page')} onClick={closeMobileMenu}>
                    <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
                    <span className={cn('a11y')}>{t('goToMyPage')}</span>
                  </a>
                </Link>
              </div> */}
              {/* 22.11.09 수정: TODO : 11일 오픈 관련 코드 추가 */}
              {isConnect ? (
                <div className={cn('mypage-banner wallet-banner')}>
                  <div className={cn('info-wrap connect')}>
                    <Avatar
                      className={cn('user-image', userProfile?.themeIndex && `type${userProfile?.themeIndex}`)}
                      size={40}
                      style={{ backgroundImage: userProfile?.img && `url(${userProfile?.img})` }}
                    />
                    <div className="info-wrap">
                      <span className="user-nickname">{userProfile?.nickname ?? shorten(nileWallet)}</span>
                      <CopyToClipboard text={nileWallet ?? ''}>
                        <button className={cn('btn-copy-id')} onClick={() => message.info({ content: t('copyWalletAnnounce'), key: 'toast' })}>
                          <strong> {shorten(nileWallet)}</strong>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg" />
                          <span className={cn('a11y')}>{t('copyWallet')}</span>
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <button className={cn('btn-move-page')} onClick={handleClickToProfile}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                    <span className={cn('a11y')}>{t('goToMyPage')}</span>
                  </button>
                </div>
              ) : (
                <div className={cn('mypage-banner wallet-banner')} onClick={_handleConnectBtn}>
                  <div className={cn('info-wrap')}>
                    <strong>NFT Is Life Evolution</strong>
                    <span>{t('wallet.guideText')}</span>
                  </div>
                  <button className={cn('btn-move-page')} onClick={handleClickToProfile}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                  </button>
                </div>
              )}
              {/* 23.02.09 수정: 개별 다오 페이지의 경우 gnb 메뉴 비노출 조건 처리 */}
              {/* 23.03.07 수정: atom 이름 및 조건 수정 */}
              {!daoVisibleMenu ? (
                <ul className={cn('mobile-menu')}>
                  {menuList.map((menu) => {
                    return (
                      <li key={menu.title}>
                        <Link href={{ pathname: menu.url }} passHref>
                          <a onClick={() => !disabled && closeMobileMenu()} className={cn({ disabled: disabled || menu.disabled })}>
                            {/* 22.11.09 수정: TODO : 11일 오픈 unfolding soon 추가 */}
                            <span>
                              {menu.title}
                              {menu.disabled && <em>Unfolding Soon</em>}
                            </span>
                            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                /* 23.02.28 수정: DAO용 모바일 메뉴 */
                // 23.03.07 수정: 별도 컴포넌트로 분리
                <DaoDrawerMenu daoMenuList={daoMenuList} open={moMenuOpen} />
              )}
            </div>
            {/* 22.11.09 수정: TODO : 11일 오픈 숨김 처리 */}
            {/* <div className={cn('mobile-menu-bottom')}>2022-02-02 17:00 Connected wallet</div> */}
            <div className={cn('notification', moNotificationOpen && 'active')}>
              <HeaderNotification clickEvent={closeMobileMenu} />
            </div>
          </Drawer>
        </div>
      </div>
      {/* 23.03.07 수정: Dao에서는 불러오지 않도록 조건문 추가 */}
      {!daoVisibleMenu && <SearchModal isOpen={isSearchModal} setIsOpen={setIsSearchModal} />}
      {/* <ConnectModal isModalVisible={isConnectModal} setIsModalVisible={setIsConnectModal} */}
      {/*               changeConnectFirst={changeConnectFirst} /> */}
      {/* 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가 */}
      {/* 23.03.07 수정: Dao에서는 불러오지 않도록 조건문 추가 */}
      {!daoVisibleMenu && <NetworkSettingModal isOpen={isModalNetworkSetting} setIsOpen={setModalNetworkSetting} />}
      {/* TODO: 네트워크 변경 팝업. 필요시 노출 */}
      {/* 23.03.07 수정: Dao에서는 불러오지 않도록 조건문 추가 */}
      {!daoVisibleMenu && <NetworkModal isOpen={isModalNetwork} setIsOpen={setModalNetwork} />}
    </header>
  );
};

type daoMenuType = {
  daoMenuList:
    | {
        title: string;
        label: React.ReactNode;
        selected: boolean;
      }[]
    | undefined;
  open: boolean;
};

/* 23.03.07 수정: DAO Drawer 메뉴 추가 */
const DaoDrawerMenu = ({ daoMenuList, open }: daoMenuType) => {
  const { lockScroll } = useScrollLock();
  const activeDao = useAtomValue(daoThemeAtom).value;
  const { t, i18n } = useTranslation(['common']);

  const router = useRouter();

  useEffect(() => {
    lockScroll(open);
  }, [open]);

  const daoDiscordLink = () => {
    switch (activeDao) {
      case 'wonder':
        return 'https://discord.com/invite/78wzkvrsbj';
      case 'arteum':
        return 'https://discord.com/invite/78wzkvrsbj';
      case 'delta':
        return 'https://discord.com/invite/78wzkvrsbj';
      case 'oracle':
        return 'https://discord.com/invite/78wzkvrsbj';
    }
  };
  return (
    <div className={cn('dao-mobile-menu')}>
      <div className={cn('menu-top')}>
        <div className={cn('dao-mobile-menu-header')}>
          <span className={cn('dao-name')}>{useDaoCharacterConvert(activeDao)} DAO</span>
          {/*{dayjs().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm') >=*/}
          {/*  dayjs.utc(process.env.NEXT_PUBLIC_ENV_DAO_WONDER_START_DATE).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm') && (*/}
          {/*  <OutlineButton buttonText="Whitepaper" type="link" size="sm" color="black" />*/}
          {/*)}*/}
          {/* 23.04.11 수정 start: dao-lnb-outline-button 추가   */}
          <OutlineButton
            buttonText="Whitepaper"
            color="black"
            size="sm"
            href={`https://wonder-dao.gitbook.io/whitepaper-${i18n.language === 'en' ? 'en' : 'kr'}`}
            target="_blank"
          />
          {/* 23.04.11 수정 end: dao-lnb-outline-button 추가   */}
        </div>
        <ul className={cn('dao-mobile-menu-list')}>
          {daoMenuList?.map((el, key) => (
            <li key={el.title + key} className={cn(el.selected && 'selected')}>
              {el.label}
            </li>
          ))}
        </ul>
        <div className={cn('outline-button-wrap')}>
          {/* TODO: Papyrus open 시 삭제 */}
          {/* 23.04.03 수정: telegram -> discord 로 수정 */}
          {/* 23.04.11 수정: 디스코드 경로 추가 */}
          <OutlineButton buttonText="Discord" size="sm" color="black" iconType iconValue="discord" href={daoDiscordLink()} target="_blank" />
          {/* 23.04.11 수정: Papyrus 버튼 토스트 팝업 추가 & 텍스트 수정   */}
          <OutlineButton
            buttonText="PAPYRUS"
            size="sm"
            color="black"
            iconType
            iconValue="papyrus"
            onClick={() => {
              message.info({ content: t('prepareService', { ns: 'common' }), key: 'toast' });
            }}
          />
        </div>
      </div>
      <span className={cn('wallet-connected-date')}>2022-02-02 17:00 Connected wallet</span>
    </div>
  );
};
