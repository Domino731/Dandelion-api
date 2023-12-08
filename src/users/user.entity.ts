import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserProfileEntity } from '../userProfile/UserProfile.entity';
import { JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nick: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => UserProfileEntity)
  @JoinColumn()
  profile: UserProfileEntity;
}
