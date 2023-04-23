export const AgendaType = {
  TREASURY: 'TREASURY',
  LIQUIDATION: 'LIQUIDATION',
  DISTRIBUTION: 'DISTRIBUTION',
  REVENUE: 'REVENUE',
  GOVERNANCE: 'GOVERNANCE',
  REOPEN: 'REOPEN',
  SWAP: 'SWAP',
  RELOCATE: 'RELOCATE',
  TEXT: 'TEXT',
  TRUST_CHECK: 'TRUST_CHECK',
  ETC: 'ETC',
} as const;

export type AgendaType = (typeof AgendaType)[keyof typeof AgendaType];

export const ProposalStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
} as const;

export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus];

export const ProposalCheck = {
  TEMPERATURE: 0,
  CONSENSUS: 1,
  GOVERNANCE: 2,
  TRUST: 3,
} as const;

export type ProposalCheck = (typeof ProposalCheck)[keyof typeof ProposalCheck];

export const VoteType = {
  NONE: 0,
  AGREEMENT: 1,
  OPPOSITE: 2,
} as const;

export type VoteType = (typeof VoteType)[keyof typeof VoteType];

export interface BasePolicyType {
  baseRatio?: string;
  emergencyPolicy?: {
    emergencyDeadline?: string;
    emergencyPermitCutOff?: string;
  };
  promulgationPeriod?: string;
}

export interface SubPolicyType {
  deadLine?: string;
  permitCutOff?: string;
  quorum?: string;
}

export interface TreasuryParam {
  receiver?: {
    address?: string;
    name?: string;
  };
  fundAddr?: {
    address?: string;
    symbol?: string;
  };
  amount?: string;
}

export interface RevenueParam {
  id?: number;
  treasury?: string;
  incinerator?: string;
}

export interface DistributionParam {
  id?: number;
  burnRatio?: string;
  obelisk?: string;
}

export interface GovernanceParam {
  spellType?: {
    value?: number;
    label?: string;
  };
  baseRatio?: {
    label?: string;
    value?: string;
  };
  subPolicy?: {
    consensus?: {
      permitCutOff?: string;
      quorum?: string;
      deadline?: {
        value?: string;
        label?: string;
      };
    };
    governance?: {
      permitCutOff?: string;
      quorum?: string;
      deadline?: {
        value?: string;
        label?: string;
      };
    };
  };
}

export interface ReOpenParam {
  period?: number; // 기간
  purposeAmount?: string; // 모집 목표 금액
  addMintAmount?: string; // Dao Token 추가 발행
  minEnterAmount?: string; // 최소 참여 수량
  unit?: string; // 증액단위
}

export interface SwapParam {
  payment?: {
    address?: string;
    symbol?: string;
  };
  amount?: string;
  receipt?: {
    address?: string;
    symbol?: string;
  };
}

export interface TrustCheckParam {
  deadline?: string;
  permitCutOff?: string;
}

export interface Proposal {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  daoId?: number;
  proposalId?: number;
  spellType?: number;
  blockNumber: string;
  title?: string;
  content?: string;
  voteStartAt?: string;
  voteEndAt?: string;
  check?: ProposalCheck;
  userAddress?: string;
  userNickname?: string;
  userProfileImg?: string;
  viewCount?: number;
  parentId?: string;
  tx?: string;
  proposalOptions: ProposalOptions[];
  business?: string;
  status?: ProposalStatus;
}

export interface ProposalOptions {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  value?: string;
}