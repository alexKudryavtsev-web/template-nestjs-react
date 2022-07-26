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
import { UpdateUserDto } from './dto/updateUserDto';
import { AuthGuard } from './guards/auth.guard';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiTags('user')
  @ApiOperation({ summary: 'Registration' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);

    return this.userService.buildUserResponse(user);
  }

  @Get('/activate/:activationLink')
  @Redirect(process.env.CLIENT_URL, 301)
  @ApiTags('user')
  @ApiOperation({ summary: 'Activate user' })
  async activateUser(@Param('activationLink') activationLink: string) {
    await this.userService.activateUser(activationLink);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @ApiTags('user')
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  async update(
    @User('id') currentUserId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      updateUserDto,
      currentUserId,
    );

    return this.userService.buildUserResponse(user);
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
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updatePassword(
      updatePasswordDto,
      token,
    );

    return this.userService.buildUserResponse(user);
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
