import { useState } from 'react';
import { Tabs } from 'antd';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { DaoBox, DaoBoxLayout } from '@/components/dao/ui/DaoBoxLayout';
import { ReactSVG } from 'react-svg';
import DaoTrustActivity from '@/components/dao/ui/DaoTrustActivity';
import DaoNotice from '@/components/dao/ui/DaoNotice';
import OutlineButton from '@/components/button/OutlineButton';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import ContractSendModal from '@/components/modal/ContractSendModal';
import { NileCDNLoader } from '@/utils/image/loader';
import Image from 'next/image';

export type ContractDataType = {
  funding: string;
  token: number;
};

const AboutComponent = () => {
  const { t, i18n } = useTranslation('dao');
  /* 23.03.23 수정: 월렛이 없을때 버튼 생성 */
  const [isWallet, setIsWallet] = useState<boolean>(false);
  /* 23.03.23 수정: 모달 버튼 생성 */
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
          {/* 23.04.04 수정: svg이미지 깨짐현상 png교체 수정 */}
          <Image
            src={'https://nile.blob.core.windows.net/images/assets/images/img/bg_trust_about.png'}
            alt="trust"
            layout="fill"
            loader={NileCDNLoader}
            objectFit="contain"
          />
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
              <ul className={cn('list-dot-wrap')}>
                <li>{t('trust.about.item.0.list.0.list2.0')}</li>
                <li>{t('trust.about.item.0.list.0.list2.1')}</li>
                <li>{t('trust.about.item.0.list.0.list2.2')}</li>
              </ul>
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
                    <li>{t('trust.about.item.1.list.1.list2.0')}</li>
                    <li>{t('trust.about.item.1.list.1.list2.1', { type: useDaoCharacterConvert(activeDao.value) })}</li>
                    <li>{t('trust.about.item.1.list.1.list2.2', { type: useDaoCharacterConvert(activeDao.value) })}</li>
                    <li>{t('trust.about.item.1.list.1.list2.3', { type: useDaoCharacterConvert(activeDao.value) })}</li>
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

const ActivityComponent = () => {
  const { t } = useTranslation('dao');

  /* 23.03.02 수정: 셀렉트 삭제로 불필요한 코드 삭제 */

  return (
    <DaoBox className="full">
      <div className={cn('trust-activity-wrap')}>
        {/* 23.03.02 수정: 셀렉트 삭제(UI 삭제) */}
        <DaoTrustActivity />
      </div>
    </DaoBox>
  );
};

const NoticeComponent = () => {
  const { t } = useTranslation('dao');

  const [authority, isAuthority] = useState<boolean>(true);

  return (
    <>
      <DaoBox className={cn('full')}>
        <div className={cn('trust-notice-wrap')}>
          {/* 23.03.22 수정: 공지 작성 권한이 있을 때 버튼이 나타남 */}
          {authority && (
            <div className={cn('notice-write-btn-wrap')}>
              <OutlineButton
                buttonText={t('trust.registerNotice.btn')}
                color="highlight"
                size="sm"
                iconType
                iconValue="pencil"
                type="link"
                href="/dao/ui/wonder/trust-create-notice"
              />
            </div>
          )}
          <DaoNotice />
        </div>
      </DaoBox>
    </>
  );
};

const DaoTrustTab = () => {
  const { t, i18n } = useTranslation('dao');
  const [currentTab, setCurrentTab] = useState<string>('about');
  // 새로운 공지 등록 시 newNotice 값 true
  const [newNotice, setNewNotice] = useState<boolean>(true);
  const activeDao = useAtomValue(daoThemeAtom);

  const ContentTabs = [
    {
      label: 'About',
      key: 'about',
      children: <AboutComponent />,
    },
    {
      label: 'Managing Transactions',
      key: 'managing transactions',
      children: <ActivityComponent />,
    },
    {
      label: newNotice ? (
        <>
          {t('trust.notice')} <i className={cn('new-flag')}></i>
        </>
      ) : (
        t('trust.notice')
      ),
      key: 'notice',
      children: <NoticeComponent />,
    },
  ];

  return (
    <DaoBoxLayout>
      <div className={cn('dao-trust-tab')}>
        <Tabs
          destroyInactiveTabPane
          activeKey={currentTab}
          /* 23.03.02 수정: tab size 변경 */
          className={cn('tab-type', 'tab-trust', 'tab-underline')}
          items={ContentTabs}
          onTabClick={(key: string) => {
            setCurrentTab(key);
          }}
        />
        {/* 23.03.02 수정 start: wonder scan button 추가 */}
        <div className={cn('more-btn-st-wrap')}>
          <OutlineButton
            buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
            color="gray"
            size="sm"
            iconType={true}
            iconValue="line-arrow"
            align={true}
            href={'/wonderscan'}
          />
        </div>
        {/* 23.03.02 수정 end: wonder scan button 추가 */}
      </div>
      {/* 23.03.30 수정: 모바일에서 버튼 위치 수정 */}
      {/* 23.03.21 수정: 모바일 더보기 레이아웃 분기 디자인 변경 */}
      <div className={cn('mobile-scan-btn')}>
        <div className={cn('more-btn-st-wrap')}>
          <OutlineButton
            buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
            color="gray"
            size="sm"
            iconType={true}
            iconValue="line-arrow"
            align={true}
            href={'/wonderscan'}
          />
        </div>
      </div>
    </DaoBoxLayout>
  );
};

export default DaoTrustTab;
