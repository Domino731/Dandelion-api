import { Module } from '@nestjs/common';
import { UserProfileController } from './UserProfile.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileEntity } from './UserProfile.entity';
import { UserProfileService } from './UserProfile.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserProfileEntity])],
  controllers: [UserProfileController],
  providers: [JwtStrategy, UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
