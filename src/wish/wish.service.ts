import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class WishService {
  constructor(private prisma: DatabaseService) {}

  async findAllInWishlist(wishlistId: string) {
    return this.prisma.wish.findMany({
      where: { wishlistId },
    });
  }

  async create(data: {
    wishlistId: string;
    title: string;
    description?: string;
    imageUrl?: string;
    link?: string;
    type: 'GENERAL' | 'PRODUCT';
  }) {
    return this.prisma.wish.create({ data });
  }

  async delete(id: string) {
    return this.prisma.wish.delete({ where: { id } });
  }
}
