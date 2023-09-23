import { RestaurantType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsNumber()
  purpose: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  group: string;

  @IsNotEmpty()
  @IsString()
  member: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsNumber()
  temperature: number;

  @IsNotEmpty()
  @IsEnum(RestaurantType)
  type: RestaurantType;

  @IsOptional()
  @IsString()
  location: string;
}
