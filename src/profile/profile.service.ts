import { AvatarService } from '@app/avatar/avatar.service';
import { UserEntity } from '@app/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { ProfileType } from './types/profile.type';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly avatarService: AvatarService,
  ) {}

  async readProfile(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne(userId);
    const avatar = await this.avatarService.getAvatar(userId);

    return {
      ...user,
      avatar,
    };
  }

  async updateProfile(
    currentUserId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne(currentUserId);

    Object.assign(user, updateProfileDto);

    await this.userRepository.save(user);

    return {
      ...user,
      avatar: await this.avatarService.getAvatar(currentUserId),
    };
  }

  buildProfileResponse(profile: ProfileType): ProfileType {
    delete profile.activationLink;
    delete profile.agree;
    delete profile.email;
    delete profile.password;
    delete profile.isActivated;
    delete profile.updatedAt;

    return profile;
  }

  async buildProfileResponseFromUserEntity(
    user: UserEntity,
  ): Promise<ProfileType> {
    const avatar = await this.avatarService.getAvatar(user.id);

    delete user.activationLink;
    delete user.agree;
    delete user.email;
    delete user.password;
    delete user.isActivated;
    delete user.updatedAt;
    delete user.updateTimestamp;

    return {
      ...user,
      avatar,
    };
  }
}
