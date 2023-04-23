/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
import cn from 'classnames';
import 'swiper/css/effect-fade';
import { useTranslation } from 'next-i18next';

import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

import { ReactSVG } from 'react-svg';
import { IconLogo } from '@/components/logo/IconLogo';
import { DaoTheme } from '@/state/daoAtom';

import useMediaQuery from '@/hook/useMediaQuery';

const DaoHomeLottie = () => {
  const { t } = useTranslation('daoHome');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const activeDao: string = useAtomValue(daoThemeAtom).value;

  useEffect(() => {
    window.scrollTo(0, 0);
    // iOS 대응 코드
    const saveInitVh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--initVh', `${saveInitVh}px`);
  }, []);

  interface membershipTokensDatas {
    [index: string]: membershipDatasTokensProps[];
    wonder: membershipDatasTokensProps[];
    arteum: membershipDatasTokensProps[];
    delta: membershipDatasTokensProps[];
    oracle: membershipDatasTokensProps[];
  }

  interface membershipDatasTokensProps {
    type: string;
    cate: string;
    name: string;
    ticker: string;
    descript?: string;
    feature?: string[];
  }

  const membershipTokensDatas: membershipTokensDatas = {
    wonder: [
      {
        type: 'wonder',
        cate: t(`membership.wonder.token1.cate`),
        name: t(`membership.wonder.token1.name`),
        ticker: t(`membership.wonder.token1.ticker`),
        descript: t(`membership.wonder.token1.descript`),
        feature: [t(`membership.wonder.token1.feature.p1`), t(`membership.wonder.token1.feature.p2`)],
      },
      {
        type: 'g.wonder',
        cate: t(`membership.wonder.token2.cate`),
        name: t(`membership.wonder.token2.name`),
        ticker: t(`membership.wonder.token2.ticker`),
        descript: t(`membership.wonder.token2.descript`),
        feature: [t(`membership.wonder.token2.feature.p1`), t(`membership.wonder.token2.feature.p2`)],
      },
    ],
    arteum: [
      {
        type: 'arteum',
        cate: t(`membership.arteum.token1.cate`),
        name: t(`membership.arteum.token1.name`),
        ticker: t(`membership.arteum.token1.ticker`),
        descript: t(`membership.arteum.token1.descript`),
        feature: [t(`membership.arteum.token1.feature.p1`), t(`membership.arteum.token1.feature.p2`)],
      },
      {
        type: 'g.arteum',
        cate: t(`membership.arteum.token2.cate`),
        name: t(`membership.arteum.token2.name`),
        ticker: t(`membership.arteum.token2.ticker`),
        descript: t(`membership.arteum.token2.descript`),
        feature: [t(`membership.arteum.token2.feature.p1`), t(`membership.arteum.token2.feature.p2`)],
      },
    ],
    delta: [
      {
        type: 'delta',
        cate: t(`membership.delta.token1.cate`),
        name: t(`membership.delta.token1.name`),
        ticker: t(`membership.delta.token1.ticker`),
        descript: t(`membership.delta.token1.descript`),
      },
      {
        type: 'g.delta',
        cate: t(`membership.delta.token2.cate`),
        name: t(`membership.delta.token2.name`),
        ticker: t(`membership.delta.token2.ticker`),
        descript: t(`membership.delta.token2.descript`),
      },
    ],
    oracle: [
      {
        type: 'zero',
        cate: t(`membership.oracle.token1.cate`),
        name: t(`membership.oracle.token1.name`),
        ticker: t(`membership.oracle.token1.ticker`),
        descript: t(`membership.oracle.token1.descript`),
      },
    ],
  };

  return (
    <>
      <div className={cn('dao-section', 'dao-trust-membership-wrap')}>
        <div className={cn('dao-trust-membership-inner')}>
          <div className={cn('dao-trust')}>
            <h2 className={cn('title-wrap')}>{t(`trust.title`)}</h2>
            <div className={cn('descript-wrap')}>
              <p className={cn('text')}>{t(`trust.${activeDao}.text`)}</p>
              <p className={cn('descript')}>{t(`trust.${activeDao}.descript`)}</p>
              <div className={cn('dao-graphic', `dao-${activeDao}-graphic`)}></div>
            </div>
          </div>
          <div className={cn('dao-membership')}>
            <h2 className={cn('title-wrap')}>{t(`membership.title`)}</h2>
            <div className={cn('descript-wrap')}>
              <p className={cn('text')}>{t(`membership.${activeDao}.text`)}</p>
              <div className={cn('dao-tokens')}>
                {membershipTokensDatas[activeDao].map((v: membershipDatasTokensProps, index: number) => {
                  return (
                    <div className={cn('dao-tokens-inner')} key={`token-${index}`}>
                      <div className={cn('icon')}>
                        <IconLogo type={v.type} size={isMobile ? 40 : 60} fullType />
                      </div>
                      <span className={cn('cate')}>{v.cate}</span>
                      <strong className={cn('name')}>
                        {v.name}
                        <span className={cn('tiker')}>(Ticker: {v.ticker})</span>
                      </strong>
                      {v.descript ? <p className={cn('desc')}>{v.descript}</p> : null}
                      {v.feature ? (
                        <ul className={cn('features')}>
                          {v.feature.map((p: any, index: number) => {
                            return <li key={`features-${index}`}>{p}</li>;
                          })}
                        </ul>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaoHomeLottie;
