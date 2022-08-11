import { IsEnum, IsOptional } from 'class-validator';
import { GenderEnum } from '@app/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  lastName: string;

  @ApiProperty({ enum: GenderEnum })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender: string;

  @ApiProperty()
  @IsOptional()
  bio: string;

  @ApiProperty()
  @IsOptional()
  address: string;
}
