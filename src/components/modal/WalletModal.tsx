import cn from 'classnames';
import ModalLayout from './ModalLayout';
import Image from 'next/image';
import InfiniteLoader from '../loader/InfiniteLoader';

import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import {useEffect, useMemo} from 'react';
import OutlineButton from '@components/button/OutlineButton';
import { WalletModalType } from '@/types/modal.types';
import { nileWalletMetaAtom, NileWalletProviderType } from '@/state/nileWalletAtom';
import { useAtomValue } from 'jotai';

interface WalletModalProps {
  isOpen: boolean;
  setIsOpen: (isModal: boolean) => void;
  type?: WalletModalType;
  closable?: boolean;
  maskClosable?: boolean;
  onClickApprove?: () => void;
}

const WalletModal = ({ isOpen, setIsOpen, type, closable, maskClosable, onClickApprove }: WalletModalProps) => {
  const nileWalletMeta = useAtomValue(nileWalletMetaAtom);

  const modalContent = useMemo(() => {
    switch (type) {
      case WalletModalType.APPROVE_WEMIX$:
        return 'walletModal.process00-1';
      case WalletModalType.APPROVE_TRANSFER:
        return 'walletModal.process00-2';
      case WalletModalType.WAITING_APPROVE_WEMIX$:
        return 'walletModal.process01-1';
      case WalletModalType.WAITING_APPROVE_TRANSFER:
        return 'walletModal.process01-2';
      case WalletModalType.PAYMENT:
        return 'walletModal.process02';
      case WalletModalType.SIGN_WEMIX_WALLET:
        return 'walletModal.process03';
      case WalletModalType.SIGN_METAMASK:
        return 'walletModal.process04';
    }
  }, [type]);

  const { t } = useTranslation(['common', 'mypage']);

  const isWemixWallet = useMemo(() => {
    return nileWalletMeta?.description !== NileWalletProviderType.METAMASK_BROWSER_EXTENSION && nileWalletMeta?.description !== NileWalletProviderType.METAMASK_MOBILE_APP;
  }, [nileWalletMeta]);

  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="sm"
      wrapClassName={cn('wallet-modal-wrap')}
      footer={false}
      destroyOnClose={true}
      titleType="center"
      closable={closable}
      maskClosable={maskClosable}
    >
      <div className={cn('wallet-modal-content')}>
        <div className={cn('wallet-modal-bg')}>
          <Image
            src={`/assets/images/img/img_wallet_confirm_modal_progress${isWemixWallet ? '01' : '02'}.png`}
            width={360}
            height={200}
            alt={type === WalletModalType.PAYMENT ? '결제진행' : '거래요청 승인'}
            layout="responsive"
            loader={NileCDNLoader}
          />
        </div>
        <div className={cn('wallet-modal-text')}>
          {modalContent && <p>{t(modalContent, { wallet: isWemixWallet ? 'WEMIX Wallet' : 'Wallet' })}</p>}
          <div className={cn('wallet-modal-progress-box')}>
            {type === WalletModalType.APPROVE_WEMIX$ || type === WalletModalType.APPROVE_TRANSFER ? (
              <>
                <OutlineButton buttonText={t('approveButton', { ns: 'common' })} color="black" size="md" onClick={onClickApprove} />
              </>
            ) : (
              <>
                <span>
                  {(type === WalletModalType.WAITING_APPROVE_WEMIX$ || type === WalletModalType.WAITING_APPROVE_TRANSFER) && (
                    t('walletModal.progressText.1')
                  )}
                  {type === WalletModalType.PAYMENT && (
                    t('walletModal.progressText.2')
                  )}
                  {(type === WalletModalType.SIGN_METAMASK || type === WalletModalType.SIGN_WEMIX_WALLET) && (
                    t('walletModal.progressText.3')
                  )}
                </span>
                <InfiniteLoader size="sm" />
              </>
            )}
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default WalletModal;
