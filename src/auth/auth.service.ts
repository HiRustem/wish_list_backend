import {
  ConflictException,
  Get,
  Injectable,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getCurrentUser(@Req() req) {
    const userId = req.user.id;
    const user = await this.usersService.findById(userId);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('validate-token')
  async validateToken(@Req() req) {
    return { userId: req.user.id, email: req.user.email };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(email: string, password: string, nickname: string) {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя
    const user = await this.usersService.createUser({
      email,
      password: hashedPassword,
      nickname,
    });

    // Генерируем токен
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Возвращаем пользователя и токен
    return {
      user,
      token,
    };
  }
}
