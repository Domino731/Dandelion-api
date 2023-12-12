import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendsListEntity } from '../friends/entities/friendsList.entity';
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

  @OneToMany(
    () => FriendsListEntity,
    (friendsListEntity) => friendsListEntity.userProfile,
  )
  friends: FriendsListEntity[];

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
