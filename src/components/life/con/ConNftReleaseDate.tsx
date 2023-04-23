import { conTypeAtom } from '@/state/daoAtom';
import cn from 'classnames';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import getReleaseDate from './releaseStore';

const ConNftReleaseDate = () => {
  const [activeConType, _] = useAtom(conTypeAtom);
  const { t } = useTranslation('life', { keyPrefix: `con.nft.${activeConType}.release` });

  return (
    <div className={cn('life-nft-section release-date')}>
      <h2 className={cn('title')}>Release Date</h2>
      {/* 23.03.14 수정: description 추가 */}
      <span className={cn('desc')}>* {t('desc')}</span>
      <ul className={cn('release-list-wrap')}>
        {getReleaseDate(activeConType, t).map((dateData, dIndex) => {
          return (
            <li key={dIndex}>
              <strong className={cn('date')}>{dateData.date}</strong>
              <dl className={cn('detail-date-wrap')}>
                {dateData.detail.map((detailData, detailIndex) => {
                  return (
                    <div className={cn('date-wrap')} key={detailIndex}>
                      <dt className={cn('time')}>{detailData.time}</dt>
                      <dd className={cn('label')}>{detailData.label}</dd>
                    </div>
                  );
                })}
              </dl>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConNftReleaseDate;
