import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { Input, message } from 'antd';
import { useTranslation } from 'next-i18next';
import CopyToClipboard from 'react-copy-to-clipboard';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';

import BgButton from '@/components/button/BgButton';
import { IconLogo } from '@components/logo/IconLogo';
import ModalLayout from '@components/modal/ModalLayout';

interface CommunityModalType {
  warning: string;
  warningDetail: string;
  copyLink: string;
  warningSvg: string;
  qrSvg: string;
  isOpen: boolean;
  setIsModal: (isModal: boolean) => void;
}

const CommunityChannelAdmissionModal = ({ isOpen, setIsModal, warning, warningDetail, copyLink, warningSvg, qrSvg }: CommunityModalType) => {
  const { t } = useTranslation('community');
  return (
    <>
      <ModalLayout
        isOpen={isOpen}
        setIsOpen={setIsModal}
        title={t('communityPopUp.enter')}
        destroyOnClose={true}
        wrapClassName={cn('community-modal-contain')}
      >
        <div className={cn('community-modal-wrap')}>
          <div className={cn('community-top-wrap')}>
            <div className={cn('community-title-svg')}>
              {/* 23.03.21 수정: width height 사이즈 수정 */}
              <span className={cn('icon-logo-wrap')} style={{ width: '46px', height: '46px' }}>
                <Image src={warningSvg} alt="" layout="fill" quality={100} loader={NileCDNLoader} />
              </span>
            </div>
            <strong className={cn('warning-title')}>{warning}</strong>
            <p className={cn('warning-detail')}>{warningDetail}</p>
          </div>
          <div className={cn('community-detail-wrap')}>
            <strong className={cn('detail-info-title')}>{t('communityPopUp.title')}</strong>
            <div className={cn('community-qr-icon')}>
              <Image src={qrSvg} alt="" layout="responsive" quality={100} width="100%" height="100%" loader={NileCDNLoader} />
            </div>
            <strong className={cn('detail-info-bottom')}>{t('communityPopUp.info')}</strong>
          </div>
          <div className={cn('community-bottom-wrap')}>
            <Input readOnly size="small" className={cn('copy-input')} value={copyLink} />
            <CopyToClipboard text={copyLink}>
              <BgButton
                buttonText={t('communityPopUp.copy')}
                color="black"
                size="sm"
                key="Back"
                onClick={() => message.info({ content: t('communityPopUp.copyLinkInfo') })}
              />
            </CopyToClipboard>
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default CommunityChannelAdmissionModal;
