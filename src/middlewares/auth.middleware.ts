import { NextFunction, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';

import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { HttpException } from '@exceptions/HttpException';
import { SECRET_KEY } from '@config';
import { prismaExclude } from '@utils/helpers';

export const AuthMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const auth = req.headers?.authorization?.split?.('Bearer ')?.[1];

    if (auth) {
      const { sub } = (await verify(auth, SECRET_KEY)) as DataStoredInToken;
      const usersDb = new PrismaClient().user;
      const user = await usersDb.findUnique({
        where: { id: sub },
        select: prismaExclude('User', ['password']),
      });
      
      if (user) {
        req.user = user;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(401, 'Authentication token missing'));
    }
  } catch(e) {
    console.log(e);
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
