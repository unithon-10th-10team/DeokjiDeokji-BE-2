import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place/place.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AppConfigModule, AuthModule, PlaceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
