import User from '@/models/nile/user';
import Collection from '@/models/nile/market/collection';

type Nft = {
  id: number;
  name: string;
  thumbnail: string;
  favorite: boolean;
  price: string;
  collection: Collection;
  owner: User;
};

export default Nft;
