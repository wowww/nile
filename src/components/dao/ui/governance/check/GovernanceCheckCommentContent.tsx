import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';
const GovernanceCheckCommentContent = () => {
  const { t } = useTranslation(['dao']);
  return (
    <div className={cn('dao-check-content')}>
      <strong>{t('governance.checkContent.title')}</strong>
      <p>
        This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and
        budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here:
        <a href="https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid commodi aut ullam accusamus est maxime repellat! Ea odio aut officiis nam
          eum alias in laborum, dolorem qui ad libero sunt.
        </a>
        <br />
        <br />
        The GPC is seeking the following funding: Season 15 Total Need: $983,429 (413,206 GTC) 60 day reserves*: $462,085 (194,154 GTC) Amount
        Requested from Treasury $1,445,514 (607,360 GTC) *60 day reserves are calculated only against the contributor compensation and payroll related
        OpEx.
        <br />
        <br />
        <a href="https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request">Proposal link</a>
        <br />
        <br />
        Note: The GTC amounts above were adjusted based on the current market value at the time this proposal was moved to Snapshot. The vote will be
        to send $ in GTC when moved to Tally at the then current price or the 20 day moving average (whichever is lower). Thank you all for voting!
      </p>
    </div>
  );
};
export default React.memo(GovernanceCheckCommentContent);
