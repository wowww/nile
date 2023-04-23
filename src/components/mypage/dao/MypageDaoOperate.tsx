import { useState } from 'react';

import dynamic from 'next/dynamic';

import cn from 'classnames';
// 22.11.14 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import {
  daoCommentNoticeData,
  daoDiscussionNoticeData,
  daoHistoryData,
  daoProposalNoticeData,
  daoVoteNoticeData,
} from '@/components/mypage/mypageData';
import MypageNoticeList from '@/components/mypage/MypageNoticeList';
import { Select, Tabs } from 'antd';
import { TokenUsage } from '@/components/mypage/dao/operate/TokenUsage';
import MypageCard from '@/components/mypage/MyPageCard';
/* 22.11.21 수정: uid 추가 */
import { uuid } from 'uuidv4';

const { Option } = Select;

const MypageLineChart = dynamic(() => import('@/components/chart/MypageLineChart'), {
  ssr: false,
});

//탭 임시데이터
const TabProposal = [
  {
    label: 'Proposal 30',
    key: 'dao-proposal-proposal',
    children: <MypageNoticeList data={daoProposalNoticeData} />,
  },
  {
    label: 'Voting 5',
    key: 'dao-proposal-vote',
    children: <MypageNoticeList listType="vote" data={daoVoteNoticeData} />,
  },
  {
    label: 'Comment 28',
    key: 'dao-proposal-comment',
    children: <MypageNoticeList listType="comment" data={daoCommentNoticeData} />,
  },
];

const MypageTopOperate = () => {
  // 22.11.14 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);
  const [activatePagination, setPaginationActivate] = useState<number>(1);
  // const lineChartInit = useRecoilValue(LineChartData);
  /* 22.11.21 수정: uid 추가 */
  const Id = uuid();

  const daoHistoryNoticeData = [
    {
      title: t('daoOperate.history.1'),
      date: '2022-07-01 13:30',
      nonLink: true,
    },
    {
      title: t('daoOperate.history.2'),
      date: '2022-07-01 13:30',
      nonLink: false,
    },
    {
      title: t('daoOperate.history.3'),
      date: '2022-07-01 13:30',
      nonLink: true,
    },
    {
      title: t('daoOperate.history.4'),
      date: '2022-07-01 13:30',
      nonLink: true,
    },
  ];

  const TabDiscussion = [
    {
      label: 'Discussion 30',
      key: 'dao-discussion-discussion',
      children: <MypageNoticeList listType="discussion" data={daoDiscussionNoticeData} />,
    },
    {
      label: 'Comment 28',
      key: 'dao-discussion-comment',
      children: <MypageNoticeList listType="comment" data={daoCommentNoticeData} />,
    },
  ];

  const TabInTab = [
    {
      label: t('daoOperate.tab.1'),
      key: 'dao-token',
      children: <TokenUsage />,
    },
    {
      label: t('daoOperate.tab.2'),
      key: 'dao-proposal-content',
      children: <Tabs defaultActiveKey="dao-proposal-tab" className={cn('tab-type', 'tab-round', 'tab-sm')} items={TabProposal} />,
    },
    {
      label: t('daoOperate.tab.3'),
      key: 'dao-discussion-content',
      children: <Tabs defaultActiveKey="dao-discussion-tab" className={cn('tab-type', 'tab-round', 'tab-sm')} items={TabDiscussion} />,
    },
    {
      label: t('daoOperate.tab.4'),
      key: 'dao-history-content',
      children: <MypageNoticeList listType="history" data={daoHistoryNoticeData} />,
    },
  ];

  const onChange = (page: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };

  return (
    <>
      {daoHistoryData.length > 0 && (
        <div className={cn('mypage-select')}>
          <div className={cn('inner')}>
            <Select
              defaultValue="1"
              /* 22.11.21 수정: 셀렉트 키값 추가 */
              key={Id}
              bordered={false}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
              className={cn('select-nile')}
            >
              <Option value="1">WONDER DAO</Option>
              <Option value="2">DAO 1</Option>
              <Option value="3">DAO 2</Option>
              <Option value="4">DAO 3</Option>
            </Select>
          </div>
        </div>
      )}
      <div className={cn('mypage-operate-wrap')}>
        <div className={cn('operate-graph-area')}>
          {/* <MypageLineChart id="mypage-line-chart" data={lineChartInit} /> */}
          <MypageCard
            title="My Balance"
            date="2022-08-16 13:53 기준"
            mainUnit="$1,500.00"
            percent="+9.66%"
            wonder="3,334.1234"
            gwonder="3,334.1234"
          />
        </div>

        <div className={cn('wonder-wrap', 'mypage-history-tab')}>
          <Tabs defaultActiveKey="wonder-dao-detail" className={cn('tab-type', 'tab-md', 'tab-inline', 'tab-underline')} items={TabInTab} />
        </div>
      </div>
    </>
  );
};

export default MypageTopOperate;
