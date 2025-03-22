import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { DatabaseService } from '../database/database.service';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { WishService } from 'src/wish/wish.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DatabaseService, WishlistService, WishService],
  exports: [UsersService],
})
export class UserModule {}
