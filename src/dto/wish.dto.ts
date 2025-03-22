import { WishType } from 'src/types/wish.types';

export type WishCreateDto = {
  wishlistId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  type: WishType;
};
