import cn from 'classnames';
import Tag from '@/components/tag/Tag';
// 22.11.14 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

interface cardDataType {
  title: string;
  date: string;
  mainUnit: string;
  percent: string;
  wonder: string;
  gwonder: string;
}

export const MypageCard = (cardData: cardDataType) => {
  // 22.11.14 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);
  return (
    <div className={cn('mypage-operate-card')}>
      <strong className={cn('operate-card-title')}>{cardData.title}</strong>
      <div className={cn('main-unit-area')}>
        <span className={cn('operate-date')}>{cardData.date}</span>
        <div className={cn('operate-main-unit')}>
          <div className={cn('wonder-wrap')}>
            <strong className="doa-main-unit">{cardData.mainUnit}</strong>
          </div>
          <Tag size="xs" type="primary" bg color="positive">
            +9.66%
          </Tag>
        </div>
      </div>
      <span className={cn('operate-notice')}>{t('daoHistory.balanceAmount', { wonder: cardData.wonder, Gwonder: cardData.gwonder })}</span>

      <dl className={cn('operate-sub-area')}>
        <div className={cn('sub-unit-wrap')}>
          <dt className={cn('sub-unit-title')}>Wonder</dt>
          <dd className={cn('sub-unit-text')}>
            <em>{cardData.wonder}</em>
            WDR
          </dd>
        </div>
        <div className={cn('sub-unit-wrap')}>
          <dt className={cn('sub-unit-title')}>g.Wonder</dt>
          <dd className={cn('sub-unit-text')}>
            <em>{cardData.gwonder}</em>
            g.WDR
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default MypageCard;
