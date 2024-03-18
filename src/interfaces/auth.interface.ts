import { Request } from 'express';

import { UserWithoutPassword } from './users.interface';

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface DataStoredInToken {
  sub: string;
}

export interface ResponseLogin {
  token: string;
  user: UserWithoutPassword;
}

export interface RequestWithUser extends Request {
  user: UserWithoutPassword;
}
