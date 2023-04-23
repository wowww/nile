import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Avatar } from 'antd';
import BgButton from '@/components/button/BgButton';
import dynamic from 'next/dynamic';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import { DaoParticipantType } from '@/types/dao/dao.types';
import { useWalletFormatter } from '@utils/formatter/wallet';
import React, { useEffect, useState } from 'react';
import { NileApiService } from '@/services/nile/api';
import NileUserAccount from '@/models/nile/user/NileUserAccount';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  user?: DaoParticipantType;
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
  data?: any;
}

const RecruitMarqueeBannerModal = ({ user, isOpen, setIsOpen, data }: Props) => {
  const { t } = useTranslation(['mypage', 'common']);
  const offset = useAtomValue(windowResizeAtom);
  const api = NileApiService();
  const { shorten } = useWalletFormatter();

  const [nileUser, setNileUser] = useState<NileUserAccount>();

  useEffect(() => {
    if (user && isOpen) {
      api.user.account
        .getUserInfo(user?.address ?? '')
        .then(({ data }) => setNileUser(data.result))
        .catch((err) => console.log(err));
    }
  }, [isOpen]);

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
          href={`/mypage/${user?.address}`}
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
      <div className={cn('recruit-marquee-popup-wrap')}>
        <div className={cn('top')}>
          <Avatar
            className={cn('user-image', `type${nileUser?.themeIndex}`)}
            style={{ backgroundImage: `url(${nileUser?.img})` }}
            size={offset.width > 1279 ? 100 : offset.width > 767 ? 80 : 64}
          >
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          <strong className={cn('name')}>{user?.nickname ?? shorten(user?.address)}</strong>
          <p className={cn('text')}>{user?.description}</p>
        </div>
        <div className={cn('bottom')}>
          <span className={cn('info-name')}>참여금액</span>
          <span className={cn('figure')}>{user?.amount?.toLocaleString()} WEMIX</span>
        </div>
      </div>
    </ModalLayout>
  );
};

export default RecruitMarqueeBannerModal;
