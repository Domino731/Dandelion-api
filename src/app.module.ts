import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { UserProfileModule } from './userProfile/UserProfile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserProfileModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
