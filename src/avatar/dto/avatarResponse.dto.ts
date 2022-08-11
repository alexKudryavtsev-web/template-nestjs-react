import { ApiProperty } from '@nestjs/swagger';

export class AvatarResponseDto {
  @ApiProperty({
    example:
      'http://res.cloudinary.com/drmcqw4xs/image/upload/v1659276119/avatars/1.jpg',
  })
  avatar: string;
}
