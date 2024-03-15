import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { HttpException } from '@/exceptions/HttpException';

export const ValidationMiddleware =
  (
    type: any,
    skipMissingProperties = false,
    whitelist = false,
    forbidNonWhitelisted = false,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);
    validateOrReject(dto, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    })
      .then(() => {
        req.body = dto;
        next();
      })
      .catch((errors: ValidationError[]) => {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(', ');

        next(new HttpException(400, message));
      });
  };
