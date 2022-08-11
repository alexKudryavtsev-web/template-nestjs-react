import { GenderEnum } from '@app/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ default: '' })
  bio: string;

  @ApiProperty({ default: '' })
  address: string;

  @ApiProperty({ enum: GenderEnum })
  gender: string;

  @ApiProperty({ format: 'date-time' })
  createdAt: string;

  @ApiProperty()
  avatar: string;
}
