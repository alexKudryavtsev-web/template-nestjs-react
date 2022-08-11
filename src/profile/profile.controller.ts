import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileResponseDto } from './dto/profileResponse.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { ProfileService } from './profile.service';
import { ProfileType } from './types/profile.type';

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Read profile by user id' })
  @ApiOkResponse({ type: ProfileResponseDto })
  async readProfile(@Param('id') userId: number): Promise<ProfileType> {
    const profile = await this.profileService.readProfile(userId);

    return this.profileService.buildProfileResponse(profile);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ type: ProfileResponseDto })
  @ApiOperation({ summary: 'Update profile' })
  async updateProfile(
    @User('id') currentUserId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileType> {
    const profile = await this.profileService.updateProfile(
      currentUserId,
      updateProfileDto,
    );

    return this.profileService.buildProfileResponse(profile);
  }
}
