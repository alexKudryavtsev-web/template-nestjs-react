import { ProfileModule } from '@app/profile/profile.module';
import { ProfileService } from '@app/profile/profile.service';
import { UserEntity } from '@app/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './session.controller';
import { SessionEntity } from './session.entity';
import { SessionService } from './session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity, UserEntity]),
    ProfileModule,
  ],
  controllers: [SessionController],
  providers: [SessionService, ProfileService],
})
export class SessionModule {}
