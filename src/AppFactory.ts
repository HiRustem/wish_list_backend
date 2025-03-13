import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import express, { Request, Response } from 'express';
import { Express } from 'express';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

class AppFactory {
  static create(): {
    appPromise: Promise<INestApplication<any>>;
    expressApp: Express;
  } {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const appPromise = NestFactory.create(AppModule, adapter);

    appPromise
      .then((app) => {
        app.enableCors({
          exposedHeaders: '*',
        });

        app.init();
      })
      .catch((err) => {
        throw err;
      });

    expressApp.use((req: Request, res: Response, next) => {
      appPromise
        .then(async (app) => {
          await app.init();
          next();
        })
        .catch((err) => next(err));
    });

    return { appPromise, expressApp };
  }
}

export default AppFactory;
