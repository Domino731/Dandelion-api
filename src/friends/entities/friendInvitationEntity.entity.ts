import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfileEntity } from '../../userProfile/UserProfile.entity';

@Entity({ name: 'friend_invitation' })
export class FriendInvitationEntityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(
    () => UserProfileEntity,
    (userProfileEntity) => userProfileEntity.friendsInvitationsAsSender,
  )
  sender: UserProfileEntity;
  @ManyToOne(
    () => UserProfileEntity,
    (userProfileEntity) => userProfileEntity.friendsInvitationsAsSender,
  )
  receiver: UserProfileEntity;
}
