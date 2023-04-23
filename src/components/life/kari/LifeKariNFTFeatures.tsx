import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import Image from 'next/image';
import { LifeKariTitle } from '@/components/life/kari/LifeKariTitle';

const LifeKariNFTFeatures = () => {
  const { t } = useTranslation('life');
  const nftList = t('kari.nftFeatures.list', { returnObjects: true });
  return (
    <div className={cn('kari-section', 'kari-features-wrap')}>
      <div className={cn('inner')}>
        <div className={cn('image-wrap')}>
          <Image src={`/assets/images/img/img_kari_features.png`} layout="fill" loader={NileCDNLoader} alt="" />
        </div>
        <div className={cn('text-content')}>
          <LifeKariTitle smallTitle="NFT Features" largeTitle="What is special about Kari" align="left" />
          <dl className={cn('features-list-wrap')}>
            {Object.keys(nftList).map((list, index) => (
              <div key={`altar-list-${index}`} className={cn('features-list')}>
                <dt>{t(`kari.nftFeatures.list.${index}.title`)}</dt>
                <dd>{t(`kari.nftFeatures.list.${index}.desc`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export { LifeKariNFTFeatures };
