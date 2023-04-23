import cn from 'classnames';
import { useNumberFormatter } from '@utils/formatter/number';
import React from 'react';
import { StatusTag } from '@components/tag/StatusTag';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { useNileNft } from '@/hook/useNileNft';
import { useUnitFormatter } from '@utils/formatter/unit';

type NileChoiceAdditionItemProps = {
  token: NileNftToken;
};

export const NileChoiceAdditionItem = ({ token }: NileChoiceAdditionItemProps) => {
  const { shorthanded } = useNumberFormatter();
  const { getPaymentUnit } = useUnitFormatter();
  const { status, currentPrice } = useNileNft({ token: token });

  return (
    <li key={`addition-list${token?.id}`} className={cn('addition-list')}>
      <a className={cn('card-link')} href={`/marketplace/${token?.collection?.slug}/${token?.tokenId}`}>
        <div className={cn('img-block')}>
          {token?.image && <Image src={token.image} alt="" layout="fill" objectFit="contain" loader={NileCDNLoader} unoptimized />}
        </div>
        <div className={cn('product-info')}>
          <div className={cn('inner')}>
            <div className={cn('product-name')}>{token?.name}</div>
            <dl className={cn('price-info-wrap')}>
              <dt className={cn('price-title')}></dt>
              <dd>
                <strong className={cn('price-value')}>{shorthanded(currentPrice)}</strong>
                <span className={cn('price-unit')}>{getPaymentUnit(token?.payment)}</span>
              </dd>
            </dl>
          </div>
          <div className={cn('status-wrap')}>
            <StatusTag status={status} />
          </div>
        </div>
      </a>
    </li>
  );
};
