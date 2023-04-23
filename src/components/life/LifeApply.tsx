import { useState } from 'react';
import cn from 'classnames';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

import OutlineButton from '../button/OutlineButton';
import dynamic from 'next/dynamic';
import { useAtom, useAtomValue } from 'jotai';
import { termAgreementAtom, termModalAtom } from '@/state/termAtom';

const TermsModal = dynamic(() => import('@components/modal/TermsModal'), { ssr: false });
const LifeAskToJoinModal = dynamic(() => import('@/components/modal/LifeAskToJoinModal'), { ssr: false });

const LifeApply = () => {
  const [isAskToJoinModal, setIsAskToJoinModal] = useState<boolean>(false);
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['life', 'common']);
  // 페이지 첫 진입 시 토스트 팝업 렌더링 방지
  const [isInit, setIsInit] = useState<boolean>(true);
  const [isModalTermAgree, setModalTermAgree] = useState(false);
  const [visibleTerms, setVisibleTerms] = useAtom(termModalAtom);
  const termAgreement = useAtomValue(termAgreementAtom);

  return (
    <div className={cn('life-apply')}>
      <h2 className={cn('apply-title')}>Make your own project on Life.</h2>
      {/* <p className={cn('apply-desc')}>{t('home.apply.desc')}</p> */}
      <div className={cn('apply-button-wrap')}>
        <OutlineButton
          buttonText={t('modalJoin.button', { ns: 'common' })}
          color="white"
          size="md"
          onClick={() => {
            if (termAgreement.agreement) {
              setIsAskToJoinModal(true);
            } else {
              setVisibleTerms(true);
            }
            setIsInit(false);
          }}
        ></OutlineButton>
      </div>
      <LifeAskToJoinModal isModal={isAskToJoinModal} setIsModal={setIsAskToJoinModal} />
      <TermsModal isOpen={visibleTerms} setIsOpen={setVisibleTerms} setDisAgreeOpen={setModalTermAgree} onSuccess={() => setIsAskToJoinModal(true)} />
    </div>
  );
};

export default LifeApply;
