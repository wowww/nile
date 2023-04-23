import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import cn from 'classnames';
import { message } from 'antd';
/* 22.11.02 수정: 다국어 추가 */
import { useTranslation } from 'next-i18next';

import NotificationSettingList from '@/components/notification/NotificationSettingList';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import dynamic from "next/dynamic";

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

export interface SettingListProps {
  name: string;
  list: string[];
}

const NotificationSetting = () => {
  const { t } = useTranslation('common');

  const [change, setChange] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const settingList: SettingListProps[] = [
    {
      name: 'DAO',
      list: [
        t('header.notification.setting.dao.1'),
        t('header.notification.setting.dao.2'),
        t('header.notification.setting.dao.3'),
        t('header.notification.setting.dao.4'),
        t('header.notification.setting.dao.5'),
      ],
    },
    {
      name: 'Marketplace',
      list: [
        t('header.notification.setting.marketplace.1'),
        t('header.notification.setting.marketplace.2'),
        t('header.notification.setting.marketplace.3'),
        t('header.notification.setting.marketplace.4'),
        t('header.notification.setting.marketplace.5'),
        t('header.notification.setting.marketplace.6'),
        t('header.notification.setting.marketplace.7'),
      ],
    },
    {
      name: 'Life',
      list: [t('header.notification.setting.life.1')],
    },
    {
      name: 'Community',
      list: [t('header.notification.setting.community.1')],
    },
  ];

  const handleCheckboxChange = () => {
    setChange(true);
  };
  return (
    <>
      <Helmet>
        <title>notification &gt; NILE</title>
      </Helmet>
      <div className={cn('notification-wrap')}>
        <div className={cn('title-wrap')}>
          <h2 className={cn('title')}>{t('header.notification.setting.title')}</h2>
          <p className={cn('desc')}>{t('header.notification.setting.desc')}</p>
        </div>
        <NotificationSettingList settingList={settingList} changeEvent={handleCheckboxChange} />
        <div className={cn('button-wrap')}>
          <BgButton
            buttonText="Save"
            size="lg"
            color="black"
            disabled={!change}
            onClick={() => message.info({ content: t('header.notification.saved'), key: 'toast' })}
          />
          {/* 22.11.09 수정 start: 토스트 팝업 중복 생성 방지 코드로 수정 */}
        </div>
      </div>
      {/* 뒤로가기 버튼 클릭 시 노출할 팝업 */}
      <ModalLayout
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        size="sm"
        title={t('header.notification.setting.cancel.title')}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <OutlineButton
            buttonText={t('close')}
            color="black"
            size="md"
            onClick={() => {
              setIsPopupOpen(false);
            }}
            key="cancel"
          />,
          <BgButton
            buttonText={t('header.notification.confirmCancelButton')}
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              setIsPopupOpen(false);
            }}
          />,
        ]}
      >
        <p>
          {t('header.notification.setting.cancel.desc-1')}
          <br />
          {t('header.notification.setting.cancel.desc-2')}
        </p>
      </ModalLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default NotificationSetting;
