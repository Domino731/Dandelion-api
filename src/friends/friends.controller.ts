import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FriendsService } from './friends.service';
import { SendFriendRequestDto } from './dto/SendFriendRequest.dto';
import { AcceptInvitationDto } from './dto/AcceptInvitation.dto';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Request() req) {
    const profile = await this.friendsService.findProfileByUserId(req.user.id);
    return this.friendsService.getFriendsList(profile.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send-friend-invitation')
  // TODO: errors
  // TODO: user cannot send invitation to himself
  // TODO user cannot send invigation twice
  async sendFriendRequest(
    @Request() req,
    @Body() sendFriendRequestDto: SendFriendRequestDto,
  ) {
    const senderProfile = await this.friendsService.findProfileByUserId(
      req.user.id,
    );
    const data = await this.friendsService.sendFriendInvitation(
      senderProfile,
      sendFriendRequestDto.profileId,
    );
    return 'SUCCESS';
  }

  @UseGuards(JwtAuthGuard)
  @Get('invitations-as-sender')
  async getInvitationsAsSender(@Request() req) {
    const profile = await this.friendsService.findProfileByUserId(req.user.id);
    return await this.friendsService.getFriendInvitationsAsSender(profile.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('invitations-as-receiver')
  async getInvitationsAsReceiver(@Request() req) {
    const profile = await this.friendsService.findProfileByUserId(req.user.id);
    return await this.friendsService.getFriendInvitationsAsReceiver(profile.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('accept-invitation')
  async acceptInvitation(
    @Request() req,
    @Body() acceptInvitationDto: AcceptInvitationDto,
  ) {
    const profile = await this.friendsService.findProfileByUserId(req.user.id);
    return await this.friendsService.acceptInvitation(
      profile.id,
      acceptInvitationDto.id,
    );
  }
}
