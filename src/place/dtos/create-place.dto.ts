import { RestaurantType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class placeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsEnum(RestaurantType)
  type: RestaurantType;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;
}
export class CreatePlaceDto {
  @IsNotEmpty()
  @IsNumber()
  purpose: number;

  @IsNotEmpty()
  @IsString()
  group: string;

  @IsNotEmpty()
  @IsString()
  member: string;

  @IsOptional()
  @IsNumber()
  temperature: number;

  @IsNotEmpty()
  @Type(() => placeDto)
  place: placeDto;
}
