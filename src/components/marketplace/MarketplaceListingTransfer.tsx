import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import { Input, Popover } from 'antd';
import BgButton from '@/components/button/BgButton';
import RefreshCountdownButton from '@/components/button/RefreshCountdownButton';
import ConnectModal from '../modal/ConnectModal';
import NetworkSettingModal from '../modal/NetworkSettingModal';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { weiToEther } from '@utils/web3Utils';
import { useNumberFormatter } from '@utils/formatter/number';
import { useAtomValue } from 'jotai';

interface stateType {
  title: string;
  address?: string;
  setAddress?: (v: string) => void;
  onClick?: () => void;
  approved?: boolean;
  onClickApprove?: () => void;
}

const MarketPlaceListingTransfer = ({ title, address, setAddress, onClick, approved, onClickApprove }: stateType) => {
  const { t } = useTranslation(['marketplace', 'common']);

  const { shorthanded } = useNumberFormatter();
  const nileWallet = useAtomValue(nileWalletAtom);
  const [isConnectModal, setIsConnectModal] = useState<boolean>(false);
  const [isModalNetworkSetting, setModalNetworkSetting] = useState(false);
  const [isError, setError] = useState(false);
  const [etherGas, setEtherGas] = useState('0');

  const changeConnectFirst = () => {
    setModalNetworkSetting(true);
  };

  const checkFee = async () => {
    const gasPrice = await provider.web3.eth.getGasPrice();
    setEtherGas(weiToEther(gasPrice));
  };

  const isTransferToMe = useMemo(() => {
    if (!nileWallet || !address) {
      return true;
    }
    return nileWallet.toLowerCase() === address.toLowerCase();
  }, [nileWallet, address]);

  const evtRefresh = () => {
    checkFee();
  };

  return (
    <div className={cn('listing-area')}>
      <strong className={cn('listing-title')}>Receiver Address</strong>
      {/* validate error일 경우 error 클래스 추가 */}
      <div className={cn('listing-form-wrap single-type', isError && 'error')}>
        <Input size="large" placeholder={t('listing.placeholder1')} value={address} onChange={(e) => setAddress?.(e.target.value)} />
      </div>
      {isError ? (
        <div className={cn('listing-form-info')}>{t('makeOfferPopup.notice3', { ns: 'common' })}</div>
      ) : (
        <div className={cn('listing-form-desc')}>{t('makeOfferPopup.notice2', { ns: 'common' })}</div>
      )}

      <div className={cn('listing-list-wrap single-type')}>
        <div className={cn('list-item-area')}>
          <p className={cn('list-item-title')}>{title}</p>
          <dl className={cn('list-content')}>
            <div className={cn('list-cont')}>
              <dt>
                {t('listing.txt9')}
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="top"
                    content={<div className={cn('tooltip-contents')}>{t('marketplaceModal.gasFeeChangInfo', { ns: 'common' })}</div>}
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <button type="button">
                      <span className={cn('a11y')}>tooltip</span>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                    </button>
                  </Popover>
                </div>
              </dt>
              <dd>
                - {shorthanded(etherGas, { digits: 7 })} WEMIX <RefreshCountdownButton refresh={evtRefresh} />
              </dd>
            </div>
            <div className={cn('list-unit')}>
              <dt>{t('listing.txt7')}</dt>
              <dd>
                <em>{shorthanded(etherGas, { digits: 7 })}</em> WEMIX
                <span className={cn('list-all-unit')}>($10)</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className={cn('list-btn-area')}>
        {!approved ? (
          <BgButton key="payment" buttonText={t('approveButton', { ns: 'common' })} color="black" size="lg" onClick={onClickApprove} />
        ) : (
          <BgButton buttonText={t('transferListing', { ns: 'common' })} color="black" size="md" onClick={onClick} disabled={isTransferToMe} />
        )}
      </div>
      <ConnectModal isModalVisible={isConnectModal} setIsModalVisible={setIsConnectModal} changeConnectFirst={changeConnectFirst} />
      <NetworkSettingModal isOpen={isModalNetworkSetting} setIsOpen={setModalNetworkSetting} />
    </div>
  );
};

export default MarketPlaceListingTransfer;
