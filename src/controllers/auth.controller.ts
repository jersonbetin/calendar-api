import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import { AuthService } from '@services/auth.service';
import { CreateUserDto } from '@/dtos/user.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserService } from '@/services/user.service';
import { UserWithoutPassword } from '@/interfaces/users.interface';

export class AuthController {
  public authService = Container.get(AuthService);
  public userService = Container.get(UserService);

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.authService.signUp(userData);

      res
        .status(201)
        .json({ data: user, message: 'User successfully signed up' });
    } catch (e) {
      next(e);
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const loginData = await this.authService.login(userData);

      res
        .status(200)
        .json({ data: loginData, message: 'User successfully login' });
    } catch (e) {
      next(e);
    }
  };

  public getMe = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {id} = req.user;
      const user: UserWithoutPassword = await this.userService.findUserById(id);

      res
        .status(200)
        .json({ data: user, message: 'Get me successfully' });
    } catch (e) {
      next(e);
    }
  };
}
