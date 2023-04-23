import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { Avatar } from 'antd';
import React from 'react';
import { useTranslation } from 'next-i18next';

interface CustomAvatarType {
  themeIndex?: number;
  src?: string;
  size?: number;
}

const CustomAvatar = ({ themeIndex, src, size }: CustomAvatarType) => {
  const { t } = useTranslation(['mypage']);

  return (
    <Avatar className={cn('user-image', `type${themeIndex}`)} size={size}>
      {src?.includes('mp4') ? (
        <video autoPlay loop muted playsInline disablePictureInPicture>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <>
          {src && <Image src={src} alt="" layout="fill" loader={NileCDNLoader} unoptimized />}
        </>
      )}
      <span className={cn('a11y')}>{t('a11y.settingProfile')}</span>
    </Avatar>
  );
};

export default CustomAvatar;
