import OutlineButton from '@components/button/OutlineButton';
import React, {useCallback, useEffect, useState} from 'react';
import { useTranslation } from 'next-i18next';
import BgButton from '@components/button/BgButton';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useAtomValue, useSetAtom } from 'jotai';
import { useLayoutResize } from '@utils/layout';
import { WalletModalType } from '@/types/modal.types';
import { toWei } from 'web3-utils';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { daoJsonAbiAddress } from '@/web3/abis/dao';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { daoContractsAtom } from '@/state/web3Atom';
import { useWonder } from '@/hook/useWonder';
import { refreshWonderStationMembersAtom, refreshWonderStationRealTimeInfoAtom, refreshWonderStationUserInfoAtom } from '@/state/daoAtom';
import { useWemixWalletProvider } from '@components/wemix';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });
const WalletModal = dynamic(() => import('@components/modal/WalletModal'), { ssr: false });

const CancelRecruitingButton = () => {
  const { t } = useTranslation('dao');
  const { isMobile } = useLayoutResize();

  const daoContracts = useAtomValue(daoContractsAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const refreshWonderStationRealTimeInfo = useSetAtom(refreshWonderStationRealTimeInfoAtom);
  const refreshWonderStationsUserInfo = useSetAtom(refreshWonderStationUserInfoAtom);
  const refreshWonderStationMembers = useSetAtom(refreshWonderStationMembersAtom);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [isCancelConfirmModal, setIsCancelConfirmModal] = useState<boolean>(false);

  const { wonderDao } = useWonder();
  const { openApp } = useWemixWalletProvider();

  const refresh = () => {
    refreshWonderStationRealTimeInfo();
    refreshWonderStationsUserInfo();
    setTimeout(() => refreshWonderStationMembers(), 4000);
  };

  const resetModal = useCallback(() => {
    setIsErrorModal(false);
    setIsPendingModal(false);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isCancelConfirmModal) {
      refresh();
    }
  }, [isCancelConfirmModal]);

  const cancel = async () => {
    setIsPendingModal(true);
    const enterMethodAbi = daoContracts.Station?.methods.cancel(wonderDao?.daoId).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: daoJsonAbiAddress().current.Station,
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
              setIsPendingModal(false);
              setIsCancelConfirmModal(true);
            }
          });
        }
      },
    );
    openApp();
  };

  return (
    <>
      <OutlineButton
        buttonText={t('station.recruitCondition.condition.btnCancelParticipant')}
        color="white"
        size={isMobile ? 'lg' : 'md'}
        onClick={() => setIsOpen(true)}
        block
      />
      <ModalLayout
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="sm"
        title={t('station.participationProcess.cancelTitle1')}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <OutlineButton
            buttonText={t('close', { ns: 'common' })}
            color="black"
            size="md"
            onClick={() => {
              setIsOpen(false);
            }}
            key="cancel"
          />,
          <BgButton
            buttonText={t('station.participationProcess.cancelTitle1')}
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              cancel();
              setIsOpen(false);
            }}
          />,
        ]}
      >
        <p>{t('station.participationProcess.cancelDesc1')}</p>
        <p className={cn('gas-fee-info')}>
          <span className={cn('info')}>{t('station.participationProcess.cancelDesc2')}</span>
        </p>
        {/* 23.04.09 수정: https://wemadewemix.atlassian.net/jira/software/c/projects/WMNILE/issues/WMNILE-295?filter=myopenissues 가스비 안내 문구 추가*/}
        <p className={cn('gas-fee-info')}>
          <span className={cn('info')}>{t('station.participationProcess.cancelDesc4')}</span>
        </p>
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
      <WalletModal isOpen={isPendingModal} setIsOpen={setIsPendingModal} type={WalletModalType.PAYMENT} />
      <ModalLayout
        isOpen={isCancelConfirmModal}
        setIsOpen={setIsCancelConfirmModal}
        size="sm"
        title={t('station.participationProcess.cancelTitle2', { ns: 'dao' })}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <BgButton buttonText={t('confirm', { ns: 'common' })} color="black" size="md" key="Save" onClick={() => setIsCancelConfirmModal(false)} />,
        ]}
      >
        {t('station.participationProcess.cancelDesc3', { ns: 'dao' })}
      </ModalLayout>
    </>
  );
};

export default CancelRecruitingButton;
