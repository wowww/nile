import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import LastRecruitingItem, { ResultItemProps } from './LastRecruitingItem';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import useWindowResize from '@/hook/useWindowResize';

const LastRecruitingResult = () => {
  const { t } = useTranslation('dao');
  const resizeEvtInit = useWindowResize();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const offset = useAtomValue(windowResizeAtom);
  const listRef = useRef<HTMLUListElement>(null);

  const Dummy: ResultItemProps[] = [
    {
      category: {
        isFirst: false,
        order: 1,
      },
      isSuccess: false,
      date: {
        start: '2023-01-01 11:00',
        end: '2023-01-08 11:00',
      },
      accomplishRate: {
        rate: 123,
        recruitSum: 1830000,
        targetSum: 1000000,
      },
      participateNum: 108,
      detail: {
        information: t('station.complete.result.list.box.contents.1'),
        tokenUnit: 'WEMIX',
        minimum: 10,
        maximum: 10,
        issued: 1000000,
        price: {
          left: 1,
          right: 1,
        },
      },
    },
    {
      category: {
        isFirst: true,
      },
      isSuccess: true,
      date: {
        start: '2023-01-01 11:00',
        end: '2023-01-08 11:00',
      },
      accomplishRate: {
        rate: 123,
        recruitSum: 1830000,
        /* 23.03.03 수정: 발행량 수정 */
        targetSum: 1700010,
      },
      participateNum: 123,
      detail: {
        information: t('station.complete.result.list.box.contents.1'),
        tokenUnit: 'WEMIX',
        minimum: 1700010,
        maximum: 10,
        /* 23.03.03 수정: 발행량 수정 */
        issued: 1700010,
        price: {
          left: 1,
          right: 1,
        },
      },
    },
  ];

  const lottieIndex = Dummy.findIndex((el) => el.isSuccess);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (listRef.current && !isOpen && Dummy.length > 1) {
        const padding = window.getComputedStyle(listRef.current).padding.match(/\d/g)?.join('');
        let intPadding;
        if (padding) {
          intPadding = parseInt(padding);
          listRef.current.style.maxHeight = listRef.current.children[0].scrollHeight + 1 + intPadding * 2 + 'px';
        }
      }
    });
  }, [listRef, offset.width]);
  useEffect(() => {
    if (listRef.current) {
      const padding = window.getComputedStyle(listRef.current).padding.match(/\d/g)?.join('');
      let intPadding: number = parseInt(padding!);
      if (isOpen) {
        listRef.current.style.maxHeight = listRef.current.scrollHeight + 'px';
      } else if (!isOpen) {
        listRef.current.style.maxHeight = listRef.current.children[0].scrollHeight + 1 + intPadding * 2 + 'px';
      }
    }
  }, [isOpen]);

  const isBtn = Dummy.length > 1;

  return (
    <div className={cn('last-recruiting-result-wrap', isBtn && 'has-btn')}>
      <div className={cn('last-recruiting-result-header')}>
        <div className={cn('left')}>
          <strong className={cn('station-section-title')}>{t('station.complete.result.title')}</strong>
          <p className={cn('desc')}>{t('station.complete.result.desc')}</p>
        </div>
        <div className={cn('right')}>
          <div className={cn('info-box')}>
            <span className={cn('info-name')}>{t('station.complete.result.headerInfo1')}</span>
            <div className={cn('info-detail')}>
              <span className={cn('figure')}>3,750,000</span>
              <span className={cn('unit')}>WEMIX</span>
            </div>
          </div>
          <div className={cn('info-box')}>
            <span className={cn('info-name')}>{t('station.complete.result.headerInfo2')}</span>
            <div className={cn('info-detail')}>
              <span className={cn('figure')}>331</span>
              <span className={cn('unit')}>{t('station.complete.result.person')}</span>
            </div>
          </div>
        </div>
      </div>
      <ul className={cn('result-item-list-wrap', isOpen && 'more')} ref={listRef}>
        {Dummy.map((el, index) => (
          <LastRecruitingItem {...el} {...(lottieIndex === index && { isLottie: true })} key={el.accomplishRate.rate + el.accomplishRate.targetSum} />
        ))}
      </ul>
      {isBtn && (
        <button className={cn('show-more-btn', isOpen && 'open')} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? t('station.complete.participate.after.history.close') : t('station.complete.participate.after.history.open')}
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
      )}
    </div>
  );
};

export default LastRecruitingResult;
