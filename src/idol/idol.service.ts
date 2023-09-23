import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class IdolService {
  constructor(private readonly prisma: PrismaService) {}

  async getVisitedPlace(idolId: number) {
    const places = await this.prisma.restaurant_artist_mapping.findMany({
      where: {
        artistId: idolId,
      },
    });
    const placeInfo = [];
    places.map(async (place) => {
      const info = await this.prisma.restaurant.findFirst({
        where: {
          id: place.restaurantId,
        },
      });
      placeInfo.push(info);
    });

    return placeInfo;
  }
}
