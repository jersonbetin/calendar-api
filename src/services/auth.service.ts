import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { hash, compare } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from '@dtos/user.dto';
import { UserWithoutPassword } from '@interfaces/users.interface';
import { HttpException } from '@exceptions/HttpException';
import { prismaExclude } from '@utils/helpers';
import {
  DataStoredInToken,
  ResponseLogin,
  TokenData,
} from '@interfaces/auth.interface';
import { SECRET_KEY } from '@config';
import { sign } from 'jsonwebtoken';

@Service()
export class AuthService {
  public user = new PrismaClient().user;

  public signUp = async (data: CreateUserDto): Promise<UserWithoutPassword> => {
    const { email, password } = data;

    const userExist = await this.user.findUnique({
      where: { email: email },
    });

    if (userExist)
      throw new HttpException(409, `Email ${email} already exists`);

    const passwordHash = await hash(password, 10);
    return await this.user.create({
      data: { id: uuidv4(), email, password: passwordHash },
      select: prismaExclude('User', ['password']),
    });
  };

  public login = async (data: CreateUserDto): Promise<ResponseLogin> => {
    const { email, password } = data;

    const userExist = await this.user.findUnique({
      where: { email: email },
    });

    if (!userExist)
      throw new HttpException(409, `Email ${email} doesn't exists`);

    const isPasswordMatching: boolean = await compare(
      password,
      userExist.password,
    );
    if (!isPasswordMatching)
      throw new HttpException(409, 'Password is not matching');

    const token = this.createToken(userExist);

    return { token, user: { id: userExist.id, email: userExist.email } };
  };

  public createToken(user: UserWithoutPassword): string {
    const dataStoredInToken: DataStoredInToken = { sub: user.id };
    const secretKey: string = SECRET_KEY || 'secret';
    const expiresIn: number = 60 * 60;

    return sign(dataStoredInToken, secretKey, { expiresIn });
  }
}
