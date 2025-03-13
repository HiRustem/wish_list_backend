import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [WishController],
  providers: [WishService, DatabaseService],
})
export class WishModule {}
