import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { message } from 'antd';
import BgButton from '@/components/button/BgButton';
import { ReactSVG } from 'react-svg';
import dynamic from 'next/dynamic';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useWalletFormatter } from '@utils/formatter/wallet';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import CustomAvatar from '@components/avatar/CustomAvatar';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
  profile?: {
    address?: string;
    name?: string;
    connected?: boolean;
    theme?: number;
    url?: string;
  };
  nileUser?: NileUserAccount;
}

const ProfileModal = ({ isOpen, setIsOpen, profile, nileUser }: Props) => {
  const { t } = useTranslation(['common']);
  const { shorten } = useWalletFormatter();

  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="sm"
      footer={true}
      destroyOnClose={true}
      footerContent={[
        <BgButton
          type="link"
          href={`/mypage/${nileUser?.address}`}
          buttonText={t('profileModal.view', { ns: 'common' })}
          color="black"
          size="md"
          key="View Profile"
          onClick={() => {
            setIsOpen(false);
          }}
        />,
      ]}
    >
      <div className={cn('profile-popup-wrap')}>
        <div className={cn('profile-img-wrap')}>
          <CustomAvatar themeIndex={nileUser?.themeIndex} src={nileUser?.img ? nileUser.img : profile?.url} />
        </div>
        <strong className={cn('profile-nick-name')}>{nileUser?.nickname ? shorten(nileUser?.nickname) : shorten(nileUser?.address)}</strong>
        <div className={cn('pocket-address-wrap')}>
          <CopyToClipboard text={nileUser?.address ?? ''}>
            <button className={cn('btn-copy-id')} onClick={() => message.info({ content: t('toast.walletCopy', { ns: 'common' }) })}>
              <div className={cn('profile-code-name')}>
                {shorten(nileUser?.address)}
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg" />
                <span className={cn('a11y')}>{t('profileModal.copy')}</span>
              </div>
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ProfileModal;
