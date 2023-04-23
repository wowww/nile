import { useMemo, useState } from 'react';
import cn from 'classnames';
import { Avatar } from 'antd';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';
import Link from 'next/link';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { useNumberFormatter } from '@utils/formatter/number';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import { Activity } from '@/types/activity.types';
import { fromWei } from 'web3-utils';

export interface NileFootprintCardProps {
  activity?: Activity;
  id: string;
  userThumb?: string;
  date: number;
  userName: string;
  activityDesc: string;
  figure?: number;
  bottomContents?: {
    iconUrl: string;
    text: string;
    link: string;
  };
  isLogin?: boolean;
}

const NileFootprintCard = ({ userThumb, date, userName, activityDesc, figure, bottomContents, isLogin = true }: NileFootprintCardProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { t } = useTranslation(['nile', 'common']);
  const { shorten } = useWalletFormatter();
  const { shorthanded } = useNumberFormatter();
  const randomProfileNum = useMemo(() => Math.floor(Math.random() * 21) + 1, []);
  const randomNum = useMemo(() => Math.floor(Math.random() * 3) + 1, []);
  const profileUrl = isLogin
    ? `https://nile.blob.core.windows.net/images/assets/images/icon/profile/ico_profile_login_${randomProfileNum}.svg`
    : `https://nile.blob.core.windows.net/images/assets/images/icon/profile/ico_profile_anon_${(randomProfileNum % 10) + 1}.svg`;
  const getFileExtension = () => {
    if (bottomContents?.iconUrl) {
      const separatedFileName = bottomContents.iconUrl.split('.');
      if (separatedFileName.length === 0 || (separatedFileName[0] === '' && separatedFileName.length === 2)) {
        return '';
      }
      return separatedFileName.pop();
    }
  };

  const localDate = useMemo(() => dayjs.utc(date).local(), [date]);
  const relativeDate = useMemo(() => dayjs.utc(date).local().fromNow(), [date]);

  return (
    <div className={cn('nile-footprint-card')}>
      <div className={cn('card-top')}>
        <div className={cn('card-top-header')}>
          <Avatar
            // 로그인 한 유저만 프로필에 컬러 배경 들어감
            className={cn('user-image', isLogin ? `profile-color-${(randomProfileNum % 10) + 1}` : 'anon')}
            size={40}
            style={{
              backgroundImage: `url(${profileUrl})`,
            }}
          >
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          <span className={cn('time-left')}>{relativeDate}</span>
        </div>
        <span className={cn('user-name', !isLogin ? 'anon' : 'login')} /* onClick={() => setIsModal(true)} */>{shorten(userName)}</span>
        <strong className={cn('activity-desc')}>{activityDesc}</strong>
        <span className={cn('figure')}>{shorthanded(Number(fromWei(String(figure ?? '0'), 'ether')))} WEMIX$</span>
      </div>
      <div className={cn('card-bottom')} style={{ backgroundImage: `url(/images/bg_footprint_bottom_${randomNum}.png)` }}>
        {bottomContents && (
          <Link href={bottomContents.link}>
            <a className={cn('bottom-contents')}>
              {getFileExtension() === 'svg' ? (
                <ReactSVG src={bottomContents.iconUrl} />
              ) : (
                <div className={cn('image-wrap')}>
                  <Image src={bottomContents.iconUrl} layout="fill" loader={NileCDNLoader} alt="" />
                </div>
              )}
              <span className={cn('bottom-contents-text')}>{bottomContents.text}</span>
            </a>
          </Link>
        )}
      </div>
      {/*<ProfileModal isOpen={isModal} setIsOpen={setIsModal} data={{ pocketAddress: userName, img: profileUrl }} />*/}
    </div>
  );
};

export default NileFootprintCard;
