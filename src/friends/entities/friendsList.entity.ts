import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfileEntity } from '../../userProfile/UserProfile.entity';

@Entity({ name: 'friends_list' })
export class FriendsListEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => UserProfileEntity)
  @JoinColumn()
  friendProfile1: UserProfileEntity;

  @OneToOne(() => UserProfileEntity)
  @JoinColumn()
  friendProfile2: UserProfileEntity;
}
