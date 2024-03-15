import 'reflect-metadata';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@config';
import { logger, stream } from '@utils/logger';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { Routes } from '@interfaces/routes.interface';

export class App {
  public app: Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 4000;

    this.initMiddlewares();
    this.initRouters(routes);
    this.initErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info('*****************************************');
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info('*****************************************');
    });
  }

  public getServer() {
    return this.app;
  }

  private initMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initRouters(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
