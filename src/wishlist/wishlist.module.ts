import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [WishlistController],
  providers: [WishlistService, DatabaseService],
})
export class WishlistModule {}
