import { Module } from '@nestjs/common';
import { IdolService } from './idol.service';
import { IdolController } from './idol.controller';

@Module({
  providers: [IdolService],
  controllers: [IdolController],
})
export class IdolModule {}
