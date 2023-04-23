import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MarketNftItemStatusType, NileApiService } from '@/services/nile/api';
import cn from 'classnames';
import ShareButton from '@/components/button/ShareButton';
import MarketPlaceDetailFloatingBar from '@/components/marketplace/detail/MarketplaceDetailFloatingBar';
import { useTranslation } from 'next-i18next';
import { NileNftMetadata } from '@/models/nile/marketplace/NileNft';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { StatusTag } from '@components/tag/StatusTag';
import { useNileNft } from '@/hook/useNileNft';
import { marketNftAtom } from '@/state/marketplace';
import { isAndroid, isIOS } from 'react-device-detect';
import MarketplaceDetailPriceInfo from '@components/marketplace/detail/MarketplaceDetailPriceInfo';
import MarketplaceDetailLink from '@components/marketplace/detail/MarketplaceDetailLink';
import { MarketplaceDetailSaleInfo } from '@components/marketplace/detail/MarketplaceDetailSaleInfo';
import { Round } from '@/models/nile/contract';
import { MarketplaceDetailButton } from '@components/marketplace/detail/MarketplaceDetailButton';
import MarketplaceDetailBidList from '@components/marketplace/detail/MarketplaceDetailBidList';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import dayjs from 'dayjs';
import MarketplaceDetailBidResult from '@components/marketplace/detail/MarketplaceDetailBidResult';
import { useImmersiveMode } from '@/hook/useImmersiveMode';
import MarketplaceFrameItem from '@components/marketplace/nft/item/MarketplaceFrameItem';
import { fromWei } from 'web3-utils';

interface cardDataType {
  metadata?: NileNftMetadata;
}

const MarketplaceDetailTop = ({ metadata }: cardDataType) => {
  const immersiveMode = useImmersiveMode();
  const { i18n } = useTranslation(['marketplace', 'common']);

  const nileWallet = useAtomValue(nileWalletAtom);
  const nft = useAtomValue(marketNftAtom);
  const api = NileApiService();
  const { status, remainSeconds, lastOrder, lastBidding, currentPrice } = useNileNft(nft);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setPrice?.(currentPrice);
  }, [currentPrice]);

  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState('');
  const [isVideo, setIsVideo] = useState(false);

  const videoRef = useRef<null | HTMLVideoElement>(null);

  const onOpen = (isVideo: boolean, src: string) => {
    // 모바일, 태블릿 기기에서 비디오 팝업 노출하지 않음
    if (isVideo && (isAndroid || isIOS)) {
      return;
    }

    setIsOpen(true);
    setSrc(src);
    setIsVideo(isVideo);

    if (isVideo) {
      // refList.map((el) => {
      //   if (el.current !== null) el.current.pause();
      // });
    }
  };

  const nftName = useMemo(() => {
    return metadata?.name.find(({ language }) => language === i18n.language)?.value ?? nft?.token?.name;
  }, [metadata, nft, i18n]);

  const afterBidding = useMemo(() => {
    if ([MarketNftItemStatusType.AUCTION_LIVE_ONGOING].includes(status)) {
      return (
        <div className={cn('bidders')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_bidders.svg" />{' '}
          <span className={cn('bidders-number')}>{nft?.token?.orderList?.at(0)?.biddingList?.length} Bidders</span>
        </div>
      );
    }
  }, [status]);

  const ownerInfo = useMemo(() => {
    if (status === MarketNftItemStatusType.OPEN && lastOrder?.round === Round.SECOND) {
      return lastOrder.profile;
    }
    if (status === MarketNftItemStatusType.CLOSED) {
      return nft?.token?.profile;
    }
    return;
  }, [status, lastOrder]);

  const bidStatus = useMemo(() => {
    return lastBidding?.address?.toLowerCase() === nileWallet.toLowerCase()
      ? 'success'
      : lastOrder?.biddingList?.map(({ address }) => address?.toLowerCase()).includes(nileWallet.toLowerCase() ?? '')
      ? 'fail'
      : 'no-bid';
  }, [nft]);

  const covenantValue = useMemo(() => {
    return metadata?.attributes?.find((item) => item.type === 'NEITH Covenant');
  }, [metadata]);

  const covenantDate = useMemo(() => {
    return metadata?.attributes?.find((item) => item.type === 'Covenant Date');
  }, [metadata]);

  return (
    <div className={cn('marketplace-top-section')}>
      <div className={cn('img-block')}>
        {nft.token?.collection?.slug !== 'CORA' && nft.token?.collection?.slug !== 'CONE' && nft.token?.collection?.slug !== 'TTPS' ? (
          <>
            {!nft?.token?.videoUrl && nft?.token?.imageUrl && (
              <>
                <Image
                  src={nft?.token?.image ?? ''}
                  alt=""
                  layout="fill"
                  loader={NileCDNLoader}
                  unoptimized
                  priority
                  onClick={() => onOpen(false, nft?.token?.imageUrl ?? '')}
                />
              </>
            )}
            {nft?.token?.videoUrl && (
              <span className={cn('video-wrap')}>
                {nft?.token?.videoUrl && (
                  <video
                    className={cn('video-control marketplace-video')}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controls
                    controlsList="nodownload nofullscreen"
                    src={nft?.token?.videoUrl ?? ''}
                    onClick={(e) => {
                      e.preventDefault();
                      onOpen(true, '/video/life_sights_of_nile.mp4');
                    }}
                  >
                    <source src={nft?.token?.videoUrl ?? ''} type="video/mp4" />
                  </video>
                )}
              </span>
            )}
          </>
        ) : (
          <MarketplaceFrameItem
            token={nft?.token}
            covenantValue={String(covenantValue?.value)}
            covenantDate={String(covenantDate?.value)}
            type={String(metadata?.attributes?.at(0)?.value)}
            /* 23.04.05 수정: slug 추가 */
            slug={nft?.token.collection.slug}
          />
        )}
      </div>

      <div className={cn('info-block')}>
        <div className={cn('top-info-wrap')}>
          <div className={cn('status-wrap', { 'status-offer': status === MarketNftItemStatusType.CLOSED })}>
            {!immersiveMode && <StatusTag status={status} remain={remainSeconds} />}
            <div className={cn('utils')}>
              {afterBidding}
              <div className={cn('watch')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg" />
                <span className={cn('watch-number')}>{nft?.token?.viewCount}</span>
              </div>
              {/*<LikeButton count={nft.likeCount} />*/}
              {!immersiveMode && <ShareButton facebook telegram collection={nft.token?.collectionAddress} tokenId={nft.token?.tokenId} />}
            </div>
          </div>
          <div className={cn('title-wrap')}>
            <h2>
              <span className={cn('collection-name')}>{nft?.token?.collection?.name}</span>
              <strong className={cn('product-title')}>{nftName}</strong>
            </h2>
            <p className={cn('edition-info')}>#Edition 1 of 1</p>
          </div>
        </div>
        <div className={cn('bottom-info-wrap')}>
          {status === MarketNftItemStatusType.COMPLETE && (
            <MarketplaceDetailBidResult
              status={bidStatus}
              name={lastBidding?.address ?? ''}
              price={fromWei(String(lastBidding?.price ?? 0), 'ether')}
              time={dayjs.utc(lastBidding?.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}
            />
          )}
          {lastOrder && (
            <div className={cn('price-info-block')}>
              <div className={cn('price-info-wrap')}>
                <MarketplaceDetailPriceInfo type="price" />
              </div>
              {ownerInfo && (
                <div className={cn('price-info-wrap')}>
                  <MarketplaceDetailPriceInfo type="avatar" user={ownerInfo} />
                </div>
              )}
              {status === MarketNftItemStatusType.NONE && lastOrder?.status !== 'CANCELED' && (
                <div className={cn('price-info-wrap')}>
                  <MarketplaceDetailPriceInfo type="countdown" />
                </div>
              )}
            </div>
          )}
          {status === MarketNftItemStatusType.AUCTION_LIVE_ONGOING && <MarketplaceDetailBidList data={lastOrder?.biddingList ?? []} />}
          {(status === MarketNftItemStatusType.COMPLETE || status === MarketNftItemStatusType.AUCTION_LIVE_ONGOING) && (
            <MarketplaceDetailButton price={price} setPrice={setPrice} />
          )}
          <MarketplaceDetailSaleInfo />
          <MarketplaceDetailLink />
          {!immersiveMode && status !== MarketNftItemStatusType.COMPLETE && status !== MarketNftItemStatusType.AUCTION_LIVE_ONGOING && (
            <MarketplaceDetailButton price={price} setPrice={setPrice} />
          )}
        </div>
      </div>
      {!immersiveMode && <MarketPlaceDetailFloatingBar price={price} setPrice={setPrice} />}
    </div>
  );
};

export default MarketplaceDetailTop;
