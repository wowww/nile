import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import { Avatar } from 'antd';
import MarketplaceSubBanner from '@/components/marketplace/MarketplaceSubBanner';
import { PropertyCard } from '@components/marketplace/collection/PropertyCard';
import { useTranslation } from 'next-i18next';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { NileNftMetadata } from '@/models/nile/marketplace/NileNft';
import { NileApiService } from '@/services/nile/api';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { useAtomValue } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';
import { useImmersiveMode } from '@/hook/useImmersiveMode';
import MarketplaceDetailRecommend from '@components/marketplace/detail/MarketplaceDetailRecommend';

export type MarketplaceDetailAbout = {
  metadata?: NileNftMetadata;
};

type SnsData = {
  [index: string]: SnsLinkType[];
};

type SnsLinkType = {
  link: string;
  name: string;
  icon: ReactNode;
};

const MarketplaceDetailAbout = ({ metadata }: MarketplaceDetailAbout) => {
  const immersiveMode = useImmersiveMode();
  const { i18n, t } = useTranslation('marketplace');
  const { shorten } = useWalletFormatter();
  const api = NileApiService();
  const nft = useAtomValue(marketNftAtom);

  const [creator, setCreator] = useState<NileUserAccount>();

  /* 23.03.10 수정: TODO: neith 분기를 위한 임시 타입
  const TYPE = 'neith';*/

  useEffect(() => {
    api.user.account
      .getUserInfo(nft?.token?.collection?.ownerAddress ?? '')
      .then(({ data }) => setCreator(data.result))
      .catch(({ response }) => {
        return null;
      });
  }, [nft]);

  const snsList: SnsData = useMemo(
    () => ({
      lus: [
        {
          link: 'https://picdotstudio.com',
          name: 'homepage',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_homepage.svg" />,
        },
        {
          link: 'https://twitter.com/PICDOT',
          name: 'twitter',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />,
        },
        {
          link: 'https://www.instagram.com/picdot_studio/',
          name: 'instagram',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_instagram.svg" />,
        },
      ],
      son: [
        {
          link: 'https://twitter.com/rokkankim',
          name: 'twitter',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />,
        },
        {
          link: 'https://www.instagram.com/rokkankim/',
          name: 'instagram',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_instagram.svg" />,
        },
        {
          link: 'https://www.youtube.com/channel/UCd_rQ3v_lftgiKFVgYS2CQg',
          name: 'youtube',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_youtube.svg" />,
        },
      ],
      ttps: [
        {
          link: 'https://tangled.im/',
          name: 'homepage',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_homepage.svg" />,
        },
        {
          link: 'https://twitter.com/tangled_NFT',
          name: 'twitter',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />,
        },
        {
          link: 'https://discord.com/invite/tUNwSykFGb',
          name: 'discord',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_discord.svg" />,
        },
      ],
      kari: [
        {
          link: 'https://twitter.com/Ari_Project_10k',
          name: 'twitter',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />,
        },
        {
          link: 'https://discord.com/invite/cBpSsMzWcB',
          name: 'discord',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_discord.svg" />,
        },
      ],
      snkrz:[
        {
          link: 'https://www.thesnkrz.com/home',
          name: 'homepage',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_homepage.svg" />,
        },
        {
          link: 'https://twitter.com/theSNKRZ',
          name: 'twitter',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />,
        },
        {
          link: 'https://discord.com/invite/thesnkrz',
          name: 'discord',
          icon: <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_discord.svg" />,
        },
      ]
    }),
    [],
  );

  const description = useMemo(() => {
    const result =
      metadata?.description.find(({ language }: any) => language === i18n.language) ??
      metadata?.description.find(({ language }: any) => language === 'en');
    return result?.value;
  }, [metadata, i18n.language]);

  const properties = useMemo(() => {
    return (
      /* 23.03.10 수정: TODO: rarity 값 없는 경우가 있습니다. 옵셔널로 처리해주세요. */
      metadata?.attributes?.flatMap(({ type, value }: any) =>
        value.map((name: any) => ({
          type,
          name,
          rarity: 'NFT has this trait',
          collectionAddress: nft?.token?.collectionAddress,
        })),
      ) ?? []
    );
  }, [nft, metadata]);

  const isCovenantNft = useMemo(() => {
    return ['CONE', 'CORA', 'TTPS'].includes(nft?.token?.collection?.slug ?? '');
  }, [nft]);

  return (
    <>
      <div className={cn('marketplace-about')}>
        <div className={cn('about-item profile')}>
          <strong className={cn('about-title')}>Creator</strong>
          <div className={cn('about-content')}>
            <Avatar
              className={cn('user-image', `type${creator?.themeIndex}`)}
              size={64}
              style={{ backgroundImage: creator?.img && `url(${creator?.img})` }}
            />
            <span className={cn('type')}>Creator</span>
            <strong className={cn('name')}>{nft?.token?.collection?.ownerName ?? shorten(nft?.token?.collection?.ownerAddress)}</strong>
            <ul className={cn('sns-list')}>
              {nft?.token?.collection?.slug &&
                snsList[nft.token.collection?.slug.toLowerCase()]?.map((nft, index: number) => (
                  <li key={`sns-list-${index}`}>
                    <a href={nft.link} target="_blank" rel="noopener noreferrer" title="새창열림" className={nft.name}>
                      {nft.icon}
                      <span className={cn('a11y')}>{nft.name}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className={cn('about-item')}>
          {/* 23.04.05 수정: 레이블 변경 (Collection -> Project) */}
          <strong className={cn('about-title')}>Project</strong>
          <div className={cn('about-content')}>
            <MarketplaceSubBanner
              collection={nft?.token?.collection}
              lifeLink={
                nft?.token?.collection?.slug.includes('SON')
                  ? '/life/son'
                  : nft?.token?.collection?.slug.includes('CORA')
                  ? '/life/cone?tab=nfts'
                  : `/life/${nft?.token?.collection?.slug?.toLowerCase()}`
              }
              lifeLinkText={t('discoverBtn')}
              classNames={nft?.token?.collection?.slug.toLowerCase()}
            />
          </div>
        </div>
        <div className={cn('about-item')}>
          <strong className={cn('about-title')}>Description</strong>
          <div className={cn('about-content')}>
            <div className={cn('utility-wrap')}>
              <p>{description}</p>
              {(nft?.token?.collection?.slug === 'CORA' || nft?.token?.collection?.slug === 'CONE' || nft?.token?.collection?.slug === 'TTPS') && (
                <ul>
                  <li>
                    NEITH NFT
                    <p>{t('collectionPage.neithDesc')}</p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {isCovenantNft && (
          <div className={cn('about-item')}>
            <strong className={cn('about-title')}>{t('collectionPage.neithClaim.title')}</strong>
            <div className={cn('about-content')}>
              <div className={cn('utility-wrap')}>
                <ul>
                  <li>{t('collectionPage.neithClaim.0')}</li>
                  <li>{t('collectionPage.neithClaim.1')}</li>
                  <li>{t('collectionPage.neithClaim.2')}</li>
                  <li>{t('collectionPage.neithClaim.3')}</li>
                  <li>{t('collectionPage.neithClaim.4')}</li>
                  <li>{t('collectionPage.neithClaim.5')}</li>
                  <li>{t('collectionPage.neithClaim.6')}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 23.03.10 수정 start: NFT 구매 및 클래임 방법 영역 추가 */}
        {properties && properties?.length > 0 && (
          <div className={cn('about-item')}>
            <strong className={cn('about-title')}>Properties</strong>
            <div className={cn('about-content')}>
              <ul className={cn('properties-list', isCovenantNft ? 'neith' : '')}>
                {properties?.map((property: any, index: any) => (
                  <li key={`properties-list-${index}`}>
                    <PropertyCard {...property} slug={nft?.token?.collection?.slug} disabled />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      {!immersiveMode && <MarketplaceDetailRecommend />}
    </>
  );
};

export default MarketplaceDetailAbout;
