import { useEffect, useRef, useState } from 'react';
import { windowResizeAtom } from '@/state/windowAtom';
/* 22.11.07 수정: Trans, useTranslation 추가 */
import { Trans, useTranslation } from 'next-i18next';
import cn from 'classnames';

import { Checkbox } from 'antd';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import { useAtomValue } from 'jotai';
import dynamic from "next/dynamic";

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: (isPopup: boolean) => void;
  setDisAgreeOpen: (isPopup: boolean) => void;
}

const ServiceIntroduceModal = ({ isOpen, setIsOpen, setDisAgreeOpen }: Props) => {
  /* 22.11.07 수정: useTranslation 추가 */
  const { t } = useTranslation(['common']);
  const checkWrap = useRef<HTMLDivElement>(null);
  const offset = useAtomValue(windowResizeAtom);
  const [destroyClose, setDestroyClose] = useState<boolean>(false);
  const [termsCheck, setTermsCheck] = useState<boolean>(false);
  /* 22.11.09 수정: termsCheck2 추가 */
  const [termsCheck2, setTermsCheck2] = useState<boolean>(false);
  const [checkWrapHeight, setCheckWrapHeight] = useState<number>(0);

  useEffect(() => {
    isOpen && setDestroyClose(true);
    !isOpen && setTermsCheck(false);
  }, [isOpen]);

  useEffect(() => {
    if (checkWrap.current === null) return;

    setCheckWrapHeight(checkWrap.current.scrollHeight);
  }, [destroyClose, offset.width]);

  return (
    <ModalLayout
      destroyOnClose={destroyClose}
      wrapClassName="service-info-modal"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="lg"
      title={t('serviceIntroduceModal.title')}
      style={{ '--check-wrap-height': `${checkWrapHeight}px` } as React.CSSProperties}
      footer
      footerContent={[
        <OutlineButton
          key="DisAgree"
          buttonText={t('serviceIntroduceModal.btn1')}
          color="black"
          size="lg"
          onClick={() => {
            setIsOpen(false);
            setDisAgreeOpen(true);
          }}
        />,
        <BgButton
          key="Agree"
          buttonText={t('serviceIntroduceModal.btn2')}
          color="black"
          size="lg"
          /* 22.11.09 수정: disabled 조건 변경 */
          disabled={termsCheck === true && termsCheck2 === true ? false : true}
          onClick={() => {
            setIsOpen(false);
          }}
        />,
      ]}
    >
      <div className={cn('check-list-wrap')}>
        <ul className={cn('check-list')}>
          {/* 22.11.09 수정: 다국어 추가 */}
          <li>{t('serviceIntroduceModal.txt')}</li>
          <li>{t('serviceIntroduceModal.txt2')}</li>
          <li>{t('serviceIntroduceModal.txt3')}</li>
          <li>{t('serviceIntroduceModal.txt4')}</li>
          <li>{t('serviceIntroduceModal.txt5')}</li>
          <li>{t('serviceIntroduceModal.txt6')}</li>
          <li>{t('serviceIntroduceModal.txt7')}</li>
          <li>{t('serviceIntroduceModal.txt8')}</li>
          <li>{t('serviceIntroduceModal.txt9')}</li>
          <li>{t('serviceIntroduceModal.txt10')}</li>
          <li>{t('serviceIntroduceModal.txt11')}</li>
          <li>{t('serviceIntroduceModal.txt12')}</li>
          <li>{t('serviceIntroduceModal.txt13')}</li>
          <li>{t('serviceIntroduceModal.txt14')}</li>
          <li>{t('serviceIntroduceModal.txt15')}</li>
          <li>{t('serviceIntroduceModal.txt16')}</li>
        </ul>
      </div>
      <div className={cn('check-wrap')} ref={checkWrap}>
        <Checkbox checked={termsCheck} onChange={() => setTermsCheck(!termsCheck)}>
          <Trans
            i18nKey="serviceIntroduceModal.agree"
            ns="common"
            values={{
              a: t('serviceIntroduceModal.term'),
            }}
          >
            <a href="https://wemixnetwork.com/policy/termsForPlay/en" target="_blank" rel="noopener noreferrer" title="새창열림"></a>
          </Trans>
        </Checkbox>
        {/* 22.11.09 수정: Checkbox 추가 */}
        <Checkbox checked={termsCheck2} onChange={() => setTermsCheck2(!termsCheck2)}>
          <Trans
            i18nKey="serviceIntroduceModal.agree"
            ns="common"
            values={{
              a: t('serviceIntroduceModal.nftTerm'),
            }}
          >
            <a href="/policy/terms"></a>
          </Trans>
        </Checkbox>
      </div>
    </ModalLayout>
  );
};

export default ServiceIntroduceModal;
