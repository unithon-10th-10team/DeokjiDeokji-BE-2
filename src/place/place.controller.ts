import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { PlaceService } from './place.service';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';

// @UseGuards(JwtGuard)
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  async createPlace(@CurrentUser() user: User, createPlaceDto: CreatePlaceDto) {
    await this.placeService.createPlace(user, createPlaceDto);
    return new CommonResponseDto();
  }

}
