import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const SystemTrust = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.trust.title1')}</dt>
        <dd>{t('station.operationSystem.trust.desc1', { type: useDaoCharacterConvert(activeDao.value) })}</dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.trust.title2')}</dt>
        <dd>
          {t('station.operationSystem.trust.item.0.text')}
          <ul>
            <li>{t('station.operationSystem.trust.item.0.list.0.text')}</li>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.trust.item.0.list.1.text')}
              <ul>
                <li>
                  {t('station.operationSystem.trust.item.0.list.1.list2.0.text')}
                  <ul>
                    <li>
                      {t('station.operationSystem.trust.item.0.list.1.list2.0.list3.0.text', { business: '{ 사업명 1 }' })}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.trust.item.0.list.1.list2.0.list3.0.desc"
                            ns="dao"
                            values={{
                              strong1: '50% : 50%',
                              strong2: '3%',
                              date: '2022-10-01 11:30',
                              type: useDaoCharacterConvert(activeDao.value),
                            }}
                          >
                            <strong className={cn('important')}></strong>
                            <strong className={cn('important')}></strong>
                          </Trans>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {t('station.operationSystem.trust.item.0.list.1.list2.0.list3.0.text', { business: '{ 사업명 2 }' })}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.trust.item.0.list.1.list2.0.list3.0.desc"
                            ns="dao"
                            values={{
                              strong1: '60% : 40%',
                              strong2: '2%',
                              date: '2022-10-01 11:30',
                              type: useDaoCharacterConvert(activeDao.value),
                            }}
                          >
                            <strong className={cn('important')}></strong>
                            <strong className={cn('important')}></strong>
                          </Trans>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {t('station.operationSystem.trust.item.0.list.1.list2.0.list3.0.text', { business: '{ 사업명 3 }' })}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.trust.item.0.list.1.list2.0.list3.0.desc"
                            ns="dao"
                            values={{
                              strong1: '35% : 65%',
                              strong2: '2%',
                              date: '2022-10-01 11:30',
                              type: useDaoCharacterConvert(activeDao.value),
                            }}
                          >
                            <strong className={cn('important')}></strong>
                            <strong className={cn('important')}></strong>
                          </Trans>
                        </li>
                      </ul>
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

export default SystemTrust;
