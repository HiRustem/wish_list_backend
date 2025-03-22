import { User } from './user.types';
import { Wish } from './wish.types';

export type Wishlist = {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  user?: User;
  wishes?: Wish[];
};

export type WishlistResultObject = {
  id: string;
  title: string;
  wishes?: Wish[];
};

export type FindAllByUserResult = WishlistResultObject[];
