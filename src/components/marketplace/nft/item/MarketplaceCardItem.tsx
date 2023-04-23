import cn from 'classnames';
import Link from 'next/link';
import { message } from 'antd';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { MarketNftItemStatusType, NileApiService } from '@/services/nile/api';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { NileNftMetadata, NileNftToken, NileOrderStatusType, NileOrderType } from '@/models/nile/marketplace/NileNft';
import dayjs from 'dayjs';
import { useUnitFormatter } from '@utils/formatter/unit';
import { StatusTag } from '@components/tag/StatusTag';
import { useNileNft } from '@/hook/useNileNft';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { useNumberFormatter } from '@utils/formatter/number';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { MarketplaceBadge } from '@components/marketplace/nft/item/MarketplaceBadge';
import axios from 'axios';
import { fromWei } from 'web3-utils';
import { ReactSVG } from 'react-svg';
import CustomAvatar from '@components/avatar/CustomAvatar';
import nileUserAccount from '@/models/nile/user/NileUserAccount';

export type MarketplaceCardItem = {
  token: NileNftToken;
  disableMy?: boolean;
  onClickCard?: () => void;
};

export const MarketplaceCardItem = ({ token, disableMy, onClickCard }: MarketplaceCardItem) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const api = NileApiService();

  const nileWallet = useAtomValue(nileWalletAtom);

  const { shorten } = useWalletFormatter();
  const { shorthanded } = useNumberFormatter();
  const { status, lastOrder, remainSeconds } = useNileNft({ token });
  const { getPaymentUnit } = useUnitFormatter();

  const [metadata, setMetadata] = useState<NileNftMetadata>();
  const [creator, setCreator] = useState<nileUserAccount>();
  const [owner, setOwner] = useState<nileUserAccount>();

  useEffect(() => {
    const metadataUri = token?.uri;
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

    // KARI Creator
    if (token?.collection?.profile) {
      setCreator(token.collection.profile);
    } else {
      token.collection?.ownerAddress && api.user.account.getUserInfo(token.collection.ownerAddress).then(({ data }) => setCreator(data.result));
    }

    // Owner 정보를 lastOrder의 creator로 받아오도록 수정
    if (token?.profile){
      setOwner(token.profile);
    } else {
      lastOrder?.creator && api.user.account.getUserInfo(lastOrder.creator).then(({data}) => setOwner(data.result));
    }
  }, [token]);

  const currentPrice = useMemo(() => {
    const currentOrder =
      token?.orderList?.find((order) => order.type !== NileOrderType.OPEN_PRICE && order.status == NileOrderStatusType.OPEN) ?? undefined;

    if (currentOrder) {
      const biddingPrice = currentOrder.biddingList?.at(0);

      if (biddingPrice) {
        if (status === MarketNftItemStatusType.COMPLETE || status === MarketNftItemStatusType.CLOSED) {
          return Number(fromWei(biddingPrice.price));
        }
      } else {
        return Number(fromWei(currentOrder?.price ?? ''));
      }
    }
    return Number(fromWei(token?.price ?? '0', 'ether'));
  }, [token, lastOrder]);

  const covenantValue = useMemo(() => {
    return metadata?.attributes?.find((item) => item.type === 'NEITH Covenant');
  }, [metadata]);

  // KARI의 경우 백엔드에서 token.collection.profile을 null반환
  // const creator = useMemo(() => {
  //   return token?.collection?.profile;
  // }, [token]);

  const winner = useMemo(() => {
    return lastOrder?.biddingList?.at(0)?.profile;
  }, [lastOrder]);

  // const owner = useMemo(() => {
  //   return token?.profile;
  // }, [token]);


  const getOwnerOrWinner: NileUserAccount | undefined = useMemo(() => {
    if (lastOrder?.round === 1) {
      // if (status === MarketNftItemStatusType.OPEN) {
      //   return lastOrder?.profile;
      // }
      return owner;
    }
    if (lastOrder?.round === 0) {
      if (status === MarketNftItemStatusType.COMPLETE) return winner ?? { address: lastOrder?.biddingList?.at(0)?.address ?? '' };
      if (status === MarketNftItemStatusType.CLOSED && creator?.address.toLowerCase() !== owner?.address.toLowerCase()) return owner;
    }
  }, [lastOrder, status, creator, winner, owner]);

  const priceStatus = useMemo(() => {
    switch (status) {
      case MarketNftItemStatusType.NONE:
        if (!lastOrder) {
          return t('lastSale', { ns: 'common' });
        }
        if (lastOrder?.type === NileOrderType.FIXED_PRICE) {
          return t('fixedPrice', { ns: 'common' });
        }
        return t('startingBid', { ns: 'common' });
      case MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID:
        return t('startingBid', { ns: 'common' });
      case MarketNftItemStatusType.AUCTION_LIVE_ONGOING:
        return t('currentBid', { ns: 'common' });
      case MarketNftItemStatusType.COMPLETE:
        return t('lastSale', { ns: 'common' });
      case MarketNftItemStatusType.OPEN:
        return t('fixedPrice', { ns: 'common' });
      case MarketNftItemStatusType.CLOSED:
        return t('lastSale', { ns: 'common' });
      default:
        return '';
    }
  }, [t, status]);

  const showMy = useMemo(() => {
    switch (status) {
      case MarketNftItemStatusType.OPEN:
        return lastOrder?.creator?.toLowerCase() === nileWallet.toLowerCase();
      default:
        return token?.ownerAddress?.toLowerCase() === nileWallet.toLowerCase();
    }
  }, [status, nileWallet]);

  const kariImageUrl = useMemo(() => {
    const result = token?.imageUrl?.split('/');
    result?.splice(result?.length - 1, 0, 'thumbnail');

    if (result) {
      return result?.join('/');
    }

    return '';
  }, [token]);

  return (
    <div>
      <Link
        href={
          token?.collection?.slug === 'Tangled'
            ? ''
            : {
                pathname: '/marketplace/[collectionAddressOrSlug]/[tokenId]',
                query: { collectionAddressOrSlug: token?.collectionAddress, tokenId: token?.tokenId },
              }
        }
      >
        <a className={cn('link-tag', { 'offer-card': status === MarketNftItemStatusType.CLOSED })}>
          <div className="card-view-link">
            <div className={cn('img-block', { mine: showMy && !disableMy })}>
              <div
                className={cn('card-link')}
                onClick={() => {
                  if (token?.collection?.slug === 'Tangled') {
                    message.info({
                      content: t('NFTOpenMessage', { ns: 'common' }),
                      key: 'toast',
                      className: 'custom-message',
                    });
                  }
                }}
              >
                {covenantValue && <MarketplaceBadge covenantValue={covenantValue?.value[0]} />}
                {token?.videoUrl && (
                  <span className={cn('video-wrap')}>
                    <video autoPlay loop muted playsInline disablePictureInPicture>
                      <source src={token.videoUrl} type="video/mp4" />
                    </video>
                  </span>
                )}
                {!token?.videoUrl && token?.imageUrl && (
                  <Image
                    src={token?.collection?.slug === 'KARI' ? kariImageUrl : token.imageUrl}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    loader={NileCDNLoader}
                    unoptimized
                  />
                )}
                <div className={cn('product-info')} aria-hidden={true}>
                  <div className={cn('product-info-top')}>
                    {token?.status === 'auction-start' && <div className={cn('open-time')}>KST {dayjs(lastOrder?.startAt).format()} Open</div>}
                    <div className={cn('product-name')}>{token?.collection?.name}</div>
                  </div>
                  <div className={cn('product-info-bottom')}>
                    {creator && (
                      <dl>
                        <dt>{t('creator', { ns: 'common' })}</dt>
                        <dd>
                          <CustomAvatar size={24} themeIndex={creator?.themeIndex ?? 4} src={creator.img} />
                          <span>{creator?.nickname ?? shorten(creator?.address)}</span>
                        </dd>
                      </dl>
                    )}
                    {status === MarketNftItemStatusType.AUCTION_LIVE_ONGOING && lastOrder?.biddingList && (
                      <dl>
                        <dt>{t('bidders', { ns: 'common' })}</dt>
                        <dd>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_bidders.svg" />
                          {lastOrder?.biddingList.length > 0 && <span>{lastOrder?.biddingList.length} people</span>}
                        </dd>
                      </dl>
                    )}
                    {(getOwnerOrWinner) && (
                      <dl>
                        {lastOrder?.round === 0 && status === MarketNftItemStatusType.COMPLETE ? (
                          <dt>{t('winner', { ns: 'common' })}</dt>
                        ) : (
                          <dt>{t('owner', { ns: 'common' })}</dt>
                        )}
                        <dd>
                          <CustomAvatar size={24} themeIndex={getOwnerOrWinner.themeIndex} src={getOwnerOrWinner?.img} />
                          <span>{getOwnerOrWinner?.nickname ?? shorten(getOwnerOrWinner?.address)}</span>
                        </dd>
                      </dl>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={cn('info-block')}>
              <div className={cn('info-top')}>
                <strong className={cn('product-name')}>{token.name}</strong>
                {/*<LikeButton count={item.likeCount} />*/}
              </div>
              <div className={cn('info-bottom')}>
                <dl className="price-info">
                  {token.collection?.slug !== 'Tangled' ? (
                    <>
                      <dt>{priceStatus}</dt>
                      <dd>
                        {lastOrder ? shorthanded(currentPrice) : '-'}
                        <span className={cn('unit')}>{token.unitFormat ?? getPaymentUnit(token?.orderList?.at(0)?.payment)}</span>
                      </dd>
                    </>
                  ) : (
                    <>{t('toBeRevealed', { ns: 'common' })}</>
                  )}
                </dl>
                {lastOrder ? <StatusTag status={status} remain={remainSeconds} /> : <StatusTag status={MarketNftItemStatusType.CLOSED} />}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
