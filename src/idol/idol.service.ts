import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (!idol) {
      throw new BadRequestException('해당 아이돌이 존재하지않습니다');
    }
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
      //   for (let i = 0; i < placeInfo.length; i++) {
      //     if (placeInfo[i].id === place.id) {
      //       break;
      //     }
      //   }
      placeInfo.push(info);
    });

    return placeInfo;
  }

  async getGroupVisitedPlace(groupName: string) {
    const group = await this.prisma.group.findFirst({
      where: {
        name: groupName,
      },
    });
    if (!group) {
      throw new BadRequestException('해당 그룹이 존재하지않습니다');
    }
    const places = await this.prisma.restaurant_artist_mapping.findMany({
      where: {
        artistId: group.id,
      },
    });
    const placeInfo = [];
    if (places) {
      places.map(async (place) => {
        const info = await this.prisma.restaurant.findFirst({
          where: {
            id: place.restaurantId,
          },
        });
        placeInfo.push(info);
      });
    }

    return placeInfo;
  }
}
