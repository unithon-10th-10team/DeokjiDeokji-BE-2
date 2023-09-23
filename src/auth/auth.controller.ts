import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoLoginDto } from './dtos/kakao-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: KakaoLoginDto) {
    return this.authService.login(data);
  }
}
