import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_entity' })
export class UserProfileEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nick: string;
}
