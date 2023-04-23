import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { InputNumber, Popover, Select } from 'antd';
import BgButton from '@/components/button/BgButton';
import RefreshCountdownButton from '@/components/button/RefreshCountdownButton';
import OutlineButton from '@/components/button/OutlineButton';
import ConnectModal from '../modal/ConnectModal';
import NetworkSettingModal from '../modal/NetworkSettingModal';
import { Trans, useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { uuid } from 'uuidv4';
import BigNumber from 'bignumber.js';
import { useNumberFormatter } from '@utils/formatter/number';
import { useAtomValue } from 'jotai';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { useSetAtom } from 'jotai';
import { tokenListAtom, updateBalanceAtom } from '@/state/web3Atom';
import { weiToEther } from '@utils/web3Utils';
import { Moment } from 'moment';
import { MarketplaceDatePicker } from '@components/marketplace/datepicker/MarketplaceDatePicker';

const { Option } = Select;

interface stateType {
  isApproved?: boolean;
  oneTitle?: string;
  twoTitle?: string;
  price?: number | null;
  setPrice?: (amount: number | null) => void;
  onClickButton?: () => void;
}

const MarketPlaceListing = ({ isApproved, oneTitle, twoTitle, price, setPrice, onClickButton }: stateType) => {
  const { t } = useTranslation(['marketplace', 'common']);

  const { MaximumPrice, MinimumPrice, shorthanded } = useNumberFormatter();
  const [isConnectModal, setIsConnectModal] = useState<boolean>(false);
  const [isModalNetworkSetting, setModalNetworkSetting] = useState(false);
  const tokens = useAtomValue(tokenListAtom);

  const [coinBalance, setCoinBalance] = useState('0');
  const [balance, setBalance] = useState('0');

  const [estimatedGasFee, setEstimatedGasFee] = useState('0');
  const [etherGas, setEtherGas] = useState('0');

  const nileWallet = useAtomValue(nileWalletAtom);

  const updateBalance = useSetAtom(updateBalanceAtom);

  const Id = uuid();

  const getBalance = () => {
    if (!nileWallet) {
      return;
    }

    updateBalance().then(() => {
      setCoinBalance(tokens?.find((token) => token.symbol === 'wemix')?.balance ?? '0');
      setBalance(tokens?.find((token) => token.symbol === 'wemix$')?.balance ?? '0');
    });
  };

  const changeConnectFirst = () => {
    setModalNetworkSetting(true);
  };

  const checkFee = async () => {
    const gasPrice = await provider.web3.eth.getGasPrice();
    setEstimatedGasFee(gasPrice);
    setEtherGas(weiToEther(gasPrice));
  };

  const platformFee = useMemo(() => {
    if (!price) {
      return 0;
    }
    return new BigNumber(price).multipliedBy(0.025).toNumber();
  }, [price]);

  const creatorFee = useMemo(() => {
    if (!price) {
      return 0;
    }
    return new BigNumber(price).multipliedBy(0.1).toNumber();
  }, [price]);

  const totalProfit = useMemo(() => {
    if (!price) {
      return 0;
    }
    return new BigNumber(price).minus(platformFee).minus(creatorFee).toNumber();
  }, [price, platformFee, creatorFee]);

  useEffect(() => {
    evtRefresh();
  }, []);

  const evtRefresh = () => {
    getBalance();
    checkFee();
  };

  const isApproveDisabled = useMemo(() => {
    if (!price) {
      return true;
    }
    if (price <= 0) {
      return true;
    }
    return false;
  }, [isApproved, price]);

  return (
    <div className={cn('listing-area')}>
      <strong className={cn('listing-title')}>Set a fixed price</strong>
      <div className={cn('listing-form-wrap')}>
        <Select
          size="large"
          defaultValue="WEMIX$"
          key={Id}
          suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
          popupClassName="select-size-lg-dropdown"
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          disabled // 현재는 WEMIX$만 지원
        >
          <Option value="WEMIX$">WEMIX$</Option>
          <Option value="WEMIX">WEMIX</Option>
        </Select>
        <InputNumber
          size="large"
          controls={false}
          value={price}
          max={MaximumPrice}
          min={MinimumPrice}
          onChange={setPrice}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
          placeholder={t('listing.price.placeholder', { ns: 'marketplace' })}
        />
      </div>

      <div className={cn('listing-form-desc')}>{t('makeOfferPopup.notice', { ns: 'common' })}</div>
      <div className={cn('listing-list-wrap')}>
        <div className={cn('list-item-area')}>
          <p className={cn('list-item-title')}>{oneTitle}</p>
          <dl className={cn('list-content')}>
            <div className={cn('list-cont')}>
              <dt>
                <Trans
                  i18nKey="listing.txt3"
                  ns="marketplace"
                  values={{
                    rate: '2.5',
                  }}
                />
              </dt>
              <dd>- {shorthanded(platformFee, { digits: 4 })} WEMIX$</dd>
              <dt>
                <Trans
                  i18nKey="listing.txt4"
                  ns="marketplace"
                  values={{
                    rate: '10',
                  }}
                />
              </dt>
              <dd>- {shorthanded(creatorFee, { digits: 4 })} WEMIX$</dd>
            </div>
            <div className={cn('list-unit')}>
              <dt>{t('listing.txt5')}</dt>
              <dd>
                <em>{shorthanded(totalProfit, { digits: 4 })}</em> WEMIX$
              </dd>
            </div>
          </dl>
        </div>
        <div className={cn('list-item-area')}>
          <p className={cn('list-item-title')}>{twoTitle}</p>
          <dl className={cn('list-content')}>
            <div className={cn('list-cont')}>
              <dt>
                {t('listing.txt6')}
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="top"
                    content={<div className={cn('tooltip-contents')}>Gas Fee는 실시간으로 변동될 수 있습니다.</div>}
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
        <BgButton
          buttonText={isApproved ? t('createListing', { ns: 'common' }) : t('approveButton', { ns: 'common' })}
          color="black"
          size="md"
          disabled={isApproveDisabled}
          onClick={onClickButton}
        />
      </div>
      <ConnectModal isModalVisible={isConnectModal} setIsModalVisible={setIsConnectModal} changeConnectFirst={changeConnectFirst} />
      <NetworkSettingModal isOpen={isModalNetworkSetting} setIsOpen={setModalNetworkSetting} />
    </div>
  );
};

export default MarketPlaceListing;
