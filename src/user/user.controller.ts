import { Controller, Post, Body, Get, Param, Put, Patch } from '@nestjs/common';
import { UsersService } from './user.service';
import {
  UserFollowDto,
  UserRegisterDto,
  UserUpdateAvatarData,
  UserUpdateNicknameData,
} from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async register(
    @Body()
    userRegisterDto: UserRegisterDto,
  ) {
    return this.userService.createUser(userRegisterDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  async updateNickname(
    @Param('id') id: string,
    @Body() { nickname }: UserUpdateNicknameData,
  ) {
    return this.userService.updateNickname(id, nickname);
  }

  @Patch(':id/avatar')
  async updateAvatar(
    @Param('id') userId: string,
    @Body() { avatarUrl }: UserUpdateAvatarData,
  ) {
    return this.userService.updateAvatar(userId, avatarUrl);
  }

  @Post('follow')
  async follow(
    @Body()
    { followerId, followingId }: UserFollowDto,
  ) {
    return this.userService.followUser(followerId, followingId);
  }

  @Post('unfollow')
  async unfollow(
    @Body()
    { followerId, followingId }: UserFollowDto,
  ) {
    return this.userService.unfollowUser(followerId, followingId);
  }
}
