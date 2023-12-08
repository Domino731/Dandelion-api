import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserProfileEntity } from '../userProfile/UserProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfileEntity])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
