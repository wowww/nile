import cn from 'classnames';

import BgButton from '@/components/button/BgButton';
import dynamic from 'next/dynamic';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
}

const NetworkModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <ModalLayout wrapClassName="network-modal" isOpen={isOpen} setIsOpen={setIsOpen} size="sm" title="WEMIX Mainnet 변경" destroyOnClose={true}>
      <p>WEMIX Mainnet으로의 네트워크 변경이 필요합니다.</p>
      <div className={cn('contents-wrap')}>
        <strong>연결중인 네트워크</strong>
        <p className={cn('network-name')}>Polygon Network</p>
        <BgButton
          buttonText="WEMIX Mainnet 변경"
          color="black"
          size="md"
          key="Save"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
    </ModalLayout>
  );
};

export default NetworkModal;
