import { ProfileResponseDto } from '@app/profile/dto/profileResponse.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SessionResponseDto {
  @ApiProperty({ type: 'object' })
  user: ProfileResponseDto;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
