import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { GenderEnum } from '../user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEnum(GenderEnum)
  gender: string;
}
