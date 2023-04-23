import cn from 'classnames';

import { ReactSVG } from 'react-svg';
import { message, Modal } from 'antd';
import { useTranslation } from 'next-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
}

const NetworkSettingModal = ({ isOpen, setIsOpen }: Props) => {
  const { t } = useTranslation(['common']);

  const data = [
    { name: t('networkSettingModal.item.0'), value: 'WEMIX_Mainnet' },
    { name: t('networkSettingModal.item.1'), value: 'https://api.wemix.com' },
    { name: t('networkSettingModal.item.2'), value: '1111' },
    { name: t('networkSettingModal.item.3'), value: 'WEMIX' },
    { name: t('networkSettingModal.item.4'), value: 'https://explorer.wemix.com' },
  ];

  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);
  };

  return (
    <Modal
      title={t('networkSettingModal.title')}
      open={isOpen}
      onCancel={onCancel}
      centered={false}
      className={cn('modal-wrap', 'modal-size-lg')}
      wrapClassName={cn('network-setting-modal', { active: isOpen })}
      closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />}
      footer={null}
      width="100%"
      closable={true}
      destroyOnClose={true}
    >
      <div className={cn('content-wrap')}>
        <ul className={cn('network-setting-wrap')}>
          {data.map((item, index) => {
            return (
              <li key={`item${index}`} className={cn('list')}>
                <span className={cn('name')}>{item.name}</span>
                <button className={cn('btn-copy-id')} onClick={() => message.info({ content: t('completeCopy'), key: 'toast' })}>
                  <span className={cn('value')}>{item.value}</span>
                  <CopyToClipboard text={item.value}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg" />
                  </CopyToClipboard>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};

export default NetworkSettingModal;
