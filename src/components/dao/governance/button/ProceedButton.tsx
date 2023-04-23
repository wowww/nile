import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { wonderProposalAtom } from "@/state/governanceAtom";

import { useWonder } from '@/hook/useWonder';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import BgButton from '@components/button/BgButton';
import cn from 'classnames';

const ProceedButton = () => {
  const { t } = useTranslation('dao');
  const proposal = useAtomValue(wonderProposalAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const { wonderDao } = useWonder();

  return (
    <>
      {proposal?.userAddress?.toLowerCase() === nileWallet?.toLowerCase() ? (
        <BgButton buttonText={t('vote.GovernanceVote.proceed')} color="highlight" size="xl" href={`/dao/wonder/governance/create/${proposal?.proposalId}`}/>
      ) : (
        <div className={cn('on-call')}>{t('vote.GovernanceVote.proceedOnCall')}</div>
      )}
    </>
  );
};

export default ProceedButton;
