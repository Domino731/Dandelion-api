import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [AuthModule],
  providers: [JwtStrategy, FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}
