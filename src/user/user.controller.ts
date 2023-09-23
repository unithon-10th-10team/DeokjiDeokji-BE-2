import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateStorageDto } from './dtos/create-storage.dto';
import { CreateBookingDto } from './dtos/create-booking.dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getMe')
  async getMe(@CurrentUser() user: User) {
    return await this.userService.getMe(user);
  }

  @Get('storage')
  async getStorage(@CurrentUser() user: User) {
    return await this.userService.getStorage(user);
  }

  @Post('storage')
  async postStorage(
    @CurrentUser() user: User,
    @Body() createStorageDto: CreateStorageDto,
  ) {
    return await this.userService.createStorage(user, createStorageDto);
  }

  @Get('booking-storage')
  async getBookingStorage(@CurrentUser() user: User) {
    return await this.userService.getBookingStorage(user);
  }

  @Post('booking-storage')
  async createBookingStorage(
    @CurrentUser() user: User,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return await this.userService.createBooking(user, createBookingDto);
  }
}
