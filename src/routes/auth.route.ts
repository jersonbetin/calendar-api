import { AuthController } from '@/controllers/auth.controller';
import { CreateUserDto } from '@/dtos/user.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class AuthRoute implements Routes {
  public path = '';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      `/signup`,
      ValidationMiddleware(CreateUserDto),
      this.auth.signUp,
    );
    this.router.post(
      `/login`,
      ValidationMiddleware(CreateUserDto),
      this.auth.login,
    );
    this.router.get(
      `/me`,
      AuthMiddleware,
      this.auth.getMe,
    );
  }
}
