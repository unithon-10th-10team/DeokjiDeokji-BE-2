import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getMe')
  async getMe(@CurrentUser() user: User) {
    return await this.userService.getMe(user);
  }
}
