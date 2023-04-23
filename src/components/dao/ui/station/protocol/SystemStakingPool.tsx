import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';

import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const SystemStakingPool = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.stakingPool.title1')}</dt>
        <dd>{t('station.operationSystem.stakingPool.desc1', { type: useDaoCharacterConvert(activeDao.value) })}</dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.stakingPool.title2')}</dt>
        <dd>
          {t('station.operationSystem.stakingPool.item.0.text', { type: useDaoCharacterConvert(activeDao.value) })}
          <ul>
            <li>{t('station.operationSystem.stakingPool.item.0.list.0.text', { type: useDaoCharacterConvert(activeDao.value) })}</li>
            <li>{t('station.operationSystem.stakingPool.item.0.list.1.text', { type: useDaoCharacterConvert(activeDao.value) })}</li>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.stakingPool.item.0.list.2.text')}
              <ul>
                <li>
                  <Trans
                    i18nKey="station.operationSystem.stakingPool.item.0.list.2.desc"
                    ns="dao"
                    values={{
                      strong1: '1: 1.4123',
                      date: '2022-10-01 11:30',
                    }}
                  >
                    <strong className={cn('important')}></strong>
                  </Trans>
                </li>
              </ul>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  );
};

export default SystemStakingPool;
