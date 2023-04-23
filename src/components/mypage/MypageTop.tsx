import React, { useEffect, useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useWindowResize from '@/hook/useWindowResize';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Avatar, message, Popover } from 'antd';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { NileApiService } from '@/services/nile/api';
import { ReactSVG } from 'react-svg';
import NileNft from '@/models/nile/marketplace/NileNft';
import axios, { AxiosError } from 'axios';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { windowResizeAtom } from '@/state/windowAtom';
import { selectedWalletAtom } from '@/state/accountAtom';
import Link from 'next/link';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { MyAssets } from '@/types/myPage.types';
import { useNumberFormatter } from '@utils/formatter/number';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import CustomAvatar from '@components/avatar/CustomAvatar';
import { fromWei, toBN } from 'web3-utils';

const MyPageTop = () => {
  const { t } = useTranslation(['mypage', 'common']);

  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const selectedWallet = useAtomValue(selectedWalletAtom);

  const [checkMobileWidth, setCheckMobileWidth] = useState(false);
  const [ownNftList, setOwnNftList] = useState<NileNft[]>([]);
  const [userProfile, setUserProfile] = useState<NileUserAccount>();

  const api = NileApiService();
  const { shorten } = useWalletFormatter();

  const [myAssets, setMyAssets] = useState<MyAssets | undefined>();

  const [wemixUsdPrice, setWemixUsdPrice] = useState<number>(0);

  const resizeMobileMode = () => {
    if (offset.width < 768) {
      setCheckMobileWidth(true);
    } else {
      setCheckMobileWidth(false);
    }
  };

  // const totalTokenAmount = useCallback(() => {
  //   if (!tokenPriceInfo) {
  //     return 0;
  //   }
  //
  //   const bnWemixTotal = toBN(tokenPriceInfo.totalWemixPrice);
  //   const bnUsdTotal = toBN(tokenPriceInfo.totalUsdPrice);
  //
  //   const etherValue = fromWei(bnUsdTotal.add(bnWemixTotal.muln(wemixUsdPrice)), 'ether');
  //   console.log('totalTokenAmount', etherValue);
  //   return Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(Number(etherValue));
  // }, [wemixUsdPrice, tokenPriceInfo]);

  // width에 따른 함수 실행
  useEffect(() => {
    resizeMobileMode();
  }, [offset.width]);

  useEffect(() => {
    if (selectedWallet) {
      api.user.account
        .getUserInfo(selectedWallet)
        .then(({ data }) => setUserProfile(data.result))
        .catch((err) => console.log(err));
    }
  }, [selectedWallet]);

  useEffect(() => {
    axios
      .get('/api/marketcap')
      .then(({ data }) => {
        setWemixUsdPrice(data.WEMIX[0].quote.USD.price);
      })
      .catch((error) => {
        console.log(error);
        setWemixUsdPrice(0);
      });
  }, []);

  useEffect(() => {
    if (selectedWallet) {
      api.mypage.nft
        .getList(selectedWallet ?? '')
        .then(({ data }) => setOwnNftList(data.results))
        .catch((err: AxiosError) => {
          return null;
        });

      api.mypage.nft
        .getPrice(selectedWallet ?? '')
        .then(({ data }) => {
          console.log('getPrice', data.result);
          setMyAssets(data.result);
        })
        .catch((e) => console.log(e));
    }
  }, [selectedWallet]);

  const showAsset = useMemo(() => {
    if (nileWallet.toLowerCase() === selectedWallet?.toLowerCase()) {
      return true;
    }
    return userProfile?.displayAsset === 'PUBLIC';
  }, [nileWallet, selectedWallet, userProfile]);

  return (
    <div className={cn('mypage-top-section')}>
      <div className={cn('mypage-profile')}>
        <div className={cn('inner')}>
          <CustomAvatar themeIndex={userProfile?.themeIndex} src={userProfile?.img} size={100} />
          <div className={cn('profile-info')}>
            <h2>
              <span>{userProfile?.nickname ?? shorten(selectedWallet)}</span>
              {nileWallet.toLowerCase() === selectedWallet?.toLowerCase() && (
                <Link href="/mypage/profile">
                  <a>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_setting.svg" />
                    <span className={cn('a11y')}>{t('a11y.gotoSetting', { ns: 'mypage' })}</span>
                  </a>
                </Link>
              )}
            </h2>
            <CopyToClipboard text={selectedWallet ?? ''}>
              {/* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */}
              <button className={cn('copy-wrap')} onClick={() => message.info({ content: t('toast.walletCopy'), key: 'toast' })}>
                {checkMobileWidth ? shorten(selectedWallet) : selectedWallet}
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg" />
                <span className={cn('a11y')}>{t('a11y.copyWallerAdd', { ns: 'mypage' })}</span>
              </button>
            </CopyToClipboard>
            <p className={cn('introduce-wrap')}>{userProfile?.description}</p>
          </div>
          <ul className={cn('sns-list')}>
            {/* {snsList.map((item, index: number) => ( */}
            {/*  <li key={`sns-list-${index}`}> */}
            {/*    <a href={item.link} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })} className={item.name}> */}
            {/*      {item.icon} */}
            {/*      <span className={cn('a11y')}>{item.name}</span> */}
            {/*    </a> */}
            {/*  </li> */}
            {/* ))} */}
            {userProfile?.url && (
              <li>
                <a href={userProfile?.url} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })} className="link">
                  <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_copy_link_32.svg" />
                  <span className={cn('a11y')}>link</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      {showAsset && (
        <div className={cn('mypage-asset')}>
          <div className={cn('asset-total')}>
            <dl>
              <dt>
                Total Asset
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={<div className={cn('tooltip-contents')}>{t('tooltip.totalAsset', { ns: 'mypage' })}</div>}
                  trigger="click"
                >
                  <button type="button">
                    <span className={cn('a11y')}>tooltip</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                  </button>
                </Popover>
              </dt>
              <dd>${fromWei(toBN(myAssets?.total ?? 0))}</dd>
            </dl>
          </div>
          <span className={cn('asset-line')} />
          <div className={cn('asset-unit')}>
            <dl>
              <dt>
                {/* 22.11.16 수정: 11/17 오픈 컨텐츠 */}
                Total Balance of DAO
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={<div className={cn('tooltip-contents')}>{t('tooltip.includedDAO', { ns: 'mypage' })}</div>}
                  trigger="click"
                >
                  <button type="button">
                    <span className={cn('a11y')}>tooltip</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                  </button>
                </Popover>
              </dt>
              <dd>
                <div>$0</div>
                <div>
                  0 <span>DAO</span>
                </div>
              </dd>
            </dl>
            <dl>
              <dt>
                My NFT Price
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={<div className={cn('tooltip-contents')}>{t('tooltip.nftPrice', { ns: 'mypage' })}</div>}
                  trigger="click"
                >
                  <button type="button">
                    <span className={cn('a11y')}>tooltip</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                  </button>
                </Popover>
              </dt>
              <dd>
                <div>${fromWei(toBN(myAssets?.nftPrice ?? 0))}</div>
                <div>
                  {myAssets?.nftCount ?? 0} <span>NFT</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageTop;
