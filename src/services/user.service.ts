import { Service } from 'typedi';
import { PrismaClient, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from '@/dtos/user.dto';
import { HttpException } from '@/exceptions/HttpException';
import { prismaExclude } from '@/utils/helpers';
import { UserWithoutPassword } from '@/interfaces/users.interface';

@Service()
export class UserService {
  public user = new PrismaClient().user;

  public async findAllUser(): Promise<UserWithoutPassword[]> {
    const users: UserWithoutPassword[] = await this.user.findMany({
      select: prismaExclude('User', ['password']),
    });

    return users;
  }

  public async findUserById(userId: string): Promise<UserWithoutPassword> {
    const users: UserWithoutPassword = await this.user.findUnique({
      where: { id: userId },
      select: prismaExclude('User', ['password']),
    });

    return users;
  }

  public async createUser(data: CreateUserDto): Promise<UserWithoutPassword> {
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
  }

  public async deleteUser(userId: string): Promise<UserWithoutPassword> {
    const user = await this.findUserById(userId);

    if (!user) throw new HttpException(409, "User doesn't exist");

    return await this.user.delete({
      where: { id: user.id },
      select: prismaExclude('User', ['password']),
    });
  }
}
