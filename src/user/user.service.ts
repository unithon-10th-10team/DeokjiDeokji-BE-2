import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/config/database/prisma.service';
import { CreateStorageDto } from './dtos/create-storage.dto';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(user: User) {
    return await this.prisma.user.findFirst({
      where: {
        id: user.id.toString(),
      },
    });
  }
  async createBooking(user: User, createBookingDto: CreateBookingDto) {
    return await this.prisma.bookingStorage.create({
      data: {
        userId: user.id,
        restaurantId: createBookingDto.restaurantId,
      },
    });
  }
  async getBookingStorage(user: User) {
    return await this.prisma.bookingStorage.findMany({
      where: {
        userId: user.id,
      },
    });
  }
  async createStorage(user: User, createStorageDto: CreateStorageDto) {
    return await this.prisma.storage.create({
      data: {
        userId: user.id,
        restaurantId: createStorageDto.restaurantId,
        Temperature: createStorageDto.temp,
      },
    });
  }
  async getStorage(user: User) {
    return await this.prisma.storage.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
