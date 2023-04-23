import { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import useMediaQuery from '@/hook/useMediaQuery';

import MembersCardList from './MembersCardList';
import MembersTable from './MembersTable';
import IconButton from '@/components/button/IconButton';
import PaginationCustom from '@/components/button/PaginationCustom';
export interface StationMemberType {
  profile: {
    imgUrl: string;
    userId: string;
    introduce: string;
  };
  count: {
    /* 23.03.01 수정: 거버넌스 오픈전 하이픈 표기로 타입 추가 */
    proposal: number | string;
    proposalJoin: number | string;
  };
  figure: {
    wonder: number;
    gWonder: number;
  };
  participateDate: string;
  recentActivityDate: string;
}

const TabMembers = () => {
  const { t } = useTranslation('dao');

  const [viewType, setViewType] = useState<string>('list');
  const [toggleView, setToggleView] = useState<boolean>(true);

  const changeViewAction = (value: string) => {
    setViewType(value);
    value === 'list' ? setToggleView(true) : setToggleView(false);
  };

  const DummyData: StationMemberType[] = [];
  const isMobile = useMediaQuery('(max-width: 767px)');

  let tempGWonderRankList = [];
  while (tempGWonderRankList.length < 20) {
    let randomNum = Math.floor(Math.random() * 20) + 1;
    if (tempGWonderRankList.indexOf(randomNum) === -1) {
      tempGWonderRankList.push(randomNum);
    }
  }
  for (let i = 1; i <= 9; i++) {
    const temp = {
      profile: {
        imgUrl: '',
        userId: '0xabcd...abcd',
        introduce: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세. 남산 위에 저 소나무 철갑',
      },
      count: {
        proposal: '-',
        proposalJoin: '-',
      },
      figure: {
        wonder: 1000000,
        gWonder: 1000000,
      },
      participateDate: '2022-07-01 13:30:04',
      recentActivityDate: '2022-07-11 13:30:04',
    };

    DummyData.push(temp);
  }

  return (
    <div className={cn('station-tab-contents-wrap')}>
      {/* <StationMembersTop all={'212'} governance={'196'} /> */}
      <div className={cn('table-view-wrap')}>
        <div className={cn('view-switch-button-wrap')}>
          <div className={cn('member-count')}>{t('station.complete.table.totalMember')} : 212</div>
          <div className={cn('button-area')}>
            <span className={cn('update')}>{t('station.complete.table.update')} : 2022-07-01</span>
            {!isMobile && (
              <>
                <IconButton
                  buttonText="리스트 보기"
                  size="24"
                  iconValue="list"
                  onClick={() => changeViewAction('list')}
                  activate={toggleView}
                  classnames={cn('view-switch')}
                />
                <IconButton
                  buttonText="카드 보기"
                  size="24"
                  iconValue="card"
                  onClick={() => changeViewAction('card')}
                  activate={!toggleView ? true : false}
                  classnames={cn('view-switch')}
                />
              </>
            )}
          </div>
        </div>
        <div className={cn('view-type')}>
          {/* 23.03.30 수정: isMobile 조건 추가 */}
          {viewType === 'list' || isMobile ? <MembersTable tableData={DummyData} /> : <MembersCardList cardData={DummyData} />}
        </div>
        <PaginationCustom defaultCurrent={5} defaultPageSize={5} total={100} onChange={() => console.log('changed')} activate={1} />
      </div>
    </div>
  );
};

export default TabMembers;
