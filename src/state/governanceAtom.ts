import { atom } from 'jotai';
import { NileApiService } from '@/services/nile/api';
import {
  DistributionParam,
  GovernanceParam,
  Proposal, ReOpenParam,
  RevenueParam,
  SwapParam,
  TreasuryParam, TrustCheckParam
} from '@/types/dao/proposal.types';
import {wonderDaoAtom} from "@/state/daoAtom";

export const wonderProposalAtom = atom<Proposal | undefined>(undefined);
export const wonderProposalsAtom = atom<Proposal[] | undefined>(undefined);

export const treasuryParamsAtom = atom<TreasuryParam | undefined>(undefined);
export const revenueParamsAtom = atom<RevenueParam | undefined>(undefined);
export const distributionParamsAtom = atom<DistributionParam | undefined>(undefined);
export const governanceParamsAtom = atom<GovernanceParam | undefined>(undefined);
export const swapParamsAtom = atom<SwapParam | undefined>(undefined);
export const reopenParamsAtom = atom<ReOpenParam | undefined>(undefined);
export const textParamAtom = atom<string | undefined>(undefined);
export const trustCheckParamAtom = atom<TrustCheckParam | undefined>(undefined);

export const refreshWonderProposalsAtom = atom(null, (get, set, update) => {
  const api = NileApiService();
  const daoId = get(wonderDaoAtom)?.daoId;

  if (!daoId) return;

  return api.dao.governance.proposal
    .getList(daoId)
    .then(({ data }) => {
      set(wonderProposalsAtom, data.data);
    })
    .catch(() => {
      set(wonderProposalsAtom, []);
    });
});
