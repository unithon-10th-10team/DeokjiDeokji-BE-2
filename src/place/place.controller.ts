import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { PlaceService } from './place.service';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';

@UseGuards(JwtGuard)
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  async createPlace(
    @CurrentUser() user: User,
    @Body() createPlaceDto: CreatePlaceDto,
  ) {
    await this.placeService.createPlace(user, createPlaceDto);
    return new CommonResponseDto();
  }

  @Get()
  async getPlace() {
    const places = await this.placeService.getPlace();
    return new CommonResponseDto(places);
  }

  @Get(':placeId')
  async getVisitedIdols(@Param('placeId', ParseIntPipe) placeId: number) {
    const idols = await this.placeService.getVisitedIdols(placeId);
    return new CommonResponseDto(idols);
  }
}
