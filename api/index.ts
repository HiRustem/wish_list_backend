import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { VercelRequest, VercelResponse } from '@vercel/node';

let cachedServer: INestApplication | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // если нужен CORS
    await app.init();
    cachedServer = app;
  }

  const server = cachedServer.getHttpAdapter().getInstance();
  return server(req, res);
}
