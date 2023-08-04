import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './app.config';

export const app = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT);
};
