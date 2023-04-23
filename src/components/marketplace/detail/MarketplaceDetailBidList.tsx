import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { NileBidding } from '@/models/nile/marketplace/NileNft';
import { useWalletFormatter } from '@utils/formatter/wallet';
import dayjs from 'dayjs';
import { useNumberFormatter } from '@utils/formatter/number';
import { fromWei } from 'web3-utils';

interface Props {
  data?: NileBidding[];
}

const MarketplaceDetailBidList = ({ data }: Props) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const { shorten } = useWalletFormatter();
  const { shorthanded } = useNumberFormatter();

  useEffect(() => {
    scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
  }, [data]);

  return (
    <ul className={cn('marketplace-bid-list')} ref={scrollRef}>
      {data
        ?.slice(0, 3)
        .reverse()
        ?.map((item: NileBidding, index: number) => (
          <li
            key={`bid-list-${index}`}
            className={cn(
              data.length > 2 ? `order${data.length - index - data.length}` : data.length > 1 ? `order2-${data.length - index - data.length}` : ''
            )}
          >
            <div className={cn('profile')}>
              <div className={cn('info')}>
                <strong className={cn('name')}>{shorten(item.address)}</strong>
                <span className={cn('time')}>{dayjs.utc(item.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>
            </div>
            <div className={cn('price')}>
              <strong>{item?.price ? shorthanded(fromWei(`${item.price}`, 'ether')) : '0'}</strong>
              <span className={cn('unit')}>WEMIX$</span>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default MarketplaceDetailBidList;
