import { useEffect, useState } from 'react';
import { notification } from 'antd';
import cn from 'classnames';
import { windowResizeAtom } from '@/state/windowAtom';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

const useToastPopup = ({
  state,
  title,
  description,
  openModal,
}: {
  state: 'success' | 'fail';
  title: string;
  description: string;
  openModal: () => void;
}) => {
  const [walletToastPlacement, setWalletToastPlacement] = useState<'topRight' | 'bottom'>('topRight');
  const offset = useAtomValue(windowResizeAtom);

  const openWalletToastPopup = (placement: 'topRight' | 'bottom'): void => {
    notification.open({
      className: cn('wallet-toast', state),
      message: (
        <div className={cn('wallet-toast-title', state === 'success' ? 'success' : 'fail')}>
          <strong className={cn('title')}>
            {title}
            {/* Bid 완료 */}
            {/* Bid 실패 */}
          </strong>
          {state === 'fail' && <span className={cn('error')}>Network Error</span>}
        </div>
      ),
      description,
      duration: 5,
      btn: <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />,
      top: 64,
      onClick: () => {
        openModal();
        notification.destroy();
      },
      placement,
    });
  };

  const resizeWalletToast = () => {
    if (offset.width < 768) {
      setWalletToastPlacement('bottom');
    } else {
      setWalletToastPlacement('topRight');
    }
  };

  useEffect(() => {
    notification.destroy();
    const toast = setTimeout(() => {
      openWalletToastPopup(walletToastPlacement);
    }, 600);

    return () => {
      clearTimeout(toast);
    };
  }, [walletToastPlacement]);

  useEffect(() => {
    resizeWalletToast();
  }, [offset.width]);
};

export default useToastPopup;
