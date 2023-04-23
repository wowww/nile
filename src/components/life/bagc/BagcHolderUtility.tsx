import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import BagcHolderCard, { HolderCardType } from './BagcHolderCard';

const BagcHolderUtility = () => {
  const { t } = useTranslation(['life', 'common']);
  const { locale } = useRouter();
  const holderCardData: HolderCardType[] = [
    {
      title: t('bagc.holder.cardData.1.title'),
      desc: t('bagc.holder.cardData.1.desc'),
      image: '/assets/images/img/bagc/img_bagc_holder_nft_1.png',
    },
    {
      title: t('bagc.holder.cardData.2.title'),
      desc: t('bagc.holder.cardData.2.desc'),
      image: '/assets/images/img/bagc/img_bagc_holder_nft_2.png',
    },
    {
      title: t('bagc.holder.cardData.3.title'),
      desc: t('bagc.holder.cardData.3.desc'),
      image: `/assets/images/img/bagc/img_bagc_holder_nft_${locale}_3.png`,
    },
    {
      title: t('bagc.holder.cardData.4.title'),
      desc: t('bagc.holder.cardData.4.desc'),
      image: '/assets/images/img/bagc/img_bagc_holder_nft_4.png',
    },
  ];

  return (
    <div className={cn('bagc-nft-holder-contain')}>
      <div className={cn('bagc-nft-holder-wrap')}>
        <div className={cn('title-wrap')}>
          <strong>{t('bagc.holder.title')}</strong>
          <p>{t('bagc.holder.subTitle')}</p>
        </div>
        <div className={cn('holder-card-wrap')}>
          {holderCardData.map((hcd, i) => (
            <BagcHolderCard cardData={hcd} key={`holder-detail-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BagcHolderUtility;
