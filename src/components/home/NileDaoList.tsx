import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import Tag from '@/components/tag/Tag';
import RecruitmentReward from '@/components/chart/RecruitmentReward';
import { ReactNode } from 'react';
import { message } from 'antd';
import ContentTitle from '@/components/marketplace/ContentTitle';
import { daoThemeAtom } from '@/state/daoAtom';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';

interface themeData {
  theme: string;
  complete?: boolean;
  completeValue?: string;
  tagName?: string;
  telegramLink?: string;
  papyrusLink?: string;
  fiLink?: string;
  participants?: number;
}

interface Props {
  themeData: themeData[];
  recruitment: ReactNode;
}

const NileDaoList = ({ themeData, recruitment }: Props) => {
  const { t } = useTranslation(['nile', 'common']);
  const setActiveDao = useSetAtom(daoThemeAtom);
  const router = useRouter();

  const linkFunction = (e: any, href: string | undefined) => {
    e.stopPropagation();
    window.open(href);
  };

  return (
    <div className={cn('nile-dao-section')}>
      {/* 23.02.15 수정: 문구 수정 (LineUp -> List) */}
      <ContentTitle title="DAO List" href="/dao" serif />
      <div className={cn('nile-dao-list')}>
        <div className={cn('list-top-item', themeData[0].theme)}>
          <div
            className={cn('dao-list-cont')}
            onClick={(e) => {
              e.preventDefault();
              setActiveDao({ value: themeData[0].theme });
              router.push('/dao');
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className={cn('wrap-text')}>
              <p className={cn('title')}>{themeData[0].theme.toUpperCase()} DAO</p>
              {/* 23.04.11 수정: 주석 해제 */}
              <p className={cn('desc')}> {t(`home.hero.showcase.desc.${themeData[0].theme}`)}</p>
            </div>
            <div className={cn('link-wrap btn-social-wrap')}>
              {/* 외부 링크 연결 */}
              {/* 23.02.14 수정: 이벤트 버블링 방지 */}
              <a onClick={(e) => linkFunction(e, 'https://discord.com/invite/78wzkvrsbj')} className={cn('btn-link', 'discord')} target="_blink">
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_discord_color.svg" />
                {/* 23.02.14 수정: 서비스 텍스트 추가 및 툴팁 삭제 */}
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
                {/* 23.02.14 수정: 서비스 텍스트 추가 및 툴팁 삭제 */}
                <span className={cn('text')}>PAPYRUS</span>
              </button>
              {/* 파피루스 서비스 개발 후 외부 링크 연결 */}
              {/* 23.02.14 수정: 이벤트 버블링 방지 */}
              {/* <a onClick={(e) => linkFunction(e, '')} className={cn('btn-link', 'papyrus')} target="_blink">
              <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_papyrus2.svg" />
              // 23.02.14 수정: 서비스 텍스트 추가 및 툴팁 삭제
              <span className={cn('text')}>Papyrus</span>
            </a> */}
            </div>
            <div className={cn('bookmark-bg')}>
              <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/dao_badge/ico_${themeData[0].theme}_badge_lg.svg`} />
            </div>
          </div>

          <div className={cn('list-recruitment')}>{recruitment}</div>
        </div>
        <div className={cn('list-bottom-wrap')}>
          {themeData.map((item, index) => {
            return (
              index > 0 && (
                <div
                  className={cn('list-bottom-item', item.theme, item.complete && 'complete')}
                  key={index}
                  onClick={() => {
                    setActiveDao({ value: item.theme });
                    router.push('/dao');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={cn('wrap-text')}>
                    <p className={cn('title')}>{item.theme.toUpperCase()} DAO</p>
                    <p className={cn('desc')}>{t(`home.hero.showcase.desc.${item.theme}`)}</p>

                    {item.complete && (
                      <p className={cn('cont')}>
                        {item.completeValue} {t('daoListUnit')}
                      </p>
                    )}
                    {item.complete && <RecruitmentReward complete={true} />}
                    <Tag size="xs">{item.complete ? `${item.participants}명 참여중` : item.tagName}</Tag>
                  </div>
                  <div className={cn('bookmark-bg')}>
                    <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/dao_badge/ico_${item.theme}_badge_lg.svg`} />
                  </div>
                  <div className={cn('link-wrap', 'btn-social-wrap')}>
                    {/* 23.02.14 수정: 이벤트 버블링 방지 */}
                    <a onClick={(e) => linkFunction(e, item.telegramLink)} className={cn('btn-link', 'discord')} target="_blink">
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_discord_color.svg" />
                      <div className={cn('tooltip-wrap')}>Discord</div>
                    </a>
                    <button
                      type="button"
                      className={cn('btn-link', 'papyrus')}
                      onClick={(e) => {
                        e.stopPropagation();
                        message.info({ content: t('prepareService', { ns: 'common' }), key: 'toast' });
                      }}
                    >
                      <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_papyrus2.svg" />
                      {/* 23.04.13 수정: PAPYRUS 대문자로 표기 수정 */}
                      <div className={cn('tooltip-wrap')}>PAPYRUS</div>
                    </button>
                    {/* 파피루스 서비스 개발 후 외부 링크 연결 */}
                    {/* 23.02.14 수정: 이벤트 버블링 방지 */}
                    {/* 23.04.13 수정: PAPYRUS 대문자로 표기 수정 */}
                    {/* <a onClick={(e) => linkFunction(e, item.papyrus)} className={cn('btn-link', 'papyrus')} target="_blink">
                      <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_papyrus2.svg" />
                      <div className={cn('tooltip-wrap')}>PAPYRUS</div>
                    </a> */}
                    {item.complete && (
                      /* 23.02.14 수정:  23.02.14 수정: 이벤트 버블링 방지  */
                      <a onClick={(e) => linkFunction(e, item.fiLink)} className={cn('btn-link', 'wemixfi-icon')}>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_wemixfi.svg" />
                        <div className={cn('tooltip-wrap')}>WEMIX.Fi</div>
                      </a>
                    )}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NileDaoList;
