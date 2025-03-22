import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  FindAllByUserResult,
  Wishlist,
  WishlistResultObject,
} from 'src/types/wishlist.types';

@Injectable()
export class WishlistService {
  constructor(private prisma: DatabaseService) {}

  async findAllByUser(userId: string): Promise<FindAllByUserResult> {
    return this.prisma.wishlist.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        wishes: true,
      },
    });
  }

  async create(userId: string, title: string): Promise<WishlistResultObject> {
    const createdWishlist: Wishlist = await this.prisma.wishlist.create({
      data: { userId, title },
    });

    delete createdWishlist.createdAt;
    delete createdWishlist.user;
    delete createdWishlist.userId;

    return Promise.resolve(createdWishlist);
  }

  async delete(id: string): Promise<WishlistResultObject> {
    const deletedWishlist = await this.prisma.wishlist.delete({
      where: { id },
    });

    delete deletedWishlist.createdAt;
    delete deletedWishlist.user;
    delete deletedWishlist.userId;

    return Promise.resolve(deletedWishlist);
  }
}
