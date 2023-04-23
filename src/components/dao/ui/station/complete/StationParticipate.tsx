import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import { ReactSVG } from 'react-svg';

import BgButton from '@/components/button/BgButton';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';

interface StationParticipateProps {
  status: 'beforeWalletConnect' | 'beforeParticipate' | 'beforeAcquireRefund' | 'afterAcquireRefund';
  historyList?: {
    step: number;
    status: string;
    date: string;
    participant: {
      amount: number;
      total: number;
    };
    acquireRefund: {
      acquire: number;
      total: number;
    };
  }[];
}

const StationParticipate: React.FC<StationParticipateProps> = ({ status, historyList }) => {
  const { t } = useTranslation('dao');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);
  /* 23.02.23 수정: daoThemeAtom 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  /* 23.03.29 수정: scrollHeight 값에 -1 추가 */
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (listRef.current && !isOpen) {
        listRef.current.style.maxHeight = listRef.current.children[0].scrollHeight - 1 + 'px';
      }
    });
  }, [listRef]);

  useEffect(() => {
    if (listRef.current && isOpen) {
      listRef.current.style.maxHeight = listRef.current.scrollHeight + 'px';
    }

    if (listRef.current && !isOpen) {
      listRef.current.style.maxHeight = listRef.current.children[0].scrollHeight - 1 + 'px';
    }
  }, [isOpen]);

  const titleWrapDesc = () => {
    switch (status) {
      case 'beforeWalletConnect':
        return <span className={cn('title-desc')}>{t('station.complete.participate.beforeConnect.desc')}</span>;
      case 'beforeParticipate':
        return (
          <span className={cn('title-desc')}>
            {t('station.complete.participate.beforeParticipate.desc', { type: useDaoCharacterConvert(activeDao.value) })}
          </span>
        );
      default:
        return null;
    }
  };

  const titleButton = () => {
    switch (status) {
      case 'beforeWalletConnect':
        return <BgButton buttonText={t('station.complete.participate.beforeConnect.button')} size="lg" color="highlight" />;
      case 'beforeParticipate':
        return <BgButton buttonText={t('station.complete.participate.beforeParticipate.button')} size="lg" color="highlight" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn('station-participate-wrap', historyList && historyList.length > 1 && 'has-more-btn', {
        'before-acquire-refund': status === 'beforeAcquireRefund',
      })}
    >
      <div className={cn('title-wrap')}>
        <div className={cn('left')}>
          <strong className={cn('station-section-title')}>{t('station.complete.participate.title')}</strong>
          {titleWrapDesc()}
        </div>
        {titleButton()}
      </div>
      <div className={cn('box-wrap')}>
        <div className={cn('box')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_station_box_1.svg" />
          <div className={cn('text-wrap')}>
            <span className={cn('info-name')}>{t('station.complete.participate.after.box-1')}</span>
            <div className={cn('figure-wrap')}>
              <span className={cn('figure')}>12,000</span>
              <span className={cn('unit')}>WEMIX</span>
            </div>
          </div>
        </div>
        <div className={cn('box')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_station_box_2.svg" />
          <div className={cn('text-wrap')}>
            {/* 23.04.10 수정: 다국어 표현 수정 */}
            <span className={cn('info-name')}>
              {t('station.complete.participate.after.box-2', { type: useDaoCharacterConvert(activeDao.value) })}
            </span>
            <div className={cn('figure-wrap')}>
              <span className={cn('figure')}>10,800.0235</span>
              <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
            </div>
          </div>
        </div>
      </div>
      <ul className={cn('history-wrap', historyList && historyList.length > 1 && isOpen && 'open')} ref={listRef}>
        {historyList?.map((data, index) => {
          return (
            <li key={`list-${index}`}>
              <div className={cn('history-title-wrap')}>
                <div className={cn('left')}>
                  <strong className={cn('history-title')}>
                    {data.step > 0
                      ? t('station.complete.participate.after.history.title.2')
                      : t('station.complete.participate.after.history.title.1')}
                    {data.step > 0 && t('station.complete.participate.after.history.title.key_two', { count: data.step })}
                  </strong>
                  <span className={cn('date')}>
                    {t('station.complete.participate.after.history.date')} : {data.date}
                  </span>
                </div>
              </div>
              <ul className={cn('list-type-dot')}>
                <li>
                  <Trans
                    i18nKey="station.complete.participate.after.history.desc.1"
                    ns="dao"
                    values={{
                      percent: Math.round((data.participant.amount / data.participant.total) * 100) / 100,
                      figure1: data.participant.amount.toLocaleString('ko-KR'),
                      figure2: data.participant.total.toLocaleString('ko-KR'),
                    }}
                  >
                    <span className={cn('bold-text')}></span>
                    <span className={cn('bold-text')}></span>
                    <span className={cn('bold-text')}></span>
                  </Trans>
                </li>
                <li>
                  <Trans
                    i18nKey="station.complete.participate.after.history.desc.2"
                    ns="dao"
                    values={{
                      figure1: useNumberFormatterToFix(data?.acquireRefund?.acquire),
                      figure2: data.acquireRefund.total.toLocaleString('ko-KR'),
                      type: useDaoCharacterConvert(activeDao.value),
                      unit1: t(`amountUnit.${activeDao.value}.unit1`),
                    }}
                  >
                    <span className={cn('bold-text')}></span>
                    <span className={cn('bold-text', 'number')}></span>
                    <span className={cn('bold-text', 'number')}></span>
                  </Trans>
                </li>
                <li>
                  {/* 23.04.13 수정 start: 다국어 스타일 수정으로 인한 코드 추가 */}
                  <Trans
                    i18nKey="station.complete.participate.after.history.desc.3"
                    ns="dao"
                    values={{
                      figure1: useNumberFormatterToFix(data?.acquireRefund?.acquire),
                      figure2: data.acquireRefund.total.toLocaleString('ko-KR'),
                      type: useDaoCharacterConvert(activeDao.value),
                      unit1: t(`amountUnit.${activeDao.value}.unit1`),
                    }}
                  >
                    <span className={cn('bold-colored-text')}></span>
                    <span className={cn('bold-colored-text', 'number')}></span>
                    <span className={cn('bold-colored-text', 'unit')}></span>
                    <span className={cn('bold-colored-text', 'number')}></span>
                    <span className={cn('bold-colored-text', 'unit')}></span>
                  </Trans>
                  {/* 23.04.13 수정 end: 다국어 스타일 수정으로 인한 코드 추가 */}
                </li>
              </ul>
              {/* 23.04.13 수정:  BgButton 위치 이동*/}
            </li>
          );
        })}
      </ul>
      {/* 23.04.13 수정 start: BgButton 위치 이동 */}
      {status === 'beforeAcquireRefund' && (
        /* 23.04.10 수정: 다국어 표현 수정 */
        <BgButton
          buttonText={t('station.complete.participate.after.history.button', { type: useDaoCharacterConvert(activeDao.value) })}
          size="md"
          color="highlight"
        />
      )}
      {/* 23.04.13 수정 end: BgButton 위치 이동 */}
      {historyList && historyList.length > 1 && (
        <button className={cn('show-more-btn', isOpen && 'open')} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? t('station.complete.participate.after.history.close') : t('station.complete.participate.after.history.open')}
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
      )}
    </div>
  );
};

export default StationParticipate;
