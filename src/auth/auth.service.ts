import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { KakaoLoginDto } from './dtos/kakao-login.dto';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { stringify } from 'querystring';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: KakaoLoginDto) {
    const token = data.accessToken;

    // const [accessToken, refreshToken] = await Promise.all([
    //   this.generateAccessToken(userId),
    //   this.generateRefreshToken(userId),
    // ]);
    const userId = await this.getUserByKakaoAccessToken(token);
    // res.cookie('refresh_token', refreshToken, {
    //   path: '/auth',
    //   httpOnly: true,
    // });
    const payload = { userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async getUserByKakaoAccessToken(accessToken: string) {
    // KAKAO LOGIN 회원조회 REST-API
    const user: any = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!user) throw new BadRequestException(); //카카오 로그인 실패 예외처리
    let userId = await this.prisma.user.findFirst({
      where: {
        id: user.data.id.toString(),
      },
    });
    if (!userId)
      try {
        userId = await this.prisma.user.create({
          data: {
            id: user.data.id.toString(),
            name: user.data.properties.nickname,
            email: user.kakao_account?.email ?? 'null',
            birthday: user.kakao_account?.birthday ?? 'null', //확인필요
          },
        }); // 회원이 없으면 회원가입 후 아이디 반환
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException(e);
      }

    return userId; // 회원이 이미 있다면 있는 유저의 아이디 반환
  }
}
