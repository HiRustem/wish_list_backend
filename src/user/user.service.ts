import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { UserRegisterDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
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
}
