import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Avatar, Checkbox } from 'antd';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import Link from 'next/link';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

interface Props {
  step: number;
  setStep: (step: number) => void;
}

const Step1: React.FC<Props> = ({ step, setStep }) => {
  const { t } = useTranslation('mypage', { keyPrefix: 'withdrawal' });
  const [isChecked, setIsChecked] = useState<boolean>(true);
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className={cn('step-wrap')}>
      <h3>{t('h2-1')}</h3>
      <div className={cn('account-card')}>
        <div className={cn('profile-photo-wrap')}>
          <Avatar className={cn('user-image')} size={48}>
            <span className={cn('a11y')}>{t('a11y.settingProfile', { ns: 'mypage' })}</span>
          </Avatar>
        </div>
        <div className={cn('info')}>
          <span className={cn('name')}>Scarlet Jang</span>
          {!isMobile ? (
            <span className={cn('wallet-address')}>0x65b27BA7362ce3f241DAfDFC03Ef24D080e41413</span>
          ) : (
            <span className={cn('wallet-address')}>0x65b2....1413</span>
          )}
        </div>
      </div>
      <div className={cn('announce-wrap')}>
        <h3>{t('h2-2')}</h3>
        <p>{t('announce.desc')}</p>
        <ul className={cn('list-dot')}>
          <li>
            {t('announce.list.1')}
            <ul className={cn('list-dash')}>
              <li>{t('announce.list.1-1')}</li>
            </ul>
          </li>
          <li>
            {t('announce.list.2')}
            <ul className={cn('list-dash')}>
              <li>{t('announce.list.2-1')}</li>
              <li>{t('announce.list.2-2')}</li>
              <li>{t('announce.list.2-3')}</li>
              <li>{t('announce.list.2-4')}</li>
              <li>{t('announce.list.2-5')}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={cn('bottom-area')}>
        <Checkbox
          defaultChecked={false}
          onClick={() => {
            setIsChecked(!isChecked);
          }}
        >
          {t('check')}
        </Checkbox>
        <div className={cn('btn-wrap')}>
          <OutlineButton type="link" href="/mypage/profile" buttonText={t('cancel')} color="black" size="md" />
          <BgButton buttonText={t('next')} color="black" size="md" onClick={() => setStep(++step)} disabled={isChecked} />
        </div>
      </div>
    </div>
  );
};

export default Step1;
