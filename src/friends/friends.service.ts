import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UserProfileEntity } from '../userProfile/UserProfile.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  getFriendsList() {
    // TODO: add database connection
    return [];
  }

  async findProfileByUserId(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    return user.profile;
  }

  // TODO: add id as a param and handle that
  sendFriendInvitation(senderProfile: UserProfileEntity, receiverId: number) {
    return 'success';
  }
}
