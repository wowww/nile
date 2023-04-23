import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';

const DetailExplanation = () => {
  const { t } = useTranslation('dao');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (contentRef.current) {
        contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
      }
    } else {
      if (contentRef.current) {
        contentRef.current.style.maxHeight = '';
      }
    }
  }, [isOpen]);

  return (
    <div className={cn('governance-explanation-wrap')}>
      <strong className={cn('explanation-title')}>Explanation</strong>
      <p className={cn('explanation-content', isOpen && 'open')} ref={contentRef}>
        This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and
        budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here:
        {'\n'}
        {'\n'}
        https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request The GPC is seeking the following funding:
        Season 15 Total Need: $983,429 (413,206 GTC) 60 day reserves*: $462,085 (194,154 GTC) Amount Requested from Treasury $1,445,514 (607,360 GTC)
        *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.
        {'\n'}
        {'\n'}
        https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request The GPC is seeking the following funding:
        Season 15 Total Need: $983,429 (413,206 GTC) 60 day reserves*: $462,085 (194,154 GTC) Amount Requested from Treasury $1,445,514 (607,360 GTC)
        *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.
        {'\n'}
        {'\n'}
        https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request The GPC is seeking the following funding:
        Season 15 Total Need: $983,429 (413,206 GTC) 60 day reserves*: $462,085 (194,154 GTC) Amount Requested from Treasury $1,445,514 (607,360 GTC)
        *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.
        {'\n'}
        {'\n'}
        https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request The GPC is seeking the following funding:
        Season 15 Total Need: $983,429 (413,206 GTC) 60 day reserves*: $462,085 (194,154 GTC) Amount Requested from Treasury $1,445,514 (607,360 GTC)
        *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.
        {'\n'}
        {'\n'}
        https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request The GPC is seeking the following funding:
        Season 15 Total Need: $983,429 (413,206 GTC) 60 day reserves*: $462,085 (194,154 GTC) Amount Requested from Treasury $1,445,514 (607,360 GTC)
        *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.
        <Link href={'/'}>
          <a className={cn('explanation-link')}>Proposal link</a>
        </Link>
      </p>
      <div className={cn('more-btn-wrap')}>
        <button className={cn('more-btn', isOpen && 'open')} onClick={() => setIsOpen(!isOpen)}>
          {t('governance.showMore')}
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
      </div>
    </div>
  );
};

export default DetailExplanation;
