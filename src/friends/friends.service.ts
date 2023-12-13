import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UserProfileEntity } from '../userProfile/UserProfile.entity';
import { FriendInvitationEntityEntity } from './entities/friendInvitationEntity.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserProfileEntity)
    private readonly userProfileRepo: Repository<UserProfileEntity>,
    @InjectRepository(FriendInvitationEntityEntity)
    private readonly friendInvitationRepo: Repository<FriendInvitationEntityEntity>,
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
  async sendFriendInvitation(sender: UserProfileEntity, receiver: number) {
    const receiverEntity = await this.userProfileRepo.findOneBy({
      id: String(receiver),
    });
    const invitation = this.friendInvitationRepo.create({
      sender,
      receiver: receiverEntity,
    });
    return await this.friendInvitationRepo.save(invitation);
  }
}
