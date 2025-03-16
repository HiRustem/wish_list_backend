import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  nickname?: string;
}

export class UserUpdateNicknameData {
  nickname: string;
}

export class UserUpdateAvatarData {
  avatarUrl: string;
}

export class UserFollowDto {
  followerId: string;
  followingId: string;
}

export class UserGetFollowsCountResult {
  followersCount: number;
  followingCount: number;
}
