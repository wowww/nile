import OutlineButton from '@components/button/OutlineButton';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import BgButton from '@components/button/BgButton';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useAtomValue, useSetAtom } from 'jotai';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { daoJsonAbiAddress } from '@/web3/abis/dao';
import { toWei } from 'web3-utils';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { useLayoutResize } from '@utils/layout';
import { daoContractsAtom } from '@/state/web3Atom';
import { useWonder } from '@/hook/useWonder';
import { WalletModalType } from '@/types/modal.types';
import WalletModal from '@components/modal/WalletModal';
import { refreshWonderStationRealTimeInfoAtom, refreshWonderStationUserInfoAtom } from '@/state/daoAtom';
import { useWemixWalletProvider } from '@components/wemix';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

const RefundRecruitingButton = ({ disabled }: { disabled: boolean }) => {
  const { t } = useTranslation('dao');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const { isMobile } = useLayoutResize();

  const daoContracts = useAtomValue(daoContractsAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const refreshWonderStationRealTimeInfo = useSetAtom(refreshWonderStationRealTimeInfoAtom);
  const refreshWonderStationsUserInfo = useSetAtom(refreshWonderStationUserInfoAtom);

  const { wonderDao } = useWonder();
  const { openApp } = useWemixWalletProvider();

  const refresh = () => {
    refreshWonderStationRealTimeInfo();
    refreshWonderStationsUserInfo();
  };

  const refund = async () => {
    setIsPendingModal(true);
    const refundMethodAbi = daoContracts.Station?.methods.refund(wonderDao?.daoId, nileWallet).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();
    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: daoJsonAbiAddress().current.Station,
        value: '0',
        data: refundMethodAbi,
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
            if (receipt.status) {
              resetModal();
              refresh();
            }
          });
        }
      },
    );

    openApp();
  };
  const resetModal = useCallback(() => {
    setIsErrorModal(false);
    setIsPendingModal(false);
  }, []);

  return (
    <>
      <OutlineButton
        buttonText={t('station.recruitCondition.condition.btnRefund', { ns: 'dao' })}
        color="white"
        /* 23.04.21 수정: 버튼 사이즈 변경 */
        size="lg"
        onClick={() => setIsOpen(true)}
        block
        disabled={disabled}
      />
      <ModalLayout
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="sm"
        title={t('station.participationProcess.cancelTitle1', { ns: 'dao' })}
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
            buttonText={t('station.recruitCondition.condition.btnRefund', { ns: 'dao' })}
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              refund();
              setIsOpen(false);
            }}
          />,
        ]}
      >
        <p>{t('station.participationProcess.cancelDesc1', { ns: 'dao' })}</p>
        <p className={cn('gas-fee-info')}>
          <span className={cn('info')}>{t('station.participationProcess.cancelDesc2', { ns: 'dao' })}</span>
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
    </>
  );
};

export default RefundRecruitingButton;
