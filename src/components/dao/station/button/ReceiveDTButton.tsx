import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import BgButton from '@components/button/BgButton';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { message } from 'antd';
import { daoJsonAbiAddress } from '@/web3/abis/dao';
import { toWei } from 'web3-utils';
import { waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { daoContractsAtom } from '@/state/web3Atom';
import { useWonder } from '@/hook/useWonder';
import {useWemixWalletProvider} from "@components/wemix";

const ReceiveDTButton = () => {
  const { t } = useTranslation('dao');
  const { wonderDao, refreshWonderStationsUserInfo } = useWonder();

  const activeDao = useAtomValue(daoThemeAtom);
  const daoContracts = useAtomValue(daoContractsAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const { openApp } = useWemixWalletProvider();

  const receiveDT = async () => {
    const refundMethodAbi = daoContracts.DaoRouter?.methods.receiveDT(wonderDao?.daoId).encodeABI();
    const estimatedGasFee = await provider.web3.eth.getGasPrice();

    /**
     * 23.04.10 수정: 토스트 팝업 추가 키값만 추가해두니, 케이스에 따라 아래 토스트 팝업 노출해주세요.
     * 클릭시 ‘지갑에서 서명을 진행해주세요’ : t('station.complete.participate.after.history.tooltip.1')
     * 지갑 서명 완료후 획득 및 환급이 완료되었습니다.’ : t('station.complete.participate.after.history.tooltip.2')
     */
    message.info({ content: t('station.complete.participate.after.history.tooltip.1'), key: 'toast' });

    provider.web3.eth.sendTransaction(
      {
        from: nileWallet,
        to: daoJsonAbiAddress().current.DaoRouter,
        value: '0',
        data: refundMethodAbi,
        gasPrice: estimatedGasFee,
        maxPriorityFeePerGas: toWei('100', 'gwei'),
        maxFeePerGas: toWei('101', 'gwei'),
      },
      (error: Error, hash: string) => {
        if (error) {
          // setIsErrorModal(true);
        }
        if (hash) {
          waitForReceipt(hash, (receipt: TransactionReceipt) => {
            refreshWonderStationsUserInfo();
          });
        }
      },
    );

    openApp();
  };

  return (
    <BgButton
      buttonText={t('station.complete.participate.after.history.button', { type: useDaoCharacterConvert(activeDao.value) })}
      size="md"
      color="highlight"
      onClick={receiveDT}
    />
  );
};

export default ReceiveDTButton;
