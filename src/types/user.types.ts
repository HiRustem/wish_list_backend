import { Friendship } from './friendship.types';
import { Wishlist } from './wishlist.types';

export type User = {
  id: string;
  email: string;
  password: string;
  nickname?: string | null;
  avatar?: string | null;
  createdAt: Date;
  followers?: Friendship[];
  following?: Friendship[];
  wishlists?: Wishlist[];
};
