import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, (req, res) => {
      res.send('This is a user route');
    });
  }
}
