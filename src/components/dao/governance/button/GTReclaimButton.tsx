import BgButton from '@components/button/BgButton';
import { useTranslation } from 'next-i18next';
import { useWonder } from '@/hook/useWonder';
import { useAtomValue } from 'jotai';
import { wonderProposalAtom } from "@/state/governanceAtom";

import { daoContractsAtom } from '@/state/web3Atom';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { toWei } from 'web3-utils';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { daoJsonAbiAddress } from '@/web3/abis/dao';

const GTReclaimButton = () => {
  const { t } = useTranslation('dao');
  const reclaimComplete = false;
  const { wonderDao } = useWonder();
  const daoContracts = useAtomValue(daoContractsAtom);
  const proposal = useAtomValue(wonderProposalAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const reclaimGT = async () => {
    const abi = daoContracts.DaoRouter?.methods.reclaimGT(wonderDao?.daoId, proposal?.proposalId).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: daoJsonAbiAddress().current.DaoRouter,
        value: '0',
        data: abi,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error: Error, hash: string) => {
        if (error) {
          console.log('error ', error);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              console.log('success ', receipt);
            }
          });
        }
      },
    );
  };

  return (
    <BgButton
      buttonText={reclaimComplete ? t('vote.GovernanceVote.gWONDERReclaimcomplete') : t('vote.GovernanceVote.gWONDERReclaim')}
      color="highlight"
      size="xl"
      disabled={reclaimComplete}
      onClick={reclaimGT}
    />
  );
};

export default GTReclaimButton;
