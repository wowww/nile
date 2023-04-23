import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Modal, Radio, RadioChangeEvent } from 'antd';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';

import BgButton from '@/components/button/BgButton';
import { ReactSVG } from 'react-svg';
import DaoStakeModalBanner from '@/components/modal/DaoStakeModalBanner';
import Tag from '@/components/tag/Tag';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { useWonder } from '@/hook/useWonder';
import DaoInput from '@components/dao/common/input/DaoInput';
import { fromWei, toWei } from 'web3-utils';
import { wonderProposalAtom } from '@/state/governanceAtom';
import { VoteType } from '@/types/dao/proposal.types';
import { TOKEN_MAX_APPROVE_AMOUNT, waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { daoContractsAtom } from '@/state/web3Atom';
import CoinApproveModal from '@components/modal/CoinApproveModal';
import { useNumberFormatter } from '@utils/formatter/number';
import { useWemixWalletProvider } from '@components/wemix';

declare const StateType: 'vote' | 'addVote';

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  desc: string;
  state?: typeof StateType;
}

const imgRoot = 'https://nile.blob.core.windows.net/images/assets/images/icon/';

const DaoVoteModal: React.FC<Props> = ({
  isModal, // 팝업 on, off value
  setIsModal, // 팝업 on, off setState
  desc, // 좌측 배너 영역 설명 문구
  state, // vote 투표하기, addVote 추가투표하기
}) => {
  const { t } = useTranslation('dao');
  const { wonderDao } = useWonder();
  const { toFix } = useNumberFormatter();
  const { openApp } = useWemixWalletProvider();

  const daoContracts = useAtomValue(daoContractsAtom);
  const activeDao = useAtomValue(daoThemeAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const proposal = useAtomValue(wonderProposalAtom);

  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState<boolean>(false);

  const [step, setStepCount] = useState<number>(1);
  const [amount, setAmount] = useState<string>();

  const [opinion, setOpinion] = useState<VoteType>();

  const [isVoted, setIsVoted] = useState<boolean>();

  const [usedGasFee, setUsedGasFee] = useState<number>();

  useEffect(() => {
    checkApproved();
  }, []);

  const checkApproved = useCallback(async () => {
    if (nileWallet && wonderDao?.dtAddress) {
      const contract = new provider.web3.eth.Contract(daoAbis.DaoToken, wonderDao?.gtAddress);

      contract?.methods
        .allowance(nileWallet, daoJsonAbiAddress().current.DaoRouter)
        .call()
        .then((maxAmount: string) => {
          setIsApproved(maxAmount === TOKEN_MAX_APPROVE_AMOUNT);
        });
    }
  }, [nileWallet, wonderDao]);

  const sendApproved = async () => {
    const contract = new provider.web3.eth.Contract(daoAbis.DaoToken, wonderDao?.gtAddress);
    const data = await contract?.methods.approve(daoJsonAbiAddress().current.DaoRouter, TOKEN_MAX_APPROVE_AMOUNT).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: wonderDao?.gtAddress,
        value: '0',
        data,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (err, hash) => {
        if (err) {
          console.log('error ', err);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              setIsApproved(true);
            }
          });
        }
      },
    );

    openApp();
  };

  const vote = async () => {
    if (!amount || !opinion) return;

    const abi = daoContracts.DaoRouter?.methods.vote(wonderDao?.daoId, proposal?.proposalId, toWei(amount, 'ether'), opinion).encodeABI();
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
      (error, hash) => {
        if (error) {
          console.log('error ', error);
          // setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              setStepCount(2);
              setUsedGasFee(receipt?.cumulativeGasUsed);
            }
          });
        }
      },
    );

    openApp();
  };

  const checkVoted = () => {
    if (!nileWallet) return;
    if (!proposal) return;

    const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

    contract?.methods.isVoted(wonderDao?.daoId, proposal?.proposalId, nileWallet).call(function (err: any, res: any) {
      setIsVoted(res);
    });
  };

  useEffect(() => {
    const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

    if (isVoted) {
      contract?.methods.isSameVote(wonderDao?.daoId, proposal?.proposalId, nileWallet, VoteType.AGREEMENT).call(function (err: any, res: any) {
        setOpinion(res ? VoteType.AGREEMENT : VoteType.OPPOSITE);
      });
    }
  }, [isVoted, wonderDao, proposal, nileWallet]);

  const refresh = () => {
    if (!nileWallet) {
      return;
    }
    if (!wonderDao?.daoId) {
      return;
    }

    // if (wonderDao?.gtAddress) {
    //   const contract = new provider.web3.eth.Contract(daoAbis.DaoToken, wonderDao?.gtAddress);
    //
    //   contract?.methods.balanceOf(nileWallet).call((err: any, res: any) => {
    //     setBalance({ gWonder: fromWei(res, 'ether') });
    //   });
    // }
  };

  useEffect(() => {
    checkVoted();
    refresh();
  }, [nileWallet, wonderDao, proposal]);

  const onCancel = () => {
    Modal.destroyAll();
    setIsModal(false);
    setStepCount(1);
    setOpinion(undefined);
    setAmount(undefined);
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setOpinion(e.target.value);
  };

  const onClickVote = useCallback(async () => {
    if (isApproved) {
      await vote();
    } else {
      setIsApprovedModalOpen(true);
    }
  }, [isApproved]);

  return (
    <>
      <Modal
        wrapClassName={`dao-stake-modal ${step === 2 ? 'result' : 'process'} ${step !== 2 && state === 'vote' ? 'vote' : 'addVote'} step${step}`}
        className={cn('dao-station-modal vote')}
        open={isModal}
        onCancel={onCancel}
        centered={true}
        destroyOnClose={true}
        width={'none'}
        closeIcon={<ReactSVG src={`${imgRoot}ico_close.svg`} />}
        footer={false}
      >
        <DaoStakeModalBanner desc={desc} />
        <div className={cn('contents-block')}>
          {
            {
              1: (
                <>
                  <div className={cn('modal-header')}>
                    <h3 className={cn('title')}>{!isVoted ? t('vote.modal.vote1') : t('vote.modal.addVote1')}</h3>
                  </div>
                  <div className={cn('modal-body')}>
                    <div className={cn('dao-stake-modal-inner')}>
                      <div className={cn('stake-modal-content')}>
                        <p className={cn('vote-info')}>{t('vote.modal.infoText')}</p>
                        {!isVoted ? (
                          <Radio.Group className={cn('vote-radio')} onChange={onChangeRadio} value={opinion} buttonStyle="solid">
                            <Radio.Button value={VoteType.AGREEMENT}>
                              <span className={cn('icd-icon')}>
                                <ReactSVG src={`${imgRoot}ico_dao_o.svg`} /> {t('vote.modal.agreement')}
                              </span>
                            </Radio.Button>
                            <Radio.Button value={VoteType.OPPOSITE}>
                              <span className={cn('icd-icon')}>
                                <ReactSVG src={`${imgRoot}ico_dao_x.svg`} /> {t('vote.modal.opposition')}
                              </span>
                            </Radio.Button>
                          </Radio.Group>
                        ) : (
                          <div className={cn('prev-vote-wrap')}>
                            <h4 className={cn('stake-confirm-title')}>{t('vote.modal.voteAmountInfo')}</h4>
                            <div className={cn('prev-vote')}>
                              <span>
                                {opinion === VoteType.AGREEMENT ? (
                                  <>
                                    <ReactSVG src={`${imgRoot}ico_dao_o.svg`} /> {t('vote.modal.agreement')}
                                  </>
                                ) : (
                                  <>
                                    <ReactSVG src={`${imgRoot}ico_dao_x.svg`} /> {t('vote.modal.opposition')}
                                  </>
                                )}
                              </span>
                              <div className={cn('input-unit')}>
                                <input type="text" value={'12,123,123'} readOnly />
                                <span className={cn('unit')}>
                                  {t(`unit2`, {
                                    ns: 'dao',
                                    keyPrefix: `amountUnit.${activeDao.value}`,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <h4 className={cn('stake-confirm-title')}>{t('vote.modal.voteUseInfo', { type: activeDao.value })}</h4>
                        <DaoInput
                          title={isVoted ? t('vote.modal.voteAmount') : t('vote.modal.voteAddAmount')}
                          value={amount}
                          setValue={setAmount}
                          type="gWonder"
                          desc={isVoted ? t('vote.modal.ConsensusCheck') : undefined}
                        />
                        <span className={cn('vote-wdr-info')}>{t('vote.modal.voteGasFeeInfo')}</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn('modal-footer')}>
                    {!isVoted ? (
                      <BgButton
                        buttonText={isApproved ? t('vote.modal.vote2') : t('approveButton', { ns: 'common' })}
                        color="black"
                        size="md"
                        onClick={onClickVote}
                        disabled={!opinion || !amount || Number(amount) <= 0}
                      />
                    ) : (
                      <BgButton
                        buttonText={t('vote.modal.addVote2')}
                        color="black"
                        size="md"
                        onClick={onClickVote}
                        disabled={!amount || Number(amount) <= 0}
                      />
                    )}
                  </div>
                </>
              ),
              2: (
                <>
                  <div className={cn('modal-body none-header')}>
                    <div className={cn('modal-body-inner')}>
                      <div className={cn('dao-stake-modal-inner')}>
                        <div className={cn('summary')}>
                          <div>
                            <div className={cn('summary-header')}>
                              <ReactSVG
                                src={
                                  opinion === VoteType.AGREEMENT ? `${imgRoot}ico_dao_vote_complete_o.svg` : `${imgRoot}ico_dao_vote_complete_x.svg`
                                }
                              />
                              <strong>{t('vote.modal.voteComplete')}</strong>
                            </div>
                            <div className={cn('summary-info')}>
                              <div className={cn('info-row')}>
                                <Tag size="s" color={opinion === VoteType.AGREEMENT ? 'primary' : 'dark-gray'}>
                                  {opinion === VoteType.AGREEMENT ? t('vote.modal.agreement') : t('vote.modal.opposition')}
                                </Tag>
                                <span className={cn('figure')}>
                                  {toFix(Number(amount))}
                                  <span className={cn('unit')}>
                                    {t(`unit2`, {
                                      ns: 'dao',
                                      keyPrefix: `amountUnit.${activeDao.value}`,
                                    })}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <StakeList>
                            <div>
                              <dt>{t('vote.modal.gasFee')}</dt>
                              <dd>
                                <strong>{fromWei(String(usedGasFee ?? 0), 'ether')}</strong>
                                <span>WEMIX</span>
                              </dd>
                            </div>
                          </StakeList>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cn('modal-footer')}>
                    <BgButton buttonText={t('vote.modal.complete')} color="black" size="md" onClick={onCancel} key="approve" />
                  </div>
                </>
              ),
            }[step]
          }
        </div>
      </Modal>
      <CoinApproveModal
        isOpen={isApprovedModalOpen}
        setIsOpen={setIsApprovedModalOpen}
        isApproved={isApproved}
        onClickNext={() => {
          setIsApprovedModalOpen(false);
        }}
        coins={[
          {
            iconType: 'g.wonder',
            symbol: 'g.WONDER',
            onClickApprove: () => sendApproved(),
          },
        ]}
      />
    </>
  );
};

// stake bg box list
const StakeList = ({
  title = undefined,
  type = 'default',
  children,
}: {
  title?: string;
  type?: 'important' | 'default';
  children: React.ReactNode;
}) => {
  return (
    <div className={cn('stake-modal-list', type)}>
      {type !== 'important' ? (
        <>
          {title !== undefined && <strong className={cn('title')}>{title}</strong>}
          <dl>{children}</dl>
        </>
      ) : (
        <dl>{children}</dl>
      )}
    </div>
  );
};

export default DaoVoteModal;
