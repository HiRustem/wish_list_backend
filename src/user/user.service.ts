import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { UserGetFollowsCountResult, UserRegisterDto } from '../dto/user.dto';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { WishService } from 'src/wish/wish.service';
import { User } from 'src/types/user.types';

@Injectable()
export class UsersService {
  constructor(
    private prisma: DatabaseService,
    private wishlistService: WishlistService,
    private wishService: WishService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    const wishlists = [];

    const userWishlists = await this.wishlistService.findAllByUser(user.id);

    for (const wishlist of userWishlists) {
      const wishes = await this.wishService.findAllInWishlist(wishlist.id);

      wishlists.push({
        ...wishlist,
        wishes,
      });
    }

    return {
      ...user,
      wishlists,
    };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByNickname(nickname: string) {
    if (!nickname) {
      return [];
    }

    return this.prisma.user.findMany({
      where: {
        nickname: {
          contains: nickname,
          mode: 'insensitive',
        },
      },
    });
  }

  async getFollowsCount(id: string): Promise<UserGetFollowsCountResult> {
    const followers = await this.prisma.friendship.findMany({
      where: { followingId: id },
      include: { follower: true },
    });

    const following = await this.prisma.friendship.findMany({
      where: { followerId: id },
      include: { following: true },
    });

    return {
      followersCount: followers.length,
      followingCount: following.length,
    };
  }

  async createUser({ email, password, nickname }: UserRegisterDto) {
    return this.prisma.user.create({
      data: { email, password, nickname },
    });
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });
  }

  async updateNickname(userId: string, nickname: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { nickname },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async followUser(followerId: string, followingId: string) {
    return this.prisma.friendship.create({
      data: { followerId, followingId },
    });
  }

  async unfollowUser(followerId: string, followingId: string) {
    return this.prisma.friendship.deleteMany({
      where: { followerId, followingId },
    });
  }

  async getFollowers(userId: string) {
    const followers = await this.prisma.friendship.findMany({
      where: { followingId: userId },
      include: { follower: true },
    });

    return followers.map((friendship) => friendship.follower);
  }

  async getFollowing(userId: string) {
    const following = await this.prisma.friendship.findMany({
      where: { followerId: userId },
      include: { following: true },
    });

    return following.map((friendship) => friendship.following);
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const friendship = await this.prisma.friendship.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return !!friendship;
  }
}
