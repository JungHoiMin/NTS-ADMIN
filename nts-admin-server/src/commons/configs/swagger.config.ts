import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('NTS Admin API Docs')
    .setDescription('NTS Admin API 문서')
    .setVersion('1.0.0')
    .addTag('Manager')
    .build();
};
