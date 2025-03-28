import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/exceptions/http.exception.filter';
import * as express from 'express';
import * as path from 'path';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://deploy-be-service.onrender.com'], // Định nghĩa danh sách các origin được phép
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'delay', 'upload-type'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Tiki RBAC API')
    .setDescription('API cho hệ thống phân quyền Tiki Clone')
    .setVersion('1.0')
    .addBearerAuth() // Them xác thực JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Phục vụ file tĩnh từ thư mục `public`
  app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
    }

  ));



  app.useGlobalFilters(new GlobalExceptionFilter());


  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
