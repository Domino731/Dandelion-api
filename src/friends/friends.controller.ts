import { Controller, Get } from '@nestjs/common';

@Controller('friends')
export class FriendsController {
  @Get()
  getFriendsList() {
    return [];
  }
}
