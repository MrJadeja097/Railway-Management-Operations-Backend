import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RpcGlobalExceptionInterceptor } from './common/Interceptors/rpcGlobalException.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger('logs'),
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new RpcGlobalExceptionInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Railway Operations & Management API')
    .setDescription(
      `**Comprehensive API for managing the Indian Railway system.**

This application provides secure, role-based access to perform CRUD operations on entities like \`Trains\`, \`Stations\`, \`RailLines\`, and \`Staff\`. 
Built for railway administrators and managers, it ensures real-time control and visibility into route planning, staff coordination, and infrastructure data.

-> Secured via JWT authentication  
-> Designed for MANAGEMENT and ADMIN roles  
-> Scalable, modular, and optimized for performance  
-> Built with NestJS and follows strict API documentation standards`,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(process.env.PORT ?? 1000);
}
bootstrap();
