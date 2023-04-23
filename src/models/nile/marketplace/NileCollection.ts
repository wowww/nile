import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import NileUserAccount from '@/models/nile/user/NileUserAccount';

export type NileCollectionResult = {
  errorCode: number;
  status: number;
  message: string;
  result: {
    collection: NileCollection;
    profile: NileUserAccount;
  };
}

type NileCollection = {
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
  tokens?: NileNftToken[];
  profile?: NileUserAccount;
};

export type NileCollectionCategory = {
  id: string;
  slug: string;
  name: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  collections: NileCollection[];
}

export type NileCollectionFee = {
  id?: string;
  type: NileCollectionFeeType;
  rate: number;
  address: string;
  collectionId: string;
  createdAt?: string;
  updatedAt?: string;
};

export enum NileCollectionFeeType {
  FIRST,
  SECOND,
};

export default NileCollection;
