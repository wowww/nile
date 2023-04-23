import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { message } from 'antd';
import Link from 'next/link';

type DaoType = 'wonder' | 'arteum' | 'delta' | 'oracle';

const DaoHomeSocial = () => {
  const [activeDaoValue, setActiveDaoValue] = useState('wonder');
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);

  const { t } = useTranslation('daoHome', { keyPrefix: `social.${activeDaoValue}` });

  const commentList = [t('list.0'), t('list.1'), t('list.2'), t('list.3'), t('list.4')];
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
      /* 23.02.14 수정: 텔레그램 링크 수정 */
      // discord: 'https://discord.com/channels/1083269128053346316/1084727536933675120',
      discord: 'https://discord.com/invite/78wzkvrsbj',
      papyrus: '',
    },
  };

  useEffect(() => {
    setActiveDaoValue(activeDao.value);
  }, [activeDao.value]);

  return (
    <div className={cn('dao-home-social-wrap')}>
      <div className={cn('social-inner-wrap')}>
        <div className={cn('title-wrap')}>
          <h2 className={cn('title')}>{t('title', { ns: 'daoHome', keyPrefix: 'social', type: activeDaoValue.toLocaleUpperCase() })}</h2>
          <p className={cn('desc')}>{t('desc', { ns: 'daoHome', keyPrefix: 'social' })}</p>

          <div className={cn('btn-social-wrap', 'btn-wrap')}>
            {/* 외부 링크 연결 */}
            <Link href={linkList[activeDaoValue].discord} passHref>
              <a className={cn('btn-link', 'discord')} target="_blink" title={t('blank', { ns: 'daoHome', keyPrefix: 'social' })}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_discord_color.svg" />
                {/* 23.02.14 수정: 서비스 텍스트 추가 및 툴팁 삭제 */}
                <span className={cn('text')}>{t('btn1', { ns: 'daoHome', keyPrefix: 'social' })}</span>
              </a>
            </Link>
            {/* 파피루스 서비스 개발 전 */}
            <button
              type="button"
              className={cn('btn-link', 'papyrus')}
              onClick={() => message.info({ content: t('prepareService', { ns: 'daoHome', keyPrefix: 'social' }), key: 'toast' })}
            >
              <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_papyrus2.svg" />
              {/* 23.02.14 수정: 서비스 텍스트 추가 및 툴팁 삭제 */}
              <span className={cn('text')}>{t('btn2', { ns: 'daoHome', keyPrefix: 'social' })}</span>
            </button>
            {/* 파피루스 서비스 개발 후 외부 링크 연결 */}
            {/* <a
              href={linkList[activeDaoValue].papyrus}
              className={cn('btn-link', 'papyrus')}
              target="_blink"
              title={t('blank', { ns: 'daoHome', keyPrefix: 'social' })}
            >
              <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_papyrus2.svg" />
              // 23.02.14 수정: 서비스 텍스트 추가 및 툴팁 삭제
              <span className={cn('text')}>{t('btn2', { ns: 'daoHome', keyPrefix: 'social' })}</span>
            </a> */}
          </div>
        </div>
        <div className={cn('content-wrap')}>
          <ul className={cn('comment-list-wrap')}>
            {commentList.map((item, index) => {
              return (
                <li key={`comment-list${index}`} className={cn(`list-item${index + 1}`)}>
                  {item}
                </li>
              );
            })}
          </ul>
          <div className={cn('image-wrap')} aria-hidden={true}>
            <span className={cn('image', 'people1')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_social_people1.svg" />
            </span>
            <span className={cn('image', 'people2')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_social_people2.svg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaoHomeSocial;
