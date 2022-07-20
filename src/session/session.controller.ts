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
import { Request, Response } from 'express';
import { CreateSessionDto } from './dto/createSession.dto';
import { SessionService } from './session.service';
import { SessionType } from './types/session.type';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async createSession(
    @Res({ passthrough: true }) response: Response,
    @Body('user') createSessionDto: CreateSessionDto,
    @Ip() ip: string,
  ): Promise<SessionType> {
    const data = await this.sessionService.createSession(createSessionDto, ip);
    response.cookie('refreshToken', data.refreshToken);

    return data;
  }

  @Patch()
  async updateSession(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SessionType> {
    const data = await this.sessionService.updateSession(
      request.cookies.refreshToken,
    );
    response.cookie('refreshToken', data.refreshToken);

    return data;
  }

  @Delete()
  async deleteSession(@Req() request: Request) {
    await this.sessionService.deleteSession(request.cookies.refreshToken);
  }
}