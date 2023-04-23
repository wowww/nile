/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import lottie from 'lottie-web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Mousewheel, SwiperOptions } from 'swiper';
import useWindowResize from '@/hook/useWindowResize';
import 'swiper/css/effect-fade';
import { useTranslation } from 'next-i18next';

import { useAtom, useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import { daoThemeAtom, setFullPageAllowScrolling, setSwiperActiveIdxState, setSwiperDirectionState } from '@/state/daoAtom';
import axios from 'axios';

interface DaoHomeSwiperPropsType {
  swiperMousewheelState: boolean;
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const DaoHomeLottie = ({ swiperMousewheelState }: DaoHomeSwiperPropsType) => {
  const [allowScrolling, setAllowScrolling] = useAtom(setFullPageAllowScrolling);
  const [swiperActive, setSwiperActive] = useAtom(setSwiperActiveIdxState);
  const [swiperDirection, setSwiperDirection] = useAtom(setSwiperDirectionState);

  const { t } = useTranslation('daoHome');
  const resizeEvtInit = useWindowResize();

  const [activeDao] = useAtom(daoThemeAtom);
  const offset = useAtomValue(windowResizeAtom);

  const [lottieAnimationData, setLottieAnimationData] = useState<any[]>();

  // const [swiperActiveIdx, setSwiperActiveIdx] = useState<number>(0);
  const [lottieDescHeight, setLottieDescHeight] = useState<string[]>(['0', '0', '0', '0']);

  const daoLottieEl000 = useRef<HTMLDivElement>(null);
  const daoLottieEl010 = useRef<HTMLDivElement>(null);
  const daoLottieEl011 = useRef<HTMLDivElement>(null);
  const daoLottieEl020 = useRef<HTMLDivElement>(null);
  const daoLottieEl021 = useRef<HTMLDivElement>(null);
  const daoLottieEl030 = useRef<HTMLDivElement>(null);
  const daoLottieEl031 = useRef<HTMLDivElement>(null);

  const lottieDescTitRef = useRef<HTMLDivElement>(null);
  const lottieDescListRef = useRef<HTMLOListElement>(null);
  const lottieWrap = useRef<HTMLDivElement>(null);
  const swiperLottie = useRef<HTMLDivElement>(null);
  const lottieDescHeightRef = useRef<string[]>(['0', '0', '0', '0']);
  const lottieLoadRef = useRef<any>();
  const lottieRef = useRef<any>();
  const swiperEvt = useRef<any>();
  const lottieInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // iOS 대응 코드
    const saveInitVh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--initVh', `${saveInitVh}px`);
  }, []);

  const positionEvt = () => {
    if (!lottieDescTitRef.current) return;
    const descTitHideText = lottieDescTitRef.current!.querySelector('span:last-child');
    const descList = lottieDescListRef.current!.querySelectorAll('li .lottie-desc-box');
    descList?.forEach((list, index) => {
      lottieDescHeightRef.current[index + 1] = `${list.scrollHeight}px`;
    });
    lottieDescHeightRef.current[0] = `${descTitHideText!.scrollHeight}px`;
  };

  const lottieDataInit = useCallback(async () => {
    const urls = [
      'https://nile.blob.core.windows.net/images/assets/lottie/daoIndex/wonder/vid0.json',
      'https://nile.blob.core.windows.net/images/assets/lottie/daoIndex/wonder/vid1-1.json',
      'https://nile.blob.core.windows.net/images/assets/lottie/daoIndex/wonder/vid1-2.json',
      'https://nile.blob.core.windows.net/images/assets/lottie/daoIndex/wonder/vid2-1.json',
      'https://nile.blob.core.windows.net/images/assets/lottie/daoIndex/wonder/vid2-2.json',
      'https://nile.blob.core.windows.net/images/assets/lottie/daoIndex/wonder/vid3-1.json',
      'https://nile.blob.core.windows.net/images/assets/lottie/daoIndex/wonder/vid3-2.json',
    ];

    await axios.all(urls.map((url) => axios({ method: 'get', url }))).then(
      axios.spread(({ data: vid0 }, { data: vid11 }, { data: vid12 }, { data: vid21 }, { data: vid22 }, { data: vid31 }, { data: vid32 }) => {
        setLottieAnimationData([vid0, vid11, vid12, vid21, vid22, vid31, vid32]);
      })
    );
  }, []);

  useEffect(() => {
    setLottieDescHeight(lottieDescHeightRef.current);
    positionEvt();
  }, [offset.width]);

  useEffect(() => {
    lottieDataInit();
  }, []);
  useEffect(() => {
    if (!lottieAnimationData) {
      return;
    }
    const lottieElRef: HTMLDivElement[] = [
      daoLottieEl000.current!,
      daoLottieEl010.current!,
      daoLottieEl011.current!,
      daoLottieEl020.current!,
      daoLottieEl021.current!,
      daoLottieEl030.current!,
      daoLottieEl031.current!,
    ];

    lottieLoadRef.current = lottieAnimationData.map((data, index) => {
      return {
        lottie: lottie.loadAnimation({
          container: lottieElRef[index],
          renderer: 'svg',
          loop: index === 2 || index === 4,
          autoplay: index === 2 || index === 4,
          animationData: lottieAnimationData[index],
        }),
      };
    });
    lottieRef.current = lottieElRef;
  }, [lottieAnimationData]);

  const removeClassAll = (index: number) => {
    if (!lottieRef.current) {
      return;
    }
    lottieRef.current.forEach((lottieEl: HTMLElement, idx: number) => {
      if (index !== idx) lottieEl.classList.remove('active');
    });
  };

  const lottieAct = (pause: number | undefined, active: number | undefined) => {
    if (!lottieLoadRef.current || !lottieRef.current) {
      return;
    }
    if (pause !== undefined) lottieLoadRef.current[pause].lottie.pause();
    if (active !== undefined) {
      removeClassAll(active); // remove.classList.remove('active');
      lottieLoadRef.current[active].lottie.setDirection(1);
      lottieRef.current[active].classList.add('active');
      lottieLoadRef.current[active].lottie.goToAndPlay(0);
    }
  };
  const lottieReverseAct = (
    active: number // active lottie
  ) => {
    if (!lottieLoadRef.current || !lottieRef.current) {
      return;
    }

    lottieLoadRef.current[active].lottie.setDirection(-1);
    lottieLoadRef.current[active].lottie.play();
  };
  const lottieReverseOnCompleteAct = (
    active: number, // active lottie
    remove: boolean | undefined, // lottie remove
    nextActive: number, // 다음 lottie active
    nextPlay: boolean | undefined // 다음 lottie 재생
  ) => {
    if (!lottieLoadRef.current || !lottieRef.current) {
      return;
    }

    if (active !== undefined) {
      lottieLoadRef.current[active].lottie.pause();
      lottieLoadRef.current[active].lottie.setDirection(1);
    }
    if (remove) removeClassAll(nextActive); // remove.classList.remove('active');
    // if (remove !== undefined)
    if (nextActive !== undefined) {
      lottieRef.current[nextActive].classList.add('active');
      lottieLoadRef.current[nextActive].lottie.setDirection(-1);
      if (nextPlay) lottieLoadRef.current[nextActive].lottie.play();
    }
  };

  // swiper 옵션 셋팅 값
  const swiperSetOptions: SwiperOptions = {
    direction: 'vertical',
    slidesPerView: 1,
    modules: [Mousewheel, EffectFade],
    mousewheel: {
      thresholdDelta: 30, // 휠 감도
      thresholdTime: 300, // 휠 지연
    },
    speed: 1000,
    threshold: 0, // 터치 감도
    effect: 'fade',
  };

  useEffect(() => {
    if (!swiperEvt.current) return;
    if (swiperMousewheelState) swiperEvt.current.mousewheel.enable();
    else swiperEvt.current.mousewheel.disable();
  }, [swiperMousewheelState]);

  useEffect(() => {
    if (swiperEvt.current !== null && swiperEvt.current !== undefined) {
      swiperEvt.current.slideTo(swiperActive); /* 22.11.02 수정: 전역 데이터로 변경 */
    }
  }, [swiperActive]); /* 22.11.02 수정: 전역 데이터로 변경 */

  // swiper 이벤트 셋팅 값
  const swiperSetEvents: any = {
    onInit: (swiper: SwiperCore) => {
      swiperEvt.current = swiper;
    },
    /* 22.11.02 수정 start: onSlideChange 이벤트 추가 */
    onSlideChange: (swiper: SwiperCore) => {
      setSwiperActive(swiper.activeIndex);
      if (swiper.previousIndex >= swiper.activeIndex) {
        setSwiperDirection('up');
      } else {
        setSwiperDirection('down');
      }
    },
    /* 22.11.02 수정 end: onSlideChange 이벤트 추가 */
    onSlideChangeTransitionStart: (swiper: SwiperCore) => {
      swiperEvt.current.mousewheel.enable();
    },
    // 첫 슬라이드 도달 시
    onReachBeginning: (swiper: SwiperCore) => {
      setAllowScrolling(true);
      swiperEvt.current.mousewheel.disable();
    },
    // 마지막 슬라이드 도달 시
    onReachEnd: (swiper: SwiperCore) => {
      setAllowScrolling(true);
      swiperEvt.current.mousewheel.disable();
    },
    onSlideNextTransitionStart: (swiper: SwiperCore) => {
      if (swiper.activeIndex === 1) {
        lottieAct(0, 0);
      } else if (swiper.activeIndex === 2) {
        lottieAct(0, 1);
      } else if (swiper.activeIndex === 3) {
        lottieAct(2, 3);
      } else if (swiper.activeIndex === 4) {
        lottieAct(4, 5);
      } else if (swiper.activeIndex === 5) {
        /* 22.11.02 수정 start: 동작 오류 수정 */
        setAllowScrolling(true);
        swiperEvt.current.mousewheel.disable();
      }
      /* 22.11.02 수정 end: 동작 오류 수정 */
    },
    onSlideNextTransitionEnd: (swiper: SwiperCore) => {
      if (swiper.activeIndex === 2) {
        lottieAct(1, 2);
      } else if (swiper.activeIndex === 3) {
        lottieAct(3, 4);
      } else if (swiper.activeIndex === 4) {
        lottieAct(5, 6);
      }
    },
    onSlidePrevTransitionStart: (swiper: SwiperCore) => {
      if (swiper.activeIndex === 3) {
        lottieReverseOnCompleteAct(6, true, 5, true);
      } else if (swiper.activeIndex === 2) {
        lottieReverseOnCompleteAct(4, true, 3, true);
      } else if (swiper.activeIndex === 1) {
        lottieReverseOnCompleteAct(2, true, 1, true);
      } else if (swiper.activeIndex === 0) {
        /* 22.11.02 수정 start: 동작 오류 수정 */
        setAllowScrolling(true);
        swiperEvt.current.mousewheel.disable();
      }
      /* 22.11.02 수정 end: 동작 오류 수정 */
    },
    onSlidePrevTransitionEnd: (swiper: SwiperCore) => {
      if (swiper.activeIndex === 4) {
        lottieReverseAct(6);
      } else if (swiper.activeIndex === 3) {
        lottieReverseOnCompleteAct(5, true, 4, true);
      } else if (swiper.activeIndex === 2) {
        lottieReverseOnCompleteAct(3, true, 2, true);
      }
    },
  };

  return (
    <>
      <div
        className={cn('dao-section', 'lottie-wrap', { 'event-prevent': swiperActive === 0 || swiperActive === 5 }, `${activeDao.value}-wrap`)}
        ref={lottieWrap}
      >
        <div className={cn('dao-lottie-inner')} ref={lottieInnerRef}>
          <div className={cn('dao-lottie')} ref={swiperLottie}>
            <Swiper {...swiperSetOptions} {...swiperSetEvents}>
              <SwiperSlide />
              <SwiperSlide />
              <SwiperSlide />
              <SwiperSlide />
              <SwiperSlide />
              <SwiperSlide />
            </Swiper>
            <div className={cn('lottie-desc-wrap')}>
              <div className={cn('lottie-desc-inner')}>
                <div className={cn('lottie-title-wrap', { active: swiperActive === 0 || swiperActive === 1 })} ref={lottieDescTitRef}>
                  <h2>
                    <span>{t('coreValue.title1')}</span>
                    <span style={{ height: swiperActive === 0 || swiperActive === 1 ? lottieDescHeight[0] : '0' }}>{t('coreValue.title2')}</span>
                  </h2>
                </div>
                <ol ref={lottieDescListRef}>
                  <li className={cn({ active: swiperActive === 2 })}>
                    <h3>{t('coreValue.subtitle1')}</h3>
                    <div className={cn('lottie-desc-box')} style={{ height: swiperActive === 2 ? lottieDescHeight[1] : '0' }}>
                      <strong>{t('coreValue.subdesc1-1')}</strong>
                      <div>{t('coreValue.subdesc1-2')}</div>
                    </div>
                  </li>
                  <li className={cn({ active: swiperActive === 3 })}>
                    <h3>{t('coreValue.subtitle2')}</h3>
                    <div className={cn('lottie-desc-box')} style={{ height: swiperActive === 3 ? lottieDescHeight[2] : '0' }}>
                      <strong>{t('coreValue.subdesc2-1')}</strong>
                      <div>{t('coreValue.subdesc2-2')}</div>
                    </div>
                  </li>
                  <li className={cn({ active: swiperActive === 4 || swiperActive === 5 })}>
                    <h3>{t('coreValue.subtitle3')}</h3>
                    <div className={cn('lottie-desc-box')} style={{ height: swiperActive === 4 || swiperActive === 5 ? lottieDescHeight[3] : '0' }}>
                      <strong>{t('coreValue.subdesc3-1')}</strong>
                      <div>{t('coreValue.subdesc3-2')}</div>
                    </div>
                  </li>
                </ol>
                {/* 22.11.09 수정: 스크롤 아이콘 삭제 */}
              </div>
            </div>
            <div className={cn('lottie-component-wrap')}>
              <div className={cn('lottie-component-inner')}>
                <div ref={daoLottieEl000} className={cn('lottie-component')} />
                <div ref={daoLottieEl010} className={cn('lottie-component')} />
                <div ref={daoLottieEl011} className={cn('lottie-component')} />
                <div ref={daoLottieEl020} className={cn('lottie-component')} />
                <div ref={daoLottieEl021} className={cn('lottie-component')} />
                <div ref={daoLottieEl030} className={cn('lottie-component')} />
                <div ref={daoLottieEl031} className={cn('lottie-component')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaoHomeLottie;
