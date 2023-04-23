type NileUserAccount = {
  address: string;
  id?: string; // UUID
  createdAt?: string;
  updatedAt?: string;
  nickname?: string;
  description?: string;
  country?: string;
  img?: string;
  nonce?: number;
  themeIndex?: number;
  displayAsset?: NileUserDisplayAsset;
  url?: string;
  snsLinks?: string[];
};

export enum NileUserDisplayAsset {
  PUBLIC = 'PUBLIC', // 모두에게 공개
  PRIVATE = 'PRIVATE', // 나에게만 공개
}

export default NileUserAccount;
