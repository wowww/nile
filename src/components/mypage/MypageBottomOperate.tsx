import { useRef, useState } from 'react';
import { useTabScroll } from '@/hook/useTabScroll';

import cn from 'classnames';

import { Tabs } from 'antd';
import MypageNft from '@/components/mypage/nft/MypageNft';
import MypageDaoOperate from '@/components/mypage/dao/MypageDaoOperate';
import { useSetAtom } from 'jotai';
import { visibleMyPageFilterAtom } from '@/state/filterAtom';

const MypageBottomOperate = () => {
  const MypageBottomOperateRef = useRef<HTMLDivElement>(null);
  const setFilterOpen = useSetAtom(visibleMyPageFilterAtom);
  const [currentMypageTab, setCurrentMypageTab] = useState<string>('dao');

  const myPageTabs = [
    {
      label: 'DAO',
      key: 'dao',
      children: (
        <div className={cn('mypage-dao')}>
          <MypageDaoOperate />
        </div>
      ),
    },
    {
      label: 'NFT',
      key: 'nft',
      children: (
        <div className={cn('mypage-nft')}>
          <MypageNft ref={MypageBottomOperateRef} />
        </div>
      ),
    },
  ];

  return (
    <div className={cn('mypage-bottom-section')} ref={MypageBottomOperateRef}>
      <Tabs
        activeKey={currentMypageTab}
        className={cn('tab-type tab-lg tab-full')}
        items={myPageTabs}
        onTabClick={(key: string) => {
          useTabScroll(MypageBottomOperateRef.current?.offsetTop);
          setCurrentMypageTab(key);
          setFilterOpen(true);
        }}
      />
    </div>
  );
};

export default MypageBottomOperate;
