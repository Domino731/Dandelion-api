import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
