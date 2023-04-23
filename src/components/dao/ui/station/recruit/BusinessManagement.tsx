import { forwardRef } from 'react';
import cn from 'classnames';
import OutlineButton from '@/components/button/OutlineButton';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';

const BusinessManagement = forwardRef((props, ref: any) => {
  const { t } = useTranslation('dao');

  return (
    <div className={cn('business-management-wrap')} id="trust" ref={ref}>
      <div className={cn('header-wrap')}>
        <strong className={cn('recruit-wrapper-title')}>{t('station.recruiting.section.2.5.title')}</strong>
        <span className={cn('title-desc')}>{t('station.recruiting.section.2.5.desc')}</span>
        <OutlineButton buttonText={t('station.recruiting.section.2.5.btn')} color="black" size="md" />
      </div>
      <div className={cn('detail-wrap')}>
        <div className={cn('left')}>
          <strong className={cn('detail-title')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_dao_recruit_bm_1.svg" />
            {t('station.recruiting.section.2.5.list.1.title')}
          </strong>
          <ul className={cn('list-type-dot')}>
            <li>
              <dl>
                <dt>{t('station.recruiting.section.2.5.list.1.list.2')}</dt>
                <dd>Wallet Address : 0xabcdefghijklmnop1234567890abcd</dd>
              </dl>
            </li>
            <li>
              <span className={cn('subject')}>{t('station.recruiting.section.2.5.list.1.list.3')}</span>
              <dl>
                <dt>WEMADE {t('station.recruiting.section.2.5.list.1.list.3-1')}</dt>
                <dd>Wallet Address : 0xabcdefghijklmnop1234567890abcd</dd>
                <dt>WEMADE {t('station.recruiting.section.2.5.list.1.list.3-1')}</dt>
                <dd>Wallet Address : 0xabcdefghijklmnop1234567890abcd</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>{t('station.recruiting.section.2.5.list.1.list.4')}</dt>
                <dd>{t('station.recruiting.section.2.5.list.1.list.4-1')}</dd>
              </dl>
            </li>
          </ul>
        </div>
        <div className={cn('right')}>
          <strong className={cn('detail-title')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_dao_recruit_bm_2.svg" />
            {t('station.recruiting.section.2.5.list.2.title')}
          </strong>
          <ul className={cn('list-type-dot')}>
            <li>{t('station.recruiting.section.2.5.list.2.1')}</li>
            <li>{t('station.recruiting.section.2.5.list.2.2')}</li>
            <li>{t('station.recruiting.section.2.5.list.2.3')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default BusinessManagement;
