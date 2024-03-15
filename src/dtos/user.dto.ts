import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UserParamsDto {
  @IsUUID('all', { message: 'User id must be a uuid' })
  userId: string;
}
