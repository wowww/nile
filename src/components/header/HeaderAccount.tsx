import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Avatar, Button, Modal, Popover, Tabs } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'next-i18next';

import ModalLayout from '@components/modal/ModalLayout';
import Tag from '@components/tag/Tag';

import { ReactSVG } from 'react-svg';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { nileWalletAtom, nileWalletMetaAtom, NileWalletProviderType, provider } from '@/state/nileWalletAtom';
import { useAtomValue } from 'jotai';
import { useSetAtom } from 'jotai';
import { updateBalanceAtom } from '@/state/web3Atom';
import { windowResizeAtom } from '@/state/windowAtom';
import { HeaderAccountCoinTab } from '@components/header/HeaderAccountCoinTab';
import { useLayoutResize } from '@utils/layout';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  setOpenChange: (newVisible: boolean) => void;
}

const HeaderAccount = ({ isOpen, setIsOpen, setOpenChange }: ModalProps) => {
  const { t } = useTranslation('common');

  const { shorten } = useWalletFormatter();
  const { isMobile } = useLayoutResize();

  const nileWallet = useAtomValue(nileWalletAtom);
  const nileWalletMeta = useAtomValue(nileWalletMetaAtom);
  const updateBalance = useSetAtom(updateBalanceAtom);

  const [isModalServiceAgree, setModalServiceAgree] = useState(false);
  const [isModalDisconnect, setModalDisconnect] = useState(false);

  useEffect(() => {
    updateBalance();
  }, [isOpen]);

  const walletProvider = useMemo(() => {
    if (!nileWalletMeta) {
      return '';
    }
    const { description } = nileWalletMeta;
    if (description === NileWalletProviderType.WEMIX_WALLET_MOBILE_APP) {
      return 'Wemix Wallet';
    }
    if (description === NileWalletProviderType.WEMIX_WALLET_MOBILE_APP_DESC) {
      return 'Wemix Wallet';
    }
    if (description === NileWalletProviderType.METAMASK_BROWSER_EXTENSION) {
      return 'Metamask';
    }
    if (description === NileWalletProviderType.METAMASK_MOBILE_APP) {
      return 'Metamask';
    }
    return '';
  }, [nileWalletMeta]);

  const AccountTabs = [
    {
      label: t('header.account.holdingCoin'),
      key: 'coin',
      children: <HeaderAccountCoinTab />,
    },
    // TODO: Transaction tab 추후 오픈
    // {
    //   label: t('header.account.transaction'),
    //   key: 'transaction',
    //   children: <HeaderAccountTransactionTab isOpen={isOpen} />,
    // },
  ];

  const [isCopyPush, setIsCopyPush] = useState(false);

  const _handleCopy = () => {
    setIsCopyPush(true);
    setTimeout(() => setIsCopyPush(false), 2000);
  };

  const AccountContents = (
    <>
      <div className={cn('account-top')}>
        <div className={cn('button-wrap')}>
          <button type="button" className={cn('btn-disconnect')} onClick={() => setModalDisconnect(true)}>
            <Tag size="s" color="light-gray">
              {t('disconnect')}
            </Tag>
          </button>
        </div>
        <div className={cn('user-info-wrap')}>
          {/* 22.11.17 수정: 메타마스크 연결 시 metamask 이미지로 추가 */}
          {walletProvider === 'Wemix Wallet' ? (
            <Avatar className={cn('user-image wemix-wallet')} size={40} />
          ) : (
            <Avatar className={cn('user-image metamask')} size={40} />
          )}
          <div>
            <span className={cn('btn-open-wallet')}>{walletProvider}</span>
            {/* <Dropdown
              overlayClassName="account-wallet-list"
              overlay={
                <ul>
                  <li>
                    <button
                      className={cn('wallet-item')}
                      onClick={() => {
                        setModalServiceAgree(true);
                      }}
                    >
                      WEMIX Wallet
                    </button>
                  </li>
                  <li>
                    <button
                      className={cn('wallet-item')}
                      onClick={() => {
                        setModalServiceAgree(true);
                      }}
                    >
                      MetaMask <IconCheck />
                    </button>
                  </li>
                </ul>
              }
              trigger={['click']}
              placement="bottomLeft"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button" className={cn('btn-open-wallet')}>
                MetaMask <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg'  />
              </button>
            </Dropdown> */}
            <div className={cn('user-id-wrap')}>
              <CopyToClipboard text={nileWallet}>
                <button className={cn('btn-copy-id')} onClick={() => _handleCopy()}>
                  <span className={cn('user-id')}>{shorten(nileWallet)}</span>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg" />
                </button>
              </CopyToClipboard>
              <div className={cn('account-tooltip', isCopyPush ? 'active' : '')}>{t('copyWalletAnnounce')}</div>
              <span className={cn('a11y')}>{t('copyWallet')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cn('account-body')}>
        <Tabs defaultActiveKey="coin" className={cn('tab-type tab-md tab-full tab-underline')} items={AccountTabs} />
      </div>
    </>
  );

  const onCancel = useCallback(() => {
    Modal.destroyAll();
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      {!isMobile ? (
        <Popover
          destroyTooltipOnHide={true}
          overlayClassName={'header-account header-inner-popup'}
          placement="bottom"
          content={AccountContents}
          trigger="click"
          open={isOpen}
          onOpenChange={setOpenChange}
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
        ></Popover>
      ) : (
        <Modal
          destroyOnClose={true}
          wrapClassName={`header-account-wrap ${isOpen && 'active'}`}
          className="header-account"
          open={isOpen}
          closable={true}
          onCancel={onCancel}
          width={'none'}
          footer={null}
          closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
          transitionName=""
        >
          {AccountContents}
        </Modal>
      )}

      {/* 월렛 변경 확인 팝업 */}
      <ModalLayout
        destroyOnClose={true}
        isOpen={isModalServiceAgree}
        setIsOpen={setModalServiceAgree}
        size="sm"
        title={t('header.account.confirmChangeWallet')}
        footer={true}
        footerContent={[
          <Button
            key="ok"
            className={cn('btn btn-bg bg-black btn-md')}
            onClick={() => {
              setModalServiceAgree(false);
              onCancel();
            }}
          >
            OK
          </Button>,
        ]}
      >
        {t('header.account.disconnectWalletMessage')}
      </ModalLayout>

      {/* 월렛 연결 해제 팝업 */}
      <ModalLayout
        destroyOnClose={true}
        isOpen={isModalDisconnect}
        setIsOpen={setModalDisconnect}
        size="sm"
        title={t('disconnectWallet')}
        footer={true}
        footerContent={[
          <Button
            key="cancel"
            className={cn('btn btn-outline outline-black btn-md')}
            onClick={() => {
              setModalDisconnect(false);
            }}
          >
            {t('cancel')}
          </Button>,
          <Button
            key="ok"
            className={cn('btn btn-bg bg-black btn-md')}
            onClick={() => {
              provider.disconnect();
              onCancel();
            }}
          >
            {t('clear')}
          </Button>,
        ]}
      >
        {t('header.account.clearWalletConnectMessage', { wallet: 'wallet' })}
      </ModalLayout>
    </>
  );
};

export default HeaderAccount;
