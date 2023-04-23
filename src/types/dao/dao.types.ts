import { UserInfoStatus } from "@/types/contract.types";

export const StationStatus = {
  BEFORE_RECRUITMENT: 'BEFORE_RECRUITMENT',
  RECRUITING: 'RECRUITING',
  DONE: 'DONE',
  RECRUITMENT_FAILED: 'RECRUITING_FAILED',
  RECRUITMENT_SUCCESS: 'RECRUITING_SUCCESS',
} as const;

export type StationStatus = (typeof StationStatus)[keyof typeof StationStatus];

export interface DaoParticipantType {
  id?: string;
  nickname?: string;
  address?: string;
  amount?: number;
  description?: string;
  profileImg?: string;
}

export const DaoStatus = {
  READY: 'READY',
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
  FAIL: 'FAIL',
  CONFIRM: 'CONFIRM',
  DISSOLVE: 'DISSOLVE',
} as const;

export type DaoStatus = (typeof DaoStatus)[keyof typeof DaoStatus];

export interface NileDao {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  daoId?: number;
  name?: string;
  maker?: string;
  melter?: string;
  description?: string;
  startAt?: string;
  endAt?: string;
  current?: number;
  goal?: number;
  dtName?: string;
  dtAddress?: string;
  gtName?: string;
  gtAddress?: string;
  dtTicker?: string;
  gtTicker?: string;
  participants?: DaoParticipantType[];
  token?: string;
  minEnterAmount?: string;
  purposeAmount?: string;
  businessAmount?: string;
  unit?: string;
  promulgationPeriod?: string;
  consensusQuorum?: string;
  proposalQuorum?: string;
  dtLockupTime?: string;
  baseRatio?: string;
  totalDtSupply?: string;
  totalParticipants?: number;
  initialFund?: number;
  daoCreatedAt?: string;
  daoConfirmedAt?: string;
  revenueRatio?: string;
  burnRatio?: string;
  performRatio?: string;
  incomeRatio?: string;
  receiver?: string;
  businessHashed?: string;
  businessDescription?: string;
  status?: DaoStatus;
}

export interface StationInfo {
  daoId?: number;
  reOpenId?: number;
  startAt?: string;
  endAt?: string;
  purposeAmount?: string;
  minEnterAmount?: string;
  unit?: number;
  addMintAmount?: string;
}

export interface StationLog {
  id: string;
  daoId: number;
  createdAt?: string;
  updatedAt?: string;
  address: string;
  nickname?: string;
  profileImage?: string;
  amount?: string;
  greeting?: string;
  timestamp?: string;
  reOpenId: number;
  status: UserInfoStatus;
}

export interface DaoMember {
  id: string;
  address?: string;
  nickname?: string;
  profileImg?: string;
  participateProposalCount?: number;
  createProposalCount?: number;
  createDiscussionCount?: number;
  dtAmount?: number;
  gtAmount?: number;
  stakedAmount?: number;
  stakedPayment?: string;
}

export interface DaoActivity {
  id?: string;
  daoId: string;
  tokenAddress?: string;
  tokenSymbol?: string;
  symbol?: string;
  txHash?: string;
  timestamp?: string;
  from?: string;
  to?: string;
  value?: string;
  txFee?: string;
  rate?: string;
}

export interface Enter {
  daoId: number;
  txHash: string;
  greeting: string;
  walletAddress: string;
  timestamp: string;
  amount: string;
}

export interface StationRank {
  avg?: string;
  max?: string;
  min?: string;
  rank?: number;
  total?: number;
}

export interface StationUserHistory {
  stationInfo?: {
    daoId?: number;
    reOpenId?: number;
    purposeAmount?: string;
    status?: DaoStatus;
    startAt?: string;
    endAt?: string;
    unit?: string;
    memberInfo?: {
      amount?: string;
      refundedAmount?: string;
      receivedAmount?: string;
      status?: UserInfoStatus;
    }
  }[],
  memberTotalParticipationWemix?: string;
  memberTotalRefund?: string;
  memberTotalReceived?: string;
  stationTotalPurposeAmount?: string;
}

export interface StationHistory {
  stationRecordInfos?: {
    daoId?: number;
    reOpenId?: number;
    purposeAmount?: string;
    status?: DaoStatus;
    startAt?: string;
    endAt?: string;
    unit?: string;
    exportAmount?: string;
    amount?: string;
    memberCount?: string;
    exchangeRatio?: string;
    participationRatio?: string;
  }[],
  totalAmount?: string;
  totalMemberCount?: string;
}

export interface PageInfo {
  page?: number;
  size?: number;
}

export interface PageMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export type DaoMenu = 'Home' | 'Station' | 'Treasury' | 'Obelisk' | 'Governance' | 'Trust' | 'Incinerator' | string;