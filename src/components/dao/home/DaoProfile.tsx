import { daoThemeAtom, showDaoBottomPopup } from '@/state/daoAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Tag from '@/components/tag/Tag';
import DaoShowCaseRecruitCard from '@components/dao/home/DaoShowCaseRecruitCard';
import { ReactSVG } from 'react-svg';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { NileApiService } from '@/services/nile/api';
import { useWonder } from '@/hook/useWonder';
import IconInfo from '@images/icon/ico_info.svg';
import DaoBottomPopup from './DaoBottomPopup';
import ModalLayout from '@/components/modal/ModalLayout';
import ShareButton from '@/components/button/ShareButton';
import { useAtom } from 'jotai';
import useMediaQuery from '@/hook/useMediaQuery';

const DaoProfile = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { t } = useTranslation('daoHome');
  const { i18n } = useTranslation('ko');
  {
    /* 23.04.18 수정: useMediaQuery 추가 */
  }
  const isTablet = useMediaQuery('(max-width: 1279px)');
  const api = NileApiService();

  /**
   * wonder
   * arteum
   * delta
   * oracle
   */
  const { wonderDao, wonderStations, wonderStationRealTimeInfo, refreshWonderDao, refreshWonderStations, refreshWonderStationRealTimeInfo } =
    useWonder();
  const daoTheme = useAtomValue(daoThemeAtom).value;

  const tagList = t(`profile.${daoTheme}.tag`, { returnObjects: true });

  const [pageViewInfo, setPageViewInfo] = useState<any>();

  useEffect(() => {
    api.dao.stat.fetchViewCount(`/dao/${daoTheme}`).then(({ data }) => {
      setPageViewInfo(data.data);
    });
  }, [daoTheme]);

  useEffect(() => {
    if (!wonderDao) {
      refreshWonderDao();
    }
  }, []);

  useEffect(() => {
    if (wonderDao?.daoId) {
      if (!wonderStations) {
        refreshWonderStations();
      }
      if (!wonderStationRealTimeInfo) {
        refreshWonderStationRealTimeInfo();
      }
    }
  }, [wonderDao]);

  const linkList: Record<
    string,
    {
      discord: string;
      papyrus: string;
    }
  > = {
    wonder: {
      // discord: 'https://discord.com/channels/1083269128053346316/1084726657975324782',
      discord: 'https://discord.com/invite/78wzkvrsbj',
      papyrus: '',
    },
    arteum: {
      // discord: 'https://discord.com/channels/1083269128053346316/1084727003137179708',
      discord: 'https://discord.com/invite/78wzkvrsbj',
      papyrus: '',
    },
    delta: {
      // discord: 'https://discord.com/channels/1083269128053346316/1084727268284313630',
      discord: 'https://discord.com/invite/78wzkvrsbj',
      papyrus: '',
    },
    oracle: {
      // discord: 'https://discord.com/channels/1083269128053346316/1084727536933675120',
      discord: 'https://discord.com/invite/78wzkvrsbj',
      papyrus: '',
    },
  };

  const daoList: {
    [key: string]: any;
  } = {
    wonder: {
      dao: wonderDao,
      station: wonderStations?.at(0),
      stationRealTimeInfo: wonderStationRealTimeInfo,
    },
    arteum: {},
    delta: {},
    oracle: {},
  };

  /* 23.04.11 수정: linkFunction 추가 */
  const linkFunction = (e: any, href: string | undefined) => {
    e.stopPropagation();
    window.open(href);
  };

  const [isModalService, setModalService] = useState(false);
  const [isModalServiceAgree, setModalServiceAgree] = useState(false);

  return (
    <div className={cn('dao-profile-section')}>
      <div className={cn('profile-section-title')}>
        <h2>
          {t(`profile.${daoTheme}.title`)}
          <p>{t(`profile.${daoTheme}.subTitle`)}</p>
        </h2>
      </div>
      <div className={cn('profile-section-card')}>
        <div className={cn('profile-section-cont', daoTheme)}>
          <div className={cn('wrap')}>
            <div className={cn('wrap-tag')}>
              {Object.keys(tagList).map((v, i) => {
                return (
                  <Tag type="primary" size="md-m" key={i}>
                    {t(`profile.${daoTheme}.tag.${v}`)}
                  </Tag>
                );
              })}
            </div>
            <div className={cn('wrap-text')}>
              <p className={cn('title')}>{t(`profile.${daoTheme}.cont.title`)}</p>
              {/* 23.04.19 수정 start: 레이아웃 변경으로 분기 처리 */}
              {isMobile && (
                <button
                  className={cn('tooltip')}
                  type="button"
                  onClick={() => {
                    setModalService(true);
                  }}
                >
                  <span className={cn('a11y')}>tooltip</span>
                  <IconInfo />
                </button>
              )}
              {!isMobile && (
                <p className={cn('desc')}>
                  {t(`profile.${daoTheme}.cont.desc`)}
                  <span className={cn('footnote')}>{t(`profile.${daoTheme}.cont.footnote`)}</span>
                </p>
              )}
              {/* 23.04.19 수정 end: 레이아웃 변경으로 분기 처리 */}
            </div>

            {/* 23.04.11 수정 start: 하단 버튼 영역 추가 & 수정 */}

            <div className={cn('btn-wrap link-wrap btn-social-wrap')}>
              {/* 외부 링크 연결 */}
              {daoTheme === 'wonder' && (
                <span className={cn('wrap-whitepaper')}>
                  <a
                    href={`https://wonder-dao.gitbook.io/whitepaper-${i18n.language === 'en' ? 'en' : 'kr'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn('btn-link', 'whitepaper')}
                  >
                    Whitepaper
                  </a>
                </span>
              )}
              <a onClick={(e) => linkFunction(e, 'https://discord.com/invite/78wzkvrsbj')} className={cn('btn-link', 'discord')} target="_blink">
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_discord_color.svg" />
                <span className={cn('text')}>Discord</span>
              </a>
              {/* 파피루스 서비스 개발 전 */}
              <button
                type="button"
                className={cn('btn-link', 'papyrus')}
                onClick={(e) => {
                  e.stopPropagation();
                  message.info({ content: t('prepareService', { ns: 'common' }), key: 'toast' });
                }}
              >
                <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_papyrus2.svg" />
                <span className={cn('text')}>PAPYRUS</span>
              </button>
              {/* 파피루스 서비스 개발 후 외부 링크 연결 */}
              {/* <a onClick={(e) => linkFunction(e, '')} className={cn('btn-link', 'papyrus')} target="_blink">
              <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_papyrus2.svg" />
              <span className={cn('text')}>Papyrus</span>
            </a> */}
            </div>
          </div>
        </div>
        <div className={cn('profile-section-countdown')}>
          <DaoShowCaseRecruitCard {...daoList[daoTheme]} refresh={refreshWonderDao} />
        </div>
      </div>
      {/* 23.04.19 수정: DaoBottomPopup 팝업 추가 */}
      {isMobile && <DaoBottomPopup isOpen={isModalService} setIsOpen={setModalService} />}

      {/* 23.04.18 수정: 디자인 수정 - 위치 변경 */}
      <ul className={cn('icon-btns')}>
        <li>
          <ReactSVG src=" https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg" />
          <span className={cn('number')}>{Number(pageViewInfo?.count).toLocaleString('ko-KR')}</span>
        </li>
        <li>
          <ShareButton placement={isTablet ? 'bottomLeft' : 'bottomRight'} telegram={true} facebook={true} />
          <span className={cn('number')}>Share</span>
        </li>
      </ul>
    </div>
  );
};

export default DaoProfile;
