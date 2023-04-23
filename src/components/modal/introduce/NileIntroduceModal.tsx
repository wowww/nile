import { useEffect, useRef, useState } from 'react';
import { windowResizeAtom } from '@/state/windowAtom';
/* 22.11.07 수정: Trans, useTranslation 추가 */
import { Trans, useTranslation } from 'next-i18next';
/* 22.11.16 수정: Link 태그 추가 */
import Link from 'next/link';
import cn from 'classnames';
/* 22.11.16 수정: useRouter 추가 */
import { useRouter } from 'next/router';

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

const NileIntroduceModal = ({ isOpen, setIsOpen, setDisAgreeOpen }: Props) => {
  /* 22.11.07 수정: useTranslation 추가 */
  const { t } = useTranslation(['common']);
  const checkWrap = useRef<HTMLDivElement>(null);
  const offset = useAtomValue(windowResizeAtom);
  const [destroyClose, setDestroyClose] = useState<boolean>(false);
  const [termsCheck, setTermsCheck] = useState<boolean>(false);
  /* 22.11.09 수정: termsCheck2 추가 */
  const [termsCheck2, setTermsCheck2] = useState<boolean>(false);
  const [checkWrapHeight, setCheckWrapHeight] = useState<number>(0);
  /* 22.11.16 수정: locale 추가 */
  const { locale } = useRouter();

  useEffect(() => {
    isOpen && setDestroyClose(true);
    !isOpen && setTermsCheck(false);
  }, [isOpen]);

  useEffect(() => {
    if (checkWrap.current === null) return;

    setCheckWrapHeight(checkWrap.current.scrollHeight);
  }, [destroyClose, offset.width]);

  const termLink = () => {
    return (
      <Link href="/policy/terms">
        <a>{t('nileIntroduceModal.nftTerm')}</a>
      </Link>
    );
  };

  return (
    <ModalLayout
      destroyOnClose={destroyClose}
      wrapClassName="service-info-modal"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="lg"
      title={t('nileIntroduceModal.title')}
      style={{ '--check-wrap-height': `${checkWrapHeight}px` } as React.CSSProperties}
      footer
      footerContent={[
        <OutlineButton
          key="DisAgree"
          buttonText={t('disagree')}
          color="black"
          size="lg"
          onClick={() => {
            setIsOpen(false);
            setDisAgreeOpen(true);
          }}
        />,
        <BgButton
          key="Agree"
          buttonText={t('agree')}
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
          <li>{t('nileIntroduceModal.txt.1')}</li>
          <li>{t('nileIntroduceModal.txt.2')}</li>
          <li>{t('nileIntroduceModal.txt.3')}</li>
          <li>{t('nileIntroduceModal.txt.4')}</li>
          <li>{t('nileIntroduceModal.txt.5')}</li>
          <li>{t('nileIntroduceModal.txt.6')}</li>
          <li>{t('nileIntroduceModal.txt.7')}</li>
          <li>{t('nileIntroduceModal.txt.8')}</li>
          <li>{t('nileIntroduceModal.txt.9')}</li>
          <li>{t('nileIntroduceModal.txt.10')}</li>
          <li>{t('nileIntroduceModal.txt.11')}</li>
          <li>{t('nileIntroduceModal.txt.12')}</li>
          <li>{t('nileIntroduceModal.txt.13')}</li>
          <li>{t('nileIntroduceModal.txt.14')}</li>
          <li>{t('nileIntroduceModal.txt.15')}</li>
          <li>{t('nileIntroduceModal.txt.16')}</li>
        </ul>
      </div>
      <div className={cn('check-wrap')} ref={checkWrap}>
        <Checkbox checked={termsCheck} onChange={() => setTermsCheck(!termsCheck)}>
          <Trans
            i18nKey="nileIntroduceModal.agree"
            ns="common"
            values={{
              a: t('nileIntroduceModal.term'),
            }}
          >
            {/* 22.11.16 수정: 언어 분기 추가 */}
            <a href={`https://wemixnetwork.com/policy/termsForPlay/${locale}`} target="_blank" rel="noopener noreferrer" title={t('blank')}></a>
          </Trans>
        </Checkbox>
        {/* 22.11.09 수정: Checkbox 추가 */}
        <Checkbox checked={termsCheck2} onChange={() => setTermsCheck2(!termsCheck2)}>
          <Trans
            i18nKey="nileIntroduceModal.agree"
            ns="common"
            values={{
              a: t('nileIntroduceModal.nftTerm'),
            }}
          >
            {/* 22.11.16 수정: 언어 분기 추가 */}
            <a href={`/${locale}/policy/terms`}></a>
          </Trans>
        </Checkbox>
      </div>
    </ModalLayout>
  );
};

export default NileIntroduceModal;
