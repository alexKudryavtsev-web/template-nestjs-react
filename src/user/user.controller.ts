import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiTags('user')
  @ApiOperation({ summary: 'Registration' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.createUser(createUserDto);
  }

  @Get('/activate/:activationLink')
  @Redirect(process.env.CLIENT_URL, 301)
  @ApiTags('user')
  @ApiOperation({ summary: 'Activate user' })
  async activateUser(
    @Param('activationLink') activationLink: string,
  ): Promise<void> {
    await this.userService.activateUser(activationLink);
  }

  @Post('/reset-password')
  @ApiTags('user')
  @ApiOperation({ summary: 'Reset password' })
  @ApiBearerAuth()
  async resetPassword(@User('id') currentUserId: number): Promise<void> {
    await this.userService.resetPassword(currentUserId);
  }

  @Patch('/update-password/:token')
  @ApiTags('user')
  @ApiOperation({ summary: 'Update password' })
  @UsePipes(new ValidationPipe())
  async updatePassword(
    @Param('token') token: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    await this.userService.updatePassword(updatePasswordDto, token);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiTags('user')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  async deleteUser(@User('id') currentUserId: number): Promise<void> {
    await this.userService.deleteUser(currentUserId);
  }
}
