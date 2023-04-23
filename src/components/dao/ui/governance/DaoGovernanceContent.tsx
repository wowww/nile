import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import { DaoBoxTitle } from '@/components/dao/ui/DaoBoxLayout';
import GovernanceTab from '@/components/dao/ui/governance/contents/GovernanceTab';
import DaoGovernanceStatusBoard from '@/components/dao/ui/governance/DaoGovernanceStatusBoard';
import TrustCheckSlide from '@/components/dao/ui/governance/TrustCheckSlide';

import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
export const DaoTreasuryContent = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('dao-governance-wrap')}>
      <DaoBoxTitle title={t('governance.title')} desc={t('governance.desc', { type: useDaoCharacterConvert(activeDao.value) })} type="img">
        <div className={cn('img-wrap')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_governance.svg" />
        </div>
      </DaoBoxTitle>
      <DaoGovernanceStatusBoard />
      {/* 긴급 안건 Trust Check 케이스 */}
      <TrustCheckSlide />
      <GovernanceTab />
    </div>
  );
};

export default DaoTreasuryContent;
