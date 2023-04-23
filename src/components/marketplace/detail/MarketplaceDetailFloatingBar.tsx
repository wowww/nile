import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useNumberFormatter } from '@utils/formatter/number';
import { NileCDNLoader } from '@utils/image/loader';
import { MarketNftItemStatusType } from '@/services/nile/api';
import dayjs from 'dayjs';
import { useNileNft } from '@/hook/useNileNft';
import { useAtomValue } from 'jotai';
import { actionBarAtom } from '@/state/modalAtom';
import { marketNftAtom } from '@/state/marketplace';
import { MarketplaceDetailButton } from '@components/marketplace/detail/MarketplaceDetailButton';

interface Props {
  price?: number;
  setPrice?: (value: number) => void;
}

const MarketplaceDetailFloatingBar: React.FC<Props> = ({ price, setPrice }): JSX.Element => {
  const [restTimeRatio, setRestTimeRatio] = useState<number>(0);
  const visibleActionBar = useAtomValue(actionBarAtom);
  const nft = useAtomValue(marketNftAtom);

  const { shorthanded } = useNumberFormatter();

  const { status, lastOrder, currentPrice } = useNileNft(nft);

  useEffect(() => {
    if (lastOrder) {
      const start = dayjs.utc(lastOrder.startAt);
      const end = dayjs.utc(lastOrder.endAt);
      const now = dayjs();
      const totalTime = Math.abs(end.diff(start));
      const lateTime = Math.abs(now.diff(start));
      setRestTimeRatio((lateTime / totalTime) * 100);
    }
  }, [status, lastOrder]);

  const active = useMemo(() => {
    return visibleActionBar && status !== MarketNftItemStatusType.NONE;
  }, [visibleActionBar, status]);

  return (
    <div className={cn('marketplace-floating-bar-wrap', { active })}>
      <div className={cn('marketplace-floating-bar-inner')}>
        <div className={cn('info-area')}>
          <div className={cn('img-block')}>
            {nft?.token?.videoUrl && (
              <video autoPlay loop muted playsInline disablePictureInPicture>
                <source src={nft?.token?.videoUrl} type="video/mp4" />
              </video>
            )}
            {(!nft?.token?.videoUrl && nft?.token?.imageUrl) && (
              <Image src={nft?.token?.image ?? ''} alt="" layout="fill" loader={NileCDNLoader} unoptimized priority />
            )}
          </div>
          <div className={cn('info-detail')}>
            <strong className={cn({ active: status === MarketNftItemStatusType.AUCTION_LIVE_ONGOING })}>{nft?.token?.name}</strong>
            <span>{shorthanded(currentPrice)} WEMIX$</span>
          </div>
        </div>
        <MarketplaceDetailButton isFloatingBar price={price} setPrice={setPrice} />
      </div>
      {status === MarketNftItemStatusType.AUCTION_LIVE_ONGOING && (
        <div className={cn('progress-bar')}>
          <div className={cn('progress-filled')} style={{ width: `${restTimeRatio}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceDetailFloatingBar;
