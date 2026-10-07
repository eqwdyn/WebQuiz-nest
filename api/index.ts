import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let cachedApp: express.Express;

async function bootstrap() {
  if (cachedApp) return cachedApp;

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter, {
    logger: false,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.init();
  cachedApp = expressApp;
  return expressApp;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();
  return app(req as any, res as any);
}
