import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Input, Checkbox } from 'antd';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import { ReactSVG } from 'react-svg';
import dynamic from 'next/dynamic';

const WalletModal = dynamic(() => import('@/components/modal/WalletModal'), { ssr: false });

interface Props {
  step: number;
  setStep: (step: number) => void;
}

const Step2: React.FC<Props> = ({ step, setStep }) => {
  const { t } = useTranslation(['mypage', 'common']);

  const [confirmInput, setConfirmInput] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [btnActive, setBtnActive] = useState<boolean>(false);

  useEffect(() => {
    scrollTo(0, 0.1);
  }, []);

  useEffect(() => {
    if (confirmInput === 'DELETE') {
      setIsError(false);
    }
    if (confirmInput.length > 0) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [confirmInput]);

  const validateMessages = () => {
    if (confirmInput === 'DELETE') {
      setIsError(false);
      // setStep(step++);
      setIsModal(true);
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <div className={cn('step-wrap')}>
        <h3>{t('withdrawal.confirmText.title')}</h3>
        <p className={cn('confirm-desc')}>{t('withdrawal.confirmText.desc')}</p>
        <Input
          size="large"
          placeholder={t('withdrawal.confirmText.placeholder')}
          status={isError ? 'error' : ''}
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
        />
        {isError && (
          <span className={cn('error-message')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_warning.svg" />
            {t('withdrawal.confirmText.error')}
          </span>
        )}
        <div className={cn('bottom-area', 'step-two')}>
          <div className={cn('btn-wrap')}>
            <OutlineButton type="link" href="/mypage/profile" buttonText={t('withdrawal.cancel')} color="black" size="md" />
            <BgButton buttonText={t('withdrawal.next')} color="black" size="md" onClick={() => validateMessages()} disabled={!btnActive} />
          </div>
        </div>
      </div>
      {/* wemix wallet - process05 / metamask - process06 */}
      {/* <WalletModal isOpen={isModal} setIsOpen={setIsModal} type="process05" progressText="withdrawal" /> */}
      {/*<WalletModal isOpen={isModal} setIsOpen={setIsModal} type="process06" />*/}
      {/* 비밀번호 입력 실패 팝업 */}
      {/* <ModalLayout
        isOpen={isModal}
        setIsOpen={setIsModal}
        size="sm"
        title={t('withdrawal.failModal.title')}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <BgButton
            buttonText={t('confirm', { ns: 'common' })}
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              setIsModal(false);
            }}
          />,
        ]}
      >
        {t('withdrawal.failModal.desc')}
      </ModalLayout> */}
    </>
  );
};

export default Step2;
