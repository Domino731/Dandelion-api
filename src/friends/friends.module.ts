import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileEntity } from '../userProfile/UserProfile.entity';
import { FriendInvitationEntityEntity } from './entities/friendInvitationEntity.entity';
import { FriendsListEntity } from './entities/friendsList.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      UserProfileEntity,
      FriendInvitationEntityEntity,
      FriendsListEntity,
      User,
    ]),
  ],
  providers: [JwtStrategy, FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}
