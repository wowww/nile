import React from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Drawer } from 'antd';
import Link from 'next/link';

import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import { useSetAtom } from 'jotai';
import { cookieAgreementAtom } from '@/state/modalAtom';

interface CookiesProps {
  open: boolean;
  keyboard: boolean;
  onClosed: () => void;
}

const CookiesModal = ({ open, keyboard, onClosed }: CookiesProps) => {
  const { t } = useTranslation('terms');
  const setCookieAgreement = useSetAtom(cookieAgreementAtom);

  return (
    <Drawer
      mask={false}
      className="ant-cookies"
      title={t('cookies.title')}
      closable={false}
      placement="bottom"
      open={open}
      onClose={onClosed}
      destroyOnClose={true}
      keyboard={keyboard}
    >
      <div className={cn('body-content')}>
        {t('cookies.content')}{' '}
        <Link href="https://www.wemix.com/ko/policy/cookiepolicy" passHref>
          <a className={cn('anchor-policy')} target="_blank">
            {t('cookies.anchorPrivacyPolicy')}
          </a>
        </Link>
      </div>
      <div className={cn('ant-modal-confirm-btns')}>
        <BgButton buttonText={t('cookies.btnAllowAll')} color="black" size="md" onClick={() => {
          setCookieAgreement('ALL');
          onClosed();
        }} />
        <OutlineButton buttonText={t('cookies.btnAllowEssential')} color="black" size="md" onClick={() => {
          setCookieAgreement('ESSENTIAL');
          onClosed();
        }} />
      </div>
    </Drawer>
  );
};

export default CookiesModal;
