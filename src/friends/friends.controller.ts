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

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getFriendsList() {
    return [];
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
    return data;
  }
}
