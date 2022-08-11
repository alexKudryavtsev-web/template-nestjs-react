import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AvatarService } from './avatar.service';
import { AvatarResponseDto } from './dto/avatarResponse.dto';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiTags('avatar')
  @ApiOperation({
    summary: 'Upload avatar',
    description: 'Description file by multiform',
  })
  @ApiBearerAuth()
  async upload(
    @User('id') currentUserId: number,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    await this.avatarService.uploadAvatar(currentUserId, file);
  }

  @Get(':id')
  @ApiTags('avatar')
  @ApiOperation({ summary: 'Get avatar url' })
  @ApiOkResponse({
    type: AvatarResponseDto,
  })
  async getFile(@Param('id') userId: number) {
    const url = await this.avatarService.getAvatar(userId);

    return {
      avatar: url,
    };
  }
}
