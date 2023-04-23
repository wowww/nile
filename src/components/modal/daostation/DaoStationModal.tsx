import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Avatar, Form, Input, Modal } from 'antd';
import { Trans, useTranslation } from 'next-i18next';

import BgButton from '@components/button/BgButton';
import OutlineButton from '@components/button/OutlineButton';
import { IconLogo } from '@components/logo/IconLogo';
import StationStep3 from '@/components/modal/daostation/StationStep3';
import DaoStakeModalBanner from '@/components/modal/DaoStakeModalBanner';
import { ReactSVG } from 'react-svg';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { useAtomValue } from 'jotai';
import { userProfileAtom } from '@/state/accountAtom';
import {
  daoThemeAtom,
  refreshWonderStationMembersAtom,
  refreshWonderStationRealTimeInfoAtom,
  refreshWonderStationUserInfoAtom,
} from '@/state/daoAtom';
import { fromWei, toWei } from 'web3-utils';
import { contractsAtom, daoContractsAtom, tokenListAtom, updateBalanceAtom, ZERO_ADDRESS } from '@/state/web3Atom';
import { useWonder } from '@/hook/useWonder';
import { UserInfoStatus } from '@/types/contract.types';
import DaoStationCompleteModal from '@components/modal/DaoStationCompleteModal';
import dynamic from 'next/dynamic';
import { useSetAtom } from 'jotai';
import { daoJsonAbiAddress } from '@/web3/abis/dao';
import { TOKEN_MAX_APPROVE_AMOUNT, waitForReceipt } from '@utils/web3Utils';
import { WalletModalType } from '@/types/modal.types';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { TransactionReceipt } from 'web3-core';
import { NileApiService } from '@/services/nile/api';
import { useWemixWalletProvider } from '@components/wemix';
import { StationRank } from '@/types/dao/dao.types';
import dayjs from 'dayjs';
import { useNumberFormatter } from "@utils/formatter/number";

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  desc: string;
}

interface FormType {
  greeting: string;
  amount: string;
}

const DaoStationModal = ({ isOpen, setIsOpen, desc }: ModalProps) => {
  const { t } = useTranslation(['dao', 'common']);
  const api = NileApiService();

  const { wonderDao, wonderStationUserInfo } = useWonder();
  const { openApp } = useWemixWalletProvider();

  const daoContracts = useAtomValue(daoContractsAtom);
  const marketContracts = useAtomValue(contractsAtom);
  const tokenList = useAtomValue(tokenListAtom);
  const userProfile = useAtomValue(userProfileAtom);
  const activeDao = useAtomValue(daoThemeAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const updateBalance = useSetAtom(updateBalanceAtom);

  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [stepCount, setStepCount] = useState<number>(1);

  const [walletModalType, setWalletModalType] = useState<WalletModalType>(WalletModalType.APPROVE_WEMIX$);
  const [isOpenComplete, setIsOpenComplete] = useState<boolean>(false);
  const [isOpenCompleteAdd, setIsOpenCompleteAdd] = useState<boolean>(false);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [gasFeeRatio, setGasFeeRatio] = useState<number>(0);

  const [balance, setBalance] = useState<string>();
  const [placeholderIndex, setPlaceholderIndex] = useState<number>();
  const [rank, setRank] = useState<StationRank>();

  const {toFix}=useNumberFormatter()

  useEffect(() => {
    const data = tokenList.find((token) => token.address === wonderDao?.token)?.balance;
    setBalance(data);
  }, [tokenList, wonderDao, isOpen]);

  useEffect(() => {
    updateBalance();
  }, [isOpen]);

  useEffect(() => {
    setPlaceholderIndex(Math.floor(Math.random() * 5 + 1)); // 1~5 random number
  }, []);

  useEffect(() => {
    provider.web3.eth.getGasPrice().then((data) => setGasFeeRatio(Number(data) * 10 ** -18));
  }, []);

  const randPlaceholder = useMemo(() => {
    return t(`station.participationProcess.placeholderType${placeholderIndex}`);
  }, [placeholderIndex, t]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm<FormType>({
    mode: 'all',
  });

  const newUser = useMemo(() => {
    return wonderStationUserInfo?.status !== UserInfoStatus.ENTER;
  }, [wonderStationUserInfo]);

  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);
    setStepCount(1);
    reset();
  };

  const stepUp = () => {
    setStepCount((prev) => prev + 1);
  };

  const resetModal = useCallback(() => {
    setIsErrorModal(false);
    setIsPendingModal(false);
    setIsOpen(false);
    setStepCount(1);
    reset();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setRank(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    checkApproved();
  }, [nileWallet, wonderDao]);

  const checkApproved = useCallback(async () => {
    if (!nileWallet) return;

    if (wonderDao?.token === ZERO_ADDRESS) {
      setIsApproved(true);
      setWalletModalType(WalletModalType.PAYMENT);
    } else {
      marketContracts?.ERC20?.methods
        .allowance(nileWallet, daoJsonAbiAddress().current.Station)
        .call()
        .then((maxAmount: string) => {
          setIsApproved(maxAmount === TOKEN_MAX_APPROVE_AMOUNT);
          if (maxAmount === TOKEN_MAX_APPROVE_AMOUNT) {
            setWalletModalType(WalletModalType.PAYMENT);
          }
        });
    }
  }, [nileWallet, marketContracts, wonderDao]);

  const sendApproved = async () => {
    setWalletModalType(WalletModalType.WAITING_APPROVE_WEMIX$);
    const data = await marketContracts.ERC20?.methods.approve(daoJsonAbiAddress().current.Station, TOKEN_MAX_APPROVE_AMOUNT).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: marketJsonAbiAddresses().current.ERC20,
        value: '0',
        data,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (err, hash) => {
        if (err) {
          setIsErrorModal(true);
          setWalletModalType(WalletModalType.APPROVE_WEMIX$);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              setIsApproved(true);
              setIsPendingModal(false);
              setWalletModalType(WalletModalType.PAYMENT);
            }
          });
        }
      },
    );

    openApp();
  };

  const enter = async (amount: string, greeting?: string) => {
    setIsPendingModal(true);

    const enterMethodAbi = daoContracts.Station?.methods
      .enter(wonderDao?.daoId, wonderDao?.token === ZERO_ADDRESS ? '0' : toWei(amount, 'ether'))
      .encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: daoJsonAbiAddress().current.Station,
        value: wonderDao?.token === ZERO_ADDRESS ? toWei(amount, 'ether') : '0',
        data: enterMethodAbi,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error, hash) => {
        if (error) {
          setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, async (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              const block = await provider.web3.eth.getBlock(receipt.blockNumber);
              if (wonderStationUserInfo?.status === UserInfoStatus.NONE) {
                if (greeting || randPlaceholder) {
                  api.dao.station
                    .postEnter({
                      daoId: Number(wonderDao?.daoId),
                      txHash: hash,
                      greeting: (greeting && greeting) || randPlaceholder,
                      walletAddress: nileWallet,
                      timestamp: dayjs(block.timestamp).utc().format('YYYY-MM-DD HH:mm:ss'),
                      amount: toWei(String(amount), 'ether'),
                    })
                    .then((data) => {
                      console.log('success enter ', data);
                    })
                    .catch((err) => {
                      console.log('err occur ', err);
                    });
                }
              }
            }
            resetModal();
            if (wonderStationUserInfo?.status === UserInfoStatus.ENTER) {
              setIsOpenCompleteAdd(true);
            } else {
              setIsOpenComplete(true);
            }
          });
        }
      },
    );

    openApp();
  };

  /* useEffect 무한루프 해결을 위해 dependency를 getValues()에서 getValues().amount로 수정 */
  useEffect(() => {
    if (!nileWallet || !wonderDao?.daoId) return;

    if (getValues().amount) {
      api.dao.station.enter
        .getRank(wonderDao?.daoId, toWei(getValues().amount, 'ether'), nileWallet)
        .then(({ data }) => setRank(data.data))
        .catch((err) => setRank(undefined));
    }
  }, [getValues().amount, nileWallet, wonderDao]);

  const onFinish: SubmitHandler<FormType> = (values) => {
    if (isApproved) {
      enter(values.amount, values.greeting);
    } else {
      setIsPendingModal(true);
    }
  };

  const getPercent = useMemo(() => {
    if (!rank?.rank || !rank?.total) return;
    return Math.floor((rank?.rank / rank?.total) * 100);
  }, [rank]);

  // 입력값의 +,-,.,e 와 맨 앞자리 0 삭제
  const changeInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value?.[0] === '0') {
          setValue('amount', e.target.value.slice(1), {shouldValidate: true});
        }
    setValue('amount', e.target.value.replace(/[^0-9]/g, ""), {shouldValidate: true});
  };

  return (
    <>
      <Modal
        wrapClassName={`step${stepCount}`}
        className={cn('dao-station-modal')}
        open={isOpen}
        onCancel={onCancel}
        centered={true}
        destroyOnClose={true}
        width={'none'}
        closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />}
        footer={false}
        maskClosable={false}
        keyboard={false}
      >
        <DaoStakeModalBanner desc={desc} />
        <form onSubmit={handleSubmit(onFinish)}>
          <div className={cn('contents-block')}>
            <div className={cn('modal-header')}>
              <h3 className={cn('title')}>
                {t(`station.participationProcess.title${wonderStationUserInfo?.status === UserInfoStatus.ENTER ? '2' : ''}`)}
              </h3>
              <ol className={cn('steps')}>
                {wonderStationUserInfo?.status !== UserInfoStatus.ENTER && (
                  <li className={cn('step')} data-num="1">
                    <span>{t('station.participationProcess.step1')}</span>
                  </li>
                )}
                <li className={cn('step')}
                    data-num={wonderStationUserInfo?.status !== UserInfoStatus.ENTER ? '2' : '1'}>
                  <span>{t('station.participationProcess.step2')}</span>
                </li>
                <li className={cn('step')}
                    data-num={wonderStationUserInfo?.status !== UserInfoStatus.ENTER ? '3' : '2'}>
                  <span>{t('station.participationProcess.step3')}</span>
                </li>
              </ol>
            </div>
            <div className={cn('modal-body')}>
              {((wonderStationUserInfo?.status === UserInfoStatus.ENTER && stepCount === 1) ||
                (wonderStationUserInfo?.status === UserInfoStatus.NONE && stepCount === 2)) && (
                <div className={cn('available-amount-wrap dao-station')}>
                  <div className={cn('available-amount-wrap-inner')}>
                    <dl>
                      <dt>
                        <IconLogo size={16} type="wemix_dark" />
                        <span>{t('station.participationProcess.availableWemix')}</span>
                      </dt>
                      <dd>{Number(fromWei(balance ?? '', 'ether')).toLocaleString('ko-KR', {maximumFractionDigits: 4})}</dd>
                    </dl>
                    <a href="https://wemix.fi/tokens" target="_blank" rel="noopener noreferrer" className={cn('link-fill')}>
                      {t('station.participationProcess.fill')}
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                    </a>
                  </div>
                  {Number(fromWei(balance ?? '0')) < (newUser ? 10.5 : 1.5) && (
                    <div className={cn('error-message')}>
                      <div className={cn('error-message-inner')}>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                        <p>{t('station.participationProcess.availableWemixError' + (newUser ? '1' : '2'))}</p>
                      </div>
                      <span>{t('station.participationProcess.availableWemixErrorSub' + (newUser ? '1' : '2'))}</span>
                    </div>
                  )}
                </div>
              )}
              <div className={cn('modal-body-inner')}>
                {
                  {
                    1: (
                      <div className={cn('step1-wrap')}>
                        <div className={cn('station-form-item ant-form-item')}>
                          <strong className={cn('label')}>{t('station.participationProcess.inputBio')}</strong>
                          <div className={cn('profile-info')}>
                            <Avatar
                              className={cn('user-image', `type${userProfile?.themeIndex}`)}
                              size={48}
                              style={{ backgroundImage: userProfile?.img && `url(${userProfile.img})` }}
                            >
                              <span className={cn('a11y')}>{t('openProfile', { ns: 'common' })}</span>
                            </Avatar>
                            <div className={cn('user-name-wrap')}>
                              {userProfile?.nickname && <strong>{userProfile?.nickname}</strong>}
                              <span>{nileWallet}</span>
                            </div>
                          </div>
                        </div>
                        {/* TODO: label 수정 필요 */}
                        <Form.Item
                          name={'greeting'}
                          label={
                            <>
                              {t('station.participationProcess.welcomeMessage', { type: useDaoCharacterConvert(activeDao.value) })}{' '}
                              <span>({t('station.participationProcess.optional')})</span>
                            </>
                          }
                          className={cn('station-form-item message')}
                        ></Form.Item>
                        <Controller
                          control={control}
                          name="greeting"
                          render={({ field: { onChange, value } }) => (
                            <Input.TextArea
                              showCount={{ formatter: ({ count, maxLength }) => `${count}/${maxLength} byte` }}
                              maxLength={50}
                              placeholder={randPlaceholder}
                              onChange={onChange}
                              value={value}
                              className={cn('station-modal-textarea')}
                            />
                          )}
                        />
                      </div>
                    ),
                    2: (
                      <div className={cn('step2-wrap')}>
                        <div className={cn('station-form-item ant-form-item')}>
                          <strong className={cn('label')}>{t('station.participationProcess.inputWemix')}</strong>
                          <div className={cn('input-block', Number(fromWei(balance ?? '0')) < (newUser ? 10.5 : 1.5) ? 'disabled' : '')}>
                            <span className={cn('unit')}>WEMIX</span>
                            <div className={cn('input-wrap')}>
                              <input
                                type="number"
                                {...register('amount', {
                                  required: true,
                                  max: Number(fromWei(balance ?? '', 'ether')),
                                  min: newUser ? 10 : 1, // 참여 Wemix의 최소 입력값: 신규 참여자는 10, 추가 참여자는 1
                                  pattern: /^([1-9][0-9]*)$/,
                                })}
                                disabled={Number(fromWei(balance ?? '0')) < (newUser ? 10.5 : 1.5)}
                                placeholder={t('station.participationProcess.placeholder2', { num: newUser ? '10' : '1' })}
                                onInput={changeInputNumber}
                              />
                              <OutlineButton
                                buttonText={t('stakingPool.modal.input.max')}
                                disabled={Number(fromWei(balance ?? '0')) < (newUser ? 10.5 : 1.5)}
                                size="sm"
                                color="black"
                                onClick={() =>
                                  setValue('amount', (Number(fromWei(balance ?? '', 'ether')) * (1 - gasFeeRatio) + '')?.split('.')[0] ?? '0', {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            </div>
                          </div>
                          {(getValues().amount === (Number(fromWei(balance ?? '', 'ether')) * (1 - gasFeeRatio) + '')?.split('.')[0] ?? '0') && (
                            <div className={cn('error-message')}>
                              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                              <span>{t('station.participationProcess.errorMessage3')}</span>
                            </div>
                          )}
                          {errors.amount?.type === 'required' && (
                            <div className={cn('error-message')}>
                              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                              <span>{t('station.participationProcess.errorMessage1')}</span>
                            </div>
                          )}
                          {(errors.amount?.type === 'min' || errors.amount?.type === 'pattern') && (
                            <div className={cn('error-message')}>
                              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                              <span>{t('station.participationProcess.errorMessage2', { num: newUser ? '10' : '1' })}</span>
                            </div>
                          )}
                          {errors.amount?.type === 'max' && (
                            <div className={cn('error-message')}>
                              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                              <span>{t('station.participationProcess.errorMessage4')}</span>
                            </div>
                          )}

                          <p className={cn('announce-text')}>
                            {t('station.participationProcess.infoText1', { type: useDaoCharacterConvert(activeDao.value) })}
                          </p>
                        </div>
                        <div className={cn('high-rank-block', newUser && Number(fromWei(balance ?? '0')) < 10 ? 'under-minimum' : '')}>
                          <p className={cn('title')}>
                            {wonderStationUserInfo?.status === UserInfoStatus.ENTER ? (
                              <Trans
                                i18nKey="station.participationProcess.rankText2"
                                ns="dao"
                                values={{
                                  amount: Number(wonderStationUserInfo?.amount) + Number(watch().amount ?? 0),
                                  totalNum: rank?.total,
                                  num: getPercent ?? '?',
                                }}
                              >
                                <span></span>
                                <strong></strong>
                              </Trans>
                            ) : (
                              <Trans
                                i18nKey="station.participationProcess.rankText"
                                ns="dao"
                                values={{
                                  totalNum: rank?.total,
                                  num: getPercent ?? '?',
                                }}
                              >
                                <span></span>
                                <strong></strong>
                              </Trans>
                            )}
                          </p>
                          <ul className={cn('list-type-dot')}>
                            <li>
                              <dl>
                                <dt>{t('station.participationProcess.maximumAmount')}</dt>
                                <dd>
                                  {rank?.max && toFix(Number(fromWei(rank.max, 'ether')),0)}
                                  <span className={cn('unit')}>WEMIX</span>
                                </dd>
                              </dl>
                            </li>
                            <li>
                              <dl>
                                <dt>{t('station.participationProcess.averageAmount')}</dt>
                                <dd>
                                  {rank?.avg && toFix(Number(fromWei(rank.avg, 'ether')))}
                                  <span className={cn('unit')}>WEMIX</span>
                                </dd>
                              </dl>
                            </li>
                          </ul>
                          <div className={cn('station-img-wrap')}>
                            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_station.svg" />
                          </div>
                        </div>
                      </div>
                    ),
                    3: <StationStep3 />,
                  }[wonderStationUserInfo?.status === UserInfoStatus.ENTER ? stepCount + 1 : stepCount]
                }
              </div>
            </div>
            <div className={cn('modal-footer')}>
              {(stepCount === 2 || stepCount === 3) && (
                <OutlineButton buttonText={t('prev', { ns: 'common' })} size="md" color="black" onClick={() => setStepCount((prev) => prev - 1)} />
              )}
              {(wonderStationUserInfo?.status === UserInfoStatus.ENTER && stepCount === 2) || stepCount === 3 ? (
                <BgButton
                  buttonText={isApproved ? t('station.participationProcess.complete') : t('approveButton', { ns: 'common' })}
                  size="md"
                  color="black"
                  htmlType="submit"
                  disabled={!watch().amount}
                />
              ) : (
                <BgButton
                  buttonText={t('next', { ns: 'common' })}
                  size="md"
                  color="black"
                  onClick={() => stepUp()}
                  // 참여 Wemix 입력 단계에서 입력값이 없거나 error 발생시 '다음' 버튼 비활성화
                  disabled={(!watch().amount || !!errors.amount) && ((stepCount === 1 && !newUser) || (stepCount === 2 && newUser))}
                />
              )}
            </div>
          </div>
        </form>
      </Modal>
      <DaoStationCompleteModal
        isOpen={isOpenComplete}
        setIsOpen={setIsOpenComplete}
        type={activeDao.value}
        title={`${useDaoCharacterConvert(activeDao.value)} DAO`}
        desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
      />
      <ModalLayout
        isOpen={isOpenCompleteAdd}
        setIsOpen={setIsOpenCompleteAdd}
        size="sm"
        title={t('station.participationProcess.addComplete1', { ns: 'dao' })}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <BgButton buttonText={t('confirm', { ns: 'common' })} color="black" size="md" key="Save" onClick={() => setIsOpenCompleteAdd(false)} />,
        ]}
      >
        {t('station.participationProcess.addComplete2', { ns: 'dao' })}
      </ModalLayout>
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
      <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={walletModalType} onClickApprove={sendApproved} />
    </>
  );
};

export default DaoStationModal;
