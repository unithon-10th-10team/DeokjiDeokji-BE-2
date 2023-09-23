import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/config/database/prisma.service';

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
}
