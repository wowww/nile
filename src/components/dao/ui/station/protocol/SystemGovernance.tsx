import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const SystemGovernance = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('protocol-system-content')}>
      <dl>
        <dt>{t('station.operationSystem.governance.title1')}</dt>
        <dd>{t('station.operationSystem.governance.desc1', { type: useDaoCharacterConvert(activeDao.value) })}</dd>
      </dl>
      <dl>
        <dt>{t('station.operationSystem.governance.title2')}</dt>
        <dd>
          {t('station.operationSystem.governance.item.0.text')}
          <ul>
            <li className={cn('has-depth2')}>
              {t('station.operationSystem.governance.item.0.list.0.text')}
              <ul>
                <li>
                  {t('station.operationSystem.governance.item.0.list.0.list2.0.text')}
                  <ul>
                    <li>{t('station.operationSystem.governance.item.0.list.0.list2.0.desc1')}</li>
                  </ul>
                </li>
                <li>
                  {t('station.operationSystem.governance.item.0.list.0.list2.1.text')}
                  <ul>
                    <li>{t('station.operationSystem.governance.item.0.list.0.list2.1.desc1')}</li>
                    <li>{t('station.operationSystem.governance.item.0.list.0.list2.1.desc2')}</li>
                  </ul>
                </li>
                <li>
                  {t('station.operationSystem.governance.item.0.list.0.list2.2.text')}
                  <ul>
                    <li>{t('station.operationSystem.governance.item.0.list.0.list2.2.desc1')}</li>
                    <li>{t('station.operationSystem.governance.item.0.list.0.list2.2.desc2')}</li>
                  </ul>
                </li>
                <li>
                  {t('station.operationSystem.governance.item.0.list.0.list2.3.text')}
                  <ul>
                    <li>{t('station.operationSystem.governance.item.0.list.0.list2.3.desc1', { type: useDaoCharacterConvert(activeDao.value) })}</li>
                  </ul>
                </li>
                <li>
                  {t('station.operationSystem.governance.item.0.list.0.list2.4.text')}
                  <ul>
                    <li>{t('station.operationSystem.governance.item.0.list.0.list2.4.desc1')}</li>
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

export default SystemGovernance;
