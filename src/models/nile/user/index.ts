type User = {
  id: number;
  name: string;
  wallet: string;
};

export type UserPriceInformation = {
  totalCount: number;
  totalWemixPrice: string;
  totalUsdPrice: string;
};

export default User;
