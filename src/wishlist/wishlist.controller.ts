import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistCreateDto } from 'src/dto/wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get(':userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.wishlistService.findAllByUser(userId);
  }

  @Post()
  async create(@Body() { userId, title }: WishlistCreateDto) {
    return this.wishlistService.create(userId, title);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.wishlistService.delete(id);
  }
}
