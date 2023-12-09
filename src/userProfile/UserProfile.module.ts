import { Module } from '@nestjs/common';
import { UserProfileController } from './UserProfile.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileEntity } from './UserProfile.entity';
import { UserProfileService } from './UserProfile.service';
import { User } from '../users/user.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, UserProfileEntity])],
  controllers: [UserProfileController],
  providers: [JwtStrategy, UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
