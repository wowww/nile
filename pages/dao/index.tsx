import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import DaoHomeType from '@/components/dao/home/DaoHomeType';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Footer } from '@components';
import { ReactSVG } from 'react-svg';
import { useAtom, useAtomValue } from 'jotai';
import { daoHomeProtocolLottiePlay, daoThemeAtom, showDaoBottomPopup } from '@/state/daoAtom';
import DaoHomeLineup from '@/components/dao/home/DaoHomeLineup';
import DaoHomeCoreValue from '@/components/dao/home/DaoHomeCoreValue';
import { throttle } from 'lodash';
import useWindowScroll from '@/hook/useWindowScroll';
import DaoHomeGovernance from '@/components/dao/home/DaoHomeGovernance';
import DaoProfile from '@/components/dao/home/DaoProfile';
import DaoHomeTrustMembership from '@/components/dao/home/DaoHomeTrustMembership';
import DaoHomeVideoArea from '@/components/dao/home/DaoHomeVideoArea';
import DaoHomeProtocol from '@/components/dao/home/DaoHomeProtocol';
import DaoWondersMember from '@/components/dao/home/DaoWondersMember';
import DaoHomeSocial from '@/components/dao/home/DaoHomeSocial';
import DaoPurpose from '@/components/dao/home/DaoPurpose';
import { DaoMarquee } from '@/components/dao/home/DaoMarquee';
import { useSetAtom } from 'jotai';
import { NileApiService } from '@/services/nile/api';
import useMediaQuery from '@/hook/useMediaQuery';
import DaoBottomPopup from '@/components/dao/home/DaoBottomPopup';

const Dao = () => {
  const activeDao = useAtomValue(daoThemeAtom);
  const homeProtocolLottiePlay = useAtomValue(daoHomeProtocolLottiePlay);
  const isTablet = useMediaQuery('(max-width: 1279px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const scroll = useWindowScroll();
  const documentRef = useRef<Document>();

  const setHomeProtocolLottiePlay = useSetAtom(daoHomeProtocolLottiePlay);

  // const [swiperMousewheel, setSwiperMousewheel] = useState<boolean>(false);
  const [sectionTopPageY, setSectionTopPageY] = useState<number>(0);
  const [hide, setHide] = useState(false);
  const [isHeaderTop, setIsHeaderTop] = useState(true);
  const [scrollBtn, setScrollBtn] = useState<'scroll' | 'top' | 'bottom'>('scroll');
  const [footerOffset, setFooterOffset] = useState(0);
  const [daoProtocolLottieOffset, setDaoProtocolLottieOffset] = useState(0);

  const daoLineupRef = useRef<any>(null);
  const daoProtocolLottieRef = useRef<HTMLDivElement>(null);
  const daoTypeRef = useRef<HTMLDivElement>(null);
  const daoFooterRef = useRef<HTMLDivElement>(null);

  const { dao } = NileApiService();

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const { pageYOffset } = window;
        const deltaY = pageYOffset - sectionTopPageY;
        const daoLineupStickyHeight = (daoLineupRef && daoLineupRef.current.offsetHeight) || 155;
        const daoProtocolOffset = daoProtocolLottieOffset - daoLineupStickyHeight;
        const lottieStartOffset = isTablet ? (isMobile ? 0 : 30) : 220;
        const hide = pageYOffset >= 60 && deltaY >= 0;

        setHide(hide);
        setSectionTopPageY(pageYOffset);
        if (daoProtocolLottieOffset) {
          if (pageYOffset > daoProtocolOffset - lottieStartOffset) {
            setHomeProtocolLottiePlay(true);
          }
        }
      }, 300),
    [sectionTopPageY, daoProtocolLottieOffset],
  );

  useEffect(() => {
    const protocolLottieOffset = daoProtocolLottieRef && daoProtocolLottieRef.current?.offsetTop;
    if (protocolLottieOffset) {
      setDaoProtocolLottieOffset(protocolLottieOffset);
    }
  }, [daoProtocolLottieRef.current, activeDao.value]);

  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);
    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
  }, [throttleHandler]);

  const [absPoint, setAbsPoint] = useState<string>('0');
  const [abs, setAbs] = useState<boolean>(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (daoTypeRef.current === null) return;
    if (daoFooterRef.current === null) return;
    const typeTop = window.innerHeight - daoTypeRef.current.getBoundingClientRect().top - 40;
    const footerTop = window.innerHeight - daoFooterRef.current.getBoundingClientRect().top;
    const absTop = window.scrollY + window.innerHeight >= document.body.scrollHeight - daoFooterRef.current.offsetHeight;
    setAbs(absTop);
    /* 23.04.11 수정: 위치값 수정 */
    setAbsPoint(absTop ? `-${window.scrollY - 40 - footerTop}` : '64');

    if (typeTop >= 0) {
      setScrollBtn('top');
      if (footerTop >= 0) {
        setFooterOffset(footerTop);
      } else {
        setFooterOffset(0);
      }
    } else {
      setScrollBtn('scroll');
    }
    /* 23.04.11 수정: daoTypeRef dependency 추가 */
  }, [scroll, footerOffset, daoTypeRef]);

  useEffect(() => {
    dao.stat.postViewHistory(`/dao`).then(({ data }) => {
      console.log(data);
    });
  }, []);

  return (
    <div className={cn('dao-wrap')}>
      <Helmet>
        <title>DAO &gt; NILE</title>
        <body className={cn('dao-main', { 'header-hide': hide }, { 'header-offset-top': isHeaderTop })} />
      </Helmet>
      <div className={cn('dao-home-wrap', `${activeDao.value}-wrap`)} id={activeDao.value}>
        <DaoHomeLineup ref={daoLineupRef} />
        <DaoProfile />
        {activeDao.value === 'arteum' && <DaoMarquee />}
        <DaoPurpose />
        <DaoHomeProtocol ref={daoProtocolLottieRef} />
        <DaoHomeGovernance />
        <DaoHomeTrustMembership />
        {activeDao.value === 'wonder' && <DaoWondersMember />}
        <DaoHomeSocial />
        <DaoHomeVideoArea />
        <DaoHomeCoreValue />
        <DaoHomeType />
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['daoHome', 'common', 'nile'])),
    },
  };
};

export default Dao;
