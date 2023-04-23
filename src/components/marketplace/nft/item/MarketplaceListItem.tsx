import Link from 'next/link';
import cn from 'classnames';
import { message } from 'antd';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { NileNftMetadata, NileNftToken, NileOrderStatusType, NileOrderType } from '@/models/nile/marketplace/NileNft';
import React, { useEffect, useMemo, useState } from 'react';
import { MarketNftItemStatusType } from '@/services/nile/api';
import { useUnitFormatter } from '@utils/formatter/unit';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { StatusTag } from '@components/tag/StatusTag';
import { ReactSVG } from 'react-svg';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { useNileNft } from '@/hook/useNileNft';
import { useNumberFormatter } from '@utils/formatter/number';
import { MarketplaceBadge } from '@components/marketplace/nft/item/MarketplaceBadge';
import axios from 'axios';
import { fromWei } from 'web3-utils';
import dayjs from 'dayjs';
import CustomAvatar from '@components/avatar/CustomAvatar';

export type MarketplaceListItemProps = {
  token: NileNftToken;
  onClickCard?: () => void;
};

export const MarketplaceListItem = ({ token, onClickCard }: MarketplaceListItemProps) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const nileWallet = useAtomValue(nileWalletAtom);
  const { status, lastOrder, remainSeconds } = useNileNft({ token });
  const { shorthanded } = useNumberFormatter();

  const { getPaymentUnit } = useUnitFormatter();
  const { shorten } = useWalletFormatter();

  const [metadata, setMetadata] = useState<NileNftMetadata>();

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
  }, [token]);

  const covenantValue = useMemo(() => {
    return metadata?.attributes?.find((item) => item.type === 'NEITH Covenant');
  }, [metadata]);

  const viewOwner = useMemo(() => {
    if (status === MarketNftItemStatusType.COMPLETE) {
      const winner = lastOrder?.biddingList?.at(0)?.profile;
      if (!winner) return;

      return {
        type: 'winner',
        info: winner,
      };
    }

    if (status === MarketNftItemStatusType.CLOSED) {
      if (token?.collection?.ownerAddress?.toLowerCase() !== token?.ownerAddress?.toLowerCase()) {
        const owner = token?.profile;
        if (!owner) return;

        return {
          type: 'owner',
          info: owner,
        };
      }
    }

    if (status === MarketNftItemStatusType.OPEN) {
      const owner = lastOrder?.profile;
      if (!owner) return;

      return {
        type: 'owner',
        info: lastOrder?.profile,
      };
    }
  }, [token, status, nileWallet, lastOrder]);

  const priceStatus = useMemo(() => {
    switch (status) {
      case MarketNftItemStatusType.NONE:
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
    result?.splice(result?.length - 1, 0, 'thumbnail')

    if (result) {
      return result?.join('/');
    }

    return "";
  }, [token]);

  const startAt = useMemo(() => {
    return dayjs.utc(lastOrder?.startAt).tz('Asia/Seoul').format('YYYY-MM-DD hh:mm');
  }, [lastOrder]);

  return (
    <div>
      <Link
        href={{
          pathname: '/marketplace/[collectionAddressOrSlug]/[tokenId]',
          query: { collectionAddressOrSlug: token?.collection?.slug, tokenId: token?.tokenId },
        }}
      >
        <a
          className={cn('card-link', { 'offer-card': status === MarketNftItemStatusType.CLOSED })}
          onClick={() => {
            if (token.collection?.slug === 'Tangled') {
              message.info({
                content: t('NFTOpenMessage', { ns: 'common' }),
                key: 'toast',
              });
            }
          }}
        >
          <div className={cn('img-block', { mine: showMy })}>
            {/* 23.03.09 수정: covenant value badge 케이스 추가 */}
            {covenantValue && <MarketplaceBadge covenantValue={covenantValue?.value[0]} />}
            {token.videoUrl && (
              <span className={cn('video-wrap')}>
                <video autoPlay loop muted playsInline disablePictureInPicture>
                  <source src={token.videoUrl} type="video/mp4" />
                </video>
              </span>
            )}
            {!token.videoUrl && token.imageUrl && (
              <Image src={token?.collection?.slug === 'KARI' ? kariImageUrl : token.imageUrl} alt="" layout="fill" loader={NileCDNLoader} unoptimized />
            )}
          </div>
          <div className={cn('info-block')}>
            <StatusTag status={status} remain={remainSeconds} />
            <div className={cn('info-top')}>
              <span className={cn('collection-name')}>{token.collection?.name}</span>
              <strong className={cn('product-name')}>{token.name}</strong>
            </div>
            <div className={cn('info-bottom')}>
              <dl>
                <dt>{priceStatus}</dt>
                <dd>
                  {shorthanded(currentPrice)}
                  <span className={cn('unit')}>{token.unitFormat ?? getPaymentUnit(token?.orderList?.at(0)?.payment)}</span>
                </dd>
              </dl>
              {status === MarketNftItemStatusType.NONE && lastOrder?.startAt && (
                <dl>
                  <dt>{t('opensOn', { ns: 'common' })}</dt>
                  <dd>{startAt}</dd>
                </dl>
              )}
              {status === MarketNftItemStatusType.AUCTION_LIVE_ONGOING && lastOrder?.biddingList && (
                <dl>
                  <dt>{t('bidders', { ns: 'common' })}</dt>
                  <dd className={cn('column')}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_bidders.svg" />
                    {lastOrder?.biddingList.length > 0 && <span>{lastOrder?.biddingList.length} people</span>}
                  </dd>
                </dl>
              )}
              {viewOwner && (
                <dl>
                  <dt>{t(viewOwner?.type, { ns: 'common' })}</dt>
                  <dd className={cn('user-info')}>
                    <CustomAvatar size={28} themeIndex={viewOwner?.info?.themeIndex} src={viewOwner?.info?.img} />
                    <span className={cn('name')}>{viewOwner?.info?.nickname ?? shorten(viewOwner?.info?.address)}</span>
                  </dd>
                </dl>
              )}
            </div>
          </div>
        </a>
      </Link>
      {/*<LikeButton count={item.likeCount} />*/}
    </div>
  );
};
