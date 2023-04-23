import cn from 'classnames';

import OutlineButton from '@/components/button/OutlineButton';
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
            <a
              href={linkList[activeDaoValue].telegram}
              className={cn('btn-link', 'telegram')}
              target="_blink"
              title={t('blank', { ns: 'daoHome', keyPrefix: 'social' })}
            >
              <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_telegram2.svg" />
              <div className={cn('tooltip-wrap')}>{t('btn1', { ns: 'daoHome', keyPrefix: 'social' })}</div>
            </a>
            {/* 파피루스 서비스 개발 전 */}
            <button
              type="button"
              className={cn('btn-link', 'papyrus')}
              onClick={() => message.info({ content: t('prepareService', { ns: 'daoHome', keyPrefix: 'social' }), key: 'toast' })}
            >
              <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_papyrus2.svg" />
              <div className={cn('tooltip-wrap')}>{t('btn2', { ns: 'daoHome', keyPrefix: 'social' })}</div>
            </button>
            {/* 파피루스 서비스 개발 후 외부 링크 연결 */}
            {/* <a
              href={linkList[activeDaoValue].papyrus}
              className={cn('btn-link', 'papyrus')}
              target="_blink"
              title={t('blank', { ns: 'daoHome', keyPrefix: 'social' })}
            >
              <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_papyrus2.svg" />
              <div className={cn('tooltip-wrap')}>{t('btn2', { ns: 'daoHome', keyPrefix: 'social' })}</div>
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
