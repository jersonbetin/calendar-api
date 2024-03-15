import { Service } from 'typedi';
import { PrismaClient, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from '@/dtos/user.dto';
import { HttpException } from '@/exceptions/HttpException';

@Service()
export class UserService {
  public user = new PrismaClient().user;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.user.findMany();

    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const users: User = await this.user.findUnique({ where: { id: userId } });

    return users;
  }

  public async createUser(data: CreateUserDto): Promise<User> {
    const { email, password } = data;

    const userExist = await this.user.findUnique({ where: { email: email } });

    if (userExist)
      throw new HttpException(409, `Email ${email} already exists`);

    const passwordHash = await hash(password, 10);
    return await this.user.create({
      data: { id: uuidv4(), email, password: passwordHash },
    });
  }
}
