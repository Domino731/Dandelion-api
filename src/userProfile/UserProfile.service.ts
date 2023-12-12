import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileEntity } from './UserProfile.entity';
import { User } from '../users/user.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly userProfileRepo: Repository<UserProfileEntity>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createProfile() {
    const profile = this.userProfileRepo.create();
    return await this.userProfileRepo.save(profile);
  }

  async findUserProfile(id: number) {
    try {
      const { profile } = await this.userRepo.findOne({
        where: { id },
        relations: ['profile'],
      });
      return profile;
    } catch (e) {
      throw new Error('SERVER ERROR!');
    }
  }

  async findUsersByNickname(nickname: string) {
    return await this.userProfileRepo
      .createQueryBuilder('user_entity') // Specify the alias for the table
      .where('user_entity.nick LIKE :nick', { nick: `%${nickname}%` }) // Fix the parameter name
      .getMany();
  }
}
