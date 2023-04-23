import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import { Address } from '@/models/nile/contract/NileContract';
import { NileEntity } from '@/state/accountAtom';
// import { NileEntity } from '@/types/common.types';

export type TokenBidding = {
  tokenOrderId: string;
  orderIndex: number;
  address?: Address;
  status: string;
  received: boolean;
  receivedAt?: string;
  nickname?: string;
  price: string;
  timestamp: string;
} & NileEntity;

export type TokenOrder = {

}

export type NileToken = {

}

export type NileCollection = {
  id?: string;
  slug: string;
  name: string;
  status: string;
  baseUri: string;
  createdAt?: string;
  updatedAt?: string;
  registeredAt?: string;
  ownerName?: string;
  imageUrl?: string;
  bannerImageUrl?: string;
  featuredImageUrl?: string;
  logoImageUrl?: string;
  creator?: NileUserAccount;
  address?: string;
  ownerAddress?: string;
  ercType?: number;
  type?: number;
  genesisAddress?: string;
  txHash?: string;
  platformFee?: number;
  featuredFee?: number;
  genesisHolderFee?: number;
  items?: NileNftToken[];
  tokens?: NileNftToken[];
};

export type TraitValue = {
  id: string;
  type: string;
  value: string;
}

export type TraitType = {
  id: string;
  name: string;
  values: TraitValue[];
}