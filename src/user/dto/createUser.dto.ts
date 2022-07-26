import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { GenderEnum } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({ format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ enum: GenderEnum })
  @IsEnum(GenderEnum)
  gender: string;

  @ApiProperty()
  @Equals(true)
  agree: boolean;
}
