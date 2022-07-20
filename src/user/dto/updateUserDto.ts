import { IsEnum, IsOptional } from 'class-validator';
import { GenderEnum } from '@app/user/user.entity';

export class UpdateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  gender: string;
}
