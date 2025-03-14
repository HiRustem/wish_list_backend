import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserRegisterDto } from 'src/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    const { email, password, nickname } = userRegisterDto;
    const { user, token } = await this.authService.register(
      email,
      password,
      nickname,
    );
    return { user, token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getCurrentUser(@Req() req) {
    const userId = req.user.id;
    return this.authService.getCurrentUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('validate-token')
  async validateToken(@Req() req) {
    return this.authService.validateToken(req.user);
  }
}
