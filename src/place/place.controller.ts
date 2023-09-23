import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { PlaceService } from './place.service';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';
import { PageDto } from 'src/common/dtos/content-wrapper';

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
  async getPlace(@Query('name') name: string) {
    const places = await this.placeService.getPlace(name);
    return new PageDto(places);
  }

  @Get(':placeId')
  async getVisitedIdols(@Param('placeId', ParseIntPipe) placeId: number) {
    const idols = await this.placeService.getVisitedIdols(placeId);
    return new CommonResponseDto(idols);
  }

  @Get('/detail/:placeId')
  async getDetailPlace(@Param('placeId', ParseIntPipe) placeId: number) {
    return await this.placeService.getDetailPlace(placeId);
  }
}
