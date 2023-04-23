import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { DaoBox } from '@components/dao/DaoBoxLayout';
import cn from 'classnames';
import OutlineButton from '@components/button/OutlineButton';
import DaoNotice from '@components/dao/DaoNotice';

const TrustNoticeTab = () => {
  const { t } = useTranslation('dao');

  const [authority, isAuthority] = useState<boolean>(true);

  return (
    <>
      <DaoBox className={cn('full')}>
        <div className={cn('trust-notice-wrap')}>
          {authority && (
            <div className={cn('notice-write-btn-wrap')}>
              <OutlineButton
                buttonText="공지 작성하기"
                color="highlight"
                size="sm"
                iconType
                iconValue="pencil"
                type="link"
                href="/dao/wonder/trust-create-notice"
              />
            </div>
          )}
          <DaoNotice />
        </div>
      </DaoBox>
    </>
  );
};

export default TrustNoticeTab;
