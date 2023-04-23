import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import Tag from '@/components/tag/Tag';
import lottie from 'lottie-web';
import lottieLusAuction from '@/assets/lottie/lottie_lus_auction.json';
/* 23.02.23 수정: useAtomValue, daoThemeAtom 추가 */
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
/* 23.04.10 수정: useDaoCharacterConvert 추가 */
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

export interface ResultItemProps {
  category: {
    isFirst: boolean;
    order?: number;
  };
  isSuccess: boolean;
  date: {
    start: string;
    end: string;
  };
  accomplishRate: {
    rate: number;
    recruitSum: number;
    targetSum: number;
  };
  participateNum: number;
  detail: {
    information: string;
    tokenUnit: string;
    minimum: number;
    maximum: number | string;
    issued: number;
    price: {
      left: number;
      right: number;
    };
  };
  isLottie?: boolean;
}

const LastRecruitingItem = ({ category, isSuccess, date, accomplishRate, participateNum, detail, isLottie }: ResultItemProps) => {
  const { t } = useTranslation('dao');

  const lottieContainer = useRef<HTMLDivElement>(null);
  /* 23.02.23 수정: daoThemeAtom 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: lottieContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieLusAuction,
    });

    return () => lottieLoad.destroy();
  }, [lottieContainer]);

  const boxInfoList = [
    {
      name: t('station.complete.result.list.box.title.1'),
      contents: detail.information,
    },
    {
      name: t('station.complete.result.list.box.title.2'),
      contents: detail.tokenUnit,
    },
    {
      name: t('station.complete.result.list.box.title.3'),
      contents: (
        <>
          {/* 23.04.10 수정: ui 폴더 내 있던 코드로 수정 */}
          {detail.minimum.toLocaleString('ko-KR')} <span className={cn('unit')}>WEMIX</span>
        </>
      ),
    },
    {
      name: t('station.complete.result.list.box.title.4'),
      contents: (
        <>
          {/* 23.04.10 수정: ui 폴더 내 있던 코드로 수정 */}
          {detail.maximum} <>WEMIX {t('station.complete.result.list.box.contents.3')}</>
        </>
      ),
    },
    {
      /* 23.04.10 수정: 다국어 표현 수정 */
      name: t('station.complete.result.list.box.title.5', { type: useDaoCharacterConvert(activeDao.value) }),
      contents: (
        <>
          {detail.issued.toLocaleString('ko-KR')} <span className={cn('unit')}>WEMIX</span>
        </>
      ),
    },
    {
      /* 23.04.10 수정: 다국어 표현 수정 */
      name: t('station.complete.result.list.box.title.6', { type: useDaoCharacterConvert(activeDao.value) }),
      contents: (
        <>
          {/* 23.04.10 수정: 텍스트 수정 */}
          {/* 23.02.23 수정: WDR 티커 단위 다국어 처리 */}
          {detail.price.left} <span className={cn('unit')}>WEMIX</span>&nbsp;= {detail.price.right}{' '}
          <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
        </>
      ),
    },
  ];

  return (
    <li className={cn('result-item', isSuccess ? 'success' : 'fail')}>
      {isLottie && <div className={cn('lottie')} ref={lottieContainer}></div>}
      <div className={cn('result-item-header')}>
        <strong>
          {category.isFirst ? (
            t('station.complete.result.list.title.1')
          ) : (
            <>
              {t('station.complete.result.list.title.2', { n: category.order })}
              {t('station.complete.result.list.title.key', { count: category.order, ordinal: true })}
            </>
          )}
        </strong>
        {/* 23.03.01 수정: color 타입 수정 */}
        <Tag color={isSuccess ? 'primary' : 'dark-gray'} size="xs">
          {isSuccess ? t('station.complete.result.list.tag.1') : t('station.complete.result.list.tag.2')}
        </Tag>
      </div>
      <p className={cn('date')}>
        {t('station.complete.result.list.date')} : {date.start} ~ {date.end}
      </p>
      <ul className={cn('list-type-dot')}>
        <li>
          <Trans
            i18nKey="station.complete.result.list.desc.1"
            ns="dao"
            values={{
              n: accomplishRate.rate,
              figure1: accomplishRate.recruitSum.toLocaleString('ko-KR'),
              figure2: accomplishRate.targetSum.toLocaleString('ko-KR'),
            }}
          >
            <span className={cn('colored', 'bold')}></span>
            <span className={cn('bold')}></span>
            <span className={cn('bold')}></span>
          </Trans>
        </li>
        <li>
          <Trans
            i18nKey="station.complete.result.list.desc.2"
            ns="dao"
            values={{
              n: participateNum,
            }}
          >
            {/* 23.04.10 수정: ui 폴더 내 있던 코드로 수정 */}
            <span className={cn('colored', 'bold', isSuccess ? 'success' : 'fail')}></span>
          </Trans>
        </li>
      </ul>
      <ul className={cn('info-box-list')}>
        {boxInfoList.map((el) => (
          <li key={el.name}>
            <span className={cn('info-name')}>{el.name}</span>
            <div className={cn('info-contents')}>{el.contents}</div>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default LastRecruitingItem;
