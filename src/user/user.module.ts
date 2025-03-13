import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DatabaseService],
  exports: [UsersService],
})
export class UserModule {}
