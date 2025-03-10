import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { WishService } from './wish.service';

@Controller('wish')
export class WishController {
  constructor(private wishService: WishService) {}

  @Get(':wishlistId')
  async findAllInWishlist(@Param('wishlistId') wishlistId: string) {
    return this.wishService.findAllInWishlist(wishlistId);
  }

  @Post()
  async create(
    @Body()
    data: {
      wishlistId: string;
      title: string;
      description?: string;
      imageUrl?: string;
      link?: string;
      type: 'GENERAL' | 'PRODUCT';
    },
  ) {
    return this.wishService.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.wishService.delete(id);
  }
}
