import { Trans, useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { daoThemeAtom } from '@/state/daoAtom';
import {
  distributionParamsAtom,
  governanceParamsAtom,
  reopenParamsAtom,
  revenueParamsAtom,
  swapParamsAtom,
  textParamAtom,
  treasuryParamsAtom,
  trustCheckParamAtom,
} from '@/state/governanceAtom';

import { useAtomValue } from 'jotai';

import DaoLayout from '@/components/dao/DaoLayout';
import { DaoCreateBox, DaoCreateBoxInner, DaoCreateLayout, DaoCreateTitle } from '@/components/dao/DaoCreateLayout';
import GovernanceSettingAgenda from '@/components/dao/governance/GovernanceSettingAgenda';
import AgendaHistoryList from '@/components/dao/governance/AgendaHistoryList';
import BgButton from '@/components/button/BgButton';
import { useCharacterFirstUppercase, useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import { daoContractsAtom } from '@/state/web3Atom';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { toWei } from 'web3-utils';
import { etherToWei, waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { useWonder } from '@/hook/useWonder';
import { AgendaType, BasePolicyType, SubPolicyType } from '@/types/dao/proposal.types';
import { Form, Input } from 'antd';
import ModalLayout from '@components/modal/ModalLayout';
import WalletModal from '@components/modal/WalletModal';
import { WalletModalType } from '@/types/modal.types';
import { formatBytes32String } from 'ethers/lib/utils';

const DaoAgendaRegisterModal = dynamic(() => import('@/components/modal/DaoAgendaRegisterModal'), { ssr: false });

{
  /*
  treasury: treasury 자금 사용
  liquidation: dao 해산
  distribution: buyback dt 분배 비율 변경
  revenue: pmr 분배 비율 변경
  governance: governance 조건 변경
  reopen: station 재오픈
  swap: treasury 자금 종류 변경
  relocate: trust 지갑 주소 변경
  text: 통과된 안건 저장
  trust: trust check 안건
  etc
*/
}

const CreateGovernance = () => {
  const activeDao = useAtomValue(daoThemeAtom);
  const { t } = useTranslation('dao');
  const [form] = Form.useForm();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [type, setType] = useState<string>('temperature');

  const daoContracts = useAtomValue(daoContractsAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const { wonderDao } = useWonder();
  const [availableId, setAvailableId] = useState<number>();
  const [currentType, setCurrentType] = useState<AgendaType>();

  const treasuryParam = useAtomValue(treasuryParamsAtom);
  const revenueParam = useAtomValue(revenueParamsAtom);
  const distributionParam = useAtomValue(distributionParamsAtom);
  const swapParam = useAtomValue(swapParamsAtom);
  const governanceParam = useAtomValue(governanceParamsAtom);
  const textParam = useAtomValue(textParamAtom);
  const reopenParam = useAtomValue(reopenParamsAtom);
  const trustCheckParam = useAtomValue(trustCheckParamAtom);

  useEffect(() => {
    if (wonderDao?.daoId) {
      const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

      contract?.methods.getCurrentId(wonderDao?.daoId).call(function(err: any, res: any) {
        setAvailableId(res);
        console.log(res);
      });
    }
  }, [wonderDao]);

  const createTreasuryAgenda = async () => {
    const data = daoContracts.TreasurySpell?.methods
      .cast({
        fundAddr: treasuryParam?.fundAddr?.address,
        receiver: treasuryParam?.receiver?.address,
        name: formatBytes32String('eunbin'),
        hashed: formatBytes32String(''),
        desc: formatBytes32String('desc'),
        daoId: wonderDao?.daoId,
        agendaId: availableId,
        amount: treasuryParam?.amount,
        revenueRatio: 50,
        burnRatio: 50,
        performRatio: 50,
        incomeRatio: 50,
        subRecipients: [
          {
            account: '0x71CE021509710a86BCfeC53Ae28913010ce66a49',
            name: formatBytes32String('eunbin'),
            ratio: 50,
          },
        ],
      })
      .encodeABI();

    await createAgenda(0, data);
  };

  const createRevenueAgenda = async () => {
    let hash = '';
    await daoContracts.Payment?.methods.getBusinessHash(wonderDao?.daoId, availableId).call((err: any, res: any) => {
      hash = res;
    });

    const data = daoContracts.RevenueSpell?.methods
      .cast({
        daoId: wonderDao?.daoId,
        agendaId: availableId,
        hashed: hash,
        revenueRatio: revenueParam?.treasury,
        performRatio: wonderDao?.performRatio,
        incomeRatio: wonderDao?.incomeRatio,
      })
      .encodeABI();

    await createAgenda(2, data);
  };

  const createDistributionAgenda = async () => {
    let hash = '';
    await daoContracts.Payment?.methods.getBusinessHash(wonderDao?.daoId, availableId).call((err: any, res: any) => {
      hash = res;
    });

    const data = daoContracts.DistributionSpell?.methods
      .cast({
        daoId: wonderDao?.daoId,
        hashed: hash,
        agendaId: availableId,
        burnRatio: distributionParam?.burnRatio,
      })
      .encodeABI();

    await createAgenda(3, data);
  };

  const createGovernanceAgenda = async () => {
    let policy: BasePolicyType = {};
    let subPolicy: SubPolicyType[] = [];
    const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

    await contract?.methods.getPolicy(wonderDao?.daoId, 3).call(function(err: any, res: any) {
      policy = res[0];
      subPolicy = res[1];
    });

    if (currentType === AgendaType.GOVERNANCE) {
      const data = daoContracts.GovernanceSpell?.methods
        .cast({
          daoId: wonderDao?.daoId,
          spellType: Number(governanceParam?.spellType?.value),
          basePolicy: {
            baseRatio: toWei(governanceParam?.baseRatio?.value ?? '', 'ether'),
            promulgationPeriod: '1000000000',
            emergencyPolicy: {
              emergencyPermitCutOff: '600000000000000000',
              emergencyDeadline: '86400',
            },
          },
          subPolicy: [
            {
              permitCutOff: etherToWei(Number(governanceParam?.subPolicy?.consensus?.permitCutOff) / 100),
              quorum: etherToWei(Number(governanceParam?.subPolicy?.consensus?.quorum) / 100),
              deadLine: String(Number(governanceParam?.subPolicy?.consensus?.deadline?.value) * 86400),
            },
            {
              permitCutOff: etherToWei(Number(governanceParam?.subPolicy?.governance?.permitCutOff) / 100),
              quorum: etherToWei(Number(governanceParam?.subPolicy?.governance?.quorum) / 100),
              deadLine: String(Number(governanceParam?.subPolicy?.governance?.deadline?.value) * 86400),
            },
          ],
        })
        .encodeABI();

      await createAgenda(4, data);
    }

    if (currentType === AgendaType.TRUST_CHECK) {
      const data = daoContracts.GovernanceSpell?.methods
        .cast({
          daoId: wonderDao?.daoId,
          spellType: 4,
          basePolicy: {
            baseRatio: policy?.baseRatio,
            promulgationPeriod: policy?.promulgationPeriod,
            emergencyPolicy: {
              emergencyPermitCutOff: toWei(String(Number(trustCheckParam?.permitCutOff) / 100) ?? '', 'ether'),
              emergencyDeadline: String(Number(trustCheckParam?.deadline) * 86400),
            },
          },
          subPolicy: [
            {
              ...subPolicy?.[0],
            },
            {
              ...subPolicy?.[1],
            },
          ],
        })
        .encodeABI();

      await createAgenda(4, data);
    }
  };

  const createSwapAgenda = async () => {
    const data = daoContracts.SwapSpell?.methods
      .cast({
        daoId: wonderDao?.daoId,
        orders: [
          {
            amount: swapParam?.amount,
            outMin: toWei('0.5', 'ether'),
            path: [swapParam?.receipt?.address, swapParam?.receipt?.address],
          },
        ],
      })
      .encodeABI();

    await createAgenda(6, data);
  };

  const createTextAgenda = async () => {
    if (!textParam) return;
    const buffer = new Buffer(textParam, 'binary');

    const data = daoContracts.TextSpell?.methods
      .cast({
        daoId: wonderDao?.daoId,
        desc: buffer,
      })
      .encodeABI();

    await createAgenda(8, data);
  };

  const createReopenAgenda = async () => {
    const data = daoContracts.ReopenSpell?.methods
      .cast({
        purpose: formatBytes32String('for test'),
        daoId: wonderDao?.daoId,
        period: reopenParam?.period,
        purposeAmount: toWei(reopenParam?.purposeAmount ?? '', 'ether'),
        minEnterAmount: toWei(reopenParam?.minEnterAmount ?? '', 'ether'),
        addMintAmount: toWei(reopenParam?.addMintAmount ?? '', 'ether'),
        unit: toWei(reopenParam?.unit ?? '', 'ether'),
      })
      .encodeABI();

    await createAgenda(5, data);
  };

  const createAgenda = async (spellType: number, data: any) => {
    setIsPendingModal(true);
    const enterMethodAbi = daoContracts.DaoRouter?.methods.createAgenda(wonderDao?.daoId, spellType, data).encodeABI();
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
          console.log('error occur', error);
          setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            if (receipt?.status) {
              console.log('success ', receipt);
              setIsPendingModal(false);
            }
          });
        }
      },
    );
  };

  const onFinish = async (values: any) => {
    switch (currentType) {
      case AgendaType.TREASURY:
        return await createTreasuryAgenda();
      case AgendaType.REVENUE:
        return await createRevenueAgenda();
      case AgendaType.DISTRIBUTION:
        return await createDistributionAgenda();
      case AgendaType.GOVERNANCE:
        return await createGovernanceAgenda();
      case AgendaType.SWAP:
        return await createSwapAgenda();
      case AgendaType.REOPEN:
        return await createReopenAgenda();
      case AgendaType.TRUST_CHECK:
        return await createGovernanceAgenda();
      case AgendaType.ETC:
        return await createTextAgenda();
    }
  };
  const resetModal = useCallback(() => {
    setIsErrorModal(false);
    setIsPendingModal(false);
  }, []);

  return (
    <>
      <Helmet>
        <title>Governance &gt; DAO &gt; Nile</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap', 'create')} />
      </Helmet>
      <Form onFinish={onFinish} form={form}>
        <div className={cn('governance-create-wrap')}>
          <DaoLayout activate='menu-governance' lnb={false}>
            <div className={cn('create-layout-wrap')}>
              <DaoCreateLayout className='ratio'>
                <DaoCreateTitle
                  title={t('governance.createProposal.title', { type: `${useCharacterFirstUppercase(type)}Check` })} />
                <DaoCreateBox>
                  <GovernanceSettingAgenda setModalOpen={setIsOpen} currentType={currentType} />
                  <DaoCreateBoxInner>
                    <div className={cn('agenda-create-form-wrap')}>
                      <Form.Item name='title'>
                        <Input.TextArea placeholder={t('governance.createProposal.titlePlaceholder')}
                                        className={cn('input-title')} />
                      </Form.Item>
                      <Form.Item name='content'>
                        <Input.TextArea
                          showCount={{
                            formatter: (info: { value: string; count: number; maxLength?: number }) =>
                              `${info.count.toLocaleString().padStart(1, '0')}/${info.maxLength} byte`,
                          }}
                          maxLength={30000}
                          placeholder={t('governance.createProposal.contentPlaceholder')}
                          className={cn('input-detail')}
                        />
                      </Form.Item>
                    </div>
                  </DaoCreateBoxInner>
                  <AgendaHistoryList />
                </DaoCreateBox>
                <DaoCreateBox className='create-box-info'>
                  <BgButton buttonText={t('governance.create.registerBtn')} size='xl' color='highlight'
                            htmlType='submit' />
                  <div className={cn('info-box')}>
                    <ul className={cn('dao-create-inner-info-list')}>
                      <li>
                        <strong className={cn('info-name')}>{t('governance.create.info.1')}</strong>
                        <span className={cn('info')}>
                          <strong className={cn('bold')}>{t('governance.create.info.1-1', { n: 3 })}</strong> 2022-07-01 ~ 2022-07-04
                        </span>
                      </li>
                      <li>
                        <strong className={cn('info-name')}>{t('governance.create.info.2')}</strong>
                        <span className={cn('info')}>
                          <Trans
                            i18nKey='governance.create.info.2-1'
                            ns='dao'
                            values={{
                              type: useDaoCharacterConvert(activeDao.value),
                              n: 5,
                            }}
                          >
                            <strong className={cn('bold')}></strong>
                          </Trans>
                        </span>
                      </li>
                      <li>
                        <strong className={cn('info-name')}>{t('governance.create.info.3')}</strong>
                        <span className={cn('info')}>
                          <Trans
                            i18nKey='governance.create.info.3-1'
                            ns='dao'
                            values={{
                              n: 50,
                            }}
                          >
                            <strong className={cn('bold')}></strong>
                          </Trans>
                        </span>
                      </li>
                    </ul>
                    <span className={cn('desc')}>{t('governance.create.info.desc')}</span>
                  </div>
                </DaoCreateBox>
              </DaoCreateLayout>
            </div>
          </DaoLayout>
          <DaoAgendaRegisterModal isOpen={isOpen} setIsOpen={setIsOpen} setCurrentType={setCurrentType}
                                  currentType={currentType} />
          <ModalLayout
            isOpen={isErrorModal}
            setIsOpen={setIsErrorModal}
            size='sm'
            title={t('failedPopup.txt', { ns: 'common' })}
            footer={true}
            destroyOnClose={true}
            footerContent={[
              <BgButton buttonText={t('failedPopup.btn', { ns: 'common' })} color='black' size='md' key='Save'
                        onClick={() => resetModal()} />,
            ]}
          >
            {t('failedPopup.txt3', { ns: 'common' })}
          </ModalLayout>
          <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={WalletModalType.PAYMENT} />
        </div>
      </Form>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'dao'])),
    },
  };
};

export default CreateGovernance;
