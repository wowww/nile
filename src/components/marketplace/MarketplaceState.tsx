import React, { ReactElement } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';

import InfiniteLoader from '@/components/loader/InfiniteLoader';
import { ListingStatus } from '@pages/marketplace/listing/[collectionAddressOrSlug]/[tokenId]';
import { TransferStatus } from '@pages/marketplace/transfer/[collectionAddressOrSlug]/[tokenId]';

interface stateType {
  title?: string;
  cont: string;
  iconValue: string;
  buttons?: ReactElement;
  state?: ListingStatus | TransferStatus;
}

const MarketplaceState = ({ title, cont, iconValue, buttons, state }: stateType) => {
  const viewIcon = () => {
    switch (iconValue) {
      case 'success': // success
        return <Image src="/assets/images/icon/ico_success.gif" alt="" width={60} height={60} loader={NileCDNLoader} />;
      case 'loading': // loading
        return <InfiniteLoader size="lg" />;
      default:
        return <></>;
    }
  };

  return (
    <div className={cn('state-wrap', { success: state === ListingStatus.LISTING_SUCCESS || state === TransferStatus.TRANSFER_SUCCESS })}>
      <div className={cn('state-logo')}>{viewIcon()}</div>
      {title && <strong className={cn('state-title')}>{title}</strong>}
      <p className={cn('state-cont')}>{cont}</p>
      {buttons && (
        <div className={cn('state-btn-wrap')}>
          {/* <MakeButton /> */}
          {buttons}
        </div>
      )}
    </div>
  );
};

export default MarketplaceState;
