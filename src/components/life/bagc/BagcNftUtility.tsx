import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import { NileCDNLoader } from '@/utils/image/loader';
import Image from 'next/image';

import BagcNftCard, { BagcNftCardType } from './BagcNftCard';

const BagcNftUtility = () => {
  /* 23.04.14 수정: i18n 추가 */
  const { t, i18n } = useTranslation(['life', 'common']);

  /* 통 이미지로 교체전 코드 (추후 하드코딩으로 변경될 여지가 있을 듯 하여 남겨둠) */
  // const cardData: BagcNftCardType[] = [
  //   {
  //     name: 'Albatross',
  //     image1: '/assets/images/img/bagc/img_bagc_albatross.png',
  //     image2: '/assets/images/img/bagc/img_bagc_albatross2.png',
  //     useGolf: 3,
  //     allocation: 15,
  //     bonus: [t('bagc.nftUtility.bonusData.1'), t('bagc.nftUtility.bonusData.2'), t('bagc.nftUtility.bonusData.3'), t('bagc.nftUtility.bonusData.4')],
  //   },
  //   {
  //     name: 'Hole in One',
  //     image1: '/assets/images/img/bagc/img_bagc_hole_in_one.png',
  //     image2: '/assets/images/img/bagc/img_bagc_hole_in_one2.png',
  //     allocation: 46,
  //     useGolf: 2,
  //     bonus: [t('bagc.nftUtility.bonusData.5'), t('bagc.nftUtility.bonusData.3'), t('bagc.nftUtility.bonusData.4')],
  //   },
  //   {
  //     name: 'Special Edition',
  //     image1: '/assets/images/img/bagc/img_bagc_special_edition.png',
  //     image2: '/assets/images/img/bagc/img_bagc_special_edition2.png',
  //     allocation: 90,
  //     useGolf: 0,
  //     bonus: [t('bagc.nftUtility.bonusData.6'), 'Voxel twins'],
  //   },
  //   {
  //     name: 'Eagle',
  //     image1: '/assets/images/img/bagc/img_bagc_eagle.png',
  //     image2: '/assets/images/img/bagc/img_bagc_eagle2.png',
  //     allocation: 149,
  //     useGolf: 0,
  //     bonus: [t('bagc.nftUtility.bonusData.6')],
  //   },
  // ];
  const cardData: BagcNftCardType[] = [
    {
      name: 'Albatross',
      image1: '/assets/images/img/bagc/img_bagc_albatross_ko.png',
      image2: '/assets/images/img/bagc/img_bagc_albatross_en.png',
      allocation: 15,
    },
    {
      name: 'Hole in One',
      image1: '/assets/images/img/bagc/img_bagc_hole_in_one_ko.png',
      image2: '/assets/images/img/bagc/img_bagc_hole_in_one_en.png',
      allocation: 46,
    },
    {
      name: 'Special Edition',
      image1: '/assets/images/img/bagc/img_bagc_special_edition_ko.png',
      image2: '/assets/images/img/bagc/img_bagc_special_edition_en.png',
      allocation: 90,
    },
    {
      name: 'Eagle',
      image1: '/assets/images/img/bagc/img_bagc_eagle_ko.png',
      image2: '/assets/images/img/bagc/img_bagc_eagle_en.png',
      allocation: 149,
    },
  ];

  return (
    <div className={cn('bagc-nft-utility-contain')}>
      <div className={cn('bagc-nft-utility-wrap')}>
        <div className={cn('title-wrap')}>
          <p>
            <Trans
              i18nKey="bagc.nftUtility.desc"
              ns="life"
              values={{ strong1: 'BAGC NEITH PFP', strong2: 'MERCH NFT' }}
              components={[<strong></strong>, <strong></strong>]}
            />
          </p>
        </div>
        <div className={cn('bagc-grade-benefit')}>
          <div className={cn('card-wrap')}>
            {/* 23.04.14 수정: 이미지 추가, class neith-pfp, merch-nft 삭제 */}
              <Image
              src={i18n.language === 'ko' ? '/assets/images/img/bagc/img_card_pfp_nft_ko.png' : '/assets/images/img/bagc/img_card_pfp_nft_en.png'}
              alt={t('bagc.nftUtility.detailInfo')}
                layout="fill"
                quality="100"
                objectFit="cover"
                loader={NileCDNLoader}
              />
          </div>
        </div>
        <div className={cn('bagc-card-wrap')}>
          {cardData.map((cd, i) => (
            <BagcNftCard cardData={cd} key={`${cd.name}-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BagcNftUtility;
