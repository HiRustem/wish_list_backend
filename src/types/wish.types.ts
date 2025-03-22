import { Wishlist } from './wishlist.types';

export type Wish = {
  id: string;
  wishlistId: string;
  type: WishType;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  link?: string | null;
  createdAt: Date;
  wishlist?: Wishlist;
};

export type WishType = 'GENERAL' | 'PRODUCT';

export type WishResultObject = Omit<Wish, 'wishlist' | 'createdAt'>;

export type FindAllInWishlistResult = WishResultObject[];
