import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class IdolService {
  constructor(private readonly prisma: PrismaService) {}

  async getVisitedPlace(idolName: string) {
    const idol = await this.prisma.artist.findFirst({
      where: {
        name: idolName,
      },
    });
    const places = await this.prisma.restaurant_artist_mapping.findMany({
      where: {
        artistId: idol.id,
      },
    });
    const placeInfo = [];
    places.map(async (place) => {
      const info = await this.prisma.restaurant.findFirst({
        where: {
          id: place.restaurantId,
        },
      });
      for (let i = 0; i < placeInfo.length; i++) {
        if (placeInfo[i].id === place.id) {
          break;
        }
      }
      placeInfo.push(info);
    });

    return placeInfo;
  }

  async getGroupVisitedPlace(groupName: string) {
    const group = await this.prisma.artist.findFirst({
      where: {
        name: groupName,
      },
    });
    const places = await this.prisma.restaurant_artist_mapping.findMany({
      where: {
        artistId: group.id,
      },
    });
    const placeInfo = [];
    places.map(async (place) => {
      const info = await this.prisma.restaurant.findFirst({
        where: {
          id: place.restaurantId,
        },
      });

      for (let i = 0; i < placeInfo.length; i++) {
        if (placeInfo[i].id === place.id) {
          break;
        }
      }
      placeInfo.push(info);
    });

    return placeInfo;
  }
}
