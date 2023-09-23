import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place/place.module';

@Module({
  imports: [AppConfigModule, AuthModule, PlaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
