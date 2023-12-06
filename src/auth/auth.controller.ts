import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { registerErrorFactory } from './auth.utils';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    // 	"nick": "test",
    // 	"password": "qwertyqwerty123@/A",
    // 	"email": "janusz222@gmail.com"
    console.log(req.body);
    return await this.authService.login(req.body);
  }

  @Post('/register')
  async registerUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (e) {
      const error = registerErrorFactory(e);
      if (!error) return res.status(500).json({ message: e.message });
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @UseGuards(RefreshJwtGuard)
  @Post('/refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
