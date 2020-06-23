import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalGuards } from './auth/guards';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Apply swagger
 *
 * @param  {INestApplication} app   The application
 * @return {void}
 */
const useSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Commerce')
    .setVersion('1.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api-docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const reflector = app.get(Reflector);

   // Enable pipes
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  }));

    // Enable guards.Guards are executed after each middleware, but before any interceptor and pipe.
    app.useGlobalGuards(...GlobalGuards(reflector));
  
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
