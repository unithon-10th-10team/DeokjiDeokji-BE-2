import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStorageDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;

  @IsNotEmpty()
  @IsNumber()
  temp: number;
}
