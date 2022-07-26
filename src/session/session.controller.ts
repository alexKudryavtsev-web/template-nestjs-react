import {
  Body,
  Controller,
  Delete,
  Ip,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateSessionDto } from './dto/createSession.dto';
import { SessionResponseDto } from './dto/sessionResponse.dto';
import { SessionService } from './session.service';
import { SessionType } from './types/session.type';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiTags('session')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ type: SessionResponseDto })
  async createSession(
    @Res({ passthrough: true }) response: Response,
    @Body() createSessionDto: CreateSessionDto,
    @Ip() ip: string,
  ): Promise<SessionType> {
    const data = await this.sessionService.createSession(createSessionDto, ip);
    response.cookie('refreshToken', data.refreshToken);

    return data;
  }

  @Patch()
  @ApiTags('session')
  @ApiOperation({ summary: 'Refresh tokens' })
  async updateSession(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SessionType> {
    const data = await this.sessionService.updateSession(
      request.cookies.refreshToken,
    );

    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_IN_MS),
    });

    return data;
  }

  @Delete()
  @ApiTags('session')
  @ApiOperation({ summary: 'Log out' })
  async deleteSession(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.sessionService.deleteSession(request.cookies.refreshToken);
    response.clearCookie('refreshToken');
  }
}
