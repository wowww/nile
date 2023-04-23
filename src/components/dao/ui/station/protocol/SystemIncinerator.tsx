import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const SystemIncinerator = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.incinerator.title1')}</dt>
        <dd>{t('station.operationSystem.incinerator.desc1', { type: useDaoCharacterConvert(activeDao.value) })}</dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.incinerator.title2')}</dt>
        <dd>
          {t('station.operationSystem.incinerator.item.0.text', { type: useDaoCharacterConvert(activeDao.value) })}
          <ul>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.incinerator.item.0.list.0.text', { type: useDaoCharacterConvert(activeDao.value) })}
              <ul>
                <li>
                  {t('station.operationSystem.incinerator.item.0.list.0.list2.0.text')}
                  <ul>
                    <li>
                      {t('station.operationSystem.incinerator.item.0.list.0.list2.0.list3.0.text', {
                        business: '사업명 1',
                      })}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.incinerator.item.0.list.0.list2.0.list3.0.desc"
                            ns="dao"
                            values={{
                              strong1: '40% : 60%',
                              date: '2022-10-01 11:30',
                            }}
                          >
                            <strong className={cn('important')}></strong>
                          </Trans>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {t('station.operationSystem.incinerator.item.0.list.0.list2.0.list3.0.text', { business: '사업명 2' })}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.incinerator.item.0.list.0.list2.0.list3.0.desc"
                            ns="dao"
                            values={{
                              strong1: '40% : 60%',
                              date: '2022-10-01 11:30',
                            }}
                          >
                            <strong className={cn('important')}></strong>
                          </Trans>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {t('station.operationSystem.incinerator.item.0.list.0.list2.0.list3.0.text', { business: '사업명 3' })}
                      <ul>
                        <li>
                          <Trans
                            i18nKey="station.operationSystem.incinerator.item.0.list.0.list2.0.list3.0.desc"
                            ns="dao"
                            values={{
                              strong1: '40% : 60%',
                              date: '2022-10-01 11:30',
                            }}
                          >
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

export default SystemIncinerator;
