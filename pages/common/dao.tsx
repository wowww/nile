/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import * as Scroll from 'react-scroll';
import { Form, message, Popover, Radio, RadioChangeEvent, Table, Tabs } from 'antd';
import IconButton from '@/components/button/IconButton';
import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';
import IconInfo from '@images/icon/ico_info.svg';
import Tag from '@/components/tag/Tag';
import { daoStationTableColumns, daoStationTableColumnsData } from '@/components/table/tableDummyData';
import DaoStationModal from '@components/modal/daostation/DaoStationModal';
import DaoStationCompleteModal from '@/components/modal/DaoStationCompleteModal';
import DaoStakeModal from '@/components/modal/DaoStakeModal';
import { DaoBox, DaoBoxLayout } from '@/components/dao/DaoBoxLayout';
import DaoIndividualHomeDiscuss, {
  DaoIndividualHomeDiscussData,
} from '@/components/dao/individualHome/DaoIndividualHomeDiscuss';
import DaoIndividualHomeTwitter, {
  DaoIndividualHomeTwitterData,
} from '@/components/dao/individualHome/DaoIndividualHomeTwitter';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DaoCreateBox, DaoCreateBoxInner, DaoCreateLayout, DaoCreateTitle } from '@/components/dao/DaoCreateLayout';
import EditorBox from '@/components/dao/governance/EditorBox';

// dao governance proposal action
import ProposalSlider from '@/components/dao/governance/ProposalAction/ProposalSlider';
import ProposalDualSlider from '@/components/dao/governance/ProposalAction/ProposalDualSlider';
import AmountInputBox from '@/components/dao/governance/ProposalAction/AmountInputBox';
import InputUnit from '@/components/dao/governance/ProposalAction/InputUnit';
import ButtonInput from '@/components/dao/governance/ProposalAction/ButtonInput';
import ChangeInputRow from '@/components/dao/governance/ProposalAction/ChangeInputRow';
import ProposalChangeForm from '@/components/dao/governance/ProposalAction/ProposalChangeForm';
import ProposalAction from '@/components/dao/governance/ProposalAction/ProposalAction';
import DaoGovernanceHowItWorksModal from '@/components/modal/DaoGovernanceHowItWorksModal';
import dynamic from 'next/dynamic';
import { useAtomValue, useSetAtom } from 'jotai';
import { daoAtom, daoThemeAtom } from '@/state/daoAtom';
import DaoPurpose from '@/components/dao/home/DaoPurpose';

import DaoHomeProtocol from '@/components/dao/home/DaoHomeProtocol';
import DaoWondersMember from '@/components/dao/home/DaoWondersMember';
import DaoRecruitCondition, { dataProps, StationStatusProps } from '@/components/dao/ui/station/DaoRecruitCondition';
import { i18n, Trans, useTranslation } from 'next-i18next';
import { windowResizeAtom } from '@/state/windowAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

import { ScanFromToCell } from '@/components/dao/ui/scan/ScanFromToCell';
import { IconLogo } from '@/components/logo/IconLogo';
import GovernanceSetting from '@/components/dao/ui/governance/GovernanceSetting';
import GovernanceDetailHeader from '@/components/dao/ui/governance/GovernanceDetailHeader';
import GovernanceCard from '@/components/dao/ui/governance/contents/GovernanceCard';
import AgendaHistoryItem from '@/components/dao/ui/governance/AgendaHistoryItem';
import ContractSendModal from '@/components/modal/ContractSendModal';
import useWindowResize from '@/hook/useWindowResize';
import GovernanceVote from '@/components/dao/ui/governance/GovernanceVote';
import DaoGovernanceVotersModal from '@/components/modal/DaoGovernanceVotersModal';
import { VoterTableItemType } from '@/components/dao/ui/governance/ProposalVoters';
import NileDaoList from '@/components/home/NileDaoList';
import DaoRecruitmentCard from '@/components/dao/ui/home/RecruitmentCard';
import { useWonder } from '@/hook/useWonder';
import Head from 'next/head';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });
const SemiCirclePieChart = dynamic(() => import('@/components/chart/SemiCirclePieChart'), { ssr: false });

const wonderDaoColorSets = [
  { colorVariable: '$daoWonder[1]', colorValue: '#7246ee' },
  { colorVariable: '$daoWonder[2]', colorValue: '#d0c4f2' },
  { colorVariable: '$daoWonder[3]', colorValue: '#f8f7fa' },
  { colorVariable: '$daoWonder[4]', colorValue: '#fefffc' },
  { colorVariable: '$daoWonder[5]', colorValue: '#5937ba' },
  { colorVariable: '$daoWonder[6]', colorValue: '#1a1a1a' },
  { colorVariable: '$daoWonder[7]', colorValue: '#fff' },
  { colorVariable: '$daoWonder[8]', colorValue: '#a6a6a6' },
];

const arteumDaoColorSets = [
  { colorVariable: '$daoArteum[1]', colorValue: '#eb605f' },
  { colorVariable: '$daoArteum[2]', colorValue: '#f8d4d1' },
  { colorVariable: '$daoArteum[3]', colorValue: '#faf7f7' },
  { colorVariable: '$daoArteum[4]', colorValue: '#fffcfc' },
  { colorVariable: '$daoArteum[5]', colorValue: '#b84b4a' },
  { colorVariable: '$daoArteum[6]', colorValue: '#1a1a1a' },
  { colorVariable: '$daoArteum[7]', colorValue: '#fff' },
  { colorVariable: '$daoArteum[8]', colorValue: '#a6a6a6' },
];

const deltaDaoColorSets = [
  { colorVariable: '$daoDelta[1]', colorValue: '#1f8df2' },
  { colorVariable: '$daoDelta[2]', colorValue: '#d4ebff' },
  { colorVariable: '$daoDelta[3]', colorValue: '#f7f9fa' },
  { colorVariable: '$daoDelta[4]', colorValue: '#fcfeff' },
  { colorVariable: '$daoDelta[5]', colorValue: '#196fbf' },
  { colorVariable: '$daoDelta[6]', colorValue: '#1a1a1a' },
  { colorVariable: '$daoDelta[7]', colorValue: '#fff' },
  { colorVariable: '$daoDelta[8]', colorValue: '#a6a6a6' },
];

const oracleDaoColorSets = [
  { colorVariable: '$daoOracle[1]', colorValue: '#7ca016' },
  { colorVariable: '$daoOracle[2]', colorValue: '#e9f2b3' },
  { colorVariable: '$daoOracle[3]', colorValue: '#f9faf7' },
  { colorVariable: '$daoOracle[4]', colorValue: '#fbfbfe' },
  { colorVariable: '$daoOracle[5]', colorValue: '#556e0f' },
  { colorVariable: '$daoOracle[6]', colorValue: '#1a1a1a' },
  { colorVariable: '$daoOracle[7]', colorValue: '#fff' },
  { colorVariable: '$daoOracle[8]', colorValue: '#a6a6a6' },
];

const discussData: DaoIndividualHomeDiscussData = {
  link: '/',
  title: 'How to earn the WEMIX$?',
  desc: 'You can exchange money through a cryptocurrency wallet',
  group: [
    { user: '1', userImage: 'https://picsum.photos/32/32/?image=1' },
    { user: '2', userImage: 'https://picsum.photos/32/32/?image=1' },
    { user: '3', userImage: 'https://picsum.photos/32/32/?image=1' },
    { user: '4', userImage: 'https://picsum.photos/32/32/?image=1' },
  ],
  info: {
    like: 200,
    comment: 20,
    count: 442,
    recentlyActivity: 'Apr 20',
  },
};

const twitterData: DaoIndividualHomeTwitterData = {
  link: '/',
  author: 'string',
  authorImg: 'https://picsum.photos/32/32/?image=1',
  desc: '원더다오가 이제 막 열렸습니다. 다들 서두르세요! 닫히기 전에 꼭 가입하기!',
  tags: ['wonderdao', 'wemix'],
};

const proposalData: any[] = [
  {
    link: '/',
    step: 'step1',
    state: 'active',
    title: 'Should the community participate in the Protocol Guild Pilot?',
    isRemain: true,
    remainDay: 3,
    remainHour: 21,
    votingStart: '2022-07-01',
    votingEnd: '2022-07-07',
    pros: 66.77,
    quorumStandard: '100,000,000',
    quorumVote: '1,000',
    userId: '0x2d07E...c3a5',
    userType: 1,
    repliesNumber: 22,
    group: [
      { user: '1', userImage: '' },
      { user: '2', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '3', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '4', userImage: 'https://picsum.photos/32/32/?image=1' },
    ],
  },
  {
    link: '/',
    step: 'step2',
    state: 'rejected',
    title: 'Should the community participate in the Protocol Guild Pilot?',
    isRemain: true,
    remainDay: 3,
    remainHour: 21,
    votingStart: '2022-07-01',
    votingEnd: '2022-07-07',
    pros: 66.77,
    quorumStandard: '100,000,000',
    quorumVote: '1,000',
    userId: '0x2d07E...c3a5',
    userType: 2,
    repliesNumber: 22,
    group: [
      { user: '1', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '2', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '3', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '4', userImage: 'https://picsum.photos/32/32/?image=1' },
    ],
  },
  {
    link: '/',
    step: 'step2',
    state: 'accepted',
    title: 'Should the community participate in the Protocol Guild Pilot?',
    isRemain: true,
    remainDay: 3,
    remainHour: 21,
    votingStart: '2022-07-01',
    votingEnd: '2022-07-07',
    pros: 66.77,
    quorumStandard: '100,000,000',
    quorumVote: '1,000',
    userId: '0x2d07E...c3a5',
    userType: 3,
    repliesNumber: 22,
    group: [
      { user: '1', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '2', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '3', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '4', userImage: 'https://picsum.photos/32/32/?image=1' },
    ],
  },
  {
    link: '/',
    step: 'step1',
    state: 'canceled',
    title: 'Should the community participate in the Protocol Guild Pilot?',
    isRemain: true,
    remainDay: 3,
    remainHour: 21,
    votingStart: '2022-07-01',
    votingEnd: '2022-07-07',
    pros: 66.77,
    quorumStandard: '100,000,000',
    quorumVote: '1,000',
    userId: '0x2d07E...c3a5',
    userType: 4,
    repliesNumber: 22,
    group: [
      { user: '1', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '2', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '3', userImage: 'https://picsum.photos/32/32/?image=1' },
      { user: '4', userImage: 'https://picsum.photos/32/32/?image=1' },
    ],
  },
];

const TableData: VoterTableItemType[] = Array.from({ length: 9 }, (_, index) => {
  return {
    voter: {
      profileImg: '',
      name: '0xabcd...abcd',
    },
    vote: index % 3 ? 'against' : 'for',
    amount: 1000000000000.1234,
    date: new Date(2015, 1, 3, 14, 12, 11).getTime(),
  };
});

type daoRecruitDataProps = {
  additional?: boolean;
  refund?: boolean;
  status?: StationStatusProps | undefined;
  data: dataProps;
  title?: string;
  participant?: {
    amount: number;
    occupy: number;
  };
};

type ContractDataType = {
  funding: string;
  token: number;
};

interface rewardData {
  firstData: number;
  secondData: number;
  people?: number;
  percent?: number;
}
interface buttonTypes {
  btnName: string;
  disabled?: boolean;
  href?: string;
}
interface NileRecruitmentProps {
  mainTitle?: string;
  desc?: string;
  subTitle?: '시작' | '종료';
  completeTitle?: string;
  startAt?: string;
  endAt?: string;
  fail?: boolean;
  date?: string;
  isTime?: boolean;
  reward?: rewardData;
  subContent?: boolean;
  mainContent?: string;
  theme?: 'wonder' | 'arteum' | 'delta' | 'oracle';
  className?: string;
  buttons: buttonTypes[];
}

const contractData: ContractDataType = {
  funding: 'Trust Contract',
  token: 12094.12345678912345679,
};

const Common = () => {
  const { t } = useTranslation(['dao', 'daoHome', 'common', 'nile']);

  const [sectionLinks, setSectionLinks] = useState<boolean>();
  const sectionLinkAll = useRef<any>([]);
  const [isModalDaoStation, setModalDaoStation] = useState(false);
  const [isModalDaoStationComplete, setModalDaoStationComplete] = useState(false);
  const [isModalDaoStationAdd, setModalDaoStationAdd] = useState(false);
  const [isModalDaoStationCancel, setModalDaoStationCancel] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [isCancelConfirmModal, setCancelConfirmModal] = useState(false);
  const [isStakeModal, setStakeModal] = useState(false);
  const [isStakeModal2, setStakeModal2] = useState(false);
  const [isStakeModal3, setStakeModal3] = useState(false);
  const [isStakeModal4, setStakeModal4] = useState(false);
  const [isStakeModal5, setStakeModal5] = useState(false);
  const [isStakeModal6, setStakeModal6] = useState(false);
  const [isStakeModal7, setStakeModal7] = useState(false);
  const [isStakeModal8, setStakeModal8] = useState(false);
  const [isStakeModal9, setStakeModal9] = useState(false);
  const [isStakeModal10, setStakeModal10] = useState(false);
  const [isStakeModal11, setStakeModal11] = useState(false);
  const [isStakeResultModal, setStakeResultModal] = useState(false);
  const [isStakeResultModal1, setStakeResultModal1] = useState(false);
  const [isStakeResultModal2, setStakeResultModal2] = useState(false);
  const [modalCoin1, setModalCoin1] = useState(false);
  const [modalCoin2, setModalCoin2] = useState(false);
  const [isSmallPopupRegistCheckTemprature, setSmallPopupRegistCheckTemprature] = useState(false);
  const [isSmallPopupRegistCheckConsensus, setSmallPopupRegistCheckConsensus] = useState(false);
  const [isSmallPopupRegistCheckGovernance, setSmallPopupRegistCheckGovernance] = useState(false);
  const [isSmallPopupRegistStop, setSmallPopupRegistStop] = useState(false);
  const [isSmallPopupTypeSelect, setSmallPopupTypeSelect] = useState(false);
  const [isSmallPopupUnableToRegist, setSmallPopupUnableToRegist] = useState(false);
  const [isSmallPopupCantWrite, setSmallPopupCantWrite] = useState(false);
  const [isSmallPopupCommentDel, setSmallPopupCommentDel] = useState(false);
  const [isSmallPopupNoticeDel, setSmallPopupNoticeDel] = useState(false);
  const [isSmallPopupNoticeAdd, setSmallPopupNoticeAdd] = useState(false);
  const [isSmallPopupInputClear, setSmallPopupInputClear] = useState(false);

  const [isSmallPopupCommentCantWrite, setSmallPopupCommentCantWrite] = useState(false);
  const [isSmallPopupommentEditCancel, setSmallPopupommentEditCancel] = useState(false);
  const [isSmallPopupDelProposal, setSmallPopupDelProposal] = useState(false);
  const [isSmallPopupCheckQuantity, setSmallPopupCheckQuantity] = useState(false);
  const [isSmallPopupCantFeasible, setSmallPopupCantFeasible] = useState(false);
  const [isSmallPopupCancelVote, setSmallPopupCancelVote] = useState(false);
  const [isSmallPopupCantVoting, setSmallPopupCantVoting] = useState(false);
  const [isSmallPopupEditReset, setSmallPopupEditReset] = useState(false);
  const [isSmallPopupLimitVoting, setSmallPopupLimitVoting] = useState(false);
  const [proposalType, setProposalType] = useState(0);
  const [isPendingModal, setIsPendingModal] = useState<boolean>(false);
  const [daoGovernanceDetailHeader, setDaoGovernanceDetailHeader] = useState<any>({
    content: {
      agenda: t('governance.agenda.item.1', { ns: 'dao' }),
      title:
        'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    comment: {
      count: 130,
      href: '#comment',
    },
    view: 50,
  });
  const [daoGovernanceAgendaHistory, setDaoGovernanceAgendaHistory] = useState<any>({
    step: 'Consensus Check',
    comment: 0,
    view: 0,
    agendaType: 'default text',
    title: 'default text',
    votingPeriod: {
      start: '2022-07-01',
      end: '2022-07-01',
    },
    passInfo: {
      percent: 0,
      token: 0,
      step: 'Consensus Check',
      date: '2022-07-01',
    },
  });
  const [daoGovernanceCardInfo, setDaoGovernanceCardInfo] = useState<any>({});
  const [governanceHowItWorksModal, setGovernanceHowItWorksModal] = useState(false);
  const [isWriteContentReset, setIsWriteContentReset] = useState(false);
  const [isMakeDaoProcess, setIsMakeDaoProcess] = useState(false);
  const [isSignProgress, setIsSignProgress] = useState(false);
  const [isDeleteMaker, setIsDeleteMaker] = useState(false);
  const [isVotePopup, setIsVotePopup] = useState(false);
  const activeDao = useAtomValue(daoThemeAtom);
  const { wonderDao } = useWonder();

  const resizeEvtInit = useWindowResize();
  const [viewType, setViewType] = useState<string>('list');
  const [toggleView, setToggleView] = useState<boolean>(true);
  const [daoRecruitData, setDaoRecruitData] = useState<daoRecruitDataProps>({
    status: 'recruited',
    data: {
      title: t('station.recruitCondition.condition.status.recruited.title'),
      desc: t('station.recruitCondition.condition.status.recruited.desc'),
      buttons: [{ btnName: 'Station Opens Soon', disabled: true }],
    },
  });

  // 나일홈 다오 RecruitmentCard
  const [nileRecruitData, setNileRecruitData] = useState<NileRecruitmentProps>({
    desc: i18n && i18n.language === 'ko' ? '2023년 4월 6일' : '2023-04-06',
    subContent: true,
    mainContent: '0',
    className: 'nile-home',
    buttons: [{ btnName: 'Station Opens Soon' }],
  });
  // 다오쇼케이스 RecruitmentCard
  const [showcaseRecruitData, setShowcaseRecruitData] = useState<NileRecruitmentProps>({
    subContent: true,
    mainContent: '0',
    className: 'nile-home',
    buttons: [{ btnName: 'Station Opens Soon' }],
  });
  const setDao = useSetAtom(daoAtom);
  const offset = useAtomValue(windowResizeAtom);

  const onChangeProposalType = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setProposalType(e.target.value);
  };

  const changeViewAction = (value: string) => {
    setViewType(value);
    value === 'list' ? setToggleView(true) : setToggleView(false);
  };

  useEffect(() => {
    const links = document.querySelectorAll('section > h1');
    if (sectionLinks === undefined) {
      links.forEach((link, index) => {
        sectionLinkAll.current[index] = link;
      });
      setSectionLinks(true);
    }
  }, [sectionLinks]);

  const onFinish = (values: any) => {
    confirmForm();
  };

  const confirmForm = () => {};
  const [form] = Form.useForm();
  const amountValidator = useCallback(
    (_: any, value: string) => {
      // Error Case1 : 금액 입력 필요
      if (_.field === 'station-re-field2' && !value) {
        return Promise.reject(new Error(t('agenda.tab6.error1')));
      }
      // Error Case2 : 수량 입력 필요
      if (_.field !== 'station-re-field2' && !value) {
        return Promise.reject(new Error('금액을 입력해 주세요.'));
      }
      return Promise.resolve();
    },
    [t],
  );

  return (
    <>
      {/*
        * common 파일 작성 법!
        *
        * section 추가시 title id로 링크(Scroll.Link)도 함께 추가 되게 작업 되어 있음
        * 기본 구조
        * <section className={cn('common-section')}>
            <h1 className={cn('common-title')} id="아이디 추가">
              title 추가
            </h1>
            <div>
              * 공지로 작성할 글이 있을때는 common-notice 이용해서 작성
              * li 목록으로 작성하면 되며 strong은 bold, b는 negative 색상, span은 highlight 색상이 추가 되어 있음
              <ul className={cn('common-notice')}>
                <li>공지 1</li>
                <li>공지 2</li>
              </ul>
              * 여기서부터 공통 컴포넌트 작성 div 생성 후 div 안에 작성
              * button, icon, image 같이 일렬로 나열해서 넣을 경우 common-display-flex 클래스 사용
              * sub title을 사용해야 할 경우 이 단계에 추가
              * <h2 className={cn('common-sub-title')}>sub title</h2>
              <div>
                component 추가
                <div className={cn('common-name')}>component name 추가</div>
              </div>
            </div>
          </section>
      */}
      <Head>
        <title>Common &gt; NILE &gt; Dao</title>
        <body className={cn('common-wrap wonder-wrap dao-wrap')} />
      </Head>
      <div className={cn('common-content-wrap')}>
        <div className={cn('common-links')}>
          <a href="/common">Common</a>
          <a href="/common/dao">Dao</a>
          <a href="/common/mypage">Mypage</a>
        </div>
        <div className={cn('common-links')}>
          {sectionLinks
            ? sectionLinkAll.current?.map((link: HTMLElement, index: number) => {
                return (
                  <Scroll.Link to={link.id} offset={-57} key={`link-${index}`}>
                    {link.textContent}
                  </Scroll.Link>
                );
              })
            : ''}
        </div>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Purpose">
            Purpose
          </h1>
          <div>
            *Purpose 부분 작업 내용입니다.*
            <div>
              <DaoPurpose />
              <div className={cn('common-name')}>Purpose</div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Color">
            Color
          </h1>
          <div>
            <div className={cn('common-name')}>Wonder Dao color</div>
            <div className={cn('color-set-view')}>
              {wonderDaoColorSets.map((colorSet, index) => {
                return (
                  <div key={`color-set-${index}`}>
                    <div className={cn('color-set')} style={{ backgroundColor: colorSet.colorValue }}>
                      <p>
                        <span>{colorSet.colorVariable}</span>
                        <span>{colorSet.colorValue}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={cn('common-name')}>Arteum Dao color</div>
            <div className={cn('color-set-view')}>
              {arteumDaoColorSets.map((colorSet, index) => {
                return (
                  <div key={`color-set-${index}`}>
                    <div className={cn('color-set')} style={{ backgroundColor: colorSet.colorValue }}>
                      <p>
                        <span>{colorSet.colorVariable}</span>
                        <span>{colorSet.colorValue}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={cn('common-name')}>Delta Dao color</div>
            <div className={cn('color-set-view')}>
              {deltaDaoColorSets.map((colorSet, index) => {
                return (
                  <div key={`color-set-${index}`}>
                    <div className={cn('color-set')} style={{ backgroundColor: colorSet.colorValue }}>
                      <p>
                        <span>{colorSet.colorVariable}</span>
                        <span>{colorSet.colorValue}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={cn('common-name')}>Oracle Dao color</div>
            <div className={cn('color-set-view')}>
              {oracleDaoColorSets.map((colorSet, index) => {
                return (
                  <div key={`color-set-${index}`}>
                    <div className={cn('color-set')} style={{ backgroundColor: colorSet.colorValue }}>
                      <p>
                        <span>{colorSet.colorVariable}</span>
                        <span>{colorSet.colorValue}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Color">
            Tab
          </h1>

          <div>
            <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
              <div className={cn('common-name')}>다오 사이즈</div>
              <Tabs defaultActiveKey="4" className={cn('tab-type', 'tab-dao')}>
                <Tabs.TabPane tab="Tab 1" key="4-1">
                  Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="4-2">
                  Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="4-3">
                  Content of Tab Pane 3
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Color">
            Tooltip
          </h1>

          <div>
            <div className={cn('common-display-flex', 'wonder-wrap')}>
              <div>
                <div className={cn('common-name')}>top center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward </span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="top"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="click"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <span className={cn('a11y')}>tooltip</span>
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>bottom center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward</span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="bottom"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="click"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <span className={cn('a11y')}>tooltip</span>
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>Right center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward</span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="right"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="click"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <span className={cn('a11y')}>tooltip</span>
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>left center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward</span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="left"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="click"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <span className={cn('a11y')}>tooltip</span>
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')} style={{ display: 'none' }}>
          <h1 className={cn('common-title')} id="Station CheckMore">
            StationCheckMore &gt; Dao Home - List
          </h1>
          <div>
            <div>
              <OutlineButton
                buttonText="모집전"
                color="black"
                size="md"
                onClick={() => {
                  setDao({
                    id: '12',
                    name: 'WONDER DAO',
                    description:
                      'WONDER DAO는 WEMIX3.0 메인넷 노드 운영의 권한을 부여받은 DAO로서, WEMIX3.0의 안정된 운영과 혁신에 기여하는 Node Council Partner로서의 책임을 지닙니다.',
                    startAt: '2023-03-15 12:00',
                    endAt: '2023-03-21 12:00',
                    current: 300000,
                    goal: 1500000,
                    participants: [
                      {
                        id: '1',
                        address: '0x1224534535',
                        amount: 10000,
                      },
                    ],
                  });
                }}
              />
              <OutlineButton
                buttonText="모집 중"
                color="black"
                size="md"
                onClick={() => {
                  setDao({
                    id: '12',
                    name: 'WONDER DAO',
                    description:
                      'WONDER DAO는 WEMIX3.0 메인넷 노드 운영의 권한을 부여받은 DAO로서, WEMIX3.0의 안정된 운영과 혁신에 기여하는 Node Council Partner로서의 책임을 지닙니다.',
                    startAt: '2023-02-20 12:00',
                    endAt: '2023-03-15 12:00',
                    current: 300000,
                    goal: 1500000,
                    participants: [
                      {
                        id: '1',
                        address: '0x1224534535',
                        amount: 10000,
                      },
                    ],
                  });
                }}
              />
              <OutlineButton
                buttonText="모집실패"
                color="black"
                size="md"
                onClick={() => {
                  setDao({
                    id: '12',
                    name: 'WONDER DAO',
                    description:
                      'WONDER DAO는 WEMIX3.0 메인넷 노드 운영의 권한을 부여받은 DAO로서, WEMIX3.0의 안정된 운영과 혁신에 기여하는 Node Council Partner로서의 책임을 지닙니다.',
                    startAt: '2023-02-01 12:00',
                    endAt: '2023-02-05 12:00',
                    current: 300000,
                    goal: 1500000,
                    participants: [
                      {
                        id: '1',
                        address: '0x1224534535',
                        amount: 10000,
                      },
                    ],
                  });
                }}
              />
              <OutlineButton
                buttonText="모집성공"
                color="black"
                size="md"
                onClick={() => {
                  setDao({
                    id: '12',
                    name: 'WONDER DAO',
                    description:
                      'WONDER DAO는 WEMIX3.0 메인넷 노드 운영의 권한을 부여받은 DAO로서, WEMIX3.0의 안정된 운영과 혁신에 기여하는 Node Council Partner로서의 책임을 지닙니다.',
                    startAt: '2023-02-01 12:00',
                    endAt: '2023-02-05 12:00',
                    current: 1500000,
                    goal: 1500000,
                    participants: [
                      {
                        id: '1',
                        address: '0x1224534535',
                        amount: 10000,
                      },
                    ],
                  });
                }}
              />
            </div>
          </div>
        </section>
        <section className={cn('common-section no-padding')}>
          <h1 className={cn('common-title')} id="Nile RecruitCondition">
            Nile Home RecruitCondition
          </h1>
          <div>
            <OutlineButton
              buttonText="모집 전 - (일자 확정/시간 미정)"
              color="black"
              size="md"
              onClick={() => {
                setNileRecruitData({
                  desc: i18n && i18n.language === 'ko' ? '2023년 4월 6일' : '2023-04-06',
                  subContent: true,
                  mainContent: '123445667',
                  className: 'nile-home',
                  // buttons={[{ btnName: 'Station Opens Soon' }]}
                  buttons: [{ btnName: t('goToBtn', { ns: 'common', name: 'Station' }) }],
                });
              }}
            />
            <OutlineButton
              buttonText="모집 전 - (일자 확정/시간 확정)"
              color="black"
              size="md"
              onClick={() => {
                setNileRecruitData({
                  date: '2023-04-06 11:00 ~ 2023-04-13 11:00',
                  // startAt: wonderDao?.startAt,
                  // endAt: wonderDao?.endAt,
                  isTime: true,
                  subTitle: '시작',
                  mainContent: '123',
                  className: 'nile-home',
                  buttons: [{ btnName: t('goToBtn', { ns: 'common', name: 'Station' }) }],
                });
              }}
            />
            <OutlineButton
              buttonText="모집 중"
              color="black"
              size="md"
              onClick={() => {
                setNileRecruitData({
                  date: '2023-04-06 11:00 ~ 2023-04-13 11:00',
                  isTime: true,
                  subTitle: '종료',
                  className: 'nile-home',
                  // buttons={[{ btnName: 'Station Opens Soon' }]}
                  buttons: [{ btnName: t('goToBtn', { ns: 'common', name: 'Station' }) }],
                  reward: {
                    percent: 0,
                    firstData: 850000,
                    secondData: 1700010,
                    people: 100,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="모집 완료"
              color="black"
              size="md"
              onClick={() => {
                setNileRecruitData({
                  className: 'nile-home',
                  completeTitle: '13,459,656',
                  buttons: [
                    { btnName: t('goToBtn', { ns: 'common', name: 'WEMIX.Fi' }), href: 'https://wemix.fi' },
                    { btnName: t('goToBtn', { ns: 'common', name: `${useDaoCharacterConvert(activeDao.value)}` }), href: '/dao/station' },
                  ],
                });
              }}
            />
            <div style={{ maxWidth: offset.width > 1024 ? '1080px' : 'auto' }}>
              <NileDaoList recruitment={<DaoRecruitmentCard {...nileRecruitData} />} themeData={[{ theme: 'wonder' }]} />
            </div>
          </div>
        </section>
        <section className={cn('common-section no-padding')}>
          <h1 className={cn('common-title')} id="Showcase RecruitCondition">
            DAO Showcase RecruitCondition
          </h1>
          <div>
            <OutlineButton
              buttonText="모집 전 - (일자 확정/시간 미정)"
              color="black"
              size="md"
              onClick={() => {
                setShowcaseRecruitData({
                  desc: '2023년 4월 14일',
                  subContent: true,
                  mainContent: '19345',
                  className: 'dao-showcase',
                  buttons: [{ btnName: t('goToBtn', { ns: 'common', name: 'Station' }) }],
                });
              }}
            />
            <OutlineButton
              buttonText="모집 전 - (일자 확정/시간 확정)"
              color="black"
              size="md"
              onClick={() => {
                setShowcaseRecruitData({
                  date: '2023-04-06 11:00 ~ 2023-04-13 11:00',
                  startAt: '2023-04-06 11:00',
                  endAt: '2023-04-13 11:00',
                  isTime: true,
                  subTitle: '시작',
                  className: 'dao-showcase',
                  buttons: [{ btnName: t('goToBtn', { ns: 'common', name: 'Station' }) }],
                });
              }}
            />
            <OutlineButton
              buttonText="모집 중"
              color="black"
              size="md"
              onClick={() => {
                setShowcaseRecruitData({
                  date: '2023-04-06 11:00 ~ 2023-04-13 11:00',
                  isTime: true,
                  subTitle: '종료',
                  className: 'dao-showcase',
                  buttons: [{ btnName: t('goToBtn', { ns: 'common', name: 'Station' }) }],
                  reward: {
                    percent: 0,
                    firstData: 18500000,
                    secondData: 1700010,
                    people: 100,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="모집 완료"
              color="black"
              size="md"
              onClick={() => {
                setShowcaseRecruitData({
                  className: 'dao-showcase',
                  completeTitle: '13,459,656',
                  reward: {
                    percent: 0,
                    firstData: 18500000,
                    secondData: 1700010,
                    people: 100,
                  },
                  buttons: [
                    { btnName: t('goToBtn', { ns: 'common', name: 'WEMIX.Fi' }) },
                    { btnName: t('goToBtn', { ns: 'common', name: 'WONDER DAO' }) },
                  ],
                });
              }}
            />
            <OutlineButton
              buttonText="모집 실패 - (신규 케이스)"
              color="black"
              size="md"
              onClick={() => {
                setShowcaseRecruitData({
                  className: 'dao-showcase',
                  fail: true,
                  reward: {
                    percent: 0,
                    firstData: 18500000,
                    secondData: 1700010,
                    people: 100,
                  },
                  buttons: [{ btnName: t('goToBtn', { ns: 'common', name: 'Station' }) }],
                });
              }}
            />
            <div className={cn('dao-profile-section')}>
              <div className={cn('profile-section-card')}>
                <div className={cn('profile-section-countdown')}>
                  <DaoRecruitmentCard {...showcaseRecruitData} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section no-padding')}>
          <h1 className={cn('common-title')} id="Station RecruitCondition">
            Station RecruitCondition
          </h1>
          <div>
            <OutlineButton
              buttonText="모집 예정 (일정 미확정)"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  status: 'recruited',
                  data: {
                    title: t('station.recruitCondition.condition.status.recruited.title'),
                    desc: t('station.recruitCondition.condition.status.recruited.desc'),
                    buttons: [{ btnName: 'Station Opens Soon', disabled: true }],
                    reward: {
                      firstData: 0,
                      secondData: 1700010,
                      notice: t('station.recruitCondition.condition.status.recruited.notice'),
                    },
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="모집 예정 (일정 확정)"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  status: 'recruited',
                  data: {
                    isTime: true,
                    title: t('station.recruitCondition.condition.status.recruitedConfirmed.title'),
                    date: '2023-03-12 11:00 ~ 2023-03-15 11:00',
                    buttons: [{ btnName: t('station.recruitCondition.condition.btnParticipant'), disabled: true }],
                    reward: { firstData: 0, secondData: 1700010 },
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="모집 중 (참여 전)"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  status: 'recruiting',
                  data: {
                    isTime: true,
                    title: t('station.recruitCondition.condition.status.recruitingParticipated.title'),
                    date: '2023-03-12 11:00 ~ 2023-03-15 11:00',
                    reward: { firstData: 1700010, secondData: 1700010, people: 128 },
                    buttons: [{ btnName: t('station.recruitCondition.condition.btnParticipant'), disabled: false }],
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="모집 중 (참여 후)"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  status: 'recruiting',
                  data: {
                    isTime: true,
                    title: t('station.recruitCondition.condition.status.recruitingParticipated.title'),
                    date: '2023-03-12 11:00 ~ 2023-03-15 11:00',
                    reward: { firstData: 124, secondData: 100, people: 128 },
                    guide: t('station.recruitCondition.condition.status.recruitingParticipated.guide', { type: 'WONDER' }),
                    buttons: [
                      { btnName: t('station.recruitCondition.condition.btnCancelParticipant'), disabled: false },
                      { btnName: t('station.recruitCondition.condition.btnAddParticipant'), disabled: false },
                    ],
                  },
                  participant: {
                    amount: 2539,
                    occupy: 12.14,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="모집 완료 - Wonder 배분 계산"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  status: 'completed',
                  data: {
                    title: t('station.recruitCondition.condition.status.completed.title'),
                    date: '2023-02-12 11:00 ~ 2023-02-15 11:00',
                    reward: { firstData: 200, secondData: 100, people: 128 },
                    result: t('station.recruitCondition.condition.status.completed.result', { number: (13459656).toLocaleString('ko-KR') }),
                    guide: t('station.recruitCondition.condition.status.completed.guide', { type: 'WONDER' }),
                    buttons: [
                      {
                        btnName: t('station.recruitCondition.condition.btnCalculator', { type: 'WONDER' }),
                        disabled: true,
                      },
                    ],
                  },
                  participant: {
                    amount: 2539,
                    occupy: 12.14,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="모집실패 - 참여한 멤버일 경우"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  status: 'failed',
                  data: {
                    title: t('station.recruitCondition.condition.status.failed.title'),
                    date: '2023-02-12 11:00 ~ 2023-02-15 11:00',
                    reward: { firstData: 59, secondData: 100, people: 128 },
                    result: t('station.recruitCondition.condition.status.failed.result'),
                    guide: t('station.recruitCondition.condition.status.failed.guide'),
                    buttons: [{ btnName: t('station.recruitCondition.condition.btnRefund') }],
                  },
                  participant: {
                    amount: 2539,
                    occupy: 12.14,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="모집실패 - 참여한 멤버일 경우 - 환불 완료된 상태"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  status: 'failed',
                  refund: true,
                  data: {
                    title: t('station.recruitCondition.condition.status.failed.title'),
                    date: '2023-02-12 11:00 ~ 2023-02-15 11:00',
                    reward: { firstData: 59, secondData: 100, people: 128 },
                    result: t('station.recruitCondition.condition.status.failed.result'),
                    guide: t('station.recruitCondition.condition.status.failed.guide3'),
                    buttons: [{ btnName: t('station.recruitCondition.condition.btnRefundCompleted'), disabled: true }],
                  },
                  participant: {
                    amount: 2539,
                    occupy: 12.14,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="모집실패 - 참여하지 않은 멤버일 경우"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  status: 'failed',
                  data: {
                    title: t('station.recruitCondition.condition.status.failed.title'),
                    date: '2023-02-12 11:00 ~ 2023-02-15 11:00',
                    reward: { firstData: 59, secondData: 100, people: 128 },
                    result: t('station.recruitCondition.condition.status.failed.result'),
                    guide: t('station.recruitCondition.condition.status.failed.guide3'),
                    buttons: [{ btnName: t('station.recruitCondition.condition.btnParticipant'), disabled: true }],
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="추가 모집 - 모집 중 (참여 전)"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  additional: true,
                  status: 'recruiting',
                  title: t('station.recruitCondition.title'),
                  data: {
                    isTime: true,
                    title: t('station.recruitCondition.condition.status.recruitingParticipated.title'),
                    date: '2023-03-12 11:00 ~ 2023-03-15 11:00',
                    reward: { firstData: 300, secondData: 100, people: 128 },
                    buttons: [{ btnName: t('station.recruitCondition.condition.btnParticipant'), disabled: false }],
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="추가 모집 - 모집 중 (참여 후)"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  additional: true,
                  status: 'recruiting',
                  title: t('station.recruitCondition.title'),
                  data: {
                    isTime: true,
                    title: t('station.recruitCondition.condition.status.recruitingParticipated.title'),
                    date: '2023-03-12 11:00 ~ 2023-03-15 11:00',
                    reward: { firstData: 300, secondData: 100, people: 128 },
                    guide: t('station.recruitCondition.condition.status.recruitingParticipated.guide', { type: 'WONDER' }), // useDaoCharacterConvert(activeDao.value)
                    buttons: [
                      { btnName: t('station.recruitCondition.condition.btnCancelParticipant'), disabled: false },
                      { btnName: t('station.recruitCondition.condition.btnAddParticipant'), disabled: false },
                    ],
                  },
                  participant: {
                    amount: 2539,
                    occupy: 12.14,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="추가 모집 - 모집 완료 - Wonder 배분 계산"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  additional: true,
                  status: 'completed',
                  title: t('station.recruitCondition.title'),
                  data: {
                    title: t('station.recruitCondition.condition.status.completed.title'),
                    date: '2023-02-12 11:00 ~ 2023-02-15 11:00',
                    reward: { firstData: 300, secondData: 100, people: 128 },
                    result: t('station.recruitCondition.condition.status.completed.result', { number: (13459656).toLocaleString('ko-KR') }),
                    guide: t('station.recruitCondition.condition.status.completed.guide', { type: 'WONDER' }),
                    buttons: [
                      {
                        btnName: t('station.recruitCondition.condition.btnCalculator', { type: 'WONDER' }),
                        disabled: true,
                      },
                    ],
                  },
                  participant: {
                    amount: 2539,
                    occupy: 12.14,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="추가 모집 - 모집실패 - 참여한 멤버일 경우"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  additional: true,
                  status: 'failed',
                  title: t('station.recruitCondition.title'),
                  data: {
                    title: t('station.recruitCondition.condition.status.failed.title'),
                    date: '2023-02-12 11:00 ~ 2023-02-15 11:00',
                    reward: { firstData: 30, secondData: 100, people: 128 },
                    result: t('station.recruitCondition.condition.status.failed.result2'),
                    guide: t('station.recruitCondition.condition.status.failed.guide2'),
                    buttons: [{ btnName: t('station.recruitCondition.condition.btnRefund') }],
                  },
                  participant: {
                    amount: 2539,
                    occupy: 12.14,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="추가 모집 - 모집실패 - 참여한 멤버일 경우 - 환불 완료된 상태"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  additional: true,
                  status: 'failed',
                  title: t('station.recruitCondition.title'),
                  refund: true,
                  data: {
                    title: t('station.recruitCondition.condition.status.failed.title'),
                    date: '2023-02-12 11:00 ~ 2023-02-15 11:00',
                    reward: { firstData: 30, secondData: 100, people: 128 },
                    result: t('station.recruitCondition.condition.status.failed.result2'),
                    guide: t('station.recruitCondition.condition.status.failed.guide4'),
                    buttons: [{ btnName: t('station.recruitCondition.condition.btnRefundCompleted'), disabled: true }],
                  },
                  participant: {
                    amount: 2539,
                    occupy: 12.14,
                  },
                });
              }}
            />
            <OutlineButton
              buttonText="추가 모집 - 모집실패 - 참여하지 않은 멤버일 경우"
              color="black"
              size="md"
              onClick={() => {
                setDaoRecruitData({
                  additional: true,
                  status: 'failed',
                  title: t('station.recruitCondition.title'),

                  data: {
                    title: t('station.recruitCondition.condition.status.failed.title'),
                    date: '2023-02-12 11:00 ~ 2023-02-15 11:00',
                    reward: { firstData: 30, secondData: 9999999, people: 128 },
                    result: t('station.recruitCondition.condition.status.failed.result2'),
                    guide: t('station.recruitCondition.condition.status.failed.guide4'),
                    buttons: [{ btnName: t('station.recruitCondition.condition.btnParticipant'), disabled: true }],
                  },
                });
              }}
            />
            <div style={{ maxWidth: offset.width > 1024 ? '1080px' : 'auto' }}>
              <DaoRecruitCondition {...daoRecruitData} />
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Smart Contract">
            Smart Contract
          </h1>
          <div>
            <div className={cn('common-display-flex wonder-wrap')} style={{ background: '#F3F3FC' }}>
              <div className={cn('smart-contract-wrap')}>
                <div className={cn('smart-contract-inner')}>
                  <div className={cn('smart-contract-section')}>
                    <h4>Ratio of distribution in Treasury</h4>
                    <ol className={cn('smart-contract-flowchart')}>
                      <li className={cn('line')}>
                        <strong>Trust</strong>
                        <span>(WEMIX)</span>
                      </li>
                      <li className={cn('bg-white')}>
                        <strong>Send to Treasury</strong>
                        <span>(WEMIX)</span>
                      </li>
                      <li className={cn('smart-contract-inner-flowchart-wrap')}>
                        <ol className={cn('smart-contract-inner-flowchart')}>
                          <li className={cn('bg-dao-color1')}>
                            <div>Treasury</div>
                            <strong>90%</strong>
                          </li>
                          <li className={cn('bg-white')}>
                            <strong>Send to Trust</strong>
                            <span>(WEMIX)</span>
                          </li>
                        </ol>
                        <ol className={cn('smart-contract-inner-flowchart')}>
                          <li className={cn('bg-dao-color2')}>
                            <div className={cn('a11y')}>Treasury</div>
                            <strong>10%</strong>
                          </li>
                          <li className={cn('bg-white')}>
                            <strong>Reserve in Treasury</strong>
                            <span>(WEMIX)</span>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
                  <div className={cn('smart-contract-section')}>
                    <h4>Ratio of distribution in Incinerator</h4>
                    <ol className={cn('smart-contract-flowchart')}>
                      <li className={cn('line')}>
                        <strong>Trust</strong>
                        <span>(WEMIX)</span>
                      </li>
                      <li className={cn('bg-white')}>
                        <strong>Send to Incinerator</strong>
                        <span>(DAO Token*)</span>
                      </li>
                      <li className={cn('smart-contract-inner-flowchart-wrap')}>
                        <ol className={cn('smart-contract-inner-flowchart')}>
                          <li className={cn('bg-dao-color1')}>
                            <div>Incinerator</div>
                            <strong>40%</strong>
                          </li>
                          <li className={cn('bg-white')}>
                            <strong>Send to Obelisk</strong>
                            <span>(DAO Token)</span>
                          </li>
                        </ol>
                        <ol className={cn('smart-contract-inner-flowchart')}>
                          <li className={cn('bg-negative')}>
                            <div className={cn('a11y')}>Incinerator</div>
                            <strong>60%</strong>
                          </li>
                          <li className={cn('line-dot')}>
                            <strong>Burning DT</strong>
                            <span>(DAO Token)</span>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="RemainingPeriod">
            Remaining period
          </h1>
          <div>
            <div className={cn('common-display-flex wonder-wrap')}>
              <div className={cn('remaining-period-dday')}>
                <div>
                  <strong>01</strong>
                  <span>DAYS</span>
                </div>
                <div>
                  <strong>21</strong>
                  <span>HOURS</span>
                </div>
                <div>
                  <strong>32</strong>
                  <span>MINUTES</span>
                </div>
                <div>
                  <strong>48</strong>
                  <span>SECONDS</span>
                </div>
              </div>
              <div className={cn('remaining-period-date')}>
                <span>
                  <Tag size="xs" color="positive">
                    OPEN
                  </Tag>
                  2022.09.01 11:00 AM
                </span>
                <span>
                  <Tag size="xs" color="negative">
                    CLOSE
                  </Tag>
                  2022.09.07 11:00 AM
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="StationMembers">
            Station Members tap table card view
          </h1>
          <div>
            <div className={cn('common-display-flex wonder-wrap')}>{/* <DaoUserInfoCard userInfo={daoStationTableColumnsData[0]} /> */}</div>
            <div className={cn('common-name')}>Station Members tap table card view, table view 예시</div>
            <div className={cn('common-display-flex wonder-wrap')}>
              <div className={cn('table-view-wrap')}>
                <div className={cn('view-switch-button-wrap')}>
                  <span className={cn('update')}>Updated : 2022-07-01</span>
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
                </div>
                <div className={cn('view-type', `${viewType}-view`)}>
                  {viewType === 'list' ? (
                    <Table
                      className={cn('table-type-lg')}
                      columns={daoStationTableColumns}
                      dataSource={daoStationTableColumnsData}
                      pagination={false}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Modal">
            Modal
          </h1>
          <div>
            <div>
              <div className={cn('common-name')}>DAO 스테이션 참여 프로세스</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="DAO 스테이션 참여 프로세스 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalDaoStation(true);
                  }}
                />
                <DaoStationModal
                  isOpen={isModalDaoStation}
                  setIsOpen={setModalDaoStation}
                  desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                />

                <OutlineButton
                  buttonText="DAO 스테이션 참여 프로세스 완료 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalDaoStationComplete(true);
                  }}
                />
                <DaoStationCompleteModal
                  isOpen={isModalDaoStationComplete}
                  setIsOpen={setModalDaoStationComplete}
                  type={activeDao.value}
                  title={`${useDaoCharacterConvert(activeDao.value)} DAO`}
                  desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                />
              </div>
              <div className={cn('common-name')}>DAO 스테이션 추가 참여 프로세스</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="DAO 스테이션 추가 참여 완료 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setConfirmModal(true);
                  }}
                />

                <ModalLayout
                  isOpen={isConfirmModal}
                  setIsOpen={setConfirmModal}
                  size="sm"
                  title={t('station.participationProcess.addComplete1', { ns: 'dao' })}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('confirm', { ns: 'common' })}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setConfirmModal(false);
                      }}
                    />,
                  ]}
                >
                  {t('station.participationProcess.addComplete2', { ns: 'dao' })}
                </ModalLayout>
              </div>
              <div className={cn('common-name')}>DAO 스테이션 취소 프로세스</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="DAO 스테이션 참여 금액 환불 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalDaoStationCancel(true);
                  }}
                />
                <ModalLayout
                  isOpen={isModalDaoStationCancel}
                  setIsOpen={setModalDaoStationCancel}
                  size="sm"
                  title={t('station.participationProcess.cancelTitle1', { ns: 'dao' })}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('close', { ns: 'common' })}
                      color="black"
                      size="md"
                      onClick={() => {
                        setModalDaoStationCancel(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('station.participationProcess.cancelTitle1', { ns: 'dao' })}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setModalDaoStationCancel(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('station.participationProcess.cancelDesc1', { ns: 'dao' })}</p>
                  <p className={cn('gas-fee-info')}>
                    <span className={cn('info')}>{t('station.participationProcess.cancelDesc2', { ns: 'dao' })}</span>
                  </p>
                </ModalLayout>

                <OutlineButton
                  buttonText="DAO 스테이션 참여 금액 환불 완료"
                  color="black"
                  size="md"
                  onClick={() => {
                    setCancelConfirmModal(true);
                  }}
                />
                <ModalLayout
                  isOpen={isCancelConfirmModal}
                  setIsOpen={setCancelConfirmModal}
                  size="sm"
                  title={t('station.participationProcess.cancelTitle2', { ns: 'dao' })}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('confirm', { ns: 'common' })}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setCancelConfirmModal(false);
                      }}
                    />,
                  ]}
                >
                  {t('station.participationProcess.cancelDesc3', { ns: 'dao' })}
                </ModalLayout>
              </div>
              <div>
                <div className={cn('common-name')}>DAO Stake/Unstake 모달</div>
                <div className={cn('common-display-flex')}>
                  <OutlineButton
                    buttonText="3.7.1. Stake 최초 STEP1"
                    color="black"
                    size="md"
                    onClick={() => {
                      setStakeModal(true);
                    }}
                  />
                  <DaoStakeModal isOpen={isStakeModal} setIsOpen={setStakeModal} desc={t('station.participationProcess.bannerText', { ns: 'dao' })} />
                  <OutlineButton
                    buttonText="3.7.1. Stake 최초 STEP2"
                    color="black"
                    size="md"
                    disabled
                    onClick={() => {
                      setStakeModal2(true);
                    }}
                  />
                  <DaoStakeModal
                    isOpen={isStakeModal2}
                    setIsOpen={setStakeModal2}
                    desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                  />
                  <OutlineButton
                    buttonText="3.7.1. Stake 최초 완료 모달"
                    color="black"
                    size="md"
                    disabled
                    onClick={() => {
                      setStakeResultModal(true);
                    }}
                  />
                  <DaoStakeModal
                    isOpen={isStakeResultModal}
                    setIsOpen={setStakeResultModal}
                    desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                  />
                  <OutlineButton
                    buttonText="3.7.1. ADD Stake STEP1"
                    color="black"
                    size="md"
                    onClick={() => {
                      setStakeModal3(true);
                    }}
                  />
                  <DaoStakeModal
                    isOpen={isStakeModal3}
                    setIsOpen={setStakeModal3}
                    desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                  />
                  <OutlineButton
                    buttonText="3.7.1. ADD Stake STEP2"
                    color="black"
                    size="md"
                    disabled
                    onClick={() => {
                      setStakeModal4(true);
                    }}
                  />
                  <DaoStakeModal
                    isOpen={isStakeResultModal1}
                    setIsOpen={setStakeResultModal1}
                    desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                  />
                  <OutlineButton
                    buttonText="3.7.1. ADD Stake 완료 모달"
                    color="black"
                    size="md"
                    disabled
                    onClick={() => {
                      setStakeResultModal1(true);
                    }}
                  />
                  <DaoStakeModal
                    isOpen={isStakeModal4}
                    setIsOpen={setStakeModal4}
                    desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                  />
                  <OutlineButton
                    buttonText="3.7.1. Unstake STEP1"
                    color="black"
                    size="md"
                    onClick={() => {
                      setStakeModal5(true);
                    }}
                  />
                  <DaoStakeModal
                    isOpen={isStakeModal5}
                    setIsOpen={setStakeModal5}
                    desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                  />
                  <OutlineButton
                    buttonText="3.7.1. Unstake STEP2"
                    color="black"
                    size="md"
                    disabled
                    onClick={() => {
                      setStakeModal6(true);
                    }}
                  />
                  <DaoStakeModal
                    isOpen={isStakeResultModal2}
                    setIsOpen={setStakeResultModal2}
                    desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                  />
                  <OutlineButton
                    buttonText="3.7.1. Unstake 완료 모달"
                    color="black"
                    size="md"
                    disabled
                    onClick={() => {
                      setStakeResultModal2(true);
                    }}
                  />
                  <DaoStakeModal
                    isOpen={isStakeModal6}
                    setIsOpen={setStakeModal6}
                    desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                  />
                  <OutlineButton
                    buttonText="3.7.1. Unstake STEP1 Rock up"
                    color="black"
                    size="md"
                    onClick={() => {
                      setStakeModal7(true);
                    }}
                  />
                  <DaoStakeModal
                    isOpen={isStakeModal7}
                    setIsOpen={setStakeModal7}
                    desc={t('station.participationProcess.bannerText', { ns: 'dao' })}
                  />
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>최초 코인 사용 시 팝업</div>
                <div className={cn('common-display-flex')}>
                  <OutlineButton
                    buttonText="최초 코인 사용 시 팝업 - 미완료"
                    color="black"
                    size="md"
                    onClick={() => {
                      setModalCoin1(true);
                    }}
                  />
                  <ModalLayout
                    isOpen={modalCoin1}
                    setIsOpen={setModalCoin1}
                    size="sm"
                    title={t('coinConfirm.title')}
                    footer={true}
                    destroyOnClose={true}
                    wrapClassName="coin-confirm"
                    footerContent={[
                      <BgButton
                        buttonText={t('coinConfirm.next')}
                        color="highlight"
                        size="md"
                        key="Next"
                        disabled={true}
                        onClick={() => {
                          setModalCoin1(false);
                        }}
                      />,
                    ]}
                  >
                    <div className={cn('coin-confirm-wrap')}>
                      <div className={cn('text-wrap')}>{t('coinConfirm.desc')}</div>
                      <dl className={cn('coin-confirm-list')}>
                        <dt>{t('coinConfirm.confirmList')}</dt>
                        <dd className={cn('coin-list-inner')}>
                          <div className={cn('coin-wrap')}>
                            <IconLogo type="wonder" size={20} fullType />
                            <span className={cn('coin-name')}>WONDER</span>
                          </div>
                          <OutlineButton size="xs" buttonText={t('coinConfirm.approve')} color="highlight" />
                        </dd>
                        <dd className={cn('coin-list-inner')}>
                          <div className={cn('coin-wrap')}>
                            <IconLogo type="usdt" size={20} />
                            <span className={cn('coin-name')}>USDT</span>
                          </div>
                          <OutlineButton size="xs" buttonText={t('coinConfirm.approve')} color="highlight" />
                        </dd>
                      </dl>
                    </div>
                  </ModalLayout>
                  <OutlineButton
                    buttonText="최초 코인 사용 시 팝업 - 완료"
                    color="black"
                    size="md"
                    onClick={() => {
                      setModalCoin2(true);
                    }}
                  />
                  <ModalLayout
                    isOpen={modalCoin2}
                    setIsOpen={setModalCoin2}
                    size="sm"
                    title={t('coinConfirm.title')}
                    footer={true}
                    destroyOnClose={true}
                    wrapClassName="coin-confirm"
                    footerContent={[
                      <BgButton
                        buttonText={t('coinConfirm.next')}
                        color="highlight"
                        size="md"
                        key="Next"
                        onClick={() => {
                          setModalCoin2(false);
                        }}
                      />,
                    ]}
                  >
                    <div className={cn('coin-confirm-wrap')}>
                      <div className={cn('text-wrap')}>{t('coinConfirm.desc')}</div>
                      <dl className={cn('coin-confirm-list')}>
                        <dt>{t('coinConfirm.confirmList')}</dt>
                        <dd className={cn('coin-list-inner')}>
                          <div className={cn('coin-wrap')}>
                            <IconLogo type="wonder" size={20} fullType />
                            <span className={cn('coin-name')}>WONDER</span>
                          </div>
                          <OutlineButton size="xs" buttonText={t('coinConfirm.approved')} color="highlight" disabled={true} />
                        </dd>
                      </dl>
                    </div>
                  </ModalLayout>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>Governance 운영 방식 알아보기</div>
                <div className={cn('common-display-flex')}>
                  <OutlineButton
                    buttonText="Governance 운영 방식 알아보기"
                    color="black"
                    size="md"
                    onClick={() => {
                      setGovernanceHowItWorksModal(true);
                    }}
                  />
                  <DaoGovernanceHowItWorksModal isOpen={governanceHowItWorksModal} setIsOpen={setGovernanceHowItWorksModal} />
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>DAO 투표하기 프로세스</div>
                <div className={cn('common-display-flex')}>
                  <OutlineButton
                    buttonText="3.1.2.1 참여프로세스 STEP1"
                    color="black"
                    size="md"
                    onClick={() => {
                      setStakeModal8(true);
                    }}
                  />
                  {/* 최초 코인 사용 시에 중간 팝업 필요. ModalLayout으로 작업된 dao 공통 팝업 참고 */}
                  {/*<DaoVoteModal*/}
                  {/*  isModal={isStakeModal8}*/}
                  {/*  setIsModal={setStakeModal8}*/}
                  {/*  desc={t('station.participationProcess.bannerText', { ns: 'dao' })}*/}
                  {/*  state="vote"*/}
                  {/*  stepCount={1}*/}
                  {/*/>*/}
                  <OutlineButton
                    buttonText="3.1.2.1 참여프로세스 STEP2"
                    color="black"
                    size="md"
                    onClick={() => {
                      setStakeModal9(true);
                    }}
                  />
                  {/*<DaoVoteModal*/}
                  {/*  isModal={isStakeModal9}*/}
                  {/*  setIsModal={setStakeModal9}*/}
                  {/*  desc={t('station.participationProcess.bannerText', { ns: 'dao' })}*/}
                  {/*  state="vote"*/}
                  {/*  stepCount={2}*/}
                  {/*/>*/}
                  <OutlineButton
                    buttonText="3.1.2.1 추가 투표하기"
                    color="black"
                    size="md"
                    onClick={() => {
                      setStakeModal10(true);
                    }}
                  />
                  {/*<DaoVoteModal*/}
                  {/*  isModal={isStakeModal10}*/}
                  {/*  setIsModal={setStakeModal10}*/}
                  {/*  desc={t('station.participationProcess.bannerText', { ns: 'dao' })}*/}
                  {/*  state="addVote"*/}
                  {/*  stepCount={1}*/}
                  {/*/>*/}
                </div>
              </div>
              <div className={cn('common-name')}>Governance 스몰 팝업</div>
              <div className={cn('common-display-flex')}>
                {/* 안건 등록 확인 */}
                <OutlineButton
                  buttonText="안건 등록 확인 Temprature"
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupRegistCheckTemprature(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupRegistCheckTemprature}
                  setIsOpen={setSmallPopupRegistCheckTemprature}
                  size="sm"
                  title={t('governance.smallPopup.registCheck.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupRegistCheckTemprature(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupRegistCheckTemprature(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.registCheck.temperature')}</p>
                </ModalLayout>

                <OutlineButton
                  buttonText="안건 등록 확인 Consensus"
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupRegistCheckConsensus(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupRegistCheckConsensus}
                  setIsOpen={setSmallPopupRegistCheckConsensus}
                  size="sm"
                  title={t('governance.smallPopup.registCheck.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupRegistCheckConsensus(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupRegistCheckConsensus(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.registCheck.consensus')}</p>
                </ModalLayout>

                <OutlineButton
                  buttonText="안건 등록 확인 Governance"
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupRegistCheckGovernance(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupRegistCheckGovernance}
                  setIsOpen={setSmallPopupRegistCheckGovernance}
                  size="sm"
                  title={t('governance.smallPopup.registCheck.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupRegistCheckGovernance(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupRegistCheckGovernance(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.registCheck.governance')}</p>
                </ModalLayout>

                {/* 안건 등록 팝업_입력내용 중단 안내 팝업 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.registerStop.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupRegistStop(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupRegistStop}
                  setIsOpen={setSmallPopupRegistStop}
                  size="sm"
                  title={t('governance.smallPopup.registerStop.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupRegistStop(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupRegistStop(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.registerStop.desc')}</p>
                </ModalLayout>

                {/* Trust Check - 안건 유형 선택 팝업 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.typeSelect.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupTypeSelect(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupTypeSelect}
                  setIsOpen={setSmallPopupTypeSelect}
                  size="sm"
                  title={t('governance.smallPopup.typeSelect.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.next')}
                      color="black"
                      size="md"
                      key="Ok"
                      onClick={() => {
                        setSmallPopupTypeSelect(false);
                      }}
                      disabled={proposalType === 0 ? true : false}
                    />,
                  ]}
                >
                  <div className={cn('radio-reverse-border')}>
                    <Radio.Group name="radio-group" onChange={onChangeProposalType} value={proposalType}>
                      <Radio value={1}>
                        <strong className={cn('title')}>{t('governance.smallPopup.typeSelect.typeTitle1')}</strong>
                        <p className={cn('desc')}>{t('governance.smallPopup.typeSelect.typeDesc1')}</p>
                      </Radio>
                      <Radio value={2}>
                        <strong className={cn('title')}>{t('governance.smallPopup.typeSelect.typeTitle2')}</strong>
                        <p className={cn('desc')}>{t('governance.smallPopup.typeSelect.typeDesc2')}</p>
                      </Radio>
                    </Radio.Group>
                  </div>
                </ModalLayout>

                {/* 안건 등록 불가 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.unableToRegister.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupUnableToRegist(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupUnableToRegist}
                  setIsOpen={setSmallPopupUnableToRegist}
                  size="sm"
                  title={t('governance.smallPopup.unableToRegister.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.check')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupUnableToRegist(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.unableToRegister.desc')}</p>
                </ModalLayout>

                {/* 안건 작성 불가 알림 팝업 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.cantWrite.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupCantWrite(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupCantWrite}
                  setIsOpen={setSmallPopupCantWrite}
                  size="sm"
                  title={t('governance.smallPopup.cantWrite.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.check')}
                      color="black"
                      size="md"
                      key="Ok"
                      onClick={() => {
                        setSmallPopupCantWrite(false);
                      }}
                    />,
                  ]}
                >
                  <p>
                    <Trans
                      i18nKey="governance.smallPopup.cantWrite.desc"
                      ns="dao"
                      values={{ ticker: 'WONDER', n: '0.1', n2: '40', shortTicker: 'WDR' }}
                      components={[<span className={cn('color-gray60')}></span>]}
                    />
                  </p>
                </ModalLayout>

                {/* 댓글 삭제 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.commentDel.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupCommentDel(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupNoticeDel}
                  setIsOpen={setSmallPopupCommentDel}
                  size="sm"
                  title={t('governance.smallPopup.commentDel.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupCommentDel(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        message.info({ content: '삭제 완료되었습니다.' });
                        setSmallPopupCommentDel(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.commentDel.desc')}</p>
                </ModalLayout>

                {/* 댓글 작성불가 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.commentCantWrite.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupCommentCantWrite(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupCommentCantWrite}
                  setIsOpen={setSmallPopupCommentCantWrite}
                  size="sm"
                  title={t('governance.smallPopup.commentCantWrite.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.check')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupCommentCantWrite(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.commentCantWrite.desc', { type: 'WONDER' })}</p>
                </ModalLayout>

                {/* 댓글 수정 취소 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.commentEditCancel.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupommentEditCancel(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupommentEditCancel}
                  setIsOpen={setSmallPopupommentEditCancel}
                  size="sm"
                  title={t('governance.smallPopup.commentEditCancel.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupommentEditCancel(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupCommentDel(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.commentEditCancel.desc')}</p>
                </ModalLayout>

                {/* 안건 삭제 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.delProposal.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupDelProposal(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupDelProposal}
                  setIsOpen={setSmallPopupDelProposal}
                  size="sm"
                  title={t('governance.smallPopup.delProposal.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupDelProposal(false);
                      }}
                      key={t('governance.smallPopup.btn.no')}
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key={t('governance.smallPopup.btn.yes')}
                      onClick={() => {
                        setSmallPopupDelProposal(false);
                        message.info({ content: t('governance.smallPopup.delProposal.msg'), key: 'delete' });
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.delProposal.desc')}</p>
                </ModalLayout>

                {/* 참여 수량 확인 안내 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.checkQuantity.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupCheckQuantity(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupCheckQuantity}
                  setIsOpen={setSmallPopupCheckQuantity}
                  size="sm"
                  title={t('governance.smallPopup.checkQuantity.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.check')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupCheckQuantity(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.checkQuantity.desc', { ticker: 'WONDER' })}</p>
                </ModalLayout>

                {/* 안건 실행 불가 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.cantFeasible.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupCantFeasible(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupCantFeasible}
                  setIsOpen={setSmallPopupCantFeasible}
                  size="sm"
                  title={t('governance.smallPopup.cantFeasible.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.check')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupCantFeasible(false);
                      }}
                    />,
                  ]}
                >
                  <p>
                    <Trans
                      i18nKey="governance.smallPopup.cantFeasible.desc"
                      ns="dao"
                      values={{ ticker: 'WONDER', n: '0.1', n2: '40', shortTicker: 'WDR' }}
                      components={[<span className={cn('color-gray60')}></span>]}
                    />
                  </p>
                </ModalLayout>

                {/* 투표 취소 확인 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.cancelVote.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupCancelVote(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupCancelVote}
                  setIsOpen={setSmallPopupCancelVote}
                  size="sm"
                  title={t('governance.smallPopup.cancelVote.title')}
                  footer={true}
                  destroyOnClose={true}
                  wrapClassName="dao-governance-proposal-vote-cancel-modal"
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupCancelVote(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        // 기존 ProposalDetailDiscussion 에 있는 팝업을 옮겨오며 일부 주석처리
                        // setVoted(null);
                        setSmallPopupCancelVote(false);
                        message.info({
                          content: t('vote.GovernanceVote.voteCancelToast', { type: 100 }),
                          key: 'toast',
                        });
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.cancelVote.desc')}</p>
                </ModalLayout>

                {/* 투표 불가 알림 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.cantVoting.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupCantVoting(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupCantVoting}
                  setIsOpen={setSmallPopupCantVoting}
                  size="sm"
                  title={t('governance.smallPopup.cantVoting.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.check')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupCantVoting(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.cantVoting.desc', { ticker: 'WONDER' })}</p>
                </ModalLayout>

                {/* 수정 내용 초기화 알림 */}
                <OutlineButton
                  buttonText={t('governance.smallPopup.editReset.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupEditReset(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupEditReset}
                  setIsOpen={setSmallPopupEditReset}
                  size="sm"
                  title={t('governance.smallPopup.editReset.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupEditReset(false);
                      }}
                      key={t('governance.smallPopup.btn.no')}
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key={t('governance.smallPopup.btn.yes')}
                      onClick={() => {
                        setSmallPopupEditReset(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.editReset.desc')}</p>
                </ModalLayout>

                {/* 투표 제한 알림 */}
                {/* <OutlineButton
                  buttonText={t('governance.smallPopup.limitVoting.title')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupLimitVoting(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupLimitVoting}
                  setIsOpen={setSmallPopupLimitVoting}
                  size="sm"
                  title={t('governance.smallPopup.limitVoting.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText={t('confirm', { ns: 'common' })}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setSmallPopupLimitVoting(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.limitVoting.desc')}</p>
                </ModalLayout> */}
              </div>
              <div className={cn('common-name')}>WEMIX 전송 팝업</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="WEMIX 전송 팝업"
                  color="black"
                  size="lg"
                  onClick={() => {
                    setStakeModal11(true);
                  }}
                />
                <ContractSendModal contractSend={isStakeModal11} setContractSend={setStakeModal11} data={contractData} />
              </div>
              <div className={cn('common-name')}>작성 내용 초기화 알림</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="작성 내용 초기화 알림 팝업"
                  color="black"
                  size="lg"
                  onClick={() => {
                    setIsWriteContentReset(true);
                  }}
                />
                <ModalLayout
                  isOpen={isWriteContentReset}
                  setIsOpen={setIsWriteContentReset}
                  size="sm"
                  title="작성 내용 초기화 알림"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText="취소"
                      color="black"
                      size="md"
                      onClick={() => {
                        setIsWriteContentReset(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText="확인"
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setIsWriteContentReset(false);
                      }}
                    />,
                  ]}
                >
                  <p>
                    초기화하시겠습니까?
                    <br />
                    작성된 내용은 저장되지 않습니다.
                  </p>
                </ModalLayout>
              </div>
              <div className={cn('common-name')}>DAO 만들기 서명 절차 진행</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="DAO 만들기 서명 절차 진행 팝업"
                  color="black"
                  size="lg"
                  onClick={() => {
                    setIsMakeDaoProcess(true);
                  }}
                />
                <ModalLayout
                  isOpen={isMakeDaoProcess}
                  setIsOpen={setIsMakeDaoProcess}
                  size="sm"
                  title="DAO 만들기 서명 절차 진행"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText="취소"
                      color="black"
                      size="md"
                      onClick={() => {
                        setIsMakeDaoProcess(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText="확인"
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setIsMakeDaoProcess(false);
                      }}
                    />,
                  ]}
                >
                  <p>
                    DAO 만들기 실행을 위한 서명 절차를 진행하시겠습니까?
                    <br />
                    서명 대상자에게 설정 내역을 전달하고 서명을 받는 절차가 진행됩니다.
                  </p>
                </ModalLayout>
              </div>
              <div className={cn('common-name')}>서명 진행 팝업</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="서명 진행 팝업"
                  color="black"
                  size="lg"
                  onClick={() => {
                    setIsSignProgress(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSignProgress}
                  setIsOpen={setIsSignProgress}
                  size="sm"
                  title="서명 진행"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText="취소"
                      color="black"
                      size="md"
                      onClick={() => {
                        setIsSignProgress(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText="확인"
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setIsSignProgress(false);
                      }}
                    />,
                  ]}
                >
                  <p>서명을 진행하시겠습니까? 서명 진행 시 가스비 결제가 필요하며, 서명 완료 후에는 취소가 불가합니다.</p>
                </ModalLayout>
              </div>
              <div className={cn('common-name')}>DAO Maker 삭제</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="DAO Maker 삭제 팝업"
                  color="black"
                  size="lg"
                  onClick={() => {
                    setIsDeleteMaker(true);
                  }}
                />
                <ModalLayout
                  isOpen={isDeleteMaker}
                  setIsOpen={setIsDeleteMaker}
                  size="sm"
                  title="DAO Maker 삭제"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText="취소"
                      color="black"
                      size="md"
                      onClick={() => {
                        setIsDeleteMaker(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText="확인"
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        message.info({ content: '삭제 완료되었습니다.', key: 'toast' });
                        setIsDeleteMaker(false);
                      }}
                    />,
                  ]}
                >
                  <p>DAO Maker를 삭제하시겠습니까?</p>
                </ModalLayout>
              </div>
              <div className={cn('common-name')}>투표자 팝업</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="투표자 팝업"
                  color="black"
                  size="lg"
                  onClick={() => {
                    setIsVotePopup(true);
                  }}
                />

                <DaoGovernanceVotersModal isOpen={isVotePopup} setIsOpen={setIsVotePopup} data={TableData} />
              </div>
              <div className={cn('common-name')}>Trust 스몰 팝업</div>
              <div className={cn('common-display-flex')}>
                {/* 공지 삭제 */}
                <OutlineButton
                  buttonText={'공지 삭제'}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupNoticeDel(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupNoticeDel}
                  setIsOpen={setSmallPopupNoticeDel}
                  size="sm"
                  title={t('governance.smallPopup.noticeDel.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupNoticeDel(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        message.info({ content: t('governance.smallPopup.toast.delete') });
                        setSmallPopupNoticeDel(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.noticeDel.desc')}</p>
                </ModalLayout>

                {/* 공지 등록 확인 */}
                <OutlineButton
                  buttonText={'공지 등록 확인'}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupNoticeAdd(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupNoticeAdd}
                  setIsOpen={setSmallPopupNoticeAdd}
                  size="sm"
                  title={t('governance.smallPopup.noticeAdd.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupNoticeAdd(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.check')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        message.info({ content: t('governance.smallPopup.toast.register2') });
                        setSmallPopupNoticeAdd(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.noticeAdd.desc')}</p>
                </ModalLayout>

                {/* 입력 내용 초기화 알림 */}
                <OutlineButton
                  buttonText={'입력 내용 초기화 알림'}
                  color="black"
                  size="md"
                  onClick={() => {
                    setSmallPopupInputClear(true);
                  }}
                />
                <ModalLayout
                  isOpen={isSmallPopupInputClear}
                  setIsOpen={setSmallPopupInputClear}
                  size="sm"
                  title={t('governance.smallPopup.inputClear.title')}
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText={t('governance.smallPopup.btn.no')}
                      color="black"
                      size="md"
                      onClick={() => {
                        setSmallPopupInputClear(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText={t('governance.smallPopup.btn.yes')}
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        message.info({ content: t('governance.smallPopup.toast.register') });
                        setSmallPopupInputClear(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('governance.smallPopup.inputClear.desc')}</p>
                </ModalLayout>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="BoxLayout">
            Box Layout
          </h1>

          <div>
            <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
              <div style={{ background: '#F3F3FC', padding: '20px' }}>
                <div className={cn('common-name')}>DaoBoxLayout half type</div>
                <DaoBoxLayout type="half">
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                </DaoBoxLayout>
              </div>
              <div style={{ background: '#F3F3FC', padding: '20px' }}>
                <div className={cn('common-name')}>DaoBoxLayout ratio type</div>
                <DaoBoxLayout type="ratio">
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                </DaoBoxLayout>
              </div>
              <div style={{ background: '#F3F3FC', padding: '20px' }}>
                <div className={cn('common-name')}>DaoBoxLayout full type</div>
                <DaoBoxLayout>
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                </DaoBoxLayout>
              </div>
              <div style={{ background: '#F3F3FC', padding: '20px' }}>
                <div className={cn('common-name')}>DaoBox full type</div>
                <DaoBoxLayout>
                  <DaoBox type="full">
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                </DaoBoxLayout>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="editTextArea">
            Edit - TextArea
          </h1>
          <div className={cn('common-flex-column')}>
            <EditorBox
              title={{
                text: '제목',
                placeholder: '제목 입력',
              }}
              content={{ text: '컨텐츠', placeholder: '컨텐츠 입력' }}
            ></EditorBox>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="CreateBoxLayout">
            Create Box Layout
          </h1>
          <div style={{ background: '#F3F3FC' }}>
            <DaoCreateLayout className="ratio">
              <DaoCreateTitle title={'Proposal 작성하기'}>
                <BgButton buttonText={'제출하기'} color="highlight" size="md" />
              </DaoCreateTitle>
              <DaoCreateBox>
                <DaoCreateBoxInner>
                  <h2>title</h2>
                </DaoCreateBoxInner>
              </DaoCreateBox>
              <DaoCreateBox>
                <DaoCreateBoxInner>
                  <h2>title</h2>
                </DaoCreateBoxInner>
                <DaoCreateBoxInner>
                  <h2>title</h2>
                </DaoCreateBoxInner>
              </DaoCreateBox>
            </DaoCreateLayout>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="proposalGTInfo">
            ProposalGTInfo
          </h1>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Discuss">
            Discuss
          </h1>

          <div>
            <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
              <DaoBoxLayout>
                <DaoBox>
                  <DaoIndividualHomeDiscuss key={'discuss'} data={discussData} />
                </DaoBox>
              </DaoBoxLayout>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Twitter">
            Twitter
          </h1>

          <div>
            <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
              <DaoIndividualHomeTwitter data={twitterData} />
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="governanceProposalCard">
            Governance &gt; Proposal &gt; card{' '}
          </h1>
          <div>
            <div className={cn('common-flex-column wonder-wrap')}>
              <ul className={cn('governance-card-list')}>
                {proposalData.map((data, index) => {
                  return (
                    <li key={'proposal' + index}>
                      {/* 23.03.28 수정: is not defined 에러로 인해 임시 주석 */}
                      {/* <GovernanceProposalCard data={data} /> */}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="governanceProposalCard">
            Governance &gt; Proposal Action (Components)
          </h1>
          <div>
            <div className={cn('common-flex-column wonder-wrap')}>
              <div className={cn('common-name')}>슬라이더</div>
              <ProposalSlider />
              <ProposalDualSlider category={['Treasury 준비금', 'Incinerator 자금']} initValue={[40, 60]} />
            </div>
            <div className={cn('common-flex-column wonder-wrap')}>
              <div className={cn('common-name')}>사용 예정 금액</div>
              <AmountInputBox unit="WEMIX" />
            </div>
            <div className={cn('common-flex-column wonder-wrap')}>
              <div className={cn('common-name')}>Input with Unit suffix</div>
              <InputUnit unit="WEMIX" />
            </div>
            <div className={cn('common-flex-column wonder-wrap')}>
              <div className={cn('common-name')}>Input with Unit suffix</div>
              <ButtonInput unit="days" />
            </div>
            <div className={cn('common-flex-column wonder-wrap')}>
              <div className={cn('common-name')}>Change Input Row</div>
              <ChangeInputRow category="Consensus check" initValue={3} unit="WEMIX" />
            </div>
            <div className={cn('common-flex-column wonder-wrap')}>
              <div className={cn('common-name')}>Change Form</div>
              <ProposalChangeForm
                subject="투표 기간"
                category="Consensus check"
                initValue={3}
                category2="Governance proposal"
                initValue2={7}
                unit="WEMIX"
              />
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="governanceProposalCard">
            Governance &gt; Proposal Action (Cases)
          </h1>
          <div>
            <div className={cn('common-flex-column wonder-wrap')} style={{ paddingBottom: '500px' }}>
              {/* <div className={cn('common-name')}>Proposal</div> */}
              <ProposalAction />
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="daoHomeProtocol">
            Dao Showcase Protocol
          </h1>
          <div>
            <DaoHomeProtocol />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="daoWondersMember">
            Wonder Dao 40wonders member
          </h1>
          <div>
            <DaoWondersMember />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Semi Circle Pie Chart">
            Semi Circle Pie Chart
          </h1>
          <div>
            <SemiCirclePieChart
              data={[
                { value: 80, category: 'For' },
                { value: 20, category: 'Against' },
              ]}
            />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Semi Circle Pie Chart">
            Dao Scan Table Cell
          </h1>
          <div>
            <div>
              <ul className={cn('common-notice')}>
                <li>type(string) : to 일 경우 copy icon buttonLink,</li>
                <li>buttonText(string) : 프로토콜명 / 유저 프로필 / 사업체 주소 / 월렛 명칭</li>
                <li>buttonTextShort(string) : 주소만 있을 경우, 단축 텍스트일 (0x34fd...df67)</li>
                <li>contract(boolean) : from / to 중 프로토콜 데이터가 있을 경우, to 데이터일때만 해당 props 추가(아이콘 표기)</li>
                <li>detailInfo(string) : 툴팁으로 제공하는 텍스트 프로토콜인 경우 - 상세주소, 유저 정보 - 월렛 주소</li>
                <li>profileImgUrl(string) : 프로필 이미지 있는 경우</li>
                <li>type(string) : 'from' | 'to' | 'hash' 정의 (default: 'from')</li>
              </ul>
            </div>
            <ScanFromToCell type="hash" buttonText={'0x34fd...df67'} buttonLink={'/'} />
            <ScanFromToCell type={'to'} buttonText={'Trust'} detailInfo={'0x34fdbe8dd52dc2652920695bab822bb42891df67'} buttonLink={'/'} />
            <ScanFromToCell buttonTextShort={'0x34fd...df67'} detailInfo={'0x34fdbe8dd52dc2652920695bab822bb42891df67'} buttonLink={'/'} />
            <ScanFromToCell buttonText={'Trust'} detailInfo={'0x34fdbe8dd52dc2652920695bab822bb42891df67'} buttonLink={'/'} contract />
            <ScanFromToCell type={'to'} buttonText={'Trust'} detailInfo={'0x34fdbe8dd52dc2652920695bab822bb42891df67'} buttonLink={'/'} contract />
            <ScanFromToCell
              profileImgUrl={'https://picsum.photos/32/32/?image=1'}
              buttonText={'NILERNILERNILERNILERNILERNILER'}
              detailInfo={'0x34fdbe8dd52dc2652920695bab822bb42891df67'}
              buttonLink={'/'}
              contract
            />
            <ScanFromToCell
              profileImgUrl={''}
              buttonText={'NILERNILERNILERNILERNILERNILER'}
              detailInfo={'0x34fdbe8dd52dc2652920695bab822bb42891df67'}
              buttonLink={'/'}
              contract
            />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="governanceSetCard">
            Governance Setting card
          </h1>
          <div>
            <div>
              <ul className={cn('common-notice')}>
                <li>
                  [GovernanceSetting]
                  <br />
                  - type(string): 현재 세팅 정의. 이 정의에 따라 노출되는 check의 수가 달라집니다.
                  <br />
                  - Temperature : Temperature만 노출 <br />
                  - Consensus: Temperature와 Consensus 노출 <br />
                  - Governance: Trust 제외 전부 노출 <br />
                  - Trust: Trust만 노출
                  <br />
                </li>
                <li>
                  [GovernanceSettingCheck]
                  <br />
                  - type(string): 현재 세팅 타입 정의.
                  <br />
                  - change: 이전 대비 변경내역이 있는 경우 change props를 받습니다.
                  <br />
                  - change.type(boolean): true: 변경 있음, false: 변경 없음.
                  <br />
                  - change.compare(string): 비교 대상이 되는 세팅 타입 정의.
                  <br />- more: 더보기 유무
                </li>
              </ul>
            </div>
            <GovernanceSetting type="Temperature" />
            <GovernanceSetting type="Consensus" />
            <GovernanceSetting type="Governance" />
            <GovernanceSetting type="Trust" />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="governanceDetailHeader">
            [ NEW ] governanceCard 타입 정의
          </h1>
          <div>
            <div>화면 참고</div>
            <div>{Object.keys(daoGovernanceCardInfo).length > 0 && <GovernanceCard {...daoGovernanceCardInfo} />}</div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="agendaHistoryItem">
            [ NEW ] AgendaHistoryItem 타입 정의
          </h1>
          <div>
            <div>
              <OutlineButton
                buttonText="Temperature Check"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceAgendaHistory({
                    ...daoGovernanceAgendaHistory,
                    step: 'temperature',
                    comment: 150,
                    view: 120,
                    agendaType: t('governance.agenda.item.1', { ns: 'dao' }),
                    title:
                      'Should the community participate in the Protocol Guild Pilot? It is a long Should the community participate in the Protocol Guild Pilot? It is a longShould the community participate in the Protocol Guild Pilot? It is a long',
                    votingPeriod: {
                      start: '2022-07-01',
                      end: '2022-07-07',
                    },
                    info: (
                      <Trans
                        i18nKey={'governance.agendaHistoryItem.text.2'}
                        ns="dao"
                        values={{
                          percentage: 60,
                          step: 'Consensus Check',
                        }}
                      >
                        <span className={cn('bold')}></span>
                        <span className={cn('bold')}></span>
                      </Trans>
                    ),
                    date: '2023-01-01',
                  });
                }}
              />
              <OutlineButton
                buttonText="Temperature Check"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceAgendaHistory({
                    ...daoGovernanceAgendaHistory,
                    step: 'consensus',
                    comment: 150,
                    view: 120,
                    agendaType: t('governance.agenda.item.1', { ns: 'dao' }),
                    title:
                      'Should the community participate in the Protocol Guild Pilot? It is a long Should the community participate in the Protocol Guild Pilot? It is a longShould the community participate in the Protocol Guild Pilot? It is a long',
                    votingPeriod: {
                      start: '2022-07-01',
                      end: '2022-07-07',
                    },
                    info: (
                      <Trans
                        i18nKey={'governance.agendaHistoryItem.text.1'}
                        ns="dao"
                        values={{
                          percentage: 60,
                          step: 'Consensus Check',
                        }}
                      >
                        <span className={cn('bold')}></span>
                        <span className={cn('bold')}></span>
                      </Trans>
                    ),
                    date: '2023-01-01',
                  });
                }}
              />
              {/* AgendaHistoryItem */}
              <div className={cn('governance-agenda-history-wrap')}>
                <ul className={cn('governance-agenda-history-list')}>
                  <AgendaHistoryItem {...daoGovernanceAgendaHistory} />
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="governanceDetailHeader">
            [ NEW ] governance Detail Header 타입 정의
          </h1>
          <div>
            <div>
              <ul className={cn('common-notice')}>
                <li>
                  type :
                  <br />- 거버넌스 단계 구분: 'temperature' | 'consensus' | 'governance' | 'trust'
                </li>
                <li>
                  user :
                  <br />- 안건 주체 : 'writer' | 'trust-check' | null
                </li>
                <li>
                  stage :
                  <br />- 안건 진행 : 'active' | 'approved' | 'rejected' | 'executed'
                </li>
                <li>
                  vote :
                  <br /> - 투표 여부 : true / false
                </li>
                <li>
                  content:
                  <br />- 안건 내용 : title, agenda
                </li>
              </ul>
            </div>
            <div>
              <OutlineButton
                buttonText="Temperature Check - 활성 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'temperature',
                    stage: 'active',
                  });
                }}
              />
              <OutlineButton
                buttonText="Temperature Check - 활성 / 투표 O"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'temperature',
                    stage: 'active',
                    vote: true,
                  });
                }}
              />
              <OutlineButton
                buttonText="Temperature Check - 활성 / 작성자 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'temperature',
                    user: 'writer',
                    stage: 'active',
                  });
                }}
              />
              <OutlineButton
                buttonText="Temperature Check - 활성 / 작성자 / 투표 O"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'temperature',
                    user: 'writer',
                    stage: 'active',
                    vote: true,
                  });
                }}
              />
              <br />
              <OutlineButton
                buttonText="Temperature Check - 승인 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'temperature',
                    stage: 'approved',
                  });
                }}
              />
              <OutlineButton
                buttonText="Temperature Check - 가결 / 작성자 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'temperature',
                    user: 'writer',
                    stage: 'approved',
                  });
                }}
              />
              <OutlineButton
                buttonText="Temperature Check - 부결 / 작성자 / 투표 O"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'temperature',
                    user: 'writer',
                    stage: 'rejected',
                    vote: true,
                  });
                }}
              />
            </div>
            <div>
              <OutlineButton
                buttonText="Consensus Check - 활성 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'consensus',
                    stage: 'active',
                  });
                }}
              />
              <OutlineButton
                buttonText="Consensus Check - 활성 / 투표 O"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'consensus',
                    stage: 'active',
                    vote: true,
                  });
                }}
              />
              <OutlineButton
                buttonText="Consensus Check - 활성 / 작성자 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'consensus',
                    user: 'writer',
                    stage: 'active',
                  });
                }}
              />
              <OutlineButton
                buttonText="Consensus Check - 활성 / 작성자 / 투표 O"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'consensus',
                    user: 'writer',
                    stage: 'active',
                    vote: true,
                  });
                }}
              />
              <br />
              <OutlineButton
                buttonText="Consensus Check - 활성 / 투표 O"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'governance',
                    stage: 'active',
                    vote: true,
                  });
                }}
              />
              <OutlineButton
                buttonText="Consensus Check - 활성 / 작성자 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'governance',
                    user: 'writer',
                    stage: 'active',
                  });
                }}
              />
              <OutlineButton
                buttonText="Consensus Check - 활성 / 작성자 / 투표 O"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'governance',
                    user: 'writer',
                    stage: 'active',
                    vote: true,
                  });
                }}
              />
            </div>
            <div>
              <OutlineButton
                buttonText="Governance Check - 활성 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'governance',
                    stage: 'active',
                  });
                }}
              />
              <OutlineButton
                buttonText="Governance Check - 가결 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'governance',
                    stage: 'approved',
                  });
                }}
              />
              <OutlineButton
                buttonText="Governance Check - 부결 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'governance',
                    stage: 'rejected',
                  });
                }}
              />
              <OutlineButton
                buttonText="Governance Check - Executed / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'governance',
                    stage: 'executed',
                  });
                }}
              />
              <OutlineButton
                buttonText="Governance Check - Executed / 작성자 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'governance',
                    user: 'writer',
                    stage: 'executed',
                  });
                }}
              />
              <OutlineButton
                buttonText="Governance Check - Executed / 작성자 / 투표 O"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'governance',
                    user: 'writer',
                    stage: 'executed',
                    vote: true,
                  });
                }}
              />
            </div>
            <div>
              <OutlineButton
                buttonText="Trust Check - 활성 / 투표 X"
                color="black"
                size="md"
                onClick={() => {
                  setDaoGovernanceDetailHeader({
                    ...daoGovernanceDetailHeader,
                    type: 'trust',
                    stage: 'active',
                  });
                }}
              />
            </div>
            <GovernanceDetailHeader {...daoGovernanceDetailHeader} />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="governanceVote">
            Governance Vote
          </h1>
          {/* 23.03.29 수정: 팝업 확인할 때 깨져보여서 column 추가했어요..! */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8f7fa' }}>
            <GovernanceVote type="temperature" />
            <GovernanceVote type="consensus" />
            <GovernanceVote type="governance" />
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['dao', 'daoHome', 'common', 'nile'])),
    },
  };
};

export default Common;
