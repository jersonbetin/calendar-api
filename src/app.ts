import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { Application, Router } from 'express';

import { LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@config';
import { logger, stream } from '@utils/logger';
import { ErrorMiddleware } from './middlewares/error.middleware';

export class App {
  public app: Application;
  public env: string;
  public port: string | number;

  constructor(routes: Router[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

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

  private initRouters(routes: Router[]) {
    routes.forEach((route) => {
      this.app.use('/', route);
    });
  }

  private initErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
