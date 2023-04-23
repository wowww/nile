import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { DaoBox } from '@components/dao/DaoBoxLayout';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import OutlineButton from '@components/button/OutlineButton';
import ContractSendModal from '@components/modal/ContractSendModal';
import { ContractDataType } from '@components/dao/trust/DaoTrustContent';
/* 23.04.10 수정: daoThemeAtom, useAtomValue, useDaoCharacterConvert 추가 */
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

const TrustAboutTab = () => {
  const { t } = useTranslation('dao');
  const [isWallet, setIsWallet] = useState<boolean>(false);
  const [contractSend, setContractSend] = useState<boolean>(false);
  /* 23.04.10 수정: activeDao 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  const contractData: ContractDataType = {
    funding: 'Trust Contract',
    token: 12094.12345678912345679,
  };

  return (
    <DaoBox className="full">
      <div className={cn('trust-about-wrap')}>
        <div className={cn('bg-wrap')} aria-hidden="true">
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/bg_trust_about.svg" />
        </div>
        <div className={cn('title-wrap')}>
          {/* 23.04.10 수정: 다국어 타입 추가 */}
          <h4 className={cn('title')}>{t('trust.about.title', { type: useDaoCharacterConvert(activeDao.value) })}</h4>
        </div>
        {/* 23.04.10 수정 start: about tab 전체 내용 수정 */}
        <ul className={cn('list-content-wrap')}>
          <li className={cn('list-item')}>
            <span className={cn('icon-wrap')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotrust/ico_about_introduce.svg" />
            </span>
            <div className={cn('inner-wrap')}>
              <div className={cn('inner-title-wrap')}>
                <strong className={cn('list-title')}>{t('trust.about.item.0.title')}</strong>
                <p className={cn('list-desc')}>{t('trust.about.item.0.desc', { type: useDaoCharacterConvert(activeDao.value) })}</p>
              </div>
            </div>
          </li>
          <li className={cn('list-item')}>
            <span className={cn('icon-wrap')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotrust/ico_about_work.svg" />
            </span>
            <div className={cn('inner-wrap')}>
              <div className={cn('inner-title-wrap')}>
                <strong className={cn('list-title')}>{t('trust.about.item.1.title')}</strong>
              </div>
              <ul className={cn('list-dot-wrap')}>
                <li>
                  <strong className={cn('list-dot-title')}>{t('trust.about.item.1.list.0.title')}</strong>
                  <ul className={cn('list-bar-wrap')}>
                    <li>{t('trust.about.item.1.list.0.list2.0')}</li>
                  </ul>
                </li>
                <li>
                  <strong className={cn('list-dot-title')}>{t('trust.about.item.1.list.1.title')}</strong>
                  <ul className={cn('list-bar-wrap')}>
                    <li>
                      {t('trust.about.item.1.list.1.list2.0', { type: useDaoCharacterConvert(activeDao.value) })}
                      <p className={cn('caption')}>{t('trust.about.item.1.list.1.caption.0')}</p>
                    </li>
                    <li>
                      {t('trust.about.item.1.list.1.list2.1', { type: useDaoCharacterConvert(activeDao.value) })}
                      <p className={cn('caption')}>{t('trust.about.item.1.list.1.caption.1', { type: useDaoCharacterConvert(activeDao.value) })}</p>
                    </li>
                    <li>
                      {t('trust.about.item.1.list.1.list2.2', { type: useDaoCharacterConvert(activeDao.value) })}
                      <p className={cn('caption')}>{t('trust.about.item.1.list.1.caption.2', { unit1: t(`amountUnit.${activeDao.value}.unit1`) })}</p>
                    </li>
                    <li>{t('trust.about.item.1.list.1.list2.3')}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
          <li className={cn('list-item')}>
            <span className={cn('icon-wrap')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daotrust/ico_about_profit.svg" />
            </span>
            <div className={cn('inner-wrap')}>
              <div className={cn('inner-title-wrap')}>
                <strong className={cn('list-title')}>{t('trust.about.item.2.title')}</strong>
              </div>
              <ul className={cn('list-dot-wrap')}>
                <li>
                  <strong className={cn('list-dot-title')}>{t('trust.about.item.2.list.0.title')}</strong>
                  <ul className={cn('list-bar-wrap')}>
                    <li>{t('trust.about.item.2.list.0.list2.0', { type: useDaoCharacterConvert(activeDao.value) })}</li>
                  </ul>
                </li>
                <li>
                  <strong className={cn('list-dot-title')}>{t('trust.about.item.2.list.1.title')}</strong>
                  <ul className={cn('list-bar-wrap')}>
                    <li>{t('trust.about.item.2.list.1.list2.0')}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        {/* 23.04.10 수정 end: about tab 전체 내용 수정 */}
      </div>
    </DaoBox>
  );
};

export default TrustAboutTab;
