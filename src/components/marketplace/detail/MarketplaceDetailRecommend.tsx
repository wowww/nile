import cn from 'classnames';

import FavoriteCards from '@/components/cards/FavoriteCards';
import { NileApiService } from '@/services/nile/api';
import { useCallback, useEffect, useState } from 'react';
import { NileCollection } from '@/types/marketplace.types';
import { marketNftAtom } from '@/state/marketplace';
import { useAtomValue } from 'jotai';

const MarketplaceDetailRecommend = () => {
  const api = NileApiService();
  const [recommend, setRecommend] = useState<NileCollection | undefined>();
  const nft = useAtomValue(marketNftAtom);

  useEffect(() => {
    fetchRecommendItems();
  }, [nft]);

  const fetchRecommendItems = useCallback(() => {
    if (!nft?.token?.collection?.slug) return;

    api.marketplace.collection
      .getItem(
        {
          slug: nft?.token?.collection?.slug,
        },
        true,
        4,
      )
      .then(({ data }) => setRecommend(data.result.collection))
      .catch((error) => setRecommend(undefined));
  }, [api, nft]);

  return (
    <div className={cn('marketplace-recommend')}>
      <strong>What other users are watching right now</strong>
      <FavoriteCards tokens={recommend?.tokens} />
    </div>
  );
};

export default MarketplaceDetailRecommend;
