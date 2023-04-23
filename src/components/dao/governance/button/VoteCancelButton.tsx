import OutlineButton from '@components/button/OutlineButton';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import BgButton from '@components/button/BgButton';
import dynamic from 'next/dynamic';
import { useAtomValue } from 'jotai';
import { daoContractsAtom } from '@/state/web3Atom';
import { useWonder } from '@/hook/useWonder';
import { wonderProposalAtom } from '@/state/governanceAtom';

import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { daoJsonAbiAddress } from '@/web3/abis/dao';
import { toWei } from 'web3-utils';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
/* 23.04.18 수정: 토스트 팝업 추가 */
import { message } from 'antd';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

const VoteCancelButton = () => {
  const { t } = useTranslation('dao');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const daoContracts = useAtomValue(daoContractsAtom);
  const { wonderDao } = useWonder();
  const proposal = useAtomValue(wonderProposalAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const cancel = async () => {
    /* 23.04.18 수정: 투표 취소 확인 시 뜨는 토스트 팝업 추가 */
    message.info({
      content: t('vote.GovernanceVote.voteCancelToast', { type: 100 }),
      key: 'toast',
    });
    if (!wonderDao?.id || !proposal?.proposalId) return;
    const abi = daoContracts.DaoRouter?.methods.cancel(wonderDao?.daoId, proposal?.proposalId).encodeABI();
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
          setIsOpen(false);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              console.log('success ', receipt);
              setIsOpen(false);
            }
          });
        }
      },
    );
  };

  return (
    <>
      <OutlineButton buttonText={t('vote.GovernanceVote.voteCancel')} color="highlight" size="xl" onClick={() => setIsOpen(true)} />
      <ModalLayout
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="sm"
        title={t('governance.smallPopup.cancelVote.title')}
        footer={true}
        destroyOnClose={true}
        wrapClassName="dao-governance-proposal-vote-cancel-modal"
        footerContent={[
          <OutlineButton buttonText={t('governance.smallPopup.btn.no')} color="black" size="md" onClick={() => setIsOpen(false)} key="cancel" />,
          <BgButton buttonText={t('governance.smallPopup.btn.yes')} color="black" size="md" key="Save" onClick={cancel} />,
        ]}
      >
        <p>{t('governance.smallPopup.cancelVote.desc')}</p>
      </ModalLayout>
    </>
  );
};

export default VoteCancelButton;
