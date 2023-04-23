import { forwardRef, useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { throttle } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import cn from 'classnames';

import { useAtom } from 'jotai';
import useMediaQuery from '@/hook/useMediaQuery';

import { daoHomeProtocolLottiePlay, daoThemeAtom } from '@/state/daoAtom';
import { headerHideFull } from '@/state/layoutAtom';
import OutlineButton from '@/components/button/OutlineButton';

import IconWatch from '@images/icon/ico_watch.svg';
import ShareButton from '@/components/button/ShareButton';
import NileHeroModal from '@/components/modal/NileHeroModal';
import { ReactSVG } from 'react-svg';
import { useSetAtom } from 'jotai';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { NileApiService } from '@/services/nile/api';
import { useUpdateAtom } from 'jotai/utils';

// 데이터 Type
type lineupType = {
  name: string;
  type: string;
  year?: string; // 년도
  quarterly?: string; // 분기
  half?: 'first' | 'second'; // 상/하반기
  dateStart?: string; // 시작 날짜
  dateEnd?: string; // 끝 날짜
  days?: string; // 남은 일
  hours?: string; // 남은 시간
  minutes?: string; // 남은 분
  seconds?: string; // 남은 초
  result?: number; // 완료시 모집된 수치
  applicant?: number; // 완료시 참여한 인원
  description?: string;
  /* 23.04.18 수정: 디자인 수정 - 모집중 상태 추가 */
  recruiting?: boolean; // 모집중 상태
};

const DaoHomeLineup = forwardRef<HTMLDivElement>(({}, ref) => {
  const { t } = useTranslation(['daoHome', 'common']);

  const [activeNum, setActiveNum] = useState<number>(0);
  const [isModalDaoStation, setModalDaoStation] = useState(false);
  const [sectionTopPageY, setSectionTopPageY] = useState<number>(0);
  const [flagSticky, setFlagSticky] = useState<boolean>(false);
  const [scrollUp, setScrollUp] = useState<boolean>(false); //TODO: 확인 후 삭제 필요
  const [mobileTabStickStatus, setMobileTabStickStatus] = useState<boolean>(false);
  const [size, setSize] = useState<'lg' | 'md' | 'sm'>('lg');

  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);
  const [headerHide, setHeaderHide] = useAtom(headerHideFull);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const documentRef = useRef<Document>();
  const swiperRef = useRef<SwiperCore>();
  const daoLineupRef = useRef<HTMLDivElement>(null);

  const { dao } = NileApiService();
  const [pageViewInfo, setPageViewInfo] = useState<any>();

  const setHomeProtocolLottiePlay = useUpdateAtom(daoHomeProtocolLottiePlay);

  // NOTE: 임시 데이터
  const lineupData: lineupType[] = [
    {
      name: 'wonder',
      description: t('hero.item.recruitSchedule'),
      type: 'date',
      dateStart: '2023-04-14',
      dateEnd: '2023-04-24',
      quarterly: '1',
      /* 23.04.18 수정: 디자인 수정 - 모집중 상태 추가 */
      recruiting: true,
    },
    {
      name: 'arteum',
      type: 'expected',
      description: t('hero.item.recruitScheduleFirstHalf', { year: '2023' }),
      // type: 'date',
      // dateStart: '2023-01-02',
      // dateEnd: '2023-01-10',
    },
    {
      name: 'delta',
      type: 'expected',
      description: t('hero.item.recruitScheduleFirstHalf', { year: '2023' }),
      // type: 'recruit',
      // days: '01',
      // hours: '21',
      // minutes: '32',
      // seconds: '48',
    },
    {
      name: 'oracle',
      type: 'expected',
      description: t('hero.item.recruitScheduleSecondHalf', { year: '2023' }),
      // type: 'end',
      // result: 1523450,
      // applicant: 128,
    },
  ];

  const lineupInfoContent = (content: lineupType) => {
    switch (content.type) {
      case 'schedule':
        return (
          <>
            <span className={cn('info')}>
              {t('daoHome:hero.item.recruitScheduleShort')}
              <span className={cn('chips')}>{t('daoHome:hero.item.recruitScheduleChip')}</span>
              <span className={cn('detail')}>
                {content.quarterly &&
                  t('daoHome:hero.item.recruitScheduleQuarterly', {
                    year: content.year,
                    quarterly: content.quarterly,
                  })}
                {content.half === 'first' && t('daoHome:hero.item.recruitScheduleFirstHalf', { year: content.year })}
                {content.half === 'second' && t('daoHome:hero.item.recruitScheduleSecondHalf', { year: content.year })}
                {!content.quarterly && !content.half && t('daoHome:hero.item.recruitSchedule')}
              </span>
            </span>
          </>
        );
      case 'expected':
        return (
          <>
            <span className={cn('info')}>
              {t('daoHome:hero.item.recruitScheduleShort')}
              <span className={cn('chips')}>{t('daoHome:hero.item.recruitScheduleChip')}</span>
              <span className={cn('detail')}>{content.description}</span>
            </span>
          </>
        );
      case '': //상반기 하반기
      case 'date':
        return (
          <>
            <span className={cn('info')}>
              {t('daoHome:hero.item.recruitDateShort', { dateStart: content.dateStart })}
              <span className={cn('chips')}>{t('daoHome:hero.item.recruitChip')}</span>
              <span className={cn('detail')}>
                {content.dateStart} ~ {content.dateEnd}
              </span>
            </span>
          </>
        );
      case 'recruit':
        return (
          <>
            <span className={cn('info')}>
              {content.days !== '00'
                ? t('daoHome:hero.item.recruitShort', { day: content.days, hour: content.hours })
                : t('daoHome:hero.item.recruitShortDeadline')}
              <span className={cn('chips')}>{t('daoHome:hero.item.recruitChip')}</span>
              <span className={cn('detail')}>
                <span className={cn('time')}>
                  <em>{content.days}</em>
                  {t('daoHome:hero.item.recruitDays')}
                </span>
                <span className={cn('time')}>
                  <em>{content.hours}</em>
                  {t('daoHome:hero.item.recruitHours')}
                </span>
                <span className={cn('time')}>
                  <em>{content.minutes}</em>
                  {t('daoHome:hero.item.recruitMinutes')}
                </span>
                <span className={cn('time')}>
                  <em>{content.seconds}</em>
                  {t('daoHome:hero.item.recruitSeconds')}
                </span>
              </span>
            </span>
          </>
        );
      case 'end':
        return (
          <>
            <span className={cn('info')}>
              {t('daoHome:hero.item.recruitEndShort', { applicant: content.applicant?.toLocaleString('ko-KR') })}
              <span className={cn('detail')}>
                <span>
                  {t('daoHome:hero.item.recruitEndTitle1')}
                  <span className={cn('result-text-wrap')}>
                    <span className={cn('result-text')}>{content.result?.toLocaleString('ko-KR')} </span>
                    {t('daoHome:hero.item.recruitEndTitle1Suffix')}
                  </span>
                </span>
                <span>
                  {t('daoHome:hero.item.recruitEndTitle2')}
                  <span className={cn('result-text-wrap')}>
                    <span className={cn('result-text')}>{content.applicant?.toLocaleString('ko-KR')} </span>
                    {t('daoHome:hero.item.recruitEndTitle2Suffix')}
                  </span>
                </span>
              </span>
            </span>
          </>
        );
      default:
        return false;
    }
  };

  const [offsetValue, setOffsetValue] = useState(() => {
    // if (flagSticky && size == 'md') {
    //   return 123;
    // } else if (flagSticky && size == 'sm') {
    //   return 108;
    // }
    if (size === 'lg') {
      return 95;
    } else if (size === 'md') {
      return 130;
    } else {
      return 80;
    }
  });

  useEffect(() => {
    if (size === 'lg') {
      setOffsetValue(95);
    } else if (size === 'md') {
      setOffsetValue(130);
    } else {
      setOffsetValue(80);
    }
    if (flagSticky && size == 'md') {
      setOffsetValue((pre) => pre - 7);
    } else if (flagSticky && size == 'sm') {
      setOffsetValue((pre) => pre + 28);
    }
  }, [size, flagSticky]);

  /* 23.04.18 수정: FlagSticky 값 수정 (제거된 swiper 관련 삭제) */
  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        if (daoLineupRef.current) {
          const { pageYOffset } = window;
          const targetOffset = 60;

          setSectionTopPageY(pageYOffset);

          if (pageYOffset > targetOffset) {
            setFlagSticky(true);
          } else {
            setFlagSticky(false);
          }
        }
      }, 300),
    [sectionTopPageY, offsetValue, size],
  );

  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);
    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
  }, [throttleHandler]);

  useEffect(() => {
    if (isTablet) {
      swiperRef.current?.slideTo(activeNum);
    }

    if (!isTablet) {
      setSize('lg');
    } else if (!isMobile) {
      setSize('md');
    } else {
      setSize('sm');
    }
  }, [isMobile, isTablet]);

  /* 23.04.19 수정: 디자인 수정으로 swiper 삭제 됨에 따라 swiperClick 함수 삭제, handelBadgeClick 으로 통합 */
  const handleBadgeClick = (index: number) => {
    setActiveNum(index);
    /* 23.02.13 수정: setHomeProtocolLottiePlay 함수 추가 */
    setHomeProtocolLottiePlay(false);
    setTimeout(() => {
      window.scrollTo({
        /* 23.04.19 수정: 탭 클릭시 헤더 깜빡이는 현상으로 scroll top:0 으로 수정 */
        top: 0,
        left: 0,
      });
    });
  };

  useEffect(() => {
    if (activeDao.value === 'wonder') {
      setActiveNum(0);
    } else if (activeDao.value === 'arteum') {
      setActiveNum(1);
    } else if (activeDao.value === 'delta') {
      setActiveNum(2);
    } else if (activeDao.value === 'oracle') {
      setActiveNum(3);
    }
  }, []);

  useEffect(() => {
    if (activeNum === 0) {
      setActiveDao({ value: 'wonder' });
    } else if (activeNum === 1) {
      setActiveDao({ value: 'arteum' });
    } else if (activeNum === 2) {
      setActiveDao({ value: 'delta' });
    } else if (activeNum === 3) {
      setActiveDao({ value: 'oracle' });
    }
  }, [activeNum]);

  useEffect(() => {
    dao.stat.fetchViewCount(`/dao${activeDao ? `/${activeDao.value}` : ''}`).then(({ data }) => {
      console.log(data.data);
      setPageViewInfo(data.data);
    });
  }, [activeDao]);

  return (
    <>
      {/* 23.04.18 수정: 디자인 수정 - top-text 삭제 */}
      <div
        ref={daoLineupRef}
        className={cn('dao-lineup-wrap', {
          mobile: isTablet,
          sticky: flagSticky,
          fixed: isTablet && mobileTabStickStatus,
          'header-active': !headerHide,
        })}
      >
        <div ref={ref} className={cn('sticky-btns')}>
          <ul>
            {lineupData.map((content, index) => {
              return (
                <li key={`lineup-btn-${index}`}>
                  {/* 23.04.18 수정: 디자인 - 모집중 상태 추가로 인한 클래스명 추가 */}
                  <a className={cn(content.name, { active: activeNum === index })} href={`#${content.name}`} onClick={() => handleBadgeClick(index)}>
                    {/* <button type="button" className={cn({ active: activeNum === index })} onClick={() => handleBadgeClick(index, content.name)}> */}
                    <span className={cn('a11y')}>
                      {t('goToBtn', {
                        ns: 'common',
                        name: `${useDaoCharacterConvert(content.name)} DAO`,
                      })}
                    </span>
                    <span className={cn('flag')}>
                      {/* 23.04.20 수정: 디자인 재수정 - 모집중 상태표시 삭제 요청 */}
                      <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/dao_badge/ico_${content.name}_badge_lg.svg`} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* 23.04.18 수정: 디자인 수정 - swiper 삭제 */}
    </>
  );
});

export default DaoHomeLineup;
