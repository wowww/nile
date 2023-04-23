import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import MarketplaceDetailTop from '@components/marketplace/detail/MarketplaceDetailTop';
import MarketplaceDetailBottom from '@components/marketplace/detail/MarketplaceDetailBottom';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths } from 'next';
import { NileApiService } from '@/services/nile/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NileCollectionResult } from '@/models/nile/marketplace/NileCollection';
import { NileNftMetadata } from '@/models/nile/marketplace/NileNft';
import { useAtom } from 'jotai';
import { actionBarAtom } from '@/state/modalAtom';
import { isAddress } from 'web3-utils';
import { useSetAtom } from 'jotai';
import { marketNftAtom } from '@/state/marketplace';

const NftDetailPage = () => {
  const setActionsBar = useSetAtom(actionBarAtom);

  const router = useRouter();
  const { collectionAddressOrSlug, tokenId } = router.query;

  const api = NileApiService();

  const detailBottomRef = useRef<HTMLDivElement | null>(null);
  const documentRef = useRef<Document | null>(null);

  const [nft, setNft] = useAtom(marketNftAtom);
  const [metadata, setMetadata] = useState<NileNftMetadata | undefined>();

  const { collectionSlug, collectionAddress } = useMemo(
    () => ({
      collectionSlug: isAddress(String(collectionAddressOrSlug)) ? undefined : String(collectionAddressOrSlug),
      collectionAddress: isAddress(String(collectionAddressOrSlug)) ? String(collectionAddressOrSlug) : undefined,
    }),
    [collectionAddressOrSlug],
  );

  const fetchNft = useCallback(() => {
    if (!Number(tokenId) || !(collectionSlug || collectionAddress)) {
      return;
    }
    api.marketplace.nft
      .getItem({ collectionSlug, collectionAddress, tokenId: Number(tokenId) })
      .then(({ data }) => setNft({ token: data.result }))
      .catch((error) => {
        console.log(error);
      });
  }, [api, collectionSlug, collectionAddress, tokenId]);

  const refresh = useCallback(() => {
    fetchNft();
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const metadataUri = nft?.token?.uri;
    if (metadataUri) {
      axios
        .get(metadataUri)
        .then(({ data }) => {
          setMetadata(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (nft?.token?.collectionAddress && nft?.token?.tokenId) {
      api.marketplace.nft.view(nft?.token?.collectionAddress, Number(nft.token.tokenId));
    }
  }, [nft]);

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const { pageYOffset } = window;
        const bottomOffset = detailBottomRef.current?.offsetTop as number;

        setActionsBar(pageYOffset >= bottomOffset);
      }, 300),
    [],
  );

  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);
    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
  }, [throttleHandler]);

  return (
    <>
      <Helmet>
        <title>Marketplace &gt; NILE</title>
        <body className={cn('has-floating')} />
      </Helmet>
      <div className={cn('marketplace-detail-wrap')}>
        <MarketplaceDetailTop metadata={metadata} />
        <MarketplaceDetailBottom ref={detailBottomRef} metadata={metadata} />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['marketplace', 'common', 'mypage'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default NftDetailPage;
