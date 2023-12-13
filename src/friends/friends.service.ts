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

  async getFriendInvitationsAsSender(senderId: string) {
    const invitations = await this.friendInvitationRepo.find({
      where: {
        sender: { id: senderId },
      },
      relations: ['receiver'],
    });
    return invitations.map((el) => {
      return {
        id: el.id,
        sendTo: el.receiver.nick,
        createdAt: el.createdAt,
      };
    });
  }

  async getFriendInvitationsAsReceiver(receiverId: string) {
    const invitations = await this.friendInvitationRepo.find({
      where: {
        receiver: { id: receiverId },
      },
      relations: ['sender'],
    });
    return invitations.map((el) => {
      return {
        id: el.id,
        sender: el.sender.nick,
        createdAt: el.createdAt,
      };
    });
  }

  async acceptInvitation(profileId: string, invitationId: number) {
    const invitation = await this.friendInvitationRepo.findOne({
      where: {
        id: invitationId,
      },
      relations: ['receiver'],
    });

    if (!invitation) {
      throw new Error('Friend invitation not found');
    }
    if (invitation.receiver.id !== profileId) {
      throw new Error(
        'Receiver id is different, you cannot accept the friend invitation as a sender',
      );
    }

    await this.friendInvitationRepo.remove(invitation);

    return {
      profileId,
      invitationId,
    };
  }
}
