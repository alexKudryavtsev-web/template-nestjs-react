import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/createSession.dto';
import { SessionEntity } from './session.entity';
import { SessionType } from './types/session.type';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createSession(
    createSessionDto: CreateSessionDto,
    ip: string,
  ): Promise<SessionType> {
    const user = await this.userRepository.findOne(
      {
        email: createSessionDto.email,
      },
      {
        select: [
          'id',
          'email',
          'firstName',
          'lastName',
          'gender',
          'password',
          'isActived',
          'createdAt',
          'updatedAt',
          'activationLink',
        ],
      },
    );

    if (!user.isActived) {
      throw new HttpException('User not activated', HttpStatus.FORBIDDEN);
    }

    const isComparedPassword = await compare(
      createSessionDto.password,
      user.password,
    );

    if (!isComparedPassword) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const tokens = this.generateJwt(user);
    const candidate = await this.sessionRepository.findOne({ user, ip });

    if (candidate) {
      candidate.refreshToken = tokens.refreshToken;

      await this.sessionRepository.save(candidate);

      delete user.password;

      return { user, ...tokens };
    }

    const newSession = new SessionEntity();

    newSession.user = user;
    newSession.ip = ip;
    newSession.refreshToken = tokens.refreshToken;

    await this.sessionRepository.save(newSession);

    delete user.password;

    return { user, ...tokens };
  }

  async deleteSession(refreshToken: string) {
    await this.sessionRepository.delete({ refreshToken });
  }

  async updateSession(refreshToken: string): Promise<SessionType> {
    console.log(refreshToken);
    const session = await this.sessionRepository.findOne(
      { refreshToken },
      { relations: ['user'] },
    );
    const dataFromToken = this.verifyRefreshJwt(refreshToken);

    if (!session || !dataFromToken) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
    const newTokens = this.generateJwt(session.user);

    session.refreshToken = newTokens.refreshToken;

    await this.sessionRepository.save(session);

    return { user: session.user, ...newTokens };
  }

  generateJwt(user: UserEntity) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      accessToken: sign(payload, process.env.ACCESS_SECRET),
      refreshToken: sign(payload, process.env.REFRESH_SECRET),
    };
  }

  verifyRefreshJwt(token: string): JwtPayload | string | null {
    try {
      return verify(token, process.env.REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }
}