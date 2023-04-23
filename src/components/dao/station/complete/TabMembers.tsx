import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import IconButton from '@/components/button/IconButton';
import MembersTable from './MembersTable';
import MembersCardList from './MembersCardList';
import { useTranslation } from 'next-i18next';
import PaginationCustom from '@/components/button/PaginationCustom';
import useMediaQuery from '@/hook/useMediaQuery';
import { NileApiService } from '@/services/nile/api';
import StationMembersTop from "@components/dao/station/complete/StationMembersTop";

export interface StationMemberType {
  id: number,
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
  const api = NileApiService();

  const [viewType, setViewType] = useState<string>('list');
  const [toggleView, setToggleView] = useState<boolean>(true);
  const [dataList, setDataList] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  const changeViewAction = (value: string) => {
    setViewType(value);
    value === 'list' ? setToggleView(true) : setToggleView(false);
  };
  const isMobile = useMediaQuery('(max-width: 767px)');

  let tempGWonderRankList = [];
  while (tempGWonderRankList.length < 20) {
    let randomNum = Math.floor(Math.random() * 20) + 1;
    if (tempGWonderRankList.indexOf(randomNum) === -1) {
      tempGWonderRankList.push(randomNum);
    }
  }

  useEffect(() => {
    api.dao.station
      .getTableData(currentPage, 5)
      .then((data) => setDataList(data))
      .catch((err) => console.log(err));
  }, [currentPage]);

  const onChange = useCallback((page: number, pageSize: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className={cn('station-tab-contents-wrap')}>
       {/*<StationMembersTop all={'212'} governance={'196'} />*/}
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
                  activate={!toggleView}
                  classnames={cn('view-switch')}
                />
              </>
            )}
          </div>
        </div>
        <div className={cn('view-type')}>
          {viewType === 'list' || isMobile ? <MembersTable list={dataList} /> : <MembersCardList cardData={dataList} />}
        </div>
        <PaginationCustom defaultCurrent={1} defaultPageSize={5} total={dataList?.length} onChange={onChange} activate={currentPage} />
      </div>
    </div>
  );
};

export default TabMembers;
