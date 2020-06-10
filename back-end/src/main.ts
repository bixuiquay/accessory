import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Apply swagger
 *
 * @param  {INestApplication} app   The application
 * @return {void}
 */
const useSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('CMS API Documentation')
    .setDescription('This is an API Documentation for CMS that enables you to interact with resources: Deals, Products, Cities, Locations,...')
    .setVersion('1.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api-docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

   // Enable pipes
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  }));

  
  // Enable cors
  app.enableCors({ credentials: true, origin: true });

  // Apply swagger documation
  useSwagger(app);

  await app.listen(3400, () => {
    console.log('http://localhost:3400/api');
    console.log('http://localhost:3400/api-docs')
  })
}
bootstrap();
