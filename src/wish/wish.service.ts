import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  FindAllInWishlistResult,
  Wish,
  WishResultObject,
} from 'src/types/wish.types';
import { WishCreateDto } from 'src/dto/wish.dto';

@Injectable()
export class WishService {
  constructor(private prisma: DatabaseService) {}

  async findAllInWishlist(
    wishlistId: string,
  ): Promise<FindAllInWishlistResult> {
    return this.prisma.wish.findMany({
      where: { wishlistId },
      select: {
        id: true,
        wishlistId: true,
        type: true,
        title: true,
        description: true,
        imageUrl: true,
        link: true,
      },
    });
  }

  async create(wishData: WishCreateDto): Promise<WishResultObject> {
    const createdWish: Wish = await this.prisma.wish.create({ data: wishData });

    delete createdWish.wishlist;
    delete createdWish.createdAt;

    return Promise.resolve(createdWish);
  }

  async delete(wishId: string): Promise<WishResultObject> {
    const createdWish: Wish = await this.prisma.wish.delete({
      where: { id: wishId },
    });

    delete createdWish.wishlist;
    delete createdWish.createdAt;

    return Promise.resolve(createdWish);
  }
}
