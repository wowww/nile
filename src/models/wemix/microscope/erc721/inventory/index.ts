export type NftInventoryItem = {
  holderAddress: string;
  tokenId: string;
  tokenUri: string;
};

export type NftInventoryResponse = {
  next?: string;
  previous?: string;
  tokenName?: string;
  tokenSymbol?: string;
  results: NftInventoryItem[];
};
