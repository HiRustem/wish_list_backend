import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from './database/database.module';
import { WishModule } from './wish/wish.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    WishModule,
    WishlistModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
})
export class AppModule {}
