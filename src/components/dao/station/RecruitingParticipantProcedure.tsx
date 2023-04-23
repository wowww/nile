import { forwardRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { Popover } from 'antd';
import { useAtomValue } from 'jotai';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { daoThemeAtom } from '@/state/daoAtom';
import useMediaQuery from '@/hook/useMediaQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import StationTitle from '@components/dao/station/recruit/StationTitle';

interface StepList {
  title: string;
  subTitle: string;
  list: {
    desc: string;
    strong?: string;
    tooltip?: string;
  }[];
}

const RecruitingParticipantProcedure = forwardRef((props, ref: any) => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  const [stepList, setStepList] = useState<StepList[]>([]);

  useEffect(() => {
    setStepList(
      t(`station.recruiting.participantStep.list`, {
        type: useDaoCharacterConvert(activeDao.value),
        returnObjects: true,
      }),
    );
    /* 23.04.10 수정: useEffect dependency 값 추가 */
  }, [t]);

  useEffect(() => {
    console.log(stepList);
  }, [stepList]);

  return (
    <div className={cn('participant-procedure-wrap')}>
      <StationTitle title={t('station.recruiting.participantStep.title')} />
      {isMobile ? (
        <Swiper className={cn('procedure-list')} slidesPerView={1} spaceBetween={8} modules={[Pagination]} pagination={{}}>
          {stepList.map((el, index) => {
            return (
              <SwiperSlide key={el.title + index}>
                <div className={cn('left')}>
                  <span className={cn('step')}>{'0' + (index + 1)}</span>
                  <span className={cn('intro')}>{el.subTitle}</span>
                  <strong className={cn('step-title')}>{el.title}</strong>
                </div>
                <div className={cn('right')}>
                  <ul className={cn('list-dot-wrap')}>
                    {el.list.map((item, itemIndex) => {
                      return (
                        <li key={`item${itemIndex}`} className={cn(item.tooltip && 'tooltip-row')}>
                          {item.desc}
                          {item.strong && <span className={cn('remark')}>{item.strong}</span>}

                          {item.tooltip && (
                            <Popover
                              overlayClassName="tooltip"
                              placement={!isTablet ? 'top' : 'topRight'}
                              content={<div className={cn('tooltip-contents')}>{item.tooltip}</div>}
                              trigger="click"
                              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                            >
                              <button type="button">
                                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                              </button>
                            </Popover>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <ul className={cn('procedure-list')}>
          {stepList.map((el, index) => {
            return (
              <li key={el.title + index}>
                <div className={cn('left')}>
                  <span className={cn('step')}>{'0' + (index + 1)}</span>
                  <span className={cn('intro')}>{el.subTitle}</span>
                  <strong className={cn('step-title')}>{el.title}</strong>
                </div>
                <div className={cn('right')}>
                  <ul className={cn('list-dot-wrap')}>
                    {el.list.map((item, itemIndex) => {
                      return (
                        <li key={`item${itemIndex}`} className={cn(item.tooltip && 'tooltip-row')}>
                          {item.desc}
                          {item.strong && <span className={cn('remark')}>{item.strong}</span>}
                          {/* 23.04.17 수정: 수정 반영 사항 툴팁 제거(툴팁 코드 제거) - > 문구 변경 */}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default RecruitingParticipantProcedure;
