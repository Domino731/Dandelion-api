import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
export class UserProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  index(@Request() req) {
    console.log(req.user);
    return 'success';
  }
}
