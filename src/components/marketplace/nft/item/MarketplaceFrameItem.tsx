import { NileCDNLoader } from '@/utils/image/loader';
import cn from 'classnames';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import axios from 'axios';

interface FrameProps {
  resourceType?: 'image' | 'video';
  covenantValue: string;
  covenantDate: string;
  /* 23.03.11 수정: pharaoh -> rare로 변경 */
  type: string;
  token: NileNftToken;
  slug: string;
}

const MarketplaceFrameItem = ({ covenantValue, covenantDate, type, token, slug }: FrameProps) => {
  const [tokenWemix, setTokenWemix] = useState<any>();

  useEffect(() => {
    axios.get(`/api/tokenInfoList`).then(({ data }) => {
      data.forEach((token: any) => {
        if (token.token_symbol === 'WEMIX') {
          setTokenWemix(token);
        }
      });
    });
  }, []);

  const getCurrentValue = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value * tokenWemix?.price);
    },
    [tokenWemix],
  );

  const covenant = useMemo(() => {
    if (covenantValue) {
      return getCurrentValue(Number(covenantValue.replace(/[^0-9]/g, '')));
    }
    return 0;
  }, [covenantValue, getCurrentValue]);

  return (
    <div className={cn(`frame-img ${String(type).toLowerCase()}`, slug)}>
      {token?.videoUrl && (
        <video
          className={cn('video-control marketplace-video')}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controls
          controlsList="nodownload nofullscreen"
          src={token?.videoUrl}
        >
          <source src={token?.videoUrl} type="video/mp4" />
        </video>
      )}
      {!token?.videoUrl && token?.imageUrl && <Image src={token?.imageUrl} alt="" layout="fill" loader={NileCDNLoader} unoptimized />}

      <div className={cn('item-info')}>
        <dl className={cn('info-list')}>
          <div>
            <dt>NEITH Covenant</dt>
            <dd>
              {covenantValue?.replace('WEMIX', '').trim()}
              <span className={cn('unit')}>WEMIX</span>
            </dd>
            <dd className={cn('dollar-price')}>
              <span>(${covenant})</span>
            </dd>
          </div>
          <div>
            <dt>Covenant Date</dt>
            <dd>{covenantDate}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default MarketplaceFrameItem;
