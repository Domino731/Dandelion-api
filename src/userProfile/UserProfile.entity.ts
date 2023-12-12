import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendsListEntity } from '../friends/entities/friendsList.entity';

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
}
