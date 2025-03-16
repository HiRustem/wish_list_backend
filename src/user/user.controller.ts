import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import {
  UserFollowDto,
  UserUpdateAvatarData,
  UserUpdateNicknameData,
} from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get(':nickname')
  async findByNickname(@Param('nickname') nickname: string) {
    return this.userService.findByNickname(nickname);
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

  @Get(':userId/followers')
  async getFollowers(@Param('userId') userId: string) {
    try {
      const followers = await this.userService.getFollowers(userId);
      return followers;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':userId/following')
  async getFollowing(@Param('userId') userId: string) {
    try {
      const following = await this.userService.getFollowing(userId);
      return following;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':followerId/is-following/:followingId')
  async isFollowing(
    @Param('followerId') followerId: string,
    @Param('followingId') followingId: string,
  ) {
    try {
      const isFollowing = await this.userService.isFollowing(
        followerId,
        followingId,
      );
      return { isFollowing };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
