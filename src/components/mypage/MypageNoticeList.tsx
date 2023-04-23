import { useEffect, useState } from 'react';
import cn from 'classnames';
import { windowResizeAtom } from '@/state/windowAtom';

import { daoNoticeDataProps } from '@/components/mypage/mypageData';

import PaginationCustom from '@/components/button/PaginationCustom';
import Empty from '@/components/empty/Empty';

import MypageNoticeNormalItem from '@/components/mypage/MypageNoticeNormalItem';
import { useAtomValue } from 'jotai';

interface Props {
  listType?: 'proposal' | 'vote' | 'comment' | 'discussion' | 'history';
  data: Array<daoNoticeDataProps>;
}

const MypageNoticeListItem = ({ noticeData, tagSize }: { noticeData: daoNoticeDataProps; tagSize: string }) => {
  const setStep = () => {
    switch (noticeData.step) {
      case 1:
        return 'Consensus check';
      case 2:
        return 'Governance Proposal';
      case 3:
        return 'Execution';
    }
  };

  return <MypageNoticeNormalItem noticeData={noticeData} tagSize={tagSize} />;
};

const MypageNoticeList: React.FC<Props> = ({ listType, data }) => {
  const offset = useAtomValue(windowResizeAtom);
  const [size, setSize] = useState<string>('xs');
  const [type, setType] = useState(listType);
  const [activatePagination, setPaginationActivate] = useState(1);

  const onChange = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };

  useEffect(() => {
    if (offset.width <= 768) {
      setSize('md');
    } else {
      setSize('xs');
    }
  }, [offset.width]);

  return (
    <div className={cn('mypage-notice-wrap', type)}>
      {data.length > 0 &&
        data.map((el, index) => {
          return <MypageNoticeListItem key={`notice-list${index}`} noticeData={el} tagSize={size} />;
        })}

      {/* Empty 케이스 */}
      {data.length === 0 && <Empty subText="참여 이력이 없습니다." />}
      {data.length > 0 && <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChange} activate={activatePagination} />}
    </div>
  );
};

export default MypageNoticeList;
