import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendInvitationEntityEntity } from '../friends/entities/friendInvitationEntity.entity';

@Entity({ name: 'user_entity' })
export class UserProfileEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  createdDate: Date;

  @Column()
  nick: string;

  @BeforeInsert()
  createCreatedDate() {
    this.createdDate = new Date();
  }

  @ManyToMany(
    () => FriendInvitationEntityEntity,
    (friendInvitationEntity) => friendInvitationEntity.sender,
  )
  friendsInvitationsAsSender: FriendInvitationEntityEntity[];
  @ManyToMany(
    () => FriendInvitationEntityEntity,
    (friendInvitationEntity) => friendInvitationEntity.receiver,
  )
  friendsInvitationsAsReceiver: FriendInvitationEntityEntity[];
}
