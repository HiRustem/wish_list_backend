import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: DatabaseService) {}

  async findAllByUser(userId: string) {
    return this.prisma.wishlist.findMany({
      where: { userId },
      include: { wishes: true },
    });
  }

  async create(userId: string, title: string) {
    return this.prisma.wishlist.create({
      data: { userId, title },
    });
  }

  async delete(id: string) {
    return this.prisma.wishlist.delete({ where: { id } });
  }
}
