import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: move to .env - now isn't working :/
export const JWT_KEY = '12312312';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // TODO before release: change
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  // console.log({ secret: process.env });

  await app.listen(8000);
}
bootstrap();
