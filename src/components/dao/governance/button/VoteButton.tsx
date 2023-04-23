import BgButton from '@components/button/BgButton';
import React, { useEffect, useMemo, useState } from 'react';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { useAtomValue } from 'jotai';
import { useWonder } from '@/hook/useWonder';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { wonderProposalAtom } from '@/state/governanceAtom';

const DaoVoteModal = dynamic(() => import('@components/modal/DaoVoteModal'), { ssr: false });

const VoteButton = () => {
  const { wonderDao } = useWonder();
  const { t } = useTranslation(['dao', 'common']);

  const nileWallet = useAtomValue(nileWalletAtom);
  const proposal = useAtomValue(wonderProposalAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [isVoted, setIsVoted] = useState<boolean>();

  useEffect(() => {
    if (!nileWallet) {
      return;
    }
    if (!wonderDao?.daoId) {
      return;
    }
    if (!proposal?.proposalId) {
      return;
    }

    const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

    contract?.methods.isVoted(wonderDao?.daoId, proposal?.proposalId, nileWallet).call(function (err: any, res: any) {
      setIsVoted(res);
    });
  }, [wonderDao, proposal, nileWallet]);

  const buttonText = useMemo(() => {
    if (isVoted) {
      return t('vote.GovernanceVote.addVote');
    }
    return t('vote.GovernanceVote.beVote');
  }, [isVoted]);

  return (
    <>
      <BgButton buttonText={buttonText} color="highlight" size="xl" onClick={() => setIsOpen(true)} />
      <DaoVoteModal
        isModal={isOpen}
        setIsModal={setIsOpen}
        desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
        state={isVoted ? 'addVote' : undefined}
      />
    </>
  );
};

export default VoteButton;
