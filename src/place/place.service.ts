import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { User } from '@prisma/client';

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async createPlace(user: User, createPlaceDto: CreatePlaceDto) {
    return await this.prisma.$transaction(async (tx) => {
      const newRestaurant = await tx.restaurant.create({
        data: {
          latitude: createPlaceDto.latitude,
          longitude: createPlaceDto.longitude,
          type: createPlaceDto.type,
          name: createPlaceDto.name,
          location: createPlaceDto.location ?? null,
        },
      });
      if (createPlaceDto.purpose === 0) {
        //덕지순례 갈예정
        await tx.bookingStorage.create({
          data: {
            userId: user.id,
            restaurantId: newRestaurant.id,
          },
        });
      } else {
        await tx.storage.create({
          data: {
            userId: user.id,
            restaurantId: newRestaurant.id,
          },
        });
      }
    });
  }
}
