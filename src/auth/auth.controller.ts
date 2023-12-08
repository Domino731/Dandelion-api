import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Res,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/CreateUserDto';
import { UsersService } from '../users/users.service';
import { registerErrorFactory } from './auth.utils';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return 'success';
  }

  @Post('/register')
  async registerUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (e) {
      const error = registerErrorFactory(e);
      if (!error) return res.status(500).json({ message: e.message });
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
