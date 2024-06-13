import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from './commons/configs/swagger.config';
import { ServiceExceptionToHttpExceptionFilter } from './commons/filters/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  // NOTE:: Swagger 등록
  const swaggerConfig = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new ServiceExceptionToHttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
