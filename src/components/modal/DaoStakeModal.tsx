import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Modal, Tabs } from 'antd';
import { useTranslation } from 'next-i18next';
import { useAtomValue, useSetAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { daoContractsAtom } from '@/state/web3Atom';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { TOKEN_MAX_APPROVE_AMOUNT, waitForReceipt } from '@utils/web3Utils';
import { ReactSVG } from 'react-svg';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import DaoStakeModalBanner from '@/components/modal/DaoStakeModalBanner';
import Tag from '@/components/tag/Tag';
import DaoStakeModalInfo from '@components/dao/staking/DaoStakeModalInfo';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { fromWei, toWei } from 'web3-utils';
import { useWonder } from '@/hook/useWonder';
import { TransactionReceipt } from 'web3-core';
import DaoStakeModalContent from '@components/dao/staking/DaoStakeModalContent';
import { useNumberFormatter } from '@utils/formatter/number';
import dynamic from 'next/dynamic';
import { WalletModalType } from '@/types/modal.types';
import RefreshCountdownButton from '@components/button/RefreshCountdownButton';
import {
  refreshWonderDaoStakingPoolSwapAmountAtom,
  refreshWonderObeliskBalanceAtom,
  wonderDaoStakingPoolSwapAmountAtom,
  wonderObeliskBalanceAtom,
} from '@/state/obeliskAtom';
import { useWemixWalletProvider } from '@components/wemix';
import CoinApproveModal from '@components/modal/CoinApproveModal';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: (isModal: boolean) => void;
  desc: string;
}

const imgRoot = 'https://nile.blob.core.windows.net/images/assets/images/icon/';

const DaoStakeModal = ({ isOpen, setIsOpen, desc }: Props) => {
  const { t } = useTranslation('dao');
  const { wonderDao } = useWonder();

  const { toFix } = useNumberFormatter();

  const activeDao = useAtomValue(daoThemeAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const daoContracts = useAtomValue(daoContractsAtom);

  const balance = useAtomValue(wonderObeliskBalanceAtom);
  const swapAmount = useAtomValue(wonderDaoStakingPoolSwapAmountAtom);

  const refreshWonderObeliskBalance = useSetAtom(refreshWonderObeliskBalanceAtom);
  const refreshWonderDaoStakingPoolSwapAmount = useSetAtom(refreshWonderDaoStakingPoolSwapAmountAtom);

  const [currentTab, setCurrentTab] = useState<string>('stake');

  const [stakeValue, setStakeValue] = useState<string>();
  const [unstakeValue, setUnstakeValue] = useState<string>();
  const [step, setStep] = useState<number>(1);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [isWalletModal, setIsWalletModal] = useState<boolean>(false);
  const [walletModalType, setWalletModalType] = useState<WalletModalType>(WalletModalType.APPROVE_WEMIX$);

  const [lockup, setLockup] = useState<boolean>();
  const [gasFee, setGasFee] = useState<number>();

  const { openApp } = useWemixWalletProvider();

  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);
    setStakeValue(undefined);
    setUnstakeValue(undefined);
    setStep(1);
  };

  useEffect(() => {
    if (!wonderDao?.daoId || !nileWallet) return;
    const contract = new provider.web3.eth.Contract(daoAbis.StakingPool, daoJsonAbiAddress().current.StakingPoolProxy);

    contract.methods.isUnstakeable(wonderDao?.daoId, nileWallet).call((err: any, res: any) => {
      setLockup(!res);
    });
    setWalletModalType(WalletModalType.PAYMENT);
  }, [wonderDao, nileWallet]);

  const checkApproved = useCallback(async () => {
    if (currentTab === 'unstake') {
      setIsApproved(true);
      setWalletModalType(WalletModalType.PAYMENT);
      return;
    }
    if (nileWallet) {
      const contract = new provider.web3.eth.Contract(daoAbis.DaoToken, wonderDao?.dtAddress);

      contract?.methods
        .allowance(nileWallet, daoJsonAbiAddress().current.DaoRouter)
        .call()
        .then((maxAmount: string) => {
          setIsApproved(maxAmount === TOKEN_MAX_APPROVE_AMOUNT);
          if (maxAmount === TOKEN_MAX_APPROVE_AMOUNT) {
            setWalletModalType(WalletModalType.PAYMENT);
          }
        });
    }
  }, [nileWallet, wonderDao, currentTab]);

  useEffect(() => {
    if (isOpen) {
      checkApproved();
    } else {
      onCancel();
    }
  }, [isOpen]);

  const hasStakedAmount = useMemo(() => {
    return Number(balance?.stakedWonder) > 0;
  }, [balance?.stakedWonder]);

  const refresh = async () => {
    refreshWonderObeliskBalance();
    refreshWonderDaoStakingPoolSwapAmount();
  };

  const sendApproved = async () => {
    const contract = new provider.web3.eth.Contract(daoAbis.DaoToken, wonderDao?.dtAddress);

    const data = await contract?.methods.approve(daoJsonAbiAddress().current.DaoRouter, TOKEN_MAX_APPROVE_AMOUNT).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: wonderDao?.dtAddress,
        value: '0',
        data,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error: Error, hash: string) => {
        if (error) {
          setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              setIsApproved(true);
              setWalletModalType(WalletModalType.PAYMENT);
            }
          });
        }
      },
    );

    openApp();
  };

  const stake = async () => {
    if (!nileWallet) {
      return;
    }
    setIsWalletModal(true);

    const enterMethodAbi = daoContracts.DaoRouter?.methods.stake(wonderDao?.daoId, toWei(stakeValue ?? '0', 'ether')).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: daoJsonAbiAddress().current.DaoRouter,
        value: '0',
        data: enterMethodAbi,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error: Error, hash: string) => {
        if (error) {
          setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              setGasFee(receipt?.cumulativeGasUsed);
              setIsWalletModal(false);
              setWalletModalType(WalletModalType.APPROVE_WEMIX$);
              setStep(3);
              refresh();
            }
          });
        }
      },
    );

    openApp();
  };

  const unstake = async () => {
    if (!nileWallet) {
      return;
    }

    setIsWalletModal(true);

    const enterMethodAbi = daoContracts.DaoRouter?.methods.unstake(wonderDao?.daoId, toWei(unstakeValue ?? '0', 'ether')).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: daoJsonAbiAddress().current.DaoRouter,
        value: '0',
        data: enterMethodAbi,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error: Error, hash: string) => {
        if (error) {
          setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              setGasFee(receipt?.cumulativeGasUsed);
              setIsWalletModal(false);
              setWalletModalType(WalletModalType.APPROVE_WEMIX$);
              setStep(3);
              refresh();
            }
          });
        }
      },
    );

    openApp();
  };

  const firstStepDisabled = useMemo(() => {
    if (currentTab === 'stake') {
      return !stakeValue || Number(stakeValue) <= 0 || Number(stakeValue) > Number(balance?.wonder);
    }
    return !unstakeValue || Number(unstakeValue) <= 0 || Number(unstakeValue) > Number(balance?.stakedWonder);
  }, [currentTab, stakeValue, unstakeValue, balance]);

  const expectBalance = useMemo(() => {
    if (currentTab === 'stake') {
      return {
        wonder: (Number(balance?.wonder) ?? 0) - Number(stakeValue),
        gWonder: (Number(balance?.gWonder) ?? 0) + Number(swapAmount) + Number(stakeValue),
      };
    }
    return {
      wonder: (Number(balance?.wonder) ?? 0) + Number(swapAmount) + Number(unstakeValue),
      gWonder: (Number(balance?.gWonder) ?? 0) - Number(unstakeValue),
    };
  }, [currentTab, balance, swapAmount, stakeValue, unstakeValue]);

  const confirm = () => {
    if (!isApproved) {
      setIsPendingModal(true);
      return;
    }
    if (currentTab === 'stake') {
      stake();
    } else {
      unstake();
    }
  };

  const resetModal = useCallback(() => {
    setIsErrorModal(false);
    setIsPendingModal(false);
    setIsWalletModal(false);
    setWalletModalType(WalletModalType.APPROVE_WEMIX$);
    setIsOpen(false);
  }, []);

  return (
    <>
      <Modal
        wrapClassName={`dao-stake-modal ${step === 3 ? 'result' : 'process'} ${step !== 3 && hasStakedAmount ? 'stake' : 'add'} step${step}`}
        className={cn('dao-station-modal')}
        open={isOpen}
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
                    <h3 className={cn('title')}>
                      {hasStakedAmount ? 'Manage Staking' : 'Stake'}
                      <RefreshCountdownButton refresh={refresh} />
                    </h3>
                    <ol className={cn('steps')}>
                      <li className={cn('step')} data-num="1"></li>
                      <li className={cn('step')} data-num="2"></li>
                    </ol>
                  </div>
                  <div className={cn('modal-body')}>
                    <div className={cn('dao-stake-modal-inner', lockup && currentTab === 'unstake' && 'rock-up')}>
                      <>
                        {hasStakedAmount ? (
                          <>
                            <DaoStakeModalInfo />
                            <Tabs
                              destroyInactiveTabPane
                              activeKey={currentTab}
                              items={[
                                {
                                  label: 'Add',
                                  key: 'stake',
                                  children: (
                                    <div className={cn('stake-tab-contents')}>
                                      <DaoStakeModalContent type={currentTab} value={stakeValue} setValue={setStakeValue} lockUp={lockup} />
                                    </div>
                                  ),
                                },
                                {
                                  label: 'Unstake',
                                  key: 'unstake',
                                  children: (
                                    <div className={cn('stake-tab-contents')}>
                                      <DaoStakeModalContent type={currentTab} value={unstakeValue} setValue={setUnstakeValue} lockUp={lockup} />
                                    </div>
                                  ),
                                },
                              ]}
                              onTabClick={(key: string) => setCurrentTab(key)}
                              className={cn('tab-type', 'tab-md')}
                            />
                          </>
                        ) : (
                          <>
                            <DaoStakeModalInfo />
                            <DaoStakeModalContent type={'stake'} value={stakeValue} setValue={setStakeValue} lockUp={lockup} />
                          </>
                        )}
                      </>
                    </div>
                  </div>
                  <div className={cn('modal-footer')}>
                    <BgButton
                      buttonText={hasStakedAmount ? (currentTab === 'stake' ? 'Add' : 'Unstake') : 'Stake'}
                      color="black"
                      size="md"
                      onClick={() => setStep(2)}
                      disabled={(currentTab === 'unstake' && lockup) || firstStepDisabled}
                    />
                  </div>
                </>
              ),
              2: (
                <>
                  <div className={cn('modal-header')}>
                    <h3 className={cn('title')}>{currentTab === 'unstake' ? 'Confirm Unstaking' : 'Confirm Staking'}</h3>
                    <ol className={cn('steps')}>
                      <li className={cn('step')} data-num="1"></li>
                      <li className={cn('step')} data-num="2"></li>
                    </ol>
                  </div>
                  <div className={cn('modal-body')}>
                    <div className={cn('dao-stake-modal-inner', lockup && currentTab === 'unstake' && 'rock-up')}>
                      <div className={cn('stake-modal-content')} key={currentTab}>
                        <h4 className={cn('stake-confirm-title')}>
                          {currentTab === 'stake' ? t('stakingPool.modal.nextStep.stake') : t('stakingPool.modal.nextStep.unstake')}
                        </h4>
                        <div className={cn('stake-modal-confirm-box')}>
                          <strong className={cn('title')}>
                            {currentTab === 'stake' ? t('stakingPool.modal.box.9') : t('stakingPool.modal.box.10')}
                          </strong>
                          <dl>
                            <div className={cn('dao')}>
                              <dt>
                                <span className={cn('icon')}>
                                  <ReactSVG src={`${imgRoot}ico_dao_color_arrow.svg`} />
                                </span>
                                {currentTab === 'unstake' && 'g.'}
                                {useDaoCharacterConvert(activeDao.value)}
                              </dt>
                              <dd>
                                <strong>{currentTab === 'stake' ? stakeValue : unstakeValue}</strong>
                                <span className={cn('dollar')}>($63.90)</span>
                              </dd>
                            </div>
                            <div className={cn('governance')}>
                              <dt>
                                <span className={cn('icon')}>
                                  <ReactSVG src={`${imgRoot}ico_dao_color_arrow.svg`} />
                                </span>
                                {currentTab === 'stake' && 'g.'}
                                {useDaoCharacterConvert(activeDao.value)}
                              </dt>
                              <dd>
                                <strong>{Number(swapAmount) * Number(currentTab === 'stake' ? stakeValue : unstakeValue)}</strong>
                                <span className={cn('dollar')}>($63.90)</span>
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <div className={cn('stake-modal-list', 'important')}>
                          <strong className={cn('title')}>
                            {currentTab === 'stake' ? t('stakingPool.modal.token.stake') : t('stakingPool.modal.token.unstake')}
                          </strong>
                          <dl>
                            <div>
                              <dt>{useDaoCharacterConvert(activeDao.value)}</dt>
                              <dd>
                                <strong>{toFix(expectBalance?.wonder)}</strong>
                                <span>{t(`amountUnit.${activeDao.value}.unit1`)}</span>
                                <span className={cn('dollar')}>($64.90)</span>
                              </dd>
                            </div>
                            <div>
                              <dt>g.{useDaoCharacterConvert(activeDao.value)}</dt>
                              <dd>
                                <strong>{toFix(expectBalance?.gWonder)}</strong>
                                <span>{t(`amountUnit.${activeDao.value}.unit2`)}</span>
                                <span className={cn('dollar')}>($64.90)</span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div className={cn('stake-bottom-info')}>
                          <p className={cn('stake-info')}>
                            <strong className={cn('text')}>*{t('stakingPool.modal.message1')}</strong>
                          </p>
                          <p className={cn('stake-info')}>
                            <strong className={cn('text')}>*{t('stakingPool.modal.message2')}</strong>
                          </p>
                          <p className={cn('stake-info')}>
                            <strong className={cn('text')}>*{t(`stakingPool.modal.${currentTab === 'stake' ? 'message3' : 'message4'}`)}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cn('modal-footer')}>
                    <OutlineButton
                      buttonText={t('stakingPool.modal.btn.back')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setStep(1);
                      }}
                    />
                    {/* 23.04.23 수정: 팝업 내 문구 변경 (Approve -> Confirm) */}
                    <BgButton buttonText={'Confirm'} color="black" size="md" onClick={confirm} />
                  </div>
                </>
              ),
              3: (
                <>
                  <div className={cn('modal-body none-header')}>
                    <div className={cn('modal-body-inner')}>
                      <div className={cn('dao-stake-modal-inner')}>
                        <div className={cn('summary')}>
                          <div>
                            <div className={cn('summary-header')}>
                              {currentTab === 'stake' ? (
                                <ReactSVG src={`${imgRoot}ico_stake_complete_${activeDao.value}.svg`} />
                              ) : (
                                <ReactSVG src={`${imgRoot}ico_stake_complete_g_${activeDao.value}.svg`} />
                              )}

                              <strong>{currentTab === 'stake' ? t('stakingPool.modal.complete1') : t('stakingPool.modal.complete2')}</strong>
                            </div>
                            <div className={cn('summary-info')}>
                              <div className={cn('info-row')}>
                                <Tag size="s" color="primary">
                                  {currentTab === 'stake' ? 'Stake' : 'Unstake'}
                                </Tag>
                                <span className={cn('figure')}>
                                  {currentTab === 'stake' ? stakeValue : unstakeValue}
                                  <span className={cn('unit')}>
                                    {t(`${currentTab === 'stake' ? 'unit1' : 'unit2'}`, {
                                      ns: 'dao',
                                      keyPrefix: `amountUnit.${activeDao.value}`,
                                    })}
                                  </span>
                                </span>
                              </div>
                              <div className={cn('info-row')}>
                                <Tag size="s" color="dark-gray">
                                  {currentTab === 'stake' ? t('stakingPool.modal.get') : t('stakingPool.modal.get')}
                                </Tag>
                                <span className={cn('figure')}>
                                  {Number(swapAmount) * Number(currentTab === 'stake' ? stakeValue : unstakeValue)}
                                  <span className={cn('unit')}>
                                    {t(`${currentTab === 'stake' ? 'unit2' : 'unit1'}`, {
                                      ns: 'dao',
                                      keyPrefix: `amountUnit.${activeDao.value}`,
                                    })}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={cn('stake-modal-list', 'default')}>
                            <dl>
                              <div>
                                <dt>{t('stakingPool.modal.box.3')}</dt>
                                <dd>
                                  <strong>{fromWei(String(gasFee ?? 0), 'ether')}</strong>
                                  <span>WEMIX</span>
                                </dd>
                              </div>
                              {currentTab === 'stake' && (
                                <div>
                                  <dt>{t('stakingPool.modal.box.11')}</dt>
                                  <dd>
                                    <span>2023-11-01 12:00:03</span>
                                  </dd>
                                </div>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cn('modal-footer')}>
                    <BgButton
                      buttonText={t('stakingPool.modal.btn.2')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setIsOpen(false);
                        setStep(1);
                      }}
                      key="approve"
                    />
                  </div>
                </>
              ),
            }[step]
          }
        </div>
      </Modal>
      <ModalLayout
        isOpen={isErrorModal}
        setIsOpen={setIsErrorModal}
        size="sm"
        title={t('failedPopup.txt', { ns: 'common' })}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <BgButton buttonText={t('failedPopup.btn', { ns: 'common' })} color="black" size="md" key="Save" onClick={() => resetModal()} />,
        ]}
      >
        {t('failedPopup.txt3', { ns: 'common' })}
      </ModalLayout>
      <CoinApproveModal
        isOpen={isPendingModal}
        setIsOpen={setIsPendingModal}
        coins={[
          {
            iconType: 'wonder',
            symbol: 'WONDER',
            onClickApprove: () => sendApproved(),
          },
        ]}
        isApproved={isApproved}
        onClickNext={() => setIsPendingModal(false)}
      />
      <WalletModal isOpen={isWalletModal} setIsOpen={setIsWalletModal} type={walletModalType} />
    </>
  );
};

export default DaoStakeModal;
