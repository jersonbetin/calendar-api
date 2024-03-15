import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { UserController } from '@/controllers/user.controller';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateUserDto, UserParamsDto } from '@/dtos/user.dto';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(
      `${this.path}/:userId`,
      ValidationMiddleware(UserParamsDto, 'params'),
      this.user.getUserById,
    );
    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateUserDto),
      this.user.createUser,
    );
    this.router.delete(`${this.path}/:userId`, this.user.deleteUserById);
  }
}
