import { forwardRef } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
/* 23.02.23 수정: useAtomValue, daoThemeAtom 추가 */
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const DaoStationRecruit = forwardRef((props, ref: any) => {
  const { t } = useTranslation(['daoHome', 'dao']);
  /* 23.02.23 수정: daoThemeAtom 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('check-item-wrap', 'station-check')} id="recruitment-information" ref={ref}>
      <div className={cn('check-item', 'recruit')}>
        <div className={cn('title-wrap')}>
          <h3 className={cn('title')}>{t('check.recruit.title')}</h3>
        </div>
        <div className={cn('list-wrapper')}>
          <ul className={cn('list-wrap')}>
            <li>
              <span className={cn('text-wrap')}>
                <strong className={cn('name')}>{t('check.recruit.item.0.name')}</strong>
                <span className={cn('value')}>{t('check.recruit.item.0.value')}</span>
              </span>
            </li>
            <li>
              <span className={cn('text-wrap')}>
                <strong className={cn('name')}>{t('check.recruit.item.1.name')}</strong>
                <span className={cn('value')}>WEMIX</span>
              </span>
            </li>
            <li>
              <span className={cn('text-wrap')}>
                <strong className={cn('name')}>{t('check.recruit.item.2.name')}</strong>
                <span className={cn('value')}>
                  10 <span className={cn('unit')}>WEMIX</span>
                </span>
              </span>
            </li>
            <li>
              <span className={cn('text-wrap')}>
                <strong className={cn('name')}>{t('check.recruit.item.3.name')}</strong>
                <span className={cn('value')}>{t('check.recruit.item.3.value')}</span>
              </span>
            </li>
            <li>
              <span className={cn('text-wrap')}>
                <strong className={cn('name')}>{t('check.recruit.item.4.name')}</strong>
                <span className={cn('value')}>
                  1,500,010 <span className={cn('unit')}>WEMIX</span>
                </span>
                <span className={cn('sub')}>{t('check.recruit.item.4.sub')}</span>
              </span>
            </li>
            <li>
              <span className={cn('text-wrap')}>
                <strong className={cn('name')}>{t('check.recruit.item.5.name')}</strong>
                {/* 23.02.23 수정: WDR 티커 단위 다국어 처리 */}
                <span className={cn('value')}>
                  1<span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                  <span className={cn('icon-wrap')}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_recruit_equal_2.svg" />
                  </span>
                  1 <span className={cn('unit')}>WEMIX</span>
                </span>
              </span>
            </li>
          </ul>
        </div>
        <ul className={cn('caution-list-wrap')}>
          {/* 모집전 화면만 caution.2 나타남 */}
          <li>
            <p className={cn('desc')}>{t('check.recruit.caution.2')}</p>
          </li>
          <li>
            <p className={cn('desc')}>{t('check.recruit.caution.1')}</p>
          </li>
          <li>
            <p className={cn('desc')}>{t('check.recruit.caution.0')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default DaoStationRecruit;
