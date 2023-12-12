import {
  Controller,
  Get,
  Param,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserProfileService } from './UserProfile.service';

@Controller('profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  index(@Request() req) {
    const {
      user: { id },
    } = req;
    return this.userProfileService.findUserProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/:nick')
  search(@Param('nick') nick) {
    return this.userProfileService.findUsersByNickname(nick);
  }
}
