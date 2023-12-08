import { Module } from '@nestjs/common';
import { UserProfileController } from './UserProfile.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [AuthModule],
  controllers: [UserProfileController],
  providers: [JwtStrategy],
})
export class UserProfileModule {}
