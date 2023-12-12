import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserProfileEntity } from '../../userProfile/UserProfile.entity';

@Entity({ name: 'friends_list' })
export class FriendsListEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(
    () => UserProfileEntity,
    (userProfileEntity) => userProfileEntity.friends,
  )
  userProfile: UserProfileEntity;

  @OneToOne(() => UserProfileEntity)
  friend: UserProfileEntity;
}
