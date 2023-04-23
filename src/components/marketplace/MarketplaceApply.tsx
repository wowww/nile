import React, { useState } from 'react';
import cn from 'classnames';

import OutlineButton from '@/components/button/OutlineButton';
import MarqueeBanner from '../marquee/MarqueeBanner';
import { useTranslation } from 'next-i18next';
import BgButton from '@components/button/BgButton';
import dynamic from 'next/dynamic';
import { useAtom, useAtomValue } from 'jotai';
import { termAgreementAtom, termModalAtom } from '@/state/termAtom';

const AskToJoinModal = dynamic(() => import('@/components/modal/AskToJoinModal'), { ssr: false });
const TermsModal = dynamic(() => import('@components/modal/TermsModal'), { ssr: false });
const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

const MarketplaceApply = () => {
  const { t } = useTranslation(['marketplace', 'common']);
  const [isModalTermAgree, setModalTermAgree] = useState(false);
  const [isAskToJoinModal, setIsAskToJoinModal] = useState<boolean>(false);
  const [visibleTerms, setVisibleTerms] = useAtom(termModalAtom);
  const termAgreement = useAtomValue(termAgreementAtom);
  const nftList = ['COLLECTIBLES', 'PIXEL ART', 'PFP', 'MOVE TO EARN', 'PLAY TO EARN', 'UTILITY', 'TALK TO EARN', 'RELAX TO EARN', 'SPORTS', 'MUSIC'];

  return (
    <div className={cn('marketplace-apply')}>
      <h2 className={cn('apply-title')}>{t('bottom.title')}</h2>
      <p className={cn('apply-desc')}>{t('bottom.notice')}</p>
      <MarqueeBanner itemList={nftList} loopTimes={4} />
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
          }}
        ></OutlineButton>
      </div>
      <AskToJoinModal isModal={isAskToJoinModal} setIsModal={setIsAskToJoinModal} forceRender />
      <TermsModal
        isOpen={visibleTerms}
        setIsOpen={setVisibleTerms}
        setDisAgreeOpen={setModalTermAgree}
        onSuccess={() => setIsAskToJoinModal(true)}
        forceRender
      />
      <ModalLayout
        isOpen={isModalTermAgree}
        setIsOpen={setModalTermAgree}
        size="sm"
        title="이용약관 동의"
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <BgButton
            buttonText="OK"
            color="black"
            size="md"
            key="OK"
            onClick={() => {
              setModalTermAgree(false);
            }}
          />,
        ]}
      >
        <p>NILE 이용약관 및 개인정보 보호정책에 동의하지 않으면, 서비스를 이용할 수 없습니다.</p>
      </ModalLayout>
    </div>
  );
};

export default MarketplaceApply;
