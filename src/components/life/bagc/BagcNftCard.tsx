import { NileCDNLoader } from '@/utils/image/loader';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';

type cardDataType = {
  cardData: BagcNftCardType;
};

export type BagcNftCardType = {
  image1: string;
  image2: string;
  name: string;
  allocation: number;
  // useGolf: number;
  // bonus: string[];
};

const BagcNftCard = ({ cardData }: cardDataType) => {
  const { t } = useTranslation(['life', 'common']);
  const { locale } = useRouter();
  return (
    <div className={cn('wrap-bagc-nft-card')}>
      <div className={cn('inner-bagc-nft-card')}>
        <Image
          src={locale === 'ko' ? cardData.image1 : cardData.image2}
          alt={'bagc nft card image'}
          layout="fill"
          quality="100"
          objectFit="contain"
          loader={NileCDNLoader}
        />
        {/* 통 이미지로 교체전 코드 (추후 하드코딩으로 변경될 여지가 있을 듯 하여 남겨둠) */}
        {/* <div className={cn('bagc-nft-card')}>
          <div className={cn('bagc-nft-img-wrap')}>
            <Image src={cardData.image1} alt={''} layout="fill" quality="100" objectFit="cover" loader={NileCDNLoader} />
          </div>
          <div className={cn('nft-detail-wrap')}>
            <div className={cn('nft-detail-info')}>
              <strong className={cn('card-name')}>BAGC NEITH PFP</strong>
              <ul>
                <li>
                  <span className={cn('card-title')}>{t('bagc.nftUtility.nftCard.title.1')}</span>
                  <span className={cn('card-desc')}>{cardData.useGolf}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={cn('bagc-nft-card')}>
          <div className={cn('bagc-nft-img-wrap')}>
            <Image src={cardData.image2} alt={''} layout="fill" quality="100" objectFit="cover" loader={NileCDNLoader} />
          </div>
          <div className={cn('nft-detail-wrap')}>
            <div className={cn('nft-detail-info')}>
              <strong className={cn('card-name')}>MERCH NFT</strong>
              <ul>
                <li>
                  <span className={cn('card-title')}>{t('bagc.nftUtility.nftCard.title.2')}</span>
                  <span className={cn('card-desc')}>
                    {cardData.bonus.map((bonus, i) => (
                      <span key={`${bonus}-${i}`}>{bonus}</span>
                    ))}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
      <strong className={cn('card-title')}>{cardData.name}</strong>
      <p className={cn('card-allocation')}>Allocation {cardData.allocation}</p>
    </div>
  );
};

export default BagcNftCard;
