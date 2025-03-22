import { User } from './user.types';

export type Friendship = {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
  follower?: User;
  following?: User;
};
