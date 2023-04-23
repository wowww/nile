import { forwardRef, useState } from 'react';
import { useTabScroll } from '@/hook/useTabScroll';
import cn from 'classnames';

import { Tabs } from 'antd';
import MyPageNftOwned from '@components/mypage/nft/MypageNftOwned';
import { useSetAtom } from 'jotai';
import { visibleMyPageFilterAtom } from '@/state/filterAtom';
import { MyPageNftListed } from '@components/mypage/nft/MypageNftListed';
import { MyPageNftOffered } from '@components/mypage/nft/MypageNftOffered';
import MyPageNftBidded from '@components/mypage/nft/MypageNftBidded';
import MyPageNftActivity from '@components/mypage/nft/MypageNftActivity';

const MyPageNft = forwardRef(({}, ref: any) => {
  const setFilterOpen = useSetAtom(visibleMyPageFilterAtom);
  const [currentNftTab, setCurrentNftTab] = useState<string>('ownedNFT');

  const myPageNftTabs = [
    // {
    //   label: 'Created NFTs',
    //   key: 'createdNFT',
    //   children: (
    //     <div className={cn('mypage-inner nft')}>
    //       <MyPageNftCreated />
    //     </div>
    //   ),
    // },
    {
      label: 'Owned NFTs',
      key: 'ownedNFT',
      children: (
        <div className={cn('mypage-inner nft')}>
          <MyPageNftOwned tabKey="ownedNFT" currentTabKey={currentNftTab} />
        </div>
      ),
    },
    {
      label: 'Listed NFTs',
      key: 'listedNFT',
      children: (
        <div className={cn('mypage-inner nft')}>
          <MyPageNftListed tabKey="listedNFT" currentTabKey={currentNftTab} />
        </div>
      ),
    },
    {
      label: 'Offered NFTs',
      key: 'offeredNFT',
      children: (
        <div className={cn('mypage-inner nft')}>
          <MyPageNftOffered tabKey="offeredNFT" currentTabKey={currentNftTab} />
        </div>
      ),
    },
    /* 23.04.05 수정: bid nfts 추가 / 외 나머지 NFT 들도 NFTs로 변경 */
    {
      label: 'Bid NFTs',
      key: 'biddedNFT',
      children: (
        <div className={cn('mypage-inner nft')}>
          <MyPageNftBidded tabKey="biddedNFT" currentTabKey={currentNftTab} />
        </div>
      ),
      disabled: true,
    },
    // {
    //   label: 'Favorites',
    //   key: 'favorites',
    //   children: (
    //     <div className={cn('mypage-inner nft')}>
    //       <MyPageNftFavorites />
    //     </div>
    //   ),
    // },
    {
      label: 'Activity',
      key: 'activity',
      children: (
        <div className={cn('mypage-inner nft')}>
          <MyPageNftActivity tabKey="activity" currentTabKey={currentNftTab} />
        </div>
      ),
    },
  ];

  return (
    <Tabs
      activeKey={currentNftTab}
      className={cn('tab-type', 'tab-round', 'tab-full')}
      animated={false}
      items={myPageNftTabs}
      tabPosition="top"
      onTabClick={(key: string) => {
        useTabScroll(ref.current.offsetTop);
        setCurrentNftTab(key);
        setFilterOpen(true);
      }}
    />
  );
});

export default MyPageNft;
