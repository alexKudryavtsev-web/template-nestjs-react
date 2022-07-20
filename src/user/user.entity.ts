import { SessionEntity } from '@app/session/session.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum GenderEnum {
  MALE = 'male',
  WOMEN = 'women',
  OTHER = 'other',
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'boolean', default: false })
  isActived: boolean;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.OTHER })
  gender: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'uuid' })
  activationLink: string;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity;
}
