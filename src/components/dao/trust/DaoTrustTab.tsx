import { useState } from 'react';
import { Popover, Select, Tabs } from 'antd';
import cn from 'classnames';
import { i18n, useTranslation } from 'next-i18next';

import { DaoBox, DaoBoxLayout } from '@/components/dao/DaoBoxLayout';
import { ReactSVG } from 'react-svg';
import DaoTrustActivity from '@/components/dao/DaoTrustActivity';
import DaoNotice from '@/components/dao/DaoNotice';
import { NileCDNLoader } from '@/utils/image/loader';
import Image from 'next/image';
/* 23.04.10 수정: daoThemeAtom, useAtomValue, useDaoCharacterConvert 추가 */
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

const AboutComponent = () => {
  const { t, i18n } = useTranslation('dao');
  /* 23.04.10 수정: activeDao 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

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
          <p className={cn('desc')}>{t('trust.about.desc')}</p>
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
  const selectList = [t('trust.activity.select.0'), 'WONDER DAO 1', 'WONDER DAO 2'];
  const { Option } = Select;
  const [selectValue, setSelectValue] = useState<string>(selectList[0]);

  const onChangeSelect = (value: string) => {
    setSelectValue(value);
  };

  return (
    <DaoBox className="full">
      <div className={cn('trust-activity-wrap')}>
        <div className={cn('table-top-wrap')}>
          <Select
            size="middle"
            /* 22.11.21 수정: 디폴브 밸류 다국어처리및 키값 반영 */
            defaultValue={selectValue}
            key={t('trust.activity.select.0')}
            suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            onChange={onChangeSelect}
          >
            {selectList.map((el, index) => {
              return (
                <Option value={el} key={el + index}>
                  {el}
                </Option>
              );
            })}
          </Select>
          {selectValue !== selectList[0] && (
            <div className={cn('table-tooltip-wrap')}>
              <div className={cn('tooltip-wrap')}>
                <span style={{ fontSize: '12px' }}>{t('trust.activity.tooltip.name')}</span>
                <Popover
                  overlayClassName="tooltip"
                  placement="topRight"
                  content={
                    <div className={cn('tooltip-contents')}>
                      <ul className={cn('list-dot-wrap')}>
                        <li className={cn('line')}>
                          <dl className={cn('data-wrap')}>
                            <dt>{t('trust.activity.tooltip.fee')}</dt>
                            <dd>3%</dd>
                          </dl>
                        </li>
                        <li>
                          <dl className={cn('data-wrap')}>
                            <dt>{t('trust.activity.tooltip.treasuryRate')}</dt>
                            <dd>3%</dd>
                          </dl>
                        </li>
                        <li>
                          <dl className={cn('data-wrap')}>
                            <dt>{t('trust.activity.tooltip.incineratorRate')}</dt>
                            <dd>3%</dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  }
                  trigger="hover"
                  getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                >
                  <button type="button">
                    <span className={cn('a11y')}>tooltip</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                  </button>
                </Popover>
              </div>
            </div>
          )}
        </div>
        <DaoTrustActivity />
      </div>
    </DaoBox>
  );
};

const NoticeComponent = () => {
  const { t } = useTranslation('dao');

  return (
    <>
      <DaoBox className={cn('full')}>
        <div className={cn('trust-notice-wrap')}>
          <DaoNotice />
        </div>
      </DaoBox>
    </>
  );
};

const DaoTrustTab = () => {
  const [currentTab, setCurrentTab] = useState<string>('about');
  // 새로운 공지 등록 시 newNotice 값 true
  const [newNotice, setNewNotice] = useState<boolean>(true);

  const ContentTabs = [
    {
      label: 'About',
      key: 'about',
      children: <AboutComponent />,
    },
    {
      label: 'Activity',
      key: 'activity',
      children: <ActivityComponent />,
    },
    {
      label: newNotice ? (
        <>
          {i18n?.language === 'ko' ? '전체공지' : 'Notice'} <i className={cn('new-flag')}></i>
        </>
      ) : i18n?.language === 'ko' ? (
        '전체공지'
      ) : (
        'Notice'
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
          className={cn('tab-type', 'tab-md', 'tab-underline')}
          items={ContentTabs}
          onTabClick={(key: string) => {
            setCurrentTab(key);
          }}
        />
      </div>
    </DaoBoxLayout>
  );
};

export default DaoTrustTab;
