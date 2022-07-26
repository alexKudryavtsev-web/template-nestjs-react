if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('NestJs+React Template')
    .setDescription('NestJs+React Template API description')
    .setVersion('1.0')
    .addTag('session')
    .addTag('user')
    .addTag('avatar')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
