import Container from 'typedi';
import { NextFunction, Request, Response } from 'express';
// import { User } from '@prisma/client';

import { UserService } from '@services/user.service';
import { User, UserWithoutPassword } from '@interfaces/users.interface';

export class UserController {
  public userService = Container.get(UserService);

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data:UserWithoutPassword[] = await this.userService.findAllUser();

      res.status(200).json({ data, message: 'Search users successfully!' });
    } catch (e) {
      next(e);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { userId } = req.params;
    try {
      const data:UserWithoutPassword = await this.userService.findUserById(userId);

      res.status(200).json({ data, message: 'Find user successfully!' });
    } catch (e) {
      next(e);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newUser: User = req.body;
      const data = await this.userService.createUser(newUser);

      res.status(201).json({ data, message: 'Create user successfully!' });
    } catch (e) {
      next(e);
    }
  };

  public deleteUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { userId } = req.params;
    try {
      const data:UserWithoutPassword = await this.userService.deleteUser(userId);

      res.status(200).json({ data, message: 'Delete user successfully!' });
    } catch (e) {
      next(e);
    }
  };


}
