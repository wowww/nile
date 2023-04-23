import User from '@/models/nile/user';

type Collection = {
  id: number | string;
  address?: string;
  name: string;
  creator: User;
};

export default Collection;
