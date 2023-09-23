import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // app.enableCors();
  app.enableCors({
    // domain 확정되었을 때 origin 수정 필요
    allowedHeaders: '*',
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  const appConfig = app.get(ConfigService);

  app.enableShutdownHooks();

  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('SCG APPLY')
  //   .setDescription('The API Description for SCG-APPLY-Backend')
  //   .setVersion('1.0')
  //   .addBearerAuth(
  //     {
  //       type: 'http',
  //       scheme: 'bearer',
  //       bearerFormat: 'JWT',
  //       in: 'header',
  //     },
  //     'access-token',
  //   )
  //   .build();

  // const document = SwaggerModule.createDocument(app, swaggerConfig);
  // SwaggerModule.setup('api', app, document);
  // console.log(`==== Running as ${process.env.APP_ENV} ====`);
  await app.listen(appConfig.get('app.port'));
}
bootstrap();
