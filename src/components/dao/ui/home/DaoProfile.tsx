import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Tag from '@/components/tag/Tag';
import RecruitmentCard from '@components/dao/ui/home/RecruitmentCard';
import { ReactSVG } from 'react-svg';
import { message } from 'antd';
/* 23.03.31 수정: useDaoCharacterConvert 추가 */
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useWonder } from '@/hook/useWonder';

const DaoProfile = () => {
  const { t } = useTranslation('daoHome');
  const { i18n } = useTranslation('ko');

  const linkList: Record<
    string,
    {
      telegram: string;
      papyrus: string;
    }
  > = {
    wonder: {
      telegram: 'https://t.me/WONDER_DAO',
      papyrus: '',
    },
    arteum: {
      telegram: 'https://t.me/ARTEUM_DAO',
      papyrus: '',
    },
    delta: {
      telegram: 'https://t.me/DELTA_DAO',
      papyrus: '',
    },
    oracle: {
      /* 23.02.14 수정: 텔레그램 링크 수정 */
      telegram: 'https://t.me/ORACLE_DAO',
      papyrus: '',
    },
  };

  const { wonderDao } = useWonder();

  const dummyData: {
    [key: string]: any;
  } = {
    wonder: {
      /* 23.03.31 수정: 각 케이스별 데이터 추가 */
      // 1. 모집 전 - (일자 확정/시간 미정)
      // desc: i18n.language === 'ko' ? '2023년 4월 13일' : '2023-04-13',
      subContent: t('recruitmentCard.notice', { ns: 'common' }) /* 23.04.11 수정: subContent: true 추가 */,
      // mainContent: '19345',
      buttons: [{ btnName: t('goToBtn', { ns: 'common', name: 'Station' }), href: '/dao/wonder/station' }],
      // 2. 모집 전 - (일자 확정/시간 확정)
      isTime: true,
      subTitle: '시작',
      startAt: wonderDao?.startAt,
      endAt: wonderDao?.endAt,
      mainContent: '19345',
      // 3. 모집 중
      // isTime: true,
      // subTitle: '종료',
      // startAt: wonderDao?.startAt,
      // endAt: wonderDao?.endAt,
      // reward: {
      //   percent: 0,
      //   firstData: 18500000,
      //   secondData: 1700010,
      //   people: 100,
      // },
      // 4. 모집 완료
      // completeTitle: '13,459,656',
      // reward: {
      //   percent: 0,
      //   firstData: 8500000,
      //   secondData: 1700010,
      //   people: 100,
      // },
      // buttons: [
      //   { btnName: t('goToBtn', { ns: 'common', name: 'WEMIX.Fi' }), href: 'https://wemix.fi' },
      //   { btnName: t('goToBtn', { ns: 'common', name: `${useDaoCharacterConvert(activeDao.value)}` }), href: '/dao/station' },
      // ],
      // 5. 모집 실패 - (신규 케이스)
      // fail: true,
      // reward: {
      //   percent: 0,
      //   firstData: 18500000,
      //   secondData: 1700010,
      //   people: 100,
      // },
      // buttons: [{ btnName: t('goToBtn', { ns: 'common', name: 'Station' }), href: '/dao/wonder/station' }],
      className: 'dao-showcase',
    },
    arteum: {
      subTitle: '시작',
      date: '2023-02-12 11:00 ~ 2023-02-15 11:00',
      isTime: true,
      mainContent: '19345',
      className: 'dao-showcase',
      theme: 'arteum',
      buttons: [{ btnName: 'Station Opens Soon', disabled: true }],
    },
    delta: {
      subTitle: '종료',
      date: '2023-02-15 11:00 ~ 2023-02-15 11:00',
      isTime: true,
      reward: { fistData: '1,350,000', secondData: '1,500,010', percent: 50, people: 128 },
      className: 'dao-showcase',
      theme: 'delta',
      buttons: [{ btnName: 'Station 바로가기', href: '/' }],
    },
    oracle: {
      completeTitle: '13,459,656',
      className: 'dao-showcase',
      theme: 'oracle',
      buttons: [{ btnName: 'WEMIX.Fi 바로가기' }, { btnName: 'Station 바로가기' }],
    },
  };

  /**
   * wonder
   * arteum
   * delta
   * oracle
   */
  const daoTheme = useAtomValue(daoThemeAtom).value;

  const tagList = t(`profile.${daoTheme}.tag`, { returnObjects: true });

  /* 23.04.11 수정: linkFunction 추가 */
  const linkFunction = (e: any, href: string | undefined) => {
    e.stopPropagation();
    window.open(href);
  };

  return (
    <div className={cn('dao-profile-section')}>
      <div className={cn('profile-section-title')}>
        <h2>
          {/* WONDER DAO */}
          {t(`profile.${daoTheme}.title`)}
          <p>
            {/* The First, The Wonder of Wonders */}
            {t(`profile.${daoTheme}.subTitle`)}
          </p>
        </h2>
      </div>

      <div className={cn('profile-section-card')}>
        <div className={cn('profile-section-cont', daoTheme)}>
          <div className={cn('wrap-tag')}>
            {Object.keys(tagList).map((v, i) => {
              return (
                <Tag type="primary" size="md-m" key={i}>
                  {t(`profile.${daoTheme}.tag.${v}`)}
                </Tag>
              );
            })}
            {/*  */}
          </div>

          <div className={cn('wrap-text')}>
            <p className={cn('title')}>
              {/* WEMIX3.0 메인넷 거버넌스에 참여하기 위해 모인 40개의 노드 중 첫번째 노드를 담당하는 커뮤니티입니다. */}
              {t(`profile.${daoTheme}.cont.title`)}
            </p>
            <p className={cn('desc')}>
              {/* WEMIX 생태계의 발전과 성장에 기여함으로써 DAO는 PMR*을 수취하고 이를 통해 지속적으로 DAO의 공동
              성장을 추구합니다. */}
              {t(`profile.${daoTheme}.cont.desc`)}
              <span className={cn('footnote')}>
                {/* * Permanent Minting Reward */}
                {t(`profile.${daoTheme}.cont.footnote`)}
              </span>
            </p>
          </div>

          {/* 23.04.11 수정 start: 하단 버튼 영역 추가 & 수정 */}
          <div className={cn('btn-wrap link-wrap btn-social-wrap')}>
            {/* 외부 링크 연결 */}
            <span className={cn('wrap-whitepaper')}>
              {/* <a href="" target="_blank" rel="noopener noreferrer" className={cn('btn-link', 'whitepaper')}>
                Whitepaper
              </a> */}
              <button
                className={cn('btn-link', 'whitepaper')}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  message.info({ content: t('prepareService2', { ns: 'common' }), key: 'toast' });
                }}
              >
                Whitepaper
              </button>
            </span>
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
              <span className={cn('text')}>PAPYRUS</span>
            </a> */}
          </div>
          {/* 23.04.11 수정 end: 하단 버튼 영역 추가 & 수정 */}
        </div>
        <div className={cn('profile-section-countdown')}>
          <RecruitmentCard {...dummyData[daoTheme]} theme={daoTheme} />
        </div>
      </div>
    </div>
  );
};

export { DaoProfile };
