import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/config/database/prisma.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { User } from '@prisma/client';
import { timeStamp } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    console.log('payload', timeStamp(), payload);
    const user: User = await this.prismaService.user.findUnique({
      where: {
        id: payload.userId.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        `허용되지않은 user입니다, ${payload.userId}`,
      );
    }

    return user;
  }
}
