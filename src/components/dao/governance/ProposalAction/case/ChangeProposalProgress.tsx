import { useState } from 'react';
import ProposalChangeForm from '../ProposalChangeForm';
import { useTranslation } from 'next-i18next';

const ChangeTreasuryCurrency = () => {
  const { t } = useTranslation('dao');

  const [sliderValue, setSliderValue] = useState<number>(50);
  return (
    <>
      <ProposalChangeForm
        subject={t('governance.proposal.action.cases.infoTitle.10')}
        category="Consensus check"
        initValue={3}
        category2="Governance proposal"
        initValue2={7}
        unit={t('governance.proposal.action.cases.infoContent.23')}
        type="2"
      />
      <ProposalChangeForm
        subject={t('governance.proposal.action.cases.infoTitle.11')}
        category={t('governance.proposal.action.cases.infoContent.22')}
        initValue={10.0}
        unit={'%'}
        type="3"
      />
      <ProposalChangeForm
        subject={t('governance.proposal.action.cases.infoTitle.12')}
        category="Consensus check"
        initValue={8.8}
        category2="Governance proposal"
        initValue2={9.6}
        unit={'%'}
        type="4"
      />
      <ProposalChangeForm
        subject={t('governance.proposal.action.cases.infoTitle.13')}
        slider
        unit=""
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
    </>
  );
};

export default ChangeTreasuryCurrency;
