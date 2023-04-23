import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
/* 22.11.02 수정: 다국어 추가 */
import { useTranslation } from 'next-i18next';

import RadioTab from '../tokens/RadioTab';
import InfiniteLoader from '../loader/InfiniteLoader';
import ModalLayout from '../modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';

export interface NotificationDataProps {
  type: string;
  menuName: string;
  imgUrl: string;
  imgType: 'square' | 'circle';
  desc: string;
  noticeTime: string;
  link: string;
  newNotice: boolean;
  majorNotice: boolean;
  detailContents?: { title: string; desc: string };
  doaGenerationContents?: { ratio: string; achieve: string; achieveUnit: string };
}

// notification 버튼 리스트
const notificationBtnList = [
  {
    name: 'All',
    value: 'all',
    count: 7,
  },
  {
    name: 'DAO' /* 22.11.17 수정: 텍스트 수정 */,
    value: 'dao',
    count: 3,
  },
  {
    name: 'Marketplace',
    value: 'marketplace',
    count: 4,
  },
  {
    name: 'Life',
    value: 'life',
    count: 4,
  },
  {
    name: 'Community',
    value: 'community',
    count: 1,
  },
];

interface notificationProps {
  clickEvent: () => void;
}

const HeaderNotification: React.FC<notificationProps> = ({ clickEvent }) => {
  const { t } = useTranslation('common');

  const [nowTab, setNowTab] = useState<string>('all');
  const [listCount, setListCount] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  /* 22.11.18 수정: imgType 추가 */
  const notificationList: NotificationDataProps[] = [
    // 22.11.17 수정: marketplace 케이스 추가
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.11', { nft: '024 Hounslow West' }),
      noticeTime: 'now',
      link: '/',
      newNotice: true,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.12', { nft: '024 Hounslow West' }),
      noticeTime: 'now',
      link: '/',
      newNotice: true,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.5', { nft: '024 Hounslow West' }),
      noticeTime: '10minutes ago',
      link: '/',
      newNotice: true,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.6', { nft: '024 Hounslow West' }),
      noticeTime: '10minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.7', { nft: '024 Hounslow West' }),
      noticeTime: '10minutes ago',
      link: '/',
      detailContents: {
        title: 'AcidAcidAcid offers 024 Hounslow West Hounslow West Hounslow West Hounslow West',
        desc: '232 WEMIX$',
      },
      newNotice: false,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.8', { nft: '024 Hounslow West' }),
      noticeTime: '10minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.9', { nft: '024 Hounslow West' }),
      noticeTime: '10minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.10', { nft: '024 Hounslow West' }),
      noticeTime: '10minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.3'),
      noticeTime: '10minutes',
      link: '/',
      detailContents: {
        title: 'Scarlet Jang gets 024 Hounslow West',
        desc: '232 WEMIX ($123)',
      },
      newNotice: false,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_sample.jpg',
      imgType: 'square',
      desc: t('header.notification.nft.4'),
      noticeTime: '10minutes ago',
      link: '/',
      detailContents: {
        title: 'Acid Get 024 Hounslow West',
        desc: '232 WEMIX$',
      },
      newNotice: false,
      majorNotice: true,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_ranking.png',
      imgType: 'square',
      desc: t('header.notification.nft.2'),
      noticeTime: '2hours ago',
      detailContents: {
        title: 'AcidAcidAcid outbids 024 Hounslow West Hounslow West Hounslow West Hounslow West',
        desc: '234 WEMIX$',
      },
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'marketplace',
      menuName: 'Marketplace',
      imgUrl: '/temp/@temp_ranking.png',
      imgType: 'square',
      desc: t('header.notification.nft.5', { nft: '024 Hounslow West' }),
      noticeTime: '1hours ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      menuName: 'WONDER DAO - Station',
      imgType: 'circle',
      imgUrl: '/temp/@temp_dao_2.png',
      desc: t('header.notification.dao.1', { dao: 'WONDER DAO' }),
      noticeTime: '20minutes ago',
      doaGenerationContents: {
        ratio: 'WEMIX : Wonder = 1 : 1.618',
        achieve: '10,142,000.0000',
        achieveUnit: 'WDR',
      },
      link: '/',
      newNotice: false,
      majorNotice: true,
    },
    {
      type: 'dao',
      menuName: 'WONDER DAO - Station',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.1', { dao: 'WONDER DAO' }),
      noticeTime: '30minutes ago',
      doaGenerationContents: {
        ratio: 'WEMIX : Wonder = 1 : 1.618',
        achieve: '10,142,000.0000',
        achieveUnit: 'WDR',
      },
      link: '/',
      newNotice: false,
      majorNotice: true,
    },
    {
      type: 'dao',
      menuName: 'WEMIX.Fi DAO - Station',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.7', { dao: 'WEMIX.Fi DAO' }),
      noticeTime: '2022-10-11 11:24',
      detailContents: {
        title: 'WEMIX.Fi DAO Recruiting NOW',
        desc: '2022-09-01 11:00 ~ 2022-09-30 11:00',
      },
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    // 22.11.17 수정: DAO 케이스 추가
    {
      type: 'dao',
      menuName: 'WONDER DAO - Station',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.2', { dao: 'WONDER DAO' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      menuName: 'WONDER DAO - Governance',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.3', { nickname: 'bymyselft', proposal: 'Discussion' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      menuName: 'WONDER DAO - Governance',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.4', { nickname: 'bymyselft', num: 'N', proposal: 'Discussion' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      menuName: 'WONDER DAO - Governance',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.5'),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      menuName: 'WONDER DAO - Governance',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.6'),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      menuName: 'WONDER DAO - Governance',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.7', { dao: 'WEMIX.Fi DAO' }),
      noticeTime: '20minutes ago',
      detailContents: {
        title: t('header.notification.dao.8', { dao: 'WEMIX.Fi DAO' }),
        desc: '2022-09-01 11:00 ~ 2022-09-30 11:00',
      },
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      menuName: 'WONDER DAO - Governance',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.7-2', { dao: 'WEMIX.Fi DAO' }),
      noticeTime: '20minutes ago',
      detailContents: {
        title: t('header.notification.dao.8', { dao: 'WEMIX.Fi DAO' }),
        desc: '2022-09-01 11:00 ~ 2022-09-30 11:00',
      },
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      /* 23.02.20 수정: 메뉴명 변경 */
      menuName: 'WONDER DAO - Obelisk',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.9', { num: '1.0000', daoToken: 'g.WDR' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      /* 23.02.20 수정: 메뉴명 변경 */
      menuName: 'WONDER DAO',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.10', { num: '1,000.0000', governanceToken: 'WDR' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'dao',
      /* 23.02.20 수정: 메뉴명 변경 */
      menuName: 'WONDER DAO - Obelisk',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.dao.11', { name: '결의안명' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'life',
      menuName: 'Life',
      imgUrl: '/temp/@temp_alarm_LUS.png',
      imgType: 'circle',
      desc: t('header.notification.life.1', { project: 'London Underground Station(LUS) 264 Genesis' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'life',
      menuName: 'Life',
      imgUrl: '/temp/@temp_alarm_Sights_of_Nile.png',
      imgType: 'circle',
      desc: t('header.notification.life.1', { project: 'Sights of NILE(SON)' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'life',
      menuName: 'Life',
      imgUrl: '/temp/@temp_alarm_Tangled.png',
      imgType: 'circle',
      desc: t('header.notification.life.1', { project: 'Tangled' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'life',
      menuName: 'Life',
      imgUrl: '/temp/@temp_alarm_SNKRZ.png',
      imgType: 'circle',
      desc: t('header.notification.life.1', { project: 'SNKRZ' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
    {
      type: 'community',
      menuName: 'Community',
      imgUrl: '/temp/@temp_dao_2.png',
      imgType: 'circle',
      desc: t('header.notification.community.1', { community: 'WONDER DAO Papyrus' }),
      noticeTime: '20minutes ago',
      link: '/',
      newNotice: false,
      majorNotice: false,
    },
  ];

  const clearEvent = () => {
    console.log('삭제');
  };

  let filterEl = [];
  const filterList = () => {
    filterEl = notificationList.filter((item) => {
      if (nowTab === 'all') {
        return true;
      } else {
        return nowTab === item.type;
      }
    });

    return listCount === 0 ? (
      <div className={cn('notification-empty')}>{t('header.notification.noMessage')}</div>
    ) : (
      <>
        <ul>
          {filterEl.map((item, index) => {
            return (
              <li className={cn('notification-item', item.newNotice && 'active', item.newNotice && item.majorNotice && 'major')} key={index}>
                <Link href={{ pathname: item.link }} passHref>
                  <a onClick={clickEvent}>
                    <div className={cn('img-block', item.imgType)}>
                      <Image src={item.imgUrl} alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
                    </div>
                    <div className={cn('text-block')}>
                      <p className={cn('default-desc')}>{item.desc}</p>
                      {(item.detailContents || item.doaGenerationContents) && (
                        <div className={cn('detail-wrap')}>
                          {item.doaGenerationContents ? (
                            <dl>
                              <div>
                                <dt>{t('header.notification.finalExchangeRate')}</dt>
                                <dd>{item.doaGenerationContents.ratio}</dd>
                              </div>
                              <div>
                                <dt>{t('header.notification.acquiredWonder')}</dt>
                                <dd>
                                  {item.doaGenerationContents.achieve} <span className={cn('unit')}>{item.doaGenerationContents.achieveUnit}</span>
                                </dd>
                              </div>
                            </dl>
                          ) : (
                            <>
                              <p className={cn('detail-title')}>{item.detailContents?.title}</p>
                              <p className={cn('detail-desc')}>{item.detailContents?.desc}</p>
                            </>
                          )}
                        </div>
                      )}
                      <div className={cn('times-wrap')}>
                        {(item.type === 'dao' || nowTab === 'all') && <div className={cn('menu')}>{item.menuName}</div>}
                        <div className={cn('time')}>{item.noticeTime}</div>
                      </div>
                    </div>
                  </a>
                </Link>
                <button
                  type="button"
                  className={cn('btn-clear')}
                  onClick={() => {
                    clearEvent();
                  }}
                >
                  <span className={cn('a11y')}>{t('header.notification.deleteNotification')}</span>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />
                </button>
              </li>
            );
          })}
        </ul>
        <InfiniteLoader size="md" />
      </>
    );
  };

  useEffect(() => {
    setListCount(filterEl.length);
  });
  return (
    <>
      <div className={cn('notification-top')}>
        <RadioTab btnList={notificationBtnList} nowTab={nowTab} setNowTab={setNowTab} chipSize="md" strong />
      </div>
      <div className={cn('notification-body')}>
        {filterList()}
        {/* <InfiniteLoader size="md" /> */}
      </div>
      <div className={cn('notification-bottom')}>
        <div className={cn('btn-wrap')}>
          <button type="button" disabled={listCount === 0}>
            {t('header.notification.allRead')}
          </button>
          <button type="button" disabled={listCount === 0} onClick={() => setIsPopupOpen(true)}>
            {t('header.notification.allDelete')}
          </button>
        </div>
        <Link href={{ pathname: '/notification' }} passHref>
          <a className={cn('link-setting')} onClick={clickEvent}>
            {t('header.notification.setNotification')}
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_notification_setting.svg" />
          </a>
        </Link>
      </div>
      <ModalLayout
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        size="sm"
        title={t('header.notification.confirmDeleteNotification')}
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
            buttonText={t('header.notification.confirmDeleteButton')}
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              setIsPopupOpen(false);
            }}
          />,
        ]}
      >
        <p>{t('header.notification.confirmDeleteMessage')}</p>
      </ModalLayout>
    </>
  );
};

export default HeaderNotification;
