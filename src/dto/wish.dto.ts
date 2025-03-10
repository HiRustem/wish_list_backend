import { WishType } from 'src/types/wish.types';

export class WishCreateDto {
  wishlistId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  type: WishType;
}
