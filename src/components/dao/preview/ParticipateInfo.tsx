import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';

import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

const ParticipateInfo = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('participate-info-wrap')}>
      <div className={cn('check-item-wrap', 'station-check')} id="recruitment-information">
        <div className={cn('check-item', 'recruit')}>
          <div className={cn('station-title-wrap')}>
            <div className={cn('title-inner')}>
              <strong className={cn('title')}>{t('station.participate.title')}</strong>
            </div>
          </div>
          <div className={cn('list-wrapper')}>
            <ul className={cn('list-wrap')}>
              <li>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('station.participate.item.0.name')}</strong>
                  <span className={cn('value')}>{t('station.participate.item.0.value')}</span>
                </span>
              </li>
              <li>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('station.participate.item.1.name')}</strong>
                  <span className={cn('value')}>WEMIX</span>
                </span>
              </li>
              <li>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('station.participate.item.2.name')}</strong>
                  <span className={cn('value')}>
                    1,700,010<span className={cn('unit')}>WEMIX</span>
                  </span>
                </span>
              </li>
              <li>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('station.participate.item.3.name')}</strong>
                  <span className={cn('value')}>10 WEMIX {t('station.participate.item.3.value')}</span>
                </span>
              </li>
              <li>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('station.participate.item.4.name', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
                  <span className={cn('value')}>
                    1,700,010
                    <span className={cn('unit')}>
                      {t('unit1', {
                        ns: 'dao',
                        keyPrefix: `amountUnit.${activeDao.value}`,
                      })}
                    </span>
                  </span>
                </span>
              </li>
              <li>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('station.participate.item.5.name', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
                  {/* 23.02.23 수정: WDR 티커 단위 다국어 처리 */}
                  <span className={cn('value')}>
                    1<span className={cn('unit')}>WEMIX</span>
                    <span className={cn('icon-wrap')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_recruit_equal_2.svg" />
                    </span>
                    1
                    <span className={cn('unit')}>
                      {t('unit1', {
                        ns: 'dao',
                        keyPrefix: `amountUnit.${activeDao.value}`,
                      })}
                    </span>
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <ul className={cn('caution-list-wrap')}>
            <li className={cn('dot-style')}>
              <span>{t('station.participate.caution.4.text', { type: useDaoCharacterConvert(activeDao.value) })}</span>
              <ul>
                <li>
                  {t('station.participate.caution.4.1', {
                    type: useDaoCharacterConvert(activeDao.value),
                    unit: t(`amountUnit.${activeDao.value}.unit1`),
                    n1: '1,900,010',
                    n2: '1,700,010',
                    n3: '200,000',
                  })}
                </li>
                <li>{t('station.participate.caution.4.2', { n1: '1,700,010', n2: '1,500,010', n3: '200,000' })}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParticipateInfo;
