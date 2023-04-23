import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { DaoBoxTitle } from '@/components/dao/ui/DaoBoxLayout';
import DaoTrustGraph from '@/components/dao/ui/trust/DaoTrustGraph';
import DaoTrustTab from '@/components/dao/ui/trust/DaoTrustTab';
import { ReactSVG } from 'react-svg';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const DaoTrust = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('dao-trust-wrap')}>
      <DaoBoxTitle title={t('trust.title')} desc={t('trust.desc', { type: useDaoCharacterConvert(activeDao.value) })} type="img">
        <div className={cn('img-wrap')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_trust.svg" />
        </div>
      </DaoBoxTitle>
      <DaoTrustGraph />
      <DaoTrustTab />
    </div>
  );
};

export default DaoTrust;
