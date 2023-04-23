import { GovernanceCaseType, QuorumType } from '../QuorumInfo';
import { Proposal } from '@/types/dao/proposal.types';

interface GovernanceCardType {
  index?: number;
  type: GovernanceCaseType;
  title: string;
  description: string;
  author: {
    thumbnail: string | null;
    address: string;
  };
  date: {
    start: string;
    end: string;
  };
  views: number;
  commentCount: number;
  trustCheck?: boolean;
  proposal?: Proposal;
}

export type Data = GovernanceCardType & QuorumType;

export const temperatureStatus = [
  // 1-1. 참여 진행 중_참여 전 : 참여가 아직 시작되지 않은 경우 + 정족수 조건 미달성시
  {
    // 작성자
    me: true,
    // 투표 완료
    ended: false,
    // 내가 참여한 경우
    voted: false,
    // proceed 전
    proceedDone: false,
    approved: false,
  },
  // 1-2. 참여 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 미달성
  {
    me: false,
    ended: false,
    voted: false,
    proceedDone: false,
    approved: false,
  },
  // 1-3. 참여 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 달성
  {
    me: true,
    ended: false,
    voted: false,
    proceedDone: false,
    approved: false,
  },
  // 1-4. 참여 진행 중_참여 전 : 비공감이 우세한 경우 + 정족수 조건 달성시
  {
    me: true,
    ended: false,
    voted: false,
    proceedDone: false,
    approved: false,
  },
  // 2-1. 참여 진행 중_ 참여 후
  {
    me: true,
    ended: false,
    voted: true,
    proceedDone: false,
    approved: false,
  },
  // 3-1. 참여 진행 중_ 완료 (Proceed 전_ 가결) : 내가 올린 글이 가결되어 Proceed 버튼 제공
  {
    me: true,
    ended: true,
    voted: true,
    proceedDone: false,
    approved: true,
  },
  // 3-2. 참여 진행 중_ 완료 (Proceed 전_ 가결) : 내가 올린 글이 아닌 경우 : Proceed 버튼 미제공하고 Proceed 상태표시
  {
    me: false,
    ended: true,
    voted: true,
    proceedDone: false,
    approved: false,
  },
  // 4-1. 투표 진행 중_ 완료 (Proceed 전_부결) - 내가 올린 글이 비공감 우세로 부결
  {
    me: false,
    ended: true,
    voted: true,
    proceedDone: true,
    approved: false,
  },
  // 4-2. 투표 진행 중_ 완료 (Proceed 전_부결) - 내가 올린 글이 정족수 미달로 부결 (혹은 비공감 우세 및 정족수 미달도 동일하게 표현)
  {
    me: false,
    ended: true,
    voted: true,
    proceedDone: true,
    approved: false,
  },
  // 5-1. 참여 진행 중_ 완료 (Proceed 전_ 가결) : 내가 올린 글이 가결되어 Proceed 버튼 제공
  {
    me: false,
    ended: true,
    voted: true,
    proceedDone: true,
    approved: true,
  },
];
export const consensusStatus = [
  // 1-1. 투표 진행 중_참여 전 : 투표가 아직 시작되지 않은 경우 + 정족수 조건 미달성시
  {
    // 작성자
    me: true,
    // 참여, 투표 진행 여부
    ended: false,
    // 내가 참여한 경우
    voted: false,
    // counting
    counting: false,
    // 승인
    approved: false,
    // 활성화
    active: true,
  },
  // 1-2. 투표 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 미달성시
  {
    me: true,
    ended: false,
    voted: true,
    counting: false,
    approved: false,
    active: true,
  },
  // 1-3. 투표 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 달성시
  {
    me: true,
    ended: false,
    voted: true,
    // counting
    counting: false,
    approved: false,
    active: true,
  },
  // 1-4. 투표 진행 중_참여 전 : 반대가 우세한 경우 + 정족수 조건 달성시
  {
    me: true,
    ended: false,
    voted: true,
    counting: false,
    approved: false,
    active: true,
  },
  // 2-1. 투표 진행 중_ 참여 후 : 내가 투표한 경우
  {
    me: true,
    ended: true,
    voted: true,
    counting: false,
    approved: false,
    active: true,
  },
  // 3-1. 투표 진행 중_ 완료 (Counting 후 - 가결) : 내가 올린 글이 가결되어 Proceed 버튼 제공
  {
    me: true,
    ended: true,
    voted: true,
    counting: true,
    approved: false,
    active: true,
  },
  // 3-2. 투표 진행 중_ 완료 (Counting 후 - 가결) : 내가 올린 글이 아닌 경우 : Proceed 버튼 미제공 및 Proceed 상태표시
  {
    me: false,
    ended: true,
    voted: true,
    counting: true,
    approved: false,
    active: true,
  },
  // 3-3. 투표 진행 중_ 완료 (Counting 후 - 가결) : 전체 g.WDR 보유량의 과반수 이상 찬성시 즉시 가결
  {
    me: false,
    ended: true,
    voted: true,
    counting: true,
    immediate: true,
    approved: false,
    active: true,
  },
  // 4-1. 투표 진행 중_ 완료 (Counting 후 - 부결) : 반대 우세 or 부결 찬성 조건 (50% 초과) 미달 부결 상태 표시
  {
    me: false,
    ended: true,
    voted: true,
    counting: true,
    approved: false,
    active: false,
  },
  // 4-2. 투표 진행 중_ 완료 (Counting 후 - 부결) : 정족수 미달로 부결
  {
    me: false,
    ended: true,
    voted: true,
    counting: true,
    approved: false,
    active: false,
  },
  // 4-3. 투표 진행 중_ 완료 (Counting 후 - 부결) : 전체 g.WDR 보유량의 과반수 이상 반대시 즉시 부결
  {
    me: false,
    ended: true,
    voted: true,
    counting: true,
    immediate: true,
    approved: false,
    active: false,
  },
  // 5-1. 투표 진행 중_ 완료 (Proceed 완료)
  {
    me: false,
    ended: true,
    voted: true,
    counting: true,
    approved: true,
    active: false,
  },
];
export const governanceStatus = [
  // 1-1. 투표 진행 중_참여 전 : 투표가 아직 시작되지 않은 경우 + 정족수 조건 미달성시
  {
    // 작성자
    me: true,
    // 참여 시작 여부
    ended: false,
    // 내가 참여한 경우
    voted: false,
    // execution
    execution: false,
  },
  // 1-2. 투표 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 미달성시
  {
    me: true,
    ended: false,
    voted: false,
    execution: false,
  },
  // 1-3. 투표 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 달성시
  {
    me: true,
    ended: false,
    voted: false,
    execution: false,
  },
  // 1-4. 투표 진행 중_참여 전 : 반대가 우세한 경우 + 정족수 조건 달성시
  {
    me: true,
    ended: false,
    voted: false,
    execution: false,
  },
  // 2-1.투표 진행 중_ 참여 후
  {
    me: true,
    ended: false,
    voted: true,
    execution: false,
  },
  // 3-1. 투표 진행 중_ 완료 (Execution전)
  {
    me: true,
    ended: true,
    voted: true,
    execution: false,
  },
  // 4-1. 투표 진행 중_ 완료 (Execution 완료) : On-chain 반영 완료 상태 표시 찬성 우세시 가결 상태 표시
  {
    me: true,
    ended: true,
    voted: true,
    execution: true,
  },
  // 4-2. 투표 진행 중_ 완료 (Execution 완료) : 전체 g.WDR 보유량의 과반수 이상 찬성시 즉시 가결
  {
    me: true,
    ended: true,
    voted: true,
    execution: true,
    immediate: true,
  },
  // 4-3. 투표 진행 중_ 완료 (Execution 완료) : 기타 안건 (Text 안건)이 가결되었을 경우 해당 문구 제공
  {
    me: true,
    ended: true,
    voted: true,
    execution: true,
    etc: true,
  },
  // 5-1. 투표 진행 중_ (Execution 완료 - 부결시) : 반대 우세 or 부결 찬성 조건 (50% 초과) 미달 부결 상태 표시
  {
    me: true,
    ended: true,
    voted: false,
    execution: true,
  },
  // 5-2. 투표 진행 중_ (Execution 완료 - 부결시) : 정족수 미달시 부결 상태 표시
  {
    me: true,
    ended: true,
    voted: false,
    execution: true,
  },
  // 5-3. 투표 진행 중_ (Execution 완료 - 부결시) : 전체 g.WDR 보유량의 과반수 이상 반대시 즉시 부결
  {
    me: true,
    ended: true,
    voted: false,
    execution: true,
    immediate: true,
  },
];
export const temperatureData: Data[] = [
  // 1-1. 참여 진행 중_참여 전 : 참여가 아직 시작되지 않은 경우 + 정족수 조건 미달성시
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 0,
    commentCount: 0,
    currentQuorum: 0,
    targetQuorum: 0,
    agreeRate: 0,
    againstRate: 0,
    agreeGwdr: 0,
    againstGwdr: 0,
    agreeUser: 0,
    againstUser: 0,
  },
  // 1-2. 참여 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 미달성
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 0,
    commentCount: 0,
    currentQuorum: 1000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 0,
    againstGwdr: 0,
    agreeUser: 600,
    againstUser: 400,
  },
  // 1-3. 참여 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 달성
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 1-4. 참여 진행 중_참여 전 : 비공감이 우세한 경우 + 정족수 조건 달성시
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 100,
    targetQuorum: 100000,
    agreeRate: 40,
    againstRate: 60,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 2-1. 참여 진행 중_ 참여 후
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 3-1. 참여 진행 중_ 완료 (Proceed 전_ 가결) : 내가 올린 글이 가결되어 Proceed 버튼 제공
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 200,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 3-2. 참여 진행 중_ 완료 (Proceed 전_ 가결) : 내가 올린 글이 가결되어 Proceed 버튼 제공
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 200,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 4-1. 투표 진행 중_ 완료 (Proceed 전_부결) - 내가 올린 글이 비공감 우세로 부결
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 49,
    againstRate: 51,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 4-2. 투표 진행 중_ 완료 (Proceed 전_부결) - 내가 올린 글이 정족수 미달로 부결 (혹은 비공감 우세 및 정족수 미달도 동일하게 표현)
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 1,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 5-1. 투표 진행 중_ 완료 (Proceed 완료)
  {
    type: 'temperature',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
];
export const consensusData: Data[] = [
  // 1-1. 투표 진행 중_참여 전
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 0,
    commentCount: 0,
    currentQuorum: 0,
    targetQuorum: 0,
    agreeRate: 0,
    againstRate: 0,
    agreeGwdr: 0,
    againstGwdr: 0,
    agreeUser: 0,
    againstUser: 0,
  },
  // 1-2. 투표 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 미달성시
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 1,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 1-3. 투표 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 달성시
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 1-4. 투표 진행 중_참여 전 : 반대가 우세한 경우 + 정족수 조건 달성시
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 5000,
    targetQuorum: 100000,
    agreeRate: 49,
    againstRate: 51,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 5. 투표 완료 (내가 작성한 안건) 찬성이 우세하여 가결시 + Aggregation 전
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 3-1. 투표 진행 중_ 완료 (Counting 후 - 가결) : 내가 올린 글이 가결되어 Proceed 버튼 제공
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 3-2. 투표 진행 중_ 완료 (Counting 후 - 가결) : 내가 올린 글이 아닌 경우 : Proceed 버튼 미제공 및 Proceed 상태표시
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 3-3. 투표 진행 중_ 완료 (Counting 후 - 가결) : 전체 g.WDR 보유량의 과반수 이상 찬성시 즉시 가결
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 4-1. 투표 진행 중_ 완료 (Counting 후 - 부결) : 반대 우세 or 부결 찬성 조건 (50% 초과) 미달 부결 상태 표시
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 50000,
    targetQuorum: 100000,
    agreeRate: 49,
    againstRate: 51,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 4-2. 투표 진행 중_ 완료 (Counting 후 - 부결) : 정족수 미달로 부결
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 10,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 4-3. 투표 진행 중_ 완료 (Counting 후 - 부결) : 전체 g.WDR 보유량의 과반수 이상 반대시 즉시 부결
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 100000,
    targetQuorum: 100000,
    agreeRate: 49,
    againstRate: 51,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 5-1. 투표 진행 중_ 완료 (Proceed 완료)
  {
    type: 'consensus',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 10000,
    targetQuorum: 100000,
    agreeRate: 51,
    againstRate: 49,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
];
export const governanceData: Data[] = [
  // 1-1. 투표 진행 중_참여 전 : 투표가 아직 시작되지 않은 경우 + 정족수 조건 미달성시
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 0,
    commentCount: 0,
    currentQuorum: 0,
    targetQuorum: 0,
    agreeRate: 0,
    againstRate: 0,
    agreeGwdr: 0,
    againstGwdr: 0,
    agreeUser: 0,
    againstUser: 0,
  },
  // 1-2. 투표 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 미달성시
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 100,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 1-3. 투표 진행 중_참여 전 : 찬성이 우세한 경우 + 정족수 조건 달성시
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 1-4. 투표 진행 중_참여 전 : 반대가 우세한 경우 + 정족수 조건 달성시
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 40,
    againstRate: 60,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 2-1.투표 진행 중_ 참여 후
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 40,
    againstRate: 60,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 3-1. 투표 진행 중_ 완료 (Execution전)
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 180000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 4-1. 투표 진행 중_ 완료 (Execution 완료) : On-chain 반영 완료 상태 표시 찬성 우세시 가결 상태 표시
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 100000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 4-2. 투표 진행 중_ 완료 (Execution 완료) : 전체 g.WDR 보유량의 과반수 이상 찬성시 즉시 가결
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 100000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 4-3. 투표 진행 중_ 완료 (Execution 완료) : 기타 안건 (Text 안건)이 가결되었을 경우 해당 문구 제공
  {
    type: 'governance',
    title: '기타 안건',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 100000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 5-1. 투표 진행 중_ (Execution 완료 - 부결시) : 반대 우세 or 부결 찬성 조건 (50% 초과) 미달 부결 상태 표시
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 100000,
    targetQuorum: 100000,
    agreeRate: 40,
    againstRate: 60,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 5-2. 투표 진행 중_ (Execution 완료 - 부결시) : 정족수 미달시 부결 상태 표시
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 1000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
  // 5-3. 투표 진행 중_ (Execution 완료 - 부결시) : 전체 g.WDR 보유량의 과반수 이상 반대시 즉시 부결
  {
    type: 'governance',
    title: 'Station 추가 모집 (다오 토큰 추가 발행)',
    description:
      'Should the community participate in the Protocol Guild Pilot? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    author: { thumbnail: null, address: '0x207E...c3a5' },
    date: {
      start: '2023-07-07',
      end: '2023-07-10',
    },
    views: 100,
    commentCount: 130,
    currentQuorum: 100000,
    targetQuorum: 100000,
    agreeRate: 40,
    againstRate: 60,
    agreeGwdr: 58349489,
    againstGwdr: 58349489,
    agreeUser: 100,
    againstUser: 100,
  },
];
