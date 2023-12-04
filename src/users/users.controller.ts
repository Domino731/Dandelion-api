import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async get() {
    return await this.usersService.findByEmail();
  }
}
