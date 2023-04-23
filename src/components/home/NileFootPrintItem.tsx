import { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Avatar } from 'antd';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';
import Link from 'next/link';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { useNumberFormatter } from '@utils/formatter/number';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import { Activity, ActivityType } from '@/types/activity.types';
import { NileApiService } from '@/services/nile/api';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import { useInView } from 'react-intersection-observer';
import ProfileModal from '@components/modal/ProfileModal';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { ZERO_ADDRESS } from '@/state/web3Atom';
import { fromWei } from 'web3-utils';

export interface NileFootprintItemProps {
  activity?: Activity;
  visible: boolean;
}

const NileFootprintItem = ({ activity, visible }: NileFootprintItemProps) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { t } = useTranslation(['nile', 'common']);
  const { shorten } = useWalletFormatter();
  const { shorthanded } = useNumberFormatter();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [nileUser, setNileUser] = useState<NileUserAccount>();

  const api = NileApiService();

  const [token, setToken] = useState<NileNftToken>();

  const fetchUser = useCallback(() => {
    if (activity?.from && activity?.from !== ZERO_ADDRESS) {
      api.user.account
        .getUserInfo(activity?.from)
        .then(({ data }) => setNileUser(data.result))
        .catch(({ response }) => {
          return null;
        });
    }
  }, [api, activity]);

  const fetchToken = useCallback(() => {
    if (!activity) {
      return;
    }

    const { collection, tokenId } = activity;

    api.marketplace.nft
      .getItem({ collectionAddress: collection, tokenId: Number(tokenId) })
      .then(({ data }) => setToken(data.result))
      .catch((error) => {
        console.log(error);
      });
  }, [api, activity]);

  // const getFileExtension = () => {
  //   if (bottomContents?.iconUrl) {
  //     const separatedFileName = bottomContents.iconUrl.split('.');
  //     if (separatedFileName.length === 0 || (separatedFileName[0] === '' && separatedFileName.length === 2)) {
  //       return '';
  //     }
  //     return separatedFileName.pop();
  //   }
  // };

  const bg = useMemo(() => Math.floor(Math.random() * 3) + 1, [activity]);

  const profile = useMemo(() => {
    let name: string | undefined = '';
    let connected = false;
    let theme = 0;
    let url = '';

    if (activity) {
      connected = !!activity.from || !!activity.to;
      if (activity.type === ActivityType.MINT) {
        name = activity.toName ? activity.toName : shorten(activity.to);
        theme = activity.toTheme ?? Math.floor(Math.random() * 21) + 1;
        url = `https://nile.blob.core.windows.net/images/assets/images/icon/profile/ico_profile_login_${theme}.svg`;
      } else {
        if (!activity.from) {
          const keys = activity.guest?.split('-');
          const emotion = t(`home.footPrint.emotion.${keys?.[0] ?? ''}`);
          const god = t(`home.footPrint.god.${keys?.[1] ?? ''}`);
          name = `${emotion} ${god}`;
          theme = Math.floor(Math.random() * 10) + 1;
          url = `https://nile.blob.core.windows.net/images/assets/images/icon/profile/ico_profile_anon_${theme}.svg`;
        } else {
          name = activity.fromName ? activity.fromName : shorten(activity.from);
          theme = activity.fromTheme ?? Math.floor(Math.random() * 21) + 1;
          url = `https://nile.blob.core.windows.net/images/assets/images/icon/profile/ico_profile_login_${theme}.svg`;
        }
      }
    }

    return { address: activity?.from, name, connected, theme, url };
  }, [activity, t]);

  const message = useMemo(() => t(`home.footPrint.${activity?.category}.${activity?.type}`), [activity, t]);
  const localDate = useMemo(() => dayjs.utc(activity?.timestamp).local(), [activity]);
  const relativeDate = useMemo(() => dayjs.utc(activity?.timestamp).local().fromNow(), [activity]);

  useEffect(() => {
    if (inView && activity?.collection && activity?.tokenId && !token) {
      fetchToken();
    }

    if (inView && !nileUser) {
      fetchUser();
    }
  }, [activity, inView]);

  return (
    <div className={cn('nile-footprint-card')} ref={ref}>
      <div className={cn('card-top')}>
        <div className={cn('card-top-header')}>
          <Avatar
            // 로그인 한 유저만 프로필에 컬러 배경 들어감
            className={cn('user-image', profile.connected ? `profile-color-${profile.theme}` : 'anon')}
            size={40}
            style={{
              backgroundImage: `url(${nileUser?.img ?? profile.url})`,
            }}
          >
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          <span className={cn('time-left')}>{relativeDate}</span>
        </div>
        <span
          className={cn('user-name', !profile.connected ? 'anon' : 'login')} /* onClick={() => setIsModal(true)} */
          onClick={() => {
            if (activity?.from) {
              setIsProfileOpen(true);
            }
          }}
        >
          {profile.name}
        </span>
        <strong className={cn('activity-desc')}>{message}</strong>
        {activity?.price && (
          <span className={cn('figure')}>{shorthanded(Number(fromWei(String(activity?.price ?? '0'), 'ether')))} WEMIX$</span>
        )}
      </div>
      <div className={cn('card-bottom')} style={{ backgroundImage: `url(/images/bg_footprint_bottom_${bg}.png)` }}>
        {token && (
          <Link href={`/marketplace/${token.collectionAddress}/${token.tokenId}`}>
            <a className={cn('bottom-contents')}>
              {/* {getFileExtension() === 'svg' ? ( */}
              {/*   <ReactSVG src={bottomContents.iconUrl} /> */}
              {/* ) : ( */}
              {token.imageUrl && (
                <div className={cn('image-wrap')}>
                  <Image src={token.imageUrl} layout="fill" loader={NileCDNLoader} alt="" />
                </div>
              )}
              {/* )} */}
              <span className={cn('bottom-contents-text')}>{token.name}</span>
            </a>
          </Link>
        )}
      </div>
      <ProfileModal isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} profile={profile} nileUser={nileUser} />
    </div>
  );
};

export default NileFootprintItem;
