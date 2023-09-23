import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { User } from '@prisma/client';

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async createPlace(user: User, createPlaceDto: CreatePlaceDto) {
    console.log(user);
    return await this.prisma.$transaction(async (tx) => {
      const newRestaurant = await tx.restaurant.create({
        data: {
          latitude: createPlaceDto.place.latitude,
          longitude: createPlaceDto.place.longitude,
          type: createPlaceDto.place.type,
          name: createPlaceDto.place.name,
          location: createPlaceDto.place.location ?? null,
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

  async getPlace() {
    return await this.prisma.restaurant.findMany();
  }

  async getVisitedIdols(placeId: number) {
    const idols = await this.prisma.restaurant_artist_mapping.findMany({
      where: {
        artistId: placeId,
      },
    });
    const idolInfo = [];
    idols.map(async (idol) => {
      const info = await this.prisma.artist.findFirst({
        where: {
          id: idol.artistId,
        },
      });
      idolInfo.push(info);
    });

    return idolInfo;
  }
}
