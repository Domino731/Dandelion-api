import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileEntity } from './UserProfile.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private readonly userProfileRepo: Repository<UserProfileEntity>,
  ) {}

  async createProfile() {
    const profile = this.userProfileRepo.create();
    return await this.userProfileRepo.save(profile);
  }
}
