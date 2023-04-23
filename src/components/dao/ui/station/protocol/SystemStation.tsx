/* 23.02.16 수정 start: 다오 테마 텍스트 관련 추가 */
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
/* 23.02.16 수정 end: 다오 테마 텍스트 관련 추가 */
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

const SystemStation = () => {
  const { t } = useTranslation('dao');
  /* 23.02.16 수정: 다오 테마 텍스트 관련 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.station.title1')}</dt>
        <dd>{t('station.operationSystem.station.desc1')}</dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.station.title2')}</dt>
        <dd>
          {t('station.operationSystem.station.desc2')}
          <ul>
            <li>{t('station.operationSystem.station.item.0.text')}</li>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.station.item.1.title')}
              <ul>
                <li>{t('station.operationSystem.station.item.1.list.0.text')}</li>
                {/* 모집 결과 시 노출 */}
                <li>
                  {t('station.operationSystem.station.item.1.list.1.text')}
                  <ul>
                    <li>
                      {t('station.operationSystem.station.item.1.list.1.desc', {
                        amount: '1,500,000.0000',
                        volume: '1,000,000',
                        date: '2022-10-01 11:30',
                        /* 23.02.16 수정: 다오 테마 텍스트 관련 추가 */
                        type: useDaoCharacterConvert(activeDao.value),
                      })}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.station.item.2.title')}
              <ul>
                <li>{t('station.operationSystem.station.item.2.list.0.text')}</li>
                {/* 23.02.16 수정: 다오 테마 텍스트 관련 추가 */}
                <li> {t('station.operationSystem.station.item.2.list.1.text', { type: useDaoCharacterConvert(activeDao.value) })}</li>
                {/* 추가 모집 완료 후 노출 */}
                <li>
                  {t('station.operationSystem.station.item.2.list.2.text')}
                  <ul>
                    <li>
                      {t('station.operationSystem.station.item.2.list.2.desc', {
                        amount: '1,500,000.0000',
                        volume: '1,000,000',
                        date: '2022-10-01 11:30',
                        /* 23.02.16 수정: 다오 테마 텍스트 관련 추가 */
                        type: useDaoCharacterConvert(activeDao.value),
                      })}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  );
};

export default SystemStation;
